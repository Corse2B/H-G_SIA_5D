async function sendMessage() {

  const question = input.value.trim();
  if (!question) return;

  input.value = "";
  input.focus();

  button.disabled = true;

  const user = addMessage("Vous");
  user.textContent = question;

  const ai = addMessage("Chronograph-IA");
  ai.innerHTML = "Réflexion...";

  try {

    const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    if (!res.ok) {
      ai.textContent = "Erreur serveur";
      button.disabled = false;
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let text = "";

    ai.innerHTML = "";

    while (true) {

      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      text += chunk;

      ai.innerHTML = marked.parse(text);

      scrollBottom();

    }

  } catch (err) {

    ai.textContent = "Erreur : " + err;

  }

  button.disabled = false;

}
