const express = require("express");
const path = require("path");

const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = 8001;

//connection
connectToMongoDB("mongodb://127.0.0.1:27017/shortUrl")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(`${err} Occured`));
//routes

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// app.get("/test", async(req, res) =>{
//   const allUrls = await URL.find({});
//   return res.render('home', {
//      urls: allUrls,
//   });
// });

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Starte at Port: ${PORT}`));
