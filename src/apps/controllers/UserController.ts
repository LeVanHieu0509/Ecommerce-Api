import { Request, Response } from "express";
import { ServerException } from "../../lib/custom-errors";
import Template from "../global/response";
import APIError from "../global/response/apierror";
import { UserService } from "../service/UserService";
const service = new UserService();

class UserController {
  //Tìm các thực thể phù hợp với các tùy chọn tìm đã cho.
  // public static listAll = (req: Request, res: Response, next: any) => {
  //   service
  //     .get()
  //     .then((users) => {
  //       if (users && users.length > 0) {
  //         res.json(Template.success(users, "Users Feated succesfully"));
  //       } else {
  //         res.json(Template.success(users, "Users Feated succesfully"));
  //       }
  //     })
  //     .catch((err) => {
  //       next(new ServerException("error occured"));
  //     });
  // };
  //save
  // Lưu một thực thể nhất định trong cơ sở dữ liệu.
  // Nếu thực thể không tồn tại trong cơ sở dữ liệu thì chèn,
  // nếu không thì cập nhật.
  // public static addNew = (req: Request, res: Response, next: any) => {
  //   service
  //     .add(req.body)
  //     .then((user) => {
  //       if (user) {
  //         res.json(Template.success(user, "Users saved succesfully"));
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.ErrorID == 2110) {
  //         next(new APIError(err.message, err.ErrorID));
  //       }
  //       next(new ServerException("error occured"));
  //     });
  // };
  //getById
  // Tìm thực thể đầu tiên phù hợp với điều kiện đã cho.
  // Nếu thực thể không được tìm thấy trong cơ sở dữ liệu - trả về giá trị rỗng.
  // public static findOneBy = (req: Request, res: Response, next: any) => {
  //   const { id } = req.params;
  //   service
  //     .getById(Number(id))
  //     .then((user) => {
  //       if (user) {
  //         res.json(Template.success(user, "Users saved succesfully"));
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.ErrorID == 2110) {
  //         next(new APIError(err.message, err.ErrorID));
  //       }
  //       next(new ServerException("error occured"));
  //     });
  // };
  //findBy
  //Tìm kiếm phụ thuộc vào từng fieldfieeld, tìm ra tất cả các rows roư row
  //chưa field này và in ra màn hình.
  //Tìm các thực thể phù hợp với các tùy chọn tìm đã cho.
  // public static findBy = (req: Request, res: Response, next: any) => {
  //   const { id } = req.params;
  //   service
  //     .findBy({ username: "levan" })
  //     .then((user) => {
  //       if (user) {
  //         res.json(Template.success(user, "Users saved succesfully"));
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.ErrorID == 2110) {
  //         next(new APIError(err.message, err.ErrorID));
  //       }
  //       next(new ServerException("error occured"));
  //     });
  // };
  //delete
  // public static delete = (req: Request, res: Response, next: any) => {
  //   const { id } = req.params;
  //   service
  //     .delete(Number(id))
  //     .then((user) => {
  //       if (user) {
  //         res.json(Template.success(user, "Users saved succesfully"));
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.ErrorID == 2110) {
  //         next(new APIError(err.message, err.ErrorID));
  //       }
  //       next(new ServerException("error occured"));
  //     });
  // };
}

export default UserController;
