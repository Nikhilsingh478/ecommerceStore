import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import Carousel from "@/components/Carousel/Carousel";
import SectionGrid from "@/components/SectionGrid/SectionGrid";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";

const bannerImages = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=350&fit=crop",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=350&fit=crop",
  "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=350&fit=crop",
];

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Carousel images={bannerImages} />

      <div className="flex flex-1 flex-col gap-2 mt-2">
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

      <BottomNav />
    </div>
  );
};

export default Home;
