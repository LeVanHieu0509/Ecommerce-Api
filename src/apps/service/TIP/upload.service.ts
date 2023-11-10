import { PutObjectCommand, GetObjectCommand, s3 } from "../../config/s3.config";
import crypto from "node:crypto";
import cloudinary from "../../config/cloudinary.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

//upload file use s3Client ///

// 3. upload from image local

export const uploadImageFromLocalS3 = async ({ file }) => {
  try {
    const randomImageName = () => crypto.randomBytes(16).toString("hex");
    const imageName = randomImageName();
    const commandObj = {
      Bucket: process.env.AWS_BUCKET_NAME, //để ý tên này phải giống với tên được tạo trong bucket trên aws, không là bị lỗi Access Denied
      Key: imageName || file.originalname,
      Body: file.path,
      ContentType: "image/jpeg",
    };

    const command = new PutObjectCommand(commandObj);

    const result = await s3.send(command);

    //tu s3 muon public ra cong dong thi can phai export ra url

    if (result.$metadata.httpStatusCode == 200) {
      const signedUrl = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
      });

      const url = await getSignedUrl(s3, signedUrl, { expiresIn: 3600 });

      return {
        status: "1",
        url: url,
        message: "Upload File Success",
      };
    }
  } catch (error) {
    return {
      status: "-1",
      message: error,
    };
  }
};

//END S3CLIENT
/// ----------//

export const uploadImageFromUrl = async ({ urlImage }) => {
  try {
    const folderName = "product/shopId",
      newFileName = "testdemo";

    const result = await cloudinary.uploader.upload(urlImage, {
      folder: folderName,
      public_id: newFileName,
    });

    return result;
  } catch (error) {
    console.log("uploadImageFromUrl", error);
  }
};

export const uploadImageFromLocal = async ({ path, folderName }) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: folderName,
      public_id: "thumb",
    });

    return {
      image_url: result.secure_url,
      shopId: 1,
      thumb_url: await cloudinary.url(result.public_id, {
        height: 500,
        width: 800,
        format: "jpg",
      }),
    };
  } catch (error) {
    console.log("uploadImageFromUrl", error);
  }
};

export const uploadImageFromLocalMulti = async ({ files, folderName }) => {
  try {
    const imageUrlList = [];
    console.log("files", files);
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        format: "jpg",
        public_id: file.filename,
        folder: folderName,
      });

      imageUrlList.push({
        img_url: result.secure_url,
        thumb_url: await cloudinary.url(result.public_id, {
          height: 500,
          width: 800,
          format: "jpg",
        }),
      });
    }

    return imageUrlList;
  } catch (error) {
    console.log("uploadImageFromUrl", error);
  }
};
