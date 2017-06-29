<?php
class Database {
  
    //The database credentials
    private $host = 'localhost';
    private $db_name = 'database-name';
    private $user = 'username';
    private $password='*******';
    private $connection;
    
    //get the database conncetion
    public function getConnection(){
       
      $this->connection = mysqli_connect($this->host,$this->user,$this->password,$this->db_name);
        
    if(!$this->connection) {
        echo "Error: Unable to connect to mysql";
    }  else{
        echo "A successful connection to mysql was made.";
    } 
        
        return $this->connection;
    }
       
}
?>