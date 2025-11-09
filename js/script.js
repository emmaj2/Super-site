const images = [
  "img/chiale1.PNG",
  "img/chiale2.PNG",
  "img/chiale3.PNG"
];

let body = document.querySelector("body");
let compteurA = 0; // compte les images a.jpg créées
let messageAffiche = false; // pour éviter plusieurs messages

body.addEventListener("click", creerImage);

function creerImage(event) {
  const img = document.createElement("img");
  const randomUrl = images[Math.floor(Math.random() * images.length)];
  img.src = "img/a.jpg";

  img.style.position = "absolute";
  img.style.left = `${event.clientX}px`;
  img.style.top = `${event.clientY}px`;
  img.style.transform = "translate(-50%, -50%)";
  img.style.width = "120px";
  img.style.cursor = "pointer";

  // Quand on clique sur l’image
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    const chance = Math.random();
    if (chance < 1 / 5) {
      let newUrl;
      do {
        newUrl = images[Math.floor(Math.random() * images.length)];
      } while (newUrl === img.src && images.length > 1);
      img.src = newUrl;
      console.log("Image changée !");
    } else {
      console.log("Pas de changement !");
    }
  });

  // Ajoute l’image au body
  document.body.appendChild(img);

  // Si c’est une a.jpg, on incrémente le compteur
  if (img.src.includes("img/a.jpg")) {
    compteurA++;
  }

  console.log("Nombre d'images a.jpg :", compteurA);

  // Quand il y a 5 a.jpg → affiche le message + fait tourner les images
  if (compteurA === 10 && !messageAffiche) {
    afficherMessageEtRotation();
  }

  // Supprime l’image après 10 secondes
  setTimeout(() => {
    if (img.parentNode) img.remove();
  }, 10000);
}

function afficherMessageEtRotation() {
  messageAffiche = true;

  const message = document.getElementById("message");
  message.style.display = "block";

  const applause = new Audio("sons/app.mp3");
  applause.play().catch(() => console.log("⚠️ Impossible de jouer le son (bloqué par le navigateur)."));

  // Fait tourner toutes les images a.jpg
  const toutesA = document.querySelectorAll("img[src*='img/a.jpg']");
  toutesA.forEach(img => {
    img.classList.add("rotate");
  });

  // Cache le message après 5 secondes
  setTimeout(() => {
    message.style.display = "none";
    messageAffiche = false;
    compteurA = 0; // reset du compteur
  }, 5000);
}
