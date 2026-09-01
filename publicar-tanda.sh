#!/usr/bin/env bash
# Publica una tanda del plan editorial desde la rama contenido/plan-editorial a main.
# Uso:  bash publicar-tanda.sh 2
set -e
TANDA="${1:?Indica el numero de tanda, p.ej.: bash publicar-tanda.sh 2}"
RAMA="contenido/plan-editorial"

mapfile -t SLUGS < <(node -e '
const fs=require("fs");
const lines=fs.readFileSync("BASE_EDITORIAL_POEMAS.csv","utf8").replace(/^﻿/,"").split("\r\n");
function parse(l){const o=[];let c="",q=false;for(let i=0;i<l.length;i++){const ch=l[i];
 if(q){if(ch===String.fromCharCode(34)){if(l[i+1]===String.fromCharCode(34)){c+=String.fromCharCode(34);i++;}else q=false;}else c+=ch;}
 else if(ch===String.fromCharCode(34))q=true;else if(ch===";"){o.push(c);c="";}else c+=ch;}o.push(c);return o;}
lines.slice(1).filter(l=>l.trim()).map(parse)
 .filter(f=>f[1]==="ESCRITO" && f[21].includes("Tanda "+process.argv[1]+","))
 .forEach(f=>console.log(f[6]));
' "$TANDA")

[ ${#SLUGS[@]} -eq 0 ] && { echo "No hay contenidos pendientes en la tanda $TANDA"; exit 1; }
echo "Tanda $TANDA -> ${#SLUGS[@]} contenidos:"; printf '  %s\n' "${SLUGS[@]}"

git checkout main
for s in "${SLUGS[@]}"; do
  RUTA=$(git ls-tree -r --name-only "$RAMA" | grep "/${s}\.md$")
  git checkout "$RAMA" -- "$RUTA"
done
git checkout "$RAMA" -- BASE_EDITORIAL_POEMAS.csv

node -e '
const fs=require("fs");const F="BASE_EDITORIAL_POEMAS.csv";
const raw=fs.readFileSync(F,"utf8");const bom=raw.startsWith("﻿")?"﻿":"";
const lines=raw.replace(/^﻿/,"").split("\r\n");
function parse(l){const o=[];let c="",q=false;for(let i=0;i<l.length;i++){const ch=l[i];
 if(q){if(ch===String.fromCharCode(34)){if(l[i+1]===String.fromCharCode(34)){c+=String.fromCharCode(34);i++;}else q=false;}else c+=ch;}
 else if(ch===String.fromCharCode(34))q=true;else if(ch===";"){o.push(c);c="";}else c+=ch;}o.push(c);return o;}
const ser=f=>f.map(v=>/[;"\n]/.test(v)?String.fromCharCode(34)+v.replace(/"/g,String.fromCharCode(34,34))+String.fromCharCode(34):v).join(";");
const slugs=process.argv.slice(2);
const out=lines.map((l,i)=>{if(i===0||!l.trim())return l;const f=parse(l);
 if(slugs.includes(f[6])){f[1]="PUBLICADO";return ser(f);}return l;});
fs.writeFileSync(F,bom+out.join("\r\n"));
' "${SLUGS[@]}"

npm run build
git add -A
git commit -m "publica tanda $TANDA del plan editorial (${#SLUGS[@]} contenidos)"
echo
echo "Listo en local. Revisa y luego:  git push origin main"
