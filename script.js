const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
//const prevBtn = document.getElementById('prev');
//const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


const maxShortWaitIntrvlFactor = 1.5;//10;	//at max ten minutes - 15 mins
const minLongWaitIntrvlFactor = 30;	//atleast 30 minutes - sixty minutes 

let timerid = 0;

const aMinMillisecs = 1000 * 60;	//a minute millisecs 

// Song titles
const songs = ['statue','bell'];//['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

//window.load = onLoad();

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.aac`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  /*musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');*/

  audio.play();
}

// Play song
function startSong(twhentoplay=60000*randomWaitInterval(minLongWaitIntrvlFactor, true)) {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-stop');
  //songIndex = 0;
  //loadSong(songs[songIndex]);
  timerid = setTimeout(playSong, twhentoplay);
  let now = new Date();
  now.setMinutes(now.getMinutes()+(twhentoplay/60000));
  console.log("new timer "+ timerid.toString() + " at " + now.toString() + " is set to run.");
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function stopSong(){
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-stop');

	if (timerid != 0)
	{
		console.log("Old timer " + timerid.toString() + " is set to clear.");
		clearTimeout(timerid);
		timerid = 0;
	}
	songIndex = 0;
	audio.pause();
	//loadSong(songs[songIndex]);
	//audio.load();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function randomWaitInterval(intervalRangeMins = 10,bWaitAtleast=false)
{
	let extendedRangeFactor = 0;
	if (bWaitAtleast == true)
	{
		extendedRangeFactor = intervalRangeMins;
	}
	return extendedRangeFactor + (Math.floor(Math.random()*intervalRangeMins));
}

function nextAction1()
{
	let waittime = 30000 * randomWaitInterval(maxShortWaitIntrvlFactor);

	songIndex++;

	let pldt = new Date();

	if (songIndex > songs.length - 1)
	{
		songIndex = 0;
		waittime = aMinMillisecs * randomWaitInterval(minLongWaitIntrvlFactor, true);
	}

	pldt.setMinutes(pldt.getMinutes()+(waittime/aMinMillisecs));

	//musicContainer.classList.remove('play');
	//playBtn.querySelector('i.fas').classList.add('fa-play');
	//playBtn.querySelector('i.fas').classList.remove('fa-pause');

	loadSong(songs[songIndex]);

	if (timerid != 0)
	{
		console.log("Old timer " + timerid.toString() + " is set to clear.");
		clearTimeout(timerid);
		timerid = 0;
	}

	console.log("Next Play "+songs[songIndex]+":"+pldt.toString());
	timerid = setTimeout(playSong, waittime);
	console.log("new timer "+ timerid.toString() + " with waittime " + waittime.toString() + " is set to run.");
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	//currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	//durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    stopSong();
  } else {
  	songIndex = 0;
  	loadSong(songs[songIndex]);
    startSong();
  }
});

function onLoad(){
	// I guess player is loaded
	console.log('onLoad called');
	setTimeout(playSong,5000);
}

// Change song
//prevBtn.addEventListener('click', prevSong);
//nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
//progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextAction1);

// Time of song
audio.addEventListener('timeupdate',DurTime);
