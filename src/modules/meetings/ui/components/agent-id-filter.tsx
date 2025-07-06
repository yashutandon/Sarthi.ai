import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { CommandSelect } from "./command-select"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { useMeetingsFilter } from "../../hooks/use-meetings-filters"

export const AgentIdFilter = () => {
    const [filters,setFilters]=useMeetingsFilter();
    const trpc=useTRPC();
    const [agentSearch,setAgentSearch]=useState("")
    const {data}=useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize:100,
            search:agentSearch
        }),
    );
  return (
   <CommandSelect
   className="h-9"
   placeholder="Agent"
   options={(data?.items ?? []).map((agent)=>({
    id:agent.id,
    value:agent.id,
    children:(
        <div>
            <GeneratedAvatar
            seed={agent.name}
            variant="botttsNeutral"
            className="size-4"
            />
            {agent.name}
        </div>
    )
   }))}
   onSelect={(value)=>setFilters({agentId:value})}
   onSearch={setAgentSearch}
   value={filters.agentId ?? "" }
   />
  )
}

