require('dotenv').config()
const app = require('./server')

app.listen(process.env.PORT)

console.log(`Listening to port ${process.env.PORT}...`)