/**
 * Kiểm tra xem `user_code` đã tồn tại trong bảng `users` hay chưa.
 *
 * @param {import('mysql2/promise').Connection} connection - Kết nối MySQL (từ mysql2/promise).
 * @param {string} userCode - Mã user_code cần kiểm tra (VD: "ADM-250628-X9ZK3T").
 * @returns {Promise<boolean>} Trả về `true` nếu đã tồn tại, `false` nếu chưa có.
 */
module.exports = async (connection, userCode) => {
  const [rows] = await connection.execute(
    'SELECT 1 FROM users WHERE user_code = ?',
    [userCode]
  )
  return rows.length > 0
}
