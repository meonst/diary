import React from "react";

export default function Modal({ children }: { children: React.ReactElement }) {
  return (
    <div className="fixed inset-0 flex h-screen w-full items-center justify-center bg-black/50">
      <div className="h-fit w-fit rounded-md bg-white">
        <div className="rounded-md border-2 border-black p-10">{children}</div>
      </div>
    </div>
  );
}
