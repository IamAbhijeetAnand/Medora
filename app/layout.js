import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Medora",
  description: "Connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            <main className="min-h-screen">{children}</main>

            <Toaster richColors />

            {/* 🔥 MEDORA FOOTER */}
            <footer className="bg-black border-t border-gray-800 mt-16">
              <div className="container mx-auto px-6 py-12">
                
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  
                  {/* Brand */}
                  <div>
                    <h2 className="text-2xl font-bold text-white">Medora</h2>
                    <p className="text-gray-400 mt-3 text-sm">
                      Your trusted healthcare partner. Book appointments, connect with doctors,
                      and manage your health effortlessly.
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li><a href="/" className="hover:text-green-400">Home</a></li>
                      <li><a href="/doctors" className="hover:text-green-400">Doctors</a></li>
                      <li><a href="/appointments" className="hover:text-green-400">Appointments</a></li>
                      <li><a href="/contact" className="hover:text-green-400">Contact</a></li>
                    </ul>
                  </div>

                  {/* Company */}
                  <div>
                    <h3 className="text-white font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li><a href="#" className="hover:text-green-400">About Us</a></li>
                      <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-green-400">Terms & Conditions</a></li>
                    </ul>
                  </div>

                  {/* Contact */}
                  <div>
                    <h3 className="text-white font-semibold mb-3">Contact</h3>
                    <p className="text-gray-400 text-sm">📧 support@medora.com</p>
                    <p className="text-gray-400 text-sm mt-2">📍 India</p>
                  </div>

                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
                  © {new Date().getFullYear()} Medora. All rights reserved.
                </div>

              </div>
            </footer>

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
