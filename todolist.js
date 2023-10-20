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
    if(path === "/set-todo"){
    let query=url.parse(req.url,true).query;
    fs.readFile("./datatodo.json","utf-8",(error,data)=>{
        let list=data ==="" ? [] : JSON.parse(data);
        list.push(query);
        fs.writeFile("./datatodo.json",JSON.stringify(list),(error)=>{
            if(error){
                res.write("error occured");
            }
        res.end();
        })
    })
   
    }
    if(path ==="/get-todo"){
        fs.readFile("./datatodo.json","utf-8",(error,data)=>{
            console.log(data)
            res.writeHead(200,{"content-Type":"text/json"});
            res.write(JSON.stringify(data));
            res.end();
        })
    }
    if(path ==="/del-todo"){
        let query=url.parse(req.url,true).query;
        fs.readFile("./datatodo.json","utf-8",(error,data)=>{
            let dataObj=JSON.parse(data)
            fs.writeFile("./datatodo.json",JSON.stringify(dataObj.filter(element => element.todolist !=query.todo)),
            error =>{
                res.write("deleted")
                if(error){
                    res.write("error occured")
                }
                res.end();
            })
        })
    }

if(path==="/edit-todo"){
    let query=url.parse(req.url,true).query;
    console.log(query);
    fs.readFile("./datatodo.json","utf-8",(error,data)=>{
        let newList=JSON.parse(data).map(item =>{
            if(item.todolist === query.oldTodo){
                return {todolist:query.newTodo};

            }
            return item;
        });
        fs.writeFile("./datatodo.json",JSON.stringify(newList),error =>{
            res.write("success");
            if(error){
                res.write("error occured")
            }
            res.end();
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