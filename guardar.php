<?php
    include("abre.php");
    $Nombre               = $_POST['Nombre'];
    $Correo               = $_POST['Correo'];
    $TipoComentario       = $_POST['TipoComentario'];
    $Comentario    = $_POST['Comentario'];

    $consulta = "INSERT INTO comentarios(Nombre, Correo, TipoComentario, Comentario) VALUES
    ('$Nombre', '$Correo', '$TipoComentario', '$Comentario')";

        if($conexion->query($consulta) == TRUE){
            header("Location: comentarios.html");  /* regresa al formulario */
        }else{
            echo "Error: " . $consulta . "<br>" . $conexion->error;
        }
    $conexion->close();

?>