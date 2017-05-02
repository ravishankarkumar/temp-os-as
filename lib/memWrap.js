let fs = require('fs');

module.exports = {
    memInfo: function(){
        var info = {};
        var data = fs.readFileSync('/proc/meminfo').toString();
        data.split(/\n/g).forEach(function(line){
            line = line.split(':');

            // Ignore invalid lines, if any
            if (line.length < 2) {
                return;
            }

            // Remove parseInt call to make all values strings
            info[line[0]] = parseInt(line[1].trim(), 10);
        });

        return info;
    }
}