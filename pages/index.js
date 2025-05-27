// pages/index.js
import Link from 'next/link'
import PaymentInfo from '../components/PaymentInfo'
import { supabase } from '../lib/supabase'

export async function getStaticProps() {
  // Busca categorias e produtos via Supabase em build time
  const { data: categories, error } = await supabase
    .from('Category')
    .select(`
      id,
      name,
      products (
        id,
        name,
        price
      )
    `)

  if (error) {
    console.error('Erro ao buscar categorias:', error)
    return { props: { categories: [] } }
  }

  return {
    props: { categories },
    revalidate: 60, // Regenera a cada 60 segundos (opcional)
  }
}

export default function Home({ categories }) {
  return (
    <div className="p-4">
      {categories.map(cat => (
        <section key={cat.id} className="mb-8">
          <h2 className="text-xl font-bold">{cat.name}</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {cat.products.map(prod => (
              <Link key={prod.id} href={`/products/${prod.id}`}>
                <a className="border p-4 hover:shadow">
                  {prod.name} — R$ {prod.price.toFixed(2)}
                </a>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <PaymentInfo />
    </div>
  )
}
