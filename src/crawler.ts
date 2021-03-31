const path = require("path");
const fs = require("fs");
const process = require("process");
const linesCount = require("file-lines-count");

const repositoryFolder = "Repositories";
const supportFileExtensions: Array<String> = ["java", "js", "ts"];

function crawl(repositoryName: String) {
  visitDirectory(path.join(repositoryFolder, repositoryName));
}

async function visitDirectory(currentPath: String) {
  fs.readdir(currentPath, function (err: any, files: any) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    // Go trough all the files/folders in the directory
    files.forEach(async function (file: String, index: Number) {
      fs.stat(
        path.join(currentPath, file),
        async function (err: any, stat: any) {
          if (err) {
            console.error("Error stating file.", err);
            return;
          }

          // If the file being considered is indeed a file
          if (stat.isFile()) {
            // Find the file extension
            const fileNameSplit: Array<String> = file.split(".");
            const fileExtension = fileNameSplit[fileNameSplit.length - 1];

            //Check if the file extension is supported by the crawler
            if (supportFileExtensions.includes(fileExtension)) {
              const lines = await linesCount(path.join(currentPath, file));
              console.log(`${file} has ${lines} lines`);
            }
          }
          // If the file being considered is a directory
          else if (stat.isDirectory()) {
            visitDirectory(path.join(currentPath, file));
          }
        }
      );
    });
  });
}

export { crawl };
