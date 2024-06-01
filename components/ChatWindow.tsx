import React from 'react'
import Interaction from './Interaction'
import OldChat from './OldChat'

const ChatWindow = ({ token, data }: { data: any, token: any }) => {
    return (
        data ?
            <OldChat data={data} />
            :
            <Interaction token={token} />
    )
}

export default ChatWindow