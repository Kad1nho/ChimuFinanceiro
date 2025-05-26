import prisma from '../../prisma/client';

export async function getStaticPaths() {
  const products = await prisma.product.findMany();
  return { paths: products.map(p => ({ params: { id: p.id }})), fallback: false };
}

export async function getStaticProps({ params }) {
  const product = await prisma.product.findUnique({ where: { id: params.id }});
  return { props: { product } };
}

export default function Product({ product }) {
  const buy = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ productId: product.id })
    });
    alert('Pedido criado!');
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl">{product.name}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="mt-2 font-bold">${product.price}</p>
      <button onClick={buy} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Comprar</button>
    </div>
  );
}
