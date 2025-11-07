const images = [
  "img/chiale1.PNG",
  "img/chiale2.PNG",
  "img/chiale3.PNG"
];

let body = document.querySelector("body");
body.addEventListener("click", creerImage);

function creerImage(event) {
  const img = document.createElement("img");

  // Image initiale
  const randomUrl = images[Math.floor(Math.random() * images.length)];

  img.src = "/img/a.jpg";

  // Position de l’image au clic
  img.style.position = "absolute";
  img.style.left = `${event.clientX}px`;
  img.style.top = `${event.clientY}px`;
  img.style.transform = "translate(-50%, -50%)";
  img.style.width = "120px";
  img.style.cursor = "pointer";

  // Quand on clique sur l’image
  img.addEventListener("click", (e) => {
    e.stopPropagation(); // empêche de recréer une image dessous

    // 1 chance sur 3 de changer l'image
    const chance = Math.random(); // entre 0 et 1
    if (chance < 1 / 3) {
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

  // Supprime l’image après 10 secondes
  setTimeout(() => {
    img.remove();
  }, 10000);
}

function supp(event) {
  event.stopPropagation();
  this.remove();
}
