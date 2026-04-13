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
    <div className="flex min-h-screen flex-col bg-background pb-16 md:pb-0">
      <Header />

      <main className="flex-1 w-full mx-auto max-w-7xl md:px-6 lg:px-8 pt-0 md:pt-6">
        <Carousel images={bannerImages} />

        <div className="flex flex-1 flex-col gap-6 mt-4 md:gap-10 md:mt-10 pb-4">
          {categories.map((cat) => (
            <SectionGrid
              key={cat.id}
              title={cat.name}
              items={cat.subcategories.map((sub) => ({
                id: sub.id,
                name: sub.name,
                image: sub.image,
                link: `/category/${cat.id}/${sub.id}`,
              }))}
            />
          ))}

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
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
