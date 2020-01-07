#!/usr/bin/env node
// node boxit.js 'Jon Snow' 'Cersei Lannister' 'Daenerys Targaryen'
const argv = process.argv;
const input = argv.slice(2);

const drawLine = number => "━".repeat(number);
const drawTopBorder = number => "┏" + drawLine(number) + "┓";
const drawMiddleBorder = number => "┣" + drawLine(number)+ "┫";
const drawBottomBorder = number => "┗" + drawLine(number) + "┛";
const drawBarsAround = string => "┃" + string + " ".repeat(maxLength - string.length)+ "┃";

const maxArr = input.map(x => x.length);
const maxLength = Math.max(...maxArr);

function boxIt(anything){
    if(anything.length === 0){
        return `${drawTopBorder(0)} \n${drawBottomBorder(0)}`;
    } else {
        let top = '';
        let mid = '';
        let bot = '';
        for(let i=0; i < anything.length; i++){
            if(anything.length === 1){
                return `${drawTopBorder(maxLength)}\n${drawBarsAround(input[i])}\n${drawBottomBorder(maxLength)}`;
            } else if(anything.length > 1 && i === 0){
                top += `${drawTopBorder(maxLength)} \n${drawBarsAround(input[i])}`;
            } else if(i < anything.length -1 && i !== 0){
                mid += `\n${drawMiddleBorder(maxLength)} \n${drawBarsAround(input[i])}`;
            }   else{
                bot += `\n${drawMiddleBorder(maxLength)}\n${drawBarsAround(input[i])} \n${drawBottomBorder(maxLength)}`;
            }
}return top + mid + bot;
}
}
console.log(boxIt(input));
