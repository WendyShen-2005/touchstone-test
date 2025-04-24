const express = require('express');
const app = express();
const PORT = 8080;

//parse all requests as json
app.use(express.json())

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);

app.get('/tshirt', (req: any, res: any) => {
    res.status(200).send({
        tshirt: 'shirt1',
        size:'large'
    })
})

app.post('/tshirt/:id', (req: any, res: any) => {



    const {id} = req.params;
    const {logo} = req.body;

    if(!logo) {
        res.status(418).send({message: 'We need logo'});
    } 
    res.send({
        tshirt:`Tshirt with ${logo} and ID ${id}`
    })
})