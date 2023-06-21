class ZooAnimal {
  constructor(name, initialPopulation, birthRate, deathRate) {
    this.name = name;
    this.initialPopulation = initialPopulation;
    this.birthRate = birthRate;
    this.deathRate = deathRate;
  }

  calculatePopulationAfterYears(years) {
    let population = this.initialPopulation;

    for (let i = 0; i < years; i++) {
      const birthCount = this.birthRate * population;
      const deathCount = this.deathRate * population;
      const netGrowth = birthCount - deathCount;
      population += netGrowth;
    }

    return population;
  }
}

class Zoo {
  constructor() {
    this.animalList = [];
  }

  addAnimal(name, initialPopulation, birthRate, deathRate) {
    const animal = new ZooAnimal(name, initialPopulation, birthRate, deathRate);
    this.animalList.push(animal);
  }

  calculatePopulationAfterYears(years) {
    const populations = {};

    this.animalList.forEach(animal => {
      const population = animal.calculatePopulationAfterYears(years);
      populations[animal.name] = population;
    });

    return populations;
  }
}

function main() {
  const zoo = new Zoo();

  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function addAnimal() {
    rl.question("Enter the animal's name: ", function (name) {
      rl.question("Enter the initial population: ", function (initialPopulation) {
        rl.question("Enter the birth rate (0-1): ", function (birthRate) {
          rl.question("Enter the death rate (0-1): ", function (deathRate) {
            zoo.addAnimal(name, parseInt(initialPopulation), parseFloat(birthRate), parseFloat(deathRate));

            rl.question("Add another animal? (yes/no): ", function (answer) {
              if (answer.toLowerCase() === "yes") {
                addAnimal();
              } else {
                rl.question("Enter the number of years to calculate population for: ", function (years) {
                  const populations = zoo.calculatePopulationAfterYears(parseInt(years));

                  console.log(`Population of zoo animals after ${years} years:`);
                  for (const animal in populations) {
                    console.log(`${animal}: ${populations[animal]}`);
                  }

                  rl.close();
                });
              }
            });
          });
        });
      });
    });
  }

  addAnimal();
}

main();
