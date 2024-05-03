var svg = d3.select("#glyphArea").append("g").style("transform", `translate(${0}px,${60}px)`)

function getCsv() {
    return d3.csv("nutrition_values.csv")
}

function drawGlyph(data, x, y) {

    var mLogo = [
        { d: "M12.31,0A12.31,12.31,0,1,0,24.62,12.31,12.31,12.31,0,0,0,12.31,0Zm8.51,18.29,0,.43H18l0-.43s0-.06,0-.09v-1l0-1.34c0-.38,0-.66,0-.92s0-.6-.05-.89l0-.29c0-.26,0-.51-.06-.77s0-.51-.07-.76v0c0-.16,0-.32-.05-.47s-.05-.47-.08-.7v-.11c0-.25-.06-.5-.1-.74-.07-.41-.14-.81-.2-1.18-.1-.54-.23-1.07-.37-1.58a7.86,7.86,0,0,0-.42-1.15,2.74,2.74,0,0,0-.3-.5A.94.94,0,0,0,16,5.62c-.05,0-.08,0-.16,0a.84.84,0,0,0-.22.21,3.41,3.41,0,0,0-.37.65,9,9,0,0,0-.43,1.25,20.37,20.37,0,0,0-.46,2.14c-.06.39-.13.82-.19,1.31s-.09.77-.13,1.15l-.06.61v.16c0,.31,0,.62-.07.94l0,.52v.32c0,.32,0,.65,0,1s0,.56,0,.83v.51s0,.06,0,.11l0,.39H10.89l0-.43s0-.07,0-.1v-1c0-.35,0-.67,0-1s0-.69-.05-1.15c0-.29,0-.54,0-.79s-.07-.75-.1-1.12-.05-.58-.09-.88-.1-.82-.17-1.23-.14-.86-.23-1.26a11.28,11.28,0,0,0-.54-2A4.58,4.58,0,0,0,9.27,6,1.87,1.87,0,0,0,9,5.66l-.09-.07c-.07,0-.1,0-.17,0a.87.87,0,0,0-.22.24,3.33,3.33,0,0,0-.35.66,9,9,0,0,0-.45,1.38c-.14.54-.26,1.09-.35,1.65s-.15.94-.22,1.41-.08.64-.12,1-.07.69-.11,1,0,.44,0,.66v.18c0,.28,0,.55-.06.83s0,.49,0,.73c0,.4,0,.81,0,1.21s0,.62,0,.93v.79l0,.29-.29.09c-.18.05-2.18,0-2.2,0l-.33-.06,0-.33s0-.07,0-.1c0-.33,0-.64,0-1,0-.17,0-.33,0-.5v-.32c0-.27,0-.54,0-.8s.05-.66.08-1,.07-.77.12-1.16.12-.9.18-1.33.19-1.09.32-1.69c.18-.84.38-1.6.61-2.32a14.36,14.36,0,0,1,.6-1.55,8.39,8.39,0,0,1,.84-1.48,4.38,4.38,0,0,1,.73-.8,2.62,2.62,0,0,1,.89-.51,2.05,2.05,0,0,1,1.44.1,3,3,0,0,1,.88.6,5.72,5.72,0,0,1,.79,1,10.43,10.43,0,0,1,.87,1.77c0,.12.09.23.13.35l.18-.46a10.47,10.47,0,0,1,.75-1.5,5,5,0,0,1,.78-1A2.76,2.76,0,0,1,14.86,4,2.09,2.09,0,0,1,17,4a3.25,3.25,0,0,1,.83.72,6,6,0,0,1,.77,1.13,11.87,11.87,0,0,1,.77,1.77,20.64,20.64,0,0,1,.7,2.49c.12.58.22,1.1.3,1.58s.14.94.19,1.39.1.89.14,1.27,0,.5,0,.74c0,.42.05.84.07,1.26,0,.27,0,.54,0,.76s0,.49,0,.74v.37S20.82,18.26,20.82,18.29Z" }
    ]
    var bkLogo = [
        { d: "M12.25,13.68H11.8a.56.56,0,0,0-.63.58v2a.56.56,0,0,0,.63.58h.45a1.49,1.49,0,0,0,1.57-1.58A1.42,1.42,0,0,0,12.25,13.68Z" },
        { d: "M11.8,10.66h.33A1.36,1.36,0,0,0,13.54,9.2a1.3,1.3,0,0,0-1.41-1.41H11.8a.56.56,0,0,0-.63.58v1.71A.56.56,0,0,0,11.8,10.66Z" },
        { d: "M12.31,0A12.31,12.31,0,1,0,24.62,12.31,12.31,12.31,0,0,0,12.31,0Zm.93,20.57H9.68c-2,0-2.94-1.15-2.94-2.71V6.76A2.6,2.6,0,0,1,9.68,4h3c3.18,0,5.22,1.61,5.22,4.63a4,4,0,0,1-1,2.72l-.07.09h0c-.08.09-.13.14-.13.24s.12.2.25.3h0l0,0a4.29,4.29,0,0,1,1.61,3.49C18.63,18.33,16.59,20.57,13.24,20.57Z" }
    ]

    var pieData = { "Calories": data.Calories - data.CaloriesFromFat, "CaloriesFromFat": data.CaloriesFromFat }
    var pieColor = d3.scaleLinear().domain([0,1]).range(["#7e308d", "#e88aff"])

    var logo = svg.append("g")

    if (data.Chain == "Burger King") {
        logo.selectAll("logo").data(bkLogo).enter().append("path").attr("d", function (d) { return d.d }).style("transform", `translate(${x + 88}px,${-42.0 + y}px)`).style("fill", "#7e308d")
    } else if (data.Chain == "Mc Donalds") {
        logo.selectAll("logo").data(mLogo).enter().append("path").attr("d", function (d) { return d.d }).style("transform", `translate(${x + 88}px,${-42.0 + y}px)`).style("fill", "#7e308d")
    }

    console.log(data)
    if (data.Type == "Snacks") {
        svg
            .append("path")
            .attr("d", "M17.19,0H62.81A17.19,17.19,0,0,1,80,17.19V30a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V17.19A17.19,17.19,0,0,1,17.19,0Z")
            .style("fill", "#fff100")
            .style("transform", `translate(${x + 24}px,${-30.0 + y}px)`)
    } else if (data.Type == "Salads") {
        svg
            .append("path")
            .attr("d", "M47.1,0C39.8,0,33,2.4,27.6,6.4c-0.3,0-0.7,0-1,0C11.9,6.4,0,18.3,0,32.9h14.1h38.9H80C80,14.7,65.3,0,47.1,0z")
            .style("fill", "#22ac38")
            .style("transform", `translate(${x + 24}px,${-30.0 + y}px)`)
    } else if (data.Type == "Desserts") {
        svg
            .append("path")
            .attr("d", "M46.7,0c-4.6,0-8.7,0.5-12.4,1.3c0.2,1.1,0.4,2.3,0.4,3.5c0,12.6-14.4,23-32.6,23.7C0.5,32.3,0,35,0,35h80 C80,35,79.8,0,46.7,0z")
            .style("fill", "#ea5514")
            .style("transform", `translate(${x + 24}px,${-35.0 + y}px)`)
    } else if (data.Type == "Soft Drinks") {
        svg
            .append("polygon")
            .attr("points", "76,20.1 70.3,0 46.6,0 33.4,0 9.7,0 4,20.1 0,20.1 0,30 1.2,30 33.4,30 46.6,30 78.8,30 80,30 80,20.1")
            .style("fill", "#2ea7e0")
            .style("transform", `translate(${x + 24}px,${-30.0 + y}px)`)
    } else if (data.Type == "Sandwiches") {
        svg
            .append("path")
            .attr("d", "M40,0A40,40,0,0,0,0,40H80A40,40,0,0,0,40,0Z")
            .style("fill", "#f5b61f")
            .style("transform", `translate(${x + 24}px,${-40.0 + y}px)`)
    }

    svg
        .append("rect")
        .attr("width", 80)
        .attr("height", parseInt(data.DietaryFiber) * 3.5)
        .style("fill", "#8dc21f")
        .style("transform", `translate(${x + 24}px,${0 * 0.1 + y}px)`)
    svg
        .append("rect")
        .attr("width", 80)
        .attr("height", parseInt(data.Sodium) * 0.012)
        .style("fill", "#e73828")
        .style("transform", `translate(${x + 24}px,${parseInt(data.DietaryFiber) * 3.5 + y}px)`)
    svg
        .append("rect")
        .attr("width", 80)
        .attr("height", parseInt(data.TotalFat) * 0.2)
        .style("fill", "#faed00")
        .style("transform", `translate(${x + 24}px,${parseInt(data.Sodium) * 0.012 + parseInt(data.DietaryFiber) * 3.5 + y}px)`)
    svg
        .append("rect")
        .attr("width", 80)
        .attr("height", parseInt(data.Protein) * 0.25)
        .style("fill", "#946134")
        .style("transform", `translate(${x + 24}px,${parseInt(data.TotalFat) * 0.2 + parseInt(data.Sodium) * 0.012 + parseInt(data.DietaryFiber) * 3.5 + y}px)`)
    svg
        .append("rect")
        .attr("width", 80)
        .attr("height", parseInt(data.TotalCarb) * 0.2)
        .style("fill", "#f5b61f")
        .style("transform", `translate(${x + 24}px,${parseInt(data.Protein) * 0.25 + parseInt(data.TotalFat) * 0.2 + parseInt(data.Sodium) * 0.012 + parseInt(data.DietaryFiber) * 3.5 + y}px)`)

    const pie = d3.pie()
    .value(d=>d[1])

    const pieDraw = pie(Object.entries(pieData))
    
    svg
    .selectAll('whatever')
    .data(pieDraw)
    .join('path')
    .attr('d', d3.arc()
      .innerRadius(0)         // This is the size of the donut hole
      .outerRadius(17)
    )
    .style("fill", function(d,i){
        return pieColor(i)
    })
    .style("transform", `translate(${x+24}px,${10.0 + y}px)`)

}

async function drawAll() {
    data = await getCsv();
    console.log(data);
    for (var i = 0; i < data.length / 10; i++) {
        for (var j = 0; j < 10; j++) {
            cnt = i * 10 + j
            drawGlyph(data[cnt], j * 128, i * 150)
        }
    }
}