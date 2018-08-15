const app = require('./server/app');
const keys = require('./config/keys');
const port = process.env.PORT || keys.port;

app.listen(port, () => console.log(`server has been started on port - ${port}`));
