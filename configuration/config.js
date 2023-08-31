const sequelize = require("sequelize")

const objsequelize = new sequelize("usam_4", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = objsequelize