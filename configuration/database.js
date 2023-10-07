const sequelize = require("sequelize")

const objsequelize = new sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql"
})

// const objsequelize = new sequelize("usam_4", "root", "", {
//     host: "localhost",
//     dialect: "mysql"
// })

module.exports = objsequelize
