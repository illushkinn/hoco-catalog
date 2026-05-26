import ProductCard from "./ProductCard";
import FundasPackagingBanner from "./FundasPackagingBanner";

interface Product {
  id: string;
  name: string;
  price_ars: number;
  status: string;
  image?: string;
  images?: string[];
  isVideo?: boolean;
  priceUSD?: number;
}

interface CategorySectionProps {
  category: string;
  products: Product[];
  isFirstSection?: boolean;
}

export default function CategorySection({
  category,
  products,
  isFirstSection = false,
}: CategorySectionProps) {
  return (
    <section
      className="mb-8 sm:mb-12 [contain:layout_style]"
      data-category={category}
      data-product-count={products.length}
    >
      <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-border">
        <h2 className="text-xl sm:text-2xl font-semibold text-black dark:text-white min-w-0">
          {category}
        </h2>
      </div>

      {category === "Fundas Neopren" && <FundasPackagingBanner />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="will-change-transform min-w-0"
          >
            <ProductCard
              id={product.id}
              name={product.name}
              price_ars={product.price_ars}
              status={product.status}
              image={product.image}
              images={product.images}
              isVideo={product.isVideo}
              priceUSD={product.priceUSD}
              imageLoading={isFirstSection ? "eager" : "lazy"}
              enableImageZoom={category === "Fundas Neopren"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
