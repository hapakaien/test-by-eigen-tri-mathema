# Test by Eigen Tri Mathema

Repositori ini adalah jawaban saya untuk
[test](https://github.com/eigen3dev/backend-test-case) dari Eigen Tri Mathema.

Sebelum anda menguji jawaban ini, ada baiknya melihat persyaratan berikut ini.

## Persyaratan

- Node.js v18 atau lebih tinggi
- pnpm v7 atau lebih tinggi
- Docker Compose (atau Podman Compose)

## Menguji jawaban ini

Untuk menguji jawaban saya, anda dapat mengikuti langkah dibawah ini.

1. Klon repositori ini.

   ```bash
   git clone https://github.com/hapakaien/test-by-eigen-tri-mathema.git test && cd test
   ```

2. Install semua dependensi yang ada di monorepo ini.

    ```bash
    pnpm install
    ```

> Selanjutnya, anda dapat mengikuti cara dibawah untuk masing-masing tes.

### Back-end

1. Pindah ke folder `back-end`.

    ```bash
    cd back-end
    ```

2. Jalankan Docker Compose.

   ```bash
   docker-compose up -d
   ```

3. Jalankan migrasi database.

    ```bash
    pnpm migrate:latest
    ```

4. Tambahkan data awal ke database.

    ```bash
    pnpm seed:run
    ```

5. Bangun kode back-end.

    ```bash
    pnpm build
    ```

6. Jalankan aplikasi.

   ```bash
   pnpm start:prod
   ```

   > Setelah aplikasi berjalan, anda dapat membuka <http://localhost:3000/doc>
   > di browser untuk menguji semua endpoint menggunakan Swagger UI

7. Menjalankan unit test.

   ```bash
   pnpm test
   ```

### Algoritma

1. Pindah ke folder `algoritm`. Jika sebelumnya dari folder `back-end`, anda
   dapat menggunakan perintah ini.

   ```bash
   cd ../algoritm
   ```

2. Jalankan unit test.

   ```bash
   pnpm test
   ```
