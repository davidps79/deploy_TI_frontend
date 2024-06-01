"use client"

import React, { Suspense, useContext, useEffect, useState } from 'react'
import instance from '@/lib/axiosInstance'
import { IconLoader } from '@tabler/icons-react';
import MainGUI from './MainGUI';

const ChatLoader = () => {
  const token = localStorage.getItem('auth_token');
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      const res = await instance.get("session/" + token)
      setData(res.data)
    }

    fetch()
  }, [])

  return data ?
    <MainGUI sessions={data} token={token} />
    :
    <ScreenLoader />
}

export default ChatLoader


export const ScreenLoader = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <IconLoader className='animate-spin' />
    </div>
  )
}
