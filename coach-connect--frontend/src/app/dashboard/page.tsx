import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Overview } from '@/components/dashboard/overview';
import { RecentClients } from '@/components/dashboard/recent-clients';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-aesthetic-dark">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="aesthetic-card animate-fade-in"
          style={{ animationDelay: '0ms' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-aesthetic-muted">
              Total Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-aesthetic-accent">12</div>
            <p className="text-xs text-aesthetic-muted">+2 from last month</p>
          </CardContent>
        </Card>
        <Card
          className="aesthetic-card animate-fade-in"
          style={{ animationDelay: '100ms' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-aesthetic-muted">
              Active Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-aesthetic-accent">10</div>
            <p className="text-xs text-aesthetic-muted">+1 from last month</p>
          </CardContent>
        </Card>
        <Card
          className="aesthetic-card animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-aesthetic-muted">
              Inactive Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-aesthetic-accent">2</div>
            <p className="text-xs text-aesthetic-muted">+1 from last month</p>
          </CardContent>
        </Card>
        <Card
          className="aesthetic-card animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-aesthetic-muted">
              Client Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-aesthetic-accent">83%</div>
            <p className="text-xs text-aesthetic-muted">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 aesthetic-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-aesthetic-dark">Overview</CardTitle>
            <CardDescription className="text-aesthetic-muted">
              Client activity for the past 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card
          className="col-span-4 lg:col-span-3 aesthetic-card animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          <CardHeader>
            <CardTitle className="text-aesthetic-dark">
              Recent Clients
            </CardTitle>
            <CardDescription className="text-aesthetic-muted">
              Your most recently added clients.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentClients />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
