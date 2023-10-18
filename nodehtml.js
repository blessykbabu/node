const http = require("http")
const url = require("url");
const fs=require("fs")

const port =3000;
const server = http.createServer((req,res)=>{
    let path = url.parse(req.url).pathname;
    // console.log(url.parse(req.url))
    
    if(path === "/"){
        fs.readFile("./nodehtml.html","utf-8",(error,data)=>{
            console.log(data)
            res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data)
        res.end();

        })
    }
    if(path === "/api"){
    let query=url.parse(req.url,true).query;
    fs.readFile("./data.json","utf-8",(error,data)=>{
        let list=data ==="" ? [] : JSON.parse(data);
        list.push(query);
        fs.writeFile("./data.json",JSON.stringify(list),(error)=>{
            if(error){
                res.write("error occured");
            }
        })
    })
    // fs.appendFile("./data.txt",JSON.stringify(query),error =>{
    //   //here we ise write the data is overwrite so use appendfile
    //     if(error){
    //         res.write("error occured")
    //         return;
    //     }
    // })
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