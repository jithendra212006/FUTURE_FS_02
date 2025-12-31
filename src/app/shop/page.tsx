import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CollectionSection from "@/components/CollectionSection";


export default function Home() {
  return (
    <>
      <Header/>
      <Hero />
      <CollectionSection/>
      <ProductGrid/>
      <Footer/>
    </>
  );
}
