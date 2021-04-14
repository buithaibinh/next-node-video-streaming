import Link from "next/link";

const Video = ({ video }) => {
  return (
    <li>
      <Link href='/video/[id]' as={`/video/${video.id}`}>
        <a>{video.name}</a>
      </Link>
    </li>
  );
};

export { Video as default };
