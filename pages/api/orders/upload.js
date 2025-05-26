import nextConnect from 'next-connect';
import multer from 'multer';
import prisma from '../../../prisma/client';

const upload = multer({ dest: '/tmp/uploads' });
const apiRoute = nextConnect();

apiRoute.use(upload.single('proof'));

apiRoute.post(async (req, res) => {
  const { orderId } = req.body;
  const file = req.file;
  const proofUrl = file.path;
  await prisma.order.update({ where: { id: orderId }, data: { proof: proofUrl } });
  res.status(200).json({ proofUrl });
});

export default apiRoute;
export const config = { api: { bodyParser: false } };
