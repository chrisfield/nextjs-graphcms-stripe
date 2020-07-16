import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Result() {
  const router = useRouter();
  const { sessionId } = router.query;

  const {data, error } = useSWR(
    sessionId ? `api/checkout/${sessionId}`: null,
    (url) => fetch(url).then(res => res.json())
  );

  return (
    <div>
      <h1>Payment Result</h1>
      <pre>{JSON.stringify(data, null, 2) ?? 'Loading...'}</pre>
    </div>
  );
}