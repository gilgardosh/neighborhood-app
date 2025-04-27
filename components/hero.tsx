import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/30 dark:to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center space-y-2">
            <Image src="/icon.png" alt="הדרים" width={64} height={64} className="mb-4" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">שכונת הדרים</h1>
          </div>
          <div className="space-x-4 rtl:space-x-reverse">
            <Link href="#events">
              <Button className="ml-4">אירועים</Button>
            </Link>
            <Link href="#whatsapp-groups">
              <Button variant="outline" className="ml-4">
                קבוצות וואטסאפ
              </Button>
            </Link>
            <Link href="#services">
              <Button variant="outline">נותני שירות</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
