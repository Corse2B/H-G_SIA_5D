function ttsRead() {
  const text = document.getElementById("content1").innerText;
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "fr-FR";
  speechSynthesis.speak(speech);
}
