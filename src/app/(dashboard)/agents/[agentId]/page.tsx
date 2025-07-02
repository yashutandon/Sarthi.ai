interface Props{
    params:Promise<{agentId:string}>
}

import { AgentIdView, AgentsIdViewError } from '@/modules/agents/ui/views/agent-id-view';
import { AgentsViewLoading } from '@/modules/agents/ui/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { HydrationBoundary,dehydrate } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const Page = async({params}:Props) => {
    const {agentId}=await params;
    const queryCient=getQueryClient();
    void queryCient.prefetchQuery(
        trpc.agents.getOne.queryOptions({id:agentId})
    )
  return (
   <HydrationBoundary state={dehydrate(queryCient)}>
      <Suspense fallback={<AgentsViewLoading/>}>
        <ErrorBoundary fallback={<AgentsIdViewError/>}>
            <AgentIdView agentId={agentId}/>
        </ErrorBoundary>
      </Suspense>
   </HydrationBoundary>
  );
};

export default Page