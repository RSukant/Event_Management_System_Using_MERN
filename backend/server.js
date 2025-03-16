import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {connectDB} from './config/db.js';

import eventRoutes from './routes/event.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accept json data in the req.body

app.use('/api/events', eventRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

//postman desktop app

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});
