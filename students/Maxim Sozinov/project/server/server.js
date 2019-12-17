const express = require('express');
const fs = require('fs');

const app = express();


app.use('/', express.static('public'));

app.get('/catalog', (req, res) => {

    fs.readFile('server/db/catalogData.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(data);
        }
    });

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});