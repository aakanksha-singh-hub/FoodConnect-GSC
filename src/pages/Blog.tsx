import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Tag, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "All",
    "Success Stories",
    "Food Waste",
    "Community",
    "Sustainability",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "How Food Connect Reduced Food Waste by 40% in 2023",
      excerpt:
        "Discover the strategies and partnerships that helped Food Connect achieve a significant reduction in food waste across India in 2023.",
      category: "Success Stories",
      author: "Rahul Sharma",
      date: "March 15, 2024",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 2,
      title: "The Environmental Impact of Food Waste: A Global Perspective",
      excerpt:
        "An in-depth analysis of how food waste contributes to environmental issues and what we can do to address this growing concern.",
      category: "Food Waste",
      author: "Dr. Priya Patel",
      date: "March 10, 2024",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80",
    },
    {
      id: 3,
      title: "Community Spotlight: Mumbai's Food Recovery Network",
      excerpt:
        "Meet the volunteers and organizations working together to recover surplus food and feed thousands of people in need across Mumbai.",
      category: "Community",
      author: "Anjali Desai",
      date: "March 5, 2024",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 4,
      title: "Sustainable Food Systems: The Role of Technology",
      excerpt:
        "How technology is revolutionizing food distribution and helping create more sustainable food systems for the future.",
      category: "Sustainability",
      author: "Vikram Mehta",
      date: "February 28, 2024",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 5,
      title: "From Farm to Table: Reducing Losses in the Supply Chain",
      excerpt:
        "Innovative approaches to minimize food losses between harvest and consumption, ensuring more food reaches those who need it.",
      category: "Food Waste",
      author: "Dr. Arun Kumar",
      date: "February 20, 2024",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 6,
      title: "Food Waste in Restaurants: A Hidden Crisis",
      excerpt:
        "Exploring the challenges restaurants face with food waste and how Food Connect is helping them implement effective solutions.",
      category: "Food Waste",
      author: "Dr. Priya Sharma",
      date: "February 28, 2024",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === null ||
      selectedCategory === "All" ||
      post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReadMore = () => {
    // Refresh the page
    window.location.reload();
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-white to-brand-blue/10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark"
            >
              Blog & Updates
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Stay informed about food waste reduction, community impact, and
              sustainability initiatives.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-brand-green text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() =>
                      setSelectedCategory(category === "All" ? null : category)
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-brand-green text-white text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-dark mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-3">
                      <div className="flex items-center">
                        <User size={16} className="mr-1 text-brand-green" />
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1 text-brand-green" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-brand-green" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleReadMore}
                      className="inline-flex items-center text-brand-green font-medium hover:text-brand-green/80 transition-colors"
                    >
                      Read More
                      <ArrowRight size={18} className="ml-1" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
