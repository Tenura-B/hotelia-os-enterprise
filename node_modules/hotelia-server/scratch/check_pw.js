const bcrypt = require('bcryptjs');
const hash = '$2a$10$h/1gAfAFO3XHiXvuEXZ1.OArKAk.zqvlA7VSIBAzdIjIFnzt2xxZe';
const passwords = ['password', '123456', 'admin', 'admin123', 'user-1'];

passwords.forEach(pw => {
  if (bcrypt.compareSync(pw, hash)) {
    console.log(`MATCH FOUND: ${pw}`);
  }
});
