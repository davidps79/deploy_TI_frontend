"use client"

import React, { useContext, useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Question } from '@/lib/question'
import { ChatContext } from './Interaction'

const UniqueQuestion = ({ question }: { question: Question }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const {answers, setAnswers, round } = useContext(ChatContext);
    const disabled = round != question.round

    return (
        <Card className='animate-enter w-[80%] p-6 flex flex-col gap-4'>
            {question.statement}

            <div className='grid grid-cols-1 w-full gap-2'>
                {
                    question.options.map((option: string, i: number) => (
                        <Button disabled={disabled} key={i} onClick={() => {
                            const newAns = {...answers}
                            newAns[question.fact] = i
                            
                            setAnswers(newAns)
                            setSelected(i)
                        }} className={'!justify-start w-full transition-all ' + (selected == i ? "selected" : "")} variant="secondary">
                            {option}
                        </Button>
                    ))
                }
            </div>
        </Card>
    )
}

export default UniqueQuestion