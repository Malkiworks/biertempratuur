<?php
// Set headers for API response
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Get the request body
$input = file_get_contents('php://input');
$body = json_decode($input, true);

// Validate the request
if (!isset($body['token']) || !isset($body['amountInCents']) || !isset($body['currency'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Your Yoco secret key - replace with your actual secret key from your Yoco account
$secretKey = 'sk_test_960bfde5VBrLlpK898e7';

// API endpoint
$url = 'https://online.yoco.com/v1/charges/';

// Prepare request data
$data = [
    'token' => $body['token'],
    'amountInCents' => $body['amountInCents'],
    'currency' => $body['currency']
];

// If metadata is provided, add it to the request
if (isset($body['metadata'])) {
    $data['metadata'] = $body['metadata'];
}

// Set up cURL request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $secretKey
]);

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Forward the response from Yoco
http_response_code($httpCode);
echo $response;
?> 