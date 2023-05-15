import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  let [city, setCity] = useState();
  let [data, setData] = useState({});
  let [info, setInfo] = useState(false);
  let [error, setError] = useState(false);
  console.log(info);
  useEffect(() => {
    city &&
      axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=189271b827844bff7388350c44848615&units=metric`
      )
        .then((data) => {
          setData(data.data);
          setError(false);
          setInfo(true);
        })
        .catch(() => {
          setError(true);
          setInfo(false);
        });
  }, [city]);
  console.log(data);
  return (
    <div className="h-screen flex justify-center items-center main ">
      <div className="flex flex-col items-center container">
        <form
          className="mt-10 "
          onSubmit={(e) => {
            e.preventDefault();
            setCity(document.querySelector("input").value);
          }}
        >
          <input
            type="text"
            placeholder="Enter location"
            className="w-64 mx-auto bg-[#d1d5db8f] p-4 border border-transparent focus:border-transparent focus:outline-none rounded-s-full placeholder-gray-800 placeholder:font-bold"
            name=""
            id=""
          />
          <span className="w-64 mx-auto bg-[#d1d5db8f] p-4 border border-transparent focus:border-transparent focus:outline-none rounded-e-full placeholder-gray-800 placeholder:font-bold"></span>
        </form>
        {info && (
          <>
            <h1 className="my-12 font-bold font text-6xl text-white">
              {data.name}
            </h1>
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-full bg-orange-600"></div>
              <h2 className=" font-bold font text-4xl text-white">
                {data.weather[0].main}
              </h2>
            </div>
            <h3 className=" font-bold font text-6xl text-white my-8">
              {data.main.temp.toFixed()} °C
            </h3>
            <div className="lg:grid-cols-3	grid gap-8 lg:gap-6 w-4/5">
              <div className="col-span-1 bg-[#1c1917d9] py-5 px-10 rounded-xl transition hover:-translate-y-4 w-full text-center">
                <h4 className="text-white text-4xl font-semibold">
                  Feels Like
                </h4>
                <h4 className="text-white text-4xl font-semibold">
                  {data.main.feels_like.toFixed()} °C
                </h4>
              </div>
              <div className="col-span-1 bg-[#1c1917d9] py-5 px-10 rounded-xl transition hover:-translate-y-4 w-full text-center">
                <h4 className="text-white text-4xl font-semibold ">Humidity</h4>
                <h4 className="text-white text-4xl font-semibold text-center">
                  {data.main.humidity}%
                </h4>
              </div>
              <div className="col-span-1 bg-[#1c1917d9] py-5 px-10 rounded-xl transition hover:-translate-y-4 w-full text-center">
                <h4 className="text-white text-3xl font-semibold">
                  Wind Speed
                </h4>
                <h4 className="text-white text-4xl font-semibold">
                  {data.wind.speed.toFixed()} MPH
                </h4>
              </div>
            </div>
          </>
        )}
        {error && (
          <h1 className="my-12 font-bold font text-6xl text-white">
            Enter valid city name{" "}
          </h1>
        )}
        {!info && !error && (
          <h1 className="my-12 font-bold font text-6xl text-white">
            Welcome to our Weather App
          </h1>
        )}
      </div>
    </div>
  );
}
