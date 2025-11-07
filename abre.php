<?php

$conexion = new mysqli("localhost", "id21814475_comentarios", "A03081Mnl?", "id21814475_comentarios");

    if($conexion){
        echo "la gestion fue existosa !!";

    }else{
        echo "fallo la gestion";
    }
?>
