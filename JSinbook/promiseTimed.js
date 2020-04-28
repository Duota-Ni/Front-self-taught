const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    };
    go() {
        const countdown = this;
        const timeoutIds = [];
        return new Promise(function (resolve, reject) {
            for (let i = countdown.seconds; i >= 0; i--) {
                //设置大于13就不能倒计时，当发现大于13清除未处理的超时
                timeoutIds.push(
                    setTimeout(function () {
                        if (countdown.superstitious && i === 13) {
                            //清除所有pending的timeouts
                            timeoutIds.forEach(clearTimeout);
                            return reject(new Error("definitely not counting that"));
                        }
                        countdown.emit('tick', i);
                        if (i === 0) resolve();
                    }, (countdown.seconds - i) * 1000));
            }
        })
    }
}

function launch() {
    return new Promise(function (resolve, reject) {
        //if(Math.random()<0.5) return;//rocket failure
        console.log('Lift off!');
        setTimeout(function () {
            resolve('In orbit');
        }, 2 * 1000);
    })
}


//添加超时处理
function addTimeout(fn, timeout) {
    if (timeout === undefined) timeout = 1000;//默认超时
    return function (...args) {
        return new Promise(function (resolve, reject) {
            const tid = setTimeout(reject, timeout,
                new Error('promise timed out'));
            fn(...args)
                .then(function (...args) {
                    clearTimeout(tid);
                    resolve(...args);
                })
                .catch(function (...args) {
                    clearTimeout(tid);
                    reject(...args);
                });
        });
    }
}
//const c = new Countdown(5)
const c = new Countdown(15, true)
    .on('tick', i => console.log(i + '...'));
c.go()
    .then(addTimeout(launch, 4 * 1000))
    .then(function (msg) {
        console.log(msg);
    })
    .catch(function (err) {
        console.error('houston,we have a problem:' + err.message);
    })