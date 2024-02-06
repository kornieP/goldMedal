
async function processData() {
    try {
      // Fetch the data from the CSV file using a promise-based approach
        let data = await d3.csv("https://raw.githubusercontent.com/kornieP/goldMedal/main/goldMedal.csv");
        const rx=200, ir = 0, h=40, rotation = 140, ry=50

      // Process the data using d3.pie()
      let _data = d3.pie().sort(null).value(function (d) { return d.Value; })(data).map(d => {
        return Object.assign(d, {
          startAngle: d.startAngle + (Math.PI * 2 * (rotation % 360) / 360),
          endAngle: d.endAngle + (Math.PI * 2 * (rotation % 360) / 360),
          color: generateRandomHexColor(),
        })
    });
  
        _data.map(d=>d.endAngle).map(d=>d/Math.PI*180).map(d=>Math.round(d))
        _data.map(d=>d.startAngle).map(d=>d/Math.PI*180).map(d=>Math.round(d))
        function generateRandomHexColor() {
            return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
          }

        function pieTop(d, rx, ry, ir ){
            // If angles are equal, then we got nothing to draw
            if (d.endAngle - d.startAngle == 0) return "M 0 0";
            // Calculating shape key points
            var sx = rx * Math.cos(d.startAngle),
                sy = ry * Math.sin(d.startAngle),
                ex = rx * Math.cos(d.endAngle),
                ey = ry * Math.sin(d.endAngle);
            // Creating custom path based on calculation
            var ret = [];
            ret.push("M", sx, sy, "A", rx, ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "1", ex, ey, "L", ir * ex, ir * ey);
            ret.push("A", ir * rx, ir * ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "0", ir * sx, ir * sy, "z");
            return ret.join(" ");
        }
        function pieOuter(d, rx, ry, h ){
            // Process corner Cases
            if (d.endAngle == Math.PI * 2 && d.startAngle > Math.PI && d.startAngle < Math.PI * 2) {
                return ""
            }
            if (d.startAngle > Math.PI * 3 && d.startAngle < Math.PI * 4 &&
                d.endAngle > Math.PI * 3 && d.endAngle <= Math.PI * 4) {
                return ""
            }
            // Reassign startAngle  and endAngle based on their positions
            var startAngle = d.startAngle;
            var endAngle = d.endAngle;
            if (d.startAngle > Math.PI && d.startAngle < Math.PI * 2) {
                startAngle = Math.PI;
                if (d.endAngle > Math.PI * 2) {
                    startAngle = 0;
                }
            }
            if (d.endAngle > Math.PI && d.endAngle < Math.PI * 2) {
                endAngle = Math.PI;
            }
            if (d.startAngle > Math.PI * 2) {
                startAngle = d.startAngle % (Math.PI * 2);
            }
            if (d.endAngle > Math.PI * 2) {
                endAngle = d.endAngle % (Math.PI * 2);
                if (d.startAngle <= Math.PI) {
                    endAngle = Math.PI;
                    startAngle = 0
                }
            }
            if (d.endAngle > Math.PI * 3) {
                endAngle = Math.PI
            }
            if (d.startAngle < Math.PI && d.endAngle >= 2 * Math.PI) {
                endAngle = Math.PI;
                startAngle = d.startAngle
            }
        
            // Calculating shape key points
            var sx = rx * Math.cos(startAngle),
                sy = ry * Math.sin(startAngle),
                ex = rx * Math.cos(endAngle),
                ey = ry * Math.sin(endAngle);
        
            // Creating custom path  commands based on calculation
            var ret = [];
            ret.push("M", sx, h + sy, "A", rx, ry, "0 0 1", ex, h + ey, "L", ex, ey, "A", rx, ry, "0 0   0", sx, sy, "z");
        
            // If shape is big enough, that it needs two separate outer shape , then draw second shape as well
            if (d.startAngle < Math.PI && d.endAngle >= 2 * Math.PI) {
                startAngle = 0;
                endAngle = d.endAngle;
                var sx = rx * Math.cos(startAngle),
                    sy = ry * Math.sin(startAngle),
                    ex = rx * Math.cos(endAngle),
                    ey = ry * Math.sin(endAngle);
                ret.push("M", sx, h + sy, "A", rx, ry, "0 0 1", ex, h + ey, "L", ex, ey, "A", rx, ry, "0 0   0", sx, sy, "z");
            }
        
            // Assemble shape commands
            return ret.join(" ");
        }
        const margin2 = {top: 10, right: 30, bottom: 90, left: 40},
        width2 = 1980 - margin2.left - margin2.right,
        height2 = 1080 - margin2.top - margin2.bottom;
        const svgNode = d3.select('#pieChart') 
          .append('svg')
          .attr('width', width2 + margin2.left + margin2.right)
          .attr('height', height2 + margin2.top + margin2.bottom)

        svgNode.append("g").attr("id","test");            
        const id = "test", x =width2/2, y =height2/2
        var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
        .attr("class", "slices");
      slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
        .style("fill", function(d) { return d3.hsl(d.color).darker(0.7); })
        .attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
        .each(function(d){this._current=d;})
      //.style("stroke", function(d) { return d3.hsl(d.color).darker(0.7); })
              //     
      slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
        .style("fill", function(d) { return d.color; })
        .style("stroke", function(d) { return d.color; })
        .attr("d",function(d){ return pieTop(d, rx, ry, ir);})
        .each(function(d){this._current=d;})
        console.log(test)
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  }
  
  // Call the async function
  processData();
