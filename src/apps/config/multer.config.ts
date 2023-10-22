import multer from "multer";
import path from "path";

const uploadMemory = multer({
  storage: multer.memoryStorage(),
});

const uploadDisk = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(__dirname, "../../uploads"));
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()} - ${file.originalname}`);
    },
  }),
});

export { uploadDisk, uploadMemory };
