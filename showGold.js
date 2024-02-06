const margin1 = {top: 10, right: 30, bottom: 90, left: 40},
width1 = 1980 - margin1.left - margin1.right,
height1 = 1080 - margin1.top - margin1.bottom;
// append the svg object to the body of the page
const svg1 = d3.select("#graphGoldAll")
.append("svg")
.attr("width", width1 + margin1.left + margin1.right)
.attr("height", height1 + margin1.top + margin1.bottom)
.append("g")
.attr("transform", `translate(${margin1.left},${margin1.top})`);
d3.csv("https://raw.githubusercontent.com/kornieP/goldMedal/main/goldMedal.csv").then( function(data) {
    
// X axis
const x = d3.scaleBand()
  .range([ 0, width1 ])
  .domain(data.map(function(d) { return d.Year; }))
  .padding(1);
svg1.append("g")
  .attr("transform", `translate(0, ${height1})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 200])
  .range([ height1, 0]);
svg1.append("g")
  .call(d3.axisLeft(y));

// Lines
svg1.selectAll("myline")
  .data(data)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.Year); })
    .attr("x2", function(d) { return x(d.Year); })
    .attr("y1", function(d) { return y(d.Value); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

// Circles
svg1.selectAll("mycircle")
  .data(data)
  .join("circle")
    .attr("cx", function(d) { return x(d.Year); })
    .attr("cy", function(d) { return y(d.Value); })
    .attr("r", "4")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")
})