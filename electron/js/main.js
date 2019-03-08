var ctx = document.getElementById("myChart").getContext('2d');

// var myLineChart = new Chart(ctx, {
//     type: 'line',
//     data: data,
//     options: options
// });

var myChart = new Chart(ctx, {
    type: 'line',
    data: [{
        x: new Date(),
        y: 1
    }, {
        t: new Date(),
        y: 10
    }],
    options: {
        animation: {
            duration: 0, // general animation time
        },
        hover: {
            animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
    }
});