<?php
class EventObject{
//database connection and table name
private $conn;
private $table_name ="FB_Event";

//object properties
public $action;
public $details;
public $object;

//constructor with $db as a database conncetion
public function __construct($db) {
    
    $this->conn = $db;
}


//create/Save event
function save(){
   //query to insert event
    $query = "
			INSERT INTO
				".$this->table_name."
			(
				action,
				details,
				object
			)
			VALUES
			(?,?,?)
		";
    
    //prepare query
    $stmt = $this->conn->prepare($query);
    
    //bind values
    $stmt->bind_param('sss',$val1,$val2,$val3);
    
   $val1 = $this->action;
    $val2 = $this->details;
    $val3 = $this->object;
    
    //Execute the statement
    
    if($stmt->execute()){
        return true;
    }else {
        return false;
    }
       
 }
}

?>