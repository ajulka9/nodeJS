var arr = [1,2,3,4,5];

arr.forEach(function(test){
    console.log('Default For Each -> '+test);
});

// func(num){
//     console.log('from custom : '+ num);
// }
Array.prototype.customForEach = function(func){
    for (let index = 0; index < this.length; index++) {
       func(this[index]);
    }
};

arr.customForEach(function(input){
    console.log('Custom ForEach -> '+ input);
});