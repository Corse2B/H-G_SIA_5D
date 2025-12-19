document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function (e) {

    const champMessage = document.getElementById("Message");
    if (!champMessage) return;

    const message = champMessage.value;

    /* 🔐 NETTOYAGE ANTI-CONTournement */
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
        alert("Comme il arrive que certains utilisateurs utilise des majuscules pour annuler les filtres anti-vulgarité merci d' écrire vos messages en minuscules\n Merci\nAs some users may use capital letters to bypass profanity filters, please write your messages in lowercase.\nThank you");
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
      "c0n","fck","sh1t","pute","salope","connard","idiot","idiotic","moron","stupid","dumb","fool","jerk","trash","pathetic","worthless","scum","creep","clown","loser","weirdo",
"shut up","go die","drop dead","kill yourself","nobody likes you","you are useless","you are nothing",
"sex","sexual","nude","nudes","boobs","tits","ass","booty","anal","orgasm","fetish","xxx",
"hate you","i hate you","die","death","burn","destroy",
"fuck","fucking","f u c k","f.u.c.k","f-ck","sh!t","shit","bi7ch","bitch","a$$hole","asshole","dick","pussy","motherfucker","slut","whore",
"retard","retardation"

    ];

    for (let mot of motsInterdits) {
      if (messagePropre.includes(mot)) {
        e.preventDefault();
        alert("Nos filtres on détecté des insultes.Merci de modéré votre language\nMerci\n our filters have detected offensive language. Please moderate your language.\nThank you");
        return;
      }
    }

  });

});
