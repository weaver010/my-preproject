const User = require('../models/User');
const Novel = require('../models/Novel');
const Chapter = require('../models/Chapter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// User Registration
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Failed to register user:', error);
        res.status(500).json({ message: 'User registration failed', error });
    }
};

// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Failed to log in user:', error);
        res.status(500).json({ message: 'Login failed', error });
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Failed to retrieve user profile:', error);
        res.status(500).json({ message: 'Failed to retrieve user profile', error });
    }
};

// Create a New Novel
exports.createNovel = async (req, res) => {
    const { title, description, category } = req.body;
    const coverImage = req.file ? `/uploads/novelCovers/${req.file.filename}` : null;

    try {
        // Logging the incoming data to debug the issue
        console.log('Received novel data:', { title, description, category, coverImage });

        // Validating the required fields
        if (!title || !description || !category) {
            return res.status(400).json({ message: 'Title, description, and category are required' });
        }

        const novel = await Novel.create({
            title,
            description,
            category,
            coverImage,
            userId: req.user.id,
        });

        res.status(201).json(novel);
    } catch (error) {
        console.error('Failed to create novel:', error);
        res.status(500).json({ message: 'Failed to create novel', error });
    }
};

// Upload a Chapter for a Novel
exports.uploadChapter = async (req, res) => {
    const { id } = req.params;
    const chapterFile = req.file ? `/uploads/chapters/${req.file.filename}` : null;

    try {
        const novel = await Novel.findByPk(id);
        if (!novel || novel.userId !== req.user.id) {
            return res.status(404).json({ message: 'Novel not found or not authorized' });
        }

        const chapter = await Chapter.create({
            title: req.body.title,
            file: chapterFile,
            novelId: id,
        });

        res.status(201).json(chapter);
    } catch (error) {
        console.error('Failed to upload chapter:', error);
        res.status(500).json({ message: 'Failed to upload chapter', error });
    }
};

// Get Novel Details
exports.getNovelDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const novel = await Novel.findByPk(id, {
            include: Chapter,
        });

        if (!novel) {
            return res.status(404).json({ message: 'Novel not found' });
        }

        res.status(200).json(novel);
    } catch (error) {
        console.error('Failed to retrieve novel details:', error);
        res.status(500).json({ message: 'Failed to retrieve novel details', error });
    }
};

// Get Chapter Details
exports.getChapterDetails = async (req, res) => {
    const { novelId, chapterId } = req.params;

    try {
        const chapter = await Chapter.findOne({
            where: { id: chapterId, novelId },
        });

        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        // Fetch the previous and next chapters for navigation
        const previousChapter = await Chapter.findOne({
            where: { novelId, id: { [Op.lt]: chapterId } },
            order: [['id', 'DESC']],
        });

        const nextChapter = await Chapter.findOne({
            where: { novelId, id: { [Op.gt]: chapterId } },
            order: [['id', 'ASC']],
        });

        res.status(200).json({
            chapter,
            previousChapterId: previousChapter ? previousChapter.id : null,
            nextChapterId: nextChapter ? nextChapter.id : null,
        });
    } catch (error) {
        console.error('Failed to retrieve chapter details:', error);
        res.status(500).json({ message: 'Failed to retrieve chapter details', error });
    }
};

// Search for Novels
exports.searchNovels = async (req, res) => {
    const { query } = req.query;

    try {
        const novels = await Novel.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } },
                    { category: { [Op.like]: `%${query}%` } },
                ],
            },
        });

        res.status(200).json(novels);
    } catch (error) {
        console.error('Failed to search novels:', error);
        res.status(500).json({ message: 'Failed to search novels', error });
    }
};

// Get Popular and Newest Novels for Homepage
exports.getPopularAndNewestNovels = async (req, res) => {
    try {
        const popularNovels = await Novel.findAll({
            order: [['views', 'DESC']],
            limit: 8,  // Increased to 8
        });

        const newestNovels = await Novel.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5,
        });

        res.status(200).json({ popularNovels, newestNovels });
    } catch (error) {
        console.error('Failed to fetch novels for homepage:', error);
        res.status(500).json({ message: 'Failed to fetch novels for homepage', error });
    }
};

