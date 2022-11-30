require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

const { PORT, SERVER_IP } = process.env

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./initDB')()

app.get('/checkserver', (req, res) => res.send('Hello World'))

app.listen(3000, () => {
    console.log('REST API running on port 3000')
})

let corsOptions = {
    origin: '*', // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
}

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'react/build')))
app.use(express.static(path.join(__dirname, 'mongoui/build')))
app.use('/test', require('./routes/test'))
app.use('/summary', require('./routes/summary'))
app.use('/menu', require('./routes/menu'))

app.get('/commercial-analysis/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/react/build/index.html'))
})

app.get('/dbui/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/mongoui/build/index.html'))
  })

app.listen(PORT, SERVER_IP, () => console.log(`Server listening on ip ${SERVER_IP} on port ${PORT}`))