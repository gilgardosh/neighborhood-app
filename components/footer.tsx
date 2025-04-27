import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-gray-100 dark:bg-gray-800/50">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-right">
            &copy; {currentYear} הדרים
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
            צור קשר
          </Link>
        </div>
      </div>
    </footer>
  )
}
