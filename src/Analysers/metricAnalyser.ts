import { Analyser } from "./analyser";

const path = require("path");
const fs = require("fs");
const process = require("process");
const linesCount = require("file-lines-count");

const repositoryFolder = "Repositories";
const supportFileExtensions: Array<string> = ["java", "js", "ts"];

export class MetricAnalyser implements Analyser {
  metricResults: Map<string, string> = new Map();

  public analyse(currentPath: string): string {
    this.readDirectory(currentPath);
    return Array.from(this.metricResults.entries()).join("\n");
  }

  private readDirectory(currentPath: string) {
    fs.readdir(currentPath, this.directoryAnalyser.bind(this, currentPath));
  }

  private directoryAnalyser(currentPath: string, err: any, files: Array<any>) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    // Go trough all the files/folders in the directory
    for (const file of files) {
      fs.stat(
        path.join(currentPath, file),
        this.fileAnalyser.bind(this, currentPath, file)
      );
    }
  }

  private async fileAnalyser(
    currentPath: string,
    file: string,
    err: any,
    stat: any
  ) {
    if (err) {
      console.error("Error stating file.", err);
      return;
    }

    // If the file being considered is indeed a file
    if (stat.isFile()) {
      // Find the file extension
      const fileNameSplit: Array<string> = file.split(".");
      const fileExtension = fileNameSplit[fileNameSplit.length - 1];

      //Check if the file extension is supported by the crawler
      if (supportFileExtensions.includes(fileExtension)) {
        const lines = await linesCount(path.join(currentPath, file));
        this.metricResults.set(path.join(currentPath, file), lines);
        console.log(`${file} has ${lines} lines`);
      }
    }
    // If the file being considered is a directory
    else if (stat.isDirectory()) {
      this.readDirectory(path.join(currentPath, file));
    }
  }
}
