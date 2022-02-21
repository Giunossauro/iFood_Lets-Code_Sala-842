<?php
    header("Location: https://valeuapenajogar.com/?enviado=true");
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $steamid = $_POST['steamid'];
    $questao = $_POST['questao'];
    $sugest = $_POST['sugest'];
    require 'vendor/autoload.php';

    $from = new SendGrid\Email(null, MEU_EMAIL);
    $subject = "Contato Site";
    $to = new SendGrid\Email(null, MEU_EMAIL);

    $from2 = new SendGrid\Email(null, MEU_EMAIL);
    $to2 = new SendGrid\Email(null, $email);

    $content = new SendGrid\Content("text/html", "<b>(COPIA)</b>nova msg de $nome <br><br> steamid: $steamid <br> util: $questao <br> sugestao: $sugest ");
    $mail = new SendGrid\Mail($from, $subject, $to, $content);
    $mail2 = new SendGrid\Mail($from2, $subject, $to2, $content);

    $apiKey = MY_SENDGRID_APY_KEY;
    $sg = new SendGrid($apiKey);

    $response = $sg->client->mail()->send()->post($mail);
    $response = $sg->client->mail()->send()->post($mail2);

    exit;
?>