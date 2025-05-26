import prisma from '../../../prisma/client';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).end();
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);
  const { productId, rating, comment } = req.body;
  const review = await prisma.review.create({ data: { userId, productId, rating, comment } });
  res.status(201).json(review);
}
