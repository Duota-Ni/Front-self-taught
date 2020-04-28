
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

/*
//迭代
function* theFutureIsNow(){
    const dataA = yield nfcall(fs.readFile,'a.txt');
    const dataB = yield nfcall(fs.readFile,'b.txt');
    const dataC = yield nfcall(fs.readFile,'c.txt');
    yield ptimeout(6*1000);
    yield nfcall(fs.writeFile,'d.txt',dataA+dataB+dataC);
}
*/

/*
//Promise.all
function* theFutureIsNow(){
    const data = yield Promise.all([
        nfcall(fs.readFile,'a.txt'),
        nfcall(fs.readFile,'b.txt'),
        nfcall(fs.readFile,'c.txt'),
    ]);
    yield ptimeout(6*1000);
    yield nfcall(fs.writeFile,'d.txt',data[0]+data[1]+data[2]);
}
*/

//添加异常处理
function* theFutureIsNow(){
    let data ;
    try{
        data = yield Promise.all([
            nfcall(fs.readFile,'a.txt'),
            nfcall(fs.readFile,'b.txt'),
            nfcall(fs.readFile,'c.txt'),
        ]);
    }catch(err){
        console.error('Unable to read one or more input files:'+err.message);
        throw err;
    }
    
    yield ptimeout(6*1000);
    try {
        yield nfcall(fs.writeFile,'d.txt',data[0]+data[1]+data[2]);
    } catch (err) {
        console.error('Unable towrite output files:'+err.message);
        throw err;
    }
}
   

let test = grun(theFutureIsNow);
console.log(test);




