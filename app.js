const express = require('express');
require('dotenv').config()
const app = express();
const PORT = 3001 | process.env.PORT;
const usersRouter = require('./src/api/users');
const postsRouter = require('./src/api/posts');
const commentsRouter = require('./src/api/comments');
const feedRouter = require('./src/api/feed');
const body_parser = require('body-parser');
const registerRouter = require('./src/api/register');
const loginRouter = require('./src/api/login');
const auth = require('./src/core/auth')

app.use(body_parser.json());
app.use('/users', auth, usersRouter);
app.use('/posts', auth, postsRouter);
app.use('/comments', auth, commentsRouter);
app.use('/feed', auth, feedRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter)



app.listen(PORT, () => {
    console.log("server is listening to :http://localhost:" + PORT);
});