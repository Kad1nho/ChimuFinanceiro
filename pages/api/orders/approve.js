import prisma from '../../../prisma/client';

export default async function handler(req, res) {
  const auth = req.headers.authorization;
  if (!auth || auth.indexOf('Basic ') === -1) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).end();
  }
  const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  if (user !== 'Cadinho' || pass !== 'Cadinho2005') return res.status(403).end();
  if (req.method !== 'POST') return res.status(405).end();
  const { orderId } = req.body;
  const order = await prisma.order.update({ where: { id: orderId }, data: { status: 'approved' } });
  res.status(200).json(order);
}
