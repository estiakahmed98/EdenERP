export interface App {
  id: string;
  title: string;
  vendor: string;
  price: string;
  rating: number;
  downloads: number;
  gradient: string;
  imageSrc?: string;
  category: string;
}

export const topApps: App[] = [
  {
    id: "1",
    title: "Shopify Connector",
    vendor: "Adon Labs",
    price: "$49.00",
    rating: 4.8,
    downloads: 12450,
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
    imageSrc: "/Assets/apps/Shopify-Connector.jpg",
    category: "E-commerce",
  },
  {
    id: "2",
    title: "AI Business Dashboard",
    vendor: "Analytics Pro",
    price: "$89.00",
    rating: 4.9,
    downloads: 8750,
    gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
    imageSrc: "/Assets/apps/AI Business Dashboard.jpg",
    category: "Analytics",
  },
  {
    id: "3",
    title: "Access Management Suite",
    vendor: "SecureSoft",
    price: "$129.00",
    rating: 4.7,
    downloads: 5630,
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-500",
    imageSrc: "/Assets/apps/Access Management Suite.jpg",
    category: "Security",
  },
  {
    id: "4",
    title: "Direct Print Pro",
    vendor: "PrintTech",
    price: "$34.99",
    rating: 4.6,
    downloads: 12430,
    gradient: "bg-gradient-to-br from-orange-500 to-red-500",
    imageSrc: "/Assets/apps/Direct Print Pro.jpg",
    category: "Utilities",
  },
];

export const newApps: App[] = [
  {
    id: "5",
    title: "Contact Field Validation",
    vendor: "CodeFusion",
    price: "FREE",
    rating: 4.5,
    downloads: 3400,
    gradient: "bg-gradient-to-br from-indigo-500 to-purple-500",
    imageSrc: "/Assets/apps/Contact Field Validation.jpg",
    category: "CRM",
  },
  {
    id: "6",
    title: "Export Manager",
    vendor: "DataWorks",
    price: "$9.99",
    rating: 4.3,
    downloads: 2100,
    gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
    imageSrc: "/Assets/apps/Export Manager.jpg",
    category: "Data",
  },
  {
    id: "7",
    title: "Delivery Shipping Connector",
    vendor: "LogiTech",
    price: "$149.00",
    rating: 4.7,
    downloads: 890,
    gradient: "bg-gradient-to-br from-yellow-500 to-orange-500",
    imageSrc: "/Assets/apps/Delivery Shipping Connector.avif",
    category: "Shipping",
  },
  {
    id: "8",
    title: "Multi Currency Reports",
    vendor: "FinanceHub",
    price: "$54.29",
    rating: 4.4,
    downloads: 1560,
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-500",
    imageSrc: "/Assets/apps/Multi Currency Reports.jpg",
    category: "Accounting",
  },
];

export const mostDownloaded: App[] = [
  {
    id: "9",
    title: "Accounting Suite",
    vendor: "FinTech Solutions",
    price: "FREE",
    rating: 4.8,
    downloads: 45680,
    gradient: "bg-gradient-to-br from-blue-600 to-indigo-600",
    imageSrc: "/Assets/apps/Accounting Suite.jpg",
    category: "Accounting",
  },
  {
    id: "10",
    title: "Customer Follow-ups",
    vendor: "CRM Masters",
    price: "FREE",
    rating: 4.6,
    downloads: 34210,
    gradient: "bg-gradient-to-br from-pink-500 to-rose-500",
    imageSrc: "/Assets/apps/Customer Follow-ups.webp",
    category: "CRM",
  },
  {
    id: "11",
    title: "BI Dashboard",
    vendor: "Synonics Tech",
    rating: 4.4,
    price: "FREE",
    downloads: 28750,
    gradient: "bg-gradient-to-br from-violet-500 to-purple-500",
    imageSrc: "/Assets/apps/BI Dashboard.png",
    category: "Analytics",
  },
  {
    id: "12",
    title: "IT Hardware & Support",
    vendor: "IT Solutions",
    rating: 4.9,
    price: "FREE",
    downloads: 141930,
    gradient: "bg-gradient-to-br from-slate-600 to-gray-600",
    imageSrc: "/Assets/apps/IT Hardware & Support.jpg",
    category: "IT",
  },
];
