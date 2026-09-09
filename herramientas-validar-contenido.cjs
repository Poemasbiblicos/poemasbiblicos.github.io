/**
 * Valida que todos los MD de poemas cumplan las reglas de la skill escribir-poemas.
 * Uso:  node herramientas-validar-contenido.cjs
 */
const fs=require("fs"),path=require("path");
const ROOT="src/content/poemas";
const CATS={
 "Biblical Poems for Mothers Day":"/images/mother-day.jpg",
 "Poemas para la Madre":"/images/madre.jpg",
 "Poemas Cristianos para la Mujer":"/images/mujer.jpg",
 "Poemas Cristianos de Esperanza":"/images/esperanza.jpg",
 "Poemas Bíblicos de Amor":"/images/amar-a-dios.jpg",
 "Poemas Cristianos para Reflexionar":null,
 "Poemas Cristianos de Fe":"/images/fe.jpg",
 "Poemas Cristianos de Fortaleza":"/images/fortaleza.jpg",
 "Poemas para Niños":"/images/ninos1.jpg",
 "Poemas Cristianos para Jóvenes":"/images/joven.jpg",
 "Poemas Cristianos Para Adolescentes":"/images/adolescentes.jpg",
 "Poemas Cristianos Sobre La Familia":"/images/familia.jpg"};
const slugify=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g,"-");
const catSlugs=new Set(Object.keys(CATS).map(slugify));
const files=[];(function w(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);
 fs.statSync(p).isDirectory()?w(p):f.endsWith(".md")&&files.push(p);}})(ROOT);
const allSlugs=new Set(files.map(f=>path.basename(f,".md")));
const err=[],h1s=new Map(),titles=new Map(),h2s=new Map();
for(const f of files){
  const t=fs.readFileSync(f,"utf8"),slug=path.basename(f,".md");
  const parts=t.split(/^---\s*$/m);
  const fmText=parts[1]||"", body=parts.slice(2).join("---");
  const fm={};
  for(const line of fmText.split(/\r?\n/)){
    const i=line.indexOf(":");
    if(i>0 && !/^\s/.test(line)) fm[line.slice(0,i).trim()]=line.slice(i+1).trim().replace(/^"/,"").replace(/"$/,"");
  }
  const E=m=>err.push(slug+": "+m);
  if(catSlugs.has(slug))E("COLISION: slug igual al de una categoria");
  const cat=fm.category||"";
  if(!(cat in CATS))E("categoria no canonica -> ["+cat+"]");
  const img=fm.heroImage||"";
  if(!fs.existsSync(path.join("public",img.replace(/^\//,""))))E("imagen inexistente -> "+img);
  else if(CATS[cat]&&img!==CATS[cat])E("heroImage no es la de su categoria (esperada "+CATS[cat]+")");
  if(!fm.pubDate)E("sin pubDate");
  if(fm.featured===undefined)E("sin featured");
  const H1=[...body.matchAll(/^# (.+)$/gm)].map(m=>m[1].trim());
  if(H1.length!==1)E("H1 debe ser 1, hay "+H1.length);
  const title=fm.title||"";
  if(H1[0]&&title===H1[0])E("title identico al H1");
  if(H1[0]){if(h1s.has(H1[0]))E("H1 duplicado con "+h1s.get(H1[0]));else h1s.set(H1[0],slug);}
  if(title){if(titles.has(title))E("title duplicado con "+titles.get(title));else titles.set(title,slug);}
  for(const h of [...body.matchAll(/^## (.+)$/gm)].map(m=>m[1].trim())){
    if(/^Explorar/.test(h))continue;
    if(h2s.has(h))E('H2 duplicado "'+h+'" con '+h2s.get(h));else h2s.set(h,slug);
  }
  for(const u of [...body.matchAll(/\]\((\/poemas\/[^)]+)\)/g)].map(m=>m[1])){
    if(!u.endsWith("/"))E("enlace sin barra final -> "+u);
    const s2=u.replace(/^\/poemas\//,"").replace(/\/$/,"");
    if(!catSlugs.has(s2)&&!allSlugs.has(s2))E("enlace roto -> "+u);
  }
}
console.log(err.length?"FALLOS ("+err.length+"):\n"+err.join("\n"):"OK: "+files.length+" archivos, 0 fallos");
process.exit(err.length?1:0);
