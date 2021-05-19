//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// array to store entry objects
let entries = [];

app.get("/", function(req,res) {

  // truncated string length
  const subStrlen = 100;

  res.render("home",{
    entries : entries,
    subStrlen: subStrlen});
});

app.get("/about", function(req,res) {
  res.render("about");
});

app.get("/contact", function(req,res) {
  res.render("contact");
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res) {
  // let title = req.body.entryTitle;
  let entry = {
    title: req.body.entryTitle,
    content: req.body.entryText
  };

  entries.push(entry);

  res.redirect("/")
});

// route get to single entry page
app.get("/entry/:entryTitle", function(req, res) {
  var found = false;
  var i = 0;

  // check for matching entry title
  // if theres a match, send user to route with a single post
  // do we want to try to redirect to a 404 page if entry doesnt exist???
  // how are we gonna handle entries with same title?
  while (!found && i < entries.length) {
    if (_.kebabCase(req.params.entryTitle) === _.kebabCase(entries[i].title)){
      res.render("entry", {singleEntryTitle: req.params.entryTitle, singleEntryText: entries[i].content});
      found = true;
    }
    i++;
  }  //end while
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
