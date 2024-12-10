const { sequelize } = require("./models");

async function migrate() {
  try {
    // Run pending migrations
    await sequelize.sync({ alter: true }); // Adjust existing tables to match models
    console.log("Migrations have been executed successfully.");
  } catch (error) {
    console.error("Unable to execute migrations:", error);
  }
}

migrate();
