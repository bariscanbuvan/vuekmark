const Bookmark = require('../models/bookmark');
const elasticsearchService = require('./elasticsearch');
const ApiError = require('../middlewares/ApiError');
var axios = require('axios');

async function scrapeBookmark(url) {
    var data = JSON.stringify({ 'url': url });
    var config = {
        method: 'get',
        url: process.env.SCRAPER_SERVICE_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const scrapeResponse = (await axios(config)).data

    return scrapeResponse;
}

async function createBookmark(bookmark) {
    try {
        const { title, description } = await scrapeBookmark(bookmark.url)

        bookmark.description = description;
        if (!bookmark.title)
            bookmark.title = title

    } catch (error) {
        if (!bookmark.title)
            bookmark.title = bookmark.url;
        bookmark.description = ''
    }

    const savedBookmark = await Bookmark(bookmark).save();

    await elasticsearchService.index(savedBookmark._id);

    return savedBookmark;
}

async function updateBookmark(bookmark) {
    if (!bookmark.title) {
        try {
            bookmark.title = await title.getTitle(req.body.url);
        } catch (error) {
            bookmark.title = bookmark.url;
        }
    }
    const updatedBookmark = await Bookmark.findByIdAndUpdate(bookmark.bookmarkId, {
        title: bookmark.title,
        tags: bookmark.tags,
        url: bookmark.url,
        category: bookmark.category,
        dashboard: bookmark.dashboard
    }, { runValidators: true, new: true });

    if (!updatedBookmark) {
        throw new ApiError('Bookmark not found', 404)
    }

    await elasticsearchService.updateDocument(updatedBookmark._id);

    return updatedBookmark;
}

async function getBookmarksByDashboardId(dashboardId) {
    const bookmarks = await Bookmark.find({ dashboard: dashboardId }).populate('category');

    return bookmarks;
}

async function getBookmarkById(bookmarkId) {
    const bookmark = await Bookmark.findById(bookmarkId).populate('category');

    if (!bookmark) {
        throw new ApiError('Bookmark not found', 404)
    }

    return bookmark;
}

async function getBookmarksByCategoryId(categoryId) {
    const bookmarks = await Bookmark.find({ category: categoryId }).populate('category').exec();

    if (!bookmarks) {
        throw new ApiError('Bookmark not found', 404)
    }

    return bookmarks;
}

async function deleteBookmark(bookmarkId) {
    await Bookmark.findByIdAndDelete(bookmarkId);

    await elasticsearchService.deleteDocument(bookmarkId);
}

function deleteBookmarksByDashboardId(dashboardId) {
    return Bookmark.find({ dashboard: dashboardId }).remove().exec();
}

function deleteBookmarksByCategoryId(categoryId) {
    return Bookmark.find({ category: categoryId }).remove().exec();
}

module.exports = {
    createBookmark,
    updateBookmark,
    getBookmarksByDashboardId,
    getBookmarkById,
    getBookmarksByCategoryId,
    deleteBookmark
}