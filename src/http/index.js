import axios from 'axios'

const $host=axios.create({
    baseURL:'http://90.156.213.195:5000/'
})

const $authHost=axios.create({
    baseURL:'http://90.156.213.195:5000/'
})

const authInterceptor=(config)=>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $authHost,
    $host
}