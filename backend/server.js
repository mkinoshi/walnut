const express = require('express');
const app = express();
const dbRoutes = require('./routes/databaseAccess.js');

app.use(express.static('build'));

app.use('/db', dbRoutes);
app.listen(3000, () => {
  console.log('Server for Walnut listening on port 3000!')
});
