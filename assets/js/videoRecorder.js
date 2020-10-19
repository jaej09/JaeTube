var VideoRecorder = (function() {
  let $video, $button, $alert;

  async function startRecording() {
    try {
      // 참고: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true }); // 유저가 응답할 때까지 기다림

      $alert.classList.remove('is-displayed');
      $alert.classList.add('is-hidden');

      $video.srcObject = stream;
      $video.play();
      $video.muted = true; // 오디오를 녹음하길 원하지만, 녹음되는 오디오를 녹화 중에 듣고 싶지는 않을 것이기 때문에 muted 추가
    } catch (err) {
      console.error(err);

      $alert.classList.remove('is-hidden');
      $alert.classList.add('is-displayed');

      $button.removeEventListener('click', startRecording);
    }
  }

  function init() {
    $video = document.querySelector('.video-recorder__video');

    if ($video) {
      $button = document.querySelector('.video-recorder__button');
      $alert = document.querySelector('.video-recorder__alert');

      $button.addEventListener('click', startRecording);
    }
  }

  return { init };
})();

VideoRecorder.init();
