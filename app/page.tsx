"use client"

import { useState } from "react"
import { Bell, Calendar, Eye, Heart, MessageCircle, Share2, TrendingUp } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/sidebar"

const mockContent = [
  {
    id: 1,
    title: "Summer Product Launch",
    platform: "Instagram",
    type: "Image",
    status: "Published",
    publishDate: "2024-01-15",
    engagement: { likes: 1250, comments: 89, shares: 45 },
    thumbnail: "/summer-product-launch.png",
  },
  {
    id: 2,
    title: "Behind the Scenes Video",
    platform: "YouTube",
    type: "Video",
    status: "Published",
    publishDate: "2024-01-14",
    engagement: { likes: 2100, comments: 156, shares: 78 },
    thumbnail: "/behind-the-scenes-video.png",
  },
  {
    id: 3,
    title: "Industry Insights Article",
    platform: "LinkedIn",
    type: "Article",
    status: "Scheduled",
    publishDate: "2024-01-16",
    engagement: { likes: 0, comments: 0, shares: 0 },
    thumbnail: "/industry-insights-article.png",
  },
  {
    id: 4,
    title: "Customer Testimonial",
    platform: "Facebook",
    type: "Image",
    status: "Published",
    publishDate: "2024-01-13",
    engagement: { likes: 890, comments: 34, shares: 23 },
    thumbnail: "/customer-testimonial.png",
  },
  {
    id: 5,
    title: "Product Demo Reel",
    platform: "Instagram",
    type: "Video",
    status: "Published",
    publishDate: "2024-01-12",
    engagement: { likes: 1850, comments: 92, shares: 67 },
    thumbnail: "/product-demo-reel.png",
  },
  {
    id: 6,
    title: "Team Spotlight",
    platform: "LinkedIn",
    type: "Image",
    status: "Draft",
    publishDate: "2024-01-17",
    engagement: { likes: 0, comments: 0, shares: 0 },
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

export default function ClientDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContent = mockContent.filter((item) => {
    const matchesPlatform = selectedPlatform === "all" || item.platform.toLowerCase() === selectedPlatform
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPlatform && matchesSearch
  })

  const totalEngagement = mockContent.reduce(
    (acc, item) => ({
      likes: acc.likes + item.engagement.likes,
      comments: acc.comments + item.engagement.comments,
      shares: acc.shares + item.engagement.shares,
    }),
    { likes: 0, comments: 0, shares: 0 },
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Dashboard</h1>
              <p className="text-gray-600">Track your social media content performance</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">C</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockContent.length}</div>
                <p className="text-xs text-muted-foreground">Across all platforms</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEngagement.likes.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comments</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEngagement.comments.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Shares</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEngagement.shares.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge
                      className={`${platformColors[item.platform as keyof typeof platformColors]} text-white border-0`}
                    >
                      {item.platform}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className={statusColors[item.status as keyof typeof statusColors]}>{item.status}</Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.publishDate).toLocaleDateString()}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{item.engagement.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        <span>{item.engagement.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-4 w-4 text-green-500" />
                        <span>{item.engagement.shares}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No content found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
