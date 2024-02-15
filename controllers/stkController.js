const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const shortCode = process.env.SHORT_CODE;

const auth = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');
const tokenUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

const generateAccessToken = async () => {
    try {
        const response = await axios.get(tokenUrl, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error generating access token:', error);
        throw error;
    }
};

const initiateSTKPush = async (phoneNumber, amount, callbackUrl) => {
    try {
        const accessToken = await generateAccessToken();
        const stkUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
        const password = Buffer.from(shortCode + '174379' + timestamp).toString('base64');

        const payload = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: shortCode,
            PhoneNumber: phoneNumber,
            CallBackURL: callbackUrl,
            AccountReference: 'Test',
            TransactionDesc: 'Test'
        };

        const response = await axios.post(stkUrl, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error initiating STK push:', error);
        throw error;
    }
};

module.exports = {
    initiateSTKPush
};
