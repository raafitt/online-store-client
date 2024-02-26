import axios from 'axios'

const $host=axios.create({
    baseURL:'http://90.156.213.195:5000/'
})

const $authHost=axios.create({
    baseURL:'http://90.156.213.195:5000/'
})

const authInterceptor=(config)=>{
    if(localStorage.getItem('token')!==null) {config.headers.authorization = `Bearer ${localStorage.getItem('token')}` 
    console.log('no null')}
    else config.headers.authorization = `Bearer 4CGljFFxI9Rw3oD-RMLIzUFHmUL0N`
    
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $authHost,
    $host
}