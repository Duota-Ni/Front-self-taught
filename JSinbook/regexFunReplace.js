const html ='<a class="foo" href="/foo" id="foo">Foo1</a>\n' + 
'<A href="/foo" Class="foo">Foo2</a>\n'+
'<a onclick="javascript:alert(\'foo!\')" href="/foo">Foo3</a>\n';

function sanitizeATage(aTag){
    const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
    const attributes = parts[1].split(/\s+/);
    return '<a ' + attributes
    .filter(attr => /^(?:class|id|href)[\s=]/i.test(attr))
    .join(' ')
    +'>'
    +parts[2]
    +'</a>';
};

html.replace(/<a.*?>(.*?)<\/a>/ig,function(m,g1,offset){
    console.log(`<a> tag found at ${offset}. contents:${g1}`);
});
/*
let test = html.replace(/<a.*?>(.*?)<\/a>/ig,function(m){
    return sanitizeATage(m);
});
console.log(test);
*/

let test1 = html.replace(/<a.*?>(.*?)<\/a>/ig,sanitizeATage);
console.log(test1);