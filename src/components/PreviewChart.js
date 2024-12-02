import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';

const PreviewChart = () => {
  const theme = useTheme();

  const data = [
    {
      id: "Content Score",
      data: [
        { x: "Jan", y: 65 },
        { x: "Feb", y: 70 },
        { x: "Mar", y: 75 },
        { x: "Apr", y: 72 },
        { x: "May", y: 78 },
        { x: "Jun", y: 82 }
      ]
    },
    {
      id: "SEO Performance",
      data: [
        { x: "Jan", y: 55 },
        { x: "Feb", y: 62 },
        { x: "Mar", y: 68 },
        { x: "Apr", y: 71 },
        { x: "May", y: 75 },
        { x: "Jun", y: 80 }
      ]
    }
  ];

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Month',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Score',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: theme.palette.text.primary
              }
            },
            legend: {
              text: {
                fill: theme.palette.text.primary
              }
            }
          },
          legends: {
            text: {
              fill: theme.palette.text.primary
            }
          }
        }}
      />
    </div>
  );
};

export default PreviewChart;
