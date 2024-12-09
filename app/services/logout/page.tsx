import Dashboard from '@/components/HOC/Dashboard'
import Logout from "@/components/auth/logout"
import React from 'react'

const page = () => {
    return (
        <Dashboard>
            <Logout />
        </Dashboard>
    )
}

export default page;
