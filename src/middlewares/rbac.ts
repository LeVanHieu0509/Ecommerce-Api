import { NextFunction, Response } from "express";
import { RequestCustom } from "../apps/auth/authUtils";
import ac from "./role.middleware";
import { IQueryInfo } from "accesscontrol";
import { AuthFailureError } from "../core/error.response";
import { roleList } from "../apps/service/TIP/rbac.service";

// Middleware này được sử dụng để kiểm tra quyền truy cập của người dùng
// Trước khi cho phép truy cập vào một tài nguyên và hành động cụ thể.

const grantAccess = ({
  action,
  resource,
}: {
  action: "readAny" | "delete" | "update" | "readOwn";
  resource: "profile" | "balance";
}) => {
  return async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      //1.FETCH DATABASE: set quyền này vô 1 list json or lưu lại vào cache.
      // Đảm bảo tính thời cao.

      ac.setGrants(await roleList({ userId: 9999 }));
      // get role user client
      // Đối tượng này xác định hành động ("action") và tài nguyên ("resource") mà quyền truy cập sẽ được kiểm tra.

      const rol_name = req.query.role;

      // Sử dụng đối tượng ac để kiểm tra xem vai trò có quyền thực hiện hành động và truy cập vào tài nguyên không.
      // Quyền truy cập được xác định bằng cách gọi phương thức tương ứng của ac với vai trò, hành động và tài nguyên tương ứng.
      const permission = ac.can(rol_name as string | string[] | IQueryInfo)[action](resource);

      if (!permission.granted) {
        throw new AuthFailureError("You dont have enough permissions...");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export { grantAccess };
