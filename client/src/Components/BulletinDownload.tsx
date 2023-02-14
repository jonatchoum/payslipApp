import React from "react";

type TDownloadInfo = {
  user_id: number;
  filename: string;
};

export function BulletinDownload(props: TDownloadInfo) {
  return (
    <a
      // href={`http://localhost:3000/api/download/${props.user_id}/${props.filename}`}
      href={`https://sareasoft.com/api/download/${props.user_id}/${props.filename}`}
      download={true}
    >
      <img
        src="/arrow-down-doc-fill-svgrepo-com.svg"
        alt=""
        className="w-8 fill-cyan-500"
      />
    </a>
  );
}
