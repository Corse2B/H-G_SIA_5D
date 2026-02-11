document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");
  if (!form) return;

  const DELAI_ENVOI = 60 * 1000; // 60 secondes
  const CLE_STORAGE = "dernier_envoi_form";

  form.addEventListener("submit", function (e) {

    /* ⏱️ LIMITE D'ENVOIS */
    const maintenant = Date.now();
    const dernierEnvoi = localStorage.getItem(CLE_STORAGE);

    if (dernierEnvoi && maintenant - dernierEnvoi < DELAI_ENVOI) {
      e.preventDefault();
      alert(
        "Merci d’attendre avant d’envoyer un nouveau message.\n\n" +
        "Please wait before sending another message."
      );
      return;
    }

    const champMessage = document.getElementById("Message");
    if (!champMessage) return;

    const message = champMessage.value;

    /* 🧹 NETTOYAGE DU MESSAGE */
    const messagePropre = message
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "");

    /* 🚫 BLOQUER LES CRIS (MAJUSCULES) */
    const lettres = message.replace(/[^a-zA-Z]/g, "");
    if (lettres.length >= 15) {
      const majuscules = lettres.replace(/[^A-Z]/g, "").length;
      if (majuscules / lettres.length > 0.7) {
        e.preventDefault();
        alert("Comme il arrive que certains utilisateurs utilise des majuscules pour annuler les filtres anti-vulgarité merci d'écrire vos messages en minuscules\n\nMerci\n-----------------------------------------------------\nAs some users may use capital letters to bypass profanity filters, please write your messages in lowercase.\n\nThank you");
        return;
      }
    }

    /* 🚫 LISTE DES INSULTES */
    const motsInterdits = [
      "idiot","idiote","imbecile","stupide","debile","cretin",
      "con","connard","connasse","salope","salaud","pute","putain",
      "merde","merdique","encule","enfoire",
      "ta gueule","ferme ta gueule","va crever","creve",
      "fuck","fucking","shit","asshole","bitch","bastard",
      "dick","pussy","motherfucker","slut","whore",
      "suicide","kill yourself","die",
      "c0n","fck","sh1t","a$$hole","cul","prout","caca","gros","shine","sale","chiotte",
      "putain"
    ];

    for (let mot of motsInterdits) {
      if (messagePropre.includes(mot)) {
        e.preventDefault();
        alert("Nos filtres on détecté des insultes. Merci de modéré votre language\n\nMerci\n-----------------------------------------------------\nOur filters have detected offensive language. Please moderate your language.\n\nThank you");
        return;
      }
    }

    /* ✅ AUTORISER L'ENVOI */
    localStorage.setItem(CLE_STORAGE, maintenant);

  });

});
