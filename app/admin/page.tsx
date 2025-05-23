import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MessageSquare, Users, Settings } from "lucide-react"
import AdminHeader from "@/components/admin-header"
import AuthGuard from "@/components/auth-guard"

export default function AdminDashboard() {
  return (
    <AuthGuard requireAuth requireAdmin>
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">לוח בקרה</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
              <TabsTrigger value="events">אירועים</TabsTrigger>
              <TabsTrigger value="groups">קבוצות</TabsTrigger>
              <TabsTrigger value="users">משתמשים</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">אירועים פעילים</CardTitle>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">+2 מהחודש שעבר</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">קבוצות וואטסאפ</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6</div>
                    <p className="text-xs text-muted-foreground">+1 מהחודש שעבר</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">משתמשים רשומים</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+5 מהחודש שעבר</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">נותני שירות</CardTitle>
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">ללא שינוי מהחודש שעבר</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>אירועים קרובים</CardTitle>
                    <CardDescription>לוח זמנים של אירועים בשבועיים הקרובים</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>יריד קהילתי</span>
                        <span className="text-sm text-muted-foreground">28/04/2025</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>הרצאה: גינון בר-קיימא</span>
                        <span className="text-sm text-muted-foreground">30/04/2025</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>ניקיון שכונתי</span>
                        <span className="text-sm text-muted-foreground">05/05/2025</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>פעילות אחרונה</CardTitle>
                    <CardDescription>פעולות אחרונות שבוצעו באתר</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>נוסף אירוע חדש</span>
                        <span className="text-sm text-muted-foreground">לפני 2 שעות</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>נוסף נותן שירות חדש</span>
                        <span className="text-sm text-muted-foreground">לפני יום</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span>עודכנה קבוצת וואטסאפ</span>
                        <span className="text-sm text-muted-foreground">לפני 3 ימים</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ניהול אירועים</CardTitle>
                  <CardDescription>צפייה, הוספה ועריכה של אירועים</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">תוכן ניהול האירועים יופיע כאן</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="groups" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ניהול קבוצות וואטסאפ</CardTitle>
                  <CardDescription>צפייה, הוספה ועריכה של קבוצות וואטסאפ</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">תוכן ניהול קבוצות וואטסאפ יופיע כאן</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ניהול משתמשים</CardTitle>
                  <CardDescription>צפייה, הוספה ועריכה של משתמשים</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">תוכן ניהול המשתמשים יופיע כאן</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AuthGuard>
  )
}
