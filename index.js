const express = require("express");
const framesArr = require("./arr");
const app = express();
const colors = require('colors/safe');
var port = process.env.PORT || 3030;
var clsStr = (" ".repeat(40)+"\n").repeat(40)

//------------------EDIT-able-----------------------------------------------
const wantColor = false;
const interval = 60;

const colorsOptions = [
    'red',
    'yellow',
    'green',
    'blue',
    'magenta',
    'cyan',
    'white'
];
//---------------------------------------------------------------------------

const numColors = colorsOptions.length;
const selectColor = previousColor => {
let color;

do {
    color = Math.floor(Math.random() * numColors);
} while (color === previousColor);
return color;
};

app.get('/',(req,res)=>{

    let lastColor;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    count = 0

    setInterval(function(){
        
        if(wantColor){
            const newColor = lastColor = selectColor(lastColor);
            res.write(`${colors[colorsOptions[newColor]](framesArr[count])}`)
        }
        else{
            res.write(`${framesArr[count]}`)
        }
        res.write("\033[0;0H");
        count++
        setTimeout(() => { //Drawing of frames
            res.write("\033[0;0H"); //Ansii to reset cursor
            res.write(clsStr)
            res.write("\033[0;0H");
        }, 100);

        if(count>=framesArr.length){
            count=0
        }

    },interval)

});

app.listen(port,()=>console.log(`Listening @ localhost:${port}; use curl localhost:${port}`))
