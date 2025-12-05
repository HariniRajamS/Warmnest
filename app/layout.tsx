import "@/styles/globals.module.css";
import Providers from "./providers";
import ChakraProviders from "./ChakraProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ChakraProviders>{children}</ChakraProviders>
        </Providers>
      </body>
    </html>
  );
}
