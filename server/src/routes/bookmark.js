const router = require('express').Router();
const BookmarkController = require('../controllers/bookmark');

router.post('/', BookmarkController.addBookmark)
router.put('/:id', BookmarkController.editBookmark)
router.delete('/:id', BookmarkController.deleteBookmark);
router.get('/:id', BookmarkController.getBookmarkById);
router.get('/search/:text', BookmarkController.searchBookmark);

module.exports = router;