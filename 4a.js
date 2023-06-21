const MongoClient = require("mongodb").MongoClient;

class ZooAnimal {
  constructor(name, initialPopulation, birthRate, deathRate) {
    this.name = name;
    this.initialPopulation = initialPopulation;
    this.birthRate = birthRate;
    this.deathRate = deathRate;
  }
}

async function createAnimal(animal) {
  const client = await MongoClient.connect("mongodb+srv://bhavana04:paki20@cluster0.aybu4pm.mongodb.net/");
  const db = client.db("zoo");
  const animalsCollection = db.collection("animals");

  try {
    await animalsCollection.insertOne(animal);
    console.log("Animal created successfully!");
  } catch (error) {
    console.error("Error creating animal:", error);
  } finally {
    client.close();
  }
}

async function readAnimals() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("zoo");
  const animalsCollection = db.collection("animals");

  try {
    const animals = await animalsCollection.find().toArray();
    console.log("Zoo Animals:");
    animals.forEach(animal => {
      console.log(animal);
    });
  } catch (error) {
    console.error("Error reading animals:", error);
  } finally {
    client.close();
  }
}

async function updateAnimal(animalName, updatedAnimal) {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("zoo");
  const animalsCollection = db.collection("animals");

  try {
    await animalsCollection.updateOne({ name: animalName }, { $set: updatedAnimal });
    console.log("Animal updated successfully!");
  } catch (error) {
    console.error("Error updating animal:", error);
  } finally {
    client.close();
  }
}

async function deleteAnimal(animalName) {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("zoo");
  const animalsCollection = db.collection("animals");

  try {
    await animalsCollection.deleteOne({ name: animalName });
    console.log("Animal deleted successfully!");
  } catch (error) {
    console.error("Error deleting animal:", error);
  } finally {
    client.close();
  }
}

async function main() {
  const lion = new ZooAnimal("Lion", 10, 0.5, 0.2);
  const elephant = new ZooAnimal("Elephant", 5, 0.3, 0.1);
  const giraffe = new ZooAnimal("Giraffe", 8, 0.4, 0.3);

  await createAnimal(lion);
  await createAnimal(elephant);
  await createAnimal(giraffe);

  await readAnimals();

  const updatedLion = new ZooAnimal("Lion", 12, 0.6, 0.3);
  await updateAnimal("Lion", updatedLion);

  await readAnimals();

  await deleteAnimal("Elephant");

  await readAnimals();
}

main().catch(error => {
  console.error("Error:", error);
});
