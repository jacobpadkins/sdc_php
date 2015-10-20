<?php
// inclusions
require 'vendor/autoload.php';

// glabal variables
$app = new \Slim\Slim();
$m = new MongoClient();
$db = $m->cms;

// make sure the cms db contains a 'data' collection with
// a document { name: 'data', 'Capabilities': [], 'Products': [] }

/* ENDPOINTS */

// returns image and category data object for the website
$app->get('/cms', function () use ($app, $db) {
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

// returns an array of all image names in the database
$app->get('/cms/img', function() use ($app, $db) {
  $query = $db->images->find(array(), array("filename" => 1));
  $images = array();
  foreach ($query as $doc) {
    array_push($images, $doc['filename']);
  }
  echo json_encode($images);
});

// uploads an image to the uploads folder and updates the database
$app->post('/cms/img', function () use ($app, $db) {
  // move file
  $target_dir = __DIR__ . '/../images/uploads/';
  $target_file = $target_dir . basename($_FILES['file_to_upload']['name']);
  move_uploaded_file($_FILES['file_to_upload']['tmp_name'], $target_file);
  //header("Location: localhost:9000/webapp_new/");
  // update database
  $doc = array('filename' => $_FILES['file_to_upload']['name'], 'Capabilities' => array(),
    'Products' => array(), 'Flags' => array());
  $db->images->insert($doc);
  exit();
});

// all-purpose database tag updating function
$app->put('/cms/img', function() use ($app, $db) {

});

// deletes an image in the uploads folder
$app->delete('/cms/img', function() use ($app, $db) {
  $request = $app->request();
  $inputs = json_decode($request->getBody(), true);
  $target_file = $inputs['filename'];
  $target_dir = __DIR__ . '/../images/uploads/';
  $db->images->remove(array('filename' => $target_file));
  unlink($target_dir . $target_file);
  echo json_encode('success');
});

// returns all of the tags associated with an image
$app->get('/cms/img/tags', function() use ($app, $db) {
  $request = $app->request();
  $inputs = json_decode($request->getBody(), true);
  $file = $inputs['filename'];
  $query = $db->images->findOne(array('filename' => $file), array('Capabilities' => 1,
    'Products' => 1, 'Flags' => 1));
  $tags = array('Capabilities' => $query['Capabilities'], 'Products' => $query['Products'],
    'Flags' => $query['Flags']);
  echo json_encode($tags);
});

// returns array of all capability category names
$app->get('/cms/capa', function() use ($app, $db) {
  $query = $db->data->findOne(array(), array("Capabilities" => 1));
  echo json_encode($query['Capabilities']);
});

// adds a new capability category names
$app->post('/cms/capa', function() use ($app, $db) {
  $request = $app->request();
  $inputs = json_decode($request->getBody(), true);
  $capa = $inputs['capa'];
  $db->data->update(array('name' => 'data'), array('$push' => array('Capabilities' => $capa)));
  echo json_encode('success');
});

// delete a capability category
$app->delete('/cms/capa', function() use ($app, $db) {
  $request = $app->request();
  $inputs = json_decode($request->getBody(), true);
  $capa = $inputs['capa'];
  $db->data->update(array('name' => 'data'), array('$pull' => array('Capabilities' => $capa)));
  echo json_encode('success');
});

// returns array of all product category names
$app->get('/cms/prod', function() use ($app, $db) {
  $query = $db->data->findOne(array(), array("Products" => 1));
  echo json_encode($query['Products']);
});

// adds a new product category name
$app->post('/cms/prod', function() use ($app, $db) {

});

// delete a product category
$app->delete('/cms/capa', function() use ($app, $db) {

});

// sends out an email
$app->post('/cms/email', function() use ($app, $db) {

});

$app->run()
?>
