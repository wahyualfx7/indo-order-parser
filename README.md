# IndoOrderParser

*Library* JavaScript/Node.js untuk mengubah chat pesanan berbahasa Indonesia menjadi objek JSON. Cocok untuk prototipe aplikasi UMKM, kasir, *dashboard* order, atau otomasi penyalinan pesan menjadi formulir.

- Versi: `0.1.0` (MVP)
- Persyaratan: Node.js 18+
- Dependensi eksternal: **tidak ada**
- Mode kerja: aturan teks (*rule-based*) secara lokal, bukan AI; tidak mengirim pesan atau data pelanggan ke internet.
- Belum dipublikasikan ke npm publik. Nama `indo-order-parser` dan ketersediaannya di registri npm **belum diverifikasi**.

## Instalasi lokal

Di folder proyek ini:

```bash
npm test
npm run example
```

Untuk memasang ke proyek Node.js lain, jalankan dari folder proyek tujuan:

```bash
npm install /lokasi/indo-order-parser
```

Atau unduh berkas `.tgz` hasil `npm pack`, lalu:

```bash
npm install /lokasi/indo-order-parser-0.1.0.tgz
```

## Contoh pemakaian

**CommonJS (`require`)**

```js
const { parseOrder } = require('indo-order-parser');

const order = parseOrder(`Pesan 2 kaos hitam @Rp50.000 dan 1 topi @25rb
Nama: Budi
No WA: 0812-3456-7890
Alamat: Jl. Merdeka No. 10, Depok
Bayar COD`);

console.log(JSON.stringify(order, null, 2));
```

**ES Module (`import`)**

```js
import { parseOrder } from 'indo-order-parser';
console.log(parseOrder('Pesan 2 kaos hitam, alamat Depok, bayar COD'));
```

### Contoh hasil

```json
{
  "customer": {
    "name": "Budi",
    "phone": "6281234567890",
    "address": "Jl. Merdeka No. 10, Depok"
  },
  "items": [
    { "name": "kaos hitam", "quantity": 2, "unitPrice": 50000, "subtotal": 100000 },
    { "name": "topi", "quantity": 1, "unitPrice": 25000, "subtotal": 25000 }
  ],
  "payment": { "method": "cod", "provider": null },
  "note": null,
  "currency": "IDR",
  "itemsSubtotal": 125000,
  "declaredTotal": null,
  "warnings": [],
  "unparsedSegments": []
}
```

## Fungsi publik

| Fungsi | Kegunaan |
|---|---|
| `parseOrder(text)` | Parse satu chat pesanan menjadi JSON |
| `parseOrders(texts)` | Parse array chat menjadi array pesanan |
| `parseRupiah(value)` | Konversi `Rp50.000`, `50rb`, `1,5 juta` menjadi integer |
| `normalizePhone(value)` | Normalisasi nomor seluler Indonesia menjadi format `628...` |

## Format pesanan yang didukung

- Kuantitas sebelum produk: `2 kaos hitam`, `2x kaos hitam`, `2 pcs kaos hitam`.
- Kuantitas di akhir: `kaos hitam 2 pcs`, `kaos hitam x2`.
- Beberapa item: `2 kaos merah dan 1 topi`, per baris, atau dipisahkan koma.
- Harga satuan: `@Rp50.000`, `@25rb`, `harga 50k`, `Rp50.000` di akhir item.
- Label data pelanggan: `Nama:`, `Penerima:`, `No WA:`, `HP:`, `Alamat:`, `Catatan:`.
- Metode pembayaran: `COD`, `QRIS`, `transfer BCA/BRI/BNI/Mandiri/...`, `DANA`, `OVO`, `GoPay`, `ShopeePay`, `LinkAja`, `tunai`.
- `Total: Rp125.000` dicatat sebagai `declaredTotal` tanpa secara otomatis diasumsikan sebagai subtotal produk.

Jika harga suatu item tidak tercantum, `unitPrice`, `subtotal` item, dan `itemsSubtotal` keseluruhan bernilai `null`. Ini disengaja agar aplikasi tidak mengasumsikan harga.

## Batasan penting

Ini adalah versi awal berbasis pola regex, **bukan pemahaman bahasa alami penuh**. Teks bebas, kesalahan ketik, alamat kompleks, kata `dan` di dalam nama produk, atau penyebutan beberapa opsi pembayaran bisa menyebabkan salah baca. Parsing harga, diskon, dan ongkir belum lengkap. `unparsedSegments` berisi teks yang tidak dikenali, dan `warnings` berisi penanda untuk pemeriksaan.

Sebelum memasukkan hasil ke database, mengirim barang, atau memproses pembayaran, tampilkan hasil ke operator/pelanggan untuk verifikasi. Jangan gunakan regex ini sebagai validator identitas/NIK, bukti pembayaran, atau sumber kebenaran transaksi.

## Mengembangkan dan menguji

```bash
npm test
npm run example
npm pack
```


## Lisensi

MIT — lihat `LICENSE`.
