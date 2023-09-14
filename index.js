import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";

const app = express();
const port = 3000;

const tasks = [];
const tasksW = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/about', (req, res) => {
    res.render('partials/about.ejs');
});

app.get('/contact', (req, res) => {
    res.render('partials/contact.ejs');
});

app.post('/submit', (req, res) => {
    const currentValue = req.body["taskD"];
    const currentValueW = req.body["taskW"];

    const lastEl = tasks[tasks.length - 1];
    const lastElW = tasksW[tasksW.length - 1];

    const arrL = tasks.length;
    const arrLW = tasksW.length;


    res.render('index.ejs', {

        tasks: tasks,
        tasksW: tasksW,

        arrL: arrL,
        arrLW: arrLW,

        lastEl: lastEl,
        lastElW: lastElW,

        currentValue: currentValue,
        currentValueW: currentValueW,
    });
        if (currentValue !== undefined) {
            if (currentValue.length > 0) {
                tasks.push(currentValue);
            }
            else if (currentValue == lastEl) {
            console.log("bruh");
            return 
            }  
        }    
        if (currentValueW !== undefined) {
            if (currentValueW.length > 0) {
                tasksW.push(currentValueW);
            }
            else if (currentValueW == lastElW) {
            console.log("bruh");
            return 
            }  
            
        }   
});

app.listen(port, () => {
console.log(`Server started on port ${port}`);
// Starting a server
});

