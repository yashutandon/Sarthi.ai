'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon,XCircleIcon} from 'lucide-react'
import NewMeetingDialog from './new-meeting-dialog'
import { useState } from 'react'
import { MeetingsSearchFilters } from './meetings-search-filters'
import { StatusFilter } from './status-filter'
import { AgentIdFilter } from './agent-id-filter'
import { useMeetingsFilter } from '../../hooks/use-meetings-filters'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { DEFAULT_PAGE } from '@/constants'


const MeetingListHeader = () => {
  const [filters,setFilters]=useMeetingsFilter();
  const [isDialogOpen,setIsDialogOpen]=useState(false);

  const isAnyFilterModified=!!filters.status || !!filters.search || !!filters.agentId;

  const onClearFilters=()=>{
    setFilters({
      status:null,
      search:"",
      agentId:"",
      page:DEFAULT_PAGE
    })
  }
    
  
  return (
    <>
   <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
    <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
            <h5 className='font-medium text-xl'>My Meetings</h5>
            <Button className='bg-gradient-to-r from-blue-600 to-purple-600 text-white  hover:scale-105 transition-transform duration-300' onClick={()=>setIsDialogOpen(true)}>
                <PlusIcon/>
                New Meeting
            
            </Button>
        </div>
        <ScrollArea>
        <div className='flex items-center gap-x-2 p-1'>
            <MeetingsSearchFilters/>
            <StatusFilter/>
            <AgentIdFilter/>
            {isAnyFilterModified && (
              <Button variant="outline" onClick={onClearFilters}>
                <XCircleIcon className='size-4'/>
              </Button>
            )}
        </div>
        <ScrollBar orientation='horizontal'/>
        </ScrollArea>
    </div>
    </>
  )
}

export default MeetingListHeader