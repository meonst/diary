"use client";
export default function VideoFile({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  return (
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
  );
}
