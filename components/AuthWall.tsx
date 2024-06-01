"use client"

import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'

const AuthWall = ({ children }: { children: any }) => {
    const token = localStorage.getItem('auth_token');

    const router = useRouter()

    if (!token) router.push("login")

    return (
        <>
            {children}
        </>
    )
}

export default AuthWall