const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

const PORT = 8000;

// default options
app.use(fileUpload());

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))

app.post('/upload/content', function(req, res) {
  console.log(req.body)
  res.send(req.body)
})

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  // 这里提交的文件表单名称为 file
  sampleFile = req.files.file;

  // 为文件名打一个时间戳，保证不重名
  const filename = (new Date().getTime()) + sampleFile.name;

  uploadPath = path.join(__dirname, 'uploads', filename);

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

  res.send({default: path.join('uploads', filename)})
  });
});

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
