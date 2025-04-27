"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDateHebrew, formatTimeHebrew, getDayNameHebrew } from "@/lib/date-utils"
import { CalendarIcon, MapPin, Clock, Filter, ChevronDown, ChevronUp, Calendar, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Sample events data
const events = [
  {
    id: 1,
    title: "יריד קהילתי",
    description:
      "יריד מוצרים מקומיים של תושבי השכונה. הזדמנות מצוינת להכיר את היוצרים המקומיים ולרכוש מוצרים ייחודיים.",
    startDate: new Date(2025, 3, 28, 16, 0),
    endDate: new Date(2025, 3, 28, 20, 0),
    location: "גן ציבורי מרכזי",
    category: "קהילה",
    organizer: "ועד השכונה",
    contact: "050-1234567",
  },
  {
    id: 2,
    title: "הרצאה: גינון בר-קיימא",
    description: "הרצאה מעשירה על גינון בר-קיימא וחסכון במים. המרצה יעקב לוי, אגרונום ומומחה לגינון אקולוגי.",
    startDate: new Date(2025, 3, 30, 19, 0),
    endDate: new Date(2025, 3, 30, 21, 0),
    location: 'מתנ"ס השכונה',
    category: "חינוך",
    organizer: "פורום איכות הסביבה",
    contact: "052-9876543",
  },
  {
    id: 3,
    title: "ניקיון שכונתי",
    description: "מבצע ניקיון שכונתי בהשתתפות תושבי השכונה. נפגשים בכיכר המרכזית, מומלץ להביא כפפות.",
    startDate: new Date(2025, 4, 5, 9, 0),
    endDate: new Date(2025, 4, 5, 12, 0),
    location: "כיכר מרכזית",
    category: "סביבה",
    organizer: "מחלקת שפ״ע",
    contact: "03-1234567",
  },
  {
    id: 4,
    title: "ערב סרט קהילתי",
    description: "הקרנת סרט משפחתי תחת כיפת השמיים. הביאו שמיכות וכריות לישיבה נוחה. יימכרו פופקורן ושתייה במקום.",
    startDate: new Date(2025, 4, 10, 20, 0),
    endDate: new Date(2025, 4, 10, 22, 30),
    location: "פארק השכונה",
    category: "תרבות",
    organizer: "מועדון הסרט הטוב",
    contact: "054-7654321",
  },
  {
    id: 5,
    title: "שוק קח-תן",
    description: "שוק החלפות שכונתי - הביאו פריטים שאינכם צריכים וקחו דברים שתוכלו להשתמש בהם. עזרו לסביבה ולקהילה.",
    startDate: new Date(2025, 4, 15, 16, 0),
    endDate: new Date(2025, 4, 15, 19, 0),
    location: 'רחבת המתנ"ס',
    category: "קהילה",
    organizer: "פורום קיימות שכונתי",
    contact: "050-5555555",
  },
  {
    id: 6,
    title: "סדנת אומנות לילדים",
    description: "סדנת יצירה לילדים בגילאי 5-12. כל הציוד מסופק במקום. מספר המקומות מוגבל, יש להירשם מראש.",
    startDate: new Date(2025, 4, 20, 17, 0),
    endDate: new Date(2025, 4, 20, 19, 0),
    location: "מרכז קהילתי",
    category: "חינוך",
    organizer: "מחלקת תרבות",
    contact: "03-9876543",
  },
  {
    id: 7,
    title: "מפגש ועד שכונה",
    description: "מפגש פתוח לתושבים עם ועד השכונה. הזדמנות להעלות נושאים, לשאול שאלות ולהשפיע על החיים בשכונה.",
    startDate: new Date(2025, 4, 25, 20, 0),
    endDate: new Date(2025, 4, 25, 22, 0),
    location: 'מתנ"ס השכונה',
    category: "קהילה",
    organizer: "ועד השכונה",
    contact: "052-1234567",
  },
]

// Get unique categories
const categories = Array.from(new Set(events.map((event) => event.category)))

// Time period options
const timePeriods = [
  { id: "all", label: "כל האירועים" },
  { id: "upcoming", label: "אירועים קרובים" },
  { id: "week", label: "השבוע" },
  { id: "month", label: "החודש" },
]

// Function to generate Google Calendar URL
const generateCalendarUrl = (event: (typeof events)[0]) => {
  const startTime = event.startDate.toISOString().replace(/-|:|\.\d+/g, "")
  const endTime = event.endDate.toISOString().replace(/-|:|\.\d+/g, "")

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
}

export default function EventsCalendar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("all")
  const [expandedEvents, setExpandedEvents] = useState<Record<number, boolean>>({})

  // Toggle event expansion
  const toggleEventExpansion = (eventId: number) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }))
  }

  // Filter events based on selected category and time period
  const filteredEvents = events
    .filter((event) => {
      // Filter by category
      if (selectedCategory !== "all" && event.category !== selectedCategory) {
        return false
      }

      // Filter by time period
      const today = new Date()
      const eventDate = new Date(event.startDate)

      if (selectedTimePeriod === "upcoming") {
        return eventDate >= today
      }

      if (selectedTimePeriod === "week") {
        const oneWeek = new Date(today)
        oneWeek.setDate(today.getDate() + 7)
        return eventDate >= today && eventDate <= oneWeek
      }

      if (selectedTimePeriod === "month") {
        const oneMonth = new Date(today)
        oneMonth.setMonth(today.getMonth() + 1)
        return eventDate >= today && eventDate <= oneMonth
      }

      return true
    })
    // Sort by date (ascending)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

  return (
    <section id="events" className="w-full py-8 md:py-16 bg-orange-50 dark:bg-orange-950/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">אירועים</h2>
        </div>

        <div className="mt-6 space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">סינון:</span>
              </div>

              <Tabs
                defaultValue="all"
                className="w-full sm:w-auto"
                value={selectedTimePeriod}
                onValueChange={setSelectedTimePeriod}
              >
                <TabsList className="w-full sm:w-auto overflow-auto">
                  {timePeriods.map((period) => (
                    <TabsTrigger key={period.id} value={period.id}>
                      {period.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הקטגוריות</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const isExpanded = expandedEvents[event.id] || false
                const eventDate = new Date(event.startDate)

                return (
                  <Card
                    key={event.id}
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      isExpanded ? "shadow-md" : "shadow-sm hover:shadow-md",
                    )}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg md:text-xl">{event.title}</CardTitle>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 ml-1 flex-shrink-0" />
                            <span>
                              {getDayNameHebrew(eventDate)}, {formatDateHebrew(eventDate)}
                            </span>
                          </div>
                        </div>
                        <Badge className="ml-2 bg-orange-500 hover:bg-orange-600">{event.category}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-4">
                      <div
                        className="flex items-center justify-between cursor-pointer mb-3"
                        onClick={() => toggleEventExpansion(event.id)}
                      >
                        <div className="flex items-center">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 ml-1 text-muted-foreground" />
                            <span>
                              {formatTimeHebrew(event.startDate)} - {formatTimeHebrew(event.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center text-sm mr-4">
                            <MapPin className="h-4 w-4 ml-1 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="pt-2 border-t">
                          <div className="grid gap-3">
                            <p className="text-sm">{event.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">מארגן:</span>
                                <span>{event.organizer}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">יצירת קשר:</span>
                                <a href={`tel:${event.contact}`} className="text-primary hover:underline">
                                  {event.contact}
                                </a>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Button variant="outline" size="sm" className="h-8 text-xs">
                                פרטים נוספים
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
                                <a
                                  href={generateCalendarUrl(event)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Plus className="h-3.5 w-3.5 ml-1" />
                                  הוסף ליומן
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-lg">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h4 className="text-lg font-medium">לא נמצאו אירועים</h4>
                <p className="text-sm text-muted-foreground mt-1">נסו לשנות את הגדרות הסינון</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
