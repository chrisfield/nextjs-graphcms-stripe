import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';

const Info = ({data}) => {
  if (!data) {
    return <span>'Loading...'</span>
  }
  return (
    <div className="info">
      <p>
        Thank you for your order!
      </p>
      <p>
        I usually manage to pack and post items within two or three working days.
        I will email you to keep you updated.
      </p>
      <p>
        The email address I have for you is {data.customer.email}.
      </p>
      <p>
        Any problems or special instructions please get in touch. My email is angela@angelasidwell.com.
      </p>
      <style jsx>{`
          p {
            margin: 1em 0;
          }
        `}
      </style>
    </div>
  );
}

export default function Result() {
  const router = useRouter();
  const { sessionId } = router.query;

  const {data, error } = useSWR(
    sessionId ? `api/checkout/${sessionId}`: null,
    (url) => fetch(url).then(res => res.json())
  );

  return (
    <div>
      <h1>Angela Sidwell - Artist</h1>
      <div className="content">
        <Info data={data}/>
        <div className="links">
          <Link href="/"><a>Back to the shop</a></Link>
          <a href="https://angelasidwell.com">Go to my website</a>
        </div>
      </div>
      <style jsx>{`
          h1 {
            margin: 2em 0 1em;
            text-align: center;
            font-size: 3em;
          }
          .content {
            max-width: 400px;
            font-size: 1.5em;
            margin: 0 auto;
          }
          .links {
            display: flex;
            justify-content: space-around;
          }
        `}
        </style>
    </div>
  );
}