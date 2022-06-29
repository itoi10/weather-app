import './App.css';
import React from 'react';
import Weather from "./components/Weather"

const App: React.FC = () => {

  const cities = [
    {
      city_name: 'Tokyo',
      color_name: 'blue',
    },
    {
      city_name: 'Osaka',
      color_name: 'red',
    },
    {
      city_name: 'Nagoya',
      color_name: 'green',
    },
    {
      city_name: 'Fukuoka',
      color_name: 'yellow',
    },
  ]

  // ビルド時にtailwindcssの色が反映されるように設定
  if (false) {
    return (
      <div>
        <p className="text-blue-500 from-blue-500 to-blue-300"></p>
        <p className="text-red-500 from-red-500 to-red-300"></p>
        <p className="text-green-500 from-green-500 to-green-300"></p>
        <p className="text-yellow-500 from-yellow-500 to-yellow-300"></p>
      </div>
    )
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">React & Tailwindcss</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">お天気アプリ</p>
        </div>
        <div className="min-h-screen flex justify-center items-center flex-wrap">
          {
            cities.map((city, index) =>
              <Weather
                key={index}
                city_name={city.city_name}
                color_name={city.color_name}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
