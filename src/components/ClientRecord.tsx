import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
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
  ArrowLeft,
  Menu,
  Info,
  Check
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function ClientRecord() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [rightPanelView, setRightPanelView] = useState("details");
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isAddedToWealthCounsel, setIsAddedToWealthCounsel] = useState(false);
  const isMobile = useIsMobile();

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

  const WealthCounselButton = () => (
    <div className="mb-6">
      <Button
        onClick={() => setIsAddedToWealthCounsel(!isAddedToWealthCounsel)}
        className={`w-full h-16 text-base font-medium transition-all duration-200 ${
          isAddedToWealthCounsel
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white"
        }`}
        disabled={false}
      >
        <div className="flex items-center gap-3">
          {/* Wealth Counsel Logo */}
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center p-1">
            {isAddedToWealthCounsel ? (
              <Check className="w-5 h-5" />
            ) : (
              <img 
                src="/lovable-uploads/14b38707-140d-4b73-a1ec-440ea4ca4120.png" 
                alt="Wealth Counsel Logo" 
                className="w-6 h-6 object-contain"
              />
            )}
          </div>
          <span>
            {isAddedToWealthCounsel ? "Added to Wealth Counsel" : "Add to Wealth Counsel"}
          </span>
        </div>
      </Button>
    </div>
  );

  const RightSidebarContent = () => (
    <div className="space-y-6">
      <WealthCounselButton />
      
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
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-card px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4 flex-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 h-8 md:h-9"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile Details Button */}
          {isMobile && (
            <Sheet open={isDetailsPanelOpen} onOpenChange={setIsDetailsPanelOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Info className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
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
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <RightSidebarContent />
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          )}
          <Button size="sm" variant="outline" className="shrink-0">
            <Plus className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Add to Rolodex</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Center Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Client Header */}
          <div className="p-4 md:p-6 border-b bg-card">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Avatar className="w-12 h-12 md:w-16 md:h-16 mx-auto sm:mx-0">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-xl md:text-2xl font-bold">{client.name}</h1>
                  <p className="text-muted-foreground mt-1 text-sm md:text-base">{client.title}</p>
                  
                  {/* Social/Contact Icons */}
                  <ScrollArea className="w-full">
                    <div className="flex items-center gap-2 mt-4 pb-2 justify-center sm:justify-start">
                      <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Building2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 touch-manipulation min-h-[44px]">
                  Add note
                </Button>
                <Button size="sm" variant="outline" className="touch-manipulation min-h-[44px]">
                  Action
                  <MoreHorizontal className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b px-4 md:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
              <ScrollArea className="w-full">
                <TabsList className="bg-transparent border-none p-0 h-auto flex w-max min-w-full justify-start">
                  <TabsTrigger 
                    value="overview" 
                    className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team" 
                    className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none touch-manipulation min-h-[44px] px-3 md:px-4 flex items-center gap-2"
                  >
                    <span className="whitespace-nowrap">Team connections</span>
                    <Badge variant="secondary" className="ml-1 flex-shrink-0">1</Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tasks" 
                    className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger 
                    value="companies" 
                    className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none touch-manipulation min-h-[44px] px-3 md:px-4 flex items-center gap-2"
                  >
                    <span className="whitespace-nowrap">Companies</span>
                    <Badge variant="secondary" className="ml-1 flex-shrink-0">4</Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="linkedin" 
                    className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none touch-manipulation min-h-[44px] px-3 md:px-4 flex items-center gap-1"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="whitespace-nowrap">LinkedIn</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="updates" 
                    className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Updates
                  </TabsTrigger>
                </TabsList>
              </ScrollArea>

              {/* Tab Content - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <TabsContent value="overview" className="mt-0 p-4 md:p-6">
                  <div className="space-y-6">
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
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <h3 className="font-medium">Your team</h3>
                        </div>
                        <span className="text-sm text-blue-600">1 team connection</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg border">
                        <Avatar className="w-8 h-8 mx-auto sm:mx-0">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                          <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
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
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="w-5 h-5">
                                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20&fit=crop&crop=face" />
                                        <AvatarFallback>CB</AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium text-sm">Christopher Brereton</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-muted-foreground">received an email</span>
                                      <Badge variant="outline" className="text-xs">🔒</Badge>
                                    </div>
                                  </div>
                                  <div className="bg-muted/50 rounded p-2">
                                    <p className="font-medium text-sm">Re: UI/UX</p>
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">2 days ago</span>
                              </div>

                              <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/30">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                  <Mail className="w-4 h-4 text-orange-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="w-5 h-5">
                                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=20&h=20&fit=crop&crop=face" />
                                        <AvatarFallback>CB</AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium text-sm">Christopher Brereton</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-muted-foreground">received an email</span>
                                      <Badge variant="outline" className="text-xs">🔒</Badge>
                                    </div>
                                  </div>
                                  <div className="bg-muted/50 rounded p-2">
                                    <p className="font-medium text-sm">Re: UI/UX</p>
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">2 days ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Other tab contents */}
                <TabsContent value="team" className="mt-0 p-4 md:p-6">
                  <p className="text-muted-foreground">Team connections content...</p>
                </TabsContent>
                <TabsContent value="tasks" className="mt-0 p-4 md:p-6">
                  <p className="text-muted-foreground">Tasks content...</p>
                </TabsContent>
                <TabsContent value="companies" className="mt-0 p-4 md:p-6">
                  <p className="text-muted-foreground">Companies content...</p>
                </TabsContent>
                <TabsContent value="linkedin" className="mt-0 p-4 md:p-6">
                  <p className="text-muted-foreground">LinkedIn content...</p>
                </TabsContent>
                <TabsContent value="updates" className="mt-0 p-4 md:p-6">
                  <p className="text-muted-foreground">Updates content...</p>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar - DETAILS - Hidden on mobile/tablet */}
        <div className="hidden lg:block w-80 border-l bg-card overflow-y-auto">
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

          <div className="p-4">
            <RightSidebarContent />
          </div>
        </div>
      </div>
    </div>
  );
}
