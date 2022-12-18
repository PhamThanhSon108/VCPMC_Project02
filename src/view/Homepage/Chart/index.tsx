import { Area } from "@ant-design/plots";

const Chart = ({
  staticData,
}: {
  staticData: { time: string; scales: number }[] | any;
}) => {
  let data = staticData.length === 0 ? [] : staticData;

  const config = {
    data,
    xField: "time",
    yField: "scales",
    smooth: true,
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };

  return (
    <Area {...config} style={{ width: "100%", height: "calc(100% - 128px)" }} />
  );
};

export default Chart;
