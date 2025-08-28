import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, DollarSign, TrendingDown, ArrowRight } from "lucide-react";
import { mockTasks, mockClients, mockMatters } from "@/data/mockData";

export function AlertsPanel() {
  const overdueTasks = mockTasks.filter(t => t.status === 'overdue');
  const unsignedPlans = mockClients.filter(c => c.pipelineStage === 'complete');
  const highPriorityTasks = mockTasks.filter(t => t.priority === 'high' && t.status !== 'completed');
  const recentLostClients = mockClients.filter(c => c.pipelineStage === 'lost');

  const alerts = [
    {
      id: 'overdue',
      title: 'Overdue Tasks',
      count: overdueTasks.length,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Tasks past their due date',
      items: overdueTasks.slice(0, 3)
    },
    {
      id: 'unsigned',
      title: 'Unsigned Plans',
      count: unsignedPlans.length,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Completed consultations awaiting signature',
      items: unsignedPlans.slice(0, 3)
    },
    {
      id: 'priority',
      title: 'High Priority Tasks',
      count: highPriorityTasks.length,
      icon: TrendingDown,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Critical tasks requiring attention',
      items: highPriorityTasks.slice(0, 3)
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-legal-subheading">Critical Alerts</h3>
        <Badge variant="destructive" className="text-xs">
          {alerts.reduce((sum, alert) => sum + alert.count, 0)} Total
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <Card key={alert.id} className={`border-l-4 ${alert.count > 0 ? 'border-l-red-500' : 'border-l-green-500'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${alert.bgColor}`}>
                      <Icon className={`w-4 h-4 ${alert.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{alert.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                  <Badge variant={alert.count > 0 ? "destructive" : "secondary"} className="text-xs">
                    {alert.count}
                  </Badge>
                </div>
              </CardHeader>
              {alert.count > 0 && (
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {alert.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded">
                        <span className="font-medium truncate">
                          {alert.id === 'overdue' || alert.id === 'priority' 
                            ? (item as any).title 
                            : (item as any).name}
                        </span>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    {alert.count > 3 && (
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        View all {alert.count} items
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}