export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  mrp: number;
  discount: number;
  offerPrice: number;
  image: string;
  brand: string;
  description?: string;
}

export const products: Product[] = [
  { id: "1", name: "Tata Salt", category: "grocery", subcategory: "staples", price: 28, mrp: 30, discount: 7, offerPrice: 28, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop", brand: "Tata" },
  { id: "2", name: "Aashirvaad Atta 5kg", category: "grocery", subcategory: "staples", price: 265, mrp: 310, discount: 15, offerPrice: 265, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop", brand: "Aashirvaad" },
  { id: "3", name: "Fortune Sunflower Oil 1L", category: "grocery", subcategory: "oils", price: 135, mrp: 160, discount: 16, offerPrice: 135, image: "https://images.unsplash.com/photo-1474979266404-7eabd7a43462?w=200&h=200&fit=crop", brand: "Fortune" },
  { id: "4", name: "Amul Butter 500g", category: "dairy", subcategory: "butter-cheese", price: 270, mrp: 290, discount: 7, offerPrice: 270, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop", brand: "Amul" },
  { id: "5", name: "Maggi Noodles Pack of 12", category: "grocery", subcategory: "instant-food", price: 120, mrp: 144, discount: 17, offerPrice: 120, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200&h=200&fit=crop", brand: "Maggi" },
  { id: "6", name: "Surf Excel Matic 2kg", category: "household", subcategory: "detergent", price: 399, mrp: 470, discount: 15, offerPrice: 399, image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&h=200&fit=crop", brand: "Surf Excel" },
  { id: "7", name: "Colgate MaxFresh 150g", category: "personal-care", subcategory: "oral-care", price: 89, mrp: 105, discount: 15, offerPrice: 89, image: "https://images.unsplash.com/photo-1559667110-438b7360b667?w=200&h=200&fit=crop", brand: "Colgate" },
  { id: "8", name: "Head & Shoulders 340ml", category: "personal-care", subcategory: "hair-care", price: 310, mrp: 370, discount: 16, offerPrice: 310, image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200&h=200&fit=crop", brand: "Head & Shoulders" },
  { id: "9", name: "Dettol Handwash 200ml", category: "personal-care", subcategory: "hygiene", price: 55, mrp: 65, discount: 15, offerPrice: 55, image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=200&h=200&fit=crop", brand: "Dettol" },
  { id: "10", name: "Red Label Tea 500g", category: "grocery", subcategory: "beverages", price: 215, mrp: 250, discount: 14, offerPrice: 215, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop", brand: "Red Label" },
  { id: "11", name: "Parle-G Biscuits 800g", category: "grocery", subcategory: "snacks", price: 65, mrp: 80, discount: 19, offerPrice: 65, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop", brand: "Parle" },
  { id: "12", name: "Kissan Tomato Ketchup 500g", category: "grocery", subcategory: "sauces", price: 105, mrp: 125, discount: 16, offerPrice: 105, image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop", brand: "Kissan" },
  { id: "13", name: "Mother Dairy Milk 1L", category: "dairy", subcategory: "milk", price: 62, mrp: 66, discount: 6, offerPrice: 62, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop", brand: "Mother Dairy" },
  { id: "14", name: "Vim Dishwash Gel 750ml", category: "household", subcategory: "cleaning", price: 125, mrp: 149, discount: 16, offerPrice: 125, image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=200&h=200&fit=crop", brand: "Vim" },
  { id: "15", name: "Dove Body Wash 250ml", category: "personal-care", subcategory: "body-care", price: 199, mrp: 240, discount: 17, offerPrice: 199, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop", brand: "Dove" },
  { id: "16", name: "Catch Turmeric 200g", category: "grocery", subcategory: "spices", price: 52, mrp: 60, discount: 13, offerPrice: 52, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=200&h=200&fit=crop", brand: "Catch" },
];
