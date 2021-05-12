const Dashboard = require('../models/dashboard');
const ApiError = require('../middlewares/ApiError');

async function getDashboardsByUserId(userId) {
    return await Dashboard.find({ user: userId });
}

async function getDashboardByDashboardId(dashboardId) {
    const dashboard = await Dashboard.findById(dashboardId)

    if (!dashboard) {
        throw new ApiError('Dashboard not found', 404)
    }

    return dashboard;
}
async function createDashboard(dashboard) {
    return await Dashboard(dashboard).save();
}

async function updateDashboard(dashboardId, dashboard) {
    const updatedDashboard = await Dashboard.findByIdAndUpdate(dashboardId, {
        name: dashboard.name,
        color: dashboard.color,
    }, { runValidators: true, new: true });

    if (!updatedDashboard) {
        throw new ApiError('Dashboard not found', 404)
    }

    return updatedDashboard;
}

async function deleteDashboard(dashboardId) {
    await Dashboard.findByIdAndDelete(dashboardId)
}

async function joinDashboard(dashboardId, userId) {
    const joinedDashboard = await Dashboard.findByIdAndUpdate(dashboardId, { $push: { user: userId } });

    if (!joinedDashboard) {
        throw new ApiError('Dashboard not found', 404)
    }
}

async function quitDashboard(dashboardId, userId) {

    const leftDashboard = await Dashboard.findByIdAndUpdate(dashboardId, { $pullAll: { user: [userId] } });

    if (!leftDashboard) {
        throw new ApiError('Dashboard not found', 404)
    }
}

module.exports = {
    getDashboardsByUserId,
    getDashboardByDashboardId,
    createDashboard,
    updateDashboard,
    deleteDashboard,
    joinDashboard,
    quitDashboard
}