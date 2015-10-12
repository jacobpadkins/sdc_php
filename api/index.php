<?php
// inclusions
require 'vendor/autoload.php';

// glabal variables
$app = new \Slim\Slim();
$m = new MongoClient();
$db = $m->cms;

/* ENDPOINTS */
$app->get('/cms/img/all', function () use ($app, $db) {
  $data = $db->data;
  $data = iterator_to_array($data->find());
  $dat_array = array();
  foreach ($data as $doc) {
    array_push($dat_array, $doc);
  }
  $images = $db->images;
  $images = iterator_to_array($images->find());
  $img_array = array();
  foreach ($images as $doc) {
    array_push($img_array, $doc);
  }
  $response = array('imgs' => $img_array, 'capas' => $dat_array[0]['Capabilities'], 'prods' => $dat_array[0]['Products']);
  echo json_encode($response);
});

$app->post('/cms/img', function () use ($app, $db) {
  $target_dir = __DIR__ . '/../';
  $target_file = $target_dir . basename($_FILES['file_to_upload']['name']);
  move_uploaded_file($_FILES['file_to_upload']['tmp_name'], $target_file);
  echo '<h1>' . $_FILES['file_to_upload']['tmp_name'] . '</h1>';
});

$app->run()
?>
