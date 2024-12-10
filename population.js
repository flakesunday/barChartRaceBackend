const express = require("express");
const db = require("./models");
const { Op } = require("sequelize");
const _ = require("lodash");
const router = express.Router();

const getPopulation = async (req, res) => {
  const getRegion = (country) => {
    const asia = ["China", "India", "Japan", "Indonesia", "Bangladesh"];
    const europe = ["Russia", "United Kingdom", "Germany", "Italy", "France"];
    const america = ["United States", "Brazil"];
    if (asia.includes(country)) {
      return "Asia";
    }
    if (europe.includes(country)) {
      return "Europe";
    }
    if (america.includes(country)) {
      return "Americas";
    }
  };
  try {
    const population = await db.Population.findAll({
      where: {
        country: {
          [Op.in]: [
            "China",
            "India",
            "Brazil",
            "Russia",
            "Japan",
            "Indonesia",
            "Bangladesh",
            "United Kingdom",
            "United States",
            "Germany",
            "Italy",
            "France",
          ],
        },
        year: /*{ [Op.between]: [1950, 2021] }*/ req.params.year,
      },
      order: [["populations", "DESC"]],
    });
    const formatCountry = population.map((item) => ({
      name: item.country,
      value: item.populations,
      region: getRegion(item.country),
      //   flag: countryFlags[item.country] || "🏳️", // Default flag if not found
    }));
    const countryPopulation = formatCountry.map((item) => item.value);
    const sumCountryPopulation = _.sum(countryPopulation);

    const formatPopulation = {
      year: population.year,
      countries: formatCountry,
      sumContryPopulation: sumCountryPopulation,
    };
    res.status(200).json({ status: 200, data: formatPopulation });
  } catch (err) {
    res.status(500).json({ status: 500, err: err.message });
  }
};

router.get("/populations/:year", getPopulation);

module.exports = router;
