const categoryService = require('../services/category');

async function addCategory(req, res) {
    req.body.createdBy = req.user._id;

    const category = await categoryService.createCategory(req.body);

    res.status(201).json(category);
}

async function editCategory(req, res) {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);

    res.json(updatedCategory);
}

async function deleteCategory(req, res) {
    await categoryService.deleteCategory(req.params.id);

    res.sendStatus(204);
}

async function getCategoriesByDashboardId(req, res) {
    const category = await categoryService.getCategoriesByDashboardId(req.params.id);

    res.json(category);
}

async function getCategoryByCategoryId(req, res) {
    res.json(await categoryService.getCategoryByCategoryId(req.params.id));
}

module.exports = {
    addCategory,
    editCategory,
    deleteCategory,
    getCategoriesByDashboardId,
    getCategoryByCategoryId
}