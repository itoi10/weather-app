import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export interface Weather {
  coord: Coord;
  weather?: (WeatherEntity)[] | null;
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
export interface Coord {
  lon: number;
  lat: number;
}
export interface WeatherEntity {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}
export interface Wind {
  speed: number;
  deg: number;
}
export interface Clouds {
  all: number;
}
export interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Props {
  city_name: string;
  color_name: string;
}

const Weather: React.FC<Props> = ({ city_name, color_name }) => {
  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const ICON_URL = "https://openweathermap.org/img/w";

  const [data, setData] = useState<Weather>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${WEATHER_API_URL}?q=${city_name}&units=metric&&appid=${process.env.REACT_APP_OW_API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        // 読み込み完了!
        setLoading(false);
      });
  }, [city_name]);

  // 読み込み中
  if (loading || !data || !data.weather) {
    return (
      <div className="w-96 h-56 flex justify-center items-center">
        <svg
          className={`animate-spin -ml-1 mr-3 h-10 w-10 text-${color_name}-500`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div
        className={`w-96 h-56 m-auto bg-gradient-to-r from-${color_name}-500 to-${color_name}-300 rounded-xl shadow-2xl
                  transform hover:scale-110 transition-transform text-white relative`}
      >
        <div className="w-full px-8 absolute top-6">
          <div className="flex justify-between">
            {/* 都市名 */}
            <div>
              <p className="font-light">場所</p>
              <p className="text-lg font-medium tracking-widest">{data.name}</p>
            </div>
            {/* 天気画像 */}
            <div>
              <img
                src={`${ICON_URL}/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
            </div>
          </div>
          <div className="pt-2">
            {/* 天気 */}
            <p className="font-light">天気</p>
            <p className="text-lg font-medium tracking-widest">
              {data.weather && data.weather[0].main}
            </p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              {/* 日付 */}
              <div>
                <p className="font-light text-xs">日付</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {dayjs(data.dt).format("YYYY-MM-DD hh:mm")}
                </p>
              </div>
              {/* 温度 */}
              <div>
                <p className="font-light text-xs">温度</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {data.main.temp}℃
                </p>
              </div>
              {/* 湿度 */}
              <div>
                <p className="font-light text-xs">湿度</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {data.main.humidity}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
