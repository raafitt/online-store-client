import axios from 'axios'

const $host=axios.create({
    baseURL:'http://192.168.0.105:5000/'
})

const $authHost=axios.create({
    baseURL:'http://192.168.0.105:5000/'
})

const authInterceptor=(config)=>{
    config.headers.authorization=`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImVtYWlsIjoidXNlcjEyMzQ1Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzA4NzkwNDY3LCJleHAiOjE3MDg4NzY4Njd9.UYJQJ6_EM9GsHMNNr7pS2SLeGhD46FTESctMyFV3mYg`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $authHost,
    $host
}