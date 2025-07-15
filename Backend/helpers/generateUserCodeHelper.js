const crypto = require('crypto')
const UserRole = require('../constants')

/**
 * Tạo mã định danh người dùng (`user_code`) theo định dạng chuẩn:
 *
 * Format: `[ROLE]-[YYMMDD]-[RANDOM]`
 *
 * Cấu trúc:
 * - `[ROLE]`   : 3 ký tự viết hoa đại diện cho vai trò người dùng (ví dụ: 'ADM' cho admin, 'USR' cho user)
 * - `[YYMMDD]` : Ngày tạo mã theo định dạng năm/tháng/ngày (2 chữ số mỗi phần)
 * - `[RANDOM]` : 5 ký tự ngẫu nhiên gồm chữ cái và số, sinh từ `crypto.randomBytes`
 *
 * @function
 * @param {string} role - Vai trò người dùng. Sẽ được viết hoa và lấy 3 ký tự đầu. (VD: 'admin' → 'ADM', 'user' → 'USR')
 * @param {Date} [date=new Date()] - Ngày tạo mã. Nếu không truyền vào sẽ mặc định là ngày hiện tại.
 * @returns {string} Mã `user_code` theo định dạng `[ROLE]-[YYMMDD]-[RANDOM]`
 */

module.exports = (role, date = new Date()) => {
  const rolePart = (UserRole.USER || UserRole.ADMIN).slice(0, 3)

  const year = String(date.getFullYear()).slice(2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const datePart = `${year}${month}${day}`

  const randomPart = crypto
    .randomBytes(4)
    .toString('base64')
    .replace(/[^A-Z0-9]/gi, '')
    .slice(0, 5)

  return `${rolePart}-${datePart}-${randomPart}`
}
