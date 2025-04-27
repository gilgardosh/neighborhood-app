import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

// Sample data for WhatsApp groups
const whatsappGroups = [
  {
    id: 1,
    name: "הודעות כלליות",
    members: 245,
    link: "https://chat.whatsapp.com/example1",
    category: "כללי",
  },
  {
    id: 2,
    name: "הורים לגן רימון",
    members: 68,
    link: "https://chat.whatsapp.com/example2",
    category: "חינוך",
  },
  {
    id: 3,
    name: "ספורט",
    members: 124,
    link: "https://chat.whatsapp.com/example3",
    category: "פנאי",
  },
  {
    id: 4,
    name: "קניות משותפות",
    members: 156,
    link: "https://chat.whatsapp.com/example4",
    category: "צרכנות",
  },
  {
    id: 5,
    name: "דרושים והצעות",
    members: 198,
    link: "https://chat.whatsapp.com/example5",
    category: "תעסוקה",
  },
  {
    id: 6,
    name: "יד שנייה",
    members: 210,
    link: "https://chat.whatsapp.com/example6",
    category: "צרכנות",
  },
]

// Group the WhatsApp groups by category
const groupedByCategory = whatsappGroups.reduce(
  (acc, group) => {
    if (!acc[group.category]) {
      acc[group.category] = []
    }
    acc[group.category].push(group)
    return acc
  },
  {} as Record<string, typeof whatsappGroups>,
)

export default function WhatsAppGroups() {
  return (
    <section id="whatsapp-groups" className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">קבוצות וואטסאפ</h2>
        </div>

        <div className="mt-10 space-y-8">
          {Object.entries(groupedByCategory).map(([category, groups]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-2xl font-bold">{category}</h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {groups.map((group) => (
                  <Card key={group.id} className="bg-white dark:bg-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <MessageSquare className="h-5 w-5 ml-2 text-orange-500" />
                        {group.name}
                      </CardTitle>
                      <CardDescription>{group.members} חברים</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <a href={group.link} target="_blank" rel="noopener noreferrer">
                          הצטרף
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
