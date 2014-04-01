





// var chart = c3.generate({
//     data: {
//         columns: [
//             ['data1', 30, 200, 100, 400, 150, 250],
//             ['data2', 130, 100, 140, 200, 150, 50]
//         ],
//         type: 'bar'
//     },
//     bar: {
//         width: {
//             ratio: 0.5 // this makes bar width 50% of length between ticks
//         }
//         // or
//         //width: 100 // this makes bar width 100px
//     }
// });




// // chart_scatter.js
// var chart = c3.generate({
//     data: {
//         xs: {
//             setosa: 'setosa_x',
//             versicolor: 'versicolor_x',
//         },
//         // iris data from R
//         columns: [
//             ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
//             ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
//             ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
//             ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
//         ],
//         type: 'scatter'
//     },
//     axis: {
//         x: {
//             label: 'Sepal.Width'
//         },
//         y: {
//             label: 'Petal.Width'
//         }
//     }
// });



// // simple_multiple.js
// var chart = c3.generate({
//     data: {
//         columns: [
//             ['data1', 30, 200, 100, 400, 150, 250],
//             ['data2', 50, 20, 10, 40, 15, 25]
//         ]
//     }
// });



// //# simple_xy_multiple.js
// var chart = c3.generate({
//     data: {
//         xs: {
//             'data1': 'x1',
//             'data2': 'x2',
//         },
//         columns: [
//             ['x1', 10, 30, 45, 50, 70, 100],
//             ['x2', 30, 50, 75, 100, 120],
//             ['data1', 30, 200, 100, 400, 150, 250],
//             ['data2', 20, 180, 240, 100, 190]
//         ]
//     }
// });



// //# chart_bar_negative.js
// var chart = c3.generate({
//     data: {
//         columns: [
//             ['data1', 30, -200, -100, 400, 150, 250],
//             ['data2', -100, 100, -40, 100, -150, -50]
//         ],
//         type: 'bar'
//     },
//     grid: {
//         y: {
//             lines: [{value: 0}]
//         }
//     }
// });




// //# chart_pie.js
// var chart = c3.generate({
//     data: {
//         // iris data from R
//         columns: [
//             ['data1', 30],
//             ['data2', 120],
//         ],
//         type : 'pie',
//     },
//     pie: {
//         onclick: function (d, i) { console.log(d, i); },
//         onmouseover: function (d, i) { console.log(d, i); },
//         onmouseout: function (d, i) { console.log(d, i); }
//     }
// });




// //# chart_combination.js
// var chart = c3.generate({
//     data: {
//         columns: [
//             ['data1', 30, 20, 50, 40, 60, 50],
//             ['data2', 200, 130, 90, 240, 130, 220],
//             ['data3', 300, 200, 160, 400, 250, 250],
//             ['data4', 200, 130, 90, 240, 130, 220],
//             ['data5', 130, 120, 150, 140, 160, 150],
//             ['data6', 90, 70, 20, 50, 60, 120],
//         ],
//         type: 'bar',
//         types: {
//             data3: 'spline',
//             data4: 'line',
//             data6: 'area',
//         },
//         groups: [
//             ['data1','data2']
//         ]
//     }
// });



// //# chart_spline.js
// var chart = c3.generate({
//     data: {
//         columns: [
//             ['data1', 30, 200, 100, 400, 150, 250],
//             ['data2', 130, 100, 140, 200, 150, 50]
//         ],
//         type: 'spline'
//     }
// });


// //# chart_bar_stacked.js
// var chart = c3.generate({
//     data: {
//         columns: [
//             ['data1', -30, 200, 200, 400, -150, 250],
//             ['data2', 130, 100, -100, 200, -150, 50],
//             ['data3', -230, 200, 200, -300, 250, 250]
//         ],
//         type: 'bar',
//         groups: [
//             ['data1', 'data2']
//         ]
//     },
//     grid: {
//         y: {
//             lines: [{value:0}]
//         }
//     }
// });

// setTimeout(function () {
//     chart.groups([['data1', 'data2', 'data3']])
// }, 1000);

// setTimeout(function () {
//     chart.load({
//         columns: [['data4', 100, -50, 150, 200, -300, -100]]
//     });
// }, 1500);

// setTimeout(function () {
//     chart.groups([['data1', 'data2', 'data3', 'data4']])
// }, 2000);



// # categorized.js
// var chart = c3.generate({
//     data: {
//         columns: [
//             ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250]
//         ]
//     },
//     axis: {
//         x: {
//             type: 'categorized',
//             categories: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9']
//         }
//     }
// });




// # axes_y_tick_format.js
// var chart = c3.generate({
//     data: {
//         columns: [
//             ['sample', 30, 200, 100, 400, 150, 2500]
//         ]
//     },
//     axis : {
//         y : {
//             tick: {
//                 format: d3.format("$,")
// //                format: function (d) { return "$" + d; }
//             }
//         }
//     }
// });



// # axes_label_position.js
// var chart = c3.generate({
//     data: {
//         columns: [
//             ['sample', 30, 200, 100, 400, 150, 250]
//         ]
//     },
//     axis: {
//         y: {
//             label: {
//                 text: 'Y Label',
//                 position: 'outer-middle'
//                 // inner-top : default
//                 // inner-middle
//                 // inner-bottom
//                 // outer-top
//                 // outer-middle
//                 // outer-bottom
//             }
//         },
//         x: {
//             label: {
//                 text: 'X Label',
//                 position: 'outer-center'
//                 // inner-right : default
//                 // inner-center
//                 // inner-left
//                 // outer-right
//                 // outer-center
//                 // outer-left
//             }
//         }
//     }
// });

// # interaction_zoom.js
// var chart = c3.generate({
//     data: {
//         columns: [
//             ['sample', 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
//         ]
//     },
//     zoom: {
//         enabled: true
//     }
// });

