class Super{
    constructor(){
        this.name='Super';
        this.isSuper=true;
        this.test1 ='this1';
    }
    
}

Super.prototype.sneaky = 'not recommend!';

class Sub extends Super{
    constructor(){
        super();
        this.name = 'Sub';
        this.isSuB = true;
        this.test2 ='test2';
    }
}

const obj =new Sub();

for(let p in obj){
    console.log(`${p}:${obj[p]}`+
    (obj.hasOwnProperty(p)?'':'(inherited)')
    );
}