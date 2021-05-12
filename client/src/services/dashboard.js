import ApiService from './api'

const DashboardService = {
    getDashboards: function () {
        return ApiService.get('/dashboards');
    },

    getDashboard: function (dashboardId) {
        return ApiService.get(`/dashboards/${dashboardId}`);
    },

    addDashboard: function (dashboard) {
        return ApiService.post('/dashboards/', dashboard);
    },

    deleteDashboard: function (dashboardId) {
        return ApiService.delete(`/dashboards/${dashboardId}`)
    },

    editDashboard: function (dashboardId, dashboard) {
        return ApiService.put(`/dashboards/${dashboardId}`, dashboard);
    },

    joinDashboard: function (dashboardId) {
        return ApiService.post(`/dashboards/${dashboardId}/join`);
    },

    quitDashboard: function (dashboardId) {
        return ApiService.post(`/dashboards/${dashboardId}/quit`);
    }
}

export default DashboardService

