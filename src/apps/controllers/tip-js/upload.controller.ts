import { NextFunction, Response } from "express";
import { BadRequestError } from "../../../core/error.response";
import { SuccessResponse } from "../../../core/success.response";
import { uploadImageFromLocal, uploadImageFromLocalMulti, uploadImageFromUrl } from "../../service/TIP/upload.service";
import { RequestCustom } from "./../../auth/authUtils";

class UploadController {
  public static uploadFile = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Upload File Success",
      metadata: await uploadImageFromUrl(req.body),
    }).send(res);
  };

  public static uploadThump = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { file } = req;
    console.log("file", file);
    if (!file) {
      throw new BadRequestError("Upload File Not Found");
    }

    new SuccessResponse({
      message: "Upload File Local Process",
      metadata: await uploadImageFromLocal({ path: file.path, folderName: "thumb" }),
    }).send(res);
  };

  public static uploadMultiThump = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { files } = req;

    if (!files) {
      throw new BadRequestError("Upload File Not Found");
    }

    new SuccessResponse({
      message: "Upload File Local Process",
      metadata: await uploadImageFromLocalMulti({ files: files, folderName: "profile" }),
    }).send(res);
  };
}
export default UploadController;
