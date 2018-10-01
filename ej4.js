const express = require('express');
const app = express();
const port = 8080;

app.get('/hello/:name', function (req, res) {
    //res.send('{ "hello:" "'+ req.params + '"}');
    res.send(req.params);
});

app.listen(port, ()=> console.log(`App listening on port ${port}!`));