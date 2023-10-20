const http=require('http')
const port=3000;
const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write("helo welcome to port 3000");
    res.end();
})
server.listen(port,(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("server started on port");
    }
})