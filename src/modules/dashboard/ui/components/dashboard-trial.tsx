import Link from "next/link"
import { RocketIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import { MAX_FREE_MEETINGS,MAX_FREE_AGENTS } from "@/modules/premium/constants"


export const DashboardTrial = () => {
    const trpc=useTRPC();
    const {data}=useQuery(trpc.premium.getFreeUsage.queryOptions());

    if(!data) return null;

  return (
    <div className="border border-border/10 rounded-lg w-full bg-white/5 flex flex-col gap-y-2">
        <div className="p-3 flex flex-col gap-y-4">
            <div className="flex items-center gap-2">
                <RocketIcon className="size-4"/>
                <p className="text-sm font-medium">Free Trial</p>
            </div>
            <div className="flex flex-col gap-y-2">
                <p className="text-xs">{data.agentCount}/{MAX_FREE_AGENTS} Agents</p>
                <Progress value={(data.agentCount/MAX_FREE_AGENTS)*100}/>
                <p className="text-xs">{data.meetingCount}/{MAX_FREE_MEETINGS} Meetings</p>
                 <Progress value={(data.meetingCount/MAX_FREE_MEETINGS)*100}/>
            </div>
        </div>  
        <Button
        className="bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-t  hover:bg-gradient-to-r hover:from-blue-600/80 hover:to-purple-600/80  rounded-t-none "
        asChild
        >
            <Link href="/upgrade" className="text-foreground dark:text-foreground">
            Upgrade
            </Link>
        </Button>
    </div>
  )
}
