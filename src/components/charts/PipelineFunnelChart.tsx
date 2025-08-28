import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FunnelChart, Funnel, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockClients } from '@/data/mockData';

export function PipelineFunnelChart() {
  const data = [
    {
      name: 'Scheduled',
      value: mockClients.filter(c => c.pipelineStage === 'scheduled').length,
      fill: 'hsl(var(--chart-1))'
    },
    {
      name: 'Complete',
      value: mockClients.filter(c => c.pipelineStage === 'complete').length,
      fill: 'hsl(var(--chart-2))'
    },
    {
      name: 'Signed',
      value: mockClients.filter(c => c.pipelineStage === 'signed').length,
      fill: 'hsl(var(--chart-3))'
    }
  ];

  return (
    <Card className="legal-card">
      <CardHeader className="legal-card-header">
        <CardTitle>Pipeline Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent className="legal-card-content">
        <ResponsiveContainer width="100%" height={300}>
          <FunnelChart>
            <Tooltip 
              formatter={(value, name) => [`${value} clients`, name]}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Funnel
              dataKey="value"
              data={data}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-6">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded" 
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}