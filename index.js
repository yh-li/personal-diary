const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
//const MongoClient = require("mongodb").MongoClient;
//const assert = require("assert");
const mongoose = require("mongoose");
//connection URL through mongoose
//if the database doesn't exist, create it
mongoose.connect("mongodb+srv://admin-yihan:zhaofang@cluster0.fbpuc.mongodb.net/diaryDB?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});

//define diary schema
const diarySchema = new mongoose.Schema({
  title: String,
  body: String
});
//define diary model - the collection
const Diary = new mongoose.model("Diary", diarySchema);


const app = express()
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Diary.find({}, (err, diaries) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: diaries });
    }
  })
  
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  const newDiary = new Diary({ title: req.body.title, body: req.body.content });
  newDiary.save();
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Running at dynamic port or port 3000.");
});
//route parameter
app.get("/posts/:postTitle", (req, res) => {
  Diary.findOne({ title: lodash.lowerCase(req.params.postTitle) }, (err, diary) => {
    if (err) {
      console.log(err);
    } else {
      if (diary) {
        res.render("singleBlog", (blog = diary));
      } else {
        res.render("404");
      }
      
    }
  })
});

app.post("/delete", (req, res) => {
  Diary.deleteOne({ _id: req.body.diaryID }, (err, diary) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Successfully.");
    }
  });
  res.redirect("/")
});

app.use((req, res, next) => {
  res.render("404");
})

text_truncate = function(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = '... ';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};
