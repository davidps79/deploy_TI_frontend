import React, { useContext, useState } from 'react'
import { Button } from './ui/button'
import { IconSend } from '@tabler/icons-react'
import { ChatContext } from './Interaction'
import { Question } from '@/lib/question'
import instance from '@/lib/axiosInstance'
import { IconLoader } from '@tabler/icons-react'

const SendButton = ({}) => {
    const [loading, setLoading] = useState(false)

    const { toSave, condition, round, queue, nextRound, questions, answers, addMessages }: { toSave: string[], round: number, queue: any, nextRound: any, condition: string, addMessages: any, questions: Question[], answers: any, setAnswers: any } = useContext(ChatContext)

    const submit = async (condition: string, quizAnswers: Object) => {
        const res = await instance.post("analyze", { condition, answers: quizAnswers })
        toSave.push(res.data)

        if (round==0) res.data.map((diag: string) => queue.push(diag))
        else
            addMessages(res.data.map((msg: string) => { return { side: "l", content: msg } }))
        nextRound()
    }

    const handleClick = async () => {
        setLoading(true)

        const ans = validateForm()

        if (ans == true) {
            const quizAnswers = Object.fromEntries(questions.map((question) => [question.fact,
            question.answer_mode == 1 ?
                ((answers[question.fact] + 1) + "")
                :
                question.answer_mode == 2 ?
                    (answers[question.fact].map((i: number) => (i + 1) + ""))
                    :
                    (answers[question.fact])
            ]))
            await submit(condition, quizAnswers)
        }

        setLoading(false)
    }

    const validateForm = () => {
        if (!answers) return false;

        return Object.entries(answers).every((pair) => {
            if (Array.isArray(pair[1])) return pair[1].length > 0;
            else return pair[1] != null;
        })
    }

    return (
        <div className="absolute bottom-0 pt-12 pb-6 w-full flex justify-center bg-gradient-to-t from-slate-50 from-75% to-slate-50/0">
            <div className='max-w-2xl w-full flex flex-col items-center gap-2'>
                <Button disabled={loading || !validateForm()} onClick={handleClick} size="lg" className='w-full px-2' >
                    {
                        loading ?
                            <IconLoader className='animate-spin' />
                            :
                            <>
                                <IconSend className='mr-2' />
                                Enviar respuestas
                            </>
                    }
                </Button>

                <span className='text-sm text-center text-slate-600'>
                    MentalChat puede cometer errores. Considera verificar con un especialista
                </span>
            </div>
        </div>)
}

export default SendButton