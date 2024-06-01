"use client"

import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const AuthWall = ({ children }: { children: any }) => {
    const router = useRouter()
    const token = useRef<any>(null)

    useEffect(() => {
        token.current = localStorage.getItem('auth_token');
    }, [])

    if (!token.current) router.push("login")

    return (
        <>
            {children}
        </>
    )
}

export default AuthWall