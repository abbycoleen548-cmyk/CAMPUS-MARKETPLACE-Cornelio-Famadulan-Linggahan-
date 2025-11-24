<?php
$conn = mysqli_connect("localhost", "root", "", "campus_market");

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) == 1) {
    $user = mysqli_fetch_assoc($result);

    if (password_verify($password, $user['password'])) {
        echo "success|" . $user['full_name'];
    } else {
        echo "wrong_pass";
    }
} else {
    echo "no_user";
}
?>
