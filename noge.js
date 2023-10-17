console.log("helo welcome")
const http=require("http");
const port=3000;
const server=http.createServer((req,res)=>{
    res.writeHead(200,{'content-Type':'text/html'});       //to define res header
    const application=`<form style="text-align:center;" action="http://localhost:3000/data"><input type="text" placeholder="enter your name" name="name" style="background-color:pink;margin:10px;"><br><input type="text" placeholder="enter your address" style="background-color:pink;" name="address"><br><input type="button" value="submit" style="color:white;background-color:green;width:100px;height:40px;margin:20px;" name="submit"></form>`

// res.write("<h1>welcome</h1>")
res.write(application);
console.log(req.headers.referer);
let url=String(req.headers.referer);
let path=url.split("3000/")?.[1];
console.log(path)
res.end();
})
server.listen(port,(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("server start on port")
    }
})