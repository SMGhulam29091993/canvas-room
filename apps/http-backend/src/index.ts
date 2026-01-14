import express from 'express';

const app = express();

const PORT = process.env.PORT || 3001;



app.listen(PORT, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
    console.log(`Server is running on port ${PORT}`);
})


