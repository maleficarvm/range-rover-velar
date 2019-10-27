<?php

$errorMessages = [
    403 => 'Not authtorized',
    404 => 'Method not found',
];

$users = [
    'TEST_TOKEN' => 1,
];

function apiAnswer($code, $data, $error = null)
{
    header("Content-Type: application/json");
    $response = [
        'status' => $code,
    ];
    if (!is_null($error)) {
        $response['error'] = $error;
    } else {
        $response['data'] = $data;
    }
    die(
    json_encode($response)
    );
}

$dieFail = function($code) use ($errorMessages)
{
    apiAnswer($code, null, $errorMessages[$code]);
};

function GET_MY_PARAMS()
{
    $param1 = isset($_GET['param1']) ? $_GET['param1'] : '';
    $param2 = isset($_GET['param2']) ? $_GET['param2'] : '';
    //////Что угодно
    apiAnswer(200,[
        'p1' => $param1,
        'p2' => $param2,
    ]);
}

function GET_MY_DB()
{
    $data = require "my-db.php";
    apiAnswer(200,$data);
}

$token = isset($_GET['token']) ? $_GET['token'] : '';
$method = isset($_GET['metod']) ? $_GET['metod'] : '';

if (!isset($users[$token])) {
    $dieFail(403);
}

if (!function_exists($method)) {
    $dieFail(404);
}

$method();
