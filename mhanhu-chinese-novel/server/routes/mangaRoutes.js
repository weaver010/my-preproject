const express = require('express');
const { getAllManga, getMangaById, addManga, addChapter } = require('../controllers/mangaController');

const router = express.Router();

router.get('/', getAllManga);
router.get('/:id', getMangaById);
router.post('/', addManga);
router.post('/:id/chapters', addChapter);

module.exports = router;

