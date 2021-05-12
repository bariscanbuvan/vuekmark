import ApiService from './api'

const CategoryService = {
    getCategories: function (dashboardId) {
        return ApiService.get(`/dashboards/${dashboardId}/categories/`)
    },

    getCategory: function (categoryId) {
        return ApiService.get(`/categories/${categoryId}`);
    },

    addCategory: function (category) {
        return ApiService.post(`/categories/`, category);
    },

    editCategory: function (categoryId, category) {
        return ApiService.put(`/categories/${categoryId}`, category);
    },

    deleteCategory: function (categoryId) {
        return ApiService.delete(`/categories/${categoryId}`);
    }
}

export default CategoryService

