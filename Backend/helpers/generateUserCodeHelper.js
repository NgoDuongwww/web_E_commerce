const crypto = require('crypto')
const UserRole = require('../constants')

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

  return `${rolePart}${datePart}${randomPart}`
}
