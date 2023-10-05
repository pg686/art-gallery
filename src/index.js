const express = require('express');
const {PORT} = require('./config/env.js');
const routes = require('./routes.js');

const app = express();
require('./config/hbs.js')(app);
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
