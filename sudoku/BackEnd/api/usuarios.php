<?php
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    // header("Access-Control-Allow-Headers: Content-Type");

    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Allow-Origin");
    header('Content-Type: application/json');
    header("Access-Control-Allow-Headers: Content-Type");

    // Clases de JWT
    require_once 'vendor/autoload.php';
    use Firebase\JWT\JWT;

    require_once("conexbbdd.php");
    
    // Verificamos si el método http es POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if(isset($_GET["agregar"])){
            //Recojo y trato la información
            $data = json_decode(file_get_contents('php://input'), true);// Leo el cuerpo de la información y decodifico en un array asociativo
            $nick = $data['nick'];
            $email = $data['email'];
            $pass = $data['pass'];
            $pass = password_hash($pass, PASSWORD_DEFAULT);
            // Usaré las consultas preparadas para mayor seguridad a la hora de posibles inyecciones SQL en el cliente
            $query = "SELECT * FROM usuarios WHERE nick=?";
            $stmt = mysqli_prepare($conexion,$query);
            mysqli_stmt_bind_param($stmt,"s",$nick);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);

            if(mysqli_stmt_num_rows($stmt) > 0){
                echo json_encode("existe");
            }
            else{
                $query = "INSERT INTO usuarios(nick, email, password)  VALUES (?,?,?)";
                $stmt = mysqli_prepare($conexion,$query);
                mysqli_stmt_bind_param($stmt,"sss",$nick,$email,$pass);
                mysqli_stmt_execute($stmt);

                if (mysqli_stmt_affected_rows($stmt) > 0) {
                    echo json_encode("exito");
                } else {
                    echo json_encode("error");
                }
            }
        }
        else if(isset($_GET["autenticar"])){
            
            $data = json_decode(file_get_contents('php://input'), true);
            $nick = $data['nick'];
            $pass = $data['pass'];

            $query = "SELECT password FROM usuarios WHERE nick=?";
            $stmt = mysqli_prepare($conexion,$query);
            mysqli_stmt_bind_param($stmt,"s",$nick);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            mysqli_stmt_bind_result($stmt, $passwordBBDD);
            mysqli_stmt_fetch($stmt);
            if(mysqli_stmt_num_rows($stmt) > 0 && password_verify($pass, $passwordBBDD)){

                $claveSecreta = bin2hex(random_bytes(32)); // Genero una cadena de 32 bits
                $ahora = strtotime("now");
                $payload = [
                    'nick' => $nick,
                    'exp' => $ahora
                ];
                $token = JWT::encode($payload, $claveSecreta, 'HS256');
                
                echo json_encode(array("token" => $token));  
            }
            else{
                echo json_encode("joder");
            }
        }
        else if(isset($_GET["insertarHistorial"])){
            $data = json_decode(file_get_contents('php://input'), true);
            $nick = $data['nick'];
            $resultado = $data['resultado'];
            $dificultad = $data['dificultad'];
            $fallos = $data['fallos'];
            $tiempo = $data['tiempo'];

            $query = "SELECT id FROM usuarios WHERE nick=?";
            $stmt = mysqli_prepare($conexion,$query);
            mysqli_stmt_bind_param($stmt,"s",$nick);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            mysqli_stmt_bind_result($stmt, $idUsuario);
            mysqli_stmt_fetch($stmt);
 
            if(mysqli_stmt_num_rows($stmt) > 0){
                $query = "INSERT INTO historiales(idusuario, resultado, dificultad, fallos, tiempo)  VALUES (?,?,?,?,?)";
                $stmt = mysqli_prepare($conexion,$query);
                mysqli_stmt_bind_param($stmt,"issss",$idUsuario,$resultado,$dificultad,$fallos,$tiempo);
                mysqli_stmt_execute($stmt);

                if (mysqli_stmt_affected_rows($stmt) > 0) {
                    echo json_encode("exito");
                } else {
                    echo json_encode("error");
                }
            }
            else{
                echo json_encode("error");
            }
        }
        else if(isset($_GET["informacion"])){
            $data = json_decode(file_get_contents('php://input'), true);
            $nick = $data['nick'];
            
            $query = "SELECT id FROM usuarios WHERE nick=?";
            $stmt = mysqli_prepare($conexion,$query);
            mysqli_stmt_bind_param($stmt,"s",$nick);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            mysqli_stmt_bind_result($stmt, $idUsuario);
            mysqli_stmt_fetch($stmt);

            if(mysqli_stmt_num_rows($stmt) > 0){
                $query = "SELECT resultado,dificultad,fallos,tiempo,fecha FROM historiales WHERE idusuario=$idUsuario";
                $stmt = mysqli_prepare($conexion,$query);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_store_result($stmt);
                mysqli_stmt_bind_result($stmt, $resultado, $dificultad, $fallos, $tiempo, $fecha);

                
                while(mysqli_stmt_fetch($stmt)) {
                    $fila = array(
                        'resultado' => $resultado,
                        'dificultad' => $dificultad,
                        'fallos' => $fallos,
                        'tiempo' => $tiempo,
                        'fecha' => $fecha
                    );
                    $resultados[] = $fila;
                }

                if (mysqli_stmt_affected_rows($stmt) > 0) {
                    echo json_encode($resultados);
                } else {
                    echo json_encode("error");
                }
            }
            else{
                echo json_encode("error");
            }
        }
    }  

?>
