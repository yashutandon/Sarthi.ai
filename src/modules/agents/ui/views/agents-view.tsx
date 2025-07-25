"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "./components/column";
import EmptyState from "@/components/empty-state";
import { useAgentFilter } from "../../hooks/use-agents-filters";
import { DataPagination}  from "./components/data-pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";




export  function AgentsView(){
  const router=useRouter();
  const [filters,setFilters]=useAgentFilter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({...filters})
  );

 

  
  return <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
    <DataTable
    data={data.items}
    columns={columns}
    onRowClick={(row)=>router.push(`/agents/${row.id}`)}
    />
    <DataPagination
    page={filters.page}
    totalPages={data.totalPages}
    onPageChange={(page)=>setFilters({page})}
    /> 
    {data.items.length===0 && <EmptyState
    title="Create your first agent"
    description="Agents are the core of your workflow. Create one to get started."
    />}
  </div>;
};

export const AgentsViewLoading=()=>{
  return (
    <LoadingState
    title="Loading Agents"
    description="This may take a few seconds"
    />
  )
}

export const AgentsViewError=()=>{
  return(
    <ErrorState title="Error Loading Agents" description="Something went wrong"/>
  )
}
