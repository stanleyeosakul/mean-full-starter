// Import dependencies
const router = require('express').Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripe.apiKey);

// Stripe API
router.post('/charge', (req, res, next) => {

  // Stripe token from the client
  const stripeToken = req.body.stripeToken;

  // Multiply charge by 100 (Stripe thinks a value of 1 is equal to $0.01)
  const chargeAmount = Math.round(req.body.amount * 100);

  // Create a Stripe customer
  stripe.customers.create()

    // Create a bank account for the customer
    .then(function(customer) {
      return stripe.customers.createSource(customer.id, {
        source: stripeToken.id
      });
    })

    // Create a charge object
    .then(function(source) {
      return stripe.charges.create({
        amount: chargeAmount,
        currency: 'usd',
        customer: source.customer
      });
    })

    // Return a message to the user that the charge was successful
    .then(function(charge) {
      res.json({ success: true, message: 'Payment successful!' });
    })

    // Catch all errors
    .catch(function(err) {
      res.json({ success: false, message: 'An error occurred.  Charge not completed.' });
    });
});

module.exports = router;