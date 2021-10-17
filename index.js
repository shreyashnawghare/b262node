import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"

const app = express();
dotenv.config();
const PORT = 5000;

//we have to tell express what type of data we are get or post 
// we have middlewares like a gatekeeper
// all the request body will convert to json ex. express.json() in-built middleware
app.use(express.json());
console.log(process.env);
async function createConnection() {
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

 await client.connect();
console.log("successfully connected");
return client;

}
createConnection();


app.get("/", (request, response) => {
 response.send("Hello, All");
});

//app.get("/users/:id", (request, response) => {
   // console.log(request.params);
   // const { id } = request.params;
   // response.send(users.filter((user) => user.id === id));
//});

//app.get("/users", (request, response) => { 
   // const { color, age} = request.query;
    //console.log(request.query, color, age)
    
   // if(!color && !age){
   //   response.send(users);
// } else if (color && !age) {
  //      response.send(users.filter((user) => user.color === color ));
   // } else if (!color && age) {
     //response.send(users.filter((user) => user.age > age ));
    //} else {
    //    response.send(users.filter((user) => user.color === color && user.age > age ));
    //}
    //});

app.get("/users/:id", async (request, response) => {
console.log(request.params);
//const id = request.params.id;
const { id } = request.params;
const client = await createConnection();
const user = await client.db("users").collection("people").findOne({id:id}) ;
console.log(user);
response.send(user);
});



app.get("/users", async (request, response) => { 
    //const { color, age} = request.query;
    const client =await createConnection();
    const users = await client.db("users").collection("people").find({}).toArray();
    
   console.log(users);
   response.send(users);
   
});

//create user
app.post("/users", async (request, response) => { 
    //const { color, age} = request.query;
    const client = await createConnection();
 const addUsers = request.body;
    const result = await client.db("users").collection("people").insertMany(addUsers);
    
   console.log(addUsers , result);
  response.send(result);
   
});

//delete user
app.delete("/users/:id", async (request, response) => {
    console.log(request.params);
    //const id = request.params.id;
    const { id } = request.params;
    const client = await createConnection();
    const user = await client.db("users").collection("people").deleteOne({id : id}) ;
    console.log(user);
    response.send(user);
    });

    //patch to update
    //require id , new data ,
    app.patch("/users/:id", async (request, response) => {
        console.log(request.params);
        //const id = request.params.id;
        const { id } = request.params;
        const client = await createConnection();
        const newData = request.body;
        console.log(id , request.body);

        const user = await client.db("users").collection("people").updateOne({ id : id }, { $set: newData });
        console.log(user);
        response.send(user);
        });
    

app.listen(PORT, () => console.log("the server is started in ", PORT));