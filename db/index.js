const path = require("path"); 
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(path.resolve(`${__dirname}/db.json`));

exports.initDb = low(adapter); 
