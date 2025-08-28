import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockAttorneys } from '@/data/mockData';

export function AttorneyPerformanceChart() {
  const data = mockAttorneys.map(attorney => ({
    name: attorney.name.split(' ')[0], // First name only
    revenue: attorney.revenue,
    conversion: attorney.conversionRate,
    consults: attorney.consultCount
  }));

  return (
    <Card className="legal-card">
      <CardHeader className="legal-card-header">
        <CardTitle>Attorney Revenue Comparison</CardTitle>
      </CardHeader>
      <CardContent className="legal-card-content">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue'];
                if (name === 'conversion') return [`${value}%`, 'Conversion Rate'];
                return [`${value}`, 'Consults'];
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Bar 
              dataKey="revenue" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}