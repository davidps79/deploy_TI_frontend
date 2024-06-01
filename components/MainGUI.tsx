import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { IconDots, IconShare, IconTrash, IconLayoutSidebar, IconEdit } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Interaction from '@/components/Interaction';
import ChatWindow from './ChatWindow';
import { format } from 'date-fns';

const MainGUI = ({sessions, token} : {sessions: any, token: any}) => {
  const [chatData, setChatData] = useState(null)

  return (
    <main className='flex bg-slate-50'>
      <aside className='z-20 bg-white flex w-[13%] flex-col gap-2 ring-1 ring-slate-200 p-2'>
        <div className='flex justify-between mb-4'>
          <Button variant="ghost">
            <IconLayoutSidebar />
          </Button>

          <Button onClick={() => setChatData(null)} variant="ghost">
            <IconEdit />
          </Button>
        </div>

        <ScrollArea viewportRef={null} className="h-full w-full pr-2">
          <div className='flex flex-col gap-2'>
            {
              sessions.map((chat: {data: string, session_id: string, time: string, user_id: string}, idx: number) => (
                <DropdownMenu key={idx}>
                  <div onClick={() => setChatData(sessions[idx])} className='cursor-pointer p-2 px-3 rounded-md relative group flex items-center hover:bg-slate-100 '>
                    {format(chat.time, 'MM-dd HH:mm:ss')}
                    <DropdownMenuTrigger asChild>
                      <Button className='absolute right-0 transition-opacity opacity-0 group-hover:opacity-100' variant="ghost" size="icon">
                        <IconDots className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <IconShare className="mr-2 h-4 w-4" />
                        <span>Compartir</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconTrash className="mr-2 h-4 w-4" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              ))
            }
          </div>
        </ScrollArea>
        <div>
          <div className='flex gap-3 items-center p-2 rounded-md hover:bg-slate-100'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              John Doe
            </div>
          </div>
        </div>
      </aside>

      <div className="w-full relative">
        <ChatWindow token={token} data={chatData}/>
      </div>
    </main>)
}

export default MainGUI