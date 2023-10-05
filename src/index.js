const express = require('express');
const {PORT} = require('./config/env.js');
const routes = require('./routes.js');
const {dbInit} = require('./config/db.js');
const cookieParser = require('cookie-parser');
const {auth} = require('./middlewares/authMiddleware.js')
const app = express();
require('./config/hbs.js')(app);
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(auth);
app.use(routes);
dbInit().then(()=>{
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((err) => {
    console.log("cant connect", err)
})