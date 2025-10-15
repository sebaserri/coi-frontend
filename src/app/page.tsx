import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/section/Hero";

export default function CompanyPage() {
  return (
    <>
      <Header isDivisionPage={false} />
      <Hero />
      <Footer />
    </>
  );
}
