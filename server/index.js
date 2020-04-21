const PORT = process.env.PORT || 3333
const server = require('./server');

server.listen(PORT, () => console.log(`\n==== RUNNING ON PORT ${PORT} ====\n`));
