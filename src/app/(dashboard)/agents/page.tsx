import  { AgentsView,AgentsViewError,AgentsViewLoading } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {ErrorBoundary} from 'react-error-boundary'

import React, { Suspense } from "react";
import ListHeader from "@/modules/agents/ui/views/components/agents-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";

interface Props{
  searchParams:Promise<SearchParams>
}
const Page = async ({searchParams}:Props) => {
  const filters=await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
      headers:await headers(),
    })
  
    if(!session){
      redirect('/sign-in')
    }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...filters}));

  return (
    <>
    <ListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading/>}>
      <ErrorBoundary fallback={<AgentsViewError/>}>
        <AgentsView />
      </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
  );
};

export default Page;
