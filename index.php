<?php
// Misal file ini dipake buat handle semua request
$request = trim($_SERVER['REQUEST_URI'], '/');
if ($request === '' || $request === 'index.php') {
  die('Gunakan shorten.php?url=...');
}

$dataFile = 'shortlinks.json';
$data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];

if (isset($data[$request])) {
  header("Location: " . $data[$request]);
  exit;
} else {
  http_response_code(404);
  echo "Shortlink tidak ditemukan.";
}
?>