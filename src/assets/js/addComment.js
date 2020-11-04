import axios from 'axios';
import passport from 'passport';

var AddComment = (function() {
  let $form, $input, $commentContainer, $commentCount;

  async function sendComment(comment) {
    const videoId = window.location.href.split('/videos/')[1];
    const response = await axios({
      url    : `/api/${videoId}/comment`,
      method : 'POST',
      data   : {
        comment
      }
    });

    if (response.status === 200) fakeComment(comment);
  }
  function increaseNumber() {
    $commentCount.innerHTML = parseInt($commentCount.innerHTML, 10) + 1;
  }

  function fakeComment(comment) {
    const $media = document.createElement('div');
    const $img = document.createElement('img');
    const $mediaBody = document.createElement('div');
    const $p = document.createElement('p');
    $p.innerHTML = comment;

    $media.classList.add('media');
    $img.classList.add('align-self-start');
    $img.classList.add('mr-3');
    $mediaBody.classList.add('media-body');

    $mediaBody.appendChild($p);
    $media.appendChild($img);
    $media.appendChild($mediaBody);
    $commentContainer.prepend($media); // 제일 앞에 오기를 원하면, prepend VS 제일 밑에 나오길 원하는 .append

    increaseNumber();
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    let comment = $input.value;
    sendComment(comment);

    $input.value = '';
    comment = null;
  }

  function init() {
    $form = document.querySelector('.video-detail__comments-form');

    if ($form) {
      $input = $form.querySelector('input');
      $commentContainer = document.querySelector('.video-detail__comments-list');
      $commentCount = document.querySelector('.video__comment-number');
      $form.addEventListener('submit', handleSubmit);
    }
  }

  return { init };
})();

AddComment.init();
