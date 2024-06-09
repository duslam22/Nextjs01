import React from 'react';
import './Invoices.css';

import { MongoClient } from 'mongodb';

type Menu = {
  _id: string;
  nama: string;
  harga: string;
  gambar: string;
};

async function fetchMenus(): Promise<Menu[]> {
  const uri = process.env.MONGODB_URI!;
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('db_kantin'); // Ganti dengan nama database Anda
  const menus = await db.collection('menu').find({}).toArray();
  await client.close();
  // Membuat objek Menu dari setiap dokumen MongoDB
  return menus.map(menu => ({
    _id: menu._id.toString(),
    nama: menu.nama,
    harga: menu.harga,
    gambar: menu.gambar
  }));
}

const Menu = async () => {
  const menus = await fetchMenus();

  
  return (
    <div className="invoices-container">
      <h1>Daftar Menu</h1>
      <div className="header">
        <p></p>
        <div className="button-container">
          <button className="add-button" >Tambah menu</button>
        </div>
      </div>
      <table className="invoices-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Menu</th>
            <th>Gambar</th>
            <th>Harga</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {menus.map((menu) => (
            <tr key={menu._id}>
              <td>{menu._id}</td>
              <td>{menu.nama}</td>
              <td><img src={`/image/${menu.gambar}`} alt={menu.nama} style={{ width: '100px' }} /></td>
              <td>{menu.harga}</td>
              <td><button>Edit</button>
              <button>Hapus</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Menu;
