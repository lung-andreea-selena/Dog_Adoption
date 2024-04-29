/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 3001;
app.use(cors());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
