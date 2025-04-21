import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'COMP 3000', value: 400 },
  { name: 'FOUN 1102', value: 300 },
  { name: 'FOUN 1103', value: 300 },
  { name: 'COMP 3400', value: 200 },
  { name: 'FOUN 1104', value: 300 },
  { name: 'COMP 3200', value: 300 },
  { name: 'COMP 3300', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#80C49F', '#1FBB28', '#AF1042'];

const TimePie = () => (
  <PieChart width={400} height={300}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      outerRadius={50}
      fill="#8884d8"
      dataKey="value"
      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
 
  </PieChart>
);

export default TimePie;
