
$(function(){

  // var icon = paper.path(M8.125,29.178l1.311-1.5l1.315,1.5l1.311-1.5l1.311,1.5l1.315-1.5l1.311,1.5l1.312-1.5l1.314,1.5l1.312-1.5l1.312,1.5l1.314-1.5l1.312,1.5v-8.521H8.125V29.178zM23.375,17.156c-0.354,0-5.833-0.166-5.833-2.917s0.75-8.834,0.75-8.834S18.542,2.822,16,2.822s-2.292,2.583-2.292,2.583s0.75,6.083,0.75,8.834s-5.479,2.917-5.833,2.917c-0.5,0-0.5,1.166-0.5,1.166v1.271h15.75v-1.271C23.875,18.322,23.875,17.156,23.375,17.156zM16,8.031c-0.621,0-1.125-2.191-1.125-2.812S15.379,4.094,16,4.094s1.125,0.504,1.125,1.125S16.621,8.031,16,8.031z).attr({fill: "#000", stroke: "none"});
  // $("pasteSignal").append(icon);


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
    return isDate;
  };


  var waterFallObj = function(dataObj){

    newObj = [];
    newObj.push(dataObj[0]);
    newObj[0]["cumPrevious"] = {};
    for (var key in dataObj[0]){
      newObj[0]["cumPrevious"][key] = 0;
    }

    for (var i = 1 ; i < dataObj.length-1 ; i++){
      newObj.push(dataObj[i]);
      newObj[i]["cumPrevious"] = {};
      for (var key in dataObj[i]){
        newObj[i]["cumPrevious"][key] = Number(newObj[i-1]["cumPrevious"][key]) + Number(newObj[i-1][key]);
      }
    }

    var lastIndex = dataObj.length-1;
    newObj.push(dataObj[lastIndex]);
    newObj[lastIndex]["cumPrevious"] = {};
    for (var key in dataObj[lastIndex]){
      newObj[lastIndex]["cumPrevious"][key] = 0;
    }

    return newObj;

  };



  var makeWaterfall = function ($div, watObj, gap, field){

    var height = $div.height();
    var width = $div.width();
    var barWidth = width / (watObj.length) - gap;

    var x = d3.scale.linear().domain([0, watObj.length]).range([0, width]);
    var y = d3.scale.linear().domain([
      Math.min(0,d3.min(watObj, function(d) {
        if (Object.keys(d["cumPrevious"]).length === 0){
          return Number(d[field]);
        } else {
          return Number(d[field])+Number(d["cumPrevious"][field]);
        }
      })),
      d3.max(watObj, function(d) {
        if (Object.keys(d["cumPrevious"]).length === 0){
          return Number(d[field]);
        } else {
          return Number(d[field])+Number(d["cumPrevious"][field]);
        }
      })])
      .rangeRound([0, height]);

    var chartArea = d3.selectAll($div)
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height);


    chartArea.selectAll("rect").data(watObj).enter()
      .append("svg:rect")
      .attr("x",function(d, i){return x(i);})
      .attr("y",function(d){
        if (Object.keys(d["cumPrevious"]).length === 0){
          return height - y(d[field]);
        }
        if(d[field] >= 0 ){
          return height - y(Number(d["cumPrevious"][field]) + Number(d[field]));
        } else {
          return height - y(Number(d["cumPrevious"][field]));
        }
      })
      .attr("height",function(d){
        if(d[field] >= 0){
          return y(Number(d[field]));
        } else {
          return y(Number(-d[field]));
        }
      })
      .attr("width", barWidth)
      .attr("fill", "#2d578b");

  };



  document.body.onpaste = function(e) {
    var data = e.clipboardData.getData("Text");
    e.preventDefault();

    var parsedData = [];
    var temp = data.split('\n');
    for (var k = 0 ; k < temp.length ; k++){
      parsedData.push(temp[k].split('\t'));
    }

    var dataObj = pivotDataObj(parsedData);
    var dataArr = pivotDataArr(parsedData);
    var rows = dataObj.length;

    isMetric = categorizeMetrics(dataArr);
    isDate = categorizeDates(dataArr);

    // updates field list
    var newtext;
    for (var i = 0 ; i < dataArr.length; i++){
      var $field = $("<li>");
      $field.addClass("list-group-item list-group-item-success");
      $field.text(dataArr[i][0]);
      if (isMetric[i]){
        $field.addClass("list-group-item list-group-item-danger");
        newtext = $field.text() + "  - Metric";
        $field.text(newtext);
      } else {
        if (isDate[i]){
          $field.addClass("list-group-item list-group-item-info");
          newtext = $field.text() + "  - Date";
          $field.text(newtext);
        } else {
          $field.addClass("list-group-item list-group-item-warning");
          newtext = $field.text() + "  - Dimension";
          $field.text(newtext);
        }
      }
      $("#Fields").append($field);
    }


    // console.log(dataObj);
    // console.log(waterFallObj(dataObj));
    $("#pasteSignal").text("Paste more data...");
    $("#pasteSignal").fadeOut(5000);
    $("#Charts").css("visibility","visible");

    makeWaterfall($("#Charts"), waterFallObj(dataObj), 10, "Stephan");




  };



});




