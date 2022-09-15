import {
  inquirerMenu,
  pause,
  readInput,
  optionMenu,
} from "./helpers/inquirer.js";
import Search from "./models/search.js";
import * as dotenv from "dotenv";
dotenv.config();

const search = new Search();

let opt;
const main = async () => {
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const term = await readInput("Place: ");
        //search
        const places = await search.city(term);
        //show choices
        const id = await optionMenu(places);
        // 0 to escape
        if (id === "0") continue;
        //User Selection
        const sPlace = places.find((p) => p.id === id);
        //add to history
        search.addToHistory(sPlace.name);
        //obtain weather data
        const wData = await search.temp(sPlace.lat, sPlace.lng);
        const { weather, main } = wData;
        //show info on console
        console.log(`
        ${"City Info:".magenta}

        Name: ${sPlace.name.substring(0, 35)}...
        Lat: ${sPlace.lat}
        Lng: ${sPlace.lng}
        Wheather: ${weather[0].description}
        Temp: ${main.temp}
        Min: ${main.temp_min}
        Max: ${main.temp_max}
        
        `);

        break;
      case 2:
        search.capHistory.forEach((place, i) => {
          const idx = `${i + 1}.`.magenta;
          console.log(`${idx} ${place}`);
        });
        break;
      case 3:
        break;

      default:
        break;
    }

    opt !== 0 && (await pause());
  } while (opt !== 0);
};

main();
