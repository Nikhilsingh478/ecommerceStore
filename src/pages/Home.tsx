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
    <div className="flex min-h-screen flex-col animate-in fade-in duration-700 bg-background pb-16 md:pb-0">
      <Header />
      
      <main className="flex-1 w-full mx-auto max-w-7xl md:px-6 lg:px-8 pt-0 md:pt-6">
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-700 fill-mode-both">
          <Carousel images={bannerImages} />
        </div>

        <div className="flex flex-1 flex-col gap-6 mt-4 md:gap-10 md:mt-10 pb-4">
        {categories.map((cat, index) => (
          <div 
            key={cat.id}
            className="animate-in slide-in-from-bottom-6 fade-in duration-700 fill-mode-both"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
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

        <div 
          className="animate-in slide-in-from-bottom-6 fade-in duration-700 fill-mode-both"
          style={{ animationDelay: `${(categories.length + 1) * 100}ms` }}
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
