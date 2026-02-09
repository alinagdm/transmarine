import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';

interface WeatherData {
  current: {
    temp: number;
    description: string;
    max: number;
    min: number;
    code: number;
    windSpeed: number;
    humidity: number;
  };
  hourly: Array<{
    time: string;
    temp: number;
    icon: 'cloud' | 'cloud-sun' | 'sun' | 'rain';
  }>;
  daily: Array<{
    day: string;
    dayShort: string;
    icon: 'cloud' | 'cloud-sun' | 'sun' | 'rain';
    min: number;
    max: number;
  }>;
}

const KALININGRAD_LAT = 54.7104;
const KALININGRAD_LON = 20.4522;

const getIconFromWeatherCode = (code: number): 'cloud' | 'cloud-sun' | 'sun' | 'rain' => {
  if (code >= 200 && code < 300) return 'rain';
  if (code >= 300 && code < 400) return 'rain';
  if (code >= 500 && code < 600) return 'rain';
  if (code >= 600 && code < 700) return 'rain';
  if (code >= 700 && code < 800) return 'cloud';
  if (code === 800) return 'sun';
  if (code === 801) return 'cloud-sun';
  if (code >= 802 && code <= 804) return 'cloud';
  
  if (code === 0) return 'sun';
  if (code === 1) return 'cloud-sun';
  if (code === 2 || code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'cloud';
  if (code >= 51 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'rain';
  if (code >= 80 && code <= 86) return 'rain';
  if (code >= 95 && code <= 99) return 'rain';
  return 'cloud';
};

const getDescription = (code: number): string => {
  if (code === 0) return 'Ясно';
  if (code === 1) return 'Преимущественно ясно';
  if (code === 2) return 'Переменная облачность';
  if (code === 3) return 'Пасмурно';
  if (code === 45 || code === 48) return 'Туман';
  if (code >= 51 && code <= 57) return 'Моросящий дождь';
  if (code >= 61 && code <= 67) return 'Дождь';
  if (code >= 71 && code <= 77) return 'Снег';
  if (code >= 80 && code <= 82) return 'Ливень';
  if (code >= 85 && code <= 86) return 'Снегопад';
  if (code >= 95) return 'Гроза';
  return 'Временами облачно';
};

const getDayName = (date: Date, index: number, short: boolean = false): string => {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const shortDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  if (index === 0) return 'Сегодня';
  const dayIndex = date.getDay();
  return short ? shortDays[(dayIndex + index) % 7] : days[(dayIndex + index) % 7];
};

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const hourlyRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${KALININGRAD_LAT}&longitude=${KALININGRAD_LON}&current_weather=true&hourly=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();

        const current = data.current_weather;
        const hourlyData = data.hourly;
        const dailyData = data.daily;

        const currentTemp = Math.round(current.temperature);
        const currentCode = current.weathercode;

        // Находим текущий час в данных
        const currentTime = new Date(current.time);
        const currentHour = currentTime.getHours();
        
        // Находим индекс текущего часа в массиве hourlyData.time
        let startIndex = 0;
        for (let i = 0; i < hourlyData.time.length; i++) {
          const date = new Date(hourlyData.time[i]);
          if (date.getHours() === currentHour) {
            startIndex = i;
            break;
          }
        }

        const hourly: Array<{ time: string; temp: number; icon: 'cloud' | 'cloud-sun' | 'sun' | 'rain' }> = [];
        // Показываем 24 часа начиная с текущего часа
        for (let i = startIndex; i < hourlyData.time.length && hourly.length < 24; i++) {
          const date = new Date(hourlyData.time[i]);
          const hour = date.getHours();
          const minutes = date.getMinutes();
          const hourStr = hour.toString().padStart(2, '0');
          const minutesStr = minutes.toString().padStart(2, '0');
          hourly.push({
            time: `${hourStr}:${minutesStr}`,
            temp: Math.round(hourlyData.temperature_2m[i]),
            icon: getIconFromWeatherCode(hourlyData.weathercode[i]),
          });
        }

        const daily: Array<{ day: string; dayShort: string; icon: 'cloud' | 'cloud-sun' | 'sun' | 'rain'; min: number; max: number }> = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(dailyData.time[i]);
          daily.push({
            day: getDayName(date, i, false),
            dayShort: getDayName(date, i, true),
            icon: getIconFromWeatherCode(dailyData.weathercode[i]),
            min: Math.round(dailyData.temperature_2m_min[i]),
            max: Math.round(dailyData.temperature_2m_max[i]),
          });
        }

        // Получаем данные о ветре и влажности из hourly (берем текущий час)
        const currentHourIndex = 0;
        const windSpeed = data.hourly?.windspeed_10m?.[currentHourIndex] || 0;
        const humidity = data.hourly?.relativehumidity_2m?.[currentHourIndex] || 0;

        setWeather({
          current: {
            temp: currentTemp,
            description: getDescription(currentCode),
            max: Math.round(dailyData.temperature_2m_max[0]),
            min: Math.round(dailyData.temperature_2m_min[0]),
            code: currentCode,
            windSpeed: Math.round(windSpeed),
            humidity: Math.round(humidity),
          },
          hourly,
          daily,
        });
      } catch (err) {
        console.error('Ошибка загрузки погоды:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading || !weather) {
    return (
      <section className="weather">
        <div className="weather__container">
          <div className="weather__loading">Загрузка погоды...</div>
        </div>
      </section>
    );
  }

  const getWeatherIcon = (icon: string, size: 'small' | 'large' | 'current' = 'small') => {
    let width = 60;
    let height = 60;
    if (size === 'large') {
      width = 56;
      height = 56;
    } else if (size === 'current') {
      width = 127;
      height = 90;
    }
    
    if (icon === 'cloud') {
      return (
        <svg width={width} height={height} viewBox="0 0 60 60" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M13.2013 26.2382C13.309 17.8042 20.2515 11 28.8 11C35.4854 11 41.184 15.1599 43.4054 21.0035C49.512 22.6557 54 28.1822 54 34.75C54 42.62 47.5529 49 39.6 49H18C11.3726 49 6 43.6833 6 37.125C6 32.2529 8.96323 28.0703 13.2013 26.2382ZM28.8 15.75C22.8353 15.75 18 20.535 18 26.4375C18 26.8391 18.0223 27.2346 18.0655 27.6231C18.1991 28.8237 17.4123 29.9235 16.2444 30.2128C13.1152 30.9878 10.8 33.7917 10.8 37.125C10.8 41.0601 14.0236 44.25 18 44.25H39.6C44.9018 44.25 49.2 39.9966 49.2 34.75C49.2 30.0344 45.7258 26.1173 41.1725 25.3763C40.237 25.2242 39.4745 24.5455 39.2258 23.6362C37.9824 19.0907 33.7824 15.75 28.8 15.75Z" fill="#072168"/>
        </svg>
      );
    }
    
    if (icon === 'cloud-sun') {
      return (
        <svg width={width} height={height} viewBox="0 0 60 60" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M40.4 7C49.0156 7 56 13.865 56 22.3333C56 26.3236 54.4494 29.9581 51.9079 32.6859C52.8628 34.5704 53.4 36.6956 53.4 38.9444C53.4 46.5179 47.3063 52.6922 39.6751 52.9888L39.1 53H15.7C9.23827 53 4 47.8513 4 41.5C4 36.487 7.2617 32.2254 11.8138 30.6501C11.8046 30.4344 11.8 30.2177 11.8 30C11.8 21.702 18.5062 14.9435 26.8821 14.675C29.5783 10.0872 34.6223 7 40.4 7ZM27.4 19.7778C21.6562 19.7778 17 24.3544 17 30C17 30.4745 17.0327 30.9402 17.0958 31.3955L17.2129 32.0703C17.5266 33.5711 16.4548 34.9818 14.942 35.1538C11.7105 35.521 9.2 38.2243 9.2 41.5C9.2 44.8873 11.882 47.659 15.2726 47.8753L15.7 47.8889H39.1C44.1258 47.8889 48.2 43.8843 48.2 38.9444C48.2 34.2813 44.5678 30.4493 39.9343 30.0368C38.7794 29.9341 37.8257 29.0976 37.5964 27.9742C36.6414 23.2988 32.4362 19.7778 27.4 19.7778ZM40.4 12.1111C37.306 12.1111 34.5276 13.4391 32.6226 15.5468C37.1586 17.1303 40.7271 20.7183 42.2286 25.2267C44.6767 25.7639 46.888 26.9177 48.6846 28.5134C50.0122 26.7971 50.8 24.6556 50.8 22.3333C50.8 16.6878 46.1437 12.1111 40.4 12.1111Z" fill="#072168"/>
        </svg>
      );
    }
    
    if (icon === 'sun') {
      return (
        <svg width={width} height={height} viewBox="0 0 60 60" fill="none">
          <path d="M30 48.9C31.4912 48.9 32.7 50.1088 32.7 51.6V54.3C32.7 55.7912 31.4912 57 30 57C28.5088 57 27.3 55.7912 27.3 54.3V51.6C27.3 50.1088 28.5088 48.9 30 48.9ZM47.1828 43.3645L49.092 45.2736C50.1463 46.328 50.1463 48.0373 49.092 49.092C48.0376 50.1463 46.328 50.1463 45.2736 49.092L43.3645 47.1828C42.3101 46.1282 42.3101 44.4188 43.3645 43.3645C44.4188 42.3098 46.1285 42.3098 47.1828 43.3645ZM12.8172 43.3645C13.8716 42.3098 15.5811 42.3098 16.6355 43.3645C17.6088 44.3377 17.6837 45.8693 16.8601 46.9285L16.6355 47.1828L14.7263 49.092C13.6719 50.1463 11.9624 50.1463 10.908 49.092C9.93466 48.1187 9.85978 46.5871 10.6834 45.528L10.908 45.2736L12.8172 43.3645ZM30 13.8C38.947 13.8 46.2 21.053 46.2 30C46.2 38.947 38.947 46.2 30 46.2C21.053 46.2 13.8 38.947 13.8 30C13.8 21.053 21.053 13.8 30 13.8ZM30 19.2C24.0353 19.2 19.2 24.0353 19.2 30C19.2 35.9646 24.0353 40.8 30 40.8C35.9646 40.8 40.8 35.9646 40.8 30C40.8 24.0353 35.9646 19.2 30 19.2ZM8.4 27.3C9.89116 27.3 11.1 28.5088 11.1 30C11.1 31.3847 10.0577 32.5259 8.71487 32.6818L8.4 32.7H5.7C4.20884 32.7 3 31.4912 3 30C3 28.6153 4.04232 27.4741 5.38513 27.3182L5.7 27.3H8.4ZM54.3 27.3C55.7912 27.3 57 28.5088 57 30C57 31.4912 55.7912 32.7 54.3 32.7H51.6C50.1088 32.7 48.9 31.4912 48.9 30C48.9 28.5088 50.1088 27.3 51.6 27.3H54.3ZM10.9081 10.908C11.8814 9.93468 13.4129 9.85981 14.4721 10.6834L14.7264 10.908L16.6356 12.8172C17.69 13.8716 17.69 15.5811 16.6356 16.6355C15.6623 17.6088 14.1308 17.6837 13.0716 16.8601L12.8172 16.6355L10.9081 14.7263C9.85363 13.6719 9.85363 11.9624 10.9081 10.908ZM49.092 10.908C50.1463 11.9624 50.1463 13.672 49.092 14.7264L47.1828 16.6356C46.1282 17.69 44.4188 17.69 43.3645 16.6356C42.3098 15.5812 42.3098 13.8716 43.3645 12.8172L45.2736 10.908C46.328 9.8536 48.0373 9.8536 49.092 10.908ZM30 3C31.4912 3 32.7 4.20884 32.7 5.7V8.4C32.7 9.89116 31.4912 11.1 30 11.1C28.5088 11.1 27.3 9.89116 27.3 8.4V5.7C27.3 4.20884 28.5088 3 30 3Z" fill="#072168"/>
        </svg>
      );
    }
    
    if (icon === 'rain') {
      return (
        <svg width={width} height={height} viewBox="0 0 56 56" fill="none">
          <path d="M39.1962 45.2272C40.4232 45.5573 41.1514 46.824 40.8225 48.056L40.2273 50.2873C39.8986 51.5193 38.6373 52.2506 37.4104 51.9205C36.1834 51.5902 35.4552 50.3238 35.7841 49.0915L36.3794 46.8605C36.708 45.6282 37.9694 44.8969 39.1962 45.2272ZM23.0962 45.2275C24.3232 45.5578 25.0514 46.8242 24.7225 48.0565L24.1273 50.2875C23.7986 51.5196 22.5373 52.2508 21.3103 51.9208C20.0834 51.5905 19.3552 50.324 19.684 49.0917L20.2793 46.8607C20.608 45.6284 21.8692 44.8974 23.0962 45.2275ZM32.6407 39.6493C33.7799 39.956 34.4891 41.0699 34.3215 42.2141L34.267 42.4783L33.0763 46.9404C32.7477 48.1727 31.4866 48.9039 30.2595 48.5737C29.1201 48.2672 28.4109 47.1531 28.5787 46.009L28.6332 45.7448L29.8237 41.2826C30.1526 40.0505 31.4137 39.3192 32.6407 39.6493ZM16.5406 39.6493C17.7676 39.9796 18.4958 41.2461 18.167 42.4783L16.9764 46.9404C16.6477 48.1727 15.3865 48.9039 14.1595 48.5737C12.9325 48.2436 12.2044 46.9769 12.5332 45.7448L13.7237 41.2826C14.0525 40.0505 15.3137 39.3192 16.5406 39.6493ZM25.4774 36.3031C26.7042 36.6332 27.4324 37.8999 27.1037 39.1321L26.5084 41.3632C26.1795 42.5952 24.9185 43.3265 23.6914 42.9964C22.4645 42.6661 21.7364 41.3997 22.0651 40.1674L22.6604 37.9364C22.9892 36.7041 24.2503 35.973 25.4774 36.3031ZM41.5774 36.3029C42.8044 36.6329 43.5326 37.8996 43.2037 39.1317L42.6084 41.3629C42.2798 42.595 41.0185 43.3263 39.7916 42.9962C38.5646 42.6659 37.8364 41.3994 38.1651 40.1672L38.7605 37.9361C39.0892 36.7038 40.3503 35.9726 41.5774 36.3029ZM26.85 6C33.2569 6 38.718 10.0457 40.8469 15.7288C46.699 17.3357 51 22.7105 51 29.0979C51 32.2155 49.9719 35.0983 48.2391 37.4148C47.4759 38.4346 46.0343 38.6402 45.0186 37.874C44.0032 37.1076 43.7985 35.6598 44.5614 34.6398C45.7164 33.096 46.4 31.1804 46.4 29.0979C46.4 24.5118 43.0705 20.7024 38.707 19.9817C37.8104 19.8337 37.0797 19.1734 36.8414 18.2893C35.6498 13.8686 31.6248 10.6196 26.85 10.6196C21.1339 10.6196 16.5 15.2732 16.5 21.0137C16.5 21.4042 16.5213 21.7889 16.5628 22.1668C16.6908 23.3343 15.9367 24.404 14.8176 24.6853C11.8188 25.439 9.6 28.1659 9.6 31.4077C9.6 32.4929 9.84683 33.5149 10.2862 34.4252L10.5217 34.8708C11.1577 35.9749 10.782 37.388 9.68246 38.0267C8.58292 38.6653 7.17596 38.2881 6.5399 37.1838C5.56007 35.4829 5 33.5076 5 31.4077C5 26.6694 7.83976 22.6016 11.9012 20.82C12.0045 12.6174 18.6577 6 26.85 6Z" fill="#072168"/>
        </svg>
      );
    }
    
    if (icon === 'sun') {
      return (
        <svg width={width} height={height} viewBox="0 0 60 60" fill="none">
          <path d="M30 48.9C31.4912 48.9 32.7 50.1088 32.7 51.6V54.3C32.7 55.7912 31.4912 57 30 57C28.5088 57 27.3 55.7912 27.3 54.3V51.6C27.3 50.1088 28.5088 48.9 30 48.9ZM47.1828 43.3645L49.092 45.2736C50.1463 46.328 50.1463 48.0373 49.092 49.092C48.0376 50.1463 46.328 50.1463 45.2736 49.092L43.3645 47.1828C42.3101 46.1282 42.3101 44.4188 43.3645 43.3645C44.4188 42.3098 46.1285 42.3098 47.1828 43.3645ZM12.8172 43.3645C13.8716 42.3098 15.5811 42.3098 16.6355 43.3645C17.6088 44.3377 17.6837 45.8693 16.8601 46.9285L16.6355 47.1828L14.7263 49.092C13.6719 50.1463 11.9624 50.1463 10.908 49.092C9.93466 48.1187 9.85978 46.5871 10.6834 45.528L10.908 45.2736L12.8172 43.3645ZM30 13.8C38.947 13.8 46.2 21.053 46.2 30C46.2 38.947 38.947 46.2 30 46.2C21.053 46.2 13.8 38.947 13.8 30C13.8 21.053 21.053 13.8 30 13.8ZM30 19.2C24.0353 19.2 19.2 24.0353 19.2 30C19.2 35.9646 24.0353 40.8 30 40.8C35.9646 40.8 40.8 35.9646 40.8 30C40.8 24.0353 35.9646 19.2 30 19.2ZM8.4 27.3C9.89116 27.3 11.1 28.5088 11.1 30C11.1 31.3847 10.0577 32.5259 8.71487 32.6818L8.4 32.7H5.7C4.20884 32.7 3 31.4912 3 30C3 28.6153 4.04232 27.4741 5.38513 27.3182L5.7 27.3H8.4ZM54.3 27.3C55.7912 27.3 57 28.5088 57 30C57 31.4912 55.7912 32.7 54.3 32.7H51.6C50.1088 32.7 48.9 31.4912 48.9 30C48.9 28.5088 50.1088 27.3 51.6 27.3H54.3ZM10.9081 10.908C11.8814 9.93468 13.4129 9.85981 14.4721 10.6834L14.7264 10.908L16.6356 12.8172C17.69 13.8716 17.69 15.5811 16.6356 16.6355C15.6623 17.6088 14.1308 17.6837 13.0716 16.8601L12.8172 16.6355L10.9081 14.7263C9.85363 13.6719 9.85363 11.9624 10.9081 10.908ZM49.092 10.908C50.1463 11.9624 50.1463 13.672 49.092 14.7264L47.1828 16.6356C46.1282 17.69 44.4188 17.69 43.3645 16.6356C42.3098 15.5812 42.3098 13.8716 43.3645 12.8172L45.2736 10.908C46.328 9.8536 48.0373 9.8536 49.092 10.908ZM30 3C31.4912 3 32.7 4.20884 32.7 5.7V8.4C32.7 9.89116 31.4912 11.1 30 11.1C28.5088 11.1 27.3 9.89116 27.3 8.4V5.7C27.3 4.20884 28.5088 3 30 3Z" fill="#072168"/>
        </svg>
      );
    }
    
    if (icon === 'rain') {
      return (
        <svg width={width} height={height} viewBox="0 0 56 56" fill="none">
          <path d="M39.1962 45.2272C40.4232 45.5573 41.1514 46.824 40.8225 48.056L40.2273 50.2873C39.8986 51.5193 38.6373 52.2506 37.4104 51.9205C36.1834 51.5902 35.4552 50.3238 35.7841 49.0915L36.3794 46.8605C36.708 45.6282 37.9694 44.8969 39.1962 45.2272ZM23.0962 45.2275C24.3232 45.5578 25.0514 46.8242 24.7225 48.0565L24.1273 50.2875C23.7986 51.5196 22.5373 52.2508 21.3103 51.9208C20.0834 51.5905 19.3552 50.324 19.684 49.0917L20.2793 46.8607C20.608 45.6284 21.8692 44.8974 23.0962 45.2275ZM32.6407 39.6493C33.7799 39.956 34.4891 41.0699 34.3215 42.2141L34.267 42.4783L33.0763 46.9404C32.7477 48.1727 31.4866 48.9039 30.2595 48.5737C29.1201 48.2672 28.4109 47.1531 28.5787 46.009L28.6332 45.7448L29.8237 41.2826C30.1526 40.0505 31.4137 39.3192 32.6407 39.6493ZM16.5406 39.6493C17.7676 39.9796 18.4958 41.2461 18.167 42.4783L16.9764 46.9404C16.6477 48.1727 15.3865 48.9039 14.1595 48.5737C12.9325 48.2436 12.2044 46.9769 12.5332 45.7448L13.7237 41.2826C14.0525 40.0505 15.3137 39.3192 16.5406 39.6493ZM25.4774 36.3031C26.7042 36.6332 27.4324 37.8999 27.1037 39.1321L26.5084 41.3632C26.1795 42.5952 24.9185 43.3265 23.6914 42.9964C22.4645 42.6661 21.7364 41.3997 22.0651 40.1674L22.6604 37.9364C22.9892 36.7041 24.2503 35.973 25.4774 36.3031ZM41.5774 36.3029C42.8044 36.6329 43.5326 37.8996 43.2037 39.1317L42.6084 41.3629C42.2798 42.595 41.0185 43.3263 39.7916 42.9962C38.5646 42.6659 37.8364 41.3994 38.1651 40.1672L38.7605 37.9361C39.0892 36.7038 40.3503 35.9726 41.5774 36.3029ZM26.85 6C33.2569 6 38.718 10.0457 40.8469 15.7288C46.699 17.3357 51 22.7105 51 29.0979C51 32.2155 49.9719 35.0983 48.2391 37.4148C47.4759 38.4346 46.0343 38.6402 45.0186 37.874C44.0032 37.1076 43.7985 35.6598 44.5614 34.6398C45.7164 33.096 46.4 31.1804 46.4 29.0979C46.4 24.5118 43.0705 20.7024 38.707 19.9817C37.8104 19.8337 37.0797 19.1734 36.8414 18.2893C35.6498 13.8686 31.6248 10.6196 26.85 10.6196C21.1339 10.6196 16.5 15.2732 16.5 21.0137C16.5 21.4042 16.5213 21.7889 16.5628 22.1668C16.6908 23.3343 15.9367 24.404 14.8176 24.6853C11.8188 25.439 9.6 28.1659 9.6 31.4077C9.6 32.4929 9.84683 33.5149 10.2862 34.4252L10.5217 34.8708C11.1577 35.9749 10.782 37.388 9.68246 38.0267C8.58292 38.6653 7.17596 38.2881 6.5399 37.1838C5.56007 35.4829 5 33.5076 5 31.4077C5 26.6694 7.83976 22.6016 11.9012 20.82C12.0045 12.6174 18.6577 6 26.85 6Z" fill="#072168"/>
        </svg>
      );
    }
    
    return null;
  };

  return (
    <section className="weather">
      <div className="weather__container">
        <h2 className="weather__title">Погода<br />в Калининграде</h2>
        
        <div className="weather__current">
          <div className="weather__current-top">
            <div className="weather__current-temp">{weather.current.temp}°</div>
            <div className="weather__current-icon">
              {getWeatherIcon(getIconFromWeatherCode(weather.current.code), 'current')}
            </div>
          </div>
          <div className="weather__current-bottom">
            <div className="weather__current-description">{weather.current.description}</div>
            <div className="weather__current-temp-range">Макс.: {weather.current.max}°, мин.: {weather.current.min}°</div>
            <div className="weather__current-details">
              <span className="weather__current-wind">Ветер: {weather.current.windSpeed} м/с</span>
              <span className="weather__current-humidity">Влажность: {weather.current.humidity}%</span>
            </div>
          </div>
        </div>

        <div 
          className="weather__hourly"
          ref={hourlyRef}
          onMouseDown={(e) => {
            if (!hourlyRef.current) return;
            setIsDragging(true);
            setStartX(e.pageX - hourlyRef.current.offsetLeft);
            setScrollLeft(hourlyRef.current.scrollLeft);
            hourlyRef.current.style.cursor = 'grabbing';
            hourlyRef.current.style.userSelect = 'none';
          }}
          onMouseLeave={() => {
            setIsDragging(false);
            if (hourlyRef.current) {
              hourlyRef.current.style.cursor = 'grab';
              hourlyRef.current.style.userSelect = 'auto';
            }
          }}
          onMouseUp={() => {
            setIsDragging(false);
            if (hourlyRef.current) {
              hourlyRef.current.style.cursor = 'grab';
              hourlyRef.current.style.userSelect = 'auto';
            }
          }}
          onMouseMove={(e) => {
            if (!isDragging || !hourlyRef.current) return;
            e.preventDefault();
            const x = e.pageX - hourlyRef.current.offsetLeft;
            const walk = (x - startX) * 2; // Скорость прокрутки
            hourlyRef.current.scrollLeft = scrollLeft - walk;
          }}
          onTouchStart={(e) => {
            if (!hourlyRef.current) return;
            setIsDragging(true);
            setStartX(e.touches[0].pageX - hourlyRef.current.offsetLeft);
            setScrollLeft(hourlyRef.current.scrollLeft);
          }}
          onTouchMove={(e) => {
            if (!isDragging || !hourlyRef.current) return;
            const x = e.touches[0].pageX - hourlyRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            hourlyRef.current.scrollLeft = scrollLeft - walk;
          }}
          onTouchEnd={() => {
            setIsDragging(false);
          }}
        >
          {weather.hourly.map((hour, index) => (
            <div key={index} className="weather__hour-card">
              <div className="weather__hour-time">{hour.time}</div>
              <div className="weather__hour-icon">
                {getWeatherIcon(hour.icon)}
              </div>
              <div className="weather__hour-temp">{hour.temp}°</div>
            </div>
          ))}
        </div>

        <div className="weather__daily">
          {weather.daily.map((day, index) => (
            <React.Fragment key={index}>
              <div className="weather__day-item">
                <div className="weather__day-name">
                  <span className="weather__day-name-full">{day.day}</span>
                  <span className="weather__day-name-short">{day.dayShort}</span>
                </div>
                <div className="weather__day-icon">
                  {getWeatherIcon(day.icon, 'large')}
                </div>
                <div className="weather__day-temps">
                  <div className="weather__day-min">Минимальная: {day.min}°</div>
                  <div className="weather__day-max">Максимальная: {day.max}°</div>
                </div>
              </div>
              {index < weather.daily.length - 1 && (
                <svg width="1201" height="1" viewBox="0 0 1201 1" fill="none">
                  <path d="M0.5 0.5L1200.5 0.500105" stroke="#072168" strokeOpacity="0.05" strokeLinecap="round"/>
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
