const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const ROOT = "/homepage";
const { REACT_APPS }  = require("../apps_manifest")
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/", express.static(path.resolve(__dirname, "..", "dist")));

app.get("/", (req, res)=>{  return res.redirect(ROOT) })

REACT_APPS.forEach((a) => {
    app.get(`/${a.name}/:path*?`, (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "dist", "views", `${a.name}.html`));
    });
}); 

app.get(`/*`, (req, res) => { return res.redirect(ROOT) });
 
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
