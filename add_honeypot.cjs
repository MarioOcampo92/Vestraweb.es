const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<form class="contact-form" action="\/send_mail\.php" method="POST">/, '<form class="contact-form" action="/send_mail.php" method="POST">\n              <input type="text" name="website" style="display:none !important" tabindex="-1" autocomplete="off">');

fs.writeFileSync('index.html', html, 'utf8');

