import React from "react";
import ReactDOM from "react-dom";
import D3ConfidenceChart from "./D3ConfidenceChart";

ReactDOM.render(
  <React.StrictMode>
    <div style={{ marginLeft: "20%" }}>
      <D3ConfidenceChart
        areaColor="#2c8ff87e"
        lineColor="#eb264e"
        pointColor="#000000"
        chartHeight="300"
        chartWidth="800"
        domainX={[1, 5]}
        domainY={[1, 1000]}
        data={[
          { x: 1, y: 500, lower: 350, upper: 650 },
          { x: 2, y: 600, lower: 450, upper: 750 },
          { x: 3, y: 700, lower: 550, upper: 850 },
          { x: 4, y: 200, lower: 100, upper: 350 },
          { x: 5, y: 300, lower: 150, upper: 450 },
        ]}
        id="myChart"
        marginBottom="20"
        marginLeft="80"
        marginRight="20"
        marginTop="20"
        toolTipBgColor="#fafafa"
        xAxisName="X axis"
        yAxisName="Y axis"
      />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
