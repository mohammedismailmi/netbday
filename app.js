// ===== EDIT EVERYTHING HERE =====
const C = {
  brand: "KOLIFLIX",
  name: "Rakshitha",
  pic: "media/profile.jpg",        // her photo
  show: {
    title: "Koli's Life",           // series title (change anytime)
    year: 2026,
    age: "U/A 16+",
    match: "99% Match",
    desc: "A story about the one and only Rakshitha. Two episodes, zero spoilers, infinite memories.",
    genres: "Heartwarming, Comedy, Friendship",
    banner: "media/banner.jpg",     // wide image for hero
    eps: [
      { t: "Episode 1 title", d: "Episode 1 description goes here.", len: "10m", src: "media/ep1.mp4", img: "media/ep1.jpg" },
      { t: "Episode 2 title", d: "Episode 2 description goes here.", len: "10m", src: "media/ep2.mp4", img: "media/ep2.jpg" }
    ]
  },
  soon: ["Season 2: Koli's Life", "Koli's Life: The Movie", "Koli Gets a Cake"]
};
// ================================

const $ = id => document.getElementById(id);
const S = C.show;
const bg = u => "url('" + u + "')";

// intro
document.title = C.brand;
for (let i = 0; i < C.brand.length; i++) {
  const s = document.createElement("span");
  s.textContent = C.brand[i];
  s.style.animationDelay = (i * 0.12) + "s";
  $("logo").appendChild(s);
}
setTimeout(() => $("intro").classList.add("out"), 3100);
setTimeout(() => { $("intro").remove(); $("who").classList.remove("hide"); }, 3700);

// profile
$("pimg").src = $("nimg").src = C.pic;
$("pname").textContent = $("fname").textContent = C.name;
$("brand").textContent = C.brand;
$("pf").onclick = $("pf").onkeydown = e => {
  if (e.type === "keydown" && e.key !== "Enter") return;
  $("who").classList.add("hide");
  $("home").classList.remove("hide");
};
document.querySelectorAll(".av img").forEach(im => im.onerror = () => im.remove());

// hero
const meta = S.match + "  " + S.year + "  " + S.age + "  " + S.eps.length + " Episodes";
$("hero").style.backgroundImage = bg(S.banner);
$("htitle").textContent = $("mtitle").textContent = S.title;
$("hmeta").textContent = $("mmeta").textContent = meta;
$("hdesc").textContent = $("mdesc").textContent = S.desc;
$("mgen").textContent = "Genres: " + S.genres;
$("mh").style.backgroundImage = bg(S.banner);

// rows
function row(name) {
  const r = document.createElement("div");
  r.className = "row";
  r.innerHTML = "<h3></h3><div class='sl'></div>";
  r.firstChild.textContent = name;
  $("rows").appendChild(r);
  return r.lastChild;
}
function card(sl, img, cap, fn) {
  const c = document.createElement("div");
  c.className = "card";
  c.style.backgroundImage = bg(img);
  const k = document.createElement("div");
  k.className = "cap";
  k.textContent = cap;
  c.appendChild(k);
  c.onclick = fn;
  sl.appendChild(c);
  return c;
}
let sl = row("Continue Watching for " + C.name);
for (let i = 0; i < S.eps.length; i++) {
  const e = S.eps[i];
  const c = card(sl, e.img, "E" + (i + 1) + ": " + e.t, () => play(i));
  c.insertAdjacentHTML("beforeend", "<div class='bar'><i style='width:0%'></i></div>");
}
sl = row("Trending Now");
card(sl, S.banner, S.title, openM);
for (let i = 0; i < C.soon.length; i++) {
  const c = document.createElement("div");
  c.className = "card soon";
  c.textContent = C.soon[i] + " \u2022 Coming soon";
  sl.appendChild(c);
}

// modal
const eps = $("eps");
for (let i = 0; i < S.eps.length; i++) {
  const e = S.eps[i];
  const d = document.createElement("div");
  d.className = "ep";
  d.innerHTML = "<div class='n'>" + (i + 1) + "</div><div class='th'></div><div><div class='t'><span></span><span></span></div><div class='d'></div></div>";
  d.children[1].style.backgroundImage = bg(e.img);
  const t = d.children[2].firstChild.children;
  t[0].textContent = e.t;
  t[1].textContent = e.len;
  d.children[2].lastChild.textContent = e.d;
  const a = document.createElement("a");
  a.className = "dl";
  a.href = e.src;
  a.download = S.title + " - E" + (i + 1) + " - " + e.t + ".mp4";
  a.textContent = "\u2B07 Download";
  a.onclick = ev => ev.stopPropagation();
  d.appendChild(a);
  d.onclick = () => play(i);
  eps.appendChild(d);
}
function openM() { $("modal").classList.remove("hide"); document.body.style.overflow = "hidden"; }
function closeM() { $("modal").classList.add("hide"); document.body.style.overflow = ""; }
$("hinfo").onclick = openM;
$("hplay").onclick = $("mplay").onclick = () => play(0);
$("mx").onclick = closeM;
$("modal").onclick = e => { if (e.target === $("modal")) closeM(); };

// player
function play(i) {
  const e = S.eps[i];
  $("pt").textContent = "E" + (i + 1) + ": " + e.t;
  $("v").src = e.src;
  $("player").classList.remove("hide");
  $("v").play().catch(() => {});
}
$("px").onclick = () => { $("v").pause(); $("player").classList.add("hide"); };
document.onkeydown = e => {
  if (e.key !== "Escape") return;
  if (!$("player").classList.contains("hide")) $("px").click();
  else closeM();
};
window.onscroll = () => $("nav").classList.toggle("solid", scrollY > 40);
