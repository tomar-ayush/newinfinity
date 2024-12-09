import { ThemeProvider } from '@/components/theme-provider'
interface DashboardProps {
    children: React.ReactNode
}

const DashboardMain = ({ children }: DashboardProps) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            <div>
                {children}
            </div>
        </ThemeProvider>
    )
}

export default DashboardMain 
