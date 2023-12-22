import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwind from "~/tailwind.css";
import Header from "./components/Header";
import Map from "./components/Map";
import Footer from "./components/Footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Oswald:wght@500;700;800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap',
  },
];

export function loader() {
  return { apiKey: process.env.GMAPS_API_KEY };
}

const isDEV = process.env.NODE_ENV === 'development'
const TITO_URL = isDEV ? 'https://js.tito.io/v2/with/development_mode' : 'https://js.tito.io/v2'

export default function App() {
  const { apiKey } = useLoaderData() as { apiKey: string }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style>{`
          html {
            background-image: url('/images/bg.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 100%;
            font-family: Oswald, sans-serif;
          }
        `}</style>
        <script src={TITO_URL} async></script>
      </head>
      <body>
        <div className="mx-auto max-w-screen-md px-2">
          <Header />
          <main className='mb-12'>
            <Outlet />
          </main>
          <Map apiKey={apiKey} />
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
