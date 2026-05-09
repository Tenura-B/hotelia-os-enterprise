require('dotenv').config();
const seedService = require('./services/SeedService');

(async () => {
  try {
    await seedService.run();
    process.exit(0);
  } catch (error) {
    console.error('Fatal Error during seeding:', error);
    process.exit(1);
  }
})();
