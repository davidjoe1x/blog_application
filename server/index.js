const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname,'/images')))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,


}).then(console.log('Соединение с MongoDB установлено'))
.catch((err) => console.log(err));


const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, 'images')
    }, filename:(req, file,cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage:storage})
app.post('/server/upload', upload.single('file'),(req,res) => {
    res.status(200).json('Изображение успешно загружено')
})

app.use("/server/auth", authRoute);
app.use("/server/users", userRoute);
app.use("/server/posts", postRoute);



app.listen(PORT, () =>
console.log(`Сервер запущен на порту ${PORT}`)
)


