import { FaMapMarkedAlt, FaSearch } from "react-icons/fa"
import HourlyForecast from "./components/HourlyForecast"
import axios from 'axios';
import { useState } from "react";


const App = () => {

  const [weatherData,setWeatherData]=useState(null);

  const [city,setCity]=useState('');

  const [error,setError]=useState("");
  
  
  const api_key = '51682d8267ab421c8ea113832251305'
  const api_url = 'http://api.weatherapi.com/v1/forecast.json'

      const fetchData = async () =>{
        try{
          const response = await axios.get(`${api_url}?key=${api_key}&q=${city}&days=1`);
          console.log(response.data.forecast.forecastday[0].hour);
          setWeatherData(response.data);
          setError('')

        }catch(err){
          console.log("There was an Error ",{err});
          setError("There was an error or the city was not found.")
          setWeatherData(null)
          
        }
      }
        


      const handleKeyPress = (event)=>{
        if(event.key === "Enter"){
          fetchData();
        }
      }

  return (
    <div className='bg-green-100 min-h-screen flex items-center justify-center'>

      {/* -----card container------ */}
      <div className='bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm'>
        <div className="flex">

          {/* input-field and search button */}
          
          <div className="flex border rounded items-center px-2 py-2 w-full">
            <FaSearch className="h-5 w-5"/>
            <input type="text"
                   placeholder='Enter City Name'
                   value={city}
                   onChange={(e)=>setCity(e.target.value)}
                   onKeyUp={handleKeyPress}
                   className='pl-2 border-none focus:outline-none w-full' />
          </div>

          {/* --------button-------- */}
          <button onClick={fetchData} className="px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-700">
            <FaMapMarkedAlt className="w-5 h-5"/>
            </button>
        </div>

        {/* --------Display Error Message------- */}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

         {/* -------weather data display------- */}
         {weatherData && (
          <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">{weatherData.location.name}</h2>

          {/*-------- Weather-icon--------- */}
          <img src={weatherData.current.condition.icon} className="mx-auto h-40" />
          <p className="text-lg font-semibold">{weatherData.current.temp_c} °C</p>
          <p className="text-sm capitalize font-semibold">{weatherData.current.condition.text}</p>

          {/*------Hourly Forecast------ */}

          <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour}/>
         </div>
         )}

      </div>
    </div>
  )
}

export default App