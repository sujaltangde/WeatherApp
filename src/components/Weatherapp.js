import React, { useEffect, useState } from 'react'
import cold from '../assests/cold.jpg';
import hot from '../assests/hot.jpg';
import '../components/Weatherapp.css'
import { FaArrowDown } from 'react-icons/fa'
import { FaArrowUp } from 'react-icons/fa'
import { FaWind } from 'react-icons/fa'
import { BsDroplet } from 'react-icons/bs'
import { getFormattedWeatherData } from './weatherApi';


export const Weatherapp = () => {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [city, setCity] = useState('paris')
  const [bg, setBg] = useState(hot);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setloader(true)
      const data = await getFormattedWeatherData(city, units);
      // console.log(data)
      setWeather(data)

      //dynamic background
      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(cold)
      else setBg(hot)
      setloader(false)
    }
    fetchWeatherData();
  }, [units, city])


  const handleUnitsClick = () => {
    const isCelsius = units === 'metric';
    setUnits(isCelsius ? 'imperial' : 'metric');
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }




  return (
    <>

      <div className="container-fluid position-relative  vh-100 bg-image">

        <div className="background-image full-background text-center vh-100 position-absolute top-0 start-0 end-0" style={{
          backgroundImage: `url(${bg})`
        }}>

          {weather &&

            <div >

              <div className='text-white bg-dark py-2 bold font-title opacity-75' > Weather App</div>

              <div className="container rounded first-cc opacity-75 bg-dark px-5 my-3 search-button py-3 d-flex  justify-content-between align-items-center">
                <input type="text" onKeyDown={enterKeyPressed} className='rounded px-2 py-1 border mx-2  text-white bg-dark  border-white no-outline ' placeholder='Enter City...' />




                <button onClick={handleUnitsClick} className='rounded border-0 bold-l bg-light px-5'>
                  {units === 'metric' ? '°F' : '°C'}
                </button>
              </div>



              <div className="container rounded opacity-75 container bg-dark px-5 my-5 d-flex justify-content-between align-items-center ">
                <div className='d-flex bold-l flex-column text-white py-3' >
                  <p>{weather.name} , {weather.country}</p>
                  <p>{weather.description}</p>
                </div>
                <img src={weather.iconURl} height="100px" alt="" />
                <div className='text-white'>
                  <h1 className="bold font-weight-bold">
                    {weather.temp.toFixed()} {units === 'metric' ? '\u00B0C' : '\u00B0F'}
                  </h1>
                </div>
              </div>



              <div className="container d-flex flex-row">

                <div className="container d-flex flex-column gap-5 justify-content-center align-items-center">

                  <div className='rounded d-flex flex-column bold-l box opacity-75 h-50 align-items-center justify-content-center w-75 bg-dark text-white py-2' >
                    <p > <FaArrowDown /> Min </p>
                    <h3 className='bold-l'>{weather.temp_min.toFixed()} {units === 'metric' ? '\u00B0C' : '\u00B0F'}</h3>
                  </div>

                  <div className='rounded d-flex flex-column bold-l box opacity-75 h-50 align-items-center justify-content-center w-75 bg-dark text-white py-2' >
                    <p > <BsDroplet /> Humidity </p>
                    <h3 className='bold-l'>{weather.humidity}%</h3>
                  </div>

                </div>
                <div className="container d-flex flex-column gap-5 justify-content-center align-items-center">

                  <div className=' rounded d-flex flex-column bold-l box opacity-75 h-50  align-items-center justify-content-center w-75 bg-dark text-white py-2' >
                    <p > <FaArrowUp /> Max </p>
                    <h3 className='bold-l'>{weather.temp_max.toFixed()} {units === 'metric' ? '\u00B0C' : '\u00B0F'}</h3>
                  </div>

                  <div className=' rounded d-flex flex-column bold-l box opacity-75 h-50  align-items-center justify-content-center w-75 bg-dark text-white py-2' >
                    <p > <FaWind /> Wind Speed </p>
                    <h3 className='bold-l'>{weather.speed.toFixed()} {units === 'metric' ? 'm/s' : 'm/h'}</h3>
                  </div>

                </div>

              </div>

            </div>
          }

        </div>

      </div>



    </>
  )
}
