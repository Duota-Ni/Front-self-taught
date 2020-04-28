
var fs =require('fs');
//nfcall函数，将任何格式的Node格式的方法转化成接收一个回调的promise
function nfcall(f,...args){
    return new Promise(function(resolve,reject){
        f.call(null,...args,function(err,...args){
            if(err) return reject(err);
            resolve(args.length<2?args[0]:args);
        });
    });
}
//promose超时
function ptimeout(delay){
    return new Promise(function(resolve,reject0){
        setTimeout(resolve,delay);
    });
}
//生成器运行器
//grun(generator run)管理对话，知道如何处理异步调用
function grun(g){
    const it = g();
    (function iterate(val){
        const x =it.next(val);
        if(!x.done){
            if(x.value instanceof Promise){
                x.value.then(iterate).catch(err=>it.throw(err));
            }else{
                setTimeout(iterate,0,x.value);
            }
        }
    })();
}


//迭代
function* theFutureIsNow(){
    const dataA = yield nfcall(fs.readFile,'a.txt');
    const dataB = yield nfcall(fs.readFile,'b.txt');
    const dataC = yield nfcall(fs.readFile,'c.txt');
    yield ptimeout(60*1000);
    yield nfcall(fs.writeFile,'d.txt',dataA+dataB+dataC);
}

let test = grun(theFutureIsNow);
console.log(test);
