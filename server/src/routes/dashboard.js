const router = require('express').Router();
const DashboardController = require('../controllers/dashboard');
const CategoryController = require('../controllers/category');
const BookmarkController = require('../controllers/bookmark');

router.post('/', DashboardController.addDashboard)
router.get('/', DashboardController.getDashboardsByUserId)
router.get('/:id', DashboardController.getDashboardByDashboardId);
router.put('/:id', DashboardController.editDashboard)
router.delete('/:id',DashboardController.deleteDashboard);
router.post('/:id/join', DashboardController.joinDashboard)
router.post('/:id/quit', DashboardController.quitDashboard)
router.get('/:id/bookmarks', BookmarkController.getBookmarksByDashboardId);
router.get('/:id/categories', CategoryController.getCategoriesByDashboardId);

module.exports = router;

