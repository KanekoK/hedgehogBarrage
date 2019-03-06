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
// $(function () {
//   let preview_str = 'Hedgehogs';

//   $('input[name="size"]').on('click', function(e) {
//     console.log("OK");
//     let $size = $(this).val();
//     $('#preview').text(preview_str);
//     $('#preview').css('font-size', $size);
//   });
// });

// NGワードチェック
function hasNGWords(str, ngwords) {
  for(let i = 0; i < ngwords.length; i++) {
    if(~str.indexOf(ngwords[i])) return true;
  }
  return false;
}

// JSONデータの読み込み
let ngwords = [];
$.getJSON('data/ng.json', json => {
  ngwords = json.data;
});

// コメント文字列チェック
$('#submit_btn').on('click', function (e) {
  e.preventDefault();
  let comment = $('#comment').val();
  if (comment == '') { return false; }
  else if (hasNGWords(comment, ngwords)) {
    alert("不適切なワードが含まれています。>_<");
    $('#comment').val("")
  } else {
    console.log("送信");
    handleSubmit($('form#comment_form'));
    $('#comment').val("");
    return false;
  }
});