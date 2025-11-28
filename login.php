<?php
require "db_connect.php";

$email = $_POST['email'];
$pass = $_POST['password'];

$sql = "SELECT * FROM users WHERE email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($pass, $user['password'])) {
        echo "success|" . $user['full_name'];
    } else {
        echo "wrong_pass";
    }
} else {
    echo "no_account";
}

$stmt->close();
$conn->close();
?>
