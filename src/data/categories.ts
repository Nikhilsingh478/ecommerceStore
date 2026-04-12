export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: { id: string; name: string; image: string }[];
}

export const categories: Category[] = [
  // 🥦 Grocery & Staples
  {
    id: "grocery",
    name: "Grocery & Staples",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop&auto=format&q=80",
    subcategories: [
      { id: "atta-rice-dal", name: "Atta, Rice & Dal", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "oils-ghee", name: "Oils & Ghee", image: "https://cdn.shopify.com/s/files/1/0566/6226/1897/files/Ghee_and_oil_preparation_techniques_480x480.jpg?v=1682655303" },
      { id: "spices", name: "Masala & Spices", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "dry-fruits", name: "Dry Fruits", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "flours", name: "Flours", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "salt-sugar", name: "Salt & Sugar", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop&auto=format&q=80" },
    ],
  },

  // 🥛 Dairy & Breakfast
  {
    id: "dairy",
    name: "Dairy & Breakfast",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&h=120&fit=crop&auto=format&q=80",
    subcategories: [
      { id: "milk", name: "Milk", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "bread", name: "Bread", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "butter-cheese", name: "Butter & Cheese", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "eggs", name: "Eggs", image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "cereals", name: "Cereals", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop&auto=format&q=80" },
    ],
  },

  // 🍿 Snacks & Beverages
  {
    id: "snacks",
    name: "Snacks & Beverages",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=120&h=120&fit=crop&auto=format&q=80",
    subcategories: [
      { id: "biscuits", name: "Biscuits", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "chips", name: "Chips", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "namkeen", name: "Namkeen", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "soft-drinks", name: "Soft Drinks", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWBujF3LNaztLCaqQngx_QOAk-jURo7VVC_Q&s" },
      { id: "juices", name: "Juices", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "tea-coffee", name: "Tea & Coffee", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop&auto=format&q=80" },
    ],
  },

  // 🧴 Personal Care
  {
    id: "personal-care",
    name: "Personal Care",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=120&h=120&fit=crop&auto=format&q=80",
    subcategories: [
      { id: "oral-care", name: "Oral Care", image: "https://images.unsplash.com/photo-1559667110-438b7360b667?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "hair-care", name: "Hair Care", image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "body-care", name: "Body Care", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "skincare", name: "Skin Care", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "hygiene", name: "Hygiene", image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=100&h=100&fit=crop&auto=format&q=80" },
    ],
  },

  // 🧼 Household
  {
    id: "household",
    name: "Household & Cleaning",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=120&h=120&fit=crop&auto=format&q=80",
    subcategories: [
      { id: "detergent", name: "Detergents", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "dishwash", name: "Dishwash", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "cleaners", name: "Floor Cleaners", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "fresheners", name: "Air Fresheners", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop&auto=format&q=80" },
    ],
  },

  // 🍎 Fruits & Vegetables (NEW IMPORTANT)
  {
    id: "fruits-veg",
    name: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=120&h=120&fit=crop&auto=format&q=80",
    subcategories: [
      { id: "fresh-fruits", name: "Fresh Fruits", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "fresh-vegetables", name: "Fresh Vegetables", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&h=100&fit=crop&auto=format&q=80" },
      { id: "herbs", name: "Herbs", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=100&h=100&fit=crop&auto=format&q=80" },
    ],
  },
];