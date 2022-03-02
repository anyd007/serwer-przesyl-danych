app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://dream-team-andrzej.herokuapp.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
const express = require("express");
var cors = require("cors");
const path = require("path");
const app = express();

// app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });


app.use('/', express.static(__dirname +'/src'));
app.use('/public', express.static(__dirname +'/public'));


app.use(express.json());
const regestryUsers = [];
const loginUserDatabase = [];
//przekazywania danych na stronę sewera
app.get("/",(req, res) => {
  res.send(req.body);
});

// pobieranie danych z rejestracji i zapisywanie ich do tablicy regystryUsers
app.post("/api/regestry",(req, res) => {
  regestryUsers.push(req.body);
  res.status(200).end;
});
// pobieranie danych z inputów dream teamu i dodawanie ich do pustej tablict "loginUserDatabase"
app.post("/api/loginUserDatabase",(req, res) => {
  loginUserDatabase.push(req.body);
  res.status(200).end;
});
// wysłanie danych z rejestracji zapisanych na serwerze z powrotem juz na strone logowania do sprawdzenia poprawnosci logowania usera
app.get("/api/regestry", (req, res) => {
  res.json({ regestryUsers });
});
//wysłanie danych do bazy danych zalogowanego uzytkownika
app.get("/api/loginUserDatabase",(req, res) => {
  res.json({ loginUserDatabase });
});
//tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"
const herokuPort = process.env.PORT || 3000;
//nasłuchiwanie app na jakim porcie na działać
app.listen(herokuPort, () => {
  console.log(`Działam na porcie ${herokuPort}`);
});
