const bcrypt = require('bcryptjs');
const dbManager = require('../src/core/DatabaseManager');

async function resetPassword() {
  const newPassword = 'password';
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  console.log(`Setting password for user-1 to: ${newPassword}`);
  console.log(`New Hash: ${hash}`);

  try {
    await dbManager.queryMaster(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [hash, 'user-1']
    );
    console.log('✅ Password reset successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to reset password:', err);
    process.exit(1);
  }
}

resetPassword();
