const fs = require('fs');
const zlib = require('zlib');
const path = 'query_engine.dll.node.gz';
if (fs.existsSync(path)) {
    const input = fs.readFileSync(path);
    const output = zlib.gunzipSync(input);
    fs.writeFileSync('node_modules\\.prisma\\client\\query_engine-windows.dll.node', output);
    console.log('Extracted to node_modules\\.prisma\\client\\query_engine-windows.dll.node');
} else {
    console.log('File not found:', path);
}
