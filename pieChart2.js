
d3.csv("https://raw.githubusercontent.com/kornieP/goldMedal/main/goldMedal.csv").then( function(data) {    
// X axis
var data2 = d3.pie().sort(null).value(function(d) {return d.Value;})(data).map(d=>{
    return Object.assign(d,{
          startAngle: d.startAngle + (Math.PI * 2 * (40 % 360) / 360),
          endAngle: d.endAngle + (Math.PI * 2 * (40 % 360) / 360),
    })
  })
console.log(data2)
svg2.append("g")
  .attr("transform", `translate(0, ${height2})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");


})