const router = require('express').Router();
const CategoryController = require('../controllers/category');
const BookmarkController = require('../controllers/bookmark');

router.post('/', CategoryController.addCategory);
router.put('/:id', CategoryController.editCategory);
router.get('/:id', CategoryController.getCategoryByCategoryId)
router.delete('/:id', CategoryController.deleteCategory);
router.get('/:id/bookmarks', BookmarkController.getBookmarksByCategoryId)

module.exports = router;