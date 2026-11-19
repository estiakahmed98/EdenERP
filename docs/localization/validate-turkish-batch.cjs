const fs = require('node:fs');
const {parse} = require('@formatjs/icu-messageformat-parser');
const batch = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
function signature(nodes) {
  return nodes.filter(n => n.type !== 0).map(n => {
    const r = {type:n.type};
    if ('value' in n) r.value=n.value;
    if ('style' in n) r.style=n.style;
    if ('offset' in n) r.offset=n.offset;
    if (n.children) r.children=signature(n.children);
    if (n.options) r.options=Object.fromEntries(Object.entries(n.options).map(([k,v])=>[k,signature(v.value)]));
    return r;
  }).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
}
for (const entry of batch) {
  const a=JSON.stringify(signature(parse(entry.source)));
  const b=JSON.stringify(signature(parse(entry.target)));
  if(a!==b) throw Error(`ICU or rich-text mismatch: ${entry.path}`);
}
console.log(JSON.stringify({pass:true,strings:batch.length,checks:['ICU syntax','arguments','rich-text tags','format styles']}));
