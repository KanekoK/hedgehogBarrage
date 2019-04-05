const ipcRenderer = require('electron').ipcRenderer;

moment.locale('ja');

let heartCount = 0;
let goodCount = 0;
ipcRenderer.on('set_data', function(event, data) {
    heartCount = data.heart
    goodCount = data.good
});

function engagement(data_type) {
  if (data_type == "good") {
    // ここの数をリアルタイムに変更する
    return goodCount;
  } else {
    // ここの数をリアルタイムに変更する
    return heartCount;
  }
}

let goodData = []
let likeData = []

for (var i = 0; i < 1000; i++) {
goodData.push({
  name: "aaa",
  value: [
    "2020/10/11",
    10
  ]
});

likeData.push({
  name: "Like",
  value: [
    "2020/10/11",
    20
  ]
});
}


// let data = {
//     labels: times,
//     datasets: [{
//       label: 'いいね数',
//       borderColor: 'rgb(54, 162, 235)',
//       backgroundColor: 'rgba(54, 162, 235, 0.5)',
//       lineTension: 0,
//       data_type: 'good',
//     },
//     {
//       label: 'ハート数',
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       lineTension: 0,
//       data_type: 'like',
//     },
//   ]
// };
let time = moment().format('HH:mm:ss');


//   return {
//       name: time.toString(),
//       value: [
//           [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
//           10
//       ]
//   }
// }

var myChart = echarts.init(document.getElementById('main'));

let option = {
  title: {
      text: 'エンゲージグラフ'
  },
  tooltip: {
      trigger: 'axis',
      formatter: function (params) {
          params = params[0];
          var date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
      },
      axisPointer: {
          animation: false
      }
  },
  xAxis: {
      type: 'time',
      splitLine: {
          show: false
      }
  },
  yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
          show: false
      }
  },
  series: [{
      name: 'Good',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: goodData,
      animationDelay: function (idx) {
          return 1
      }
  },{
    name: 'Like',
    type: 'line',
    showSymbol: false,
    hoverAnimation: false,
    data: likeData,
    animationDelay: function (idx) {
        return 1
    }
  },
  ]
};

setInterval(function () {

  for (var i = 0; i < 1; i++) {
      goodData.push(goodData);
      likeData.push(likeData);
  }

  myChart.setOption({
      series: [{
        data: goodData
      },{
        data: likeData
      }]
  });
}, 300);

myChart.setOption(option);

// ======== //

ipcRenderer.on('comment', function(event, comment) {
  comment = comment.body;
  let time = moment().format('HH:mm:ss');
  $comments = $('#comments');
  $comments.append('<li>' + time + "        " + comment + '</li>');
  // コメント欄、自動スクロール
  $comments.animate({scrollTop: $comments[0].scrollHeight}, 'fast');
});


