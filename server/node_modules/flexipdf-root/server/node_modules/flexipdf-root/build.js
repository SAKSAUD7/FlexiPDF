const { execSync } = require('child_process');
const path = require('path');

// Build client
console.log('Building client...');
execSync('cd client && npm run build', { stdio: 'inherit' });

// Copy client build to server
console.log('Copying client build to server...');
execSync('xcopy /E /I /Y client\\dist server\\public', { stdio: 'inherit' });

console.log('Build complete! Ready for deployment.'); 