import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { RadialBar } from "@ant-design/plots";

interface Datum {
  star: number;
}
function RadialChart({
  color,
  field1,
  field2,
  field3,
}: {
  color?: string;
  field1?: number;
  field2?: number;
  field3?: number;
}) {
  const data = [
    {
      name: "1",
      star: field1,
    },
    {
      name: "2",
      star: field2,
    },

    {
      name: "3",
      star: field3,
    },
  ];
  const config = {
    with: 150,
    data,
    xField: "name",
    yField: "star",
    maxAngle: 350,
    radius: 1,
    innerRadius: 0.74,
    colorField: "name",
    color: function (type: any) {
      if (!field3 && type.name == "2") return color || "#ff7506";
      return "#7E7D88";
    },
    barBackground: {
      style: {
        fill: "#EAEAEC",
        fillOpacity: 1,
      },
    },
    barStyle: {
      style: {
        fill: "red",
        fillOpacity: 0.5,
        stroke: "black",
        lineWidth: 1,
        lineDash: [4, 5],
        strokeOpacity: 0.7,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        cursor: "pointer",
      },
    },
  };
  return <RadialBar style={{ width: "60px", height: "60px" }} {...config} />;
}
export default RadialChart;
