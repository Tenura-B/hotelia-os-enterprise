USE hotelia_master;

REPLACE INTO users (id, name, db_host, db_name, db_user, db_password, password_hash)
VALUES (
  'user-1',
  'Enterprise Demo User',
  'localhost',
  'user_1_db',
  'root',
  '',
  '$2a$10$h/1gAfAFO3XHiXvuEXZ1.OArKAk.zqvlA7VSIBAzdIjIFnzt2xxZe'
);
