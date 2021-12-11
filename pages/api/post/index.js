import { getSession } from 'next-auth/react';

export default async function postAPI(req, res) {
  const { method } = req;
  const session = await getSession({ req });

  if (method === 'POST') {
  } else {
    console.log('ELSE: ');
    res.status(400).json({ success: false, message: 'Invalid request' });
  }
}
