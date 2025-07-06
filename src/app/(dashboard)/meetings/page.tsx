import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { auth } from "@/lib/auth";
import MeetingListHeader from "@/modules/meetings/ui/components/meetings-list-header";
import MeetingView from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { loadSearchParams } from "@/modules/meetings/params";
import type { SearchParams } from "nuqs/server";

interface Props{
  searchParams:Promise<SearchParams>
}

  
const Page = async({searchParams}:Props) => {

  const filters=await loadSearchParams(searchParams);
  
 const session = await auth.api.getSession({
      headers:await headers(),
    })
  
    if(!session){
      redirect('/sign-in')
    }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
  }));
  return (
    <>
    <MeetingListHeader/> 
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading/>}>
       <ErrorBoundary fallback={<MeetingsViewError/>}>
      <MeetingView />
      </ErrorBoundary> 
      </Suspense>
    </HydrationBoundary>
    </>
  );
};
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

export default Page;
