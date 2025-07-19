"use client";

import Link from "next/link";
import Image from "next/image";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="flex flex-col justify-between h-screen bg-black text-white px-4 py-2 sm:px-6 sm:py-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#101213] rounded-xl p-3 sm:p-4 w-full max-w-full">
        <Link
          href="/"
          className="flex items-center justify-center p-1 bg-white/10 rounded-full w-10 h-10 sm:w-12 sm:h-12"
        >
          <Image
            src="/robot.svg"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
        <h4 className="text-sm sm:text-base font-medium truncate">
          {meetingName}
        </h4>
      </div>

      {/* Speaker View */}
      <div className="flex-1 mt-4 overflow-hidden">
        <SpeakerLayout />
      </div>

      {/* Call Controls */}
      <div className="bg-[#101213] rounded-xl px-4 py-3 mt-4">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};
