document.querySelectorAll(".audio-player").forEach(player => {

const audio = player.querySelector("audio");
const playBtn = player.querySelector(".play-btn");
const progress = player.querySelector(".progress");
const progressContainer = player.querySelector(".progress-container");
const time = player.querySelector(".time");

function formatTime(sec){
const m = Math.floor(sec / 60);
const s = Math.floor(sec % 60);
return m + ":" + (s < 10 ? "0"+s : s);
}

playBtn.addEventListener("click", () => {

if(audio.paused){
audio.play();
playBtn.textContent="⏸";
}else{
audio.pause();
playBtn.textContent="▶️";
}

});

audio.addEventListener("timeupdate", () => {

const percent = (audio.currentTime / audio.duration) * 100;
progress.style.width = percent + "%";

const remaining = audio.duration - audio.currentTime;
time.textContent = "-" + formatTime(remaining);

});

progressContainer.addEventListener("click", e => {

const width = progressContainer.clientWidth;
const clickX = e.offsetX;

audio.currentTime = (clickX / width) * audio.duration;

});

});
