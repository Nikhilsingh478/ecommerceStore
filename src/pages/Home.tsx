import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import Carousel from "@/components/Carousel/Carousel";
import SectionGrid from "@/components/SectionGrid/SectionGrid";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { Zap } from "lucide-react";

import banner1 from "@/assets/banner1.webp";
import banner2 from "@/assets/banner2.webp";
import banner3 from "@/assets/banner3.webp";

const bannerImages = [banner1, banner2, banner3];

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header />

      <main className="flex-1 w-full mx-auto max-w-7xl md:px-6 lg:px-8">

        {/* Delivery promise strip */}
        <div className="mx-4 md:mx-0 mt-3 mb-3 flex items-center gap-2.5 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-2.5 animate-fade-up">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-primary/15">
            <Zap className="h-4 w-4 text-primary" fill="currentColor" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-bold text-primary leading-tight">Express delivery in 10 minutes</p>
            <p className="text-[11px] text-muted-foreground">Free on your first order · 7 days a week</p>
          </div>
        </div>

        {/* Hero Carousel */}
        <div className="animate-fade-up" style={{ animationDelay: "50ms" }}>
          <Carousel images={bannerImages} />
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-9 mt-8 md:gap-14 md:mt-12 pb-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="animate-fade-up"
              style={{ animationDelay: `${100 + idx * 55}ms` }}
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

          <div className="animate-fade-up" style={{ animationDelay: `${100 + categories.length * 55}ms` }}>
            <SectionGrid
              title="Popular Brands"
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
