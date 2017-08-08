<?php
header('Access-Control-Allow-Origin: *');  
header('Content-Type: application/json');

require_once('./db.php');

global $conn;

$sql = "SELECT count, percentage, locked_in FROM data";
$result = $conn->query($sql);

$array = array(
  'data' => array(
    'count' => NULL,
    'percentage' => NULL,
    'locked_in' => NULL
  ),
  'result' => NULL
);

if ($result->num_rows > 0) {
  http_response_code(200);

  // output data of each row
  while($row = $result->fetch_object()) {
    $array['data']['count'] = (int) $row->count;
    $array['data']['percentage'] = (double) $row->percentage;
    $array['data']['locked_in'] = (int) $row->locked_in;
    $array['result'] = 'ok';
  }
} else {
  http_response_code(400);

  $array['result'] = 'nok';
}
$conn->close();

echo json_encode($array);

exit;
?>
