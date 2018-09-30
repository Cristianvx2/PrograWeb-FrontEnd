const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    console.log("A user made a request" + request.url);
    response.writeHead(200, {"Context-Type": "text/plain"});
    response.write("Here is some data");
    response.end();
});

//http.createServer(onRequestMethod).listen(3000);
server.listen(port, hostname, (err) => {
    if(err){
        return console.log('something bad happened', err)
    }
    console.log(`Server running at http://${hostname}:${port}/`);
});