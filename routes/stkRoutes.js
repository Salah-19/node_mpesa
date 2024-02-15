const express = require('express');
const router = express.Router();
const { initiateSTKPush } = require('../controllers/stkController');

router.post('/', async (req, res) => {
    const { phoneNumber, amount, callbackUrl } = req.body;

    try {
        const result = await initiateSTKPush(phoneNumber, amount, callbackUrl);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
