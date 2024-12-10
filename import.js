const xlsx = require("xlsx");
const { Population } = require("./models"); // ดึง Model Population มาใช้

(async () => {
  const workbook = xlsx.readFile("./public/population-and-demography.csv");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  // console.log(data);
  try {
    for (const row of data) {
      await Population.create({
        country: row["Country name"],
        year: row["Year"],
        populations: row["Population"],
      });
    }
    console.log("Data imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
  // const formattedData = data.map((row) => ({
  //   country: row["Country name"],
  //   year: row["Year"],
  //   populations: row["Population"],
  // }));
  // await Population.bulkCreate(formattedData);
})();
