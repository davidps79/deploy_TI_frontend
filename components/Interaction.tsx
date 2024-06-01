"use client"

import React, { MutableRefObject, createContext, use, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Chat from './Chat'
import SendButton from './SendButton'
import { Question } from '@/lib/question'
import instance from '@/lib/axiosInstance'

export const ChatContext = createContext<any | null>(null)

const Interaction = ({ token }: { token: any }) => {
    const [messages, setMessages] = useState<any>([])

    const questions = useRef<Question[] | null>(null)
    const [round, setRound] = useState(0)

    const [condition, setCondition] = useState("screening")
    const [answers, setAnswers] = useState<any>(null)
    const queue = useRef(["screening"])
    const toSave = useRef([])

    useEffect(() => scrollDown(), [messages])

    function addMessage(msg: any) {
        setMessages([...messages, msg])
    }

    function addChatMessage(msg: string) {
        addMessage({
            side: "l",
            content: msg
        })
    }

    function addMessages(msgs: any) {
        setMessages([...messages, ...msgs])
    }

    const fetchQuestions = async (condition: string) => {
        const res = await instance.get("quiz/" + condition)
        const questionsData = res.data.questions
        setAnswers(Object.fromEntries(questionsData.map((question: Question) => [question.fact, null])))
        questions.current = questionsData.map((question: any) => { return { ...question, round: round } })
        addMessages(questions.current)
    }

    useEffect(() => {
        fetchQuestions(condition)
    }, [condition])

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollDown = () => {
        if (messages.length > 12 && scrollRef !== null && scrollRef.current !== null) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollTop + scrollRef.current.offsetHeight - 100,
                behavior: 'smooth'
            });
        }
    }

    const nextRound = () => {
        setRound(round + 1)
        queue.current.shift()

        if (queue.current.length > 0)
            setCondition(queue.current[0])
        else {
            endRoutine()
        }
    }

    const endRoutine = async () => {
        if (round > 0)
            addChatMessage("¡Eso es todo! Ten en cuenta los consejos y no olvides que puedes regresar en cualquier momento.")
        else
            addChatMessage("Parece que todo está bien. Recuerda que siempre puedes regresar ¡Hasta pronto!")

        await instance.post("save_data", {
            to_save: toSave.current.flat(),
            user_id: token
        })
    }

    return (
        <ChatContext.Provider value={{ toSave: toSave.current, queue: queue.current, round, nextRound, condition, addMessage, addMessages, questions: questions.current, answers, setAnswers, fetchQuestions, messages }}>
            <Chat scrollRef={scrollRef} />
            <SendButton />
        </ChatContext.Provider>
    )
}

export default Interaction