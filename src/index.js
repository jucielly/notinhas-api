require('dotenv').config();
const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const { startDb } = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(env.port, () => {
  startDb();
  console.log('server started!', env.port);
});
