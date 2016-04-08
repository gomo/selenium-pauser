var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = {
  pause: function (value) {
    var p = new Promise(function(resolve){
      var now = new Date();
      readline.question("["+now+"] Hit return key to continue:", function(){
        readline.close()
        resolve()
      })
    })

    return p.then(function(){ return value });
  }
};