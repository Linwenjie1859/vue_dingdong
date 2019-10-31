var fs = require("fs");
fs.writeFile("C:\\Users\\59716\\Desktop\\Hello.txt", "this is a new text", { flag: "w" }, function(err) {
    if (!err) {
        console.log("写入成功！")
    } else {
        console.log(err);
    }
})