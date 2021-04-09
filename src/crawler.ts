import { visitDirectory } from "./Analysers/metricAnalyser";
const path = require("path");

const repositoryFolder = "Repositories";
const supportFileExtensions: Array<String> = ["java", "js", "ts"];

function crawl(repositoryName: String) {
  visitDirectory(path.join(repositoryFolder, repositoryName));
}

export { crawl };
