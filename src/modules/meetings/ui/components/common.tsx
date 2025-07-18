
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
export const MeetingsViewLoading=()=>{
  return (
    <LoadingState
    title="Loading Meetings"
    description="This may take a few seconds"
    />
  )
}

export const MeetingsViewError=()=>{
  return(
    <ErrorState title="Error Loading Meetings" description="Something went wrong"/>
  )
}