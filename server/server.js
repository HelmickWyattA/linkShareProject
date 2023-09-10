const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const upload = require('./config/multer.config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use('/uploads', express.static('uploads'));



require('./config/mongoose.config');
require('./routes/course.routes')(app);
require('./routes/user.routes')(app);
require("dotenv").config();


app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const { filename, size } = req.file;
    res.send(`File uploaded: ${filename}, ${size} bytes`);
});




app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
