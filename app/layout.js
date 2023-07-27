import "@styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitHub Profile",
  description:
    "Track Graduate's GitHub profile. See their latest activity, repositories, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <main className="lg:bg-zinc-900 xl:p-2">
          <div className="flex flex-col xl:flex-row xl:rounded-xl overflow-hidden xl:overflow-x-auto border-gray-950">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
