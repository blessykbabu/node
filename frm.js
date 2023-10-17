const http = require("http")
const url = require("url");

const port =3000;
const server = http.createServer((req,res)=>{
    let path = url.parse(req.url).pathname;
    // console.log(url.parse(req.url))
    
    if(path === "/"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(`
        <form style="text-align:center;" action="/api">
        <input type="text" placeholder="enter your name" name="name"><br>
        <input type="submit" name="submit">
        </form>`);
   
    res.end();
    }
    if(path === "/api"){
    console.log(url.parse(req.url,true).query)
        
        res.write("This is api");
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