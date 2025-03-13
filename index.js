import express from "express";
import multer from "multer";
import path from "path";
import { config } from "./config.js";
import { uploadToR2 } from "./uploadService.js";

const app = express();
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

app.post("/upload", uploads.single("file"), (req, res) => {
  uploadToR2(req.file.path, req.file.filename);
  res.send("File uploaded successfully");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
