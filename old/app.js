/* ==========================================================
   Art Blk SMP Wiki: app logic
   ----------------------------------------------------------
   EDIT CONTENT HERE. Everything on the site is generated from
   the `serverData` object just below. Save the file and refresh.
   ========================================================== */
const serverData = {
  serverName: "BASIL's Journal",
  season: "",
  progressKey: "season4",
  ip: "139.99.38.79:25621",
  footer: "Art Blk SMP Wiki. Community-maintained. Stats may change between seasons.",

  logo: "img/mainlogo.png",
  music: { src: "audio/theme.mp3", title: "Prontera 1 Hour - Ragnarok BGM Music" },

  home: {
    title: "Welcome to Art Blk SMP",
    paragraphs: [
      "This is the community guide for Art Blk SMP, a survival server with custom bosses, skills and world mechanics.",
      "Use the tabs to find boss strategies, meet the NPCs, learn the basics, browse photos and catch up on the latest updates."
    ]
  },

  tabs: [
    { id: "home",       label: "Home",                type: "home" },
    { id: "bosses",     label: "Bosses",              type: "bosses" },
    { id: "structures", label: "Structures and NPCs", type: "structures", title: "Structures and NPCs",
      intro: "Landmarks of the server and the people you will meet there. Select a card to see who lives or visits." },
    { id: "guide",      label: "Basic Guide",         type: "preview", title: "Basic Guide",
      intro: "The essentials for new players: fighting, levelling up and surviving the weather." },
    { id: "photos",     label: "Photos",              type: "photos",  title: "Photos",
      intro: "Snapshots, builds and adventures captured across Art Blk SMP." },
    { id: "updates",    label: "Updates",             type: "preview", title: "Updates",
      intro: "What changed in each version of the server." }
  ],

  // ---- BOSS CATEGORIES (filter buttons) ----
  // Add new category names here or directly on a boss's `realm` field.
  bossCategories: ["Monster Expansion", "Cataclysm", "BOMD", "Minecraft", "Legendary Monster"],

  // ---- BOSS ENTRIES --------------------------------------------------
  // TEMPLATE (copy & paste to add more bosses anytime):
  // {
  //   id: "new-boss-id",
  //   realm: "BOMD", // Monster Expansion | Cataclysm | BOMD | Minecraft | Legendary Monster
  //   name: "New Boss Name",
  //   art: "linear-gradient(135deg,#dfe8c2,#b9c98f)",
  //   health: "800 HP",
  //   tier: 3,
  //   armor: "14 Armor",
  //   lore: "Handwritten note on the left page.",
  //   spawn: "How to summon or find the boss.",
  //   attacks: [
  //     { name: "Attack Name", tell: "How to read and counter this move." }
  //   ],
  //   gear: "Level 30",
  //   gearNote: "Recommended armor, potions, and weapons.",
  //   loot: [
  //     { item: "Drop Name", rarity: "rare", chance: "15%", note: "Drop effect or use" }
  //   ]
  // },
  bosses: [
    // --- Monster Expansion ---
    {
      id: "thornmother", realm: "Monster Expansion", name: "The Thornmother",
      art: "linear-gradient(135deg,#dfe8c2,#b9c98f)",
      health: "600 HP", tier: 2, armor: "10 Armor",
      lore: "A stag-shaped tangle of briar and bone that wakes when a full sunflower ring is planted in a dark forest clearing.",
      spawn: "Place 8 sunflowers around a Mossy Altar in a Dark Forest, then right-click the altar with a Thorn Heart at night.",
      attacks: [
        { name: "Bramble Sweep", tell: "Antlers glow green and she rears back. Sidestep left or right." },
        { name: "Seed Barrage", tell: "Pods swell on her back. Strafe in a zigzag and use a shield." },
        { name: "Rootsnare", tell: "Ground cracks in a circle under you. Jump or sprint out within 1 second." },
        { name: "Wilt Phase", tell: "Below 30% health she heals from nearby plants. Clear grass and leaves first." }
      ],
      gear: "Level 20", gearNote: "Iron or better armor, a shield and a bow. No special enchantments needed.",
      loot: [
        { item: "Thorn Heart", rarity: "common", chance: "100%", note: "Reusable summoning key" },
        { item: "Briarbound Bow", rarity: "uncommon", chance: "22%", note: "Poisons targets on full draw" },
        { item: "Sunpetal Charm", rarity: "rare", chance: "8%", note: "Faster natural regeneration in daylight" },
        { item: "Antler Crown", rarity: "legendary", chance: "1.5%", note: "Cosmetic helmet with plant aura" }
      ]
    },

    // --- Cataclysm ---
    {
      id: "cinder-warden", realm: "Cataclysm", name: "Cinder Warden",
      art: "linear-gradient(135deg,#f3d9a4,#e6a15a)",
      health: "1,400 HP", tier: 4, armor: "20 Armor",
      lore: "A bastion guardian bound in obsidian plates. It patrols the Ashfall Citadel and attacks anyone who carries unclaimed relics.",
      spawn: "Always present in the Ashfall Citadel (Nether). It respawns 2 real-time hours after defeat.",
      attacks: [
        { name: "Magma Slam", tell: "Raises both fists and the floor turns orange. Back away at least 6 blocks." },
        { name: "Ember Volley", tell: "Chest vents flare. Fireballs follow in a fan. Block or strafe." },
        { name: "Obsidian Guard", tell: "Plates close and he takes 80% less damage. Wait it out and heal." },
        { name: "Lava Pull", tell: "A red chain appears. Break line of sight behind pillars." }
      ],
      gear: "Level 45", gearNote: "Fire Resistance II potions, Protection III armor, 2 stacks of golden apples.",
      loot: [
        { item: "Obsidian Plate", rarity: "common", chance: "100%", note: "Crafting material for Warden gear" },
        { item: "Emberforged Axe", rarity: "rare", chance: "12%", note: "Ignites enemies on critical hits" },
        { item: "Warden's Core", rarity: "rare", chance: "6%", note: "Unlocks the Citadel vault" },
        { item: "Cinder Wings", rarity: "legendary", chance: "0.8%", note: "Short controlled glide, fire immune" }
      ]
    },
    {
      id: "tide-king", realm: "Cataclysm", name: "The Drowned King",
      art: "linear-gradient(135deg,#cfe3dc,#9fc3bd)",
      health: "900 HP", tier: 3, armor: "16 Armor",
      lore: "Once the ruler of a sunken kingdom, now a coral-crusted spirit that rises with the tide at ocean monuments.",
      spawn: "Throw a Tidal Pearl into the Monument's central pool during rain.",
      attacks: [
        { name: "Riptide Charge", tell: "Trident spins and water swirls. Dodge sideways and avoid open water." },
        { name: "Summon Drowned", tell: "A horn sounds. Kill adds quickly or they swarm you." },
        { name: "Whirlpool", tell: "Surface sinks in a spiral. Swim up and out, and use Respiration." }
      ],
      gear: "Level 30", gearNote: "Respiration III helmet, Depth Strider boots, Impaling or Sharpness weapon.",
      loot: [
        { item: "Tidal Pearl", rarity: "common", chance: "100%", note: "Key for rematch" },
        { item: "Coral Shield", rarity: "uncommon", chance: "25%", note: "Blocks projectiles at a wider angle" },
        { item: "Kingsong Trident", rarity: "rare", chance: "7%", note: "Lightning on throw, even without rain" },
        { item: "Crown of Tides", rarity: "legendary", chance: "1%", note: "Permanent Water Breathing" }
      ]
    },

    // --- BOMD (3 Placeholders) ---
    {
      id: "bomd-placeholder-1", realm: "BOMD", name: "Night Lich (Placeholder)",
      art: "linear-gradient(135deg,#c9d6e8,#8ca4c8)",
      health: "1,000 HP", tier: 4, armor: "14 Armor",
      lore: "Placeholder lore for BOMD Boss 1. Replace this entry with your actual boss details and image.",
      spawn: "Placeholder spawn condition: locate the Lich Tower using Soul Stars.",
      attacks: [
        { name: "Astral Barrage", tell: "Placeholder telegraph: strafe continuously when orbs gather." },
        { name: "Phantom Summon", tell: "Placeholder telegraph: clear summoned minions to lower shield." }
      ],
      gear: "Level 35", gearNote: "Placeholder gear recommendation: Diamond/Netherite armor and ranged bow.",
      loot: [
        { item: "Ancient Soul", rarity: "rare", chance: "100%", note: "Placeholder drop description" }
      ]
    },
    {
      id: "bomd-placeholder-2", realm: "BOMD", name: "Obsidilith (Placeholder)",
      art: "linear-gradient(135deg,#d8c8eb,#9f84c4)",
      health: "1,200 HP", tier: 4, armor: "18 Armor",
      lore: "Placeholder lore for BOMD Boss 2. Replace this entry with your actual boss details and image.",
      spawn: "Placeholder spawn condition: found atop End Island obsidian structures.",
      attacks: [
        { name: "Void Spike", tell: "Placeholder telegraph: watch floor runes and sprint out of line." },
        { name: "Pillar Shield", tell: "Placeholder telegraph: destroy surrounding end crystals first." }
      ],
      gear: "Level 40", gearNote: "Placeholder gear recommendation: Slow Falling potions and high-efficiency pickaxe.",
      loot: [
        { item: "Obsidian Heart", rarity: "rare", chance: "100%", note: "Placeholder drop description" }
      ]
    },
    {
      id: "bomd-placeholder-3", realm: "BOMD", name: "Nether Gauntlet (Placeholder)",
      art: "linear-gradient(135deg,#f0c2b4,#d47a63)",
      health: "950 HP", tier: 3, armor: "16 Armor",
      lore: "Placeholder lore for BOMD Boss 3. Replace this entry with your actual boss details and image.",
      spawn: "Placeholder spawn condition: break the sealed eye inside Nether arenas.",
      attacks: [
        { name: "Crushing Fist", tell: "Placeholder telegraph: dash sideways when the gauntlet locks onto you." },
        { name: "Laser Gaze", tell: "Placeholder telegraph: take cover behind arena walls." }
      ],
      gear: "Level 35", gearNote: "Placeholder gear recommendation: Fire Resistance and strong melee weapon.",
      loot: [
        { item: "Blazing Core", rarity: "rare", chance: "100%", note: "Placeholder drop description" }
      ]
    },

    // --- Minecraft (3 Placeholders) ---
    {
      id: "minecraft-placeholder-1", realm: "Minecraft", name: "Ender Dragon (Placeholder)",
      art: "linear-gradient(135deg,#d6c6e0,#9b7eb3)",
      health: "200 HP", tier: 3, armor: "10 Armor",
      lore: "Placeholder lore for Minecraft Boss 1. Replace or expand with custom server mechanics.",
      spawn: "Enter the End Portal or respawn using 4 End Crystals on the exit portal.",
      attacks: [
        { name: "Dragon Breath", tell: "Avoid purple lingering clouds around the central fountain." },
        { name: "Wing Charge", tell: "Keep water buckets or Ender Pearls ready to negate fall damage." }
      ],
      gear: "Level 25", gearNote: "Bow with Infinity/Power, water bucket, carved pumpkin, slow falling potions.",
      loot: [
        { item: "Dragon Egg", rarity: "legendary", chance: "100%", note: "Trophy item" }
      ]
    },
    {
      id: "minecraft-placeholder-2", realm: "Minecraft", name: "Wither (Placeholder)",
      art: "linear-gradient(135deg,#cfc9c2,#8f877d)",
      health: "300 HP", tier: 3, armor: "12 Armor",
      lore: "Placeholder lore for Minecraft Boss 2. Replace or expand with custom server mechanics.",
      spawn: "Arrange 4 Soul Sand/Soil in a T-shape with 3 Wither Skeleton Skulls on top.",
      attacks: [
        { name: "Wither Skulls", tell: "Strafe constantly; blue skulls break obsidian and blocks." },
        { name: "Wither Armor", tell: "Below 50% HP it becomes immune to arrows—switch to melee." }
      ],
      gear: "Level 30", gearNote: "Smite V sword, Milk buckets, Regeneration and Strength potions.",
      loot: [
        { item: "Nether Star", rarity: "legendary", chance: "100%", note: "Used to craft Beacons" }
      ]
    },
    {
      id: "minecraft-placeholder-3", realm: "Minecraft", name: "Warden (Placeholder)",
      art: "linear-gradient(135deg,#b5d4d6,#629499)",
      health: "500 HP", tier: 5, armor: "20 Armor",
      lore: "Placeholder lore for Minecraft Boss 3. Replace or expand with custom server mechanics.",
      spawn: "Trigger Sculk Shriekers 4 times inside the Deep Dark or Ancient City.",
      attacks: [
        { name: "Sonic Boom", tell: "Pierces armor and shields—keep maximum distance or use cover." },
        { name: "Heavy Slam", tell: "Deals massive melee damage; use wool blocks and snowballs to distract." }
      ],
      gear: "Level 45", gearNote: "Swift Sneak leggings, Wool blocks, Golden Apples, Night Vision.",
      loot: [
        { item: "Sculk Catalyst", rarity: "uncommon", chance: "100%", note: "Spreads sculk blocks" }
      ]
    },

    // --- Legendary Monster (3 Placeholders) ---
    {
      id: "legendary-placeholder-1", realm: "Legendary Monster", name: "Frostbitten Colossus (Placeholder)",
      art: "linear-gradient(135deg,#cfe6f5,#89bad9)",
      health: "1,100 HP", tier: 4, armor: "18 Armor",
      lore: "Placeholder lore for Legendary Monster Boss 1. Replace with your custom boss details.",
      spawn: "Placeholder spawn condition: summon inside frozen tundra ruins.",
      attacks: [
        { name: "Glacial Stomp", tell: "Placeholder telegraph: jump as the ice shockwave approaches." },
        { name: "Permafrost Breath", tell: "Placeholder telegraph: flank behind the boss during wind-up." }
      ],
      gear: "Level 40", gearNote: "Placeholder gear recommendation: Warmth gear and Fire Aspect weapon.",
      loot: [
        { item: "Frozen Relic", rarity: "rare", chance: "100%", note: "Placeholder drop description" }
      ]
    },
    {
      id: "legendary-placeholder-2", realm: "Legendary Monster", name: "Dune Sovereign (Placeholder)",
      art: "linear-gradient(135deg,#f2dfb3,#cfa85b)",
      health: "1,050 HP", tier: 4, armor: "16 Armor",
      lore: "Placeholder lore for Legendary Monster Boss 2. Replace with your custom boss details.",
      spawn: "Placeholder spawn condition: awaken at the sunken desert pyramid altar.",
      attacks: [
        { name: "Sandstorm Surge", tell: "Placeholder telegraph: watch swirling dust trails before dash." },
        { name: "Scarab Swarm", tell: "Placeholder telegraph: use sweeping edge attacks to clear adds." }
      ],
      gear: "Level 38", gearNote: "Placeholder gear recommendation: Sweeping Edge sword and speed potions.",
      loot: [
        { item: "Sunstone Crest", rarity: "rare", chance: "100%", note: "Placeholder drop description" }
      ]
    },
    {
      id: "legendary-placeholder-3", realm: "Legendary Monster", name: "Overgrown Behemoth (Placeholder)",
      art: "linear-gradient(135deg,#cbe3be,#7da868)",
      health: "1,300 HP", tier: 5, armor: "22 Armor",
      lore: "Placeholder lore for Legendary Monster Boss 3. Replace with your custom boss details.",
      spawn: "Placeholder spawn condition: offer ancient jungle totems at the overgrown shrine.",
      attacks: [
        { name: "Canopy Crush", tell: "Placeholder telegraph: sprint clear of the shadow indicator." },
        { name: "Spore Cloud", tell: "Placeholder telegraph: back out of the green mist ring." }
      ],
      gear: "Level 45", gearNote: "Placeholder gear recommendation: High-tier armor and antidotes.",
      loot: [
        { item: "Verdant Heart", rarity: "legendary", chance: "100%", note: "Placeholder drop description" }
      ]
    }
  ],

  // ---- STRUCTURES & NPCs -----------------------------------------------
  structures: [
    {
      id: "market", name: "Market",
      teaser: "The trading hub of Art Blk SMP, with stalls, a smithy and travelling merchants.",
      info: "The busiest spot on the server. Sell your boss loot, repair gear and stock up on supplies. Residents are always around; visitors only drop by now and then.",
      location: "Spawn plaza, just north of the Sunflower Gate",
      npcs: [
        { name: "Marigold", role: "Head merchant", category: "Permanent resident",
          description: "Runs the largest stall and buys most boss drops at fair prices. Ask her about daily trades." },
        { name: "Old Tobias", role: "Blacksmith", category: "Permanent resident",
          description: "Repairs and upgrades gear. He pays extra for Obsidian Plates and other crafting materials." },
        { name: "Fern", role: "Herbalist", category: "Permanent resident",
          description: "Sells potions, seeds and sunflower oil. A good stop before a boss fight." },
        { name: "Captain Brine", role: "Travelling sailor", category: "Visitor", schedule: "Arrives by boat on rainy days",
          description: "Sells rare ocean items, including Tidal Pearls. He leaves when the sky clears." },
        { name: "Zephyr", role: "Wandering bard", category: "Visitor", schedule: "Weekends only",
          description: "Plays songs that grant a short buff to anyone who listens. Tips are welcome." }
      ]
    },
    {
      id: "sunwalkers", name: "Sunwalkers",
      teaser: "A sun-baked outpost of wanderers and scouts who guard the eastern fields.",
      info: "Placeholder text: describe the Sunwalkers here. This is a camp where travellers rest, trade stories and pick up quests before heading out into the wild.",
      location: "Placeholder location: east of the Sunflower Gate",
      npcs: [
        { name: "Sol", role: "Camp leader", category: "Permanent resident",
          description: "Placeholder description. Leads the Sunwalkers and hands out the camp's main quests." },
        { name: "Dawn", role: "Scout", category: "Permanent resident",
          description: "Placeholder description. Knows the safest routes through the surrounding biomes." },
        { name: "Ember", role: "Wandering trader", category: "Visitor", schedule: "Placeholder: arrives at noon on clear days",
          description: "Placeholder description. Sells rare goods that can't be found at the Market." }
      ]
    }
  ],

  // ---- PHOTOS ALBUM TAB -------------------------------------------------
  // HOW TO ADD AN ALBUM ENTRY:
  // Copy one { ... } block below and add as many `images` and `paragraphs` as you want.
  photos: [
    {
      title: "Opening Day at Spawn",
      date: "Season 4",
      images: [
        { src: "img/photos/spawn-1.png", caption: "The Sunflower Gate at sunrise" },
        { src: "img/photos/spawn-2.png", caption: "Gathering at the Market plaza" }
      ],
      paragraphs: [
        "Everyone gathered at the Sunflower Gate as the world borders opened for the very first time.",
        "Within the first few hours, players had already set up trading stalls and started scouting the surrounding forests."
      ]
    },
    {
      title: "First Thornmother Expedition",
      date: "Week 1",
      images: [
        { src: "img/photos/thornmother-party.png", caption: "Preparing the Mossy Altar at night" }
      ],
      paragraphs: [
        "A group of players teamed up in iron armor to plant the sunflower ring and summon The Thornmother.",
        "After dodging her bramble sweeps and clearing the forest undergrowth, the party claimed the first Thorn Heart on the server."
      ]
    }
  ],

  // ---- CARD TABS (Basic Guide, Updates) ---------------------------------
  previews: {
    guide: [
      { title: "Combat Skills", teaser: "Weapon skills, dodging and how to get the most out of every fight.",
        topics: ["Melee, ranged and magic skills", "Dodging and blocking", "Combos and cooldowns"] },
      { title: "Skill Trees", teaser: "Choose a path, spend your points and unlock new perks.",
        topics: ["How skill points are earned", "Available paths", "Perks unlocked at each level"] },
      { title: "Temperature", teaser: "Stay warm in the cold and cool in the heat to avoid taking damage.",
        topics: ["Hot and cold biomes", "Gear and items that help", "Signs of overheating and freezing"] }
    ],
    updates: [
      { title: "Update 1.0", teaser: "The first release of the server.",
        topics: ["Core bosses and mobs", "Spawn, market and NPCs", "Starting skills"] },
      { title: "Update 1.1", teaser: "New content and balance changes.",
        topics: ["New bosses", "Balance changes", "Bug fixes"] },
      { title: "Update 1.2", teaser: "More structures, NPCs and quality-of-life changes.",
        topics: ["New structures and NPCs", "Quality-of-life changes", "Bug fixes"] }
    ]
  }
};

/* ==========================================================
   Rendering code
   ========================================================== */
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = (id) => document.getElementById(id);
const roman = (n) => ["", "I", "II", "III", "IV", "V"][n] || n;

const tablist = $("tablist"), main = $("main"), modal = $("modal");
const modalWindow = modal.querySelector(".modal-window"), modalContent = $("modal-content");

/* ---------- Saved progress (defeated bosses) ---------- */
const STORAGE_KEY = `wiki-defeated-${serverData.progressKey || "v1"}`;
let defeated = new Set();
try { defeated = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []); } catch (_) { /* ignore */ }

function toggleDefeated(id) {
  if (defeated.has(id)) defeated.delete(id); else defeated.add(id);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...defeated])); } catch (_) { /* ignore */ }
  refreshChecks();
}

function refreshChecks() {
  const scope = serverData.bosses.filter((b) => state.realm === "All" || b.realm === state.realm);
  const done = scope.filter((b) => defeated.has(b.id)).length;
  const counter = $("progress");
  if (counter) counter.textContent = `${done} of ${scope.length} defeated`;
  main.querySelectorAll("[data-check]").forEach((el) => {
    const on = defeated.has(el.dataset.check);
    el.setAttribute("aria-pressed", on);
    const label = el.querySelector(".mark-label");
    if (label) label.textContent = on ? "Defeated" : "Mark as defeated";
  });
  $("dossier")?.querySelector(".entry")?.classList.toggle("is-defeated", defeated.has(state.selected));
}

/* ---------- Boss browser ---------- */
const state = { realm: "All", query: "", selected: serverData.bosses[0]?.id };
const bossById = (id) => serverData.bosses.find((b) => b.id === id);

// Supports @category search (e.g. "@monster" -> Monster Expansion, "@bomd" -> BOMD) plus normal text search
const matchesQuery = (b) => {
  const q = state.query.trim();
  if (!q) return true;

  const tokens = q.split(/\s+/);
  const realmTokens = tokens.filter((t) => t.startsWith("@") && t.length > 1).map((t) => t.slice(1));
  const textTokens = tokens.filter((t) => !t.startsWith("@"));

  if (realmTokens.length) {
    const realmLower = String(b.realm || "").toLowerCase();
    if (!realmTokens.every((rt) => realmLower.includes(rt))) return false;
  }

  if (!textTokens.length) return true;
  const hay = [
    b.name,
    b.realm,
    b.armor,
    ...(b.attacks || []).map((a) => a.name),
    ...(b.loot || []).map((l) => l.item)
  ].join(" ").toLowerCase();

  return textTokens.every((w) => hay.includes(w));
};

const visibleBosses = () => serverData.bosses.filter((b) => (state.realm === "All" || b.realm === state.realm) && matchesQuery(b));

// Preserve dots (e.g. update-1.0.png) while slugifying spaces/symbols
const slug = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
const bossImg = (b) => b.image || `img/${slug(b.realm)}/${slug(b.id)}.png`;
const lootImg = (b, l) => l.image || `img/icons/${slug(b.id)}/${slug(l.item)}.png`;
const lootIcon = (b, l, cls) => `<img class="${cls}" src="${esc(lootImg(b, l))}" alt="" onerror="this.hidden=true">`;
const art = (b) => `<div class="art"${b.art ? ` style="--art:${esc(b.art)}"` : ""}><img src="${esc(bossImg(b))}" alt="${esc(b.name)}" loading="lazy" onerror="this.hidden=true"></div>`;

function renderBossPanel() {
  const configured = serverData.bossCategories || [];
  const dynamic = serverData.bosses.map((b) => b.realm).filter(Boolean);
  const realms = ["All", ...new Set([...configured, ...dynamic])];
  return `<div class="split">
    <aside class="index" aria-label="Contents">
      <h2 class="col-title">Contents</h2>
      <label class="search"><span class="sr">Search bosses</span><input type="search" id="boss-search" placeholder="Search bosses or @category…" autocomplete="off" spellcheck="false"></label>
      <div class="seg" role="group" aria-label="Filter by category">
        ${realms.map((r) => `<button type="button" data-realm="${esc(r)}" aria-pressed="${r === "All"}">${esc(r)}</button>`).join("")}
      </div>
      <p class="progress" id="progress"></p>
      <ul class="index-list" id="index-list"></ul>
      <span class="pg">1</span>
    </aside>
    <section class="dossier-col" aria-label="Journal entry">
      <h2 class="col-title">Journal entry</h2>
      <article class="dossier" id="dossier" aria-live="polite"></article>
    </section>
  </div>`;
}

// Fills the Contents list without 01/02/03 numbering
function renderIndex() {
  const shown = visibleBosses();
  if (!shown.length) { $("index-list").innerHTML = `<li class="no-results">No bosses match your search.</li>`; return; }
  $("index-list").innerHTML = shown.map((b) => {
    return `<li>
      <button class="index-item" type="button" data-boss="${esc(b.id)}" aria-current="${b.id === state.selected}">
        <span class="thumb" aria-hidden="true"${b.art ? ` style="--art:${esc(b.art)}"` : ""}><img src="${esc(bossImg(b))}" alt="" loading="lazy" onerror="this.hidden=true"></span>
        <span><b>${esc(b.name)}</b><em><span class="sr">Tier </span>${roman(b.tier)}</em></span>
      </button>
      <button class="check" type="button" data-check="${esc(b.id)}" aria-pressed="${defeated.has(b.id)}" aria-label="Defeated: ${esc(b.name)}"><span aria-hidden="true">✓</span></button>
    </li>`;
  }).join("");
}

function renderDossier(animate = false) {
  const b = bossById(state.selected), el = $("dossier");
  if (!b || !visibleBosses().includes(b)) { el.innerHTML = `<p class="empty">${state.query ? "No bosses match your search." : "No bosses in this category yet."}</p>`; return; }
  const page = serverData.bosses.indexOf(b) + 2;
  const done = defeated.has(b.id);
  const attacks = b.attacks.map((a) => `<li><strong>${esc(a.name)}:</strong> ${esc(a.tell)}</li>`).join("");
  const loot = b.loot.map((l) => `<div class="chip"><i class="r-${esc(l.rarity)}">${lootIcon(b, l, "chip-img")}</i>${esc(l.item)}</div>`).join("");
  el.innerHTML = `
    <div class="entry${done ? " is-defeated" : ""}">
      <div class="l-head">
        <h3>${esc(b.name)}</h3>
      </div>
      <div class="d-stats">
        <div><b>${esc(b.health)}</b><small>Health</small></div>
        <div><b>Tier ${roman(b.tier)}</b><small>Difficulty</small></div>
        <div><b>${esc(b.armor)}</b><small>Armor Points</small></div>
      </div>
      <div class="e-body">
        <div class="e-left">
          <figure class="photo"><button class="zoom" type="button" data-open="image" data-key="${esc(b.id)}" aria-haspopup="dialog" aria-label="Enlarge image of ${esc(b.name)}">${art(b)}</button><span class="done-stamp" aria-hidden="true">Defeated</span></figure>
          <p class="note">${esc(b.lore)}</p>
          <button class="mark" type="button" data-check="${esc(b.id)}" aria-pressed="${done}"><span class="box" aria-hidden="true">✓</span><span class="mark-label">${done ? "Defeated" : "Mark as defeated"}</span></button>
        </div>
        <div class="strategy">
          <h4>More Details</h4><ul>${attacks}</ul>
          <h4>Loot drops</h4><div class="loot-row">${loot}</div>
          <button class="btn" type="button" data-open="boss" data-key="${esc(b.id)}" aria-haspopup="dialog">Read the full entry</button>
        </div>
      </div>
      <span class="pg">${page}</span>
    </div>`;
  if (animate) {
    el.scrollTop = 0;
    el.classList.remove("swap");
    void el.offsetWidth;
    el.classList.add("swap");
  }
}

function setRealm(realm) {
  state.realm = realm;
  main.querySelectorAll("[data-realm]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.realm === realm));
  applyFilters(true);
}

function applyFilters(animate = false) {
  const shown = visibleBosses();
  const prevSelected = state.selected;
  if (!shown.some((b) => b.id === state.selected)) state.selected = shown[0]?.id;
  const changedBoss = state.selected !== prevSelected;
  renderIndex();
  renderDossier(animate && changedBoss);
  refreshChecks();
}

function selectBoss(id) {
  const b = bossById(id);
  if (!b) return;
  const changed = state.selected !== id;
  state.selected = id;
  if (!visibleBosses().includes(b)) {
    state.query = "";
    const box = $("boss-search"); if (box) box.value = "";
    setRealm("All");
  } else {
    renderDossier(changed);
  }
  const list = $("index-list");
  list.querySelectorAll(".index-item").forEach((x) => x.setAttribute("aria-current", x.dataset.boss === id));
  if (matchMedia("(max-width: 899px)").matches) {
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    $("dossier").closest(".dossier-col").scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  } else list.querySelector('[aria-current="true"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
}

/* ---------- Pop-up content ---------- */
function bossModal(b) {
  const loot = b.loot.map((l) => `<tr><td>${lootIcon(b, l, "loot-ico")}${esc(l.item)}</td><td><span class="rarity r-${esc(l.rarity)}">${esc(l.rarity)}</span></td><td>${esc(l.chance)}</td><td>${esc(l.note)}</td></tr>`).join("");
  return `
    <div class="m-head"><h3 id="modal-title">${esc(b.name)}</h3></div>
    <div class="detail">
      <h4>Lore</h4><p>${esc(b.lore)}</p>
      <h4>How to spawn</h4><p>${esc(b.spawn)}</p>
      <h4>Recommended gear</h4><p><span class="gear">${esc(b.gear)}</span>${esc(b.gearNote)}</p>
      <h4>Loot &amp; drops</h4>
      <div class="loot-wrap"><table class="loot">
        <thead><tr><th scope="col">Item</th><th scope="col">Rarity</th><th scope="col">Chance</th><th scope="col">Notes</th></tr></thead>
        <tbody>${loot}</tbody></table></div>
    </div>`;
}

const cardImg = (item, folder, name) => item.image || `img/${folder}/${slug(name)}.png`;
const cardBanner = (src, alt) => `<div class="ph-banner"><img src="${esc(src)}" alt="${esc(alt)}" onload="this.parentNode.classList.add('has-img')" onerror="this.remove()"></div>`;

function imageModal(b) {
  return `<div class="lb-body"><h3 id="modal-title" class="lb-title">${esc(b.name)}</h3><img class="lb-img" src="${esc(bossImg(b))}" alt="${esc(b.name)}"></div>`;
}

function photoLightboxModal(src, title) {
  return `<div class="lb-body"><h3 id="modal-title" class="lb-title">${esc(title)}</h3><img class="lb-img" src="${esc(src)}" alt="${esc(title)}"></div>`;
}

function previewModal(item, tabId) {
  const topics = (item.topics || []).map((p) => `<li>${esc(p)}</li>`).join("");
  return `
    ${cardBanner(cardImg(item, tabId, item.title), item.title)}
    <div class="modal-text">
      <h3 id="modal-title">${esc(item.title)}</h3>
      <p>${esc(item.teaser)}</p>
      ${topics ? `<h4>What's inside</h4><ul>${topics}</ul>` : ""}
    </div>`;
}

/* ---------- Structures & NPCs ---------- */
const npcHTML = (n) => `
  <details class="npc">
    <summary>
      <span class="npc-name"><b>${esc(n.name)}</b><small>${esc(n.role)}</small></span>
    </summary>
    <div class="npc-desc">
      <p>${esc(n.description)}</p>
      ${n.schedule ? `<p><strong>When:</strong> ${esc(n.schedule)}</p>` : ""}
    </div>
  </details>`;

function structureModal(s) {
  const groups = {};
  (s.npcs || []).forEach((n) => { (groups[n.category] = groups[n.category] || []).push(n); });
  const lists = Object.entries(groups).map(([cat, list]) =>
    `<h4>${esc(cat)} <span class="count">${list.length}</span></h4><div class="npc-list">${list.map(npcHTML).join("")}</div>`).join("");
  return `
    ${cardBanner(cardImg(s, "structures", s.name), s.name)}
    <div class="modal-text">
      <h3 id="modal-title">${esc(s.name)}</h3>
      <p>${esc(s.info)}</p>
      ${s.location ? `<p><strong>Location:</strong> ${esc(s.location)}</p>` : ""}
      ${lists}
    </div>`;
}

const renderStructure = (s) => `
  <button class="ph-card" type="button" data-open="structure" data-key="${esc(s.id)}" aria-haspopup="dialog">
    ${cardBanner(cardImg(s, "structures", s.name), s.name)}
    <div class="ph-body"><h3>${esc(s.name)}</h3><p>${esc(s.teaser)}</p><span class="badge">${(s.npcs || []).length} NPCs</span></div>
  </button>`;

/* ---------- Photos Album Panel ---------- */
const renderPhotos = () => {
  const albums = serverData.photos || [];
  if (!albums.length) return `<p class="empty">No photo albums added yet.</p>`;
  return `<div class="album-grid">${albums.map((album, aIdx) => {
    const imgs = (album.images || []).map((img, iIdx) => `
      <figure class="album-photo-item" data-open="photo" data-key="${aIdx}:${iIdx}" role="button" tabindex="0" aria-label="Enlarge ${esc(img.caption || album.title)}">
        <div class="album-photo-frame">
          <img src="${esc(img.src)}" alt="${esc(img.caption || album.title)}" loading="lazy" onerror="this.parentNode.classList.add('missing');this.hidden=true">
        </div>
        ${img.caption ? `<figcaption>${esc(img.caption)}</figcaption>` : ""}
      </figure>`).join("");
    const paras = (album.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join("");
    return `
      <article class="album-card">
        <div class="album-head">
          <h3>${esc(album.title)}</h3>
          ${album.date ? `<span class="album-date">${esc(album.date)}</span>` : ""}
        </div>
        ${imgs ? `<div class="album-photos">${imgs}</div>` : ""}
        ${paras ? `<div class="album-story">${paras}</div>` : ""}
      </article>`;
  }).join("")}</div>`;
};

/* ---------- Other panels ---------- */
const renderHome = () => {
  const h = serverData.home;
  return `<div class="home"><h2>${esc(h.title)}</h2>${h.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`;
};
const renderPreview = (item, tabId, i) => `
  <button class="ph-card" type="button" data-open="preview" data-key="${esc(tabId)}:${i}" aria-haspopup="dialog">
    ${cardBanner(cardImg(item, tabId, item.title), item.title)}
    <div class="ph-body"><h3>${esc(item.title)}</h3><p>${esc(item.teaser)}</p></div>
  </button>`;

/* ---------- Build header, tabs and panels ---------- */
function build() {
  $("server-name").textContent = serverData.serverName;
  $("footer-text").textContent = serverData.footer;
  document.title = serverData.serverName;
  if (serverData.logo) {
    const lg = $("server-logo");
    lg.classList.add("has-img");
    lg.innerHTML = `<img src="${esc(serverData.logo)}" alt="" onerror="this.parentNode.classList.remove('has-img');this.parentNode.textContent='Logo'">`;
  }
  $("season").textContent = serverData.season || "";

  // Footer Server IP (replaces Discord)
  const footerIpWrap = $("footer-ip-wrap"), footerIpBtn = $("footer-ip");
  if (!serverData.ip) {
    footerIpWrap.hidden = true;
  } else {
    footerIpBtn.textContent = serverData.ip;
    const legacyCopy = (text) => {
      const t = document.createElement("textarea");
      t.value = text; t.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(t); t.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch (_) { /* ignore */ }
      t.remove(); return ok;
    };
    footerIpBtn.addEventListener("click", async () => {
      let ok = false;
      try { await navigator.clipboard.writeText(serverData.ip); ok = true; } catch (_) { ok = legacyCopy(serverData.ip); }
      footerIpBtn.textContent = ok ? "Copied!" : serverData.ip;
      setTimeout(() => (footerIpBtn.textContent = serverData.ip), 1500);
    });
  }

  // Dark mode toggle
  const root = document.documentElement, themeBtn = $("theme-toggle");
  const paintTheme = () => {
    const dark = root.dataset.theme === "dark";
    themeBtn.querySelector("span").textContent = dark ? "☀️" : "🌙";
    themeBtn.dataset.tip = dark ? "Switch to light mode" : "Switch to dark mode";
    themeBtn.setAttribute("aria-label", themeBtn.dataset.tip);
  };
  themeBtn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("artblk-theme", root.dataset.theme); } catch (_) { /* ignore */ }
    paintTheme();
  });
  paintTheme();

  // Music toggle: autoplays immediately on site load (or on the earliest user interaction if blocked by browser policy)
  const mu = serverData.music, musicBtn = $("music-toggle"), audio = $("theme-audio");
  if (!mu || !mu.src) musicBtn.hidden = true;
  else {
    audio.src = mu.src;
    audio.volume = 0.5;
    const MUSIC_KEY = "artblk-music";
    let missing = false, userPaused = false;
    const paintMusic = () => {
      const on = !audio.paused;
      musicBtn.setAttribute("aria-pressed", on);
      musicBtn.classList.toggle("playing", on);
      musicBtn.querySelector("span").textContent = on ? "🎵" : "🔇";
      musicBtn.dataset.tip = missing ? `Theme file not found: add ${mu.src}`
        : on ? `Now playing: ${mu.title}` : `Click to play: ${mu.title}`;
    };
    const tryPlay = async () => {
      missing = false;
      try {
        await audio.play();
        paintMusic();
        return true;
      } catch (_) {
        paintMusic();
        return false;
      }
    };
    audio.addEventListener("play", paintMusic);
    audio.addEventListener("pause", paintMusic);
    audio.addEventListener("error", () => { missing = true; paintMusic(); });

    musicBtn.addEventListener("click", async () => {
      if (!audio.paused) {
        userPaused = true;
        audio.pause();
        try { localStorage.setItem(MUSIC_KEY, "off"); } catch (_) { /* ignore */ }
        return;
      }
      userPaused = false;
      try { localStorage.removeItem(MUSIC_KEY); } catch (_) { /* ignore */ }
      await tryPlay();
    });
    paintMusic();

    let off = false;
    try { off = localStorage.getItem(MUSIC_KEY) === "off"; } catch (_) { /* ignore */ }
    if (!off) {
      const unlockEvents = ["pointerdown", "click", "keydown", "touchstart", "touchend", "scroll"];
      const cleanup = () => unlockEvents.forEach((ev) => document.removeEventListener(ev, unlock));
      const unlock = (e) => {
        if (userPaused || (e && musicBtn.contains(e.target))) return;
        tryPlay().then((ok) => { if (ok) cleanup(); });
      };
      tryPlay().then((ok) => {
        if (!ok) unlockEvents.forEach((ev) => document.addEventListener(ev, unlock, { passive: true }));
      });
    }
  }

  serverData.tabs.forEach((tab) => {
    const btn = document.createElement("button");
    btn.className = "tab"; btn.id = `tab-${tab.id}`; btn.type = "button";
    btn.setAttribute("role", "tab"); btn.setAttribute("aria-controls", `panel-${tab.id}`);
    btn.dataset.tab = tab.id;
    btn.textContent = tab.label;
    tablist.appendChild(btn);

    let body = "";
    if (tab.type === "home") body = renderHome();
    else if (tab.type === "bosses") body = renderBossPanel();
    else if (tab.type === "structures") body = `<div class="grid">${serverData.structures.map(renderStructure).join("")}</div>`;
    else if (tab.type === "photos") body = renderPhotos();
    else body = `<div class="grid">${(serverData.previews[tab.id] || []).map((it, i) => renderPreview(it, tab.id, i)).join("")}</div>`;

    const panel = document.createElement("section");
    panel.className = "panel" + (tab.type === "bosses" ? " fit" : "") + (tab.type === "home" ? " home-panel" : "");
    panel.id = `panel-${tab.id}`;
    panel.setAttribute("role", "tabpanel"); panel.setAttribute("aria-labelledby", btn.id);
    panel.tabIndex = 0; panel.hidden = true;
    const hasHeader = tab.type === "preview" || tab.type === "structures" || tab.type === "photos";
    panel.innerHTML = (hasHeader ? `<div class="panel-head"><h2 class="col-title">${esc(tab.title)}</h2><p>${esc(tab.intro)}</p></div>` : "") + body;
    main.appendChild(panel);
  });
  if (serverData.bosses.length) setRealm("All");
}

/* ---------- Tab switching ---------- */
function activate(id, { focus = false, updateHash = true } = {}) {
  const tabs = [...tablist.querySelectorAll(".tab")];
  if (!tabs.some((t) => t.dataset.tab === id)) id = serverData.tabs[0].id;
  tabs.forEach((t) => {
    const on = t.dataset.tab === id;
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
    if (on && focus) t.focus();
  });
  main.querySelectorAll(".panel").forEach((p) => (p.hidden = p.id !== `panel-${id}`));
  if (updateHash) history.replaceState(null, "", `#${id}`);
  window.scrollTo({ top: 0 });
}
tablist.addEventListener("click", (e) => { const t = e.target.closest(".tab"); if (t) activate(t.dataset.tab); });
tablist.addEventListener("keydown", (e) => {
  const tabs = [...tablist.querySelectorAll(".tab")];
  const i = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
  const fwd = (i + 1) % tabs.length, back = (i - 1 + tabs.length) % tabs.length;
  const next = { ArrowRight: fwd, ArrowDown: fwd, ArrowLeft: back, ArrowUp: back, Home: 0, End: tabs.length - 1 }[e.key];
  if (next !== undefined) { e.preventDefault(); activate(tabs[next].dataset.tab, { focus: true }); }
});

/* ---------- Pop-up window ---------- */
let lastFocus = null;
function openModal(kind, key) {
  modalWindow.classList.toggle("lightbox", kind === "image" || kind === "photo");
  if (kind === "image") {
    const b = bossById(key);
    if (!b) return;
    modalContent.innerHTML = imageModal(b);
  } else if (kind === "photo") {
    const [aIdx, iIdx] = key.split(":").map(Number);
    const album = (serverData.photos || [])[aIdx];
    const img = album?.images?.[iIdx];
    if (!img) return;
    modalContent.innerHTML = photoLightboxModal(img.src, img.caption || album.title);
  } else if (kind === "boss") {
    const b = bossById(key);
    if (!b) return;
    modalContent.innerHTML = bossModal(b);
  } else if (kind === "structure") {
    const s = serverData.structures.find((x) => x.id === key);
    if (!s) return;
    modalContent.innerHTML = structureModal(s);
  } else {
    const [tabId, i] = key.split(":");
    const item = (serverData.previews[tabId] || [])[Number(i)];
    if (!item) return;
    modalContent.innerHTML = previewModal(item, tabId);
  }
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalContent.scrollTop = 0;
  modalWindow.focus();
}
function closeModal() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocus?.focus();
}

main.addEventListener("click", (e) => {
  const chk = e.target.closest("[data-check]");
  if (chk) return toggleDefeated(chk.dataset.check);
  const open = e.target.closest("[data-open]");
  if (open) {
    if (open.dataset.open === "image" || open.dataset.open === "photo") {
      const im = open.querySelector("img");
      if (!im || im.hidden || !im.complete || !im.naturalWidth) return;
    }
    return openModal(open.dataset.open, open.dataset.key);
  }
  const boss = e.target.closest("[data-boss]");
  if (boss) return selectBoss(boss.dataset.boss);
  const realm = e.target.closest("[data-realm]");
  if (realm) setRealm(realm.dataset.realm);
});
main.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const open = e.target.closest(".album-photo-item[data-open]");
  if (open) { e.preventDefault(); open.click(); }
});
main.addEventListener("input", (e) => {
  if (e.target.id !== "boss-search") return;
  state.query = e.target.value.trim().toLowerCase();
  applyFilters(false);
});
modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") return closeModal();
  if (e.key === "Tab") {
    const f = [...modalWindow.querySelectorAll("button, [href], summary")];
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === modalWindow)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

window.addEventListener("hashchange", () => activate(location.hash.slice(1), { updateHash: false }));

build();
activate(location.hash.slice(1) || serverData.tabs[0].id, { updateHash: false });