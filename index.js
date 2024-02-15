const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const stkRoutes = require('./routes/stkRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/stk', stkRoutes);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
