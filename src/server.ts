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

// init server
app.listen(
    PORT,
    () => console.log(`It's live on http://localhost:${PORT}`)
);

// default route
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
    var newApp = req.body;

    // checks for flags first
    newApp = redFlags(newApp);

    // then writes into db.json
    db.get("applicants").push(newApp).write();

    db.write();

    res.json({success:true})
});

// takes in json and sees if there are red flags
const redFlags = (newA:JSON) => {

    const newApp = JSON.parse(JSON.stringify(newA));

    // check num of hours practiced---------------------------
    if(newApp.legalStat.numPracticeHours <720) {
        newApp.legalStat.redFlags.push({
            msg:"Number of practice hours is less than 720.",
            aknowledged:false
        })
    }

    // check if there are any valid prev pra attempts---------
    var wrote = 0, failed = 0, curr = 0;
    for(var i = 0; i < newApp.prevPRA.prevPRAAttempts.length; i++) {
        //if wrote
        if(newApp.prevPRA.prevPRAAttempts[i].written == 'true'){
            wrote++;
            //if failed
            if(newApp.prevPRA.prevPRAAttempts[i].passed == 'false')
                failed++;
            //if wrote, passed, and current 
            else if(newApp.prevPRA.prevPRAAttempts[i].current == 'true')
                curr++;
        }
    }
    var msg;
    if(curr != 0)//if has current TDM
        msg = "Applicant has current TDM"
    else if(failed != 0)//if never passed
        msg = "Applicant has never passed TDM"
    else if(wrote == 0)//if never wrote
        msg = "Applicant has never written TDM"

    // if there is a flag message, update flags
    if(msg != null) {
        newApp.prevPRA.redFlags.push({
            msg:msg,
            aknowledged:false
        })
    }

    //eng proficicency --------------------------------

    msg = null;

    // check what proof they chose and whether they meet the requirements via that proof
    switch(newApp.engProficiency.test) {
        case "IELTS":
            if(newApp.engProficiency.score < 7 || newApp.engProficiency.expired){
                msg = "Applicant got less than 7 on the IELTS";
                break;
            }
        case "OET": 
            if(newApp.engProficiency.score.toUpper.charAt(0) > 'B' || newApp.engProficiency.expired){
                msg = "Applicant got less than B on the OET";
                break;
            }
        case "CELPIP":
            if(newApp.engProficiency.score < 9 || newApp.engProficiency.expired){
                msg = "Applicant got less than 9 on the CELPIP";
                break;
            }
        default:
            if(newApp.engProficiency.score < 50) {
                msg = "Applicant used english less than 50% of the time during practice.";
                break;
            }
    }

    // if there is a flag message, update flags
    if(msg != null) {
        newApp.engProficiency.redFlags.push({
            msg:msg,
            aknowledged:false
        })
    }

    return newApp;
}

// get data for specific applicant
app.get('/specApp/:id', (req:any, res:any) => {
    const userId = parseInt(req.params.id);
    console.log(userId);
    const data = db.get('applicants').value()[userId];
    console.log("User " + userId + " data loaded");
    res.json(data);
})

// acknowledge flag
app.patch('/aknowledge/:id/:key/:index', (req:any, res:any) => {
    const userId = parseInt(req.params.id);
    const userKey = parseInt(req.params.key);
    const userIndex = parseInt(req.params.index);

    db.get('applicants').value[userId][userKey].redFlags[userIndex].aknowledged = true;
    db.get('applicants').value[userId][userKey].redFlags[userIndex].aknowledged.write();
    db.write();

    res.json(db.get('applicants').value[userId][userKey])
})