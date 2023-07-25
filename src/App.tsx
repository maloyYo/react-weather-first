import { useRef, useState } from 'react';
import axios from 'axios';
const API_key = '48309d31f24c1786908ad5030610fecb';

function App() {
  const [apidata, setApiData] = useState(null);
  const inputRef = useRef(null);
  const [showWeather, setShowWeather] = useState(null);
  const WeatherTypes = [
    {
      type: 'Clear',
      img: 'https://cdn-icons-png.flaticon.com/512/6974/6974833.png',
    },
    {
      type: 'Rain',
      img: 'https://cdn-icons-png.flaticon.com/512/3351/3351979.png',
    },
    {
      type: 'Snow',
      img: 'https://cdn-icons-png.flaticon.com/512/642/642102.png',
    },
    {
      type: 'Clouds',
      img: 'https://cdn-icons-png.flaticon.com/512/414/414825.png',
    },
    {
      type: 'Haze',
      img: 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png',
    },
    {
      type: 'Smoke',
      img: 'https://cdn-icons-png.flaticon.com/512/4380/4380458.png',
    },
    {
      type: 'Mist',
      img: 'https://cdn-icons-png.flaticon.com/512/4005/4005901.png',
    },
    {
      type: 'Drizzle',
      img: 'https://cdn-icons-png.flaticon.com/512/3076/3076129.png',
    },
  ];

  const fetchWeather = () =>
    axios

      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&appid=${API_key}`,
      )
      .then((data) => {
        setShowWeather(
          WeatherTypes.filter((weather) => weather.type === data.data.weather[0].main),
        ),
          setApiData(data.data);
      })
      .catch((err) => console.log(err));
  console.log(apidata);

  return (
    <div className="bg-gray-700 h-screen grid place-items-center ">
      <div className="bg-white w-96 p-4  rounded-md ">
        <div className="flex items-center justify-between">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter the City"
            className="flex-1 text-xl border-b p-1 border-gray-200 font-semibold uppercase"
          />
          <button onClick={fetchWeather}>
            <img src="../src/assets/Searchicon.png" alt="" className="w-8" />
          </button>
        </div>

        {showWeather && (
          <div>
            <div className="text-center flex flex-col gap-6 mt-10">
              {apidata && <p className="text-xl font-semibold">{apidata.name}</p>}

              <img src={showWeather[0]?.img} alt="img" className="w-52 mx-auto" />
              <h3 className="text-2xl font-bold text-zinc-800">{showWeather[0].type}</h3>
            </div>
            <>
              <div className="flex justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                  alt="..."
                  className="h-9 mt-1"
                />
                <h2 className="text-4xl font-extrabold">{apidata.main.temp}&#176;C</h2>
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
