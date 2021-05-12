const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../server/src/public"),
    devServer: {
        port: process.env.VUE_APP_PORT || 8001
    }
}