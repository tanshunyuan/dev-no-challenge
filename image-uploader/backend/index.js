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
  console.log(req)
  const file = req.file;
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
  });
  console.log(file);
  const result = await imagekit
    .upload({
      file: file.buffer,
      fileName: file.originalname,
    })
    .then((response) => {
      console.log("RESPONSE ==> ", response);
      return response;
    })
    .catch((err) => {
      console.log("ERROR => ", err);
      return err;
    });
  res.status(200).send(result.url);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
