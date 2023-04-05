<?php

// TODO:: Webareal marketplace API credentials
$username = '';
$password = '';

// TODO:: Path to save request data for uninstall
$save_path = '../tmp/';

// TODO:: Addon identify, example: https://artmie.com/install?addon={NAME}
$addon = !empty($_GET['addon']) ? $_GET['addon'] : '';

if (empty($addon)) {
    // Error
    echo json_encode(['message' => 'invalid addon']);
    exit;
}

// TODO:: Path to addon source code
$addon_path = '../resources/webareal-snippet-' . $addon . '-sk.html';

if (!file_exists($addon_path)) {
    // Error
    echo json_encode(['message' => 'invalid addon path']);
    exit;
}

// Request data from Webareal
$request_data = json_decode(file_get_contents('php://input'), true);

if (empty($request_data['eshopCode'])) {
    // Error
    echo json_encode(['message' => 'invalid eshop code']);
    exit;
}

$url = 'https://' . $request_data['apiUrl'];

// Webareal login
$c = curl_init();
curl_setopt($c, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($c, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-Wa-api-token: ' . $request_data['apiToken'],
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

// Webareal install addon
$c = curl_init();
curl_setopt($c, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($c, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-Wa-api-token: ' . $request_data['apiToken'],
    'Authorization: Bearer ' . $login_data['token'],
]);
curl_setopt($c, CURLOPT_URL, $url . '/plugin/snippet/footer');
curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($c, CURLOPT_TIMEOUT, 10);
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($c, CURLOPT_POST, 1);
curl_setopt($c, CURLOPT_POSTFIELDS, json_encode([
    'snippet' => file_get_contents($addon_path),
], JSON_INVALID_UTF8_IGNORE));

$install_data = (array) json_decode(curl_exec($c), true);

curl_close($c);

if (empty($install_data['message']) || $install_data['message'] !== 'Snippet created') {
    // Invalid install
    echo json_encode(['message' => 'invalid install']);
    exit;
}

// Save request data for uninstall
file_put_contents($save_path . $request_data['eshopCode'] . '.json', json_encode($request_data));

// Success
echo json_encode(['status' => 'DONE']);
exit;
