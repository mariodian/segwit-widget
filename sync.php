<?php

require_once('./db.php');

global $conn;

$data = file_get_contents('http://api.qbit.ninja/versionstats');

$obj = json_decode($data);
$count = NULL;
$percentage = NULL;

if ($obj->sincePeriodStart) {
  foreach ($obj->sincePeriodStart->stats as $item) {

    if (array_key_exists('version', $item) && $item->version == 536870914) {
      $count = $item->count;
      $percentage = $item->percentage;
    }
  }

  if ($count !== NULL && $percentage !== NULL) {
    $sql = "UPDATE data SET count=$count, percentage=$percentage, last_updated='" . date("Y-m-d H:i:s") . "'";

    if ($conn->query($sql) === TRUE) {
      echo "Record updated successfully";
    } else {
      echo "Error updating record: " . $conn->error;
    }

    $conn->close();
  }
}

?>
