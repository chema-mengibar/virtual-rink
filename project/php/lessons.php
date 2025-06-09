<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

// $out = exec("python ./lessons.py");
// header('HTTP/1.1 201 OK');
// print_r($out);




// $string = file_get_contents("./data/tiempo.json");
// $json = json_decode($string, true);

$cardNames = array();

$dirName = 'data'; 
$cardFilesNames = array_diff(scandir($dirName), array('.', '..')); 

foreach ($cardFilesNames as $cardFilesName) {


  if (str_contains($cardFilesName, 'json')) {
    $string = file_get_contents("./data/".$cardFilesName);
    $json = json_decode($string, true);
    array_push($cardNames, $json);
  }


}


header('HTTP/1.1 201 OK');
print_r(json_encode( $cardNames, JSON_UNESCAPED_UNICODE ));

?>