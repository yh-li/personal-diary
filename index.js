const express = require("express");
const bodyParser = require("body-parser");
const app = new express();

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
const blogs = [{ title: "first blog", content: "This is my first blog." }];

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
  console.log(req.params.postTitle);
  blogs.forEach((e) => {
    if (e.title === req.params.postTitle) {
      res.render("singleBlog", (blog = e));
    }
  });
  res.render("singleBlog", (blog = { title: "No such blog.", content: "" }));
});
