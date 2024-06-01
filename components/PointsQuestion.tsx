"use client"

import React, { useContext, useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Question } from '@/lib/question'
import { ChatContext } from './Interaction'
import PointInput from './PointInput'

const PointsQuestion = ({ question }: { question: Question }) => {
    const [points, setPoints] = useState<number[]>(Array(question.options.length).fill(0))
    const { answers, setAnswers, round } = useContext(ChatContext);
    const disabled = question.round != round

    return (
        <Card className="animate-enter w-[80%] flex flex-col gap-4 p-6">
            {question.statement}

            <div className='grid grid-cols-s w-full gap-4'>
                {
                    question.options.map((option: string, idx: number) => (
                        <div key={idx} className='flex justify-between gap-2'>
                            <span className='w-8/12'>
                                {option}
                            </span>
                            <PointInput disabled={disabled} points={points[idx]} setPoints={(p: number) => {
                                if (p>4 || p<0) return;

                                const newPoints = [...points]
                                newPoints[idx] = p
                                const newAns = {...answers}
                                newAns[question.fact] = points.reduce((a: number, b: number) => a+b, 0)
                                setAnswers(newAns)

                                setPoints(newPoints)
                            }} >

                            </PointInput>
                        </div>
                    ))
                }
            </div>
        </Card>
    )
}

export default PointsQuestion