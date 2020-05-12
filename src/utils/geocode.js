const request = require('request')

const geocode = (place,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(place) +'.json?access_token=pk.eyJ1IjoiZXItYW51cGFtLWt1bWFyIiwiYSI6ImNrYTFnaDR4dDAwOG0zZW1sN2l1ajVwOHQifQ.ozImmhMfMulKseqXFLoLYQ&limit=1'

    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback('Unable to connect with location service !',undefined)
        }else if(!body.features[0]){
            callback('Unable to fetch place ! Try searching another')
        }
        else{
            callback(undefined,{
                latitude  : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location  : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode