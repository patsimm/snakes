const path = require('path')
const app = require('express')()

app.get('/game.js', (req, res) => {
	res.sendFile(path.join(__dirname, '..', '..', 'dist', 'game.js'))
})

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'))
})

module.exports = app