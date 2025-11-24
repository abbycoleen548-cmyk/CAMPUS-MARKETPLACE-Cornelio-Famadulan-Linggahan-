<?php
$conn = mysqli_connect("localhost", "root", "", "campus_market");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$full_name = $_POST['full_name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (full_name, email, password) VALUES ('$full_name', '$email', '$password')";

if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "error";
}
?>
