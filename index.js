const fs = require("fs");

let files = 0;
let directories = 0;

async function print(path = "./", depth, prevstr) {
  const dir = await fs.promises.opendir(path);
  const direntArr = [];

  let index = 0;
  for await (const dirent of dir) {
    direntArr[index++] = dirent.name;
  }

  const dirSec = await fs.promises.opendir(path);

  for await (const dirent of dirSec) {
    let prev = "";
    prevstr.forEach((item) => {
      prev += item;
    });

    if (dirent.name === direntArr[direntArr.length - 1]) {
      prev += "└──";
    } else {
      prev += "├──";
    }

    if (dirent.isDirectory() && depth) {
      directories++;

      console.log(prev + dirent.name);

      directory = path + dirent.name + "/";

      if (dirent.name === direntArr[direntArr.length - 1]) {
        prevstr.push("   ");
      } else {
        prevstr.push("│  ");
      }

      await print(directory, depth - 1, prevstr);
      prevstr.pop();
    } else if (dirent.isFile() && depth) {
      files++;

      console.log(prev + dirent.name);
    }
  }

  return new Promise((res, rej) => {
    res();
  });
}
const correctPath = process.argv[2].endsWith("/")
  ? process.argv[2]
  : process.argv[2] + "/";
console.log(process.argv[2] || "./");

print(correctPath, process.argv[3], []).then(() =>
  console.log(`${directories} directories, ${files} files.`)
);
