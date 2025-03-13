import { config } from "./config.js";
import fs from "fs";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  endpoint: config.CLOUDFLARE_BUCKET_URL,
  credentials: {
    accessKeyId: config.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: config.CLOUDFLARE_SECRET_KEY,
  },
  region: "auto",
  signatureVersion: "v4",
});

// export const uploadToR2 = async (filePath, fileName) => {
//   const fileStates = fs.statSync(filePath);
//   const fileSize = fileStates.size;

//   if (fileSize < 5 * 1024 * 1024) {
//     const file = fs.readFileSync(filePath);

//     const params = {
//       Bucket: config.CLOUDFLARE_BUCKET_NAME,
//       Key: fileName,
//       Body: file,
//     };

//     s3.putObject(params, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     });
//   } else {
//     const params = {
//       Bucket: config.CLOUDFLARE_BUCKET_NAME,
//       key: fileName,
//       body: fs.createReadStream(filePath),
//     };
//     const data = await s3.upload(params).promise();
//     console.log(data);
//   }
// };

export const getUploadUrl = async (fileName) => {
  const params = {
    Bucket: config.CLOUDFLARE_BUCKET_NAME,
    Key: fileName,
    ContentType: "application/octet-stream",
  };
  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};

export const getLoadUrl = async (fileName) => {
  const params = {
    Bucket: config.CLOUDFLARE_BUCKET_NAME,
    Key: fileName,
    ContentType: "application/octet-stream",
  };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};
