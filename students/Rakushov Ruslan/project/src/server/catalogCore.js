// import fs from "fs";
const fs = require("fs");

const catalogCore = {
  getItemById(id) {
    const data = JSON.parse(fs.readFileSync("server/responses/catalogData.json"));
    return data.find(item => item.id === id);
    //TODO Как сделать асинфронное чтение (Промис?)
    // fs.readFile("server/responses/catalogData.json", "utf-8", (err, data) => {
    //   console.log(`err= ${err}`);
    //   console.log(`data= ${data}`);
    //   if (!err) {
    //     let find = JSON.parse(data).find(item => item.id === id);
    //     return find;
    //   }
    // })
  },
};

// export default catalogCore;
module.exports = catalogCore;