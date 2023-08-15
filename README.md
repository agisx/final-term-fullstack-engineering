# Final Term - Fullstack Engineering
Proyek ini adalah sebuah aplikasi web yang menampilkan video live yang berkaitan dengan produk-produk tertentu. Aplikasi ini bertujuan untuk mempromosikan produk-produk tersebut kepada pengguna yang tertarik dengan video live tersebut. Aplikasi ini juga memberikan fitur untuk berkomentar dan melihat komentar dari pengguna lainnya yang menonton video live tersebut. Aplikasi ini dibuat dengan menggunakan prinsip Separation of Concerns, yaitu memisahkan antara logika bisnis, tampilan, dan data.

Aplikasi ini memiliki dua halaman utama, yaitu:

- Halaman home yang menampilkan daftar video live yang sedang berlangsung atau sudah direkam. Pengguna dapat memilih video live yang ingin ditonton dengan mengklik gambar thumbnailnya.
- Halaman watch yang menampilkan video live yang dipilih, beserta produk-produk yang terkait dengan video tersebut. Pengguna dapat melihat detail produk dengan mengklik tautan produknya. Pengguna juga dapat menulis dan melihat komentar dari pengguna lain di bawah video live tersebut.

Aplikasi ini ditujukan untuk pengguna yang ingin melihat video live tentang produk-produk tertentu, baik untuk tujuan hiburan, informasi, atau pembelian. Aplikasi ini juga dapat membantu produsen atau penjual produk untuk meningkatkan penjualan dan popularitas produk mereka melalui video live. Aplikasi ini menggunakan Node.js Express sebagai server, MongoDB sebagai database, dan REST API sebagai struktur API. Aplikasi ini juga menggunakan dotenv, mongoose, dan depedensi lainnya yang terdaftar di file package.json.

# Database dan API
Proyek ini menggunakan MongoDB sebagai database dan REST API sebagai struktur API. MongoDB adalah sebuah database NoSQL yang menyimpan data dalam bentuk dokumen JSON. REST API adalah sebuah gaya arsitektur perangkat lunak yang menggunakan protokol HTTP untuk berinteraksi dengan sumber daya. Sumber daya adalah segala sesuatu yang dapat disediakan oleh server kepada klien, misalnya teks, gambar, video, atau fungsi.

## Database Structure
Database MongoDB yang digunakan oleh proyek ini memiliki lima koleksi utama, yaitu:

- Koleksi videos, yang berisi data tentang video live yang sedang berlangsung atau sudah direkam. Setiap dokumen di koleksi ini memiliki beberapa atribut, yaitu
    - url_image_thumbnail
    - url_video
    - status
    - title
- Koleksi products, yang berisi data tentang produk-produk yang terkait dengan video live tertentu. Setiap dokumen di koleksi ini memiliki beberapa atribut,
    - yaitu url_product
    - url_image_product
    - title
    - price
- Koleksi users, yang berisi data tentang pengguna yang menonton atau berkomentar di video live tertentu. Setiap dokumen di koleksi ini memiliki dua atribut, yaitu
    - username
    - url_image_photo_profile
- Koleksi live_offers, yang berisi data tentang hubungan antara video live dan produk-produk yang terkait. Setiap dokumen di koleksi ini memiliki dua atribut, yaitu
    - video_id
    - product_id
- Koleksi comments, yang berisi data tentang komentar-komentar dari pengguna yang menonton video live tertentu. Setiap dokumen di koleksi ini memiliki empat atribut, yaitu
    - video_id
    - username
    - comment
    - timestamp 

## API Structure
Struktur API yang digunakan oleh proyek ini adalah REST API, yang menggunakan protokol HTTP untuk berkomunikasi antara klien dan server. Protokol HTTP menyediakan metode permintaan standar seperti GET, POST, PUT, DELETE, dan lainnya untuk mengakses dan memanipulasi sumber daya di server.

Proyek ini memiliki enam endpoint utama untuk mengakses dan memanipulasi sumber daya di database MongoDB, yaitu:

1. Endpoint /videos, yang digunakan untuk mendapatkan daftar video live yang sedang berlangsung atau sudah direkam.
2. Enpoint /videos/search/o/(video_id), digunakan untuk mendapatkan sebuah video berdasarkan video_id.
3. Endpoint /videos/search/m/(video_id), digunakan untuk mendapatkan daftar video berdasarkan video_id.
4. Endpoint /watch/(video_id), yang digunakan untuk mendapatkan detail video live dan produk-produk yang terkait dengan video tersebut.
5. Endpoint /watch/comments/(video_id), yang digunakan untuk mendapatkan daftar komentar dari pengguna lain yang menonton video live tersebut.
6. Endpoint /watch/comments/submit, yang digunakan untuk menulis komentar sendiri pada video live tertentu.

Berikut adalah daftar permintaan dan respons API untuk setiap endpoint, menggunakan format gist dari https://gist.github.com/BeattieM/324063512d166122ba5c

### Video Thumbnail List
**GET**
```
http://localhost:3000/videos
```

Permintaan ini tidak memiliki parameter, body, atau sejenisnya. Hanya respons sebagai berikut:
```
{
    "videos": [
        {
            "_id": "60ff9f9f8c7b4d3b8c6c1e0f",
            "url_image_thumbnail": "https://example.com/video1.jpg",
            "url_video": "https://www.youtube.com/watch?v=id_video"
        }
    ]
}
```

### Search a Video
**GET**
```
http://localhost:3000/search/o/(video_id)
```

Permintaan ini memiliki parameter video_id yang berisi video_id untuk mendapatkan sebuah video. Digunakan untuk load halaman live offers. Respons API-nya sebagai berikut:
```
{
    "video": {        
            "_id": "60ff9f9f8c7b4d3b8c6c1e0f",
            "url_image_thumbnail": "http://img.youtube.com/vi.jpg",
            "created_at": "2023-07-23T11:49:29.110Z",
            "updated_at": "2023-07-23T11:49:29.110Z",
            "status": "live",
            "title": "Title video",
            "url_video": "https://www.youtube.com/watch?v=id_video"
    }
}
```
### Search Video List
**GET**
```
http://localhost:3000/search/m/(video_id)
```

Permintaan ini memiliki parameter video_id yang berisi video_id untuk mendapatkan daftar video. Digunakan untuk searching video. Respons API-nya sebagai berikut:
```
{
    "videos": [
        {
            "_id": "64bd13d08c7b4d3b8c6c1e0d",
            "title": "Title video"
        }
    ]
}
```

### Product List
**GET**
```
http://localhost:3000/watch/(video_id)
```

Permintaan ini memiliki parameter video_id yang berisi id dari video live yang ingin ditonton. Respons sebagai berikut:
```
{
    "products": [
        {
            "_id": "60ff9fa58c7b4d3b8c6c1e10",
            "url_product": "https://example.com/product1",
            "title": "Sate Ayam",
            "price": 15000
        }
    ]
}
```
Jika video_id tidak valid, maka respons sebagai berikut:
```
{
    "error": "Video doesn't exist"
}
```
Status code: 404

### Comment List
**GET**
```
http://localhost:3000/watch/comments/(video_id)
```

Permintaan ini memiliki parameter video_id yang berisi id dari video live yang ingin ditonton. Respons sebagai berikut:
```
{
    "comments": [
        {
            "username": "alice",
            "comment": "Wow, sate ayamnya kelihatan enak banget!",
            "timestamp": "2023-07-28T00:08:03.586Z"
        }
    ]
}
```
Jika video_id tidak valid, maka respons sebagai berikut:
```
{
    "error": "Video doesn't exist"
}
```
Status code: 404

### Submit Comment
**POST**
```
http://localhost:3000/watch/comments/submit
```

Permintaan ini menggunakan body sebagai berikut:
```
username: bob
comment: Saya suka sate ayam, tapi sayangnya saya alergi kacang.
video_id: 60ff9f9f8c7b4d3b8c6c1e0f
```
Jika berhasil, respons sebagai berikut:
```
{
    "message": "success"
}
```
Jika gagal, respons sebagai berikut:
```
{
    "message": "fail"
}
```
Jika user tidak ditemukan, respons sebagai berikut:
```
{
    "message": "User not found"
}
```
## How to run
Untuk menjalankan server menggunakan Node.js Express, Anda perlu melakukan langkah-langkah berikut:

1. Pastikan Anda sudah menginstal Node.js dan npm di komputer Anda. Anda dapat memeriksa versi Node.js dan npm yang Anda miliki dengan mengetikkan perintah node -v dan npm -v di terminal atau command prompt. Jika Anda belum menginstal Node.js dan npm, Anda dapat mengunduh dan menginstalnya dari situs web resminya.
2. Pastikan Anda sudah mengunduh atau mengkloning kode dan dokumen proyek ini dari repositori GitHub. Anda dapat menggunakan perintah git clone https://github.com/agisx/final-term-fullstack-engineering.git di terminal atau command prompt untuk mengkloning repositori ini ke komputer Anda.
3. Buka folder proyek yang sudah Anda unduh atau kloning di terminal atau command prompt. Anda dapat menggunakan perintah cd final-term-fullstack-engineering untuk masuk ke folder proyek tersebut.
4. Instal semua depedensi yang dibutuhkan oleh proyek ini dengan menggunakan perintah npm install di terminal atau command prompt. Ini akan menginstal semua depedensi yang terdaftar di file package.json secara otomatis.
5. Ubah nama file .env.dev menjadi .env dengan menggunakan perintah mv .env.dev .env di terminal atau command prompt. Ini akan mengganti nama file konfigurasi yang berisi variabel lingkungan yang dibutuhkan oleh proyek ini.
6. Edit isi file .env sesuai dengan konfigurasi yang Anda inginkan, misalnya alamat dan nama database MongoDB, port server, port MongoDB, atau konfigurasi lainnya yang sudah tersedia. Anda dapat menggunakan perintah cat .env untuk melihat isi file .env dan memastikan bahwa semua variabel sudah sesuai dengan konfigurasi Anda.
7. Jalankan server di mode pengembangan dengan menggunakan perintah node app.js atau nodemon app jika ingin menggunakan nodemon di terminal atau command prompt. Ini akan menjalankan server di alamat http://localhost:3000/ atau alamat lain yang Anda tentukan di file .env.
8. Akses API dengan aplikasi seperti Postman, dengan host http://localhost:3000/ atau host lain yang Anda tentukan di file .env. Anda dapat menggunakan permintaan dan respons API yang sudah disediakan di sub bab sebelumnya untuk menguji fungsi-fungsi API.
