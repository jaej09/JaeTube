var VideoPlayer = (function() {
  let $videoContainer, $video, $volumeBtn, $playBtn, $expandBtn;

  function handlePlayBtnClick() {
    if ($video.paused) $video.play();
    else $video.pause();
  }

  function init() {
    $videoContainer = document.querySelector('.video-player');
    console.log('ok');

    if ($videoContainer) {
      $video = $videoContainer.querySelector('video');
      $volumeBtn = $videoContainer.querySelector('.button-volume');
      $playBtn = $videoContainer.querySelector('.button-play');
      $expandBtn = $videoContainer.querySelector('.button-expand');

      $playBtn.addEventListener('click', handlePlayBtnClick);
    }
  }

  return { init };
})();

VideoPlayer.init();
