import prisma from '../prisma/client';
import Link from 'next/link';
import PaymentInfo from '../components/PaymentInfo';

export async function getStaticProps() {
  const categories = await prisma.category.findMany({ include: { products: true }});
  return { props: { categories } };
}

export default function Home({ categories }) {
  return (
    <div className="p-4">
      {categories.map(cat => (
        <div key={cat.id} className="mb-8">
          <h2 className="text-xl font-bold">{cat.name}</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {cat.products.map(prod => (
              <Link key={prod.id} href={`/products/${prod.id}`}>
                <a className="border p-4 hover:shadow">{prod.name} - ${prod.price}</a>
              </Link>
            ))}
          </div>
        </div>
      ))}
      <PaymentInfo />
    </div>
  );
}
