// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Mi App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}