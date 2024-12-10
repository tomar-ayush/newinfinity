"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utilss";
import { IconBrandTabler, IconLogout, IconSettings } from "@tabler/icons-react";
import { BotMessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Dashboard Component
export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // Sidebar navigation links
  const links = [
    {
      label: "Dashboard",
      href: "/services/dashboard",
      icon: (
        <BotMessageSquareIcon className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "AI Mailer",
      href: "/services/ai-mailer",
      icon: (
        <BotMessageSquareIcon className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "AI WebBot",
      href: "/services/ai-webbot",
      icon: (
        <IconBrandTabler className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/services/profile",
      icon: (
        <IconSettings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/services/logout",
      icon: (
        <IconLogout className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "flex h-screen overflow-hidden bg-gray-100 dark:bg-neutral-800"
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col gap-10 justify-between">
          <div className="flex flex-col flex-1">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {/* Profile           <SidebarLink
            link={{
              label: "",
              href: "/services/profile",
              icon: <Profile />,
            }}
          />*/}

        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {/* skeleton loader */}
          {/* <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div> */}
          {children}
        </div>
        <div className="relative top-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

// Logo Component
const Logo = () => (
  <Link
    href="/"
    className="flex items-center text-2xl font-bold text-black dark:text-white"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-lg flex-shrink-0" />
    <span className="ml-2">
      Infinity<span className="text-blue-500">AI</span>
    </span>
  </Link>
);

// Logo Icon Component (for collapsed sidebar)
const LogoIcon = () => (
  <Link href="#" className="flex items-center text-sm text-black py-1">
    <div className="h-5 w-6 bg-black dark:bg-white rounded-lg flex-shrink-0" />
  </Link>
);

// Profile Component
const Profile = () => (
  <Link href="#" className="flex items-center text-sm text-black py-1">
    <div
      className="flex items-center justify-center rounded-full bg-blue-500 text-white font-bold"
      style={{ width: 30, height: 30, fontSize: 15 }} // Adjust size and font size
    >
      U
    </div>
  </Link>
);
