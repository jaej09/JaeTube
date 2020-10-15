var VideoPlayer = (function() {
  let $videoContainer, $video, $volumeBtn, $playBtn, $expandBtn;

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
   * 여기서 자세한 필요한 기능을 찾으면 됨
   * 
   */

  function handlePlayBtnClick() {
    if ($video.paused) {
      $video.play();
      $playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    else {
      $video.pause();
      $playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  function handleVolumeBtnClick() {
    if ($video.muted) {
      $video.muted = false;
      $volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    else {
      $video.muted = true;
      $volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  }

  function init() {
    $videoContainer = document.querySelector('.video-player');

    if ($videoContainer) {
      $video = $videoContainer.querySelector('video');
      $volumeBtn = $videoContainer.querySelector('.button-volume');
      $playBtn = $videoContainer.querySelector('.button-play');
      $expandBtn = $videoContainer.querySelector('.button-expand');

      $playBtn.addEventListener('click', handlePlayBtnClick);
      $volumeBtn.addEventListener('click', handleVolumeBtnClick);
    }
  }

  return { init };
})();

VideoPlayer.init();
