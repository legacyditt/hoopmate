# Dokumen Kebutuhan Produk (PRD)

# COURTSIDE --- Pengelola Pertandingan Basket

  Metadata         Detail
  ---------------- -----------------------------------------
  Produk           COURTSIDE
  Dokumen          Dokumen Kebutuhan Produk (PRD)
  Versi            1.0
  Status           Draf
  Platform         Aplikasi web berorientasi seluler / PWA
  Arsitektur       Frontend statis, tanpa backend
  Bahasa dokumen   Bahasa Indonesia

------------------------------------------------------------------------

## 1. Gambaran Produk

### 1.1 Ringkasan

COURTSIDE adalah aplikasi web yang dirancang untuk membantu
penyelenggaraan sesi basket kasual 3 lawan 3. Pengguna dapat memasukkan
nama pemain, membagi pemain ke dalam tim secara acak, membuat jadwal
kompetisi Round Robin, mengelola papan skor dan penghitung waktu
pertandingan, serta melihat klasemen dan riwayat pertandingan.

Versi MVP ditujukan untuk satu penyelenggara yang menggunakan satu
ponsel. Aplikasi tidak memerlukan akun, API backend, maupun basis data
cloud. Seluruh data disimpan secara lokal di peramban perangkat
penyelenggara.

### 1.2 Permasalahan

Penyelenggaraan pertandingan basket kasual sering membutuhkan pekerjaan
manual yang berulang:

-   Pembagian tim membutuhkan waktu dan dapat dianggap tidak adil.
-   Pembuatan jadwal menjadi semakin sulit ketika jumlah tim bertambah.
-   Skor dan durasi pertandingan sering dicatat secara manual.
-   Hasil dan klasemen dapat terlupakan setelah sesi selesai.

COURTSIDE menyatukan proses tersebut dalam satu aplikasi sederhana yang
dapat digunakan langsung di lapangan.

### 1.3 Tujuan Produk

1.  Mempercepat proses memasukkan pemain dan membuat tim.
2.  Membagi pemain secara acak ke dalam tim yang masing-masing berisi
    tiga orang.
3.  Membuat jadwal Round Robin yang valid tanpa pasangan pertandingan
    berulang.
4.  Menyediakan kontrol skor dan waktu yang mudah digunakan melalui
    ponsel.
5.  Menghitung klasemen secara otomatis berdasarkan pertandingan yang
    telah selesai.
6.  Menyimpan sesi dan hasil pertandingan secara lokal meskipun halaman
    dimuat ulang.
7.  Menjaga aplikasi tetap sederhana untuk dikembangkan, diterapkan, dan
    dipelihara.

### 1.4 Hal di Luar Cakupan MVP

Fitur berikut tidak termasuk dalam versi MVP:

-   Registrasi dan login pengguna.
-   Sinkronisasi cloud atau kolaborasi lintas perangkat.
-   Berbagi papan skor secara langsung antarpengguna.
-   API backend atau basis data di server.
-   Akun, profil, dan analitik performa pemain.
-   Penyeimbangan tim otomatis berdasarkan kemampuan pemain.
-   Format turnamen selain Round Robin.
-   Fitur wasit resmi, pencatatan pelanggaran, atau statistik 3x3
    tingkat lanjut.

------------------------------------------------------------------------

## 2. Pengguna Sasaran dan Model Penggunaan

### 2.1 Pengguna Utama

**Penyelenggara Pertandingan / Pencatat Skor**

Satu orang menggunakan aplikasi melalui ponsel untuk mengelola sesi,
membuat tim, menjalankan jadwal, mengoperasikan penghitung waktu, dan
mencatat skor.

### 2.2 Pengguna Sekunder

Pemain lain dapat melihat layar perangkat penyelenggara, tetapi pada
versi MVP mereka tidak berinteraksi dengan aplikasi melalui perangkat
masing-masing.

### 2.3 Skenario Penggunaan Utama

1.  Penyelenggara membuka COURTSIDE dan membuat sesi baru.
2.  Penyelenggara memasukkan nama semua pemain yang hadir.
3.  Aplikasi membagi pemain secara acak menjadi tim beranggotakan tiga
    orang.
4.  Penyelenggara meninjau atau menyesuaikan susunan tim secara manual.
5.  Aplikasi membuat jadwal Round Robin.
6.  Penyelenggara memilih pertandingan berikutnya.
7.  Penyelenggara memulai penghitung waktu dan mencatat skor.
8.  Penyelenggara mengakhiri pertandingan.
9.  Aplikasi memperbarui klasemen dan riwayat pertandingan.
10. Proses diulangi sampai seluruh pertandingan selesai.

------------------------------------------------------------------------

## 3. Cakupan Produk

### 3.1 Fitur MVP

  -----------------------------------------------------------------------
  Fitur                   Deskripsi               Prioritas
  ----------------------- ----------------------- -----------------------
  Pengelolaan Sesi        Membuat, membuka,       Wajib
                          mengganti nama, dan     
                          menyelesaikan sesi      

  Pengelolaan Pemain      Menambah, mengubah,     Wajib
                          menghapus, dan melihat  
                          pemain                  

  Pembuat Tim Acak        Mengacak pemain ke      Wajib
                          dalam tim beranggotakan 
                          tiga orang              

  Penyesuaian Tim         Mengganti nama tim dan  Wajib
                          memindahkan pemain      
                          secara manual           

  Penjadwal Round Robin   Membuat setiap pasangan Wajib
                          pertandingan unik satu  
                          kali                    

  Papan Skor              Mencatat dan            Wajib
                          memperbaiki skor        
                          pertandingan            

  Penghitung Waktu        Memulai, menjeda,       Wajib
                          melanjutkan, dan        
                          mengatur ulang waktu    

  Hasil Pertandingan      Menyimpan hasil         Wajib
                          pertandingan yang telah 
                          selesai                 

  Klasemen                Menghitung menang,      Wajib
                          kalah, poin, dan        
                          selisih poin            

  Riwayat Pertandingan    Melihat pertandingan    Wajib
                          yang telah selesai      

  Penyimpanan Lokal       Menyimpan data aplikasi Wajib
                          di peramban             

  Cadangan JSON           Mengekspor dan          Dianjurkan
                          mengimpor data sesi     

  Instalasi PWA           Memungkinkan aplikasi   Dianjurkan
                          dipasang pada peramban  
                          seluler yang mendukung  

  Dukungan Luring         Memuat aset aplikasi    Dianjurkan
                          yang telah tersimpan    
                          tanpa koneksi internet  
  -----------------------------------------------------------------------

### 3.2 Fitur Pengembangan Berikutnya

-   Membagikan hasil pertandingan sebagai gambar.
-   Mengekspor klasemen ke CSV.
-   Format tambahan seperti Winner Stays dan sistem gugur.
-   Penilaian kemampuan pemain dan pembagian tim yang lebih seimbang.
-   Pencatatan pelanggaran dan statistik per pemain.
-   Cadangan cloud dan sinkronisasi lintas perangkat.

------------------------------------------------------------------------

## 4. Kebutuhan Fungsional

### FR-01 --- Pengelolaan Sesi

Pengguna harus dapat mengelola beberapa sesi pertandingan basket secara
terpisah.

Kebutuhan:

-   Membuat sesi dengan nama tertentu.
-   Membuka sesi yang sudah ada.
-   Mengganti nama sesi.
-   Menandai sesi sebagai selesai.
-   Menampilkan tanggal pembuatan dan pembaruan terakhir.
-   Memisahkan data pemain, tim, pertandingan, dan klasemen berdasarkan
    sesi.
-   Menghapus sesi setelah pengguna memberikan konfirmasi.

Aturan bisnis:

-   Setiap sesi memiliki ID unik.
-   Status sesi terdiri dari `draft`, `active`, atau `completed`.
-   Pembuatan sesi baru tidak boleh menimpa sesi lain.
-   Penghapusan sesi juga menghapus seluruh data yang terkait dengan
    sesi tersebut.

### FR-02 --- Pengelolaan Pemain

Pengguna harus dapat mengelola daftar pemain pada sesi yang sedang
dibuka.

Kebutuhan:

-   Menambahkan pemain berdasarkan nama.
-   Mengubah nama pemain.
-   Menghapus pemain.
-   Menampilkan jumlah seluruh pemain.
-   Menolak nama kosong atau hanya berisi spasi.
-   Mencegah nama duplikat dalam sesi yang sama tanpa membedakan huruf
    besar dan kecil serta mengabaikan spasi di awal atau akhir.
-   Menyediakan tindakan hapus seluruh daftar dengan konfirmasi.

Aturan bisnis:

-   Setiap pemain memiliki ID unik.
-   Nama pemain wajib diisi.
-   Minimal enam pemain yang memenuhi syarat diperlukan untuk membuat
    dua tim.
-   Data pemain hanya berlaku pada satu sesi.
-   Perubahan nama pemain tidak boleh merusak hubungan data dengan tim
    atau pertandingan.

### FR-03 --- Pembuat Tim Acak

Aplikasi harus membagi pemain secara acak ke dalam tim yang
masing-masing berisi tiga orang.

Kebutuhan:

-   Membuat tim menggunakan algoritma pengacakan.
-   Jumlah anggota standar setiap tim adalah tiga orang.
-   Penyelenggara dapat mengacak ulang sebelum jadwal dibuat.
-   Nama tim dapat diubah.
-   Pemain dapat dipindahkan antartim.
-   Pemain yang tidak cukup untuk membentuk tim lengkap ditampilkan
    sebagai pemain cadangan/belum ditempatkan.
-   Setiap pemain hanya boleh muncul satu kali, baik di tim maupun
    daftar cadangan.

Aturan bisnis:

-   Gunakan algoritma Fisher-Yates.
-   Jangan mengubah larik pemain asli.
-   Jangan menghilangkan pemain yang tersisa tanpa pemberitahuan.
-   Untuk `N` pemain dan ukuran tim `3`:
    -   Jumlah tim lengkap = `floor(N / 3)`.
    -   Jumlah pemain cadangan = `N mod 3`.
-   Minimal dua tim lengkap diperlukan untuk membuat jadwal.
-   Setelah pertandingan dimulai, perubahan anggota tim harus disertai
    peringatan dan pengaturan ulang data jadwal yang terdampak secara
    terkendali.

Contoh untuk 10 pemain:

-   Tim A: 3 pemain.
-   Tim B: 3 pemain.
-   Tim C: 3 pemain.
-   Cadangan: 1 pemain.

### FR-04 --- Penjadwal Round Robin

Aplikasi harus menjadwalkan setiap pasangan tim yang unik tepat satu
kali.

Kebutuhan:

-   Membuat jadwal Round Robin lengkap berdasarkan tim yang tersedia.
-   Mengacak urutan pertandingan tanpa mengubah pasangan pertandingan
    yang valid.
-   Menampilkan nomor pertandingan, nama tim, dan status pertandingan.
-   Menandai pertandingan berikutnya.
-   Menampilkan pertandingan yang selesai dan yang masih menunggu.
-   Mendukung jumlah tim ganjil dengan memberikan giliran BYE pada
    setiap putaran.

Aturan bisnis:

-   Total pertandingan adalah `n * (n - 1) / 2`, dengan `n` sebagai
    jumlah tim.
-   Setiap pasangan tim bertemu tepat satu kali.
-   Tim tidak boleh bertanding melawan dirinya sendiri.
-   Pasangan pertandingan duplikat tidak diperbolehkan.
-   Untuk jumlah tim ganjil, gunakan slot BYE dalam jadwal metode
    lingkaran.
-   Pengacakan urutan pertandingan tidak boleh mengubah kumpulan
    pasangan pertandingan.
-   Pertandingan yang sudah selesai tidak boleh dibuat ulang atau
    diubah.
-   Jika penyelenggara meminta jadwal baru ketika sudah ada
    pertandingan, tampilkan peringatan dan minta konfirmasi secara
    eksplisit. Sebaiknya pembuatan ulang jadwal dicegah setelah
    pertandingan berlangsung atau selesai.

### FR-05 --- Papan Skor Pertandingan

Aplikasi harus menyediakan papan skor yang jelas untuk pertandingan
terpilih.

Kebutuhan:

-   Menampilkan nama kedua tim dan skor terkini.
-   Menambahkan poin untuk salah satu tim.
-   Mengurangi skor tanpa mengizinkan nilai negatif.
-   Menyediakan fitur urungkan untuk perubahan skor terakhir.
-   Memulai pertandingan.
-   Mengakhiri pertandingan.
-   Menampilkan status `scheduled`, `in_progress`, atau `completed`.
-   Menentukan pemenang berdasarkan skor akhir.
-   Menyimpan hasil akhir ke riwayat pertandingan.
-   Meminta konfirmasi sebelum pertandingan diakhiri atau diatur ulang.

Preset aturan skor:

**3x3 Standar** - Lemparan bebas: +1. - Tembakan dari dalam garis busur:
+1. - Tembakan dari luar garis busur: +2. - Target skor: 21. - Durasi
reguler: 10 menit.

**Kasual** - Tombol skor +1, +2, dan +3. - Penyelenggara dapat mengatur
target skor dan durasi. - Target skor dan durasi dapat dinonaktifkan
jika tidak diperlukan.

Aturan bisnis:

-   Skor tidak boleh negatif.
-   Pertandingan tidak boleh diselesaikan tanpa kondisi hasil akhir yang
    valid.
-   Jika skor seri saat waktu reguler habis, sediakan opsi perpanjangan
    waktu atau penentuan manual.
-   Pertandingan tidak boleh otomatis dianggap selesai hanya karena
    penghitung waktu mencapai nol ketika skor masih seri.
-   Simpan perubahan skor sebagai catatan kejadian agar fitur urungkan
    dan koreksi skor dapat berjalan dengan andal.
-   Jika target skor tercapai, aplikasi boleh memberi pengingat kepada
    penyelenggara untuk mengakhiri pertandingan. Hindari perpindahan
    status otomatis yang mengejutkan, kecuali memang diaktifkan secara
    eksplisit.

### FR-06 --- Penghitung Waktu Pertandingan

Aplikasi harus menyediakan penghitung waktu pertandingan yang andal.

Kebutuhan:

-   Memulai penghitung waktu.
-   Menjeda penghitung waktu.
-   Melanjutkan penghitung waktu.
-   Mengatur ulang penghitung waktu.
-   Menampilkan menit dan detik.
-   Mendukung durasi pertandingan yang dapat diatur.
-   Mempertahankan status penghitung waktu setelah navigasi atau
    pemuatan ulang halaman.
-   Tetap menghitung waktu secara benar ketika peramban berada di latar
    belakang.

Aturan teknis:

-   Gunakan cap waktu sebagai sumber kebenaran, bukan jumlah pemanggilan
    `setInterval`.
-   Ketika berjalan, hitung waktu berlalu dari `startedAt` ditambah
    waktu yang telah terakumulasi sebelumnya.
-   Simpan status penghitung waktu setiap kali terjadi perubahan.
-   `setInterval` hanya boleh digunakan untuk memperbarui tampilan
    waktu.
-   Pengaturan ulang membutuhkan konfirmasi jika pertandingan sedang
    berlangsung.

### FR-07 --- Klasemen

Aplikasi harus menghitung klasemen berdasarkan catatan pertandingan yang
telah selesai.

Sistem poin bawaan:

-   Menang: 3 poin klasemen.
-   Kalah: 0 poin klasemen.
-   Seri: tidak digunakan secara bawaan; hasil seri harus diselesaikan
    melalui perpanjangan waktu atau keputusan manual penyelenggara.

Kolom yang ditampilkan:

-   Tim.
-   Pertandingan dimainkan.
-   Menang.
-   Kalah.
-   Poin klasemen.
-   Poin memasukkan.
-   Poin kemasukan.
-   Selisih poin.

Urutan peringkat:

1.  Total poin klasemen.
2.  Hasil pertemuan langsung.
3.  Selisih poin.
4.  Total poin memasukkan.

Aturan bisnis:

-   Hanya pertandingan yang selesai yang memengaruhi klasemen.
-   Klasemen harus dihitung dari hasil pertandingan, bukan diedit secara
    terpisah.
-   Klasemen dihitung ulang setelah hasil pertandingan diperbaiki.
-   Tentukan perilaku yang konsisten untuk kondisi seri yang melibatkan
    lebih dari dua tim dan jelaskan dalam bantuan atau antarmuka
    aplikasi.

### FR-08 --- Riwayat Pertandingan

Kebutuhan:

-   Menampilkan daftar pertandingan yang telah selesai.
-   Menampilkan kedua tim dan skor akhir.
-   Menampilkan pemenang.
-   Menampilkan durasi pertandingan dan waktu penyelesaian.
-   Membuka detail pertandingan.
-   Memperbaiki hasil dengan konfirmasi.
-   Menghitung ulang klasemen setelah hasil diperbaiki.

### FR-09 --- Penyimpanan Data Lokal

Kebutuhan:

-   Menyimpan sesi, pemain, tim, jadwal, pertandingan, catatan skor, dan
    pengaturan.
-   Memulihkan data setelah halaman dimuat ulang.
-   Menangani data tersimpan yang hilang atau formatnya rusak secara
    aman.
-   Menyediakan fitur ekspor dan impor cadangan JSON.
-   Memberi versi pada skema data agar perubahan struktur di masa depan
    dapat dimigrasikan.

Rekomendasi penyimpanan MVP:

-   Gunakan `localStorage` pada MVP karena volume data kecil dan
    implementasinya sederhana.
-   Tempatkan seluruh akses penyimpanan di balik modul adaptor
    penyimpanan, misalnya `database.js`.
-   Jika kompleksitas atau volume data meningkat, implementasi adaptor
    dapat dipindahkan ke IndexedDB tanpa mengubah logika bisnis.
-   Jangan menyimpan rahasia atau informasi pribadi yang sensitif.

Batasan yang harus disampaikan kepada pengguna:

-   Data hanya tersimpan pada peramban dan perangkat yang digunakan.
-   Data tidak disinkronkan ke perangkat lain.
-   Menghapus data peramban dapat menghapus sesi yang tersimpan.
-   Pengguna disarankan mengekspor cadangan jika ingin mempertahankan
    hasil penting.

### FR-10 --- PWA dan Dukungan Luring

Fitur yang dianjurkan untuk MVP:

-   Menyediakan Web App Manifest.
-   Menyediakan ikon aplikasi yang sesuai.
-   Mendaftarkan Service Worker.
-   Menyimpan kerangka aplikasi dan aset statis ke cache.
-   Memungkinkan aplikasi dipasang pada peramban yang mendukung.
-   Menampilkan informasi luring yang berguna jika sumber daya yang
    belum tersimpan diminta.

Dukungan luring tidak berarti aplikasi mendukung sinkronisasi lintas
perangkat.

------------------------------------------------------------------------

## 5. Kebutuhan Pengalaman Pengguna

### 5.1 Arah Desain

Identitas produk: **COURTSIDE**

Slogan: **Acak tim. Atur pertandingan. Catat skor.**

Arah visual:

-   Mengutamakan tampilan seluler.
-   Tema gelap sebagai tema utama.
-   Aksen oranye yang terinspirasi dari bola basket.
-   Kontras tinggi agar papan skor mudah dibaca.
-   Area sentuh berukuran besar.
-   Navigasi dengan tingkat kedalaman minimal.
-   Indikator status yang jelas.
-   Hindari dialog yang tidak perlu saat pertandingan berlangsung.

Palet warna yang disarankan:

  Elemen             Nama Warna           Kode
  ------------------ -------------------- -----------
  Latar belakang     Hitam Lapangan       `#101820`
  Permukaan          Abu-abu Biru Gelap   `#202C38`
  Utama              Oranye Lapangan      `#F47B35`
  Permukaan terang   Putih Gading         `#F4F5F7`
  Teks               Putih                `#FFFFFF`
  Teks sekunder      Abu-abu              `#B7C0C8`

### 5.2 Navigasi Utama

Navigasi seluler yang disarankan:

-   Beranda.
-   Pemain.
-   Tim.
-   Pertandingan.
-   Riwayat.

Klasemen dapat diakses melalui bagian Pertandingan/Turnamen atau
ringkasan sesi.

### 5.3 Layar Utama

**Dasbor** - Membuat sesi baru. - Melanjutkan sesi aktif. - Melihat sesi
terbaru. - Ringkasan pemain, tim, dan pertandingan.

**Pemain** - Menambah, mengubah, dan menghapus pemain. - Menampilkan
jumlah pemain. - Menghapus seluruh daftar dengan konfirmasi.

**Tim** - Membuat tim secara acak. - Mengacak ulang. - Mengubah nama
tim. - Memindahkan pemain. - Melihat pemain cadangan.

**Jadwal** - Daftar pertandingan Round Robin. - Status pertandingan. -
Pertandingan berikutnya. - Akses menuju klasemen.

**Pertandingan Berlangsung** - Nama tim dan skor berukuran besar. -
Penghitung waktu berukuran besar. - Tombol penambahan skor. - Jeda dan
lanjutkan waktu. - Urungkan perubahan skor. - Akhiri pertandingan.

**Riwayat** - Daftar pertandingan selesai. - Skor akhir. - Pemenang. -
Detail pertandingan.

### 5.4 Interaksi Seluler

-   Ukuran minimum area sentuh sekitar 44 × 44 piksel CSS.
-   Kontrol skor sebisa mungkin mudah dijangkau dengan satu tangan.
-   Teks papan skor harus besar dan mudah dibaca di luar ruangan.
-   Tindakan yang menghapus atau mengubah data penting harus meminta
    konfirmasi.
-   Cegah pengiriman tindakan ganda yang tidak disengaja.
-   Berikan umpan balik yang jelas setelah skor berubah atau
    pertandingan selesai.

------------------------------------------------------------------------

## 6. Teknologi yang Digunakan

Proyek sengaja menggunakan teknologi frontend yang sederhana.

  -----------------------------------------------------------------------
  Lapisan                 Teknologi               Kegunaan
  ----------------------- ----------------------- -----------------------
  Struktur                HTML5                   Struktur halaman

  Tampilan                CSS3                    Gaya khusus

  CSS utilitas            Tailwind CSS v4         Penataan antarmuka
                                                  berbasis kelas utilitas

  Pemrograman             JavaScript murni dengan Logika aplikasi
                          ES Modules              

  Ikon                    Lucide                  Ikon antarmuka

  Penyimpanan             `localStorage`          Penyimpanan lokal MVP

  PWA                     Web App Manifest +      Instalasi dan cache
                          Service Worker          aset luring

  Pengembangan            Node.js + npm           Perangkat bantu
                                                  pengembangan dan proses
                                                  build Tailwind

  Hosting                 Vercel atau Netlify     Hosting statis
  -----------------------------------------------------------------------

Teknologi yang secara eksplisit tidak digunakan pada MVP:

-   React.
-   Next.js.
-   TypeScript.
-   Zustand.
-   Prisma.
-   PostgreSQL.
-   API backend.
-   Layanan autentikasi.

Tailwind CSS harus dibangun menggunakan CLI untuk produksi. Jangan
mengandalkan CDN Tailwind untuk aplikasi produksi.

------------------------------------------------------------------------

## 7. Arsitektur Sistem

### 7.1 Gaya Arsitektur

Aplikasi sisi klien statis dengan JavaScript modular dan penyimpanan
lokal.

Pada MVP tidak ada server backend maupun basis data jarak jauh.

### 7.2 Lapisan Logis

1.  **Lapisan Presentasi**
    -   Halaman HTML dan potongan antarmuka yang dapat digunakan ulang.
    -   Tailwind CSS dan CSS khusus.
    -   Penanganan peristiwa DOM.
2.  **Lapisan Aplikasi / Logika Bisnis**
    -   Pengelola sesi.
    -   Pengelola pemain.
    -   Pembuat tim.
    -   Penjadwal Round Robin.
    -   Mesin pertandingan dan skor.
    -   Mesin penghitung waktu.
    -   Penghitung klasemen.
3.  **Lapisan Penyimpanan**
    -   Adaptor penyimpanan terpusat.
    -   Serialisasi dan penguraian JSON.
    -   Validasi data dan versi skema.
4.  **Lapisan PWA**
    -   Web App Manifest.
    -   Service Worker.
    -   Cache aset statis.

### 7.3 Prinsip Arsitektur

-   Pisahkan logika bisnis dari kode DOM.
-   Gunakan ES Modules (`import` dan `export`).
-   Hindari satu berkas JavaScript yang terlalu besar.
-   Tempatkan akses penyimpanan di balik satu adaptor.
-   Gunakan ID stabil, bukan nama pemain, sebagai referensi data.
-   Jadikan hasil pertandingan sebagai sumber utama perhitungan
    klasemen.
-   Gunakan cap waktu sebagai sumber utama perhitungan penghitung waktu.
-   Validasi JSON hasil impor sebelum mengganti data tersimpan.
-   Jangan menimpa sesi atau pertandingan yang telah selesai secara
    diam-diam.

------------------------------------------------------------------------

## 8. Struktur Folder yang Disarankan

``` text
courtside/
├── index.html
├── manifest.json
├── sw.js
├── package.json
├── README.md
│
├── pages/
│   ├── players.html
│   ├── teams.html
│   ├── schedule.html
│   ├── match.html
│   ├── standings.html
│   └── history.html
│
├── assets/
│   ├── icons/
│   └── images/
│
├── css/
│   ├── input.css
│   └── output.css
│
├── js/
│   ├── app.js
│   ├── modules/
│   │   ├── session-manager.js
│   │   ├── player-manager.js
│   │   ├── team-generator.js
│   │   ├── round-robin.js
│   │   ├── scoreboard.js
│   │   ├── timer.js
│   │   └── standings.js
│   ├── storage/
│   │   └── database.js
│   └── utils/
│       ├── helpers.js
│       └── constants.js
│
└── tests/
    ├── unit/
    └── integration/
```

Struktur ini merupakan titik awal yang disarankan, bukan kewajiban untuk
membuat seluruh berkas sebelum pengembangan dimulai. Pertahankan
aplikasi sebagai aplikasi statis multi-halaman kecuali muncul kebutuhan
nyata untuk pendekatan navigasi lain.

------------------------------------------------------------------------

## 9. Model Data

Gunakan ID string yang stabil (UUID) dan cap waktu.

### 9.1 Sesi

``` js
{
  id: "uuid",
  name: "Basket Minggu",
  status: "draft", // draft | active | completed
  createdAt: 0,
  updatedAt: 0
}
```

### 9.2 Pemain

``` js
{
  id: "uuid",
  sessionId: "session-uuid",
  name: "Nama Pemain"
}
```

### 9.3 Tim

``` js
{
  id: "uuid",
  sessionId: "session-uuid",
  name: "Tim A",
  playerIds: ["player-1", "player-2", "player-3"]
}
```

### 9.4 Pertandingan

``` js
{
  id: "uuid",
  sessionId: "session-uuid",
  round: 1,
  homeTeamId: "team-a",
  awayTeamId: "team-b",
  homeScore: 0,
  awayScore: 0,
  status: "scheduled", // scheduled | in_progress | completed
  durationSeconds: 600,
  elapsedSeconds: 0,
  startedAt: null,
  finishedAt: null,
  winnerTeamId: null
}
```

### 9.5 Catatan Perubahan Skor

``` js
{
  id: "uuid",
  matchId: "match-uuid",
  teamId: "team-a",
  points: 2,
  timestamp: 0
}
```

### 9.6 Pengaturan Aplikasi

``` js
{
  schemaVersion: 1,
  activeSessionId: "session-uuid",
  scoringPreset: "casual",
  targetScore: 21,
  durationSeconds: 600
}
```

Format penyimpanan sebenarnya dapat mengelompokkan data berdasarkan sesi
ke dalam satu objek berversi untuk kebutuhan MVP `localStorage`. Namun,
entitas logis tetap harus dipisahkan dalam kode.

------------------------------------------------------------------------

## 10. Algoritma Utama

### 10.1 Pengacakan Fisher-Yates

Gunakan Fisher-Yates untuk mengacak urutan pemain dan urutan
pertandingan.

``` js
export function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
```

Kebutuhan:

-   Menghasilkan larik baru.
-   Tidak mengubah data masukan.
-   Mempertahankan setiap item masukan tepat satu kali.
-   Memungkinkan fungsi penghasil angka acak disisipkan saat pengujian
    agar hasil dapat ditentukan.

### 10.2 Pembentukan Tim

Untuk ukuran tim tiga orang:

-   Acak ID pemain yang memenuhi syarat.
-   Bagi daftar hasil pengacakan menjadi kelompok berisi tiga pemain.
-   Kembalikan sisa pemain yang belum membentuk tim lengkap sebagai
    pemain cadangan.
-   Pastikan setiap pemain masuk tepat ke satu tim atau daftar cadangan.

### 10.3 Round Robin

Gunakan Metode Lingkaran (Circle Method) untuk membuat jadwal
pertandingan.

Untuk jumlah tim genap: - Tetapkan satu tim sebagai tim tetap. - Putar
posisi tim lainnya pada setiap putaran. - Pasangkan posisi yang saling
berhadapan. - Setiap putaran memiliki `n / 2` pertandingan.

Untuk jumlah tim ganjil: - Tambahkan satu slot BYE. - Buat putaran
seolah-olah jumlah tim genap. - Tim yang dipasangkan dengan BYE tidak
bertanding pada putaran tersebut.

Jumlah seluruh pertandingan harus sama dengan:

`n * (n - 1) / 2`

Setelah pasangan pertandingan valid terbentuk, urutan pertandingan boleh
diacak. Pertahankan informasi putaran jika antarmuka perlu
menampilkannya.

### 10.4 Klasemen

Untuk setiap pertandingan yang selesai:

-   Tambahkan jumlah pertandingan dimainkan bagi kedua tim.
-   Tambahkan satu kemenangan dan tiga poin klasemen kepada pemenang.
-   Tambahkan satu kekalahan kepada tim yang kalah.
-   Tambahkan skor masing-masing tim ke total poin memasukkan.
-   Tambahkan skor lawan ke total poin kemasukan.
-   Hitung selisih poin dari poin memasukkan dikurangi poin kemasukan.

Jangan masukkan pertandingan yang masih terjadwal atau sedang
berlangsung.

------------------------------------------------------------------------

## 11. Rancangan Penghitung Waktu dan Papan Skor

### 11.1 Model Penghitung Waktu

``` js
{
  status: "idle", // idle | running | paused
  durationSeconds: 600,
  elapsedSeconds: 0,
  startedAt: null
}
```

Ketika penghitung waktu berjalan:

`elapsed = accumulatedElapsed + (currentTimestamp - startedAt)`

Gunakan `Date.now()` atau sumber cap waktu yang setara untuk menghitung
waktu yang telah berlalu. Interval hanya boleh memperbarui tampilan,
bukan menjadi sumber utama perhitungan waktu.

### 11.2 Kontrol Papan Skor

-   Tampilan skor Tim A dan Tim B.
-   Tombol penambahan skor yang dapat dikonfigurasi.
-   Urungkan perubahan skor terakhir.
-   Mulai, jeda, lanjutkan, dan atur ulang penghitung waktu.
-   Akhiri pertandingan.
-   Penanganan perpanjangan waktu.
-   Konfirmasi untuk tindakan yang berpotensi menghapus atau mengubah
    data penting.

### 11.3 Preset Aturan Skor

**3x3 Standar** - Lemparan bebas: +1. - Tembakan dari dalam garis busur:
+1. - Tembakan dari luar garis busur: +2. - Target skor: 21. - Waktu
reguler: 10 menit.

**Kasual** - Skor +1, +2, dan +3. - Target skor dapat diatur. - Durasi
dapat diatur. - Aturan target skor atau penghitung waktu dapat
dinonaktifkan.

Produk harus menampilkan aturan yang sedang dipilih dengan jelas. Jangan
menyebut preset kasual sebagai aturan resmi 3x3.

------------------------------------------------------------------------

## 12. Kebutuhan Nonfungsional

  -----------------------------------------------------------------------
  ID                      Kebutuhan               Target
  ----------------------- ----------------------- -----------------------
  NFR-01                  Tata letak responsif    Mendukung lebar layar
                                                  seluler mulai 360
                                                  piksel CSS

  NFR-02                  Kinerja interaksi       Tindakan umum terasa
                                                  langsung

  NFR-03                  Penyimpanan             Data bertahan setelah
                                                  penyegaran dan navigasi

  NFR-04                  Luring                  Kerangka aplikasi yang
                                                  tersimpan dapat
                                                  digunakan tanpa
                                                  internet

  NFR-05                  Keandalan               Skor dan status
                                                  penghitung waktu segera
                                                  disimpan

  NFR-06                  Aksesibilitas           Kontras mudah dibaca
                                                  dan kontrol dapat
                                                  digunakan dengan papan
                                                  ketik

  NFR-07                  Privasi                 Tidak ada data pemain
                                                  yang dikirim ke server
                                                  pada MVP

  NFR-08                  Kemudahan pemeliharaan  ES Modules modular dan
                                                  logika bisnis terpisah

  NFR-09                  Pemulihan               Ekspor/impor JSON untuk
                                                  cadangan pengguna
  -----------------------------------------------------------------------

Penyimpanan peramban bukan cadangan permanen yang dijamin. Pengguna
dapat kehilangan data lokal ketika menghapus penyimpanan peramban,
berganti perangkat, atau menggunakan mode privat. Jelaskan batasan ini
dan sediakan fitur ekspor/impor.

------------------------------------------------------------------------

## 13. Kriteria Penerimaan

### Pengelolaan Pemain

-   [ ] Pengguna dapat membuat sesi.
-   [ ] Pengguna dapat menambahkan minimal enam pemain.
-   [ ] Nama kosong ditolak.
-   [ ] Nama duplikat dalam satu sesi ditolak.
-   [ ] Pengguna dapat mengubah dan menghapus pemain.
-   [ ] Jumlah pemain diperbarui dengan benar.

### Pembentukan Tim

-   [ ] Dua belas pemain menghasilkan empat tim yang masing-masing
    berisi tiga orang.
-   [ ] Sepuluh pemain menghasilkan tiga tim berisi tiga orang dan satu
    pemain cadangan.
-   [ ] Tidak ada pemain yang muncul di lebih dari satu tim.
-   [ ] Pengacakan tidak mengubah daftar pemain asli.
-   [ ] Pengguna dapat memindahkan pemain antartim secara manual.

### Round Robin

-   [ ] Empat tim menghasilkan tepat enam pertandingan.
-   [ ] Tiga tim menghasilkan tepat tiga pertandingan.
-   [ ] Lima tim menghasilkan tepat sepuluh pertandingan.
-   [ ] Setiap pasangan unik muncul tepat satu kali.
-   [ ] Tidak ada tim yang bertanding melawan dirinya sendiri.
-   [ ] Jumlah tim ganjil menghasilkan putaran BYE yang benar.
-   [ ] Pengacakan jadwal tidak membuat pasangan duplikat atau
    menghilangkan pasangan yang seharusnya ada.

### Papan Skor dan Penghitung Waktu

-   [ ] Pengguna dapat menambah dan mengurangi skor dengan aman.
-   [ ] Skor tidak dapat menjadi negatif.
-   [ ] Fitur urungkan mengembalikan skor sebelumnya.
-   [ ] Penghitung waktu dapat dimulai, dijeda, dilanjutkan, dan diatur
    ulang.
-   [ ] Penghitung waktu tetap akurat setelah peramban berada di latar
    belakang.
-   [ ] Status penghitung waktu dan skor bertahan setelah halaman dimuat
    ulang.
-   [ ] Pertandingan yang selesai tersimpan di riwayat.

### Klasemen dan Penyimpanan

-   [ ] Hanya pertandingan selesai yang memengaruhi klasemen.
-   [ ] Klasemen diperbarui setelah pertandingan selesai.
-   [ ] Perbaikan hasil menghitung ulang klasemen.
-   [ ] Sesi tetap tersimpan setelah halaman dimuat ulang.
-   [ ] Cadangan JSON dapat diekspor dan diimpor.
-   [ ] Data cadangan yang tidak valid ditolak tanpa merusak data yang
    sudah tersimpan.

------------------------------------------------------------------------

## 14. Strategi Pengujian

Gunakan perangkat pengujian yang ringan:

-   Vitest untuk pengujian unit JavaScript murni.
-   Playwright untuk pengujian menyeluruh pada peramban.
-   Pengujian manual menggunakan ponsel sungguhan.

Kasus pengujian prioritas:

1.  Pengacakan mempertahankan seluruh ID tanpa duplikasi.
2.  Pembuat tim menangani jumlah pemain yang habis dibagi tiga maupun
    yang memiliki sisa.
3.  Round Robin menghasilkan jumlah pasangan pertandingan unik yang
    benar.
4.  Jumlah tim ganjil menghasilkan putaran BYE yang valid.
5.  Catatan skor dan fitur urungkan menghasilkan total yang benar.
6.  Penghitung waktu tetap akurat ketika dijeda, dilanjutkan, dan
    peramban berada di latar belakang.
7.  Klasemen benar setelah pertandingan selesai dan setelah hasil
    diperbaiki.
8.  Penyimpanan lokal menangani data yang hilang, rusak, dan berasal
    dari versi skema lama.
9.  Navigasi utama dan kontrol pertandingan berfungsi pada ukuran layar
    seluler.

------------------------------------------------------------------------

## 15. Tahapan Pengembangan

### Tahap 1 --- Fondasi dan Pengelolaan Pemain

-   Inisialisasi proyek statis.
-   Konfigurasi Tailwind CSS CLI.
-   Menentukan token desain dan tata letak seluler.
-   Membuat dasbor dan pengelolaan sesi.
-   Mengimplementasikan pengelolaan pemain.
-   Mengimplementasikan adaptor penyimpanan lokal.

**Hasil:** Pengguna dapat membuat sesi dan mengelola pemainnya.

### Tahap 2 --- Tim dan Jadwal

-   Mengimplementasikan pengacakan Fisher-Yates.
-   Mengimplementasikan pembentukan tim dan penanganan pemain cadangan.
-   Mengimplementasikan penyesuaian tim secara manual.
-   Mengimplementasikan Round Robin dengan Metode Lingkaran.
-   Menambahkan pengacakan urutan pertandingan.
-   Menambahkan pengujian unit untuk algoritma.

**Hasil:** Pengguna dapat membuat tim dan jadwal pertandingan yang
valid.

### Tahap 3 --- Pertandingan Langsung

-   Membuat antarmuka papan skor.
-   Mengimplementasikan catatan skor dan fitur urungkan.
-   Mengimplementasikan penghitung waktu berbasis cap waktu.
-   Mengimplementasikan proses mulai dan selesai pertandingan.
-   Menyimpan status pertandingan.

**Hasil:** Pengguna dapat menjalankan dan mencatat pertandingan.

### Tahap 4 --- Klasemen, Riwayat, dan PWA

-   Mengimplementasikan penghitung klasemen.
-   Mengimplementasikan riwayat pertandingan.
-   Menambahkan ekspor/impor JSON.
-   Menambahkan manifest dan service worker.
-   Menguji perilaku luring.
-   Melakukan pengujian kegunaan seluler dan regresi.

**Hasil:** MVP siap digunakan untuk sesi basket kasual secara rutin.

Perkiraan waktu implementasi: sekitar 2--3 minggu untuk satu pengembang,
bergantung pada penyempurnaan desain dan pengujian.

------------------------------------------------------------------------

## 16. Risiko dan Mitigasi

  -----------------------------------------------------------------------
  Risiko                  Dampak                  Mitigasi
  ----------------------- ----------------------- -----------------------
  Penyimpanan peramban    Data sesi hilang        Ekspor/impor JSON dan
  dihapus                                         peringatan yang jelas

  Penghitung waktu        Tampilan waktu tidak    Penghitungan berbasis
  tertunda di latar       akurat                  cap waktu
  belakang                                        

  Skor tidak sengaja      Hasil pertandingan      Fitur urungkan dan
  berubah                 keliru                  riwayat perubahan skor

  Jadwal dibuat ulang     Hasil yang sudah ada    Kunci jadwal setelah
                          menjadi tidak valid     pertandingan dimulai

  Nama pemain duplikat    Daftar tim              Validasi duplikasi
                          membingungkan           tanpa membedakan huruf
                                                  besar/kecil

  Cache luring tidak      Aplikasi gagal          Simpan kerangka
  lengkap                 digunakan tanpa         aplikasi ke cache dan
                          internet                uji kondisi luring

  Berganti perangkat      Data tidak tersedia     Cadangan dan pemulihan
                                                  JSON secara manual
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 17. Ukuran Keberhasilan Produk

Keberhasilan MVP dapat diukur melalui pengujian kegunaan berikut:

-   Penyelenggara dapat membuat sesi dan memasukkan pemain tanpa
    bantuan.
-   Pembentukan tim berjalan benar untuk jumlah pemain yang umum.
-   Pembuatan jadwal menghasilkan seluruh pasangan yang valid dan tidak
    menghasilkan pasangan tambahan.
-   Penyelenggara dapat mengoperasikan papan skor selama pertandingan
    berlangsung.
-   Skor dan status penghitung waktu tetap tersimpan setelah halaman
    dimuat ulang.
-   Klasemen sesuai dengan hasil pertandingan yang selesai.
-   Aplikasi inti dapat digunakan pada ponsel sasaran tanpa backend.

------------------------------------------------------------------------

## 18. Keputusan Produk

  -----------------------------------------------------------------------
  Area                                Keputusan
  ----------------------------------- -----------------------------------
  Produk                              COURTSIDE

  Platform utama                      Aplikasi web berorientasi seluler

  Format tim                          3 pemain per tim

  Pembagian tim                       Acak

  Format turnamen                     Round Robin

  Aturan skor                         Preset 3x3 Standar dan Kasual

  Penghitung waktu                    Durasi dapat diatur, berbasis cap
                                      waktu

  Model pengguna                      Satu penyelenggara / satu perangkat

  Penyimpanan                         localStorage untuk MVP

  Backend                             Tidak ada

  Server basis data                   Tidak ada

  Frontend                            HTML5, CSS3, Tailwind CSS v4,
                                      JavaScript murni

  Ikon                                Lucide

  Hosting                             Vercel atau Netlify

  Pengembangan berikutnya             Migrasi opsional ke IndexedDB dan
                                      sinkronisasi cloud
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 19. Definisi Selesai

MVP dianggap selesai ketika:

1.  Seluruh kebutuhan fungsional berprioritas Wajib telah
    diimplementasikan.
2.  Seluruh kriteria penerimaan yang kritis berhasil dilewati.
3.  Algoritma pembentukan tim dan Round Robin memiliki pengujian
    otomatis.
4.  Penghitung waktu dan papan skor bekerja dengan andal pada ponsel
    sungguhan.
5.  Data tetap tersimpan setelah halaman dimuat ulang dan dapat
    dicadangkan.
6.  Aset inti aplikasi dapat digunakan secara luring setelah tersimpan
    di cache.
7.  Aplikasi tidak memerlukan backend atau akun pengguna.
8.  README menjelaskan persiapan, pengembangan, proses build, dan
    penerapan aplikasi.

**Prinsip produk:** Jaga COURTSIDE tetap sederhana. Utamakan pembentukan
tim yang andal, jadwal pertandingan yang valid, dan pencatatan skor yang
mudah digunakan. Hindari kompleksitas kerangka kerja atau infrastruktur
yang tidak diperlukan.
