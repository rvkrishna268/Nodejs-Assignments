const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
let studentsList = require("./InitialData");
let len = studentsList.length;

app.get("/api/student", (req, res) => {
    res.send(studentsList);
});


app.get("/api/student/:id", (req, res) => {
    try {
        let id = req.params.id;
        for (let obj in studentsList) {
            if (studentsList[obj]["id"] === parseInt(id)) {
                res.send(studentsList[obj]);
                return;
            }
        }
        res.status(404).send("Provide a valid ID");
        return;
    } catch (e) {
        res.status(500).json({
            status: "failure",
            message: e.message
        })
    }
});

app.post("/api/student", (req, res) => {
    try {
        res.set("content-type", "application/x-www-form-urlencoded");
        const newStudent = req.body;
        if (!newStudent.name || !newStudent.currentClass || !newStudent.division) {
            res.status(400).json({
                status:"failure",
                message:"Provide Complete details"
            });
            return;
        }
        studentsList.push({
            id: len + 1,
            name: newStudent.name,
            currentClass: parseInt(newStudent.currentClass),
            division: newStudent.division
        });
        len++;
        res.send({
            id: len
        });
    } catch (e) {
        res.status(500).json({
            status: "failure",
            message: e.message
        })
    }
});

app.put("/api/student/:id", (req, res) => {
    try {
        res.set("content-type", "application/x-www-form-urlencoded");
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        const index = studentsList.findIndex((student) => student.id === id);
        if (index === -1) {
            res.status(400).json({
                message:"Provide valid input"
            });
            return;
        }
        const student = studentsList[index];
        if (req.body.name) {
            studentsList[index].name = req.body.name;
        }
        if (req.body.currentClass) {
            studentsList[index].currentClass = parseInt(req.body.currentClass);
        }
        if (req.body.division) {
            studentsList[index].division = req.body.division;
        }
        res.json({message:"Update successful"});
    } catch (e) {
        res.status(500).json({
            status: "failure",
            message: e.message
        })
    }
});

app.delete("/api/student/:id", (req, res) => {
    try {
        let id = req.params.id;
        let flag = false;
        let index = null;
        for (let obj in studentsList) {
            if (studentsList[obj]["id"] === parseInt(id)) {
                flag = true;
                index = obj;
            }
        }
        if (!flag) {
            res.status(404).json({message:"Provide a valid ID"});
            return;
        }
        studentsList.splice(index, 1);
        res.send(studentsList);
    } catch (e) {
        res.status(500).json({
            status: "failure",
            message: e.message
        })
    }
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
module.exports = app;