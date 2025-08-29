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
    { icon: List, label: "Lists", active: false },
    { icon: Users, label: "Contacts", active: true },
    { icon: Activity, label: "Timeline", active: false },
    { icon: Heart, label: "Keep-in-touch", active: false },
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
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-card px-6 py-3 flex items-center justify-between">
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
              placeholder="Search"
              className="pl-10"
            />
          </div>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add to Rolodex
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Center Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Client Header */}
          <div className="p-6 border-b bg-card">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{client.name}</h1>
                  <p className="text-muted-foreground mt-1">{client.title}</p>
                  
                  {/* Social/Contact Icons */}
                  <div className="flex items-center gap-2 mt-4">
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Building2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Users className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Add note
                </Button>
                <Button size="sm" variant="outline">
                  Action
                  <MoreHorizontal className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-transparent border-none p-0 h-auto">
                <TabsTrigger value="overview" className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="team" className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none">
                  Team connections
                  <Badge variant="secondary" className="ml-2">1</Badge>
                </TabsTrigger>
                <TabsTrigger value="tasks" className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="companies" className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none">
                  Companies
                  <Badge variant="secondary" className="ml-2">4</Badge>
                </TabsTrigger>
                <TabsTrigger value="linkedin" className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  LinkedIn
                </TabsTrigger>
                <TabsTrigger value="updates" className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none">
                  Updates
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <TabsContent value="overview" className="mt-0 space-y-6">
                  {/* Description Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <h3 className="font-medium">Description</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p>
                        <strong>Intro Blurb:</strong> I founded CoachNow 13 years ago, raised VC money, and got acquired twice. For the better part of a decade it's been #1 coaching app worldwide, used in 80 sports across 140 countries.
                      </p>
                      <p>
                        Since exiting CoachNow, I've been helping early-stage sports tech and SaaS founders with:
                      </p>
                      <p>Strategic...</p>
                    </div>
                  </div>

                  {/* Your Team Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <h3 className="font-medium">Your team</h3>
                      </div>
                      <span className="text-sm text-blue-600">1 team connection</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                        <AvatarFallback>C</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">Christop...</span>
                        <Badge variant="secondary" className="text-xs">YOU</Badge>
                        <Badge variant="outline" className="text-xs">10</Badge>
                        <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">📧</Badge>
                        <Badge variant="outline" className="text-xs">4</Badge>
                        <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">📅</Badge>
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-800">💬</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Team Activity Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <h3 className="font-medium">Team activity</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">2025</h4>
                        <div className="space-y-4">
                          <h5 className="font-medium text-muted-foreground">August</h5>
                          
                          {/* Activity Items */}
                          <div className="space-y-3">
                            <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/30">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                <Mail className="w-4 h-4 text-orange-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20&fit=crop&crop=face" />
                                    <AvatarFallback>CB</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">Christopher Brereton</span>
                                  <span className="text-sm text-muted-foreground">received an email</span>
                                  <Badge variant="outline" className="text-xs">🔒</Badge>
                                </div>
                                <div className="bg-muted/50 rounded p-2">
                                  <p className="font-medium text-sm">Re: UI/UX</p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">2 days ago</span>
                            </div>

                            <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/30">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                <Mail className="w-4 h-4 text-orange-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20&fit=crop&crop=face" />
                                    <AvatarFallback>CB</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-sm">Christopher Brereton</span>
                                  <span className="text-sm text-muted-foreground">received an email</span>
                                  <Badge variant="outline" className="text-xs">🔒</Badge>
                                </div>
                                <div className="bg-muted/50 rounded p-2">
                                  <p className="font-medium text-sm">Re: UI/UX</p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">2 days ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Other tab contents */}
                <TabsContent value="team" className="mt-0">
                  <p className="text-muted-foreground">Team connections content...</p>
                </TabsContent>
                <TabsContent value="tasks" className="mt-0">
                  <p className="text-muted-foreground">Tasks content...</p>
                </TabsContent>
                <TabsContent value="companies" className="mt-0">
                  <p className="text-muted-foreground">Companies content...</p>
                </TabsContent>
                <TabsContent value="linkedin" className="mt-0">
                  <p className="text-muted-foreground">LinkedIn content...</p>
                </TabsContent>
                <TabsContent value="updates" className="mt-0">
                  <p className="text-muted-foreground">Updates content...</p>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar - DETAILS */}
        <div className="w-80 border-l bg-card overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="font-medium text-muted-foreground text-sm tracking-wider">DETAILS</h2>
            <div className="flex gap-1 mt-3">
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
                Custom fields
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-6">
            {/* Your interaction */}
            <div>
              <h3 className="font-medium mb-3">Your interaction</h3>
              <div className="text-sm space-y-1">
                <p>You have <strong>10 emails</strong>, <strong>4 events</strong>, and <strong>1 note</strong>.</p>
                <p className="text-muted-foreground">Your last interaction was a email on Aug 27, 2025.</p>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3 text-blue-600">
                Add Keep-in-touch Reminder
              </Button>
            </div>

            <Separator />

            {/* Company */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Company</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <span className="text-sm font-medium">CoachNow</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">LinkedIn</label>
                <p className="text-sm">spencer-dennis</p>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Emails</label>
                <div className="space-y-1">
                  <p className="text-sm">spencer@coachnow.io</p>
                  <p className="text-sm text-muted-foreground">spencer@spencerden...</p>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Phone numbers</label>
                <Button variant="link" size="sm" className="h-auto p-0 text-blue-600">
                  Add phone number
                </Button>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Location</label>
                <p className="text-sm">Los Angeles, California...</p>
              </div>
            </div>

            <Separator />

            {/* Lists */}
            <div>
              <label className="text-xs text-muted-foreground">Lists</label>
              <div className="flex gap-1 mt-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  🏅 Founders
                </Badge>
                <Badge variant="secondary">startups</Badge>
              </div>
              <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 mt-2">
                <Plus className="w-3 h-3 mr-1" />
                Add to list
              </Button>
            </div>

            <Separator />

            {/* Tags */}
            <div>
              <label className="text-xs text-muted-foreground">Tags</label>
              <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 mt-2">
                <Plus className="w-3 h-3 mr-1" />
                Add tag
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
