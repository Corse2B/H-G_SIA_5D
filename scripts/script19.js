document.querySelectorAll(".audio-player").forEach(player => {

const audio = player.querySelector("audio");
const playBtn = player.querySelector(".play-btn");
const progress = player.querySelector(".progress");
const progressContainer = player.querySelector(".progress-container");
const handle = player.querySelector(".progress-handle");
const time = player.querySelector(".time");

let isDragging = false;

function formatTime(sec){
if(!sec) return "0:00";
const m = Math.floor(sec / 60);
const s = Math.floor(sec % 60);
return m + ":" + (s < 10 ? "0"+s : s);
}

function stopAllAudio(){
document.querySelectorAll(".audio-player audio").forEach(a=>{
if(a !== audio){
a.pause();
a.parentElement.querySelector(".play-btn").textContent="▶️";
}
});
}

playBtn.addEventListener("click", () => {

if(audio.paused){

stopAllAudio();
audio.play();
playBtn.textContent="⏸";

}else{

audio.pause();
playBtn.textContent="▶️";

}

});

audio.addEventListener("timeupdate", () => {

if(isDragging) return;

const percent = (audio.currentTime / audio.duration) * 100;

progress.style.width = percent + "%";
handle.style.left = percent + "%";

const remaining = audio.duration - audio.currentTime;
time.textContent = "-" + formatTime(remaining);

});

progressContainer.addEventListener("click", e => {

const width = progressContainer.clientWidth;
const clickX = e.offsetX;

audio.currentTime = (clickX / width) * audio.duration;

});

handle.addEventListener("mousedown", () => {
isDragging = true;
});

document.addEventListener("mouseup", () => {
isDragging = false;
});

document.addEventListener("mousemove", (e) => {

if(!isDragging) return;

const rect = progressContainer.getBoundingClientRect();
let percent = (e.clientX - rect.left) / rect.width;

percent = Math.max(0, Math.min(1, percent));

audio.currentTime = percent * audio.duration;

});

audio.addEventListener("ended",()=>{
playBtn.textContent="▶️";
});

});
