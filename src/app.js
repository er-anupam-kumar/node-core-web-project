const path    = require('path')
const express = require('express')
const app     = express()
const hbs     = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

//Define path for express configuration
const pathToPublic   = path.join(__dirname,'../public')
const pathToViews    = path.join(__dirname,'../templates/views')
const pathToPartials = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',pathToViews)
hbs.registerPartials(pathToPartials)

//Setup static directory to serve
app.use(express.static(pathToPublic))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Homepage',
        name:'Anupam Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
    title:'Help Page',
    name:'Anupam Kumar'
})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Anupam'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.place)
    {
        return res.send({
            error:'Please provide a valid place.'
        })
    }

    geocode(req.query.place,(error, { latitude, longitude, location } = {})=>{
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location :  location,
                forecast :  forecastData.message,
                place    :  req.query.place
            })
        })
    
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404-not-found',{
        title:'404',
        message:'Article not found',
        name:'Anupam Kumar'
    })
})

app.get('*',(req,res)=>{
    res.render('404-not-found',{
        title:'404',
        message:'404 Page not Found',
        name:'Anupam Kumar'
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running on port:3000')
})