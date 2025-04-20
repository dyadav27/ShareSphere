const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use environment variables
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Assuming backend runs on a different port

app.use(bodyParser.json());

app.post('/api/process-rental-payment', async (req, res) => {
    const { paymentMethodId, amount, listerAccountId, totalRentalCost, platformCommissionRate } = req.body;

    const commissionAmount = Math.round(totalRentalCost * platformCommissionRate * 100); // Commission in cents
    const transferAmount = amount - commissionAmount; // Amount to transfer to the lister

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Charge the total amount (including commission)
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            transfer_data: {
                destination: listerAccountId,
                amount: transferAmount > 0 ? transferAmount : 0, // Transfer the rental cost minus commission
            },
            application_fee_amount: commissionAmount > 0 ? commissionAmount : 0, // Apply the platform commission
        });

        res.json({ transactionId: paymentIntent.id });
    } catch (error) {
        console.error('Error processing rental payment:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});