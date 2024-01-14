const btn1 = document.querySelector('#btn');
const val = document.querySelector('#valeur');
const msg = document.querySelector('#message');

let valeur = 0;

btn1.addEventListener('click', onclick);

function onclick(){
    valeur++;
    val.innerHTML = valeur;
    if (valeur >= 5 && valeur < 10) msg.innerHTML = 'Bravo, bel échauffement !'
    if (valeur > 10) msg.innerHTML = "Vous êtes passé maître en l'art du clic !";
}