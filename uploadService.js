import AWS from "aws-sdk";
import { config } from "./config.js";
import fs from "fs";

const s3 = new AWS.S3({
  endpoint: config.CLOUDFLARE_BUCKET_URL,
  accessKeyId: config.CLOUDFLARE_ACCESS_KEY,
  secretAccessKey: config.CLOUDFLARE_SECRET_KEY,
  region: "auto",
  signatureVersion: "v4",
});

export const uploadToR2 = async (filePath, fileName) => {
  const fileStates = fs.statSync(filePath);
  const fileSize = fileStates.size;

  if (fileSize < 5 * 1024 * 1024) {
    const file = fs.readFileSync(filePath);

    const params = {
      Bucket: config.CLOUDFLARE_BUCKET_NAME,
      Key: fileName,
      Body: file,
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  } else {
    const params = {
      Bucket: config.CLOUDFLARE_BUCKET_NAME,
      key: fileName,
      body: fs.createReadStream(filePath),
    };
    const data = await s3.upload(params).promise();
    console.log(data);
  }
};
