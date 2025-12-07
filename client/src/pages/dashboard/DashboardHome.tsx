import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Users, Eye, ShoppingBag, Clock, MoreHorizontal, Plus } from "lucide-react";
import { Link } from "wouter";

export default function DashboardHome() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, here's what's happening today.</p>
          </div>
          <Link href="/dashboard/create-deal">
            <Button className="rounded-full gap-2">
              <Plus size={18} /> Create Deal
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-green-500 font-medium mt-1 flex items-center">
                <ArrowUpRight size={12} className="mr-1" /> +12% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Walk-ins</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145</div>
              <p className="text-xs text-green-500 font-medium mt-1 flex items-center">
                <ArrowUpRight size={12} className="mr-1" /> +5% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Deals</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-400 mt-1">
                2 ending soon
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Deals List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-lg">Active Campaigns</h2>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {[
              { title: "Morning Latte Special", status: "Active", views: 842, conversions: 45, ends: "4h left" },
              { title: "Lunch Combo: Sandwich + Drink", status: "Active", views: 1205, conversions: 82, ends: "2d left" },
              { title: "Flash Sale: Pastries 50% Off", status: "Ending Soon", views: 303, conversions: 18, ends: "45m left" },
            ].map((deal, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
                    {deal.title.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{deal.title}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span className={`px-2 py-0.5 rounded-full ${deal.status === 'Ending Soon' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'} font-medium`}>
                        {deal.status}
                      </span>
                      <span className="flex items-center gap-1"><Eye size={12} /> {deal.views}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {deal.conversions}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <Clock size={14} /> {deal.ends}
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    <MoreHorizontal size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
