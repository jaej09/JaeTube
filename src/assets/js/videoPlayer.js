const { default: getBlobDuration } = require('get-blob-duration');

var VideoPlayer = (function() {
  let $videoContainer, $video, $volumeBtn, $playBtn, $expandBtn, $currentTime, $totalTime, $rangeBtn;
  let playTime = null;

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
   * 여기서 자세한 필요한 기능을 찾으면 됨
   * Read Only - Value를 수정할 수 없음 (.muted 경우는 Read Only가 아니기 때문에 수정이 가능함)
   */

  function handleVolumeBtnClick() {
    if ($video.muted) {
      $video.muted = false;
      $volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      $rangeBtn.value = $video.volume; // muted 되었다고 해도, 원래 $video.volume이 가지고 있었던 value를 기억하고 있음
    }
    else {
      $rangeBtn.value = 0;
      $video.muted = true;
      $volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  }

  function handlePlayBtnClick() {
    if ($video.paused) {
      $video.play();
      $playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      if (!playTime) getCurrentTime();
    }
    else {
      $video.pause();
      $playBtn.innerHTML = '<i class="fas fa-play"></i>';
      if (playTime) removeInterval();
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      // #video가 아닌 $videoContainer에 fullscreen 설정을 해야 전체화면 클릭시 controls까지 보임
      $videoContainer
        .requestFullscreen()
        .catch((err) => alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`));
      $videoContainer.classList.add('is-fullscreen');
      $expandBtn.innerHTML = '<i class="fas fa-compress"></i>';
    }
    else {
      document.exitFullscreen();
      $videoContainer.classList.remove('is-fullscreen');
      $expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  }

  function formatDate(seconds) {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (totalSeconds < 10) totalSeconds = `0${totalSeconds}`;
    return `${hours}:${minutes}:${totalSeconds}`;
  }

  function getCurrentTime() {
    playTime = setInterval(setCurrentTime, 1000);
  }

  function removeInterval() {
    clearInterval(playTime);
    playTime = null;
  }

  function setCurrentTime() {
    /**
     * 51:00 / 52:00 
     * 51초에서 비디오는 끝이나고 다시 0으로 바뀌는 문제 => 51.9초는 51초로 보이기 때문에 발생하는 것 
     * Math.floor을 활용해서 해결
     */
    $currentTime.innerHTML = formatDate(Math.floor($video.currentTime));
  }

  // 비디오가 전부 로드되었을 시에만 setTotalTime() 실행됨
  async function setTotalTime() {
    // console.log($video.src); // 다음 결과 값 리턴함 => https://jaetube.s3.ap-northeast-2.amazonaws.com/video/e06f48bd1514c6b501ce5cfa18a20adb
    const blob = await fetch($video.src).then((response) => response.blob()); // $video.src를 받은 다음 서버에 요청해서 응답을 받으면 blob으로 변환
    const duration = await getBlobDuration(blob);

    const totalTimeString = formatDate(duration);
    $totalTime.innerHTML = totalTimeString;
    getCurrentTime();
  }

  function handleEnded() {
    registerView();

    $video.currentTime = 0;
    handlePlayBtnClick(); // 일시정지 => 재생버튼으로 변경
    removeInterval(playTime);
  }

  function handleDrag(evt) {
    evt.preventDefault();

    const { target: { value } } = evt;
    $video.volume = value;

    if (value >= 0.6) $volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    else if (value >= 0.2) $volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    else $volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }

  function registerView() {
    const videoId = window.location.href.split('/videos/')[1]; // URL 중 /videos/ 기준으로 array 값 두개를 반환! 즉 http://localhost:4000/videos/5f8c8d0e56645f2381873d5a => ['http://localhost:4000', '5f8c8d0e56645f2381873d5a']
    fetch(`/api/${videoId}/view`, {
      method : 'POST' // 데이터베이스를 변경할 필요 없으면 GET, 데이터베이스 변경이 필요하면 POST
    });
  }

  function init() {
    $videoContainer = document.querySelector('.video-player');

    /**
     * 자바스크립트는 모든 페이지 footer에서 로드되기 때문에, 
     * .video-player가 없는 페이지에서도 로드 됨
     * 위 경우 .video-player은 null 이기 때문에 오류가 발생함
     * 오류를 방지하기 위해 .video-player 값이 발견되는 경우만 아래 코드 실행
     */
    if ($videoContainer) {
      $video = $videoContainer.querySelector('video');
      $volumeBtn = $videoContainer.querySelector('.button-volume');
      $playBtn = $videoContainer.querySelector('.button-play');
      $expandBtn = $videoContainer.querySelector('.button-expand');
      $currentTime = $videoContainer.querySelector('.duration__current');
      $totalTime = $videoContainer.querySelector('.duration__total');
      $rangeBtn = $videoContainer.querySelector('.button-volume-range');

      $volumeBtn.addEventListener('click', handleVolumeBtnClick);
      $playBtn.addEventListener('click', handlePlayBtnClick);
      $expandBtn.addEventListener('click', toggleFullscreen);
      $video.addEventListener('loadedmetadata', setTotalTime); // 비디오가 전부 로드 될 때까지 기다렸다가 setTotalTime 실행
      $video.addEventListener('ended', handleEnded);
      $rangeBtn.addEventListener('input', handleDrag);

      // Initialize Value
      $video.volume = 0.8; // Default volume
    }
  }

  return { init };
})();

VideoPlayer.init();
