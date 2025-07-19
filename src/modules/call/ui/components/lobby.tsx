import { LogInIcon } from "lucide-react";
import Link from "next/link";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/lib/avatar";
import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
  onJoin: () => void;
}

const DisableVidepPreview = () => {
  const { data } = authClient.useSession();

  return (
   
      <DefaultVideoPlaceholder
        participant={
          {
            name: data?.user.name ?? "",
            image: Avatar({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
          } as StreamVideoParticipant
        }
      />
    
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm">
      Please grant your browser a permission to access your camera and
      microphone.
    </p>
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();
  const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-xs">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join</h6>
            <p className="text-sm">Set up your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermission
                ? DisableVidepPreview
                : AllowBrowserPermissions
            }
          />
          <div className="flex gap-x-2 ">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button onClick={onJoin} className="flex-1">
              <LogInIcon className="mr-2 h-4 w-4" />
              Join Call
            </Button>
            <Button asChild variant="ghost" className="flex-1">
              <Link href="/meetings">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
