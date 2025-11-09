const images = [
  "img/chiale1.PNG",
  "img/chiale2.PNG",
  "img/chiale3.PNG"
];

let body = document.querySelector("body");
let messageAffiche = false;

body.addEventListener("click", creerImage);

function creerImage(event) {
  const img = document.createElement("img");
  // Image aléatoire parmi chiale
  const randomUrl = images[Math.floor(Math.random() * images.length)];
  img.src = randomUrl;
  img.dataset.type = "chiale"; // marque l'image

  img.style.position = "absolute";
  img.style.left = `${event.clientX}px`;
  img.style.top = `${event.clientY}px`;
  img.style.transform = "translate(-50%, -50%)";
  img.style.width = "120px";
  img.style.cursor = "pointer";

  // Clique sur image → possibilité de changer
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    const chance = Math.random();
    if (chance < 1 / 5) {
      let newUrl;
      do {
        newUrl = images[Math.floor(Math.random() * images.length)];
      } while (newUrl === img.src && images.length > 1);
      img.src = newUrl;
    }
  });

  document.body.appendChild(img);

  verifierCompteur();
  
  // Supprime après 10 secondes
  setTimeout(() => {
    if (img.parentNode) img.remove();
    verifierCompteur();
  }, 10000);
}

function verifierCompteur() {
  // Compte toutes les images sur l'écran
  const toutesImages = document.querySelectorAll("img[data-type='chiale']");
  if (toutesImages.length >= 5 && !messageAffiche) {
    afficherMessageEtRotation(toutesImages);
  }
}

function afficherMessageEtRotation(imagesA) {
  messageAffiche = true;

  const message = document.getElementById("message");
  message.style.display = "block";

  // Lecture du son
  const applause = new Audio("sons/app.mp3");
  applause.play().catch(() => console.log("⚠️ Impossible de jouer le son (bloqué)."));

  // Transforme toutes les images en A et fait tourner
  imagesA.forEach(img => {
    img.src = "img/a.jpg";
    img.dataset.type = "a"; // change le type
    img.classList.add("rotate");
  });

  // Cache le message après 5 secondes
  setTimeout(() => {
    message.style.display = "none";
    messageAffiche = false;
  }, 5000);
}
