"use client";

import { useState } from "react";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";
import Highlighter from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatara, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/lib/avatar";

interface Props {
  meetingId: string;
}

const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getTranscript.queryOptions({ id: meetingId }));
  const [searchQuery, setSearchQuery] = useState("");

  const filterData = (data ?? []).filter((item) =>
    item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background text-foreground rounded-lg border border-muted px-4 py-5 flex flex-col gap-y-4 w-full">
      <p className="text-sm font-medium">Transcript</p>

      <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="pl-7 h-9 w-[240px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      </div>

      <ScrollArea>
        <div className="flex flex-col gap-y-4">
          {filterData.map((item) => (
            <div
              key={item.start_ts}
              className="flex flex-col gap-y-2 hover:bg-muted bg-card border border-muted p-4 rounded-md"
            >
              <div className="flex gap-x-2 items-center">
                <Avatara className="size-6">
                  <AvatarImage
                    src={item.user.image ?? Avatar({ seed: item.user.name, variant: "initials" })}
                  />
                </Avatara>
                <p className="text-sm font-medium">{item.user.name}</p>
                <p className="text-sm font-medium text-blue-500 dark:text-blue-300">
                  {format(new Date(0, 0, 0, 0, 0, 0, item.start_ts), "mm:ss")}
                </p>
              </div>

              <Highlighter
                className="text-sm text-muted-foreground"
                highlightClassName="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white px-1 rounded"
                searchWords={[searchQuery]}
                autoEscape
                textToHighlight={item.text}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Transcript;
