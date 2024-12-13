import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";





export const metadata = {
  title: "Recipe & Meal Planner App",
  description: "A comprehensive Recipe & Meal Planner application using Next.js, Redux, and the Spoonacular API.",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
    </Providers>
  );
}
