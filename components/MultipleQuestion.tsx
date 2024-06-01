"use client"

import React, { useContext, useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Question } from '@/lib/question'
import { ChatContext } from './Interaction'

const MultipleQuestion = ({question} : {question: Question}) => {
    const [selected, setSelected] = useState<number[]>([])
    const {answers, setAnswers, round} = useContext(ChatContext);
    const disabled = round != question.round

    return (
        <Card className="animate-enter w-[80%] flex flex-col gap-4 p-6">
            {question.statement}

            <div className='grid grid-cols-s w-full gap-2'>
                {
                    question.options.map((option: string, i: number) => (
                        <Button disabled={disabled} key={i} onClick={() => {
                            let newSelected = [...selected]

                            if (selected.includes(i)) {newSelected = newSelected.filter((j) => j != i)}
                            else newSelected.push(i)

                            const newAns = {...answers}
                            newAns[question.fact] = newSelected
                        
                            setAnswers(newAns)
                            setSelected(newSelected)
                        }} className={'!justify-start text-wrap text-left w-full transition-all ' + (selected.includes(i)? "selected" : "")} variant="secondary">
                            {option}
                        </Button>
                    ))
                }
            </div>
        </Card>
    )
}

export default MultipleQuestion