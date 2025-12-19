document.addEventListener("DOMContentLoaded", () => {
  
document.querySelector("form").addEventListener("submit", function (e) {
  const champMessage = document.getElementById("Message");
  const message = champMessage.value;
  const messageMin = message.toLowerCase();

  /* 🚫 BLOQUER LES MAJUSCULES (cris) */
  const lettres = message.replace(/[^a-zA-Z]/g, "");
  if (lettres.length >= 15 && lettres === lettres.toUpperCase()) {
    e.preventDefault();
    alert("❌ Merci de ne pas écrire votre message entièrement en MAJUSCULES.");
    return;
  }

  /* 🚫 LISTE ÉTENDUE DE MOTS AGRESSIFS */
  const motsInterdits = [

    // insultes générales
    "idiot","idiote","imbécile","stupide","débile","crétin","nul","nulle",
    "con","connard","connasse","conne","enculé","enfoiré","enfoire",
    "salaud","salope","batard","bâtard","ordure","merde","merdique",
    "bouffon","abruti","attardé","minable","loser",

    // langage violent
    "ta gueule","ferme ta gueule","va crever","crève","mort",
    "je vais te","tu vas mourir","je te tue","je vais te tuer",

    // insultes sexuelles
    "pute","putain","pétasse","salopard",
    "enculer","baiser","baise","bite","couille","couilles",
    "chatte","seins","nichons","cul","fesse","porn","porno","pornographie",

    // anglais
    "fuck","fucking","shit","asshole","bitch","bastard","dick",
    "pussy","motherfucker","retard","slut","whore",

    // harcèlement
    "dégage","casse-toi","t'es nul","t'es con","tu sers à rien",
    "personne t'aime","suicide","suicide-toi",

    // variantes
    "c0n","c*n","f*ck","sh1t","p*te","s@lope","conn@rd"
  ];

  for (let mot of motsInterdits) {
    if (messageMin.includes(mot)) {
      e.preventDefault();
      alert("❌ Message refusé : langage agressif détecté.");
      return;
    }
  }
});
