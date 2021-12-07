const { Router } = require('express');
const {ProcessPayment} = require('../controllers/payment');

const router = Router();


router.post('/process-payment', ProcessPayment);

module.exports = router;