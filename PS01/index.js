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
                console.log(d.properties.STUSPS)
            })
            .on('mouseover', function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 1);
                div.html(d.properties.NAME +"<br/>"+ +d.properties.stateLookupMed +"<br/>"+ +d.properties.stateLookupRec)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");
            })
            .on('mousemove', function (d) {
                div.html(d.properties.NAME +"<br/>"+ +d.properties.stateLookupMed +"<br/>"+ +d.properties.stateLookupRec)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0)
            })
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

/*svg.append('rect')
    .attr("x", 500)
    .attr("y", 75)
    .attr("width", 300)
    .attr("height", 75)
    .attr("fill", "white")
    .attr('stroke','green')
    .attr('fill','lightGrey')
    .attr('stroke-width', 2.5)
    .attr("id", "rectLabel");

svg.append('text')
    .text('fill with instructional text')
    .attr('x', 520)
    .attr('y', 115)
    .attr('fill', 'green');
    //.attr('id','title');

svg.append('rect')
    .attr("x", 950)
    .attr("y", 75)
    .attr("width", 225)
    .attr("height", 75)
    .attr("fill", "white")
    .attr('stroke','green')
    .attr('fill','lightGrey')
    .attr('stroke-width', 2.5)
    .attr("id", "rectLabel");

svg.append('text')
    .text('tooltip key')
    .attr('x', 775)
    .attr('y', 115)
    .attr('fill', 'green');
    //.attr('id','title');*/

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


/*function radioChange(value){
  console.log(value)};*/

/*svg.append('rect')
    .attr("x", 35)
    .attr("y", 370)
    .attr("width", 175)
    .attr("height", 200)
    .attr('stroke','green')
    .attr('fill','lightGrey')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .text('Medicinal Laws')
    .attr('x', 50)
    .attr('y', 395)
    .attr('fill', 'Green')
    .attr('font-size','20');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 410)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','white')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 430)
    .attr('fill','green')
    .text('Before 1933');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 450)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','#eaffe6')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 470)
    .attr('fill','green')
    .text('1934 - 1964');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 490)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','#74B074')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 510)
    .attr('fill','green')
    .text('1965 - 1999');

svg.append('rect')
    .attr("x", 50)
    .attr("y", 530)
    .attr("width", 25)
    .attr("height", 25)
    .attr('stroke','green')
    .attr('fill','#0d4d00')
    .attr('stroke-width', 2.5)
    .attr("id", "key");

svg.append('text')
    .attr('x', 90)
    .attr('y', 550)
    .attr('fill','green')
    .text('2000 - 2017');*/


/*svg.append('rect')
    .attr("x", 1105)
    .attr("y", 230)
    .attr("width", 280)
    .attr("height", 300)
    .attr('stroke','green')
    .attr('fill','lightGrey')
    .attr('stroke-width', 2.5)
    .attr('id','essayBox');*/

/*svg.append('text')
    .attr('x',1115)
    .attr('y',300)
    .attr('fill','green')
    .attr('id','expText')
    .text('The history of Marijuana regulation in the United States presents a winding road, filled with side-steps and speed-bumps along the way. The Era of Prohibition began in the 1920s, and shortly thereafter every State in the Union had ratified the Uniform State Narcotic Drug Act of 1933, which outlawed the cultivation, transportation and use of marijuana for any purposed, recreational or medicinal. \n' +
        '\n' +
        'Over time, with changes to state demographics and ideologies, and the advancement of thought, many states began to regulate marijuana within their own borders, in direct violation of federal laws. Though this falls within the purview of states’ rights, the Federal government has continued to wage its war on drugs. This interactive map shows how far states have come in regulating the controversial plant, and how far we have to go until we are on the same page as a Nation. \n');*/



/*function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = "Foo is not a long word".split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
        }
    });
})

    /*.text('The history of Marijuana regulation in the United States presents a winding road, filled with side-steps and speed-bumps along the way. The Era of Prohibition began in the 1920s, and shortly thereafter every State in the Union had ratified the Uniform State Narcotic Drug Act of 1933, which outlawed the cultivation, transportation and use of marijuana for any purposed, recreational or medicinal. \n' +
        '\n' +
        'Over time, with changes to state demographics and ideologies, and the advancement of thought, many states began to regulate marijuana within their own borders, in direct violation of federal laws. Though this falls within the purview of states’ rights, the Federal government has continued to wage its war on drugs. This interactive map shows how far states have come in regulating the controversial plant, and how far we have to go until we are on the same page as a Nation. \n')*/



/*function updateData(selectedYear){
    return nestedData.filter(function(d){return d.key == selectedYear})[0].values;
}

function sliderMoved(value){
    newData = updateData(value);
}*/


/*function updateData(dataMed) {

    //console.log(dataMed);

    if (sortOrder == 'Recreational') {

        return nestedData.filter(function (d) {
            return d.key == dataMed
        })[0], d3.max(finalData.map(function (d) {
            return +d.dataRec
        }))
        {
            return colorScale(stateLookupMed.get(d.properties.STUSPS));
        }
        ;

    }
    else {
        return nestedData.filter(function (d) {
            return d.key == dataRec
        })[0], d3.max(finalData.map(function (d) {
            return +d.dataMed
        }))
        {
            return colorScale(stateLookupRec.get(d.properties.STUSPS));
        }
        ;
    }
}*/





//var colorScale = d3.scaleLinear().range([d3.schemeBlues[9]]);

/*var color = d3.scale.threshold()
    .domain([1933,1950,1970,1990,2010, 2020])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);*/


/*function buttonClicked(){
    console.log('here');
}*/

/*d3.csv('./finalData.csv', function(dataIn) {


    dataRec = dataIn.filter(function (d) {
        return d.dataRec == dataRec;
    });

    dataMed = dataIn.filter(function (d) {
        return d.dataMed == dataMed;


    });
});*/

//console.log('tooltip');

/*var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#000")
    .text("a simple tooltip");

d3.select("body")
    .selectAll("div")
    .data()
    .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; })
    .on("mouseover", function(d){tooltip.text(d.properties.NAME); return tooltip.style("visibility", "visible");})
    //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});*/

//d3.json('./cb_2016_us_state_20m.json', function(dataIn){

//console.log(dataIn);

/*svg.selectAll('path')
    .data(dataIn.features)
    .enter()
    .append('path')
    .attr('d',path)
    .attr('fill','green')
    .attr('stroke','darkGreen')
    .attr('stroke-width','3')
    .on('mouseover', function(d){console.log(d.properties.NAME)});*/

/*    svg.selectAll('circle1')
        .data([{lat:58.301598,long:-134.420212 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

    svg.selectAll('circle2')
        .data([{lat:32.377716,long:-86.300568 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

    svg.selectAll('circle3')
        .data([{lat:34.746613,long:-92.288986 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

    svg.selectAll('circle4')
        .data([{lat:33.448143,long:-112.096962 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

    svg.selectAll('circle5')
        .data([{lat:38.576668,long:-121.493629 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');

            /*svg.selectAll('circle21')
        .data([{lat:42.3601,long:-71.0589 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 3)
        .attr('fill','greenYellow')
        .attr('stroke','black');*/

    /*svg.selectAll('button')
        .attr('fill','green');*/

    /*svg.selectAll('circle')
        .data([{lat:42.3601,long:-71.0589 }])
        .enter()
        .append('circle')
        .attr('cx', function (d){return albersProjection([d.long, d.lat])[0]})
        .attr('cy', function (d){return albersProjection([d.long, d.lat])[1]})
        .attr('r', 5)
        .attr('fill','greenYellow')
        .attr('stroke','black');*/

    /*svg.append('text')
        .text('Marijuana Laws Across the U.S.')
        .attr('transform','translate(300, 100)')
        .style('text-anchor','middle')
        .style('fill','green')
        .attr('font-size','36'); */

//});

/*    console.log(dataIn);

    svg.selectAll('circles')
        .data(dataMed)
        .enter()
        .append('circle')
        .attr('class','Medical')
        .attr('r', 6)
        .attr('fill', "white");

    svg.selectAll('circles')
        .data(dataRec)
        .enter()
        .append('circle')
        .attr('class','Recreational')
        .attr('r', 3)
        .attr('fill', "white");

    /*svg.selectAll('circles')
        .data(state)
        .enter()
        .append('circle')
        .attr('class','state')
        .attr('r', 5)
        .attr('fill','white');*/

    //drawPoints(dataRec);
    //drawPoints(dataMed);

    //drawPoints(state);

//.attr('data-toggle','tooltip')
//.attr('title',function(d){
//return d.properties.STUSPS

//.append
//.attr('tooltip', function(d){tooltip(d.properties.NAME)});
//.on('mouseover', function(d){tooltip(d.properties.NAME)});
/*.on("mouseover", function(d) {
    div.transition()
        .duration(200)
        .style("opacity", .9);
    div.html(finalData(d.date) + "<br/>"  + d.close)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
})
.on("mouseout", function(d) {
    div.transition()
        .duration(500)
        .style("opacity", 0);*/
/*svg.selectAll("path")
    .data(mapData.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "feature")
    //.attr('fill',function(d){console.log(d,stateLookup.get(d.properties.STUSPS));
        //return colorScale(stateLookup.get(d.properties.STUSPS));
    //})
    .attr('stroke','lightGrey')
    .attr('stroke-width',2.5)
    //.on('mouseover',function(d){console.log(d.properties.STUSPS)})
    //.on('mouseover', function(d){return d.dataRec})
    .on('mouseover',function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 1);
        div.html(d.dataRec)
            .style("left", (d3.event.pageX -5) + "px")
            .style("top", (d3.event.pageY - 5) + "px");
    })
    .on('mousemove', function(d){
        //div.transition()
        //.duration(500)
        //.style("opacity", 1);
        div.html(d.dataRec)
            .style("left", (d3.event.pageX - 5) + "px")
            .style("top", (d3.event.pageY - 5) + "px");
    })
    .on("mouseout", function(d){
        div.transition()
            .duration(500)
            .style("opacity",0);
    });

//console.log(finalData);
//console.log(stateLookup);*/