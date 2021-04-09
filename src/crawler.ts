import { MetricAnalyser } from "./Analysers/metricAnalyser";
const path = require("path");

const repositoryFolder = "Repositories";
const supportFileExtensions: Array<String> = ["java", "js", "ts"];

function crawl(repositoryName: String) {
  const ma = new MetricAnalyser();
  ma.analyse(path.join(repositoryFolder, repositoryName));
}

export { crawl };
