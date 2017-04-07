console.log(process.argv);

var elementOne = parseInt(process.argv[2]);
var elementTwo = parseInt(process.argv[3]);
if (elementOne === elementTwo) {
    console.log("true");
} else {
    console.log("false");
}

if ((elementOne % 7 === 0) && (elementTwo % 7 === 0)) {
    console.log("true");
} else {
    console.log("false");

}