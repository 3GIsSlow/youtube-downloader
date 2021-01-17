const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const ytdl = require('ytdl-core');
const path = require('path');
const uniqid = require('uniqid');
const port = process.env.PORT || 3030;

app.use(express.static('../client/dist'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.resolve('../client/dist/index.html'));
});

app.post('/download', (req, res) => {
    const link = req.body.link;
    const id = uniqid();

    ytdl(link).pipe(fs.createWriteStream(`${id}.mp4`)).on('finish', () => {
        console.log(`Finished downloading: ${id}`);

        res.json({
            id: id
        });
    });
});

app.get('/download/:id', (req, res) => {
    let file = `${req.params.id}.mp4`;

    res.download(file);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});