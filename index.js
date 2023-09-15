import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";

// express set up
const app = express();
app.set('view engine', 'ejs');
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose set up
mongoose.connect('mongodb://127.0.0.1:27017/DoToDB');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    type: {
        type: String,
        enum: ["daily", "weekly"],
        required: [true]
    }
});
const Todo = mongoose.model("Todo", todoSchema);

// default files

const dailyTodo = new Todo({
    name: "Day example",
    type: "daily"
});

const weeklyTodo = new Todo({
    name: "Week example",
    type: "weekly"
});


// dailyTodo.save();
// weeklyTodo.save();


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
});

