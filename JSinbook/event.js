const EventEmitter = require('event').EventEmitter;
       class Countdown extends EventEmitter{
           constructor(seconds,superstitious){
               super();
               this.seconds = seconds;
               this.superstitious = !!superstitious;
           }
           go(){
               const countdown = this;
               return new Promise(function (resolve,reject) {
                   for(let i=countdown.seconds;i>=0;i--){
                       setTimeout(function() {
                           if(countdown.superstitious&&i==13)
                           return reject(new Error("definitely not counting that"));
                           countdown.emit('tick',i);
                           if(i===0) resolve();
                       }, (countdown.seconds-i)*1000);
                   }
               })
           }
       }