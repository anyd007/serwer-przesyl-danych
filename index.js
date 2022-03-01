
const express = require("express");
var cors = require("cors");
const path = require("path");
const app = express();
app.use('/', express.static(__dirname +'/src'));
app.use('/public', express.static(__dirname +'/public'));
app.use(cors());
// var whitelist = ['https://dream-team-andrzej.herokuapp.com','http://localhost:3000']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
var corsOptions = {
  origin: 'https://dream-team-andrzej.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(express.json());
const regestryUsers = [];
const loginUserDatabase = [];

//przekazywania danych na stronę sewera
app.get("/", cors(corsOptions), (req, res) => {
  res.send(req.body);
});

// pobieranie danych z rejestracji i zapisywanie ich do tablicy regystryUsers
app.post("/api/regestry",(req, res) => {
  regestryUsers.push(req.body);
  res.status(200).end;
});
// pobieranie danych z inputów dream teamu i dodawanie ich do pustej tablict "loginUserDatabase"
app.post("/api/loginUserDatabase", (req, res) => {
  loginUserDatabase.push(req.body);
  res.status(200).end;
});
// wysłanie danych z rejestracji zapisanych na serwerze z powrotem juz na strone logowania do sprawdzenia poprawnosci logowania usera
app.get("/api/regestry", cors(corsOptions),(req, res) => {
  res.json({ regestryUsers });
});
//wysłanie danych do bazy danych zalogowanego uzytkownika
app.get("/api/loginUserDatabase", cors(corsOptions), (req, res) => {
  res.json({ loginUserDatabase });
});
//tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"
const herokuPort = process.env.PORT || 5000;
//nasłuchiwanie app na jakim porcie na działać
app.listen(herokuPort, () => {
  console.log(`Działam na porcie ${herokuPort}`);
});
