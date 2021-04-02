const express = require("express");
const framesArr = require("./frames");
const app = express();
var port = process.env.PORT || 3030;

var clsStr = (" ".repeat(40)+"\n").repeat(30)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    count = 0

    setInterval(function(){
        res.write(`${framesArr[count]}`)
        count++
        setTimeout(() => {
            res.write("\033[0;0H"); //Ansii to reset cursor
            res.write(clsStr)
            res.write("\033[0;0H");
        }, 100);

        if(count>=framesArr.length){
            count=0
        }

    },200)

});

app.listen(port,()=>console.log(`Listening @ localhost:${port}; use curl localhost:${port}`))