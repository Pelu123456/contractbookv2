require('dotenv').config();
const app = require('./src/app');

// start server 

const PORT = process.env.PORT || 6000;
console.log(PORT);
app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}.`);
});