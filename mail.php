<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru','phpmailer/language/');
$mail->isHTML(true); 

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'zavulon31990@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'zavulon5211'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров
$mail->setFrom('zavulon31990@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('zavulon31990@gmail.com');     // Кому будет уходить письмо
//Тема письма
$mail->Subject = 'Сообщение с сайта';

//Тело письма
$body = '<h1>Новое письмо!</h1>';
$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
$body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
$body.='<p><strong>Сообщение:</strong> '.$_POST['text'].'</p>';

$mail->Body = $body;

//Отправляем
if(!$mail->send()){
    $message = 'Ошибка';
}else{
    $message = 'Ваше письмо успешно отправлено!';
}

$response = ['message' => $message];
 header('Content-type: application/json');
 echo json_encode($response);
?>
