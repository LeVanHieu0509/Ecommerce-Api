import { AccessControl } from "accesscontrol";

// grant list fetched from DB (to be converted to a valid grants object, internally)
//Mỗi đối tượng trong mảng định nghĩa vai trò, tài nguyên, hành động và thuộc tính liên quan đến một quyền cụ thể.
let grantList = [
  { role: "admin", resource: "profile", action: "read:any", attributes: "*, !views" }, // Trừ view ra là không được đọc
  { role: "admin", resource: "profile", action: "update:any", attributes: "*, !views" },
  { role: "admin", resource: "profile", action: "delete:any", attributes: "*, !views" },
  { role: "admin", resource: "balance", action: "read:any", attributes: "*, !views" },

  { role: "shop", resource: "profile", action: "read:own", attributes: "*" },

  //   { role: "admin", resource: "video", action: "update:any", attributes: "*, !views" },
  //   { role: "admin", resource: "video", action: "delete:any", attributes: "*" },
  //   { role: "user", resource: "video", action: "create:own", attributes: "*, !rating, !views" },
  //   { role: "user", resource: "video", action: "read:any", attributes: "*" },
  //   { role: "user", resource: "video", action: "update:own", attributes: "*, !rating, !views" },
  //   { role: "user", resource: "video", action: "delete:own", attributes: "*" },
];

// role: Đây là vai trò được gán cho quyền truy cập
// resource: Tài nguyên mà quyền truy cập này có quyền truy cập.
// action: đọc thông tin cá nhân của bất kỳ người dùng nào.
// attributes: Đây là thuộc tính của tài nguyên mà quyền truy cập cho phép hoặc không cho phép.
const ac = new AccessControl(grantList);

export default ac;

//1.

//2. Lấy ra các réource trong hệ thống
//3.
