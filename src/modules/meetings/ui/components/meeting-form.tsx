import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MeetingGetOne } from "../../types";
import { meetingsInsertSchema } from "../../schemas";
import { useState } from "react";
import { CommandSelect } from "./command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import NewAgentDialog from "@/modules/agents/ui/views/components/new-agent-dialog";
import { useRouter } from "next/navigation";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router=useRouter();
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);

  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
          await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions(),
        );
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
         if(error.data?.code==="FORBIDDEN"){
            router.push("/upgrade");
          }
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name Field */}
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Maths Consultation" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Agent Field */}
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    value={field.value}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    placeholder="Select an agent"
                  />
                </FormControl>
                <FormDescription>
                  Not found what you&apos;re looking for ?{" "}
                  <Button
                    type="button"
                    onClick={() => setOpenNewAgentDialog(true)}
                    className="p-0 h-auto text-green-600 bg-transparent hover:underline hover:bg-transparent shadow-none font-normal"
                  >
                    Create new agent
                  </Button>
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default MeetingForm;
