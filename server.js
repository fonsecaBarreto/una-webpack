const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/", express.static(path.resolve(__dirname, "dist")));

/* app.get(`/home/:path*?`, (req, res) => {
  return res.sendFile(path.resolve(__dirname, "dist", "views", `landing-page.html`)); //test
}); */

app.get(`/:path*?`, (req, res) => {
    return res.sendFile(path.resolve(__dirname, "dist", "views", `main.html`));
}); 

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

