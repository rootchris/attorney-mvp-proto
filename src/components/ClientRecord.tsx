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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { DocumentsSection } from "@/components/matter/DocumentsSection";
import { Document, Folder } from "@/types/legal";
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
  Check,
  ChevronDown
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

  // Mock client documents data
  const clientDocuments: Document[] = [
    {
      id: 'doc1',
      matterId: 'matter1',
      folderId: 'folder1',
      name: 'Estate Planning Intake Form.pdf',
      type: 'Intake Form',
      uploadedBy: 'Ashley Brereton',
      uploadedAt: '2025-02-28',
      size: 342567,
      url: '#',
      clientVisible: true,
      tags: ['intake', 'estate-planning']
    },
    {
      id: 'doc2',
      matterId: 'matter1',
      folderId: 'folder1',
      name: 'Asset List.xlsx',
      type: 'Financial Document',
      uploadedBy: 'Spencer Dennis',
      uploadedAt: '2025-03-01',
      size: 156890,
      url: '#',
      clientVisible: false,
      tags: ['assets', 'financial']
    },
    {
      id: 'doc3',
      matterId: 'matter1',
      name: 'Trust Agreement Draft.pdf',
      type: 'Trust Document',
      uploadedBy: 'Ashley Brereton',
      uploadedAt: '2025-03-05',
      size: 524288,
      url: '#',
      isWealthCounselDoc: true,
      clientVisible: true,
      tags: ['trust', 'draft']
    },
    {
      id: 'doc4',
      matterId: 'matter2',
      folderId: 'folder2',
      name: 'Business Valuation Report.pdf',
      type: 'Business Document',
      uploadedBy: 'Erin Rodriguez',
      uploadedAt: '2025-03-02',
      size: 1048576,
      url: '#',
      clientVisible: false,
      tags: ['business', 'valuation']
    },
    {
      id: 'doc5',
      matterId: 'matter1',
      folderId: 'folder1',
      name: 'Healthcare Directive.pdf',
      type: 'Legal Document',
      uploadedBy: 'Ashley Brereton',
      uploadedAt: '2025-02-25',
      size: 245760,
      url: '#',
      clientVisible: true,
      tags: ['healthcare', 'directive']
    }
  ];

  const clientFolders: Folder[] = [
    {
      id: 'folder1',
      matterId: 'matter1',
      name: 'Estate Planning Package',
      createdBy: 'Ashley Brereton',
      createdAt: '2025-02-20',
      color: 'text-blue-600'
    },
    {
      id: 'folder2',
      matterId: 'matter2',
      name: 'Business Succession',
      createdBy: 'Erin Rodriguez',
      createdAt: '2025-02-22',
      color: 'text-green-600'
    },
    {
      id: 'folder3',
      matterId: 'matter1',
      name: 'Tax Documents',
      parentFolderId: 'folder1',
      createdBy: 'Ashley Brereton',
      createdAt: '2025-02-25',
      color: 'text-purple-600'
    }
  ];

  // Mock client data - in real app this would come from API
  const client = {
    id: clientId,
    name: "Spencer Dennis",
    title: "Strategist, Sports Tech",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "CoachNow",
    location: "Los Angeles, CA",
    email: "spencer@coachnow.com",
    linkedIn: "linkedin.com/in/spencerdennis",
    phone: "+1 (555) 123-4567",
    status: "client" as "prospect" | "client",
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

  const [clientStatus, setClientStatus] = useState<"prospect" | "client">(client.status);

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
      {/* Status */}
      <div>
        <label className="text-xs text-muted-foreground uppercase mb-2 block">Status</label>
        <Select value={clientStatus} onValueChange={(value: "prospect" | "client") => setClientStatus(value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="prospect">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                Prospect
              </div>
            </SelectItem>
            <SelectItem value="client">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Client
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <WealthCounselButton />
      
      {/* Your interaction */}
      <div>
        <h3 className="font-medium mb-3">Your interaction</h3>
        <div className="text-sm space-y-1">
          <p>You have <strong>10 emails</strong>, <strong>4 events</strong>, and <strong>1 note</strong>.</p>
          <p className="text-muted-foreground">Your last interaction was a email on Aug 27, 2025.</p>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-3 text-primary">
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
          <label className="text-xs text-muted-foreground block mb-2">Phone numbers</label>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-auto p-0">
            <Plus className="w-4 h-4 mr-2" />
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
        <label className="text-xs text-muted-foreground uppercase mb-3 block">Lists</label>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 rounded-full">
            <div className="flex items-center gap-2">
              <span className="text-sm">🏅 Founders</span>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <Plus className="w-3 h-3 rotate-45" />
            </button>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 rounded-full">
            <div className="flex items-center gap-2">
              <span className="text-sm">Startups</span>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <Plus className="w-3 h-3 rotate-45" />
            </button>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="mt-3 text-muted-foreground hover:text-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add to list
        </Button>
      </div>

      <Separator />

      {/* Tags */}
      <div>
        <label className="text-xs text-muted-foreground uppercase mb-3 block">Tags</label>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add tags
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
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <RightSidebarContent />
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Center Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
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
                </div>
              </div>
              
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <Button size="sm" className="touch-manipulation min-h-[44px]">
                  Add note
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="touch-manipulation min-h-[44px]">
                      Action
                      <MoreHorizontal className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      Send Intake Invite (PIF)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Send Annual Review Invite
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                    className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="matters" 
                    className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Matters
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tasks" 
                    className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notes" 
                    className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Notes
                  </TabsTrigger>
                  <TabsTrigger 
                    value="documents" 
                    className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Documents
                  </TabsTrigger>
                  <TabsTrigger 
                    value="relationships" 
                    className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Relationships
                  </TabsTrigger>
                  <TabsTrigger 
                    value="network" 
                    className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Network
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team" 
                    className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none touch-manipulation min-h-[44px] px-3 md:px-4"
                  >
                    Team
                  </TabsTrigger>
                </TabsList>
              </ScrollArea>

              {/* Tab Content */}
              <div className="flex-1">
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-0 p-4 md:p-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Client Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <textarea
                        className="w-full min-h-[200px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Add notes about this client..."
                        defaultValue="Spencer is an experienced founder with a successful exit from CoachNow. Strong connections in the sports tech space. Looking to establish estate planning for family and business succession planning."
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Matters Tab */}
                <TabsContent value="matters" className="mt-0 p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Matters</h3>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        New Matter
                      </Button>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">Estate Planning Package</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Trust & Estate Documents</p>
                          </div>
                          <Badge>Drafting</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created:</span>
                            <span>Jan 15, 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Stage:</span>
                            <span>Client Ready for Draft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Progress:</span>
                            <span>45%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">Business Succession Plan</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Business Planning</p>
                          </div>
                          <Badge variant="secondary">Consult</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created:</span>
                            <span>Feb 1, 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Stage:</span>
                            <span>Prospect</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Progress:</span>
                            <span>10%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Tasks Tab */}
                <TabsContent value="tasks" className="mt-0 p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Tasks</h3>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        New Task
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium">Review trust documents</h4>
                            <p className="text-sm text-muted-foreground mt-1">Estate Planning Package</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">High Priority</Badge>
                              <span className="text-xs text-muted-foreground">Due: Mar 15, 2025</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium">Schedule follow-up consultation</h4>
                            <p className="text-sm text-muted-foreground mt-1">Business Succession Plan</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">Medium Priority</Badge>
                              <span className="text-xs text-muted-foreground">Due: Mar 20, 2025</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" defaultChecked className="mt-1" />
                          <div className="flex-1 opacity-60">
                            <h4 className="font-medium line-through">Send intake questionnaire</h4>
                            <p className="text-sm text-muted-foreground mt-1">Estate Planning Package</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-muted-foreground">Completed: Feb 28, 2025</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Notes Tab */}
                <TabsContent value="notes" className="mt-0 p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Notes</h3>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Note
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Ashley Brereton</p>
                              <p className="text-xs text-muted-foreground">Mar 1, 2025 at 2:30 PM</p>
                            </div>
                          </div>
                          <p className="text-sm mt-2">
                            Client expressed interest in setting up a revocable living trust. Has significant assets from business sale and wants to ensure smooth transfer to children. Mentioned concerns about estate taxes.
                          </p>
                          <Badge variant="secondary" className="text-xs">Estate Planning Package</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Erin Rodriguez</p>
                              <p className="text-xs text-muted-foreground">Feb 20, 2025 at 10:15 AM</p>
                            </div>
                          </div>
                          <p className="text-sm mt-2">
                            Initial consultation went well. Spencer is very organized and prepared. He brought documentation of all his assets and has clear goals. Will need to discuss guardianship arrangements for minor children.
                          </p>
                          <Badge variant="secondary" className="text-xs">General</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-0 p-4 md:p-6">
                  <DocumentsSection documents={clientDocuments} folders={clientFolders} />
                </TabsContent>

                {/* Relationships Tab */}
                <TabsContent value="relationships" className="mt-0 p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Client Relationships</h3>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Link Client
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">Jennifer Dennis</p>
                            <p className="text-sm text-muted-foreground">Spouse</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>MD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">Michael Dennis</p>
                            <p className="text-sm text-muted-foreground">Father</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Users className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Link other client records to track family relationships and related matters
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Network Tab */}
                <TabsContent value="network" className="mt-0 p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Network Contacts</h3>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Contact
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>RJ</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">Robert Johnson</p>
                            <p className="text-sm text-muted-foreground">Financial Advisor - Wells Fargo</p>
                            <p className="text-xs text-muted-foreground mt-1">robert.johnson@wellsfargo.com</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>SK</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">Sarah Kim</p>
                            <p className="text-sm text-muted-foreground">CPA - Kim & Associates</p>
                            <p className="text-xs text-muted-foreground mt-1">sarah@kimcpa.com</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>DM</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">David Martinez</p>
                            <p className="text-sm text-muted-foreground">Insurance Agent - State Farm</p>
                            <p className="text-xs text-muted-foreground mt-1">d.martinez@statefarm.com</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Users className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-3">
                        Add professionals from your network who work with this client
                      </p>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Quick Add New Contact
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Team Tab */}
                <TabsContent value="team" className="mt-0 p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Team Members</h3>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Team Member
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="/src/assets/ashley-avatar.jpg" />
                            <AvatarFallback>AB</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">Ashley Brereton</p>
                            <p className="text-sm text-muted-foreground">Lead Attorney</p>
                            <p className="text-xs text-muted-foreground mt-1">Estate Planning · Trust Administration</p>
                          </div>
                          <Badge variant="outline">Primary</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="/src/assets/erin-avatar.jpg" />
                            <AvatarFallback>ER</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">Erin Rodriguez</p>
                            <p className="text-sm text-muted-foreground">Associate Attorney</p>
                            <p className="text-xs text-muted-foreground mt-1">Business Planning · Tax Strategy</p>
                          </div>
                          <Badge variant="secondary">Collaborating</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>MK</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">Michael Kim</p>
                            <p className="text-sm text-muted-foreground">Paralegal</p>
                            <p className="text-xs text-muted-foreground mt-1">Document Preparation · Client Coordination</p>
                          </div>
                          <Badge variant="secondary">Support</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Users className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Add other attorneys or staff members who are working on this client's matters
                      </p>
                    </div>
                  </div>
                </TabsContent>

              </div>
            </Tabs>
          </div>

          {/* Activity Section - Always Visible */}
          <div className="border-t bg-card">
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-6">Activity</h3>
              <div className="space-y-6">
                {/* 2025 */}
                <div>
                  <h3 className="text-sm font-semibold mb-4">2025</h3>
                  
                  {/* October */}
                  <div className="space-y-4">
                    <h4 className="text-sm text-muted-foreground mb-3">October</h4>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src="/src/assets/ashley-avatar.jpg" />
                              <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-medium">Ashley Brereton</span>
                              <span className="text-muted-foreground"> received an email</span>
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">1 day ago</span>
                        </div>
                        <div className="mt-2 p-3 bg-secondary/50 rounded-md">
                          <p className="text-sm">Re: UI/UX Feedback Discussion</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center">
                        <StickyNote className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-medium">You</span>
                              <span className="text-muted-foreground"> added a note</span>
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">2 days ago</span>
                        </div>
                        <div className="mt-2 p-3 bg-secondary/50 rounded-md">
                          <p className="text-sm">Granola feedback - discussed product requirements</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src="/src/assets/erin-avatar.jpg" />
                              <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-medium">Erin Rodriguez</span>
                              <span className="text-muted-foreground"> accepted meeting</span>
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">3 days ago</span>
                        </div>
                        <div className="mt-2 p-3 bg-secondary/50 rounded-md">
                          <p className="text-sm">Spencer & Team Strategy Call</p>
                          <p className="text-xs text-muted-foreground mt-1">Fri, 22 Oct 25, 10:30am – 11:15am</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* September */}
                <div>
                  <h4 className="text-sm text-muted-foreground mb-3">September</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback>SD</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-medium">Spencer Dennis</span>
                              <span className="text-muted-foreground"> sent an email</span>
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">about 2 months ago</span>
                        </div>
                        <div className="mt-2 p-3 bg-secondary/50 rounded-md">
                          <p className="text-sm">Introduction to Team</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                        <CheckSquare className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-medium">You</span>
                              <span className="text-muted-foreground"> completed task</span>
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">2 months ago</span>
                        </div>
                        <div className="mt-2 p-3 bg-secondary/50 rounded-md">
                          <p className="text-sm">Send intake questionnaire</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Hidden on mobile/tablet */}
        <div className="hidden lg:block w-80 border-l bg-card overflow-y-auto">
          <div className="p-4">
            <RightSidebarContent />
          </div>
        </div>
      </div>
    </div>
  );
}
