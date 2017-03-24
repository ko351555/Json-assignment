<!DOCTYPE html>
<meta charset="utf-8">

<head>
<style>

.bar{
  fill: steelblue;
}

.bar:hover{
  fill: brown;
}

.axis {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

</style>
</head>

<body>

<script src="http://d3js.org/d3.v3.min.js"></script>

<script>
// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 40},
width = 600 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")


var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(10);


// add the SVG element
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("jsonFile.json", function(error, data) {

  data.forEach(function(d) {
    d.age = d.age;
    d.literacy = +d.literacy;
  });

// scale the range of the data
x.domain(data.map(function(d) { return d.age; }));
y.domain([0, d3.max(data, function(d) { return d.literacy; })]);

// add axis
svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis)
.selectAll("text")
.style("text-anchor", "end")
.attr("dx", "-.8em")
.attr("dy", "-.55em")
.attr("transform", "rotate(-90)" );

svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 5)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Literacy");


// Add bar chart
svg.selectAll("bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x", function(d) { return x(d.age); })
.attr("width", x.rangeBand())
.attr("y", function(d) { return y(d.literacy); })
.attr("height", function(d) { return height - y(d.literacy); });

});

</script>

</body>

Mark as read (esc)Mark as read