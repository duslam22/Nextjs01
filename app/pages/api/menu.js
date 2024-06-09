import dbConnect from '../../../lib/db';
import Menu from '../../../models/Menu'; // Ganti dengan model yang sesuai

// Handler untuk API route /api/menu
export default async function handler(req, res) {
  const { method } = req;

  // Menghubungkan ke database MongoDB
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // Mengambil semua data menu dari database
        const menus = await Menu.find({});
        res.status(200).json({ success: true, data: menus });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        // Membuat data menu baru berdasarkan request body
        const menu = await Menu.create(req.body);
        res.status(201).json({ success: true, data: menu });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res
        .status(405)
        .json({ success: false, error: `Method ${method} Not Allowed` });
      break;
  }
}
