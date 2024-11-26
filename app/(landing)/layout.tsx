import { SiteFooter } from '../../components/site-footer'
import { SiteHeader } from '../../components/site-header'

interface MarketingLayoutProps {
   children: React.ReactNode
}

export default async function MarketingLayout({
   children,
}: MarketingLayoutProps) {
   return (
      <>
         <SiteHeader />
         <main className="mx-auto flex-1 overflow-hidden">{children}</main>
         <SiteFooter />
      </>
   )
}
//

// import { SiteFooter } from '../../components/site-footer'
// import { SiteHeader } from '../../components/site-header'
// import { useEffect, useState } from 'react'
//
// interface MarketingLayoutProps {
//    children: React.ReactNode
// }
//
// export default function MarketingLayout({ children }: MarketingLayoutProps) {
//    const [user, setUser] = useState<boolean>(false)
//
//    // Check for JWT token in cookies to determine user authentication
//    useEffect(() => {
//       const token = document.cookie
//          .split('; ')
//          .find((row) => row.startsWith('token='))
//          ?.split('=')[1]
//       
//       if (token) {
//          setUser(true) // If token exists, user is logged in
//       } else {
//          setUser(false) // If no token, user is logged out
//       }
//    }, [])
//
//    return (
//       <>
//          <SiteHeader user={user} />
//          <main className="mx-auto flex-1 overflow-hidden">{children}</main>
//          <SiteFooter />
//       </>
//    )
// }
