let speaking = false;

document.querySelectorAll(".lireTexte").forEach(btn => {

  btn.addEventListener("click", () => {

    if (speaking) {
      speechSynthesis.cancel();
      speaking = false;
      btn.textContent = "🔊";
      return;
    }

    const parent = btn.closest(".content");

    let texte = parent.innerText
      .replace("🔊","")
      .replace("✖","");

    const utterance = new SpeechSynthesisUtterance(texte);

    utterance.lang = "fr-FR";
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    speechSynthesis.speak(utterance);

    speaking = true;
    btn.textContent = "⏹";

    utterance.onend = () => {
      speaking = false;
      btn.textContent = "🔊";
    };

  });

});
