// Access-Control-Allow-Origin: *
const express = require("express");
var cors = require("cors");
const path = require("path/posix");
const app = express();
const multipleCORSDomain = require('multiple-cors-domain');
// const corsOptions ={
//     origin:'*', 
//     credentials:true,            
//     optionSuccessStatus:200,
//  }
// app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://dream-team-andrzej.herokuapp.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(multipleCORSDomain({ any: true }));
app.use(express.json());
const regystryUsers = [];
const loginUserDatabase = [];

//przekazywania danych na stronę sewera
app.get("/", (req, res) => {
  res.send(req.body);
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
