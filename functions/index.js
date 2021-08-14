const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const app = express();
const stripe = require('stripe')(
	'sk_test_51J9KEoIhPSrlazd0RS5iIwjqMuoVdTg5YwON70vES0Oo0GmD0Hvo6F5wBX8FbdMgOU6tK8QYdLLFjOhFR0AParRG00iJkqse1W'
);
// middlewares
app.use(cors({ origin: true }));
app.use(express.json());
// routes
app.get('/', (req, res) => {
	res.status('200').send("<h1 style='color: red; margin:0'> hah</h1>");
});
app.post('/payment/create', async (request, response) => {
	const total = request.query.total;

	console.log('Payment Request Recieved BOOM!!! for this amount >>> ', total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // subunits of the currency
		currency: 'usd',
	});

	// OK - Created
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

// /exports
exports.api = functions.https.onRequest(app);
