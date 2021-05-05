import { MetricAnalyser } from "./Analysers/metricAnalyser";
const path = require("path");

const repositoryFolder = "Repositories";

function crawl(repositoryName: String) {
  const ma = new MetricAnalyser();
  ma.analyse(path.join(repositoryFolder, repositoryName));
}

export { crawl };
