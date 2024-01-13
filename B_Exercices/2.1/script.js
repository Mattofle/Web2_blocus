
const dateTimeNow = new Date();
console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
console.log(dateTimeNow.toLocaleTimeString()); // 13:26:15

const message = "Ceci est ennuyant oui";

alert(dateTimeNow.toLocaleTimeString() +" "+ dateTimeNow.toLocaleDateString()+" "+ message)