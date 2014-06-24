var myvar = "global variable";

function func(){
    console.log(myvar);   // => undefined
    var myvar = "local variable";
    console.log(myvar); // => local variable
}
func();