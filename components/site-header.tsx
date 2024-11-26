'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { AlignJustify, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ny } from '../lib/utils'
import { Button, buttonVariants } from '../components/ui/button'

const menuItem = [
   { id: 1, label: 'Features', href: '/features' },
   { id: 2, label: 'Pricing', href: '#' },
   { id: 3, label: 'Careers', href: '#' },
   { id: 4, label: 'Contact Us', href: '#' },
]

export function SiteHeader() {
   const mobilenavbarVariant = {
      initial: { opacity: 0, scale: 1 },
      animate: {
         scale: 1,
         opacity: 1,
         transition: { duration: 0.2, ease: 'easeOut' },
      },
      exit: {
         opacity: 0,
         transition: { duration: 0.2, delay: 0.2, ease: 'easeOut' },
      },
   }

   const mobileLinkVar = {
      initial: { y: '-20px', opacity: 0 },
      open: {
         y: 0,
         opacity: 1,
         transition: { duration: 0.3, ease: 'easeOut' },
      },
   }

   const containerVariants = {
      open: {
         transition: { staggerChildren: 0.06 },
      },
   }

   const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false)
   const [user, setUser] = useState<boolean>(false)
   const [isLoading, setIsLoading] = useState(true)

   // Function to verify token on the client side
   const verifyToken = async () => {
      try {
         setIsLoading(true)
         const response = await fetch('/api/verify-token', {
            method: 'GET',
            credentials: 'include',
         })

         if (response.ok) {
            const data = await response.json()
            setUser(data.isValid)
         } else {
            setUser(false)
         }
      } catch (error) {
         console.error('Token verification error:', error)
         setUser(false)
      } finally {
         setIsLoading(false)
      }
   }

   // Check for authentication 
   useEffect(() => {
      verifyToken()
   }, [])

   // Prevent body scroll when mobile menu is open
   useEffect(() => {
      const html = document.querySelector('html')
      if (html) html.classList.toggle('overflow-hidden', hamburgerMenuIsOpen)
   }, [hamburgerMenuIsOpen])

   // Close mobile menu on orientation/resize
   useEffect(() => {
      const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false)
      window.addEventListener('orientationchange', closeHamburgerNavigation)
      window.addEventListener('resize', closeHamburgerNavigation)

      return () => {
         window.removeEventListener('orientationchange', closeHamburgerNavigation)
         window.removeEventListener('resize', closeHamburgerNavigation)
      }
   }, [setHamburgerMenuIsOpen])

   // Render loading state or content
   if (isLoading) {
      return null // or a loading spinner
   }

   return (
      <>
         <header className="animate-fade-in fixed left-0 top-0 z-50 w-full -translate-y-4 border-b opacity-0 backdrop-blur-md [--animation-delay:600ms]">
            <div className="container flex h-14 items-center justify-between">
               <div className="shrink-0">
                  <Link href={"/"} className="text-2xl text-white font-bold">
                     Infinty
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">AI.</span>
                  </Link>
               </div>

               <div className="ml-auto flex h-full items-center">
                  {!user ? (
                     <div>
                        <Link className="mr-6 text-sm" href="/sign-in">
                           Log in
                        </Link>
                        <Link
                           className={ny(buttonVariants({ variant: 'secondary' }), 'mr-6 text-sm')}
                           href="/sign-up"
                        >
                           Sign up
                        </Link>
                     </div>
                  ) : (
                     <div className="flex gap-3">
                        <Link href={'/services/ai-mailer'}>
                           <Button variant="secondary">Features</Button>
                        </Link>
                     </div>
                  )}
               </div>
               <button
                  className="ml-6 md:hidden"
                  onClick={() => setHamburgerMenuIsOpen((open) => !open)}
               >
                  <span className="sr-only">Toggle menu</span>
                  {hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
               </button>
            </div>
         </header>
         <AnimatePresence>
            {/* Rest of the existing rendering code remains the same */}
                        <motion.nav
               initial="initial"
               exit="exit"
               variants={mobilenavbarVariant}
               animate={hamburgerMenuIsOpen ? 'animate' : 'exit'}
               className={ny(
                  `bg-background/70 fixed left-0 top-0 z-50 h-screen w-full overflow-auto backdrop-blur-md `,
                  {
                     'pointer-events-none': !hamburgerMenuIsOpen,
                  },
               )}
            >
               <div className="container flex h-14 items-center justify-between">
                  <Link className="text-md flex items-center" href="/">
                     Infinty AI
                  </Link>

                  <button
                     className="ml-6 md:hidden"
                     onClick={() => setHamburgerMenuIsOpen((open) => !open)}
                  >
                     <span className="sr-only">Toggle menu</span>
                     {hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
                  </button>
               </div>
               <motion.ul
                  className="flex flex-col uppercase ease-in md:flex-row md:items-center md:normal-case"
                  variants={containerVariants}
                  initial="initial"
                  animate={hamburgerMenuIsOpen ? 'open' : 'exit'}
               >
                  {menuItem.map((item) => (
                     <motion.li
                        variants={mobileLinkVar}
                        key={item.id}
                        className="border-grey-dark border-b py-0.5 pl-6 md:border-none"
                     >
                        <Link
                           className={`hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors ${hamburgerMenuIsOpen ? '[&_a]:translate-y-0' : ''}`}
                           href={item.href}
                        >
                           {item.label}
                        </Link>
                     </motion.li>
                  ))}
               </motion.ul>
            </motion.nav>

         </AnimatePresence>
      </>
   )
}
