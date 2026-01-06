'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    month: 'Jan',
    receita: 4000,
    despesa: 2400,
  },
  {
    month: 'Fev',
    receita: 3000,
    despesa: 1398,
  },
  {
    month: 'Mar',
    receita: 2000,
    despesa: 9800,
  },
  {
    month: 'Abr',
    receita: 2780,
    despesa: 3908,
  },
  {
    month: 'Mai',
    receita: 1890,
    despesa: 4800,
  },
  {
    month: 'Jun',
    receita: 2390,
    despesa: 3800,
  },
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-slate-900">Receita vs Despesa</CardTitle>
        <CardDescription className="text-slate-600">Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={{ stroke: '#64748b' }} />
            <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: '#64748b' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="receita"
              stroke="#10b981"
              strokeWidth={2}
              name="Receita"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="despesa"
              stroke="#dc2626"
              strokeWidth={2}
              name="Despesa"
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
