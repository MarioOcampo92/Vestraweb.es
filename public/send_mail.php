<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Honeypot check
    if (!empty($_POST['website'])) {
        http_response_code(200); // Fake success to trick bots
        echo json_encode(["status" => "success", "message" => "\u00A1Mensaje enviado con \u00E9xito!"]);
        exit;
    }

    $name = strip_tags(trim($_POST["nombre"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    // Sanitize subject against Header Injection (newlines)
    $subject = str_replace(array("\r", "\n"), array(" ", " "), strip_tags(trim($_POST["asunto"] ?? 'Nuevo mensaje de contacto')));
    $message = trim($_POST["mensaje"] ?? '');

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Por favor completa el formulario correctamente."]);
        exit;
    }

    $recipient = "hello@vestraweb.es";
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mensaje:\n$message\n";

    $email_headers = "From: VestraWeb <hello@vestraweb.es>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-type: text/plain; charset=utf-8\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($recipient, $subject, $email_content, $email_headers, "-fhello@vestraweb.es")) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "\u00A1Mensaje enviado con \u00E9xito!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Oops! Algo sali\u00F3 mal, no pudimos enviar tu mensaje."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Hubo un problema con tu env\u00EDo, int\u00E9ntalo de nuevo."]);
}
?>
