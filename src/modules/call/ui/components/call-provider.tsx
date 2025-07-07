"use client"
import { LoaderIcon } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Avatar } from "@/lib/avatar"
import { CallConnect } from "./call-connect";

interface Props{
    meetingId:string;
    meetingName:string;
}

export const CallProvider = ({meetingId,meetingName}:Props) => {
    const {data,isPending}=authClient.useSession();

    if(!data || isPending){
        return(
            <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
                <LoaderIcon className="size-6 animate-spin text-white"/>
            </div>
        )
    }

  return (
    <div>
        <CallConnect
        meetingId={meetingId}
        meetingName={meetingName}
        userId={data.user.id}
        userName={data.user.name}
        userImage={
            data.user.image ?? 
            Avatar({seed:data.user.name,variant:"initials"})
        }
        />
    </div>
  )
}

