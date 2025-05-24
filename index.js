const express = require("express"); // ➡ Thư viện ExpressJS để xây dựng ứng dụng web và API.
const dotenv = require("dotenv"); // ➡ Thư viện dotenv để quản lý biến môi trường trong ứng dụng Node.js.
dotenv.config();
const os = require("os"); // ➡ Thư viện để lấy thông tin về hệ thống, CPU, bộ nhớ.
const db = require("./models"); // ➡ Kết nối đến database thông qua Sequelize ORM.

const app = express();
app.use(express.json()); // middleware
express.urlencoded({ extended: true }); // middleware
app.use(function (req, res, next) {
  // ↳ Đây là một middleware áp dụng cho tất cả các request.
  res.header("Access-Control-Allow-Origin", "*"); // ➡ Cho phép mọi domain (dấu *) truy cập API – không giới hạn nguồn gốc.
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // ➡ Chỉ định các HTTP method được phép khi truy cập từ domain khác.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // ➡ Cho phép client gửi các loại header cụ thể khi gọi API.

  next(); // ➡ Chuyển tiếp request sang middleware tiếp theo.
});

const AppRoute = require("./AppRoute.js");

app.get("/", (req, res) => {
  res.send("This is Online Shop App using NodeJS and ExpressJS");
});

app.get("/api/healthcheck", async (req, res) => {
  // ↳ Định nghĩa route GET /healthcheck.
  try {
    await db.sequelize.authenticate(); // ➡ Kiểm tra kết nối đến database.
    const cpuLoad = os.loadavg(); // ➡ Lấy thông tin tải CPU trung bình trong 1, 5 và 15 phút.
    const cpus = os.cpus(); // ➡ Lấy thông tin về các CPU trên hệ thống.
    const cpuPercentage = (cpuLoad[0] / cpus.length) * 100; // ➡ Tính toán tỷ lệ phần trăm tải CPU trung bình trong 1 phút.

    const memoryUsage = process.memoryUsage(); // ➡ Lấy thông tin sử dụng bộ nhớ của process hiện tại, của Node.js hiện tại.
    const mamoryUsageInMB = {
      // ↳ Chuyển đổi thông tin sử dụng bộ nhớ sang MB.
      rss: (memoryUsage.rss / 1024 / 1024).toFixed(2) + "MB", // ➡ Kích thước bộ nhớ đang sử dụng (resident set size).
      heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + "MB", // ➡ Kích thước bộ nhớ heap đã cấp phát cho process.
      heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + "MB", // ➡ Kích thước bộ nhớ heap đang sử dụng.
      external: (memoryUsage.external / 1024 / 1024).toFixed(2) + "MB", // ➡ Kích thước bộ nhớ được sử dụng bởi các đối tượng bên ngoài (external).
    };

    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      status: "OK",
      database: "Connected", // ➡ Trả về thông tin kết nối đến database.
      cpuLoad: {
        // ↳ Trả về thông tin tải CPU trung bình trong 1, 5 và 15 phút.
        "1 Minute Average Load:": cpuLoad[0].toFixed(2), // ➡ Tải CPU trung bình trong 1 phút.
        "5 Minute Average Load:": cpuLoad[1].toFixed(2), // ➡ Tải CPU trung bình trong 5 phút.
        "15 Minute Average Load:": cpuLoad[2].toFixed(2), // ➡ Tải CPU trung bình trong 15 phút.
        "CPU Usage Percentage:": cpuPercentage.toFixed(2) + "%", // ➡ Tỷ lệ phần trăm tải CPU trung bình trong 1 phút.
      },
      memoryUsage: mamoryUsageInMB, // ➡ Trả về thông tin sử dụng bộ nhớ của process hiện tại.
    });
  } catch (error) {
    return res.status(500).json({
      // ↳ Trả về status 500 Internal Server Error.
      status: "500",
      message: "Healthcheck failed",
      message: error.message, // ➡ Trả về thông báo lỗi nếu có.
    });
  }
});

// Cách 1
const port = process?.env?.PORT ?? 3000;
AppRoute(app);
app.listen(port, () => {
  console.log("This server is running on port " + port);
});

// Cách 2
// app.listen(process.env.PORT, () => {
//   console.log("This server is running on port " + process.env.PORT);
// });
