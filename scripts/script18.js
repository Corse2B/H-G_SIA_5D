const chat = document.getElementById("chat");
const input = document.getElementById("message");
const button = document.getElementById("sendBtn");

let waiting = false;

// ajouter message
function addMessage(text, type){

  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  return div;

}

// effet écriture
function typeWriter(text, element, speed = 15){

  let i = 0;

  function typing(){

    if(i < text.length){

      element.innerHTML += text.charAt(i);
      i++;

      chat.scrollTop = chat.scrollHeight;

      setTimeout(typing, speed);

    } else {

      waiting = false;
      button.disabled = false;

    }

  }

  typing();

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

    thinking.innerHTML="";

    typeWriter(data.reply,thinking);

  }catch(err){

    thinking.innerText="Erreur connexion IA";
    waiting=false;
    button.disabled=false;

  }

}

// enter pour envoyer
input.addEventListener("keypress",function(e){

  if(e.key === "Enter" && !waiting){
    send();
  }

});


