const http = require("http")
const url = require("url");
const fs=require("fs")

const port =3000;
const server = http.createServer((req,res)=>{
    let path = url.parse(req.url).pathname;
    // console.log(url.parse(req.url))
    
    if(path === "/"){
        fs.readFile("./todolist.html","utf-8",(error,data)=>{
            console.log(data)
            res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data)
        res.end();

        })
    }
    if(path === "/api"){
    let query=url.parse(req.url,true).query;
    fs.readFile("./datatodo.json","utf-8",(error,data)=>{
        let list=data ==="" ? [] : JSON.parse(data);
        list.push(query);
        fs.writeFile("./datatodo.json",JSON.stringify(list),(error)=>{
            if(error){
                res.write("error occured");
            }
        
        })
    })
   
    }


    
});
server.listen(port,(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("server start on port")
    }
});