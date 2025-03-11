"use client";

import { FileEssential } from "@/app/lib/definitions";

export default function VideoFile({ file }: { file: FileEssential }) {
  return (
    <div className="flex aspect-16/9 h-full w-full items-center justify-center overflow-hidden">
      <video
        onMouseOver={(event) => {
          event.currentTarget.setAttribute("controls", "");
        }}
        onMouseLeave={(event) => {
          event.currentTarget.removeAttribute("controls");
        }}
      >
        <source src={file.url}></source>
      </video>
    </div>
  );
}
