document.body.style.backgroundImage = "url('http://www.freeiconspng.com/uploads/smoke-png-transparent-smoke-png-image-smokes-25.png')";

var width = document.getElementById('svg') .clientWidth;
var height = document.getElementById('svg') .clientHeight;
var marginLeft = 0;
var marginTop = 0;
var nestedData = [];
var dataRec;
var dataMed;
var state;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var albersProjection = d3.geoAlbersUsa()
    .scale(1100)
    .translate([(width/2) , (height/2)]);

var stateLookupMed = d3.map();
var stateLookupRec = d3.map();

var colorScale = d3.scaleOrdinal()
    .range(['#145a32', '#196f3d','#1e8449', '#27ae60','#229954','lightGreen'])
    .domain(['1932-1933','1934-1964','1965-1970','1971-1989','1990-2000','2001-2017']);

var path = d3.geoPath()
    .projection(albersProjection);

var sortOrder = "Medicinal";

d3.queue()
    .defer(d3.json, "./cb_2016_us_state_20m.json")
    .defer(d3.csv, "./finalData.csv")
    .await(function(err, mapData, finalData) {

        finalData.forEach(function (d) {
            console.log(d);
            stateLookupMed.set(d.state, +d.dataMed);
            stateLookupRec.set(d.state, +d.dataRec);
        });

        svg.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "feature")
            .attr('fill', function (d) {
                console.log(d, stateLookupRec.get(d.properties.STUSPS));
                return colorScale(stateLookupRec.get(d.properties.STUSPS));
            })
            .attr('stroke', 'lightGrey')
            .attr('stroke-width', 2.5)
            .on('mouseover', function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 1);
                div.html(d.properties.NAME +"<br/>"+ "Medicinal: " +stateLookupMed.get(d.properties.STUSPS) +"<br/>"+ "Recreational: " +stateLookupRec.get(d.properties.STUSPS))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");
            })
            .on('mousemove', function (d) {
                div.html(d.properties.NAME +"<br/>"+ "Medicinal: " +stateLookupMed.get(d.properties.STUSPS) +"<br/>"+ "Recreational: " +stateLookupRec.get(d.properties.STUSPS))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0)
            })
        console.log(+stateLookupMed.get(d.properties.STUSPS));
        console.log(+stateLookupRec.get(d.properties.STUSPS));
    });

function radioChange(value){
    console.log(value);

    svg.selectAll('.feature')
        .attr('fill',function(d) {
            if (value == "Recreational") {
                return colorScale(stateLookupRec.get(d.properties.STUSPS))
            }
            else if (value == "Medicinal") {
                return colorScale(stateLookupMed.get(d.properties.STUSPS))
            }
        });
        }

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 100);

svg.append('rect')
    .attr("x", 500)
    .attr("y", 5)
    .attr("width", 475)
    .attr("height", 50)
    .attr("fill", "white")
    .attr('stroke','green')
    .attr('fill','lightGrey')
    .attr('stroke-width', 2.5)
    .attr("id", "rectLabel");

svg.append('text')
    .text('Marijuana Laws Across the US')
    .attr('x', 510)
    .attr('y', 40)
    .attr('stroke-width','.25')
    .style('fill','green')
    .attr('font-size','36');
    //.attr('id','title');

svg.append('rect')
    .attr("x", 35)
    .attr("y", 130)
    .attr("width", 175)
    .attr("height", 280)
    .attr('stroke','green')
    .attr('fill','lightGrey')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .text('Map Color Key')
    .attr('x', 50)
    .attr('y', 155)
    .attr('fill', 'Green')
    .attr('font-size','20')
    .attr('id','title');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 170)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','lightGreen')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 190)
    .attr('fill','green')
    .text('1930 - 1933');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 210)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','#27ae60')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 230)
    .attr('fill','green')
    .text('1934 - 1964');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 250)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','#229954')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 270)
    .attr('fill','green')
    .text('1965 - 1974');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 290)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','#1e8449')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 310)
    .attr('fill','green')
    .text('1975 - 1989');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 330)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','#196f3d')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 350)
    .attr('fill','green')
    .text('1990 - 2000');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 370)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','#145a32')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 390)
    .attr('fill','green')
    .text('2001 - 2017');

svg.append('rect')
    .attr("x", 1130)
    .attr("y", 575)
    .attr("width", 280)
    .attr("height", 70)
    .attr('stroke','green')
    .attr('fill','lightGrey')
    .attr('stroke-width', 2.5)
    .attr("class", "signature");

svg.append('text')
    .attr('x',1135)
    .attr('y',600)
    .text('Data & Visualization by Abigail Skelton')
    .attr('fill','green');

svg.append('text')
    .attr('x',1135)
    .attr('y',625)
    .text('Visualization Technologies, Prof. Gunn')
    .attr('fill','green');

