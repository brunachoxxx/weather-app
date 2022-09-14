import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js";
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
        const place = await readInput("Place: ");
        search.city(place);
        break;
      case 2:
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
