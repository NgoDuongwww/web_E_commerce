module.exports = async (connection, userCode) => {
  const [rows] = await connection.execute(
    'SELECT 1 FROM users WHERE user_code = ?',
    [userCode]
  )
  return rows.length > 0
}
