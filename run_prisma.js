const { exec } = require('child_process');

console.log('Starting Prisma generation...');

exec('npx prisma generate', {
    env: { ...process.env, DATABASE_URL: "file:./dev.db" }
}, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
