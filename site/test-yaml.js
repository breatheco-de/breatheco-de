const fs = require("fs");
const path = require("path");
const jsyaml = require("js-yaml");
var colors = require("colors");

const walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

const validThemes = [
    "berry",
    "blue",
    "ceramic",
    "green",
    "orange",
    "turquoise",
];
let githubs = [];
const validateProfiles = (profiles) =>
    profiles.map((l) => {
        console.log(("Validating file " + l).yellow);
        const content = fs.readFileSync(l, "utf8");
        const yaml = jsyaml.load(content);
        const fileName = l
            .replace(/^.*[\\\/]/, "")
            .split(".")
            .slice(0, -1)
            .join(".")
            .toLowerCase();

        if (typeof yaml == "undefined")
            throw new Error(
                `The file ${fileName}.yml was impossible to parse`.red
            );
        if (!yaml.basic_info.github)
            throw new Error(
                "Missing github username on YML file ${fileName}.yml".red
            );

        if (yaml.template != "online-cv")
            throw new Error(`The only supported template is online-cv`.red);

        //if(typeof yaml.basic_info.phone === 'undefined') throw new Error(`Missing or invalid phone field`.red);

        if (yaml.experiences && typeof yaml.experiences !== "undefined") {
            if (!Array.isArray(yaml.experiences))
                throw new Error(`Experiences must be an array`.red);
            yaml.experiences.forEach((ex) => {
                if (ex) {
                    if (typeof ex.role === "undefined")
                        throw new Error(`Missing experience role`.red);
                    if (typeof ex.time === "undefined")
                        throw new Error(`Missing experience time`.red);
                    if (typeof ex.company === "undefined")
                        throw new Error(`Missing experience company`.red);
                }
            });
        }
        if (yaml.education && typeof yaml.education !== "undefined") {
            if (!Array.isArray(yaml.education))
                throw new Error(`Education must be an array`.red);
            yaml.education.forEach((ex) => {
                if (typeof ex.degree === "undefined")
                    throw new Error(`Missing education degree`.red);
                if (typeof ex.time === "undefined")
                    throw new Error(`Missing education time`.red);
                if (typeof ex.university === "undefined")
                    throw new Error(`Missing education university`.red);
            });
        }

        if (
            yaml.projects &&
            typeof yaml.projects !== "undefined" &&
            typeof yaml.projects.assignments !== "undefined"
        ) {
            if (!Array.isArray(yaml.projects.assignments))
                throw new Error(`Assignments must be an array`.red);
            yaml.projects.assignments.forEach((ex) => {
                if (typeof ex.title === "undefined")
                    throw new Error(`Missing assignment title`.red);
                if (typeof ex.tagline === "undefined")
                    throw new Error(`Missing assignment tagline`.red);
            });
        }

        if (typeof yaml.skin === "undefined")
            throw new Error(
                `You need to specify a skin on the ${fileName}.yml, the following options are available: ${validThemes.join(
                    ","
                )}`.red
            );
        if (!validThemes.includes(yaml.skin))
            throw new Error(
                `Invalid skin value ${
                    yaml.skin
                } on file ${fileName}.yml, the following options are available: ${validThemes.join(
                    ","
                )}`.red
            );

        if (fileName != yaml.basic_info.github.toLowerCase())
            throw new Error(
                `The github username ${yaml.basic_info.github} inside the YML file does not match the file name: ${fileName}`.red
            );

        if (githubs.includes(yaml.basic_info.github))
            throw new Error(
                `Duplicated github username: ${yaml.basic_info.github.red} in two or more files`
            );
        githubs.push(yaml.basic_info.github);
        /*  //Only Advance, Intermediate and Basic measurements allowed 
     if(typeof yaml.skill != "undefined" && typeof yaml.skill.toolset != "undefined"){
     for(let i = 0; i < yaml.skill.toolset.length; i++){
             if(!/[a-zA-Z]/.test(yaml.skill.toolset[i]["level"])) throw new Error(`Invalid measurement unit in toolsets, Advanced, Intermediate and Basic are recommended`.red)
         }
      }
      //Valid links in projects assigments
      if(typeof yaml.projects != "undefined" && typeof yaml.projects.assignments != "undefined") {
      for(let i = 0; i < yaml.projects.assignments.length; i++){
            if(!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(yaml.projects.assignments[i]["link"])) throw new Error(`Invalid project link format`.red)
        }
    }
    // Char limit and no "Bullet Point" allowed in the details paragraphs 
    if(typeof yaml.education != "undefined"){
    for(let i = 0; i < yaml.education.length; i ++ ){
            if(yaml.education[i]["details"].length > 400 || !/\b(Bullet point)\b/.test(yaml.education[i]["details"])) throw new Error(`Your education detail is too long or "Bullet Point" is still in the paragraph`.red);
        }
    }
    if(typeof yaml.experiences != "undefined"){
    for(let i = 0; i < yaml.experiences.length; i ++ ){
            if(yaml.experiences[i]["details"].length > 400 || !/\b(Bullet point)\b/.test(yaml.experiences[i]["details"])) throw new Error(`Your education detail is too long or "Bullet Point" is still in the paragraph`.red);
        }
      }
 */
        return yaml;
    });

async function status(workingDir) {
    const git = require("simple-git/promise");

    let statusSummary = null;
    console.log("Checking git status for non-YML files.".yellow);
    try {
        statusSummary = await git(workingDir).status();
    } catch (e) {
        console.error(e);
    }

    return statusSummary;
}

// using the async function
status(__dirname)
    .then((status) => {
        const nonYMLFiles = status.files.filter(
            (f) =>
                f.path.indexOf(".yml") === -1 &&
                f.path.indexOf("package.json") === -1 &&
                f.path.indexOf("package-lock.json") === -1
        );
        //const nonYMLFiles = [];
        if (nonYMLFiles.length > 0) {
            console.log(
                "You should only update your .yml file inside the ./resumes/ folder, but the following files have also been updated: "
                    .red
            );
            console.log(nonYMLFiles.map((f) => f.path));
            console.log(
                "Use `$ git checkout <path/to/file>` to undo any changes you did to them"
                    .red
            );
            process.exit(1);
        } else {
            walk("./site/resumes/", function (err, results) {
                if (err) {
                    console.log(
                        "Error scanning yaml files, make sure you have a folder site/resums/"
                            .red
                    );
                    process.exit(1);
                }

                try {
                    const result = validateProfiles(results);
                    console.log("Success!! All files are valid".green);
                    process.exit(0);
                } catch (error) {
                    console.log("");
                    console.log("");
                    console.log(
                        "***** There is one error on your files!!! ****".red
                    );
                    console.log(
                        "Here are more details about your error (below):".red
                    );
                    console.log("");
                    console.log(error);
                    console.log("");
                    process.exit(1);
                }
            });
        }
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
