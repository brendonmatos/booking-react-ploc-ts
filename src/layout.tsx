import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: ExamplesLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Button
              variant="outline"
              role="combobox"
              className={cn("")}
            >
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={`https://avatar.vercel.sh/personal.png`}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span className="truncate">The Hotel Booking</span>
            </Button>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
        
          <section>
              {children}
          </section>
          </div>
      </div>
    </ThemeProvider>    
  )
}