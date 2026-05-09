const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor() {
    super('users', true); // Users are in the master DB
  }

  async findByUserId(userId) {
    return await this.findById(userId);
  }
}

module.exports = new UserRepository();
