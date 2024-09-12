const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const path = require('path')

const baseRouter = require('./routes/cohorts')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))

app.use(express.urlencoded({
    extended: false
}))

app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        const method = req.body._method
        delete req.body._method
        return method
    }
}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.redirect('/cohorts'))
app.use('/cohorts', baseRouter)



const PORT = process.env.PORT || 4545;
const DOMAIN = 'localhost'
app.listen(PORT, DOMAIN, () => {
    console.log(`Listening at http://${DOMAIN}:${PORT} in ${app.get('env')} environment`)
})