const { spawn } = require('child_process');
const child = spawn('npx', ['convex', 'dev', '--once'], { shell: true });

child.stdout.on('data', (data) => {
    process.stdout.write(data.toString());
});

child.stderr.on('data', (data) => {
    process.stderr.write(data.toString());
});

child.on('close', (code) => {
    console.log(`Exited with code ${code}`);
});
