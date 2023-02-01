<?php
    /* Get the name of the  uploaded file */
    $filename = $_FILES['files']['name'];

    /* Choose where to save the uploaded file*/
    $location = "upload/".$filename

    /* Save the uploaded file to the local filesystem*/

    if(move_uploaded_file($_FILES['files']['tap_name'], $location)){

        echo 'Success'

    } else {
        
        echo 'Failure'
    }

?>