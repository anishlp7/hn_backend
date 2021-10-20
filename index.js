const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({extended: false}));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage:storage
}).single('icon');

app.get('/', function(req, res) {
    res.send('Hello, Hackernoon Developers!');
});

app.post("/api/upload", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

app.use('/images', express.static('./images'));

app.listen(process.env.PORT || 3000, function(a) {
    console.log("Listening to port 3000");
});