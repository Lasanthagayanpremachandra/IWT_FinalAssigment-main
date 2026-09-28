const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, admin } = require('../middleware/authMiddleware');
const { createEvent, getEvents, updateEvent, deleteEvent, getStats } = require('../controllers/eventController');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'));
        }
        cb(null, true);
    },
});

// Routes
router.post('/', protect, admin, upload.single('image'), createEvent);
router.get('/', getEvents);
router.get('/stats', protect, admin, getStats);
router.put('/:id', protect, admin, upload.single('image'), updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;
