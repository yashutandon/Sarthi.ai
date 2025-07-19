'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentDialog from './new-agent-dialog'
import { useAgentFilter } from '@/modules/agents/hooks/use-agents-filters'
import { AgentsSearchFilters } from './agents-search-filters'
import { DEFAULT_PAGE } from '@/constants'
import { ScrollArea,ScrollBar } from '@/components/ui/scroll-area'

const ListHeader = () => {
    const [filters,setFilters]=useAgentFilter();
    const [isDialogOpen,setIsDialogOpen]=useState(false);
    const isAnyFilterModified =!!filters.search;

    const onClearFilters=()=>{
      setFilters({
        search:'',  
        page:DEFAULT_PAGE
      })
    }
  return (
    <>
    <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
    <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
            <h5 className='font-medium text-xl'>My Agents</h5>
            <Button className='bg-gradient-to-r  from-blue-600 to-purple-600 text-white  hover:scale-105 transition-transform duration-300 ' onClick={()=>setIsDialogOpen(true)}>
                <PlusIcon/>
                New Agent
            
            </Button>
        </div>
        <ScrollArea>
        <div className='flex items-center gap-x-2 p-1'>
            <AgentsSearchFilters/>
            {isAnyFilterModified && (<Button variant='outline' size='sm' onClick={onClearFilters}>
              <XCircleIcon />
            </Button>)}
        </div>
        <ScrollBar orientation='horizontal'/>
        </ScrollArea>
    </div>
    </>
  )
}

export default ListHeader