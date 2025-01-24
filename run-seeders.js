const { exec } = require('child_process');

const seeders = [
  'add-admin-profile.js',
  'add-admin-user.js',
  'add-admin-category.js',
  'add-admin-product.js',
];

async function runSeeder(seeder) {
  return new Promise((resolve, reject) => {
    exec(`npx sequelize-cli db:seed --seed ${seeder}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing ${seeder}: ${error.message}`);
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
      }
      console.log(stdout);
      resolve();
    });
  });
}

async function runSeeders() {
  for (const seeder of seeders) {
    try {
      await runSeeder(seeder);
      console.log(`${seeder} executed successfully.`);
    } catch (error) {
      console.error(error);
      break;
    }
  }
}

runSeeders();
