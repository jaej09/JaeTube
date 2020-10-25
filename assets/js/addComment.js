import axios from 'axios';

var AddComment = (function() {
  let $form, $input;

  async function sendComment(comment) {
    const videoId = window.location.href.split('/videos/')[1];
    const response = await axios({
      url    : `/api/${videoId}/comment`,
      method : 'POST',
      data   : {
        comment
      }
    });

    console.log(response);
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
      $form.addEventListener('submit', handleSubmit);
    }
  }

  return { init };
})();

AddComment.init();
