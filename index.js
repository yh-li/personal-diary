const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");

const app = new express();


app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
const blogs = [];

app.get("/", (req, res) => {
  res.render("index", { blogs: blogs });
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
  const newBlog = { title: req.body.title, content: req.body.content };
  blogs.push(newBlog);
  res.redirect("/");
});
app.listen(3000, () => {
  console.log("Running at port 3000.");
});
//route parameter
app.get("/posts/:postTitle", (req, res) => {
  blogs.forEach((e) => {
    if (lodash.lowerCase(e.title) === lodash.lowerCase(req.params.postTitle)) {
      res.render("singleBlog", (blog = e));
    }
  });
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
