import express from 'express';
import { config } from './config/env.js';

const app = express();

const PORT = config.port || 3001;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});
