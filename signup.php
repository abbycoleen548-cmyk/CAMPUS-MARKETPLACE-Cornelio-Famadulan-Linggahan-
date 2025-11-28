<?php
require "db_connect.php";

$name = $_POST['full_name'];
$email = $_POST['email'];
$pass = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $pass);
    
if ($stmt->execute()) {
    echo "success";
} else {
    echo "email_exists";
}

$stmt->close();
$conn->close();
?>
