const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { findEventImage, openEventImage } = require('./config/eventImageStorage');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/uploads', express.static('uploads'));
app.get('/uploads/:fileId', async (req, res, next) => {
    try {
        const file = await findEventImage(req.params.fileId);
        if (!file) return next();

        res.type(file.metadata?.contentType || 'application/octet-stream');
        res.set('Cache-Control', 'public, max-age=86400');
        openEventImage(file._id)
            .on('error', (error) => {
                if (res.headersSent) return res.destroy(error);
                next(error);
            })
            .pipe(res);
    } catch (error) {
        next(error);
    }
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    res.status(500).json({ error: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5001;

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;