document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");
  if (!form) return;

  const DELAI_ENVOI = 60; // délai en secondes entre deux envois
  const CLE_STORAGE = "dernierEnvoiFormulaire";

  form.addEventListener("submit", function (e) {

    /* ⏱️ LIMITE D'ENVOI (ANTI-SPAM) */
    const maintenant = Date.now();
    const dernierEnvoi = localStorage.getItem(CLE_STORAGE);

    if (dernierEnvoi) {
      const diff = Math.floor((maintenant - dernierEnvoi) / 1000);

      if (diff < DELAI_ENVOI) {
        e.preventDefault();
        alert(
          "Veuillez patienter avant d'envoyer un nouveau message.\n\n" +
          "Temps restant : " + (DELAI_ENVOI - diff) + " secondes\n\n" +
          "-----------------------------------------------------\n" +
          "Please wait before sending another message.\n\n" +
          "Remaining time: " + (DELAI_ENVOI - diff) + " seconds"
        );
        return;
      }
    }

    const champMessage = document.getElementById("Message");
    if (!champMessage) return;

    const message = champMessage.value;

    /* 🔐 NETTOYAGE ANTI-CONTURNEMENT */
    const messagePropre = message
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "");

    /* 🚫 BLOQUER LES CRIS (MAJUSCULES) */
    const lettres = message.replace(/[^a-zA-Z]/g, "");
    if (lettres.length >= 15) {
      const majuscules = lettres.replace(/[^A-Z]/g, "").length;
      const ratioMaj = majuscules / lettres.length;

      if (ratioMaj > 0.7) {
        e.preventDefault();
        alert(
          "Comme il arrive que certains utilisateurs utilisent des majuscules pour annuler les filtres anti-vulgarité,\n" +
          "merci d'écrire vos messages en minuscules.\n\nMerci\n" +
          "-----------------------------------------------------\n" +
          "As some users may use capital letters to bypass profanity filters,\n" +
          "please write your messages in lowercase.\n\nThank you"
        );
        return;
      }
    }

    /* 🚫 LISTE DES MOTS INTERDITS */
    const motsInterdits = [
      "idiot","idiote","imbecile","stupide","debile","cretin","nul","nulle",
      "con","connard","connasse","conne","encule","enfoire","salaud","salope",
      "batard","ordure","merde","merdique","bouffon","abruti","attarde","loser",
      "ta gueule","ferme ta gueule","va crever","creve","mort",
      "je vais te","tu vas mourir","je te tue","je vais te tuer",
      "pute","putain","petasse","salopard",
      "enculer","baiser","baise","bite","couille","couilles",
      "chatte","seins","nichons","cul","fesse","porn","porno","pornographie",
      "fuck","fucking","shit","asshole","bitch","bastard","dick",
      "pussy","motherfucker","retard","slut","whore",
      "degage","casse toi","tes nul","tes con","tu sers a rien",
      "personne taime","suicide","suicide toi",
      "c0n","fck","sh1t","salope","connard","idiot","moron","stupid","dumb",
      "shut up","go die","kill yourself","nobody likes you",
      "sex","sexual","nude","xxx","boobs","ass",
      "hate you","die","death"
    ];

    for (let mot of motsInterdits) {
      if (messagePropre.includes(mot)) {
        e.preventDefault();
        alert(
          "Nos filtres ont détecté des insultes.\n" +
          "Merci de modérer votre langage.\n\nMerci\n" +
          "-----------------------------------------------------\n" +
          "Our filters have detected offensive language.\n" +
          "Please moderate your language.\n\nThank you"
        );
        return;
      }
    }

    /* ✅ ENREGISTRER L'ENVOI SI TOUT EST OK */
    localStorage.setItem(CLE_STORAGE, maintenant);

  });

});
