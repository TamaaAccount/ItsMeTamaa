<?php
// File penyimpanan
$dataFile = 'shortlinks.json';

// Ambil URL
$url = $_GET['url'] ?? $_POST['url'] ?? null;
if (!$url) {
  die('URL kosong');
}

// Buat ID unik
$id = substr(md5($url . time()), 0, 6);

// Simpan ke file
$data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
$data[$id] = $url;
file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));

// Output hasil
echo "Shortlink: http://" . $_SERVER['HTTP_HOST'] . "/$id";
?>