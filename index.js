import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import moment from "moment";

const app = express();
const port = 3000;


app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
  });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

var task = ["Learn Code", "Practise with nodejs"];
var complete = ["Finish jquery"];

app.get("/", (req, res) => {
    res.render("index", { task: task, complete: complete });
});

app.get("/work", (req, res,) => {
    res.render("work", { task: task, complete: complete });
});

app.get("/today", (req, res) => {
    res.redirect("/");
});

app.post("/addtask", (req, res) => {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", (req, res) => {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});
