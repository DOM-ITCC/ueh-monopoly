import "./globals.css";

export const metadata = {
  title: "UEH_Monopoly",
  description: "Welcome!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
