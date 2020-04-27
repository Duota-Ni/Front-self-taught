var eventEmitter = require("events");
var myEmitter = new eventEmitter();
myEmitter.on('begin',function(){
    console.log('begin');
})
myEmitter.emit('begin');
console.log(myEmitter.eventNames());
//myEmitter.emit('error',new Error('ceash!'));