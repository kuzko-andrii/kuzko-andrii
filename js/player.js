const track_art = document.querySelector(".track-art");
const track_name = document.querySelector(".track-name");
const track_artist = document.querySelector(".track-artist");

const playpause_btn = document.querySelector(".playpause-track");
const next_btn = document.querySelector(".next-track");
const prev_btn = document.querySelector(".prev-track");

const seek_slider = document.querySelector(".seek_slider");
const current_time = document.querySelector(".current-time");
const total_time = document.querySelector(".total-time");
const current_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isPlayingNow = false;
let updateTimer;

const music_list = [
    {
        img: "img/parfeniuk-provela_ekskursiyu.webp",
        name: "Провела екскурсію",
        artist: "Parfeniuk",
        music: "music/parfeniuk-provela_ekskursiyu.mp3",
    },
    {
        img: "img/slavik_pogosov-monro.webp",
        name: "Монро",
        artist: "Slavik Pogosov ",
        music: "music/slavik_pogosov-monro.mp3",
    },
    {
        img: "img/xcho-ty_i_ya.webp",
        name: "Ты и я",
        artist: "Xcho",
        music: "music/xcho-ty_i_ya.mp3",
    },
    {
        img: "img/mby-au.webp",
        name: "Ау",
        artist: "Mby",
        music: "music/mby-au.mp3",
    },
    {
        img: "img/unnv-muza.jpg",
        name: "Муза",
        artist: "УННВ",
        music: "music/unnv-muza.mp3",
    },
];

loadTrack(track_index);
async function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();
    current_track.src = music_list[track_index].music;
    current_track.load();

    track_art.style.backgroundImage =
        "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);
    current_track.addEventListener("ended", nextTrack);
}

async function reset() {
    current_time.textContent = "00:00";
    total_time.textContent = "00:00";
    seek_slider.value = 0;
}
async function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

async function playTrack() {
    let playPromise = current_track.play();

    if (playPromise !== undefined) {
        playPromise
            .then((_) => {
                isPlaying = true;
                track_art.classList.add("rotate");
                playpause_btn.innerHTML =
                    "<i class='fa-solid fa-circle-pause fa-2x'></i>";
            })
            .catch((error) => {
                pauseTrack();
            });
    }
}
async function pauseTrack() {
    current_track.pause();
    isPlaying = false;
    track_art.classList.remove("rotate");
    playpause_btn.innerHTML = "<i class='fa-solid fa-circle-play fa-2x'></i>";
}
async function nextTrack() {
    if (track_index < music_list.length - 1) {
        track_index += 1;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
async function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}
async function seekTo() {
    let seekto = current_track.duration * (seek_slider.value / 100);
    current_track.currentTime = seekto;
}
async function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(current_track.duration)) {
        seekPosition =
            current_track.currentTime * (100 / current_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(current_track.currentTime / 60);
        let currentSeconds = Math.floor(
            current_track.currentTime - currentMinutes * 60
        );
        let durationMinutes = Math.floor(current_track.duration / 60);
        let durationSeconds = Math.floor(
            current_track.duration - durationMinutes * 60
        );

        if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
        if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
        if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
        if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;

        current_time.textContent = currentMinutes + ":" + currentSeconds;
        total_time.textContent = durationMinutes + ":" + durationSeconds;
    }
}
