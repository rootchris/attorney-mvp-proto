import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Linkedin, 
  MessageCircle,
  Calendar,
  StickyNote,
  Users,
  Building2,
  Clock,
  MapPin,
  Tag,
  Bell,
  CheckSquare,
  LayoutGrid,
  List,
  Activity,
  Heart,
  Map,
  ArrowLeft
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function ClientRecord() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [rightPanelView, setRightPanelView] = useState("details");

  // Mock client data - in real app this would come from API
  const client = {
    id: clientId,
    name: "Spencer Dennis",
    title: "Strategist – Sports Tech & SaaS Founders | Founder CoachNow (Acquired)",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "CoachNow",
    location: "Los Angeles, CA",
    email: "spencer@coachnow.com",
    linkedIn: "linkedin.com/in/spencerdennis",
    phone: "+1 (555) 123-4567",
    interactions: {
      emails: 10,
      events: 4,
      notes: 1
    },
    lastInteraction: "2 days ago",
    tags: ["Founders", "Sports Tech", "SaaS"],
    lists: ["Founders", "Startups"],
    teamConnections: 3,
    description: "Experienced strategist and founder in the sports technology space. Successfully built and exited CoachNow, now focusing on advising other SaaS founders. Strong background in product strategy and business development."
  };

  const activities = [
    {
      id: 1,
      type: "email",
      title: "Re: UI/UX Feedback Discussion",
      description: "Christopher Brereton received an email",
      timestamp: "1 day ago",
      participants: ["spencer@coachnow.com", "chris@company.com"]
    },
    {
      id: 2,
      type: "note",
      title: "Granola feedback",
      description: "Added note about product feedback discussion",
      timestamp: "2 days ago",
      author: "You"
    },
    {
      id: 3,
      type: "meeting",
      title: "Spencer & Chris Strategy Call",
      description: "Fri, 22 Aug 25, 10:30am – 11:15am",
      timestamp: "3 days ago",
      status: "accepted"
    },
    {
      id: 4,
      type: "email",
      title: "Introduction to Team",
      description: "Spencer Dennis sent an email",
      timestamp: "1 week ago",
      participants: ["spencer@coachnow.com", "team@company.com"]
    }
  ];

  const sidebarItems = [
    { icon: Search, label: "Search", active: false },
    { icon: CheckSquare, label: "Tasks", active: false },
    { icon: LayoutGrid, label: "Boards", active: false },
    { icon: List, label: "Lists", active: false },
    { icon: Building2, label: "Companies", active: false },
    { icon: Users, label: "Contacts", active: true },
    { icon: Activity, label: "Timeline", active: false },
    { icon: Heart, label: "Keep-in-touch", active: false },
    { icon: Map, label: "Map", active: false },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "email": return Mail;
      case "note": return StickyNote;
      case "meeting": return Calendar;
      default: return MessageCircle;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="p-4 border-b">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Plus className="w-4 h-4" />
            Add to Rolodex
          </Button>
        </div>
        
        <nav className="p-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Search Bar */}
        <div className="border-b bg-card p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts, companies..."
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Contact Overview & Timeline */}
          <div className="flex-1 overflow-y-auto">
            {/* Contact Header */}
            <div className="p-6 border-b bg-card">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{client.name}</h1>
                  <p className="text-muted-foreground mt-1">{client.title}</p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <StickyNote className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                    <span>{client.interactions.emails + client.interactions.events + client.interactions.notes} interactions</span>
                    <span>{client.teamConnections} team connections</span>
                    <div className="flex gap-1">
                      {client.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="team">Team Connections</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="companies">Companies</TabsTrigger>
                  <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Description Widget */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{client.description}</p>
                    </CardContent>
                  </Card>

                  {/* Team Activity Widget */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        <span>Team Activity</span>
                        <Badge variant="secondary">{client.teamConnections} connections</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <Avatar key={i} className="w-8 h-8 border-2 border-background">
                              <AvatarImage src={`https://images.unsplash.com/photo-150715709${i}785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`} />
                              <AvatarFallback>T{i}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">Your team is connected to Spencer</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Interaction Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activities.map((activity) => {
                          const Icon = getActivityIcon(activity.type);
                          return (
                            <div key={activity.id} className="flex gap-3 p-3 rounded-lg hover:bg-muted/30">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm">{activity.title}</p>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                                {activity.participants && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {activity.participants.join(', ')}
                                  </p>
                                )}
                                {activity.status && (
                                  <Badge variant="outline" className="text-xs mt-1">{activity.status}</Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Other tab contents would go here */}
                <TabsContent value="team">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">Team connections content would go here...</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tasks">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">Tasks content would go here...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar - Details Panel */}
          <div className="w-80 border-l bg-card overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex gap-1">
                <Button
                  variant={rightPanelView === "details" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setRightPanelView("details")}
                >
                  Details
                </Button>
                <Button
                  variant={rightPanelView === "custom" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setRightPanelView("custom")}
                >
                  Custom Fields
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Interaction Summary */}
              <div>
                <h3 className="font-medium mb-3">Interaction Summary</h3>
                <div className="space-y-2 text-sm">
                  <p>You have <strong>{client.interactions.emails} emails</strong>, <strong>{client.interactions.events} events</strong>, and <strong>{client.interactions.notes} note</strong></p>
                  <p className="text-muted-foreground">Last interaction: {client.lastInteraction}</p>
                </div>
              </div>

              <Separator />

              {/* Contact Details */}
              <div>
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Company</label>
                    <p className="text-sm">{client.company}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">LinkedIn</label>
                    <p className="text-sm text-blue-600">{client.linkedIn}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Email</label>
                    <p className="text-sm">{client.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Phone</label>
                    <p className="text-sm">{client.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Location</label>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {client.location}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Lists */}
              <div>
                <h3 className="font-medium mb-3">Lists</h3>
                <div className="space-y-2">
                  {client.lists.map(list => (
                    <Badge key={list} variant="outline" className="mr-2">{list}</Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-medium mb-3">Tags</h3>
                <div className="space-y-2">
                  {client.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="mr-2">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Reminders */}
              <div>
                <h3 className="font-medium mb-3">Reminders</h3>
                <Button variant="outline" size="sm" className="w-full">
                  <Bell className="w-4 h-4 mr-2" />
                  Add Keep-in-touch Reminder
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
