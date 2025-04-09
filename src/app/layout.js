import Navbar from "@/src/components/Navbar";
 
export const metadata = {
  title: "Productivity App",
  description: "Stay focused and productive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
