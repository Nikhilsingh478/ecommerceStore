import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import Carousel from "@/components/Carousel/Carousel";
import SectionGrid from "@/components/SectionGrid/SectionGrid";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";

import banner1 from "@/assets/banner1.webp";
import banner2 from "@/assets/banner2.webp";
import banner3 from "@/assets/banner3.webp";

const bannerImages = [banner1, banner2, banner3];

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header />

      <main className="flex-1 w-full mx-auto max-w-7xl md:px-6 lg:px-8">

        {/* Hero Carousel */}
        <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
          <Carousel images={bannerImages} />
        </div>

        {/* Category Sections */}
        <div className="flex flex-col gap-8 mt-6 md:gap-12 md:mt-10 pb-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="animate-fade-up"
              style={{ animationDelay: `${80 + idx * 60}ms` }}
            >
              <SectionGrid
                title={cat.name}
                items={cat.subcategories.map((sub) => ({
                  id: sub.id,
                  name: sub.name,
                  image: sub.image,
                  link: `/category/${cat.id}/${sub.id}`,
                }))}
              />
            </div>
          ))}

          {/* Brands */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: `${80 + categories.length * 60}ms` }}
          >
            <SectionGrid
              title="Popular Brands"
              columns={4}
              items={brands.map((b) => ({
                id: b.id,
                name: b.name,
                image: b.image,
                link: `/category/${b.id}`,
              }))}
            />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
