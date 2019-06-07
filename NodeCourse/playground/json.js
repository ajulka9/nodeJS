const person = {
    name: 'Abhishek',
    last: 'Julka'
};

console.log(JSON.parse(JSON.stringify(person)).name);