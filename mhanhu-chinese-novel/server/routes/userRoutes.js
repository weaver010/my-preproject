const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    createNovel,
    uploadChapter,
    getNovelDetails,
    getChapterDetails,
    searchNovels,
    getPopularAndNewestNovels,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');  // Multer configuration for file uploads

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting user profile (protected route)
router.get('/profile', authMiddleware, getUserProfile);

// Route for creating a new novel (protected route with cover image upload)
router.post('/novels', authMiddleware, upload.single('coverImage'), createNovel);

// Route for uploading a chapter to a novel (protected route with chapter file upload)
router.post('/novels/:id/chapters', authMiddleware, upload.single('chapterFile'), uploadChapter);

// Route for getting novel details along with its chapters
router.get('/novels/:id', getNovelDetails);

// Route for getting details of a specific chapter in a novel
router.get('/novels/:novelId/chapter/:chapterId', getChapterDetails);

// Route for searching novels by title, description, or category
router.get('/search', searchNovels);

// Route for getting popular and newest novels for the homepage
router.get('/home', getPopularAndNewestNovels);

module.exports = router;

