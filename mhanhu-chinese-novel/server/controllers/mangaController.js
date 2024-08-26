const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');

exports.getAllManga = async (req, res) => {
    try {
        const manga = await Manga.findAll();
        res.status(200).json(manga);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve manga', error });
    }
};

exports.getMangaById = async (req, res) => {
    const { id } = req.params;

    try {
        const manga = await Manga.findByPk(id, {
            include: Chapter
        });

        if (!manga) {
            return res.status(404).json({ message: 'Manga not found' });
        }

        res.status(200).json(manga);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve manga', error });
    }
};

exports.addManga = async (req, res) => {
    const { title, description, coverImage } = req.body;

    try {
        const newManga = await Manga.create({
            title,
            description,
            coverImage
        });

        res.status(201).json(newManga);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add manga', error });
    }
};

exports.addChapter = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const manga = await Manga.findByPk(id);

        if (!manga) {
            return res.status(404).json({ message: 'Manga not found' });
        }

        const newChapter = await Chapter.create({
            title,
            content,
            mangaId: id
        });

        res.status(201).json(newChapter);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add chapter', error });
    }
};

