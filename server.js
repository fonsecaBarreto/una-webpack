const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/", express.static(path.resolve(__dirname, "dist")));

app.get(`/`, (req, res) => {
  return res.sendFile(path.resolve(__dirname, "dist", "views", `landingpage.html`));
}); 

app.get(`/admin/:path*?`, (req, res) => {
  return res.sendFile(path.resolve(__dirname, "dist", "views", `admin.html`));
}); 

app.get(`/:path*?`, (req, res) => {
    return res.sendFile(path.resolve(__dirname, "dist", "views", `main.html`));
}); 

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

