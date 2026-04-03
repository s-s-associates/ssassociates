/**
 * Large keyword list for `<meta name="keywords">` + JSON-LD.
 *
 * Crawlers: Next.js emits this in the **server-rendered** `<head>` (View Page Source shows it;
 * Googlebot receives the same HTML). The meta keywords tag is not a Google ranking factor, but
 * it remains in the crawlable document. For **entity understanding**, we also pass a trimmed
 * subset into Organization / LocalBusiness JSON-LD (`keywords` + `knowsAbout`).
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
    "S-S Associates",
    "s-s associates",
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
    "S&S Associates Pakistan",
    "S and S Associates Pakistan",
    "S&S Associates Lahore",
    "S and S Associates Lahore",
    "SS Associates construction",
    "SS Associates construction Pakistan",
    "SS Associates construction Lahore",
    "SS Associates construction Pakistan",
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

  /** Literal slug `ss-associates` — ≥200 unique phrases (inserted early so they remain in the cap). */
  const SS_SLUG = "ss-associates";
  for (const c of cities) {
    add(`${SS_SLUG} ${c}`);
    add(`${SS_SLUG} construction ${c}`);
    add(`${SS_SLUG} builders ${c}`);
    add(`${SS_SLUG} grey structure ${c}`);
    add(`${SS_SLUG} company ${c}`);
    add(`${SS_SLUG} residential ${c}`);
    add(`${SS_SLUG} commercial ${c}`);
    add(`${SS_SLUG} contractors ${c}`);
  }

  /** ~500 list-intent phrases: "top 5 construction companies in Lahore" style (10×10×5). */
  const rankNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const listLocations = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"];
  const listPatterns = [
    (r, loc) => `top ${r} construction companies in ${loc}`,
    (r, loc) => `top ${r} building companies in ${loc}`,
    (r, loc) => `top ${r} construction firms in ${loc}`,
    (r, loc) => `top ${r} builders in ${loc}`,
    (r, loc) => `top ${r} civil contractors in ${loc}`,
    (r, loc) => `top ${r} grey structure companies in ${loc}`,
    (r, loc) => `top ${r} residential construction companies in ${loc}`,
    (r, loc) => `top ${r} commercial construction companies in ${loc}`,
    (r, loc) => `top ${r} house construction companies in ${loc}`,
    (r, loc) => `top ${r} trusted construction companies in ${loc}`,
  ];
  for (const r of rankNumbers) {
    for (const pat of listPatterns) {
      for (const loc of listLocations) {
        add(pat(r, loc));
      }
    }
  }

  /** ≥500 unique phrases each containing literal brand "S&S Associates" (25 cities × 20 patterns). */
  const SN = "S&S Associates";
  const snCities = cities.slice(0, 25);
  const snPatterns = [
    (c) => `${SN} ${c}`,
    (c) => `${SN} construction ${c}`,
    (c) => `${SN} builders ${c}`,
    (c) => `${SN} grey structure ${c}`,
    (c) => `${SN} company ${c}`,
    (c) => `${SN} residential ${c}`,
    (c) => `${SN} commercial ${c}`,
    (c) => `${SN} contractors ${c}`,
    (c) => `${SN} home builders ${c}`,
    (c) => `${SN} turnkey ${c}`,
    (c) => `${SN} design build ${c}`,
    (c) => `${SN} villa ${c}`,
    (c) => `${SN} plaza ${c}`,
    (c) => `${SN} industrial ${c}`,
    (c) => `${SN} RCC ${c}`,
    (c) => `${SN} fit out ${c}`,
    (c) => `${SN} renovation ${c}`,
    (c) => `${SN} projects ${c}`,
    (c) => `${SN} services ${c}`,
    (c) => `${SN} Pakistan ${c}`,
  ];
  for (const pat of snPatterns) {
    for (const c of snCities) {
      add(pat(c));
    }
  }

  /** Curated brand spellings + Lahore intent (user-supplied additions). */
  const curatedLahoreBrand = [
    "S&S Associates",
    "S and S Associates",
    "Ss Associates",
    "S-S Associates",
    "S & S Associates",
    "Ss Assoicates",
    "Ss Asciates",
    "Ss Assocaits",
    "S-S Assoicates",
    "S-S Asciates",
    "S n S Associates",
    "top construction companies in Lahore",
    "best construction company Lahore",
    "top builder Lahore",
    "home builder Lahore",
    "affordable builders Lahore",
    "residential builders Lahore",
    "commercial builders Lahore",
    "reliable construction company Lahore",
    "trusted builders Lahore",
    "building solutions Lahore",
    "grey structure construction Lahore",
    "modern home construction Lahore",
    "Lahore property developers",
    "house construction Lahore",
    "expert builders Lahore",
    "leading construction services Lahore",
    "S&S Associates Lahore",
    "S-S Associates Lahore",
    "SS Associates Lahore",
    "best residential builder Lahore",
    "top construction experts Lahore",
    "custom home builders Lahore",
    "premium builders Lahore",
    "sustainable construction Lahore",
    "modern home builders Lahore",
    "Lahore home renovation services",
    "construction project management Lahore",
    "S&S Associates", "S and S Associates", "Ss Associates", "S-S Associates", "S & S Associates",
"Ss Assoicates", "Ss Asciates", "Ss Assocaits", "S-S Assoicates", "S-S Asciates", "S n S Associates",
"top construction companies in Lahore", "best construction company Lahore", "top builder Lahore",
"home builder Lahore", "affordable builders Lahore", "residential builders Lahore",
"commercial builders Lahore", "reliable construction company Lahore", "trusted builders Lahore",
"building solutions Lahore", "grey structure construction Lahore", "modern home construction Lahore",
"Lahore property developers", "house construction Lahore", "expert builders Lahore",
"leading construction services Lahore", "S&S Associates Lahore", "S-S Associates Lahore",
"SS Associates Lahore", "best residential builder Lahore", "top construction experts Lahore",
"custom home builders Lahore", "premium builders Lahore", "sustainable construction Lahore",
"modern home builders Lahore", "Lahore home renovation services", "construction project management Lahore"
  ];
  curatedLahoreBrand.forEach(add);

  /** ≥100 phrases with literal lowercase "s&s associates" (25 cities × 4 patterns). */
  const snLower = "s&s associates";
  const snLowerCities = cities.slice(0, 25);
  const snLowerPatterns = [
    (c) => `${snLower} ${c}`,
    (c) => `${snLower} construction ${c}`,
    (c) => `${snLower} builders ${c}`,
    (c) => `${snLower} grey structure ${c}`,
  ];
  for (const pat of snLowerPatterns) {
    for (const c of snLowerCities) {
      add(pat(c));
    }
  }

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

  /** Raised so early blocks (ss-associates, top lists, S&S brand) + tail fit. */
  const MAX_KEYWORDS = 2500;
  if (set.size > MAX_KEYWORDS) return Array.from(set).slice(0, MAX_KEYWORDS);

  let i = 0;
  while (set.size < MAX_KEYWORDS && i < 8000) {
    const b = brands[i % brands.length];
    const c = cities[i % cities.length];
    const k = cores[i % cores.length];
    const q = qualities[i % qualities.length];
    add(`${b} ${q} ${k} ${c}`);
    add(`${q} ${b} ${k} Pakistan`);
    i += 1;
  }

  return Array.from(set).slice(0, MAX_KEYWORDS);
}

export const SITE_SEO_KEYWORDS = buildSiteSeoKeywords();

/**
 * Comma-separated keywords for the meta keywords tag (large list; low ranking impact).
 * Caps length so the HTML head stays within practical limits.
 */
export function getMetaKeywordsString(maxChars = 65000) {
  const joined = SITE_SEO_KEYWORDS.join(", ");
  if (joined.length <= maxChars) return joined;
  let cut = joined.slice(0, maxChars);
  const lastComma = cut.lastIndexOf(",");
  if (lastComma > maxChars * 0.85) cut = cut.slice(0, lastComma);
  return cut.trim();
}

/** Subset for Schema.org `keywords` (keep JSON-LD payload reasonable for parsers). */
export function getStructuredDataKeywordsString(maxChars = 10000) {
  return getMetaKeywordsString(maxChars);
}

/** Curated topics for Schema.org `knowsAbout` (clear intent for Google entity signals). */
export const SITE_KNOWS_ABOUT = [
  "ss-associates",
  "s&s associates",
  "top construction companies Lahore",
  "Construction company Lahore",
  "Grey structure construction",
  "Residential construction Pakistan",
  "Commercial construction Lahore",
  "Home builders Lahore",
  "Building contractors Pakistan",
  "RCC and concrete structure",
  "Project management construction",
  "S&S Associates",
  "Johar Town Lahore construction",
];
