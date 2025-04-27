import Header from "@/components/header"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import WhatsAppGroups from "@/components/whatsapp-groups"
import EventsCalendar from "@/components/events-calendar"
import ServiceProviders from "@/components/service-providers"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <EventsCalendar />
        <WhatsAppGroups />
        <ServiceProviders />
      </main>
      <Footer />
    </div>
  )
}
