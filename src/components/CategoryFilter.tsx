import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => {
        const isActive = selected === category;

        return (
          <motion.button
            key={category}
            onClick={() => onSelect(category)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              px-6 py-2 text-xs uppercase tracking-widest border transition-all duration-300
              ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black border-gray-300 hover:border-black hover:text-black"
              }
            `}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
