import express from 'express';
import authRoute from './auth.route.js';

const route: express.Router = express.Router();

route.get('/api/v1', (req, res) => {
  res.send('API v1 is working!');
});

route.use('/api/v1/auth', authRoute);

export default route;
