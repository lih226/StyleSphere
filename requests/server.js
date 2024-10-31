const express = require('express')
const app = express()
const port = 3000

//We need a body parser to parse the JSON!!
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//Structure: id, uri, mediaType, description, username
const posts = [];

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})

let lastId = 0;
app.post('/posts', (req, res) => {
  const newPost = req.body;

  if(!newPost.uri || !newPost.mediaType || !newPost.description || !newPost.username){
      return res.status(400).send("Missing required fields: uri, mediaType, description, username");
  }

  if(posts.find(e => e.id === newPost.id)){
    return res.status(400).send("Username already taken");
  }

  lastId += 1;
  newPost.id = lastId.toString();
  posts.push(newPost);
  res.status(201).json(newPost);
});

//Expects a query ? with search. Not case sensitive. http://localhost:3000/posts?search=[search_Query]
app.get('/posts', (req, res) => {
    const search_Query = req.query.search;
  
    if(search_Query){ //Check if there is an inputted search query. If so, return a json of all posts that has search_Query in their description or username.
      const filterPost = posts.filter(e => e.description.toLowerCase().includes(search_Query.toLowerCase()) || e.username.toLowerCase().includes(search_Query.toLowerCase()));
      if(filterPost.length){
        res.json(filterPost);
      }
      else{
        res.status(404).send("User not found.");
      }
    }
    else{ //If there's no query, return all the posts
      res.json(posts);
    }
  });

app.get('/posts:id', (req, res) => {
  const id = req.params.id;
  const post = posts.find(e => e.id === id);

  if(post){
    res.json(post);
  }
  else{
    res.status(404).send("Post not found");
  }
});

app.put('/posts:username', (req, res) => {
  const username = req.params.username;
  const updatedData = req.body;

  const userIndex = posts.findIndex(e => e.username === username);

  if(userIndex !== -1){ //If the user is found, update the user according to the body.
    posts[userIndex] = {...posts[userIndex], ...updatedData};
    res.status(201).json(posts[userIndex]);
  }
  //If the user doesn't exist, create the user if it follows the user schema (has a username, name, and bio).
  else if(updatedData.username && updatedData.name && updatedData.bio){
    posts.push(updatedData); //Create a new element at the end of the posts list.
    res.status(201).json(posts[posts.length-1]);
  }
  else{
    res.status(400).send("Json body does not follow User Schema. Add attributes username, name, and bio.");
  }
});

app.delete('/posts:id', (req, res) => {
  const id = req.params.id.toString();
  const userIndex = posts.findIndex(e => e.id === id);

  if(userIndex !== -1){
    const deletedUser = posts.splice(userIndex, 1);
    res.json(deletedUser[0]);
  }
  else{
    res.status(404).send("User not found.");
  }
});