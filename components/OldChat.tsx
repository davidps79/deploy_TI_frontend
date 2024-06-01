"use client"

import Chat from './Chat'
import SendButton from './SendButton'
import { Question } from '@/lib/question'
import instance from '@/lib/axiosInstance'
import { useEffect, useRef, useState } from 'react'

import MessageBubble from './MessageBubble'
import { ScrollArea } from './ui/scroll-area'

const OldChat = ({ data }: { data: any }) => {
    const [messages, setMessages] = useState<any>([])
    const msgsFromData: string[] = JSON.parse(data.data)

    function addMessages(msgs: string[]) {
        setMessages([...messages, ...(msgs)])
    }

    useEffect(() => {
        addMessages(msgsFromData)
    }, [])

    return (
        <>
            <ScrollArea className='relative h-[92vh] w-full' viewportRef={null}>
                <div className='w-full h-screen relative flex justify-center'>
                    <div className='mt-8 h-fit pb-2 max-w-3xl w-full flex flex-col gap-2'>
                        {
                            messages.map((message: string, idx: number) => (
                                <MessageBubble key={idx} side="l" content={message} />
                            ))
                        }

                    </div>
                </div>
            </ScrollArea>
        </>
    )
}

export default OldChat