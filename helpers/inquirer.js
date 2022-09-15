import inquirer from "inquirer";
import colors from "colors";

const questions = [
  {
    type: "list",
    name: "option",
    message: "Select an option",
    choices: [
      {
        value: 1,
        name: `${"1.".magenta} Buscar Ciudad`,
      },
      {
        value: 2,
        name: `${"2.".magenta} Historial`,
      },
      {
        value: 3,
        name: `${"3.".magenta} option 3`,
      },
      {
        value: 4,
        name: `${"4.".magenta} option 4`,
      },
      {
        value: 0,
        name: `${"0.".magenta} Exit`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log("=====================".magenta);
  console.log("Select an Option".white);
  console.log("=====================\n".magenta);

  const { option } = await inquirer.prompt(questions);

  return option;
};

export const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"Enter".blue} to continue`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

export const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          console.log("Not value added");
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

export const optionMenu = async (options) => {
  const choices = options.map((option, i) => {
    const idx = `${i + 1}.`.magenta;
    return {
      value: option.id,
      name: `${idx} ${option.name}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".magenta + "Cancel",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Choose your option",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

export const forSure = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

export const complete = async (tasks) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.magenta;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completedDate ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Complete",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};
