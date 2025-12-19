document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");
  if (!form) return;

  const DELAI_ENVOI = 60 * 1000; // 60 secondes

  form.addEventListener("submit", function (e) {

    /* ⏱️ LIMITE D'ENVOI */
    const dernierEnvoi = localStorage.getItem("dernierEnvoiMessage");
    const maintenant = Date.now();

    if (dernierEnvoi && maintenant - dernierEnvoi < DELAI_ENVOI) {
      e.preventDefault();
      alert(
        "Please wait before sending another message.\n\n" +
        "Merci d’attendre avant d’envoyer un nouveau message."
      );
      return;
    }

    const champMessage = document.getElementById("Message");
    if (!champMessage) return;

    const message = champMessage.value.trim();
    if (message.length === 0) return;

    /* 🧼 VERSION NETTOYÉE */
    const messagePropre = message
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "");

    /* 🔍 DÉTECTION MESSAGE DOUTEUX */
    let douteux = false;

    // Trop long
    if (message.length > 300) douteux = true;

    // Trop de caractères spéciaux
    const speciaux = message.replace(/[a-zA-Z0-9\s]/g, "").length;
    if (speciaux > 15) douteux = true;

    // Trop de MAJUSCULES
    const lettres = message.replace(/[^a-zA-Z]/g, "");
    if (lettres.length >= 15) {
      const maj = lettres.replace(/[^A-Z]/g, "").length;
      if (maj / lettres.length > 0.7) douteux = true;
    }

    /* 🚦 SI PAS DOUTEUX → ON LAISSE PASSER */
    if (!douteux) {
      localStorage.setItem("dernierEnvoiMessage", maintenant);
      return;
    }

    /* 🚫 MOTS INTERDITS (test seulement si douteux) */
    const motsInterdits = [
      "idiot","idiote","imbecile","stupide","debile","cretin",
      "con","connard","connasse","encule","enfoire","salaud","salope",
      "merde","putain","pute","bite","couille","cul",
      "fuck","fucking","shit","asshole","bitch","bastard","dick",
      "pussy","motherfucker","slut","whore",
      "suicide","kill yourself","go die",
      "sex","porno","porn","xxx"
    ];

    for (let mot of motsInterdits) {
      if (messagePropre.includes(mot)) {
        e.preventDefault();
        alert(
          "Our filters have detected offensive language.\n" +
          "Please moderate your language.\n\n" +
          "Merci de modérer votre langage."
        );
        return;
      }
    }

    /* ✅ TOUT EST OK → ON ENREGISTRE L’ENVOI */
    localStorage.setItem("dernierEnvoiMessage", maintenant);

  });

});
