import cloudy from "../icons/static/cloudy.svg";
import rainyDay from "../icons/static/rainy-6.svg";
import rainyNight from "../icons/static/rainy-3.svg";
import snow from "../icons/static/snowy-6.svg";
import hail from "../icons/static/snowy-5.svg";
import day from "../icons/static/day.svg";
import night from "../icons/static/night.svg";
import thunder from "../icons/static/thunder.svg";
import cloudyDay from "../icons/static/cloudy-day-1.svg";
import cloudyNight from "../icons/static/cloudy-night-1.svg";

const weatherIconMap = {
  0: {
    day: day,
    night: night,
  },
  1: {
    day: day,
    night: night,
  },
  2: {
    day: cloudyDay,
    night: cloudyNight,
  },
  3: {
    day: cloudyDay,
    night: cloudyNight,
  },
  45: {
    day: cloudyDay,
    night: cloudyNight,
  }, // fog
  48: {
    day: cloudyDay,
    night: cloudyNight,
  }, //fog
  51: {
    day: rainyDay,
    night: rainyNight,
  },
  53: {
    day: rainyDay,
    night: rainyNight,
  },
  55: {
    day: rainyDay,
    night: rainyNight,
  },
  56: {
    day: rainyDay,
    night: rainyNight,
  },
  57: {
    day: rainyDay,
    night: rainyNight,
  },
  61: {
    day: rainyDay,
    night: rainyNight,
  },
  63: {
    day: rainyDay,
    night: rainyNight,
  },
  65: {
    day: rainyDay,
    night: rainyNight,
  },
  66: {
    day: rainyDay,
    night: rainyNight,
  },
  67: {
    day: rainyDay,
    night: rainyNight,
  },
  71: {
    day: snow,
    night: snow,
  },
  73: {
    day: snow,
    night: snow,
  },
  75: {
    day: snow,
    night: snow,
  },
  77: {
    day: snow,
    night: snow,
  },
  80: {
    day: rainyDay,
    night: rainyNight,
  },
  81: {
    day: rainyDay,
    night: rainyNight,
  },
  82: {
    day: rainyDay,
    night: rainyNight,
  },
  85: {
    day: snow,
    night: snow,
  },
  86: {
    day: snow,
    night: snow,
  },
  95: {
    day: thunder,
    night: thunder,
  },
  96: hail,
  99: hail,
};

export default weatherIconMap;
