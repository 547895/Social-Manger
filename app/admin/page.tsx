"use client"

import { useState } from "react"
import { Calendar, Edit, Eye, MoreHorizontal, Plus, Trash2, Upload } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from "@/components/sidebar"

const mockAdminContent = [
  {
    id: 1,
    title: "Summer Product Launch",
    platform: "Instagram",
    type: "Image",
    status: "Published",
    publishDate: "2024-01-15",
    createdBy: "John Doe",
    engagement: { likes: 1250, comments: 89, shares: 45, reach: 15000 },
    thumbnail: "/summer-product.png",
  },
  {
    id: 2,
    title: "Behind the Scenes Video",
    platform: "YouTube",
    type: "Video",
    status: "Published",
    publishDate: "2024-01-14",
    createdBy: "Jane Smith",
    engagement: { likes: 2100, comments: 156, shares: 78, reach: 25000 },
    thumbnail: "/placeholder-gaq90.png",
  },
  {
    id: 3,
    title: "Industry Insights Article",
    platform: "LinkedIn",
    type: "Article",
    status: "Scheduled",
    publishDate: "2024-01-16",
    createdBy: "Mike Johnson",
    engagement: { likes: 0, comments: 0, shares: 0, reach: 0 },
    thumbnail: "/industry-insights.png",
  },
  {
    id: 4,
    title: "Customer Testimonial",
    platform: "Facebook",
    type: "Image",
    status: "Published",
    publishDate: "2024-01-13",
    createdBy: "Sarah Wilson",
    engagement: { likes: 890, comments: 34, shares: 23, reach: 12000 },
    thumbnail: "/customer-testimonial.png",
  },
  {
    id: 5,
    title: "Product Demo Reel",
    platform: "Instagram",
    type: "Video",
    status: "Published",
    publishDate: "2024-01-12",
    createdBy: "John Doe",
    engagement: { likes: 1850, comments: 92, shares: 67, reach: 18000 },
    thumbnail: "/product-demo-presentation.png",
  },
  {
    id: 6,
    title: "Team Spotlight",
    platform: "LinkedIn",
    type: "Image",
    status: "Draft",
    publishDate: "2024-01-17",
    createdBy: "Jane Smith",
    engagement: { likes: 0, comments: 0, shares: 0, reach: 0 },
    thumbnail: "/team-spotlight.png",
  },
]

const platformColors = {
  Instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  Facebook: "bg-blue-600",
  YouTube: "bg-red-600",
  LinkedIn: "bg-blue-700",
}

const statusColors = {
  Published: "bg-green-100 text-green-800",
  Scheduled: "bg-yellow-100 text-yellow-800",
  Draft: "bg-gray-100 text-gray-800",
}

export default function AdminPanel() {
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContent = mockAdminContent.filter((item) => {
    const matchesPlatform = selectedPlatform === "all" || item.platform.toLowerCase() === selectedPlatform
    const matchesStatus = selectedStatus === "all" || item.status.toLowerCase() === selectedStatus
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPlatform && matchesStatus && matchesSearch
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Manage and monitor all social media content</p>
            </div>
            <div className="flex items-center gap-3">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Content
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList>
              <TabsTrigger value="content">Content Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="schedule">Content Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Content Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Library</CardTitle>
                  <CardDescription>Manage all your social media content across platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Preview</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Publish Date</TableHead>
                        <TableHead>Engagement</TableHead>
                        <TableHead className="w-[50px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContent.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Image
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              width={60}
                              height={60}
                              className="rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${platformColors[item.platform as keyof typeof platformColors]} text-white border-0`}
                            >
                              {item.platform}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.createdBy}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {new Date(item.publishDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>👍 {item.engagement.likes}</div>
                              <div>💬 {item.engagement.comments}</div>
                              <div>📊 {item.engagement.reach}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">70,000</div>
                    <p className="text-xs text-muted-foreground">+20% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.2%</div>
                    <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Best Platform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Instagram</div>
                    <p className="text-xs text-muted-foreground">Highest engagement</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Content Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.5/10</div>
                    <p className="text-xs text-muted-foreground">Above average</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>View and manage your scheduled content across all platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Content calendar view coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
