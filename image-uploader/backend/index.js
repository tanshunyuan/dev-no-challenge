const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const ImageKit = require("imagekit");
const cors = require('cors');

const uploadFile = multer({ storage: multer.memoryStorage() }).single(
  "imageFile"
);

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors())

app.post("/upload", uploadFile, async (req, res) => {
  const file = req.file;
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
  });
  let result;
  try {
  result = await imagekit
    .upload({
      file: file.buffer,
      fileName: file.originalname,
    })
  res.status(200).send({message: result, error:null});

  }catch(error){
  res.status(500).send({message: 'Something went wrong', error});

  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
