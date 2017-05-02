const exec = require('child_process').exec;
const execFile = require('child_process').execFile;
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
//

let memInfo = require('./lib/memWrap').memInfo;
// let getCPUUsage = require('./lib/cpuStat').getCPUUsage;
let cpuData = 0;
let memoryData = 0;

let userOnline = 0;
let sendProcessInitiated = false;

io.on('connection', function (socket) {
  userOnline += 1;
  if (!sendProcessInitiated) {
    sendProcessInitiated = true;
    setInterval(() => {
      io.emit('serverData', {
        name: new Date(),
        memoryData: Number(memoryData),
        cpuData: Number(cpuData)
      });
    }, 3000);
  }
  socket.on('disconnect', function(){
    userOnline--;
  });
});

setInterval(() => {
  let memoryInformation = memInfo();
  let memoryDataSet = (memoryInformation.MemTotal - memoryInformation.MemFree) / (1024 * 1024);
  memoryData = (Math.random() + 1) * memoryDataSet;
}, 3000);

setInterval(() => {
  execFile(`sh`, [`./scripts/cpu.sh`], (error, stdout, stderr) => {
    // console.log(stdout);
    cpuData = (Math.random() + 1) * stdout;
  });
}, 3000);


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

http.listen(3001, function () {
  console.log('listening on *:3001');
});