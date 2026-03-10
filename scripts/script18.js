const sendBtn = document.getElementById("send");
const textarea = document.getElementById("question");
const messages = document.getElementById("messages");

const md = window.markdownit({
  html: true,
  linkify: true,
  typographer: true
});

async function sendMessage(){

  const question = textarea.value.trim();
  if(!question) return;

  const user = document.createElement("div");
  user.innerHTML = "<b>Vous :</b> " + question;
  messages.appendChild(user);

  const ai = document.createElement("div");
  ai.innerHTML = "<b>Chronograph-IA :</b><br>";
  messages.appendChild(ai);

  textarea.value = "";

  let fullText = "";

  const response = await fetch(
    "https://chronograph-ia.tsilvain.workers.dev",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message: question
      })
    }
  );

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while(true){

    const {done,value} = await reader.read();
    if(done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");

    for(const line of lines){

      if(!line.startsWith("data:")) continue;

      const data = line.replace("data:","").trim();

      if(data === "[DONE]") return;

      try{

        const json = JSON.parse(data);

        const token =
          json.response ||
          json.choices?.[0]?.delta?.content ||
          json.delta?.content ||
          "";

        if(token){

          fullText += token;

          ai.innerHTML =
            "<b>Chronograph-IA :</b><br>" +
            md.render(fullText);

          messages.scrollTop = messages.scrollHeight;

        }

      }catch{}

    }

  }

}

sendBtn.onclick = sendMessage;

textarea.addEventListener("keydown", e => {

  if(e.ctrlKey && e.shiftKey && e.key === "Enter"){
    e.preventDefault();
    sendMessage();
  }

});
