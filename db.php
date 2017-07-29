<?php

$servername = "localhost";
$username = "<db username>";
$password = "<db password>";
$dbname = "<db name>";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>
