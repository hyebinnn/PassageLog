// node
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

import express from 'express';
import {spawn} from 'child_process';
import path from 'path';
import multer from 'multer';

const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');                // upload 된 파일의 저장 경로
    },
    filename: function (req, file, cb) {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        let d = date.getDate().toString();
        let hour = date.getHours().toString();
        let minute =  date.getMinutes().toString();
        let seconds = date.getSeconds().toString();
        var today = year + month + d + "_" + hour + minute + seconds

        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");                  // for korean file name
        const ext = path.extname(file.originalname);
        var img_file_name = path.basename(file.originalname, ext) + '-' + today + ext
        cb(null, img_file_name);
    }
});

const app = express();
const port = 3000;
const upload = multer({storage: storage});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/UploadPage.html'));
});

app.post('/upload', upload.single('imgFile'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded!');
    }
    console.log(file.filename)
    res.send(file.filename);
});



app.get('/executeOCR/:imageName', async (req, res) => {
    const { imageName } = req.params;

    const result = await runOCR(imageName);

    res.send(result);
});

async function runOCR(imageName) {
    return new Promise((resolve) => {
        const ocrProcess = spawn('python', ['./OCR.py', imageName]);
        let result = '';

        ocrProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        ocrProcess.on('close', () => {
            resolve(result);
        });
    });
}


app.listen(port, () => {
    console.log("server is running!");
});