const bookmarkService = require('../services/bookmark');
const elasticsearchService = require('../services/elasticsearch');

async function addBookmark(req, res) {
    req.body.user = req.user._id;

    const bookmark = await bookmarkService.createBookmark(req.body);

    res.status(201).json(bookmark);

}

async function editBookmark(req, res) {
    req.body.bookmarkId = req.params.id;

    const updatedBookmark = await bookmarkService.updateBookmark(req.body);

    res.json(updatedBookmark);
}

async function deleteBookmark(req, res) {
    await bookmarkService.deleteBookmark(req.params.id);

    res.sendStatus(204);
}

async function getBookmarksByDashboardId(req, res) {
    const bookmarks = await bookmarkService.getBookmarksByDashboardId(req.params.id);

    res.json(bookmarks);
}

async function getBookmarkById(req, res) {
    res.json(await bookmarkService.getBookmarkById(req.params.id));
}

async function getBookmarksByCategoryId(req, res) {
    const bookmarks = await bookmarkService.getBookmarksByCategoryId(req.params.id);

    res.json(bookmarks);
}

async function searchBookmark(req, res) {
    const bookmarks = await elasticsearchService.search(req.params.text, req.user._id)

    res.json(bookmarks)
}

module.exports = {
    addBookmark,
    editBookmark,
    deleteBookmark,
    getBookmarksByDashboardId,
    getBookmarkById,
    getBookmarksByCategoryId,
    searchBookmark
}