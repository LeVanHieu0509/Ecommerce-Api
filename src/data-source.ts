import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./apps/modules/entities/photo.entity";
import { User } from "./apps/modules/entities/user.entity";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "sa",
  password: "Levanhieu1",
  database: "test",
  synchronize: true,
  logging: true,
  entities: ["src/apps/modules/entities/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  options: {
    encrypt: false,
    useUTC: true,
  },

  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 3600000,
  },
});

//  type: "mssql",
//   host: "localhost", //Máy chủ sql
//   port: 1433, //cổng máy chủ
//   username: "sa",
//   password: "Levanhieu1",
//   database: "test",
//   synchronize: true, //Cho biết liệu lược đồ cơ sở dữ liệu có được tạo tự động trên mỗi lần khởi chạy ứng dụng hay không
//   logging: true, //Cho biết nếu đăng nhập được kích hoạt hay không. Nếu được đặt thành truethì truy vấn và ghi nhật ký lỗi sẽ được bật. Bạn cũng có thể chỉ định các loại ghi nhật ký khác nhau sẽ được bật, chẳng hạn như ["query", "error", "schema"]
//   entities: ["src/apps/modules/entities/*.ts"], //Các thực thể hoặc Lược đồ thực thể sẽ được tải và sử dụng cho nguồn dữ liệu này.
//   subscribers: ["src/subscriber/**/*.ts"], //Thuê bao được nạp và sử dụng nguồn data này. Chấp nhận cả lớp thực thể và thư mục để tải từ đó. Thư mục hỗ trợ các mẫu toàn cầu.
//   migrations: ["src/migration/**/*.ts"], //Di chuyển sẽ được tải và sử dụng cho nguồn dữ liệu này. Chấp nhận cả lớp di chuyển và thư mục để tải từ đó. Thư mục hỗ trợ các mẫu toàn cầu. Ví dụ: migrations: [FirstMigration, SecondMigration, "migration/*.js", "modules/**/migration/*.js"].
//   options: {
//     encrypt: false, //Một boolean xác định xem kết nối có được mã hóa hay không. Đặt thành true nếu bạn đang dùng Windows Azure
//     useUTC: true, //Một boolean xác định xem có chuyển các giá trị thời gian theo UTC hoặc giờ địa phương hay không
//   },

//   pool: {
//     max: 100, //Số lượng kết nối tối đa có thể có trong nhóm (mặc định: 10).
//     min: 0, //Số lượng kết nối tối thiểu có thể có trong nhóm (mặc định: 0).
//     idleTimeoutMillis: 3600000, //khoảng thời gian tối thiểu mà một đối tượng có thể ngồi yên trong nhóm trước khi nó đủ điều kiện để trục xuất do thời gian nhàn rỗi. Thay thế softIdleTimeoutMillis. Mặc định: 30000.
//   },
