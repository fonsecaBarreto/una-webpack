const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/", express.static(path.resolve(__dirname, "dist")));


app.get(`/bem-vindo/:path*?`, (req, res) => {
  return res.sendFile(path.resolve(__dirname, "dist", "views", `landingpage.html`));
}); 


app.get(`/:path*?`, (req, res) => {
    return res.sendFile(path.resolve(__dirname, "dist", "views", `main.html`));
}); 

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});


/* app.use(function(req, res, next){
  try{
    decodeURIComponent(req.path)
  }catch(e){
    console.log(e, req.url);
    return res.redirect(["https://", req.get("Host"), "/404"].join(""));
  }
  next();
}) */
/* app.get(`/admin/:path*?`, (req, res) => {
  return res.sendFile(path.resolve(__dirname, "dist", "views", `admin.html`));
}); 
 */