
const margin = {top: 10, right: 30, bottom: 90, left: 40},
width = 1000 - margin.left - margin.right,
height = 1080 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#graphGoldMax")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);
d3.csv("https://raw.githubusercontent.com/kornieP/goldMedal/main/goldMedalMax.csv").then( function(data) {
    
// X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Year; }))
  .padding(1);
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 200])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Lines
svg.selectAll("myline")
  .data(data)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.Year); })
    .attr("x2", function(d) { return x(d.Year); })
    .attr("y1", function(d) { return y(d.Value); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(data)
  .join("circle")
    .attr("cx", function(d) { return x(d.Year); })
    .attr("cy", function(d) { return y(d.Value); })
    .attr("r", "8")
    .style("fill", "#EDAB1F")
    .attr("stroke", "#FBCC09")

svg.append('line')
.attr('class', 'horizontal-line')
.attr('x1', 0) // Start X coordinate (usually 0 for left alignment)
.attr('y1', function(d) { return y(77);}) // Y coordinate based on your chosen value
.attr('x2', 800) // End X coordinate (usually chart width)
.attr('y2', function(d) { return y(77);}) // End Y coordinate remains the same
.attr('stroke', 'gray') // Line color
.attr('stroke-width', 0.5) // Line width
svg.append("text")
	.text("average: 77")
	.attr("x", 800)
	.attr("y", function(d) { return y(77);});
})