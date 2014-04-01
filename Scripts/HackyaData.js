
$(function(){

  // checks number of fields
  var fieldnum = function (str){
    var array = str.split('\t');
    for (var i = 0 ; i<array.length ; i++){
      for (var j = 0 ; j<array[i].length ; j++){
        if (array[i].charCodeAt(j) === 32){
          return i+1;
        }
      }
    }
  };

  // parses to 2-dimensional array
  var parsedString = function (str, columns){
    var result = [];
    var array = str.split('\t');

    var row = [];
    var left, right;
    var count = 0;
    for (var i = 0 ; i < array.length ; i++){
      if ( (count+1) % columns){
        row.push(array[i].substr());
        count ++;
      } else {
        left = array[i].slice(0,array[i].indexOf(' '));
        right = array[i].slice(array[i].indexOf(' ')+1);
        row.push(left);
        result.push(row);
        row = [right];
        count = 1;
      }
    }
    return result;
  };

  var pivotDataObj = function(matrix){
    var main = [];
    var obj;
    for (var record = 1; record < matrix.length ; record++){
      obj = {};
      for (var field = 0 ; field < matrix[0].length ; field++){
        obj[matrix[0][field]] = matrix[record][field];
      }
      main.push(obj);
    }
    return main;
  };

  var pivotDataArr = function(matrix){
    var main = [];
    var arr;
    for (var field = 0 ; field < matrix[0].length ; field++){
        arr = [];
        for (var record = 0; record < matrix.length ; record++){
          arr.push(matrix[record][field]);
      }
      main.push(arr);
    }
    return main;
  };

  var categorizeMetrics = function (matrix){
    var isMetric = [];
    for (var i = 0 ; i< matrix.length ; i++){
      isMetric[i] = true;
      for (var j = 1 ; j< matrix[i].length  && j<10 ; j++){
        if (isNaN(matrix[i][j]) || matrix[i][j]==='') {
          isMetric[i]=false;
        }
      }
    }
    return isMetric;
  };


  var categorizeDates = function (matrix){
    var isDate = [];
    for (var i = 0 ; i< matrix.length ; i++){
      isDate[i] = true;
      for (var j = 1 ; j< matrix[i].length  && j<10 ; j++){
        test = Date.parse(matrix[i][j]);
        if (isNaN(test) || test<0) {
          isDate[i]=false;
        }
      }
    }
  };



  // keydown event trigger
  $( "#box" ).keydown(function(event) {

    if(event.which === 13){
      console.log('hello');
      event.preventDefault();
      var data = $( "#box" ).val();
      $( "#box" ).val('');

      var columns = fieldnum(data);
      var dataObj = pivotDataObj(parsedString(data, columns));
      var dataArr = pivotDataArr(parsedString(data, columns));
      var rows = dataObj.length;

      isMetric = categorizeMetrics(dataArr);
      isDate = categorizeDates(dataArr);


        console.log(dataArr.length);
      for (var i = 0 ; i < dataArr.length; i++){
        console.log("it works");
        var $field = $("<li>");
        $field.text(dataArr[i][0]);
        $("#Fields").append($field);
        // if (isMetric[i]){

        // }
      }

      // $("#Charts").append("<p>");
      $("#Charts").append($('<div id="render" >').css("height","150px").css("width","300px"));


      var chart = c3.generate({
        bindto: '#render',
        data: {
          columns: [
            ['y', 100, 200, 300, 400, 150, 250]
          ]
        }
      });






    }

  });




});

  // Create chart area
  // var boardW = 0.5 * window.innerWidth;
  // var boardH = 0.5 * window.innerHeight;
  // var board = d3.select("body").append("svg")
  //   .attr("class", "board")
  //   .attr("width", boardW)
  //   .attr("height", boardH);




      // board.selectAll("circle").data(points).enter()
      //   .append("circle")
      //   .attr("cx",function(d){return d.Axis1;})
      //   .attr("cy",function(d){return d.Axis2;})
      //   .attr("r",10);


      // Generate data points
      // var r = 10;
      // for(var i = 0; i < 5; i++) {
      //   board.append("circle")
      //     .attr("class", "enemy")
      //     .attr("r", r)
      //     .attr("fill", "black")
      //     .attr("cx", Math.random() * (board.attr("width") - 4 * r) + 2 * r)
      //     .attr("cy", Math.random() * (board.attr("height") - 4 * r) + 2 * r);
      // }





