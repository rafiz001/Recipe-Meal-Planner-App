import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";
import Nav from "@/components/Nav";




export const metadata = {
  title: "Recipe & Meal Planner App",
  description: "A comprehensive Recipe & Meal Planner application using Next.js, Redux, and the Spoonacular API.",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en">
      <body
        className={`  `}
      >
        <Nav/>
        <section className="px-6 md:px-40"> 

        {children}
        </section>
      </body>
    </html>
    </Providers>
  );
}
