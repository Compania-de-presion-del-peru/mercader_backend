const mercadopago = require("mercadopago");

//configuration
const mercadoPagoPublicKey = process.env.MERCADO_PAGO_PUBLIC_KEY;
if (!mercadoPagoPublicKey) {
  console.log("Error: public key not defined");
  process.exit(1);
}
const mercadoPagoAccessToken = process.env.MERCADO_PAGO_SAMPLE_ACCESS_TOKEN;
if (!mercadoPagoAccessToken) {
  console.log("Error: access token not defined");
  process.exit(1);
}
mercadopago.configurations.setAccessToken(mercadoPagoAccessToken);

const ProcessPayment = (req, res) => {
    const { body } = req;
    const { payer } = body;
    console.log(req.body);
    const paymentData = {
      transaction_amount: Number(body.transactionAmount),
      token: body.token,
      description: body.description,
      installments: Number(body.installments),
      payment_method_id: body.paymentMethodId,
      issuer_id: body.issuerId,
      payer: {
        email: payer.email,
        identification: {
          type: payer.identification.docType,
          number: payer.identification.docNumber
        }
      }
    };
  
    mercadopago.payment.save(paymentData)
      .then(function(response) {
        const { response: data } = response;
        res.status(response.status).json({
          _k: mercadoPagoAccessToken,
          _p: { 
            status: data.status,
            transaction_id: data.id,
            status_detail: data.status_detail,
            createdAt: data.date_approved
          },
          _i: data.id
        });
      })
      .catch(function(error) {
        res.status(400).send(error);
    });
}


module.exports = {ProcessPayment}