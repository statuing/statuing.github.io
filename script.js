const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const statuefreq = document.getElementById('statue-freq-range');
const statueoverfreq = document.getElementById('statue-over-freq-range');

var maxShortWaitIntrvlFactor = 1;//10;	//at max ten minutes - 15 mins
var minLongWaitIntrvlFactor = 60;	//atleast 30 minutes - sixty minutes 

let timerid = 0;

const aMinMillisecs = 1000 * 60;	//a minute millisecs 
const aHourMins = 60;

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
}

// Play song
function playSong() {

  audio.play();
}

// Play song
function startSong() {
  musicContainer.classList.add('play');
  //playBtn.querySelector('i.fas').classList.remove('fa-play');
  //playBtn.querySelector('i.fas').classList.add('fa-stop');

  let twhentoplay = aMinMillisecs * randomWaitInterval(minLongWaitIntrvlFactor); 
  timerid = setTimeout(playSong, twhentoplay);
  let now = new Date();
  now.setMilliseconds(now.getMilliseconds()+twhentoplay);
  console.log("new timer "+ timerid.toString() + " at " + now.toString() + " is set to run.");
}

function refresh()
{
	const isChecked = playBtn.checked;//musicContainer.classList.contains('play');

	if (isChecked) {
		stopSong();
		songIndex = 0;
		loadSong(songs[songIndex]);
		startSong();
	}
}

function stopSong(){
	musicContainer.classList.remove('play');
	//playBtn.querySelector('i.fas').classList.add('fa-play');
	//playBtn.querySelector('i.fas').classList.remove('fa-stop');

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

function onStatueFreqChanged()
{
	minLongWaitIntrvlFactor = aHourMins * document.getElementById("statue-freq-range").value;
	console.log("onStatueFreqChanged():minLongWaitIntrvlFactor:"+ minLongWaitIntrvlFactor);
	refresh();
}

function onStatueOverTimingUpdate()
{
	maxShortWaitIntrvlFactor = document.getElementById("statue-over-freq-range").value;
	console.log("onStatueOverTimingUpdate():maxShortWaitIntrvlFactor:" + maxShortWaitIntrvlFactor);
}

function randomWaitInterval(intervalRangeMins = 10)
{
	let randomizedNum = 0;

	randomizedNum = (Math.random()*(intervalRangeMins-1)+1);
	console.log("randomWaitInterval(in mins):"+ randomizedNum);
	return randomizedNum;
}

function nextAction1()
{
	let waittime = (aMinMillisecs/2) * randomWaitInterval(maxShortWaitIntrvlFactor);

	songIndex++;

	let pldt = new Date();

	if (songIndex > songs.length - 1)
	{
		songIndex = 0;
		waittime = aMinMillisecs * randomWaitInterval(minLongWaitIntrvlFactor);
	}

	console.log("Current time :"+pldt.toString());

	pldt.setMinutes(pldt.getMinutes()+(waittime/aMinMillisecs));

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

// Event listeners
playBtn.addEventListener('click', () => {
  //const isChecked = musicContainer.classList.contains('play');
  const isChecked = playBtn.checked;

  if (isChecked) {
    songIndex = 0;
  	loadSong(songs[songIndex]);
    startSong();
  } else {
  	stopSong();
  }
});

// Song ends
audio.addEventListener('ended', nextAction1);

// Statue repeat freq
statuefreq.addEventListener('change', onStatueFreqChanged);

// statue over timing
statueoverfreq.addEventListener('change', onStatueOverTimingUpdate);
