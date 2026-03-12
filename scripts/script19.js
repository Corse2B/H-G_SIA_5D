document.querySelectorAll(".lireTexte").forEach(btn => {

  btn.addEventListener("click", async () => {

    const parent = btn.closest(".content");
    const text = parent.innerText
      .replace("🔊","")
      .replace("✖","");

    btn.textContent = "⏳";

    const res = await fetch("https://lecture.tsilvain.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const blob = await res.blob();

    const audio = new Audio(URL.createObjectURL(blob));
    audio.play();

    btn.textContent = "🔊";

  });

});
