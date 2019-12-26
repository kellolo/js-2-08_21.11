const logFile = "server/stats.json";

// import catalogCore from "./catalogCore";
// import fs from "fs";
const catalogCore = require("./catalogCore");
const fs = require("fs");

function cartActivity(action, id) {
  const date = new Date(Date.now());
  const dateStr = `${date.getFullYear()}.${('0'+(date.getMonth() + 1)).slice(-2)}.${('0'+date.getDate()).slice(-2)}`;
  const timeStr = `${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}:${('0'+date.getSeconds()).slice(-2)}`;
  let act;
  switch (action) {
    case "del":
      act = "User deleted"
      break;
    case "add":
      act = "User added"
      break;
    default:
      act = "User do something unexpected with item"
      break;
  }
  const title = catalogCore.getItemById(id).title;
  fs.appendFile(logFile, `${dateStr} ${timeStr} ${act} ${title}\n`, () => { });
}

// export default cartActivity;
module.exports = cartActivity;