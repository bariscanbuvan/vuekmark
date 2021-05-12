import ApiService from './api'

const BookmarkService = {
    getBookmarksByDashboardId: function (dashboardId) {
        return ApiService.get(`/dashboards/${dashboardId}/bookmarks`);
    },

    getBookmarksByCategoryId: function (categoryId) {
        return ApiService.get(`/categories/${categoryId}/bookmarks`);
    },

    getBookmark: function (bookmarkId) {
        return ApiService.get(`/bookmarks/${bookmarkId}`);
    },

    searchBookmark: function(searchText) {
        return ApiService.get(`/bookmarks/search/${searchText}`);
    },

    addBookmark: function (bookmark) {
        return ApiService.post(`/bookmarks/`, bookmark)
    },

    editBookmark: function (bookmarkId, bookmark) {
        return ApiService.put(`/bookmarks/${bookmarkId}`, bookmark);
    },

    deleteBookmark: function (bookmarkId) {
        return ApiService.delete(`/bookmarks/${bookmarkId}`);
    }
}

export default BookmarkService

