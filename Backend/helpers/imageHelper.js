const os = require('os') // ➡ (Operating System) Thư viện để lấy thông tin về hệ thống, CPU, bộ nhớ.

/**
 * Lấy URL đầy đủ của hình ảnh dựa trên tên ảnh.
 *
 * Nếu `imageName` đã là URL (chứa "http") thì trả về nguyên bản,
 * nếu không thì trả về URL đầy đủ với tiền tố API server dựa trên hostname và cổng hiện tại.
 * Nếu không truyền `imageName` hoặc rỗng thì trả về chuỗi rỗng.
 *
 * @param {string} imageName - Tên file ảnh hoặc URL ảnh.
 * @returns {string} URL đầy đủ của ảnh hoặc chuỗi rỗng nếu không có tên ảnh.
 */
module.exports = (imageName) => {
  if (!imageName) {
    return ''
  }

  if (!imageName.includes('http')) {
    const API_PREFIX = `http://${os.hostname()}:${process.env.PORT || 3000}/api`
    return `${API_PREFIX}/images/${imageName}`
  }

  return imageName
}
