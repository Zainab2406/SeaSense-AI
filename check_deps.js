try {
    console.log('dotenv:', require.resolve('dotenv/config'));
} catch (e) { console.log('dotenv not found'); }

const fs = require('fs');
const prismaPath = 'node_modules/prisma/build/index.js';
if (fs.existsSync(prismaPath)) {
    console.log('Prisma CLI exists');
} else {
    console.log('Prisma CLI missing in', prismaPath);
}
