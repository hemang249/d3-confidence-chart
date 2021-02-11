import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3v4";

function D3ConfidenceChart({
  lineColor,
  areaColor,
  data,
  domainX,
  domainY,
  chartWidth,
  chartHeight,
  id,
  toolTipBgColor,
  xAxisName,
  yAxisName,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  pointColor,
}) {
  useEffect(() => {
    document.getElementById(id).innerHTML = "";
    var margin = {
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      },
      width = chartWidth - margin.left - margin.right,
      height = chartHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select(`#${id}`)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 500")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // create the x axis with domain as domainX and range of 0 -> width
    var x = d3
      .scaleLinear()
      .domain(domainX ? domainX : [1, 10])
      .range([0, width]);
    // append the axis bottom as x
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3
          .axisBottom(x)
          .ticks(domainX[1] - domainX[0])
          .tickFormat(function (d, i) {
            return d;
          })
      );

    // create the y axis with domain as domainY and range of height -> 0
    var y = d3
      .scaleLinear()
      .domain(domainY ? domainY : [0, 100000])
      .range([height, 0]);

    // `App`end the y axis as axisLeft
    svg.append("g").call(d3.axisLeft(y).tickFormat((d) => "" + d));

    // Add a area bounding the upper and lower range
    svg
      .append("path")
      .datum(data)
      .attr("fill", areaColor)
      .attr("stroke", "none")
      .attr(
        "d",
        d3
          .area()
          .curve(d3.curveNatural)
          .x(function (d) {
            return x(d.x);
          })
          .y0(function (d) {
            return y(d.upper);
          })
          .y1(function (d) {
            return y(d.lower);
          })
      );

    // Create the tooltip as a div and append to container
    var tooltip = d3
      .select(`#${id}`)
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", toolTipBgColor)
      .text("");

    // Add the line that plots the exact values y
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3

          .line()
          .curve(d3.curveNatural)
          .x(function (d) {
            return x(d.x);
          })
          .y(function (d) {
            return y(d.y);
          })
      );

    // Add the scatter dots on the line to show the data points individually
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.x);
      })
      .attr("cy", function (d) {
        return y(d.y);
      })
      .attr("r", 4.5)
      .style("fill", pointColor)
      .style("cursor", "pointer")
      .on("mouseover", function (d, i) {
        // Display the tooltip at the mouse position
        let mousePos = d3.mouse(this);
        tooltip
          .style("top", mousePos[1] + "px")
          .style("left", mousePos[0] + "px")
          .style("width", "200px")
          .style("height", "100")
          .style("padding", "15px").html(`
            <p><strong>x : </strong> : ${d.x}  </p>
            <p><strong>y :</strong>: ${d.y}</p>
          
          `);

        // chanage visibility style to visible
        return tooltip.style("visibility", "visible");
      })
      .on("mouseout", function (d, i) {
        // on mouseout make the tooltip hide
        return tooltip.style("visibility", "hidden");
      });

    // Add the x axis labels
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 6)
      .text(xAxisName);

    // Add the y axis labels
    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 20)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text(yAxisName);
  }, [data]);

  return <div id={id}></div>;
}

export default D3ConfidenceChart;
