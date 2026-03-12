function lireTexte() {
  const texte = document.getElementById("texte").innerText;
  const speech = new SpeechSynthesisUtterance(texte);
  speech.lang = "fr-FR";
  speech.rate = 1;
  speech.pitch = 1;

  speechSynthesis.speak(speech);
}
