/**
 * Created by 仲夏 on 2016/11/21.
 */

// import 'whatwg-fetch'

console.info(`>>>Entering fetch-index.js...`)

// GET 请求 HTML 类型文本
fetch('./data/users.html')
    .then( res => res.text() )
    .then( htmlText => {
        document.getElementById('fetch_html').innerHTML = htmlText
    })


/**
 *
 */
const content = 'Hello World!';
const headers = new Headers({
    "Content-Type": "text/plain",
    "Content-Length": content.length.toString(),
    "X-Custom-Header": "ProcessThisImmediately"
});
//    headers.append('Access-Control-Allow-Origin', true);
headers.append('Accept', 'application/json');
// Headers 的内容可被检索
console.log('has Content-Type: ', headers.has('Content-Type'));
console.log('Content-Type is: ', headers.get('Content-Type'));

//    const url = "http://www.html5online.com.cn/articles/students.json";   // 可能面临同源策略问题
// const url = "./data/students11.json";   // response.ok:  false, and 404 code;
const url = "./data/students.json";
// alert('I am coming....')
const request = new Request(url, {
    method:　'POST',
    headers: headers,
    mode: 'no-cors',
    credentials: 'include'
});

fetch(request).then(
    function(response) {
        console.log(response.headers.get('Content-Type'));
        console.log(response.headers.get('Date'));
        console.log(response.status);   // 200 means OK
        console.log(response.statusText); // 'OK' means resolved
        console.log(response.type);
        console.log('response.ok: ', response.ok); // 这是 status 值为 200~299 时的语法糖
        console.log(response.url);

        window.fetchRes = response;

        // 服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
        if(response.status !== 200){
            console.log("存在一个问题，状态码为："+response.status);
            return;
        }


        //检查响应文本，Note：response.json()也是一个promise对象
        // So, a more graceful code is return this promise Object, and 调用then() out this function. Let's do it!!
        /* response.json().then(function(data){
         console.log('data', data);
         console.log('response in: ',response);
         });*/
        console.log('response in: ',response);
        return response.json();
    }
).then( // 此处调用的promise对象源于 response.json();
    function (data) {
        console.log('Out data', data);
        console.log('read response from window: ', window.fetchRes.json() )  // TypeError: Already read
    }
).catch(function(err) {
    console.log("Fetch错误: "+err);
});

console.log('Out of fetch...');


/**
 * Request 和 Response 的 body 只能被读取一次！它们有一个属性叫 bodyUsed，读取一次之后设置为 true，之后就不能再被读取了。
 */
const response_stream = new Response('one time use test');
console.log('1.is bodyUsed: ', response_stream.bodyUsed);
response_stream.text().then(function (data) {
    console.log('data info: ', data);
    console.log('2.is bodyUsed: ', response_stream.bodyUsed);
}).catch(e => console.log('Tried to read already consumed Response!!'));
console.log('3.is bodyUsed: ', response_stream.bodyUsed);
//    resquest_stream.text().catch(e => console.log('Tried to read already consumed Response!!'));
