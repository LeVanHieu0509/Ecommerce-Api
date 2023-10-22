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

    Object.keys(files).forEach(async (key) => {
      const result = await cloudinary.uploader.upload(files[key][0].path, {
        format: "jpg",
        public_id: "thumb",
        folder: folderName,
      });

      imageUrlList.push(result.secure_url);
    });

    return {
      image_url: imageUrlList,
      shopId: 1,
    };
  } catch (error) {
    console.log("uploadImageFromUrl", error);
  }
};
