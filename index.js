import express from "express";
import multer from "multer";
import path from "path";
import { config } from "./config.js";
import { getUploadUrl } from "./uploadService.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({ storage: storage });

app.post("/upload-url", uploads.single("file"), async (req, res) => {
  if (!req.body.fileName) {
    return res.status(400).send("Please provide a file name");
  }
  const url = await getUploadUrl(req.body.fileName);
  res.send({ message: "File uploaded successfully", url });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
