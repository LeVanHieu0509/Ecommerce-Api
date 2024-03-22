import { NextFunction } from "express";
import { RequestCustom } from "../../auth/authUtils";
import { SuccessResponse } from "../../../core/success.response";

const profiles = [
  {
    usr_id: 1,
    usr_name: "CR7",
    usr_avt: "img.com/user/1",
  },
  {
    usr_id: 2,
    usr_name: "M10",
    usr_avt: "img.com/user/1",
  },
  {
    usr_id: 3,
    usr_name: "TIPJS",
    usr_avt: "img.com/user/1",
  },
];
class ProfileController {
  constructor(parameters) {}

  //admin
  public static profiles = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "View all profiles",
      metadata: profiles,
    }).send(res);
  };

  //shop
  public static profile = async (req: RequestCustom, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "View all profiles",
      metadata: {
        usr_id: 2,
        usr_name: "M10",
        usr_avt: "img.com/user/1",
      },
    }).send(res);
  };
}

export default ProfileController;
