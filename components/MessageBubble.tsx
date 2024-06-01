import React from 'react'
import { Card } from './ui/card'

const MessageBubble = ({side, content} : {side: string, content: string}) => {
    return (
        <Card className= {(side=="l"? "bg-white" : "self-end bg-slate-100") + " animate-enter w-[80%] p-6"}>
            {content}
        </Card>
    )
}

export default MessageBubble