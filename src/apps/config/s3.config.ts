import * as dotenv from "dotenv";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// a client can be shared by different commands.
dotenv.config();

const s3Config = {
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
  },
};

const s3 = new S3Client(s3Config);

export { s3, PutObjectCommand };
