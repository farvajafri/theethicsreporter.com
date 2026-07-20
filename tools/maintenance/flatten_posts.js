const fs = require('fs');
const dataPath = 'theethicsreporter.com/data/posts.json';
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let modified = false;
for (let p of data) {
  if (p.title && typeof p.title === 'object' && p.title.rendered) {
    p.title = p.title.rendered;
    modified = true;
  }
  if (p.content && typeof p.content === 'object' && p.content.rendered) {
    p.content = p.content.rendered;
    modified = true;
  }
  if (p.excerpt && typeof p.excerpt === 'object' && p.excerpt.rendered) {
    p.excerpt = p.excerpt.rendered;
    modified = true;
  }
}

if (modified) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log("Flattened posts.json");
} else {
  console.log("No flattening needed");
}
