const fs = require("fs");
const yaml = require("js-yaml");

// Directory where YAML files are located
const ymlDir = "./_data/resumes";

// Output JSON file path
const jsonFile = "./_data/json/student_info.json";

// Initialize empty array to hold data from YAML files
let data = [];

// Read in each YAML file in the directory and add its contents to the data array
fs.readdirSync(ymlDir).forEach((file) => {
  if (file.endsWith(".yml")) {
    const contents = fs.readFileSync(`${ymlDir}/${file}`, "utf8");
    data = data.concat(yaml.load(contents));
  }
});


// Write the data array to a JSON file
fs.writeFileSync(jsonFile, JSON.stringify(data).replace(/\\n/g, ""));