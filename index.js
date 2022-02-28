// Access-Control-Allow-Origin: *
const express = require("express");
var cors = require("cors");
const path = require("path/posix");
const app = express();
var expressWs = require('express-ws')(app);
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions));
app.use(express.json());
const regystryUsers = [];
const loginUserDatabase = [];

//przekazywania danych na stronę sewera
app.get("/", (req, res) => {
  res.send(req.body);
});
app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
  });

// pobieranie danych z rejestracji i zapisywanie ich do tablicy regystryUsers
app.post("/regestry",(req, res) => {
  regystryUsers.push(req.body);
  res.status(200).end;
});
// pobieranie danych z inputów dream teamu i dodawanie ich do pustej tablict "loginUserDatabase"
app.post("/loginUserDatabase", (req, res) => {
  loginUserDatabase.push(req.body);
  res.status(200).end;
});
// wysłanie danych z rejestracji zapisanych na serwerze z powrotem juz na strone logowania do sprawdzenia poprawnosci logowania usera
app.get("/regestry",(req, res) => {
  res.json({ regystryUsers });
});
//wysłanie danych do bazy danych zalogowanego uzytkownika
app.get("/loginUserDatabase", (req, res) => {
  res.json({ loginUserDatabase });
});

//tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"
const herokuPort = process.env.PORT || 5000;
//nasłuchiwanie app na jakim porcie na działać
app.listen(herokuPort, () => {
  console.log(`Działam na porcie ${herokuPort}`);
});
