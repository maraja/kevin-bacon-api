const fs = require("fs");

export const actorsStub = async () => {
    const rawdata = await fs.readFileSync(
        "./data/actors_with_names_small.json"
    );
    const data = JSON.parse(rawdata);
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
    return actors;
};
