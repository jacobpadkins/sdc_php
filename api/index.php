<?php
// inclusions
require 'vendor/autoload.php';
// glabal variables
$app = new \Slim\Slim();
$m = new MongoClient();
$db = $m->cms;
/* ENDPOINTS */
$app->get('/cms/all', function () use ($app, $db) {
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
$app->run()
?>
