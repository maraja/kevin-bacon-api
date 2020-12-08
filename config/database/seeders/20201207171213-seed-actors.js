"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("./data/actors_with_names_small.json");
let data = JSON.parse(rawdata);

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const actors = [];
        let i = 0;
        // tslint:disable-next-line: forin
        for (const key in data) {
            actors.push({
                id: i,
                name: key,
                connectedActors: data.hasOwnProperty(key) ? data[key] : [],
            });
            i++;
        }

        return queryInterface.bulkInsert("actor", actors);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("actor", null, {});
    },
};
