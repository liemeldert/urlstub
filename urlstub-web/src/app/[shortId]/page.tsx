"use client";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { headers } from 'next/headers'
import RedirectLanding from './redirect_landing';

export default function RedirectPage() {
  const params = useParams();
  const { shortId } = params;
  const router = useRouter();
  
  // state variable for displaying HTML if needed
  const [landing, setLanding] = useState<React.ReactElement | null>(null);

  // site data collection
  const header = headers()

  useEffect(() => { 
    const handleRedirect = async () => {
      try {
        console.log(`Fetching URL for shortId: ${shortId}`);
        const response = await fetch(`/api/redirect/${shortId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(`Redirecting to: ${data.originalUrl}`);
          console.log(data);

          if (data.collect_visitor_data) {
            const ip = ((await header).get('x-forwarded-for') ?? '127.0.0.1').split(',')[0] 
            const user_agent = (await header).get('user-agent') ?? 'Unknown'
            const referer = (await header).get('referer') ?? 'Unknown'

            const collect_data = await fetch(`/api/user_data`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ shortId, ip, user_agent, referer }),
            });

            if (!collect_data.ok) {
              console.error('Failed to send visitor data');
            }
          }

          // landing display
          if (data.displayLanding) {
            setLanding(<RedirectLanding originalUrl={data.originalUrl} />);
            setTimeout(() => {
              router.push(data.originalUrl);
            }, 5000); // Wait for 5 seconds before redirecting
          } else {
            router.push(data.originalUrl);
          }
        } else {
          console.error(`Failed to fetch URL for shortId: ${shortId}`);
          router.push('/404');
        }
      } catch (error) {
        console.error('Error redirecting:', error);
        router.push('/404');
      }
    };

    handleRedirect();
  }, [shortId, router, header]);

  return (landing);  
}