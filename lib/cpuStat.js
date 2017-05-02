const execFile = require('child_process').execFile;
var shell = require('shelljs');

module.exports = {
  getCPUUsage: function (callback) {
    const child = shell.exec('top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk \'{print 100 - $1}\'', (data)=>{
      // console.log(data);
      callback(null, data);
    });
    // child.stdout.on('data', (data)=>{
    //   console.log(data);
    // })
    // execFile(`sh`, [`./scripts/cpu.sh`], (error, stdout, stderr) => {
    //   if (!!error) {
    //     console.error(`exec error: ${JSON.stringify(error)}`);
    //     callback(true, 0);
    //     return;
    //   }
    //   // console.log(`stdout: ${stdout}`);
    //   callback(null, stdout);
    // });
  }
}