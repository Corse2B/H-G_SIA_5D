async function send(){

  const input = document.getElementById("msg");
  const message = input.value;

  const response = await fetch(
    "https://chronographia-ai.tsilvain.workers.dev",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    }
  );

  const data = await response.json();

  const chat = document.getElementById("chat");

  chat.innerHTML += "<p><b>Toi :</b> " + message + "</p>";
  chat.innerHTML += "<p><b>IA :</b> " + data.reply + "</p>";

  input.value = "";

}
