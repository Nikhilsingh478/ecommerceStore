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

  // 🥦 Grocery - Staples
  { id: "1", name: "Tata Salt 1kg", category: "grocery", subcategory: "atta-rice-dal", price: 28, mrp: 30, discount: 7, offerPrice: 28, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&h=200&fit=crop&auto=format&q=80", brand: "Tata" },
  { id: "2", name: "Aashirvaad Atta 5kg", category: "grocery", subcategory: "atta-rice-dal", price: 265, mrp: 310, discount: 15, offerPrice: 265, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop&auto=format&q=80", brand: "Aashirvaad" },
  { id: "3", name: "India Gate Basmati Rice 5kg", category: "grocery", subcategory: "atta-rice-dal", price: 540, mrp: 620, discount: 13, offerPrice: 540, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&auto=format&q=80", brand: "India Gate" },

  // 🛢 Oils
  { id: "4", name: "Fortune Sunflower Oil 1L", category: "grocery", subcategory: "oils-ghee", price: 135, mrp: 160, discount: 16, offerPrice: 135, image: "https://images.unsplash.com/photo-1474979266404-7eabd7a43462?w=200&h=200&fit=crop&auto=format&q=80", brand: "Fortune" },
  { id: "5", name: "Dhara Mustard Oil 1L", category: "grocery", subcategory: "oils-ghee", price: 180, mrp: 210, discount: 14, offerPrice: 180, image: "https://images.unsplash.com/photo-1474979266404-7eabd7a43462?w=200&h=200&fit=crop&auto=format&q=80", brand: "Dhara" },

  // 🌶 Spices
  { id: "6", name: "Catch Turmeric Powder 200g", category: "grocery", subcategory: "spices", price: 52, mrp: 60, discount: 13, offerPrice: 52, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=200&h=200&fit=crop&auto=format&q=80", brand: "Catch" },
  { id: "7", name: "Everest Garam Masala 100g", category: "grocery", subcategory: "spices", price: 78, mrp: 90, discount: 13, offerPrice: 78, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=200&h=200&fit=crop&auto=format&q=80", brand: "Everest" },

  // 🍿 Snacks
  { id: "8", name: "Parle-G Biscuits 800g", category: "snacks", subcategory: "biscuits", price: 65, mrp: 80, discount: 19, offerPrice: 65, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop&auto=format&q=80", brand: "Parle" },
  { id: "9", name: "Good Day Cookies 200g", category: "snacks", subcategory: "biscuits", price: 35, mrp: 45, discount: 22, offerPrice: 35, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop&auto=format&q=80", brand: "Britannia" },
  { id: "10", name: "Lay's Classic Chips 52g", category: "snacks", subcategory: "chips", price: 20, mrp: 25, discount: 20, offerPrice: 20, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop&auto=format&q=80", brand: "Lay's" },

  // ☕ Beverages
  { id: "11", name: "Red Label Tea 500g", category: "snacks", subcategory: "tea-coffee", price: 215, mrp: 250, discount: 14, offerPrice: 215, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop&auto=format&q=80", brand: "Red Label" },
  { id: "12", name: "Nescafe Coffee 200g", category: "snacks", subcategory: "tea-coffee", price: 340, mrp: 380, discount: 10, offerPrice: 340, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop&auto=format&q=80", brand: "Nestle" },

  // 🥛 Dairy
  { id: "13", name: "Mother Dairy Milk 1L", category: "dairy", subcategory: "milk", price: 62, mrp: 66, discount: 6, offerPrice: 62, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop&auto=format&q=80", brand: "Mother Dairy" },
  { id: "14", name: "Amul Butter 500g", category: "dairy", subcategory: "butter-cheese", price: 270, mrp: 290, discount: 7, offerPrice: 270, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop&auto=format&q=80", brand: "Amul" },
  { id: "15", name: "Britannia Cheese Slices", category: "dairy", subcategory: "butter-cheese", price: 125, mrp: 145, discount: 14, offerPrice: 125, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop&auto=format&q=80", brand: "Britannia" },

  // 🧴 Personal Care
  { id: "16", name: "Colgate MaxFresh 150g", category: "personal-care", subcategory: "oral-care", price: 89, mrp: 105, discount: 15, offerPrice: 89, image: "https://images.unsplash.com/photo-1559667110-438b7360b667?w=200&h=200&fit=crop&auto=format&q=80", brand: "Colgate" },
  { id: "17", name: "Head & Shoulders Shampoo 340ml", category: "personal-care", subcategory: "hair-care", price: 310, mrp: 370, discount: 16, offerPrice: 310, image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200&h=200&fit=crop&auto=format&q=80", brand: "Head & Shoulders" },
  { id: "18", name: "Dove Body Wash 250ml", category: "personal-care", subcategory: "body-care", price: 199, mrp: 240, discount: 17, offerPrice: 199, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop&auto=format&q=80", brand: "Dove" },

  // 🧼 Household
  { id: "19", name: "Surf Excel Matic 2kg", category: "household", subcategory: "detergent", price: 399, mrp: 470, discount: 15, offerPrice: 399, image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&h=200&fit=crop&auto=format&q=80", brand: "Surf Excel" },
  { id: "20", name: "Vim Dishwash Gel 750ml", category: "household", subcategory: "dishwash", price: 125, mrp: 149, discount: 16, offerPrice: 125, image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=200&h=200&fit=crop&auto=format&q=80", brand: "Vim" },

];