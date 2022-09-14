import axios from "axios";

export default class Search {
  constructor() {
    //
  }

  get paramsMapbox() {
    return {
      type: "place%2Cpostcode%2Caddress",
      language: "en",
      access_token: process.env.MAPBOX_KEY,
    };
  }
  async city(place) {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      const response = await instance.get();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}
