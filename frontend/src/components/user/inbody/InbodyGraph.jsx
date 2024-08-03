import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GraphContainer = styled.div`
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomTooltip = ({ active, payload = [] }) => {
  if (active && payload.length) {
    return (
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '10px', 
        padding: '5px', 
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        lineHeight: '1.2',
        fontSize: '14px'
      }}>
        <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{payload[0].payload.date}</p>
        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: 0 }}>{`${payload[0].value} KG`}</p>
      </div>
    );
  }
  return null;
};

const InbodyGraph = ({ data }) => {
  const yDomain = [
    Math.min(...data.map(d => d.value)) - 1,
    Math.max(...data.map(d => d.value)) + 1
  ];

  return (
    <GraphContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#999' }} 
            tickLine={false} 
            padding={{ left: 0, right: 0 }} 
          />
          <YAxis 
            domain={yDomain} 
            tick={{ fontSize: 12, fill: '#999' }} 
            tickLine={false} 
            axisLine={false} 
            tickMargin={0} 
            width={30} 
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#CCCCCC" 
            strokeWidth={3} 
            dot={{ fill: '#FFD700', stroke: '#FFD700', r: 3 }} 
            activeDot={{ r: 4, stroke: '#FFD700' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
};

export default InbodyGraph;
