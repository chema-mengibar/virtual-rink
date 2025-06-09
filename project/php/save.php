<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');


 $id = $_POST['id'];
 $code = $_POST['code'];
 $exec = json_decode($_POST['data'], false, 512, JSON_UNESCAPED_UNICODE);

// $arr = array(
//   'id' => $id,
//   'data' => $exec,
// );


if( $code !== '1995'){

  
  $response = array(
    'error'=> true,
    'data'=> NULL,
    'id'=> NULL,
    'request' => NULL
  );
  header('HTTP/1.1 401 ERROR');
  print_r(json_encode( $response ));
  exit();
}

$response = array(
  'error'=> NULL,
  'data'=> $arr,
  'id'=> $id,
  'request' => NULL
);

$file = "./data/".$id.".json";
file_put_contents($file, json_encode( $exec, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ));

header('HTTP/1.1 201 OK');
print_r(json_encode( $response ));















?>
