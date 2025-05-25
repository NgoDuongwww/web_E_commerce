/**
 * Trả về URL đầy đủ tới tệp hình ảnh.
 * Nếu tên hình ảnh không chứa "http", nó sẽ xây dựng URL
 * bằng cách sử dụng tên máy chủ và số cổng của máy chủ.
 * @param {string} imageName - Tên của tệp hình ảnh.
 * @returns {string} URL đầy đủ tới tệp hình ảnh.
 */

const os = require("os"); // ➡ (Operating System) Thư viện để lấy thông tin về hệ thống, CPU, bộ nhớ.
module.exports = (imageName) => {
  if (!imageName) {
    return "";
  }

  if (!imageName.includes("http")) {
    const API_PREFIX = `http://${os.hostname()}:${
      process.env.PORT || 3000
    }/api`;
    return `${API_PREFIX}/images/${imageName}`;
  }

  return imageName;
};
