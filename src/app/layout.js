import Navbar from "@/src/components/Navbar";

export const metadata = {
  title: "Productivity App",
  description: "Stay focused and productive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ margin: 0, padding: 0 }}>
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

