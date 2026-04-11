export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: { id: string; name: string; image: string }[];
}

export const categories: Category[] = [
  {
    id: "grocery",
    name: "Grocery & Staples",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop",
    subcategories: [
      { id: "staples", name: "Atta, Rice & Dal", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" },
      { id: "oils", name: "Oils & Ghee", image: "https://images.unsplash.com/photo-1474979266404-7eabd7a43462?w=100&h=100&fit=crop" },
      { id: "spices", name: "Masala & Spices", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=100&h=100&fit=crop" },
      { id: "snacks", name: "Snacks & Biscuits", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop" },
      { id: "beverages", name: "Tea & Coffee", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop" },
      { id: "instant-food", name: "Instant Food", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=100&h=100&fit=crop" },
      { id: "sauces", name: "Sauces & Spreads", image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=100&h=100&fit=crop" },
    ],
  },
  {
    id: "dairy",
    name: "Dairy & Breakfast",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&h=120&fit=crop",
    subcategories: [
      { id: "milk", name: "Milk", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop" },
      { id: "butter-cheese", name: "Butter & Cheese", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=100&h=100&fit=crop" },
    ],
  },
  {
    id: "personal-care",
    name: "Personal Care",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=120&h=120&fit=crop",
    subcategories: [
      { id: "oral-care", name: "Oral Care", image: "https://images.unsplash.com/photo-1559667110-438b7360b667?w=100&h=100&fit=crop" },
      { id: "hair-care", name: "Hair Care", image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=100&h=100&fit=crop" },
      { id: "body-care", name: "Body Care", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop" },
      { id: "hygiene", name: "Hygiene", image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=100&h=100&fit=crop" },
    ],
  },
  {
    id: "household",
    name: "Household & Cleaning",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=120&h=120&fit=crop",
    subcategories: [
      { id: "detergent", name: "Detergents", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=100&h=100&fit=crop" },
      { id: "cleaning", name: "Dishwash & Cleaners", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=100&h=100&fit=crop" },
    ],
  },
];
