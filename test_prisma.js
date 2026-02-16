try {
    const resolved = require.resolve('.prisma/client/default');
    console.log('Resolved:', resolved);
    const m = require('.prisma/client/default');
    console.log('Loaded:', Object.keys(m));
} catch (e) {
    console.error(e);
}
