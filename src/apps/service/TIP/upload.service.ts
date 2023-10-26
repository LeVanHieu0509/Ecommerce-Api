import cloudinary from "../../config/cloudinary.config";

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
