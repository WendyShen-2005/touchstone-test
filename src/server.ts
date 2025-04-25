const express = require('express');
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");

const adapter = new FileSync('db.json');
const db = lowDb(adapter);

const app = express();

app.use(cors());
app.use(bodyParser.json())

const PORT = 8080;

//parse all requests as json
app.use(express.json())

app.listen(
    PORT,
    () => console.log(`It's live on http://localhost:${PORT}`)
);

app.get('/', (req:any, res:any) => {
    console.log("hey")
})

// view all applicant data
app.get('/allApps', (req: any, res: any) => {
    const data = db.get('applicants').value();
    console.log("All applicants loaded");
    return res.json(data);
});

//submitting new application
app.post('/newApp', (req: any, res: any) => {
    console.log("New application!!! ", req.body);
    const newApp = req.body;
    db.get("applicants").push(newApp).write();

    db.write();

    res.json({success:true})
});