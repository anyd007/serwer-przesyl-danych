const express = require("express")
var cors = require('cors')
const path = require("path/posix")
// const server = {
//     port:5000
// }
const app = express()

const regystryUsers = []
const loginUserDatabase = []

app.use(cors());
app.use(express.json())

var corsOptions = {
    origin: 'https://dream-team-andrzej.herokuapp.com',
    optionsSuccessStatus: 200 
  }
//przekazywania danych na stronę sewera
app.get("/",(req,res) =>{
    res.send(req.body)
})

// pobieranie danych z rejestracji i zapisywanie ich do tablicy regystryUsers
app.post("/regestry", cors(corsOptions),(req,res)=>{
    regystryUsers.push(req.body)
    res.status(200).end
})
// pobieranie danych z inputów dream teamu i dodawanie ich do pustej tablict "loginUserDatabase"
app.post("/loginUserDatabase", cors(corsOptions),(req,res)=>{
    loginUserDatabase.push(req.body)
    res.status(200).end
})
// wysłanie danych z rejestracji zapisanych na serwerze z powrotem juz na strone logowania do sprawdzenia poprawnosci logowania usera
app.get("/regestry", cors(corsOptions), (req,res)=>{
    res.json({regystryUsers})
})
   //wysłanie danych do bazy danych zalogowanego uzytkownika
   app.get("/loginUserDatabase", cors(corsOptions), (req,res)=>{
    res.json({loginUserDatabase})
})

//tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"  
const herokuPort = process.env.PORT || 5000
//nasłuchiwanie app na jakim porcie na działać
app.listen(herokuPort, ()=>{ 
    console.log(`Działam na porcie ${herokuPort}`);
})