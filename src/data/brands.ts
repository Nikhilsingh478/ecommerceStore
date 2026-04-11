export interface Brand {
  id: string;
  name: string;
  image: string;
}

export const brands: Brand[] = [
  // Existing
  { id: "tata", name: "Tata", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "amul", name: "Amul", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "parle", name: "Parle", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "colgate", name: "Colgate", image: "https://images.unsplash.com/photo-1559667110-438b7360b667?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "dove", name: "Dove", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "maggi", name: "Maggi", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "fortune", name: "Fortune", image: "https://images.unsplash.com/photo-1474979266404-7eabd7a43462?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "dettol", name: "Dettol", image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=100&h=100&fit=crop&auto=format&q=80" },

  // Grocery & Staples
  { id: "aashirvaad", name: "Aashirvaad", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "india-gate", name: "India Gate", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "daawat", name: "Daawat", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop&auto=format&q=80" },

  // Dairy & Breakfast
  { id: "mother-dairy", name: "Mother Dairy", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "nestle", name: "Nestlé", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "britannia", name: "Britannia", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=100&h=100&fit=crop&auto=format&q=80" },

  // Snacks & Beverages
  { id: "lays", name: "Lay's", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "kurkure", name: "Kurkure", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "pepsi", name: "Pepsi", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "coca-cola", name: "Coca-Cola", image: "https://images.unsplash.com/photo-1581090700227-1e8e3f4a3e94?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "red-bull", name: "Red Bull", image: "https://images.unsplash.com/photo-1598514982846-1d87a3eb1c7f?w=100&h=100&fit=crop&auto=format&q=80" },

  // Personal Care
  { id: "lux", name: "Lux", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "lifebuoy", name: "Lifebuoy", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "head-shoulders", name: "Head & Shoulders", image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "pantene", name: "Pantene", image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=100&h=100&fit=crop&auto=format&q=80" },

  // Household
  { id: "surf-excel", name: "Surf Excel", image: "https://images.unsplash.com/photo-1581579185169-6a6f1c7bbf4d?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "ariel", name: "Ariel", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "vim", name: "Vim", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "harpic", name: "Harpic", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=100&h=100&fit=crop&auto=format&q=80" },

  // Premium / Beauty
  { id: "loreal", name: "L'Oréal", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "nivea", name: "Nivea", image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=100&h=100&fit=crop&auto=format&q=80" },
  { id: "garnier", name: "Garnier", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=100&h=100&fit=crop&auto=format&q=80" },
];