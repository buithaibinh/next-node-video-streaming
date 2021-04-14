import { useRouter } from 'next/router';
import useSWR from 'swr'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Video() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/videos/${query.id}/data`,
    fetcher
  )
  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return <div className='player'>
     <video controls autoPlay crossOrigin="anonymous">
      <source src={`/api/videos/${query.id}`} type="video/mp4" />
      <track label="English" kind="captions" srcLang="en" src={`/api/videos/${query.id}/caption`} default />
     </video>
  </div>;
}
