let speaking = false;
let utterance;
let voices = [8];

function loadVoices() {
  voices = speechSynthesis.getVoices();
}

speechSynthesis.onvoiceschanged = loadVoices;

const btn = document.getElementById("lireTexte");

btn.addEventListener("click", () => {

  if (speaking) {
    speechSynthesis.cancel();
    speaking = false;
    btn.textContent = "🔊";
    return;
  }

  const text = document
    .getElementById("content1")
    .innerText
    .replace(/\n+/g," ");

  utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "fr-FR";
  utterance.voice = voices.find(v => v.lang === "fr-FR");

  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onend = () => {
    speaking = false;
    btn.textContent = "🔊";
  };

  speechSynthesis.speak(utterance);

  speaking = true;
  btn.textContent = "⏹";
});
