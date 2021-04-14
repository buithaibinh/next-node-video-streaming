import Layout from '@/components/Layout';

import Video from "@/components/Video/Video"

// SWR is a React Hooks library for data fetching.
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/videos', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <ul>
        {data.map((p, i) => (
          <Video key={i} video={p} />
        ))}
      </ul>
    </Layout>
  );
}
