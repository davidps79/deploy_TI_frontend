"use client"

import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const AuthWall = ({ children }: { children: any }) => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) router.push("login")
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default AuthWall