const http = require("http")
const url = require("url");
const fs=require("fs");
const { error } = require("console");

const port =3000;
const server = http.createServer((req,res)=>{
    let path = url.parse(req.url).pathname;
    // console.log(url.parse(req.url))
    
    if(path === "/"){
        fs.readFile("./person.html","utf-8",(error,data)=>{
            console.log(data)
            res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data)
        res.end();

        })
    }
    if(path === "/api"){
    let query=url.parse(req.url,true).query;
   console.log(query)
        fs.writeFile("./details/"+query.username+".json",JSON.stringify(query),(error)=>{
            if(error){
                res.write("error occured");
            }
        })
    

        res.write(`Username is ${/^[a-z0-9]{4,}$/.test(query.name) ? "valid":"invalid"}
        email id is ${/^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,6}$/.test(query.email) ? "valid":"invalid"}`);
        res.end();
    }
    if(path ==="/get-details"){
        fs.readFile("./details","utf-8",(error,data)=>{
            console.log(data)
            res.writeHead(200,{"content-Type":"text/json"});
            res.write(JSON.stringify(data));
            res.end();
        })
    }
    fs.readdir("./details",(error,data)=>{
        console.log(data)
        let filesP=data.map(item => readFile(`./details/${item}`,"utf-8"))
        Promise.all(filesP)
        .then(files =>{
           
            res.write(JSON.stringify(files));
            res.end();
        })
    })


    function readFile(fileName,encoding){
        return new Promise((res,rej)=>{
            fs.readFile(fileName,encoding,(error,file) =>{
                if(error) return rej(error);
                res(file);
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