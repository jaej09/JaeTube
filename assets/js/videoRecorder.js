var VideoRecorder = (function() {
  let $video, $button, $alert;
  let videoRecorder, streamObject;

  async function getVideo() {
    try {
      // 참고: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      // 유저가 응답할 때까지 기다림
      const stream = await navigator.mediaDevices.getUserMedia({
        audio : true,
        video : {
          width  : { ideal: 1280 },
          height : { ideal: 720 }
        }
      });

      $alert.classList.remove('is-displayed');
      $alert.classList.add('is-hidden');

      streamObject = stream;

      $video.srcObject = stream; // <video></video>는 object이기 때문에 src 설정을 이런 방식으로 해야 함
      $video.play();
      $video.muted = true; // 오디오를 녹음하길 원하지만, 녹음되는 오디오를 녹화 중에 듣고 싶지는 않을 것이기 때문에 muted 추가

      // 여기까지는 비디오 화면을 가져온 것뿐, 실제 녹화를 진행하는 것은 아님
      // startRecording() 함수를 통해 녹화진행
      startRecording();
    } catch (err) {
      console.error(err);
      $alert.classList.remove('is-hidden');
      $alert.classList.add('is-displayed');
    } finally {
      // try, catch 둘 중 하나가 실행되고 나면 finally 실행 됨
      $button.removeEventListener('click', getVideo);
    }
  }

  function startRecording() {
    // 참고: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start(); // mediaRecorder.start(timeslice) => timeslice에 1000을 주면 매초마다 정보를 보내준다
    videoRecorder.addEventListener('dataavailable', handleVideoData); // 녹화가 끝나야 파일을 얻을 수 있음

    $button.innerHTML = 'Stop Recording';
    $button.addEventListener('click', stopRecording);
  }

  function stopRecording() {
    videoRecorder.stop();

    $button.innerHTML = 'Start Recording';
    $button.removeEventListener('click', stopRecording);
    $button.addEventListener('click', getVideo);
  }

  function handleVideoData(evt) {
    /**
     * 여기서 data는 blob 이다
     * blob은 Binary Large Object를 뜻하며, 바이너리 형태로 큰 객체를 저장할 것
     * 여기서 이 큰 객체라는 것은 주로 이미지, 비디오, 사운드 등과 같은 멀티미디어 객체들을 주로 가리킨다
     */
    const { data: videoFile } = evt; // blob 가져오는 것

    const link = document.createElement('a');
    link.href = URL.createObjectURL(videoFile); // URL.createObjectURL(object) => object: URL을 생성할 File, Blob, MediaSource 객체.
    link.download = 'recorded.webm'; // The download attribute is only used if the href attribute is set. The value of the attribute will be the name of the downloaded file.

    document.body.appendChild(link);
    link.click(); // Fake click
  }

  function init() {
    $video = document.querySelector('.video-recorder__video');

    if ($video) {
      $button = document.querySelector('.video-recorder__button');
      $alert = document.querySelector('.video-recorder__alert');

      $button.addEventListener('click', getVideo); // addEventListener은 element에 여러개 추가할 수 있는 반면, element.onclick = (?)의 경우 각 element별 하나의 이벤트만 추가 가능하다는 단점이 있음
    }
  }

  return { init };
})();

VideoRecorder.init();
