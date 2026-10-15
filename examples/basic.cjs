const {parseOrder} = require('../index.cjs');

const pesan = `Halo kak, saya mau order 2 kaos hitam @Rp50.000 dan 1 topi @25rb
Nama: Budi
No WA: 0812-3456-7890
Alamat: Jl. Merdeka No. 10, Depok
Pembayaran: COD
Catatan: Tolong bungkus rapi`;

console.log(JSON.stringify(parseOrder(pesan), null, 2));
