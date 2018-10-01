var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then trim()
    console.log("you entered: \"" +
        d.toString().trim() + "\"");

    console.log(isValid(d.toString().trim()));
});

function isValid(str) {

    if (str.length <= 1)
        return false

    let matchingOpeningBracket, ch
    let stack = []

    let openingBrackets = ['[', '{', '(']
    let closingBrackets = [']', '}', ')']

    for (let i = 0; i < str.length; i++) {
        ch = str[i]

        if (closingBrackets.indexOf(ch) > -1) {
            matchingOpeningBracket = openingBrackets[closingBrackets.indexOf(ch)]
            if (stack.length == 0 || (stack.pop() != matchingOpeningBracket)) {
                return false
            }
        } else {
            stack.push(ch)
        }
    }

    return (stack.length == 0)
};

//console.log(isValid("([)]")) // false
//console.log(isValid("()")) // true
//console.log(isValid("{}[]()")) // true
//console.log(isValid("{[}]")) // false
//console.log(isValid("{[}]")) // false
//console.log(isValid("[{()()}({[]})]({}[({})])((((((()[])){}))[]{{{({({({{{{{{}}}}}})})})}}}))[][][]")) // true
//console.log(isValid("{}[]()")) // true






//http.createServer(onRequest).listen(port, ()=> console.log(`App listening on port ${port}!`));
/*const server = http.createServer((request, response) => {
    console.log("A user made a request" + request.url);
    response.writeHead(200, {"Context-Type": "text/plain"});
    response.write("Here is some data");
    response.end();
});
server.listen(port, hostname, (err) => {
    if(err){
        return console.log('something bad happened', err)
    }
    console.log(`Server running at http://${hostname}:${port}/`);
});*/