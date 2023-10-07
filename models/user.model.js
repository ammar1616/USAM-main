const sequelize = require("sequelize")
const objsequelize = require("../configuration/database")

const users = objsequelize.define("user", {
    fullname: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    phone: {
        type: sequelize.INTEGER
    },
    dateofbirth: {
        type: sequelize.DATEONLY
    },
    job_title: {
        type: sequelize.STRING
    },
    company_name: {
        type: sequelize.STRING
    },
    country: {
        type: sequelize.STRING
    },
    city: {
        type: sequelize.STRING
    },
    fb_url: {
        type: sequelize.STRING
    },
    committee: {
        type: sequelize.STRING
    },
    education: {
        type: sequelize.STRING
    },
    attend_before: {
        type: sequelize.STRING
    },
    role: {
        type: sequelize.STRING
    }
})

const contactus_users = objsequelize.define("contactus_user", {
    fullname: {
        type: sequelize.STRING
    },
    phone: {
        type: sequelize.INTEGER
    },
    email: {
        type: sequelize.STRING
    },
    message: {
        type: sequelize.STRING
    }
})

module.exports = {
    users,
    contactus_users
}