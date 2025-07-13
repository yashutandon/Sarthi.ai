"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Markdown from "react-markdown";
import Link from "next/link";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { MeetingGetOne } from "../../types";
import {
  BookOpenTextIcon,
  SparklesIcon,
  FileTextIcon,
  FileVideoIcon,
  ClockFadingIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import Transcript from "./transcript";
import { ChatProvider } from "./chat-provider";

interface Props {
  data: MeetingGetOne;
}

const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      {/* Optional: Add ThemeToggle here */}
      {/* <div className="flex justify-end"><ThemeToggle /></div> */}

      <Tabs defaultValue="summary">
        <div className="bg-background text-foreground rounded-lg border border-muted px-3">
          <ScrollArea>
            <TabsList className="p-0 bg-background justify-start rounded-none h-13">
              {[
                { value: "summary", icon: BookOpenTextIcon, label: "Summary" },
                { value: "transcript", icon: FileTextIcon, label: "Transcript" },
                { value: "recording", icon: FileVideoIcon, label: "Recording" },
                { value: "chat", icon: SparklesIcon, label: "Ask AI" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                >
                  <Icon className="mr-1 size-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

          <TabsContent value="chat">
          <ChatProvider meetingId={data.id} meetingName={data.name}/>
        </TabsContent>

        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>

        <TabsContent value="recording">
          <div className="bg-background text-foreground rounded-lg border border-muted px-4 py-5">
            <video
              src={data.recordingUrl!}
              className="w-full rounded-lg"
              controls
            />
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <div className="bg-background text-foreground rounded-lg border border-muted">
            <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>

              <div className="flex gap-x-2 items-center">
                <Link
                  href={`/agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 underline underline-offset-4 capitalize"
                >
                  <GeneratedAvatar
                    variant="botttsNeutral"
                    seed={data.agent.name}
                    className="size-5"
                  />
                  {data.agent.name}
                </Link>
                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
              </div>

              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4" />
                <p>General summary</p>
              </div>

              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <ClockFadingIcon className="text-blue-700 dark:text-blue-300" />
                {data.duration ? formatDuration(data.duration) : "No Duration"}
              </Badge>

              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 className="text-2xl font-medium mb-6" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl font-medium mb-6" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-lg font-medium mb-6" {...props} />
                    ),
                    h4: (props) => (
                      <h4 className="text-base font-medium mb-6" {...props} />
                    ),
                    p: (props) => (
                      <p className="leading-relaxed mb-6" {...props} />
                    ),
                    ul: (props) => (
                      <ul className="list-disc list-inside mb-6" {...props} />
                    ),
                    ol: (props) => (
                      <ol className="list-decimal list-inside mb-6" {...props} />
                    ),
                    li: ({ children, ...props }) => (
                      <li className="mb-1" {...props}>{children}</li>
                    ),
                    strong: (props) => (
                      <strong className="font-semibold" {...props} />
                    ),
                    code: (props) => (
                      <code className="bg-muted px-1 py-0.5 rounded" {...props} />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className="border-l-4 border-muted pl-4 italic my-4"
                        {...props}
                      />
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompletedState;
