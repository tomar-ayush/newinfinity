import Dashboard from '@/components/HOC/Dashboard'
import Userdash from "../../../components/dashboard/user-dash.tsx"
import React from 'react'

const page = () => {
    return (
        <Dashboard>
        <Userdash />
        </Dashboard>
    )
}

export default page
