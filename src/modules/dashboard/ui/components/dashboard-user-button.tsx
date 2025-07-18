"use client";

import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatara, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  ChevronDownIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-muted p-3 w-full flex items-center justify-between bg-white dark:bg-muted hover:bg-gray-100 dark:hover:bg-muted/60 overflow-hidden gap-x-2 transition">
          {data.user.image ? (
            <Avatara className="w-8 h-8 shadow ring-1 ring-gray-300 dark:ring-gray-700">
              <AvatarImage src={data.user.image} alt="User avatar" />
            </Avatara>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full text-gray-900 dark:text-white font-medium">{data.user.name}</p>
            <p className="text-xs truncate w-full text-gray-500 dark:text-gray-400">{data.user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0 text-gray-600 dark:text-gray-400" />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={() => authClient.customer.portal()}>
              <CreditCardIcon className="size-4 mr-2" />
              Billing
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOutIcon className="size-4 mr-2" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-muted p-3 w-full flex items-center justify-between bg-white dark:bg-muted hover:bg-gray-100 dark:hover:bg-muted/60 overflow-hidden gap-x-2 transition">
        {data.user.image ? (
          <Avatara className="w-8 h-8 shadow ring-1 ring-gray-300 dark:ring-gray-700">
            <AvatarImage src={data.user.image} alt="User avatar" />
          </Avatara>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-medium truncate w-full text-gray-900 dark:text-white">
            {data.user.name}
          </p>
          <p className="text-xs truncate w-full text-gray-500 dark:text-gray-400">
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0 text-gray-600 dark:text-gray-400" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="right"
        className="w-72 bg-white dark:bg-background text-gray-900 dark:text-white border border-muted"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">
              {data.user.name}
            </span>
            <span className="text-sm font-normal truncate text-gray-500 dark:text-gray-400">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between hover:bg-gray-100 dark:hover:bg-muted"
          onClick={() => authClient.customer.portal()}
        >
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between hover:bg-gray-100 dark:hover:bg-muted"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
