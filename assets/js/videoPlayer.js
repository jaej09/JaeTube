var VideoPlayer = (function() {
  let $videoContainer, $video, $volumeBtn, $playBtn, $expandBtn;

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
   * 여기서 자세한 필요한 기능을 찾으면 됨
   * Read Only - Value를 수정할 수 없음 (.muted 경우는 Read Only가 아니기 때문에 수정이 가능함)
   */

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

  function openFullscreen() {
    // #video가 아닌 $videoContainer에 fullscreen 설정을 해야 전체화면 클릭시 controls까지 보임
    if ($video.requestFullscreen) $videoContainer.requestFullscreen();
    else if ($video.mozRequestFullScreen) $videoContainer.mozRequestFullScreen();
    else if ($video.webkitRequestFullscreen) $videoContainer.webkitRequestFullscreen();
    else if ($video.msRequestFullscreen) $videoContainer.msRequestFullscreen();

    if ($video.requestFullscreen || $video.mozRequestFullScreen || $video.webkitRequestFullscreen || $video.msRequestFullscreen) {
      $videoContainer.classList.add('is-active');
      $expandBtn.innerHTML = '<i class="fas fa-compress"></i>';
      $expandBtn.removeEventListener('click', openFullscreen);
      $expandBtn.addEventListener('click', closeFullscreen);
    }
  }

  function closeFullscreen() {
    // The exitFullscreen should be called on document object only
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();

    if (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen) {
      $videoContainer.classList.remove('is-active');
      $expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
      $expandBtn.removeEventListener('click', closeFullscreen);
      $expandBtn.addEventListener('click', openFullscreen);
    }
  }

  function init() {
    $videoContainer = document.querySelector('.video-player');

    if ($videoContainer) {
      $video = $videoContainer.querySelector('video');
      $volumeBtn = $videoContainer.querySelector('.button-volume');
      $playBtn = $videoContainer.querySelector('.button-play');
      $expandBtn = $videoContainer.querySelector('.button-expand');

      $volumeBtn.addEventListener('click', handleVolumeBtnClick);
      $playBtn.addEventListener('click', handlePlayBtnClick);
      $expandBtn.addEventListener('click', openFullscreen);
    }
  }

  return { init };
})();

VideoPlayer.init();
