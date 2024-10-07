<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    <!-- Bootstrap 4.1.3 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
    <!-- Font Awesome 4.5.0 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <!-- Ionicons 2.0.1 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">

    <link rel="stylesheet" href="./assets/css/login.css">
</head>

<body>


    <?php
    session_start();

    if ($_SESSION) {
        header("Location: index.php");
    } else {
    ?>


        <div class="login">
            <h1>Ingresar</h1>
            <form method="post">
                <input type="text" name="txt_usuario_vendedor" id="txt_usuario_vendedor" placeholder="Ingrese su usuario:" />
                <input type="password" name="txt_password_vendedor" id="txt_password_vendedor" placeholder="Ingrese su cédula:" />
                <button type="button" id="btn_login" class="btn btn-primary btn-block btn-large" onclick="ingresar()">Entrar</button>
            </form>
        </div>





        <!-- JQUERY 2.2.3 -->
        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
        <!-- Bootstrap 4.1.3 -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossorigin="anonymous"></script>
        <!-- SweetAlert 2@10 -->
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

        <script src="./assets/js/utils.js"></script>
        <script src="./assets/js/funciones.js"></script>
        <script src="./assets/js/login.js"></script>



    <?php } ?>


</body>

</html>