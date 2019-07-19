const color = require('colors');
class Console {
    constructor(){
        this.loading = null;
    }
    log(msg){ 
        if (typeof(msg) ==='string') return this.__print(`\u{0020}\u{2794} ${msg}`);
        else if (typeof(msg) === 'object'){
            for (let key in msg){
                if (typeof(this[key]) !== 'undefined') return this[key](msg[key]);
                else throw new Error('Invalid logging type: '+key);
            } 
        }
    }
    success(msg=''){ return this.__print(`${'\u{0020}\u{263a} Success '.bgGreen.white.bold} ${msg.green}`) }
    info(msg){ return this.__print(`${'\u{0020}i info:'.bgBlue.white.bold} ${msg.blue}`) }
    warning(msg){ return this.__print(`${'\u{0020}⚠ warning:'.bgYellow.white.bold} ${msg.yellow}`) }
    error(msg){ return this.__print(`${'\u{0020}\u{2794}'.red} ${msg.red}`) }
    help(msg){ return this.__print(`${'\u{0020}⚠ help:'.bgGreen.white.bold} ${msg.white}`) }
    todo(msg){ 
        return this.__print(`${'\u{0020}▶ TODOs found on:'.bgBlue.white.bold} ${this.__todofy(msg)}`);
    }
    done(msg=''){ return this.__print(`${'\u{0020}\u{2714} Done '.bgGreen.white.bold} ${msg.green}`) }
    fatal(msg){ return this.__print(msg.white.bgRed) }
    toCopy(msg){ return this.__print(`${'\u{0020}\u{2704} '.bgBlack.white.bold} ${('\u{0020}'+msg+'\u{0020}').cyan.bold}`) }
    __print(output){ 
        console.log(this.__linkify(output));
    }
    __linkify(output) {
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        output = output.replace(urlRegex, url => url.underline.blue);
        
        //add bold
        output = output.replace(/(\*\*\*)(.*)(\*\*\*)/ig, '$2'.bold.yellow);
        
        return output;
    }
    __todofy(output) {
        // finding urls
        var urlRegex =/(.*).(js|jsx|php|py|html|css|scss|md)/ig;
        output = output.replace(urlRegex, src => src.underline);
        //finding todos
        output = output.replace(/line\s*(\d)\s*([a-zA-z]*)\s*(.*)/ig, `─ ${'line $1'.bold.yellow}: ${'$2'.red} ${'$3'.cyan}`);
        output = output.replace(/\s*✖\s*(\d)\s*(.*)\s*(found)/ig, '');
        return output;
    }
    startLoading(){
      var P = ["\\", "|", "/", "-"];
      var x = 0;
      this.loading = setInterval(function() {
        process.stdout.write("\r" + P[x++]);
        x &= 3;
      }, 250);
    }
    stopLoading(){ 
        if (this.loading) clearInterval(this.loading);
    }
}
module.exports = new Console();