const http = require("http")
const url = require("url");

const port =3000;
const server = http.createServer((req,res)=>{
    let path = url.parse(req.url).pathname;
    // console.log(url.parse(req.url))
    
    if(path === "/"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(`
        <body>
        <form style="text-align:center;" action="/api">
        <input type="text" placeholder="enter your name" name="name" ><br>
        <input type="text" placeholder="enter your email" name="email"><br>
        <input type="submit" name="submit">
        </form>
        <script></script>
        <body>`);
   
    res.end();
    }
    if(path === "/api"){
    let query=url.parse(req.url,true).query;
        res.write(`Username is ${/^[a-z0-9]{4,}$/.test(query.name) ? "valid":"invalid"}
        email id is ${/^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,6}$/.test(query.email) ? "valid":"invalid"}`);
        res.end();
    }
});
server.listen(port,(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("server start on port")
    }
});