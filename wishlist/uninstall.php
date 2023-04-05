<?php

// TODO:: Webareal marketplace API credentials
$username = '';
$password = '';

// TODO:: Path to get request data for uninstall
$save_path = '../tmp/';

// Request data from Webareal
$request_data = json_decode(file_get_contents('php://input'), true);

if (empty($request_data['eshopCode'])) {
    // Error
    echo json_encode(['message' => 'invalid eshop code']);
    exit;
}

// Get request data from install
$install_path = $save_path . $request_data['eshopCode'] . '.json';

if (!file_exists($install_path)) {
    // Error
    echo json_encode(['message' => 'invalid install data']);
    exit;
}

$install_data = json_decode(file_get_contents($install_path), true);

$url = 'https://' . $install_data['apiUrl'];

// Webareal login
$c = curl_init();
curl_setopt($c, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($c, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-Wa-api-token: ' . $install_data['apiToken'],
]);
curl_setopt($c, CURLOPT_URL, $url . '/login');
curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($c, CURLOPT_TIMEOUT, 10);
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($c, CURLOPT_POST, 1);
curl_setopt($c, CURLOPT_POSTFIELDS, json_encode([
    'username' => $username,
    'password' => $password,
], JSON_INVALID_UTF8_IGNORE));

$login_data = (array) json_decode(curl_exec($c), true);

curl_close($c);

if (empty($login_data['token'])) {
    // Invalid login
    echo json_encode(['message' => 'invalid login']);
    exit;
}

// Webareal uninstall addon
$c = curl_init();
curl_setopt($c, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($c, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-Wa-api-token: ' . $install_data['apiToken'],
    'Authorization: Bearer ' . $login_data['token'],
]);
curl_setopt($c, CURLOPT_URL, $url . '/plugin/snippet/footer');
curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($c, CURLOPT_TIMEOUT, 10);
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($c, CURLOPT_CUSTOMREQUEST, 'DELETE');

$uninstall_data = (array) json_decode(curl_exec($c), true);

curl_close($c);

if (empty($uninstall_data['message']) || $uninstall_data['message'] !== 'Snippet deleted') {
    // Invalid uninstall
    echo json_encode(['message' => 'invalid uninstall']);
    exit;
}

// Remove install data
unlink($install_path);

// Success
echo json_encode(['status' => 'DONE']);
exit;
