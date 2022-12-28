const NodeCache = require("node-cache");
const SettingCache = new NodeCache({ checkperiod: 0 });

module.exports.settings = SettingCache;
