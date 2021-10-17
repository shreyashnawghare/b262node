const os = require('os')
const fs = require('fs');
const { Console } = require('console');



fs.readFile("./nice.txt", "utf8", (error , data) => {

        console.log(data, "shreyash");

     fs.writeFile("./good.txt", data, () =>
    console.log("completed writing in good.txt")
     );
    });


    fs.copyFile("./nice.txt","./good.txt", () => {
    console.log("copied nice");
fs.rename("./nice.txt","awesome.txt", () => {
console.log("rename is completed");
});
    });
