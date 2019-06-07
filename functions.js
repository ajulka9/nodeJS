(function functions() {
    console.log('Welcome to the functions.js');
    array = [1, 2, 3]
    array.forEach(function (element) {
        console.log(element);
    });

    function helloWorld() {
        console.log("This from the helloWorld!");
    }
    function factorial(input) {
        console.log('Input : ' + input);
        if (input <= 1) {
            return 1;
        } else {
            return input * factorial(input - 1);
        }
    };

    console.log("Factorial of 10 = " + factorial(10));

    helloWorld();
})();