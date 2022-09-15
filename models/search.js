import fs from "fs";
import axios from "axios";

export default class Search {
  history = [];
  dbPath = "./db/database.json";
  constructor() {
    this.loadToDb();
  }

  get paramsMapbox() {
    return {
      type: "place%2Cpostcode%2Caddress",
      language: "en",
      limit: "5",
      access_token: process.env.MAPBOX_KEY,
    };
  }
  get capHistory() {
    return this.history.map((place) => {
      return place.split(", ").map((word) => {
        return " " + word[0].toUpperCase() + word.substring(1).toLowerCase();
      });
    });
  }

  paramsOpenWeather(lat, lon) {
    return {
      lat,
      lon,
      units: "metric",
      appid: process.env.OPENWEATHERMAP_KEY,
    };
  }
  async city(place) {
    try {
      const instanceMb = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      const response = await instanceMb.get();
      return response.data.features.map((resp) => ({
        id: resp.id,
        name: resp.place_name,
        lng: resp.center[0],
        lat: resp.center[1],
      }));
    } catch (error) {
      console.log(error);
    }
  }
  async temp(lat, lon) {
    try {
      const instanceOw = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: this.paramsOpenWeather(lat, lon),
      });
      const response = await instanceOw.get();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  addToHistory(place) {
    if (this.history.includes(place.toLowerCase())) {
      return;
    }
    this.history = this.history.splice(0, 4);
    this.history.unshift(place.toLowerCase());
    this.saveToDb();
  }
  saveToDb() {
    const payLoad = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payLoad));
  }
  loadToDb() {
    if (this.dbPath) {
      const dbData = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
      const data = JSON.parse(dbData);
      this.history = [...data.history];
    }
  }
  return;
}
