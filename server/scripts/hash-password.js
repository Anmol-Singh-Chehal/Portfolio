// Run this whenever you want to change the admin password:
//   node scripts/hash-password.js "your-new-password"
// Paste the printed SALT and HASH into server/.env as
// ADMIN_PASSWORD_SALT and ADMIN_PASSWORD_HASH, then restart the server.

import crypto from 'crypto'

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/hash-password.js "your-new-password"')
  process.exit(1)
}

const salt = crypto.randomBytes(16).toString('hex')
const hash = crypto.scryptSync(password, salt, 64).toString('hex')

console.log('ADMIN_PASSWORD_SALT=' + salt)
console.log('ADMIN_PASSWORD_HASH=' + hash)
