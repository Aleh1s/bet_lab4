import express from 'express'
import * as path from "path";
import {fileURLToPath} from 'url';
import {coordinatesByCityName, getWeather} from "./weatherApi";
import hbs from 'hbs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.set('view engine', 'hbs')
app.set('views', __dirname + '/../views')

app.use('/static', express.static(__dirname + '/../public'));

hbs.registerPartials(__dirname + '/../partials')

app.get('/', (_, res) => {
    res.render('cities', {cities: Object.keys(coordinatesByCityName)})
})

app.get('/weather/:city?', async (req, res) => {
    const cityName = req.params.city ?? req.query.city
    if (!cityName || typeof cityName !== 'string') {
        res.status(400).send('Please provide a city')
    } else {
        const coordinates = coordinatesByCityName[cityName]
        if (!coordinates) {
            res.status(404).send('City is not supported yet or does not exist')
        } else {
            try {
                const weather = await getWeather(coordinates)
                res.render('weather', {cityName, weather})
            } catch (err) {
                console.error(err)
                res.status(500).send('Something went wrong')
            }
        }
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
