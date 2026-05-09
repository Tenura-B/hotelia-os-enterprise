const BaseRepository = require('./BaseRepository');

class RestaurantRepository extends BaseRepository {
  constructor() {
    super('restaurants', false);
  }
}

module.exports = new RestaurantRepository();
