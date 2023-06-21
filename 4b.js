const mongoose = require("mongoose");

// MongoDB connection URI
const uri = "mongodb+srv://bhavana04:paki20@cluster0.aybu4pm.mongodb.net/;";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    // Define a zoo animal schema
    const zooAnimalSchema = new mongoose.Schema({
      name: String,
      initialPopulation: Number,
      birthRate: Number,
      deathRate: Number
    });

    // Create a zoo animal model
    const ZooAnimal = mongoose.model("ZooAnimal", zooAnimalSchema);

    // CREATE operation - Insert a new zoo animal
    const createAnimal = async (name, initialPopulation, birthRate, deathRate) => {
      try {
        const newAnimal = new ZooAnimal({
          name,
          initialPopulation,
          birthRate,
          deathRate
        });
        const createdAnimal = await newAnimal.save();
        console.log("Inserted document:", createdAnimal);
      } catch (error) {
        console.error("Error creating zoo animal:", error);
      }
    };

    // READ operation - Find a zoo animal by name
    const findAnimal = async (name) => {
      try {
        const foundAnimal = await ZooAnimal.findOne({ name });
        console.log("Found document:", foundAnimal);
      } catch (error) {
        console.error("Error finding zoo animal:", error);
      }
    };

    // UPDATE operation - Update a zoo animal's attributes
    const updateAnimal = async (name, updatedAttributes) => {
      try {
        const filter = { name };
        const update = { $set: updatedAttributes };
        const updatedAnimal = await ZooAnimal.findOneAndUpdate(filter, update, { new: true });
        console.log("Modified document:", updatedAnimal);
      } catch (error) {
        console.error("Error updating zoo animal:", error);
      }
    };

    // DELETE operation - Delete a zoo animal by name
    //const deleteAnimal = async (name) => {
     // try {
       // const deleteFilter = { name };
        //const deletedAnimal = await ZooAnimal.findOneAndDelete(deleteFilter);
       // console.log("Deleted document:", deletedAnimal);
     // } catch (error) {
        //console.error("Error deleting zoo animal:", error);
      //}
  //  };

    // Function to calculate population after n years for a zoo animal
    const calculatePopulationAfterYears = async (name, years) => {
      try {
        const animal = await ZooAnimal.findOne({ name });
        if (!animal) {
          console.log("Animal not found");
          return;
        }

        let population = animal.initialPopulation;
        for (let i = 0; i < years; i++) {
          const birthCount = animal.birthRate * population;
          const deathCount = animal.deathRate * population;
          const netGrowth = birthCount - deathCount;
          population += netGrowth;
        }

        console.log(`Population of ${name} after ${years} years: ${population}`);
      } catch (error) {
        console.error("Error calculating population:", error);
      }
    };

    // Perform the CRUD operations
    const performCRUDOperations = async () => {
      await createAnimal("Lion", 10, 0.5, 0.2);
      await createAnimal("Elephant", 5, 0.3, 0.1);
      await createAnimal("Giraffe", 8, 0.4, 0.3);

      await findAnimal("Lion");
      await updateAnimal("Lion", { birthRate: 0.6, deathRate: 0.1 });
     // await deleteAnimal("Giraffe");

      await calculatePopulationAfterYears("Lion", 5);

      mongoose.connection.close();
    };

    performCRUDOperations();
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
