import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
function saveTime({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}
function restorePlay() {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime));
  }
}
player.on('timeupdate', throttle(saveTime, 1000));
restorePlay();
