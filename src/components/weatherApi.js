const API_KEY = '3c63058e41da01cb204eb531365fe2b9' ;
const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png` ;

const getFormattedWeatherData = async (city,units = 'metric' ) => {
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}` ;

    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data) ;
    
    const {weather,main: {temp,humidity,temp_min,temp_max},wind:{speed},sys:{country},name} = data ;

    const {description,icon} = weather[0] ;

    return{
        description, 
        iconURl : makeIconURL(icon), 
        temp, 
        temp_min, 
        temp_max, 
        humidity, 
        speed, 
        country, 
        name 
    };
    // console.log(data) 
};

export {getFormattedWeatherData}