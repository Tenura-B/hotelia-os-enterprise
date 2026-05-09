const BaseRepository = require('./BaseRepository');

class CompanyRepository extends BaseRepository {
  constructor() {
    super('companies', false);
  }
}

module.exports = new CompanyRepository();
