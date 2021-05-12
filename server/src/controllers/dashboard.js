const dashboardService = require('../services/dashboard');

async function getDashboardsByUserId(req, res) {
    const dashboards = await dashboardService.getDashboardsByUserId(req.user._id);

    res.send(dashboards);
}

async function getDashboardByDashboardId(req, res) {
    res.json(await dashboardService.getDashboardByDashboardId(req.params.id));
}

async function addDashboard(req, res) {
    req.body.user = req.user._id;

    let dashboard = await dashboardService.createDashboard(req.body);

    res.status(201).json(dashboard);
}

async function editDashboard(req, res) {
    const updatedDashboard = await dashboardService.updateDashboard(req.params.id, req.body);
    res.send(updatedDashboard);
}

async function deleteDashboard(req, res) {
    await dashboardService.deleteDashboard(req.params.id);

    res.sendStatus(204);
}

async function joinDashboard(req, res) {
    await dashboardService.joinDashboard(req.params.id, req.user._id);

    res.sendStatus(200);
}

async function quitDashboard(req, res) {
    await dashboardService.quitDashboard(req.params.id, req.user._id);

    res.sendStatus(200);
}

module.exports = {
    getDashboardsByUserId,
    getDashboardByDashboardId,
    addDashboard,
    editDashboard,
    deleteDashboard,
    joinDashboard,
    quitDashboard
}

