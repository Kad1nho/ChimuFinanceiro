// pages/products/[id].js
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export async function getStaticPaths() {
  // Busca todos os IDs de produtos para gerar as rotas estáticas
  const { data: products, error } = await supabase
    .from('Product')
    .select('id')

  if (error) {
    console.error('Erro ao buscar caminhos de produtos:', error)
    return { paths: [], fallback: false }
  }

  const paths = products.map(p => ({
    params: { id: p.id }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // Busca os dados de um produto específico pelo ID
  const { data, error } = await supabase
    .from('Product')
    .select('id, name, description, price')
    .eq('id', params.id)
    .single()

  if (error) {
    console.error('Erro ao buscar produto:', error)
    return { notFound: true }
  }

  return {
    props: { product: data },
    revalidate: 60, // opcional: revalida a cada 60 segundos
  }
}

export default function ProductPage({ product }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-4 text-lg font-bold">R$ {product.price.toFixed(2)}</p>

      <p className="mt-6 text-sm text-gray-600">
        (Compras e avaliações só funcionam na versão completa)
      </p>
      <Link href="/checkout/success">
        <a className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Simular Compra
        </a>
      </Link>
    </div>
  )
}
