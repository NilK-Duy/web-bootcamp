const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');
const adminRouters = require('./routes/admin');

app.use('/shelters', shelterRoutes);
app.use('/admin', adminRouters);

app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})