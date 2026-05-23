}
.nav-cta:hover { background:var(--gold-pale); border-color:var(--gold); }

/* ──────────── HERO ──────────── */
.hero {
  min-height:100vh; display:flex; align-items:center;
  padding:130px 48px 90px; position:relative; overflow:hidden;
}
.hero-grid {
  position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(201,168,76,0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,0.045) 1px, transparent 1px);
  background-size:72px 72px;
  -webkit-mask-image:radial-gradient(ellipse 75% 80% at 55% 50%, black 15%, transparent 72%);
  mask-image:radial-gradient(ellipse 75% 80% at 55% 50%, black 15%, transparent 72%);
  animation:gpulse 9s ease-in-out infinite alternate;
}
.hero-glow {
  position:absolute; top:15%; right:-8%;
  width:55vw; height:55vw;
  background:radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%);
  pointer-events:none;
}
@keyframes gpulse { from{opacity:0.55} to{opacity:1} }

.hero-inner { max-width:1120px; margin:0 auto; position:relative; z-index:1; }

.hero-eyebrow {
  font-family:'DM Mono',monospace; font-size:10px;
  letter-spacing:4px; color:var(--gold-dim);
  text-transform:uppercase; margin-bottom:30px;
  display:flex; align-items:center; gap:14px;
  opacity:0; animation:slideUp 0.7s ease 0.2s forwards;
}
.hero-eyebrow::before { content:''; width:40px; height:1px; background:var(--gold-dim); }

.hero-h1 {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(54px,8.5vw,100px);
  font-weight:300; letter-spacing:2px; line-height:1.0;
  margin-bottom:30px;
  opacity:0; animation:slideUp 0.7s ease 0.4s forwards;
}
.hero-h1 .line1 { display:block; color:var(--text); }
.hero-h1 .line2 { display:block; color:var(--gold); font-style:italic; }

.hero-sub {
  max-width:580px; font-size:16px; color:var(--text-d);
  line-height:1.85; margin-bottom:48px; font-weight:300;
  opacity:0; animation:slideUp 0.7s ease 0.55s forwards;
}

.hero-ctas {
  display:flex; gap:14px; flex-wrap:wrap;
  opacity:0; animation:slideUp 0.7s ease 0.7s forwards;
}
.btn-primary {
  font-family:'DM Mono',monospace; font-size:11px;
  letter-spacing:2px; text-transform:uppercase;
  color:var(--bg); background:var(--gold);
  padding:16px 38px; text-decoration:none;
  border:1px solid transparent; display:inline-block; transition:all 0.25s;
}
.btn-primary:hover { background:var(--gold-light); transform:translateY(-2px); }
.btn-ghost {
  font-family:'DM Mono',monospace; font-size:11px;
  letter-spacing:2px; text-transform:uppercase;
  color:var(--text-d); background:transparent;
  padding:16px 38px; text-decoration:none;
  border:1px solid var(--border); display:inline-block; transition:all 0.25s;
}
.btn-ghost:hover { color:var(--gold); border-color:var(--gold-border); }

.hero-stats {
  display:flex; gap:56px; margin-top:72px;
  padding-top:44px; border-top:1px solid var(--border);
  opacity:0; animation:slideUp 0.7s ease 0.9s forwards; flex-wrap:wrap;
}
.stat-num { font-family:'Cormorant Garamond',serif; font-size:38px; font-weight:600; color:var(--gold); line-height:1; }
.stat-lbl { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:2px; color:var(--text-m); text-transform:uppercase; margin-top:5px; }

@keyframes slideUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

/* ──────────── SECTION COMMON ──────────── */
section { padding:104px 48px; }
.inner { max-width:1120px; margin:0 auto; }
.sec-tag {
  font-family:'DM Mono',monospace; font-size:9px;
  letter-spacing:4px; color:var(--gold-dim);
  text-transform:uppercase; margin-bottom:18px;
  display:flex; align-items:center; gap:12px;
}
.sec-tag::before { content:'◆'; font-size:7px; color:var(--gold); }
.sec-h2 {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(32px,4vw,54px); font-weight:300;
  letter-spacing:2px; line-height:1.15; margin-bottom:14px;
}
.sec-h2 em { font-style:italic; color:var(--gold); }
.sec-lead {
  font-size:15px; color:var(--text-d); max-width:520px;
  line-height:1.85; margin-bottom:52px;
}

/* ──────────── WHO WE SERVE ──────────── */
#serve {
  background:var(--surf);
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
}
.serve-grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:1px; background:var(--border);
  border:1px solid var(--border);
}
.serve-card {
  background:var(--surf); padding:48px 36px; transition:background 0.3s;
}
.serve-card:hover { background:rgba(201,168,76,0.04); }
.serve-icon {
  width:46px; height:46px;
  border:1px solid var(--gold-border);
  display:flex; align-items:center; justify-content:center;
  margin-bottom:22px;
}
.serve-icon svg { width:20px; height:20px; stroke:var(--gold); fill:none; stroke-width:1.5; }
.serve-card h3 {
  font-family:'Cormorant Garamond',serif; font-size:22px;
  font-weight:600; color:var(--text); margin-bottom:10px; letter-spacing:0.5px;
}
.serve-card > p { font-size:13px; color:var(--text-d); line-height:1.8; }
.serve-specs { margin-top:22px; border-top:1px solid var(--border); padding-top:16px; }
.serve-specs-lbl {
  font-family:'DM Mono',monospace; font-size:9px;
  letter-spacing:1.5px; color:var(--gold-dim); text-transform:uppercase;
  margin-bottom:8px;
}
.serve-specs span {
  display:block; font-size:12px; color:var(--text-d);
  padding:4px 0; border-bottom:1px solid rgba(201,168,76,0.06);
  line-height:1.5;
}

/* ──────────── MEMBERSHIP ──────────── */
#membership { background:var(--bg); }
.mem-note {
  display:flex; align-items:center; gap:10px;
  font-family:'DM Mono',monospace; font-size:10px;
  letter-spacing:1.5px; color:var(--gold-dim);
  background:var(--gold-pale); border:1px solid var(--border);
  padding:12px 20px; margin-bottom:36px;
  width:fit-content;
}
.mem-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }

.mem-card {
  background:var(--surf); border:1px solid var(--border);
  padding:30px 22px; position:relative; transition:all 0.3s;
}
.mem-card:hover { border-color:var(--gold-border); transform:translateY(-5px); background:var(--surf2); }
.mem-card.featured {
  border-color:var(--gold-dim);
  background:linear-gradient(145deg, var(--surf2), rgba(201,168,76,0.05));
}
.mem-card.featured::after {
  content:'MOST POPULAR';
  position:absolute; top:-1px; left:50%;
  transform:translateX(-50%);
  background:var(--gold); color:var(--bg);
  font-family:'DM Mono',monospace; font-size:8px; letter-spacing:2px;
  padding:4px 14px; white-space:nowrap;
}
.mem-card.vip-ultra { border-color:rgba(201,168,76,0.25); }

.mem-tier {
  font-family:'DM Mono',monospace; font-size:9px;
  letter-spacing:2.5px; color:var(--gold-dim); text-transform:uppercase; margin-bottom:14px;
}
.mem-name {
  font-family:'Cormorant Garamond',serif;
  font-size:26px; font-weight:600; color:var(--text); margin-bottom:6px;
}
.mem-card.vip-ultra .mem-name { color:var(--gold); }
.mem-lock {
  font-family:'DM Mono',monospace; font-size:10px;
  letter-spacing:1px; color:var(--gold);
  display:flex; align-items:center; gap:6px; margin-bottom:22px;
}
.mem-lock svg { width:11px; height:11px; }
.mem-div { height:1px; background:var(--border); margin-bottom:18px; }
.mem-feats { list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:26px; }
.mem-feats li {
  font-size:12px; color:var(--text-d);
  display:flex; gap:8px; align-items:flex-start; line-height:1.45;
}
.mem-feats li::before { content:'—'; color:var(--gold-dim); font-size:10px; flex-shrink:0; margin-top:2px; }
.mem-btn {
  width:100%; background:transparent;
  border:1px solid var(--border); color:var(--text-d);
  font-family:'DM Mono',monospace; font-size:10px;
  letter-spacing:2px; text-transform:uppercase;
  padding:12px; cursor:pointer; transition:all 0.25s;
  text-align:center; display:block; text-decoration:none;
}
.mem-btn:hover,
.mem-card.featured .mem-btn,
.mem-card.vip-ultra .mem-btn {
  background:var(--gold-pale); border-color:var(--gold-dim); color:var(--gold);
}

/* ──────────── GOLD BAND ──────────── */
.gold-band { background:var(--gold); padding:52px 48px; }
.gold-band .inner { display:flex; align-items:center; justify-content:space-between; gap:28px; flex-wrap:wrap; }
.gold-band h3 {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(20px,2.8vw,30px); font-weight:600;
  color:var(--bg); max-width:520px; line-height:1.3;
}
.band-btn {
  font-family:'DM Mono',monospace; font-size:11px; letter-spacing:2px;
  color:var(--gold); background:var(--bg);
  padding:15px 34px; text-decoration:none; text-transform:uppercase;
  white-space:nowrap; transition:background 0.2s;
}
.band-btn:hover { background:var(--surf2); }

/* ──────────── APPLICATION FORM ──────────── */
#apply { background:var(--surf); border-top:1px solid var(--border); }
.form-layout { display:grid; grid-template-columns:1fr 1.25fr; gap:80px; align-items:start; }

.form-left .sec-h2 { margin-bottom:16px; }
.form-left > p { font-size:14px; color:var(--text-d); line-height:1.85; margin-bottom:32px; }
.trust-list { display:flex; flex-direction:column; gap:13px; }
.trust-row { display:flex; align-items:flex-start; gap:12px; font-size:13px; color:var(--text-d); line-height:1.5; }
.trust-row svg { width:16px; height:16px; flex-shrink:0; stroke:var(--gold); fill:none; stroke-width:1.5; margin-top:2px; }

.form-box { background:var(--bg); border:1px solid var(--border); padding:40px; }
.form-hdr {
  font-family:'DM Mono',monospace; font-size:9px;
  letter-spacing:3px; color:var(--gold-dim); text-transform:uppercase;
  margin-bottom:28px; padding-bottom:16px; border-bottom:1px solid var(--border);
}
.f-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.f-field { margin-bottom:18px; }
.f-field label {
  font-family:'DM Mono',monospace; font-size:9px;
  letter-spacing:2px; color:var(--text-m); text-transform:uppercase;
  display:block; margin-bottom:8px;
}
.f-field input,
.f-field select,
.f-field textarea {
  width:100%; background:var(--surf);
  border:1px solid var(--border); color:var(--text);
  font-family:'Outfit',sans-serif; font-size:14px; font-weight:300;
  padding:13px 15px; outline:none; transition:border-color 0.2s;
  -webkit-appearance:none; appearance:none;
}
.f-field input::placeholder,
.f-field textarea::placeholder { color:var(--text-m); }
.f-field input:focus,
.f-field select:focus,
.f-field textarea:focus { border-color:var(--gold-dim); }
.f-field select {
  cursor:pointer;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a6f2e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right 14px center; padding-right:38px;
}
.f-field option { background:var(--surf2); color:var(--text); }
.f-field textarea { resize:none; height:78px; }

.f-submit {
  width:100%; background:var(--gold); color:var(--bg);
  border:none; font-family:'DM Mono',monospace; font-size:11px;
  letter-spacing:3px; text-transform:uppercase; padding:18px;
  cursor:pointer; margin-top:6px; transition:all 0.25s;
  display:flex; align-items:center; justify-content:center; gap:10px;
}
.f-submit:hover { background:var(--gold-light); transform:translateY(-1px); }
.f-note {
  font-family:'DM Mono',monospace; font-size:9px;
  letter-spacing:1px; color:var(--text-m);
  text-align:center; margin-top:14px; line-height:1.7;
}

/* SUCCESS */
.form-success { text-align:center; padding:40px 16px; display:none; }
.success-ring {
  width:58px; height:58px; border:1px solid var(--gold-dim); border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  margin:0 auto 22px; color:var(--gold); font-size:22px;
}
.form-success h3 { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:400; color:var(--text); margin-bottom:12px; }
.form-success p { font-size:13px; color:var(--text-d); line-height:1.85; }

/* ──────────── FOOTER ──────────── */
footer { background:var(--bg); border-top:1px solid var(--border); padding:40px 48px; }
.foot-inner { max-width:1120px; margin:0 auto; display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:28px; }
.foot-meta { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:1.5px; color:var(--text-m); text-transform:uppercase; line-height:2.2; margin-top:8px; }
.foot-right { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:1.5px; color:var(--text-m); text-align:right; text-transform:uppercase; line-height:2.2; }

/* ──────────── RESPONSIVE ──────────── */
@media(max-width:940px){
  nav { padding:14px 24px; }
  .nav-links { display:none; }
  section { padding:76px 24px; }
  .hero { padding:110px 24px 72px; }
  .serve-grid { grid-template-columns:1fr; }
  .mem-grid { grid-template-columns:1fr 1fr; }
  .form-layout { grid-template-columns:1fr; gap:40px; }
  .f-row { grid-template-columns:1fr; }
  .gold-band { padding:44px 24px; }
  footer { padding:36px 24px; }
  .foot-right { text-align:left; }
}
@media(max-width:580px){
  .mem-grid { grid-template-columns:1fr; }
  .hero-stats { flex-direction:column; gap:24px; }
  .hero-h1 { font-size:48px; }
}
</style>
</head>
EOF

sudo curl -o /var/www/html/index.html https://raw.githubusercontent.com/smrtgym-temp/deploy/main/index.html
ls -l /var/www/html/index.html
sudo rm -f /var/www/html/index.html
sudo curl -L -o /var/www/html/index.html https://raw.githubusercontent.com/smrtgym-temp/deploy/main/index.html
ls -lh /var/www/html/index.html
sudo nano /var/www/html/index.html
sudo bash -c 'echo "<!DOCTYPE html><html><body style=\"background:#000; color:#fff; text-align:center; padding:50px;\"><h1>Smart Gym</h1><p>Transformation Architecture.</p></body></html>" > /var/www/html/index.html'
sudo rm -f /var/www/html/index.html
sudo bash -c 'cat > /var/www/html/index.html << "EOF"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Smart Gym · Build Strength. Transform Your Life.</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root { --gold:#C9A84C; --bg:#06090E; --text:#EDE9E0; --surf:#0C1420; --border:rgba(201,168,76,0.12); }
body { background:var(--bg); color:var(--text); font-family:"Outfit",sans-serif; margin:0; }
nav { position:fixed; top:0; left:0; right:0; z-index:100; background:rgba(6,9,14,0.94); border-bottom:1px solid var(--border); padding:16px 48px; display:flex; align-items:center; justify-content:space-between; }
.nav-logo-img { height: 40px; }
.hero { min-height:100vh; display:flex; align-items:center; padding:130px 48px; text-align:center; }
.hero-h1 { font-family:"Cormorant Garamond",serif; font-size:clamp(40px,6vw,80px); color:var(--text); }
.form-box { background:var(--surf); padding:40px; max-width:600px; margin:50px auto; border:1px solid var(--border); }
</style>
</head>
<body>
<nav><img src="logo.png" class="nav-logo-img" alt="logo"></nav>
<section class="hero">
  <div style="margin:0 auto;">
    <h1>Build Strength.<br><em style="color:var(--gold)">Transform Your Life.</em></h1>
    <p style="color:#7E8C99; margin:20px 0;">A high-performance coaching ecosystem engineered for medical and corporate professionals.</p>
  </div>
</section>
EOF'
sudo bash -c 'cat >> /var/www/html/index.html << "EOF"
<section id="apply" style="padding:50px 20px;">
  <div class="form-box">
    <h2 style="color:var(--gold); text-align:center; margin-bottom:20px;">Premium Application</h2>
    <form>
      <input type="text" placeholder="Full Name" style="width:100%; padding:15px; margin-bottom:10px; background:#000; border:1px solid var(--border); color:white;">
      <select style="width:100%; padding:15px; margin-bottom:10px; background:#000; border:1px solid var(--border); color:white;">
        <option>Doctor / Medical Professional</option>
        <option>IT Professional</option>
        <option>Business Owner / Executive</option>
        <option>Sport Professional / Trainer</option>
        <option>Other</option>
      </select>
      <button type="submit" style="width:100%; padding:15px; background:var(--gold); border:none; cursor:pointer;">SEND REQUEST</button>
    </form>
  </div>
</section>
</body>
</html>
EOF'
sudo bash -c 'cat > /var/www/html/index.html << "EOF"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Smart Gym · Build Strength. Transform Your Life.</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,700;1,400&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
<style>
:root { --gold: #C9A84C; --bg: #06090E; --surf: #0C1420; --text: #EDE9E0; }
body { background: var(--bg); color: var(--text); font-family: "Outfit", sans-serif; margin: 0; padding: 0; }
.inner { max-width: 800px; margin: 0 auto; padding: 50px 20px; text-align: center; }
.logo-img { height: 60px; margin-bottom: 20px; }
h1 { font-family: "Cormorant Garamond", serif; font-size: 3rem; margin-bottom: 20px; }
.hero-em { color: var(--gold); font-style: italic; }
.form-box { background: var(--surf); padding: 40px; border: 1px solid #222; border-radius: 12px; margin-top: 40px; text-align: left; }
input, select { width: 100%; padding: 15px; margin-bottom: 15px; background: #000; border: 1px solid #444; color: white; }
button { width: 100%; padding: 18px; background: var(--gold); color: #000; font-weight: 600; text-transform: uppercase; border: none; cursor: pointer; }
</style>
</head>
<body>
<div class="inner">
  <img src="logo.png" alt="Smart Gym" class="logo-img">
  <h1>Build Strength.<br><span class="hero-em">Transform Your Life.</span></h1>
  <p style="color:#7E8C99;">A high-performance coaching ecosystem engineered for medical professionals, corporate leaders, and sport professionals.</p>
  <div class="form-box">
    <h2 style="color:var(--gold); text-align:center; margin-bottom:20px;">Premium Application</h2>
    <form>
      <input type="text" placeholder="Full Name" required>
      <input type="tel" placeholder="WhatsApp Number" required>
      <select required>
        <option>Doctor / Medical Professional</option>
        <option>IT Professional</option>
        <option>Business Owner / Executive</option>
        <option>Sport Professional / Trainer</option>
      </select>
      <button type="submit">SEND REQUEST</button>
    </form>
  </div>
</div>
</body>
</html>
EOF'
ls /var/www/html/
sudo mv "logo new.png" logo.png
sudo nano /var/www/html/index.html
ls /var/www/html/images/
sudo nano /var/www/html/index.html
sudo mv /var/www/html/images/logo* /var/www/html/logo.png
sudo sed -i 's/max-width: 200px;/max-width: 350px;/g' /var/www/html/index.html
sudo mv /var/www/html/images/logo.png /var/www/html/logo.png
sudo sed -i 's/height: 60px;/height: 180px; mix-blend-mode: screen;/g' /var/www/html/index.html
sudo sed -i 's/height: 180px; mix-blend-mode: screen;/height: 250px; mix-blend-mode: screen; filter: brightness(1.2);/g' /var/www/html/index.html
sudo apt update
sudo apt install git -y
git clone <url>
git clone https://github.com/manikandaraj/smartgym-web.git
git clone https://github.com/manikandaraj-p/smartgym-web.git
ls -d smartgym-web
sudo cp -r smartgym-web/* /var/www/html/
sudo rm -rf /var/www/html/index.html
sudo cp -r smartgym-web/* /var/www/html/
ls -R smartgym-web
sudo cp -r smartgym-web/. /var/www/html/
sudo systemctl restart apache2
ls -F smartgym-web/
sudo apt update
sudo apt install apache2 -y
sudo cp -r smartgym-web/* /var/www/html/
sudo systemctl start apache2
sudo systemctl enable apache2
ls -F
nano index.html
sudo apt install nodejs npm -y
sudo apt update
sudo apt clean
sudo apt autoremove
sudo apt install -f
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install node
npm install
node index.js
// index.js கோப்பில் இப்படி இருக்கிறதா என்று பாருங்கள்:
app.listen(3000, '0.0.0.0', () => {
});
node index.js
nano index.js
ls -F
sudo npm install -g pm2
pm2 start index.js
pm2 startup
pm2 save
pm2 status
pm2 logs --lines 20
sudo certbot --apache -d smartgym.cloud
sudo systemctl status apache2
sudo lsof -i :80
sudo kill -9 <PID-எண்>
sudo systemctl start apache2
sudo certbot --apache -d smartgym.cloud
sudo apt install python3-certbot-nginx -y
sudo certbot --nginx -d smartgym.cloud
sudo systemctl status nginx
sudo nginx -t
sudo systemctl reload nginx
sudo nano /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d smartgym.cloud -d api.smartgym.cloud
pm2 status
pm2 restart all
sudo systemctl stop nginx
sudo systemctl start nginx
sudo cp -r /home/manikandarajsmart/smartgym-web/* /var/www/html/
sudo systemctl reload nginx
sudo cp -r /home/manikandarajsmart/smartgym-web/* /var/www/html/
sudo rm /var/www/html/index.nginx-debian.html
sudo systemctl reload nginx
ls -l /home/manikandarajsmart/
ls -l /home/manikandarajsmart/smartgym/
sudo cp index.html /var/www/html/
sudo nano /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl reload nginx
cat /var/www/html/index.html
cat /etc/nginx/sites-available/default
cat /var/www/html/index.html
sudo rm /var/www/html/index.html
sudo cp index.html /var/www/html/
cat /var/www/html/index.html
sudo nano /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl reload nginx
sudo nginx -t
sudo systemctl restart nginx
curl -k -H "Host: smartgym.cloud" https://localhost
curl -k https://localhost
ping -c 3 smartgym.cloud
curl ifconfig.me
git --version
ssh-keygen -t ed25519 -C "manikandarajsmart@gmail.com"
[200~cat ~/.ssh/id_ed25519.pub~
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com
cd /var/www/html
git init
git add .
git commit -m "Initial commit for Smart Gym"
git branch -M main
git remote add origin git@github.com:manikandarajsmart-cell/Smart-Gym.git
git push -u origin main
git config --global --add safe.directory /var/www/html
git config --global user.email "manikandarajsmart@gmail.com"
git config --global user.name "manikandarajsmart"
git add .
git commit -m "Initial commit for Smart Gym"
git branch -M main
git remote add origin git@github.com:manikandarajsmart-cell/Smart-Gym.git
git push -u origin main
sudo git add .
sudo git commit -m "Initial commit for Smart Gym"
sudo git push -u origin main
**Verify that it is gone:**
sudo git remote add origin git@github.com:manikandarajsmart-cell/Smart-Gym.git
**Push your files:**
udo git remote remove origin
sudo git remote add origin git@github.com:manikandarajsmart-cell/Smart-Gym.git
sudo git push -u origin main
sudo git remote remove origin
sudo git remote add origin git@github.com:manikandarajsmart-cell/Smart-Gym.git
sudo git push -u origin main
git remote set-url origin git@github.com:manikandarajsmart-cell/Smart-Gym.git
sudo git push -u origin main
sudo git remote set-url origin git@github.com:manikandarajsmart-cell/Smart-Gym.git
sudo git push -u origin main
git remote -v
sudo nano .git/config
sudo git remote remove origin
cd /var/www/html
sudo git init
sudo git add .
sudo git commit -m "First commit"
sudo git remote add origin git@github.com:manikandarajsmart-cell/Smart-Gym.git
sudo git push -u origin main
cd /var/www/html
sudo git branch -M main
sudo git push -u origin main
cd ~/.ssh
ls
cat id_ed25519.pub
sudo git push -u origin main
cd /var/www/html
sudo git push -u origin main
git remote -v
eval backtick ssh-agent backtick
eval `ssh-agent
ssh-add
