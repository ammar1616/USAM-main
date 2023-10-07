const sequelize = require("../configuration/database")
module.exports = createtable = () => {
    sequelize.sync().then(
        res => console.log("Table Created")
    ).catch(err => console.log(`Error Occured ${err}`))
}