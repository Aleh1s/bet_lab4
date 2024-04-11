import ky from "ky";
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY ?? ''

interface Coordinates {
    lon: number
    lat: number
}

interface CoordinatesByCityNameType {
    [key: string]: Coordinates
}

interface Coord {
    lon: number
    lat: number
}

interface Weather {
    id: number
    main: string
    description: string
    icon: string
}

interface Main {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
}

interface Wind {
    speed: number
    deg: number
    gust: number
}

interface Rain {
    "1h": number
}

interface Clouds {
    all: number
}

interface Sys {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
}

interface WeatherData {
    coord: Coord
    weather: Weather[]
    base: string
    main: Main
    visibility: number
    wind: Wind
    rain: Rain
    clouds: Clouds
    dt: number
    sys: Sys
    timezone: number
    id: number
    name: string
    cod: number
}

export const coordinatesByCityName: CoordinatesByCityNameType = {
    'Львів': {lat: 49.8397, lon: 24.0297},
    'Тернопіль': {lat: 49.5535, lon: 25.5948},
    'Одеса': {lat: 46.4775, lon: 30.7326},
    'Київ': {lat: 50.4501, lon: 30.5234},
    'Черкаси': {lat: 49.4444, lon: 32.0597},
    'Бердичів': {lat: 49.9433, lon: 28.5906}
}


export const getWeather = async (coordinates: Coordinates) => {
    return ky.get('https://api.openweathermap.org/data/2.5/weather', {
        searchParams: {
            ...coordinates,
            units: 'metric',
            appid: API_KEY
        }
    }).json<WeatherData>()
}