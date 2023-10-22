import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "shopdev-hieu",
  api_key: "561461381684332",
  api_secret: "mEyblH3OpbN0OgNan1y1PsX2WdE",
  secure: true,
});

export default cloudinary;
