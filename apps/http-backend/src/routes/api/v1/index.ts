import express from 'express';
import authRoute from './auth.route.js';

const route: express.Router = express.Router();

route.get('/', (req, res) => {
  res.send('API v1 is working!');
});

route.use('/auth', authRoute);

export default route;
