const sequelize = require("../configuration/config")
module.exports = createtable = () => {
    sequelize.sync().then(
        res => console.log("Table Created")
    ).catch(err => console.log(`Error Occured ${err}`))
}