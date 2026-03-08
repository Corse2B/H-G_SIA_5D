
const chat = document.getElementById("chat");
const input = document.getElementById("message");
const button = document.getElementById("sendBtn");

let waiting = false;

// ajouter message
function addMessage(text,type){

  const div = document.createElement("div");
  div.className = "message " + type;
  div.textContent = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  return div;

}

// écriture progressive
function typeWriter(text,element){

  let i = 0;

  function write(){

    if(i < text.length){
      element.textContent += text[i];
      i++;
      setTimeout(write,15);
    }else{
      waiting = false;
      button.disabled = false;
    }

  }

  write();

}

// envoyer message
async function send(){

  if(waiting) return;

  const text = input.value.trim();
  if(!text) return;

  addMessage(text,"user");

  input.value = "";

  waiting = true;
  button.disabled = true;

  const thinking = addMessage("🤔 Réflexion...","ai");

  try{

    const res = await fetch("https://chronographia-ai.tsilvain.workers.dev",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({message:text})
    });

    const data = await res.json();

    thinking.textContent = "";

    typeWriter(data.reply,thinking);

  }catch(e){

    thinking.textContent = "Erreur connexion IA";
    waiting = false;
    button.disabled = false;

  }

}

// bouton envoyer
button.addEventListener("click",send);

// touche entrée
input.addEventListener("keydown",function(e){
  if(e.key === "Enter"){
    send();
  }
});
