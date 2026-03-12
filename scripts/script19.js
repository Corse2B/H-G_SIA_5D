let speaking = false;
let utterance;

const btn = document.getElementById("lireTexte");

btn.addEventListener("click", () => {

  if (speaking) {
    speechSynthesis.cancel();
    speaking = false;
    btn.textContent = "🔊 Lire";
    return;
  }

  const text = document.getElementById("content1").innerText;
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";

  utterance.onend = () => {
    speaking = false;
    btn.textContent = "🔊 Lire";
  };

  speechSynthesis.speak(utterance);
  speaking = true;
  btn.textContent = "⏹ Stop";
});
