"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import MultipleQuestion from './MultipleQuestion'
import UniqueQuestion from './UniqueQuestion'
import { Question } from '@/lib/question'
import MessageBubble from './MessageBubble'
import instance from '@/lib/axiosInstance'
import { ChatContext } from './Interaction'
import PointsQuestion from './PointsQuestion'

export type TextMessage = { side: string, content: string }
export type Message = TextMessage | Question

const Chat = ({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement> }) => {
    const { messages } = useContext(ChatContext)

    return (
        <ScrollArea className='relative h-[92vh] w-full' viewportRef={scrollRef}>
            <div className='w-full h-screen relative flex justify-center'>
                <div className='mt-8 h-fit pb-16 max-w-3xl w-full flex flex-col gap-2'>
                    {
                        messages.map((message: any, idx: number) => (
                            message.statement ?
                                message.answer_mode == 1 ?
                                    <UniqueQuestion key={idx} question={message} />
                                    :
                                    message.answer_mode == 2 ?
                                        <MultipleQuestion key={idx} question={message} />
                                        :
                                        <PointsQuestion key={idx} question={message} />
                                :
                                <MessageBubble key={idx} side={message.side} content={message.content} />
                        ))
                    }

                </div>
            </div>
        </ScrollArea>)
}

export default Chat