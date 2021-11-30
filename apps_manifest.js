const path = require("path");
const fs = require("fs");

const REACT_APPS = [];
const APPS_DIR = path.join(__dirname, "src", "apps");

fs.readdirSync(APPS_DIR).map(async (file) => {
    if (!fs.statSync(path.resolve(APPS_DIR, file)).isDirectory()) return;
    REACT_APPS.push({ 
        name: file 
    });
});

module.exports = { REACT_APPS, APPS_DIR };
