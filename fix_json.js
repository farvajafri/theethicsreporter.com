const fs = require('fs');
const dataPath = 'site/data/tab-articles.json';
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

if (data[0].slug === "dickie-scruggs-bobby-delaughter-judicial-bribery") {
  data[0].category = "Ethics";
  data[0].tags = ["Judicial Corruption", "Bribery", "Legal Ethics"];
  data[0].id = "dickie-scruggs-bobby-delaughter-" + Date.now();
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log("Fixed JSON");
} else {
  console.log("Not the first article");
}
