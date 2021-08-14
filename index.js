const express = require('express');
const cors = require('cors')
const {toBuffer} = require('./helpers')
const {logger , loggerResult} = require('./logger')
const constant = require('./constants');
const multer  = require('multer')
const fs = require('fs');
const bodyParser = require('body-parser');


const upload = multer({ dest: `${constant.STATIC_PATH}/uploads/` })
const app = express()
const port = 3000;

// create static file directory 
if (!fs.existsSync(constant.STATIC_PATH)){
    fs.mkdirSync(constant.STATIC_PATH);
    fs.mkdirSync(`${constant.STATIC_PATH}/uploads/`);
}

// apply middlewares
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
});
app.set('etag', false);






// status request
app.get('/status', function (req, res, next) {
    try {
        logger.info('status: %s',req.headers['user-agent'])
        res.status(200).send();
    } catch (error) {
        logger.error('Error: %s',error)
        res.status(500).send('Something went wrong..');
    }

});
// download
app.get('/download', function (req, res, next) {
    try {
        const fileSize= Number(req.query.fileSize | 1024);
        logger.info('download size %d', fileSize)
        const download = new ArrayBuffer(fileSize);
        const bufferData = toBuffer(download);
        res.send(bufferData);
    } catch (error) {
        logger.error('Error: %s',error)
        res.status(500).send('Something went wrong..');
    }
});
// upload
app.post('/upload',upload.single('test_file'), function (req, res, next) {
    try {
        logger.info('upload size %d', req.file.size)
        res.status(200).send(req.file.size.toString());
    } catch (error) {
        logger.error('Error: %s',error)
        res.status(500).send('Something went wrong..');
    }
});
// logging.
app.post('/log', function (req, res, next) {
    try {
        loggerResult.info(req.body)
        res.status(200).send();
    } catch (error) {
        console.error('Error: %s',error)
        res.status(500).send('Something went wrong..');
    }
});




app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
