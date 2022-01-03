const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/", express.static(path.resolve(__dirname, "dist")));

app.get(`/login/:path*?`, (req, res) => {
   return res.sendFile(path.resolve(__dirname, "dist", "views", `login.html`)); //login
});

app.get(`/teste/:path*?`, (req, res) => {
  return res.sendFile(path.resolve(__dirname, "dist", "views", `teste.html`)); //test
});

app.get(`/:path*?`, (req, res) => {
    return res.sendFile(path.resolve(__dirname, "dist", "views", `main.html`));
}); 

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

