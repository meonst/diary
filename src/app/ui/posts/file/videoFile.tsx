"use client";
export default function VideoFile({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
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
        <source src={fileUrl}></source>
      </video>
    </div>
  );
}
