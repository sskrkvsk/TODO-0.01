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
    name: "Add your daily task",
    type: "daily"
});

const weeklyTodo = new Todo({
    name: "Add your weekly task",
    type: "weekly"
});

const defaultItems = [dailyTodo, weeklyTodo];


// dailyTodo.save();
// weeklyTodo.save();

// GET
app.get('/', (req, res) => {
    Todo.find({}).then(function(foundItems){

        if (foundItems.length < 1) {
          Item.insertMany(defaultItems).then(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successefully saved default items to DB");
            }
          });
        } else {
          res.render("index", { newListItems: foundItems });
        }
      })
      .catch(function(err){
        console.log(err);
      });
});

app.get('/about', (req, res) => {
    res.render('partials/about.ejs');
});

app.get('/contact', (req, res) => {
    res.render('partials/contact.ejs');
});

// POST
app.post("/", function(req, res){
  
    const dayTask = req.body.daily;
    const weekTask = req.body.weekly;
    const dayBtn = req.body.day;
    const weekBtn = req.body.week;

    if (dayBtn) {
        if (dayTask) {

            const item = new Todo({
                name: dayTask,
                type: "daily"
            });

            item.save();
            res.redirect("/");

        } else {
            console.log("Day btn error");
            res.redirect("/");
        }
    }

    if (weekBtn) {
        if (weekTask) {
            console.log(weekTask);

            const item = new Todo({
                name: weekTask,
                type: "weekly"
            });

            item.save();
            res.redirect("/");

        } else {
            console.log("Week btn error");
            res.redirect("/");
        }
    }
  });

app.listen(port, () => {
console.log(`Server started on port ${port}`);
});

