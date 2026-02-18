import type { Metadata } from "next";
import "./globals.css";
import { StudyProvider } from "./providers";
import { Nav } from "./components/nav";

export const metadata: Metadata = {
  title: "AI Infra Study Tracker",
  description: "Organize and track your 4-week AI infrastructure learning roadmap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StudyProvider>
          <div className="bg-orb bg-one" />
          <div className="bg-orb bg-two" />
          <div className="site-wrap">
            <Nav />
            <main>{children}</main>
          </div>
        </StudyProvider>
      </body>
    </html>
  );
}
