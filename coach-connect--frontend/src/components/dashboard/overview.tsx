'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

// Mock data for the chart
const data = [
  {
    name: 'Jan',
    total: 5,
  },
  {
    name: 'Feb',
    total: 7,
  },
  {
    name: 'Mar',
    total: 8,
  },
  {
    name: 'Apr',
    total: 10,
  },
  {
    name: 'May',
    total: 12,
  },
  {
    name: 'Jun',
    total: 11,
  },
  {
    name: 'Jul',
    total: 14,
  },
  {
    name: 'Aug',
    total: 16,
  },
  {
    name: 'Sep',
    total: 15,
  },
  {
    name: 'Oct',
    total: 17,
  },
  {
    name: 'Nov',
    total: 18,
  },
  {
    name: 'Dec',
    total: 20,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#A0A0A0"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#A0A0A0"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            borderColor: '#E0E0E0',
            borderRadius: '4px',
            color: '#2A2A2A',
          }}
        />
        <Bar dataKey="total" fill="#B25C34" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
