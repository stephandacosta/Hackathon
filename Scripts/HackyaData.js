
$(function(){


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



  var makeWaterfall = function ($div, watObj, gap, field, keys){


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
    .append("svg")
    .style({'padding-top':40, 'padding-bottom': 20})
    .attr("width", width)
    .attr("height", height);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    // .tickValues(keys);

    chartArea.append("g")
      .attr("class", "x axis")
      .attr("transform","translate(0," + height + ")")
      .call(xAxis);

    chartArea.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(field);

    // d3.selectAll("svg")
    // .append("g")
    // .attr("transform", "translate(0," + (height) + ")")
    // .call(d3.svg.axis()
    //             // .scale.ordinal()
    //             .tickValues(keys));



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
      .attr("fill", function(d){
        if(d[field] >= 0){
          return "green";}
        else {
          return "red";
        }
      });

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
    $("#Charts").css("visibility","visible");
    $("#pasteSignal").remove();
    $("#msg").text("Paste more data...");
    $("#msg").fadeOut(5000);

    xAxis = dataArr[0].slice(1);

    for (var i = 0 ; i < isMetric.length ; i++){
      if(isMetric[i]){
        makeWaterfall($("#Charts"), waterFallObj(dataObj), 10, dataArr[i][0], xAxis);
      }
    }




  };



});




