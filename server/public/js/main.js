// prevent user scroll on mobile phone
document.addEventListener('touchmove', function (e) { e.preventDefault() }, false)

function handleSubmit (form) {
  const action = $(form).attr('action')
  const params = $(form).serialize()
  const url = `${action}?${params}`

  $.get(url)
    .fail(function () {
      alert('failed to send message.')
    });
}

function like (type) {
  const url = `/like?image=${type}`

  $.get(url)
    .fail(function () {
      alert('failed to like.')
    })
}

// ボタンのコメント反映
$(function () {
  FastClick.attach(document.body)
})
$auxiliary = $('input[name="auxiliary"]');
$auxiliary.on('click', function(e) {
  $comment = $('#comment').val();
  $('#comment').val($comment + $(this).val());
});


// プレビュー機能
$(function () {
  let preview_str = 'Hedgehogs';

  $('input[name="size"]').on('click', function(e) {
    console.log("OK");
    let $size = $(this).val();
    $('#preview').text(preview_str);
    $('#preview').css('font-size', $size);
  });
});