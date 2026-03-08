const input = document.getElementById("question");
const button = document.getElementById("send");

async function sendMessage() {

  const question = input.value;
  if (!question) return;

  button.disabled = true;

  const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: question })
  });

  const data = await res.json();

  console.log(data.response);

  button.disabled = false;
}

button.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
