const fs = require('fs');
try {
    const content = fs.readFileSync('query_engine.dll.node.gz', 'utf8');
    console.log('File Content Start:', content.slice(0, 200));
} catch (e) { console.log('File not found'); }
