console.log('Client side rendering is up and running.')

const form    = document.querySelector('.weather-form')
const place   = document.querySelector('.place-input')
const message = document.querySelector('.message') 

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    message.innerHTML = 'Loading...'
    message.classList.remove('alert-success')
    message.classList.remove('alert-danger')
    message.classList.add('alert-warning')

    const search = place.value

    fetch('/weather?place='+search).then((response)=>{
        response.json().then((data)=>{

            message.classList.remove('alert-warning')

            if(data.error)
            {
                message.classList.add('alert-danger')
                message.innerHTML=data.error
            }
            else
            {    
                message.classList.add('alert-success')
                message.innerHTML=data.location+ ' : ' +data.forecast
            }
    
        })
    })
})