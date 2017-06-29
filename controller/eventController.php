<?php
//require headers
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json;charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


//get database connection
include_once '../config/database.php';
//instantiate the event object
include_once '../model/eventObject.php';

$database = new Database();
$db = $database->getConnection();
$event = new EventObject($db);


//get posted data
$data = json_decode(file_get_contents("php://input"));


//set the event property values
$event->action = $data->action;
$event->details = $data->details;
$event->object = $data->object;

//$event->action = "DELETE";
//$event->details = "PROFILE";
//$event->object = "MIKES PAGE";

//insert the event into the database

if($event->save()) {
    echo 'Event was saved';
}else {
    echo'Unable to save event.';
}

?>