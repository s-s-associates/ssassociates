/**
 * Large keyword list for metadata (meta keywords are low SEO value; Google largely ignores them).
 * ~1500 unique phrases: Pakistan, construction, and S&S Associates name variants.
 */

function buildSiteSeoKeywords() {
  const set = new Set();
  const add = (s) => {
    const t = String(s)
      .trim()
      .replace(/\s+/g, " ");
    if (t.length > 0 && t.length < 130) set.add(t);
  };

  const brands = [
    "S&S Associates",
    "S and S Associates",
    "SS Associates",
    "S S Associates",
    "SSAssociates",
    "S&S Associate",
    "SS Associate",
    "S n S Associates",
    "SnS Associates",
    "S & S Associates",
    "SS Assosiates",
    "SS Assoicates",
    "SS Assocites",
    "S&S Assosiates",
    "S S Assoicates",
    "SS Asscociates",
    "SS Asscoiates",
    "S and S Associate",
    "ESS Associates",
    "SS Associates Pakistan",
    "S&S Associates Lahore",
    "SS Associates construction",
  ];

  const cities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Gujranwala",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sukkur",
    "Larkana",
    "Sheikhupura",
    "Rahim Yar Khan",
    "Jhang",
    "Mardan",
    "Gujrat",
    "Kasur",
    "Dera Ghazi Khan",
    "Sahiwal",
    "Nawabshah",
    "Mirpur Khas",
    "Okara",
    "Wah Cantonment",
    "Hyderabad Sindh",
  ];

  const regions = ["Pakistan", "Punjab", "Sindh", "KPK", "Khyber Pakhtunkhwa", "Balochistan", "Azad Kashmir"];

  const qualities = [
    "top rated",
    "top-rated",
    "best",
    "leading",
    "trusted",
    "professional",
    "reliable",
    "premier",
    "experienced",
    "certified",
    "quality",
    "renowned",
    "reputable",
    "established",
    "expert",
    "skilled",
    "licensed",
    "affordable",
    "premium",
    "no 1",
    "number one",
    "top",
    "finest",
    "well known",
    "recommended",
  ];

  const cores = [
    "construction company",
    "building company",
    "construction firm",
    "building contractors",
    "civil contractors",
    "general contractors",
    "construction contractors",
    "commercial construction",
    "residential construction",
    "grey structure",
    "grey structure contractors",
    "grey structure company",
    "RCC construction",
    "concrete structure",
    "house construction",
    "home builders",
    "villa construction",
    "bungalow construction",
    "plaza construction",
    "high rise construction",
    "industrial construction",
    "warehouse construction",
    "factory construction",
    "turnkey construction",
    "design and build",
    "construction services",
    "building services",
    "civil works",
    "foundation work",
    "excavation and foundation",
    "slab casting",
    "roof structure",
    "structural work",
    "building renovation",
    "remodeling contractors",
    "interior fit out",
    "fit out company",
    "project management construction",
    "site development",
    "infrastructure construction",
    "road construction",
    "building maintenance",
    "construction consultancy",
    "quantity surveying",
    "building materials supply",
    "steel structure",
    "masonry work",
    "plaster and finishing",
    "electrical civil coordination",
    "HVAC construction support",
  ];

  const extras = [
    "construction in Pakistan",
    "builders in Pakistan",
    "Lahore construction company",
    "Karachi builders",
    "Islamabad construction",
    "Pakistan grey structure",
    "10 marla construction",
    "1 kanal house construction",
    "commercial plaza grey structure",
    "office building construction",
    "retail construction",
    "hospital building construction",
    "school building construction",
    "mosque construction",
    "apartment construction",
    "duplex construction",
    "basement construction",
    "DHA construction",
    "Bahria Town construction",
    "CPEC related construction",
    "sustainable construction Pakistan",
    "earthquake resistant construction",
    "energy efficient building",
    "low cost housing construction",
    "luxury home construction",
    "modern architecture construction",
    "traditional construction Pakistan",
    "construction timeline",
    "construction cost Pakistan",
    "per square foot construction",
    "labour contractors",
    "mason services",
    "steel fixer contractors",
    "shuttering contractors",
  ];

  extras.forEach(add);
  brands.forEach(add);

  for (const b of brands) {
    add(`${b} Pakistan`);
    add(`${b} construction`);
    add(`${b} builders`);
    add(`${b} grey structure`);
    for (const c of cities.slice(0, 12)) {
      add(`${b} ${c}`);
      add(`${b} construction ${c}`);
    }
  }

  for (const q of qualities) {
    for (const k of cores) {
      add(`${q} ${k}`);
      add(`${q} ${k} Pakistan`);
      for (const r of regions) {
        add(`${q} ${k} ${r}`);
      }
      for (const c of cities) {
        add(`${q} ${k} ${c}`);
        add(`${k} ${c}`);
        add(`${c} ${k}`);
      }
    }
  }

  for (const k of cores) {
    add(`${k} near me`);
    add(`hire ${k}`);
    add(`best ${k} near Lahore`);
  }

  const arr = Array.from(set);
  if (arr.length > 1500) return arr.slice(0, 1500);

  let i = 0;
  while (arr.length < 1500 && i < 5000) {
    const b = brands[i % brands.length];
    const c = cities[i % cities.length];
    const k = cores[i % cores.length];
    const q = qualities[i % qualities.length];
    add(`${b} ${q} ${k} ${c}`);
    add(`${q} ${b} ${k} Pakistan`);
    i += 1;
  }

  return Array.from(set).slice(0, 1500);
}

export const SITE_SEO_KEYWORDS = buildSiteSeoKeywords();
