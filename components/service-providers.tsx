"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Search, Phone, Mail, ExternalLink } from "lucide-react"

// Sample service providers data
const serviceProviders = [
  {
    id: 1,
    name: "אבי כהן",
    profession: "אינסטלטור",
    phone: "050-1234567",
    email: "avi@example.com",
    rating: 4.8,
    reviews: 56,
    category: "תחזוקת בית",
  },
  {
    id: 2,
    name: "מיכל לוי",
    profession: "חשמלאית",
    phone: "052-7654321",
    email: "michal@example.com",
    rating: 4.9,
    reviews: 78,
    category: "תחזוקת בית",
  },
  {
    id: 3,
    name: "יוסי אברהם",
    profession: "גנן",
    phone: "054-9876543",
    email: "yossi@example.com",
    rating: 4.7,
    reviews: 42,
    category: "גינון",
  },
  {
    id: 4,
    name: "רונית שרון",
    profession: "מורה פרטית",
    phone: "053-1472583",
    email: "ronit@example.com",
    rating: 5.0,
    reviews: 35,
    category: "חינוך",
  },
  {
    id: 5,
    name: "דוד ישראלי",
    profession: "מנקה",
    phone: "050-9638527",
    email: "david@example.com",
    rating: 4.6,
    reviews: 29,
    category: "ניקיון",
  },
  {
    id: 6,
    name: "שרה כהן",
    profession: "בייביסיטר",
    phone: "052-3698741",
    email: "sara@example.com",
    rating: 4.9,
    reviews: 47,
    category: "טיפול בילדים",
  },
  {
    id: 7,
    name: "משה לוי",
    profession: "נגר",
    phone: "054-7539518",
    email: "moshe@example.com",
    rating: 4.7,
    reviews: 38,
    category: "תחזוקת בית",
  },
  {
    id: 8,
    name: "נועה ברק",
    profession: "מאמנת כושר",
    phone: "053-9517538",
    email: "noa@example.com",
    rating: 4.8,
    reviews: 52,
    category: "בריאות וכושר",
  },
]

// Get unique categories
const categories = Array.from(new Set(serviceProviders.map((provider) => provider.category)))

export default function ServiceProviders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("הכל")

  // Filter service providers based on search term and active category
  const filteredProviders = serviceProviders.filter((provider) => {
    const matchesSearch = provider.name.includes(searchTerm) || provider.profession.includes(searchTerm)

    const matchesCategory = activeCategory === "הכל" || provider.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <section id="services" className="w-full py-12 md:py-24 bg-green-50 dark:bg-green-950/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">נותני שירות</h2>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="חיפוש..."
                className="pr-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="הכל" className="w-full sm:w-auto" onValueChange={setActiveCategory}>
              <TabsList className="w-full sm:w-auto overflow-auto">
                <TabsTrigger value="הכל">הכל</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>{provider.name}</CardTitle>
                  <CardDescription>{provider.profession}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary ml-1" />
                      <span className="font-medium">{provider.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground mr-2">({provider.reviews})</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 ml-2 text-muted-foreground" />
                      <a href={`tel:${provider.phone}`} className="hover:underline">
                        {provider.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 ml-2 text-muted-foreground" />
                      <a href={`mailto:${provider.email}`} className="hover:underline">
                        {provider.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 ml-2" />
                    פרטים
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredProviders.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h4 className="text-lg font-medium">לא נמצאו תוצאות</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
