const express = require("express");
const cors = require("cors");
const app = express();
// app.use(cors())
const path = require("path");
const allowCORS = function(req, res, next) {
  var origin = req.get('origin');
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};
app.use(
  '/api/regestry', 
  allowCORS, // allow cors for public api
  require('./api/regestry'));

app.use("/", express.static(__dirname + "src"));
app.use("/public", express.static(__dirname + "public"));

app.use(express.json());
const regestryUsers = [];
const loginUserDatabase = [];
//przekazywania danych na stronę sewera
app.get("/", (req, res) => {
  res.send(req.body);
});
// pobieranie danych z rejestracji i zapisywanie ich do tablicy regystryUsers
app.post(
  "/api/regestry",(req, res) => {
  regestryUsers.push(req.body);
    res.status(200).end;
  })

// pobieranie danych z inputów dream teamu i dodawanie ich do pustej tablict "loginUserDatabase"
app.post(
  "/api/loginUserDatabase",(req, res) => {
  loginUserDatabase.push(req.body);
    res.status(200).end;
  })
// wysłanie danych z rejestracji zapisanych na serwerze z powrotem juz na strone logowania do sprawdzenia poprawnosci logowania usera
app.get("/api/regestry",(req, res, next) => {
  res.json({ regestryUsers });
})
//wysłanie danych do bazy danych zalogowanego uzytkownika
app.get("/api/loginUserDatabase",(req, res) => {
res.json({ loginUserDatabase });
})
if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "src", "components", "index.html"));
  });
}

//tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"
const herokuPort = process.env.PORT || 3000;
//nasłuchiwanie app na jakim porcie na działać
app.listen(herokuPort, () => {
  console.log(`Działam na porcie ${herokuPort}`);
});
