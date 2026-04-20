import "./globals.css";

export const metadata = {
  title: "DekNek — Next-Gen Digital Solutions",
  description: "DekNek delivers cutting-edge digital solutions with AI-powered innovation, scalable architecture, and premium design. Transform your business with the future of technology.",
  keywords: ["DekNek", "digital solutions", "AI", "technology", "web development", "software"],
  authors: [{ name: "DekNek" }],
  openGraph: {
    title: "DekNek — Next-Gen Digital Solutions",
    description: "Transform your business with cutting-edge digital solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
