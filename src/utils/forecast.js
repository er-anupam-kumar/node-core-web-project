const request = require('request')

const forecast= (lat,long,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=f07a5f671f655ec9e15e31b21cbcea82&query='+ lat +','+ long +'&units=m'

request({url,json:true},(error,{body}={})=>{
    if(error){
        callback('Unable to connect with weather service !',undefined)
    }else if(body.error){
        callback('Unable to fetch weather !',undefined)
    }else{
        const current = body.current
        callback(undefined,{
            description:current.weather_descriptions[0],
            temperature:current.temperature,
            feelslike:current.feelslike,
            message:current.weather_descriptions[0]+'. Current temperature is '+current.temperature+' degree Celcius and it feels like '+current.feelslike+' degrees'
        })
    }
})
}

module.exports = forecast