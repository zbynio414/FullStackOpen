require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize =  new Sequelize(process.env.DATABASE_URL)

const main = async () => {
    try {
        await sequelize.authenticate()
        const notes = await sequelize
            .query("SELECT * FROM notes", { type: QueryTypes.SELECT })
        console.log(notes)
        sequelize.close()
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}

main()