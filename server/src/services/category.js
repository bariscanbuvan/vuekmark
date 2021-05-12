const Category = require('../models/category');
const ApiError = require('../middlewares/ApiError');

async function getCategoryByCategoryId(categoryId) {
    const category = await Category.findById(categoryId);

    if (!category)
        throw new ApiError('Category not found', 404);

    return category;
}

async function getCategoriesByDashboardId(dashboardId) {
    const categories = await Category.find({ dashboard: dashboardId });

    return categories;
}

async function createCategory(category) {
    return await Category(category).save();
}

async function updateCategory(categoryId, category) {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
        name: category.name,
        color: category.color,
        visible: category.visible,
        dashboard: category.dashboard,
        createdBy: category.createdBy
    }, { runValidators: true, new: true });

    if (!updatedCategory) {
        throw ApiError('Category not found', 404);
    }

    return updatedCategory;
}

async function deleteCategory(categoryId) {
    await Category.findByIdAndDelete(categoryId);
}

async function deleteCategoriesByDashboardId(dashboardId) {
    return Category.find({ dashboard: dashboardId }).remove().exec();
}

module.exports = {
    getCategoryByCategoryId,
    getCategoriesByDashboardId,
    createCategory,
    updateCategory,
    deleteCategory
}