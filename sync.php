<?php

require_once('./db.php');

global $conn;

$data = file_get_contents('http://api.qbit.ninja/versionstats');

$obj = json_decode($data);
$count = NULL;
$percentage = NULL;
$sql_locked_in = '';
$activation_period_start = 479708;

if ($obj->sincePeriodStart) {
  foreach ($obj->sincePeriodStart->stats as $item) {

    if (array_key_exists('proposal', $item) && $item->proposal == 'SEGWIT') {
      $count = $item->count;
      $percentage = $item->percentage;
    }
  }

  if ($count !== NULL && $percentage !== NULL) {
    if ($obj->sincePeriodStart->fromHeight >= $activation_period_start) {
        $sql_locked_in = ' , locked_in = 1';
    }
    
    $sql = "UPDATE data SET count=$count, percentage=$percentage, last_updated='" . date("Y-m-d H:i:s") . "'$sql_locked_in";

    if ($conn->query($sql) === TRUE) {
      echo "Record updated successfully";
    } else {
      echo "Error updating record: " . $conn->error;
    }

    $conn->close();
  }
}

?>
