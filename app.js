/* ==========================================================
   Art Blk SMP Wiki: app logic

   EDIT YOUR CONTENT in sections 1-6: every tab has its own section, with its data AND its code together.
   Save the file and refresh the page. Sections 7-8 are the engine; you rarely need to touch them.

   MAP (search for the heading)
    1. SITE SETTINGS ......... name, logo, server IP, footer, music, and the list of tabs
    2. HOME .................. the Home text
    3. BOSSES ................ boss entries, search + category buttons, boss page, saved "defeated" ticks
    4. STRUCTURES AND NPCs ... structure cards and their NPC lists
    5. PHOTOS ................ photo + paragraph entries
    6. BASIC GUIDE & UPDATES . the "cards" tabs
    7. SHARED CODE ........... helpers, pop-up window, dark-mode and music buttons
    8. PAGE BUILD & START .... builds the tabs, handles clicks, starts the page

   PICTURES: every picture path is relative to index.html, uses forward slashes (img/structures/market.png, never
   backslashes) and must match the file name exactly (hosting is case-sensitive). Give an item an `image:` line to use
   any path you like; without one, a naming rule picks a default path (explained in section 7, "CARD PICTURES").
   ========================================================== */

/* ==========================================================
   1. SITE SETTINGS
   Header, footer, music and the tabs.
   ========================================================== */

const SITE = {
  name: "BASIL's Journal",          // big name in the header and the browser tab title
  season: "",                          // optional stamp next to the name (e.g. "Season 4"); "" hides it
  logo: "img/mainlogo.png",          // picture left of the name; "" or a missing file shows a dashed "Logo" circle
  ip: "139.99.38.79:25621",            // server address shown in the footer (one click selects it); "" hides it
  footer: "Art Blk SMP Wiki. Community-maintained. Stats may change between seasons.",
  // THEME MUSIC (music button at the top right). Put the sound file at `src`. `title` is what the button's hover tooltip
  // says is playing. volume goes from 0 (silent) to 1 (full). Set src to "" to hide the button.
  music: { src: "audio/theme.mp3", title: "Prontera 1 Hour - Ragnarok BGM Music", volume: 0.2 }
};

// TABS: the index tabs on the left edge of the book, in this order.
//   id    : unique short name, also used in the URL (#guide). Letters, numbers and dashes only.
//   label : text on the tab.
//   type  : "home" | "bosses" | "structures" | "photos" | "cards"
//   title / intro : heading and sentence shown above the cards or photos (not used by "home" and "bosses").
// A "cards" tab (Basic Guide, Updates) needs a list with the SAME id inside CARDS in section 6.
const TABS = [
    { id: "home",       label: "Home",                type: "home" },
    { id: "bosses",     label: "Bosses",              type: "bosses" },
    { id: "structures", label: "Structures and NPCs", type: "structures", title: "Structures and NPCs",
      intro: "Landmarks of the server and the people you will meet there. Select a card to see who lives or visits." },
    { id: "guide",      label: "Basic Guide",         type: "cards", title: "Basic Guide",
      intro: "The essentials for new players: fighting, levelling up and surviving the weather." },
    { id: "photos",     label: "Photos",              type: "photos", title: "Photos",
      intro: "Memories and builds from the server, with the story behind each one." },
    { id: "updates",    label: "Updates",             type: "cards", title: "Updates",
      intro: "What changed in each version of the server." }
];

/* ==========================================================
   2. HOME
   The Home tab: a heading and a few short paragraphs. Add or remove strings in `paragraphs` freely.
   ========================================================== */

const HOME = {
    title: "Welcome to Art Blk SMP",
    paragraphs: [
      "This is the community guide for Art Blk SMP, a survival server with custom bosses, skills and world mechanics.",
      "Use the tabs to find boss strategies, meet the NPCs, learn the basics and catch up on the latest updates."
    ]
};

const renderHome = () => {
  const h = HOME;
  return `<div class="home"><h2>${esc(h.title)}</h2>${h.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`;
};

/* ==========================================================
   3. BOSSES
   Boss data, then the code for the boss browser (Contents page, boss page, pop-ups, saved ticks).
   ========================================================== */

// ---- BOSS ENTRIES (the Contents page and the boss pages are built from this list) ----
// HOW TO ADD A BOSS: copy the TEMPLATE below, paste it after the last boss (don't forget the
// comma between entries), uncomment it and fill in every field. To remove a boss, delete its block.
// Order here = order in the Contents list, and sets the page numbers in the book.
//
// TEMPLATE
// {
//   id: "my-boss",                  // unique, lowercase, no spaces
//   realm: "Monster Expansion",     // makes a filter button: Monster Expansion / Cataclysm / BOMD / Minecraft / Legendary Monster / anything new
//   name: "My Boss",
//   art: "linear-gradient(135deg,#dfe8c2,#b9c98f)",  // background shown behind / until the picture loads
//   // image: "img/cataclysm/ignis.png", // OPTIONAL. By default the picture is img/<realm>/<id>.png
//                                   // (realm in lowercase with dashes, e.g. img/monster-expansion/my-boss.png)
//   health: "600 HP",
//   tier: 2,                        // difficulty 1-5, shown as I-V
//   armor: 10,                      // armor points (the Minecraft armor bar: 20 = full)
//   lore: "Backstory shown as the handwritten note on the left page.",
//   spawn: "How to summon it (shown in the full-entry window).",
//   attacks: [ { name: "Slam", tell: "What to watch for and how to react." } ],   // add as many as you like
//   gear: "Level 20",               // recommended-level badge
//   gearNote: "Armor, potions, weapons...",
//   loot: [ { item: "Item Name", rarity: "rare", chance: "8%", note: "What it does" } ]
//                                   // loot icon: img/icons/<boss id>/<item name>.png (e.g. img/icons/ignis/molten-core.png),
//                                   // or add image: "img/..." to an item. Missing file = no icon.
//                                   // rarity: common | uncommon | rare | legendary
// },
const BOSSES = [
  {
    id: "thornmother", realm: "Monster Expansion", name: "The Thornmother",
    art: "linear-gradient(135deg,#dfe8c2,#b9c98f)",
    health: "600 HP", tier: 2, armor: 8,
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
  {
    id: "cinder-warden", realm: "Cataclysm", name: "Cinder Warden",
    art: "linear-gradient(135deg,#f3d9a4,#e6a15a)",
    health: "1,400 HP", tier: 4, armor: 16,
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
    health: "900 HP", tier: 3, armor: 12,
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
  // ---- Placeholder bosses: BOMD, Minecraft and Legendary Monster (3 each). To add more to a category, copy a
  // block and keep the same `realm` text. A new realm name makes a new category button automatically.
  {
    // PLACEHOLDER: replace everything below. Picture: img/bomd/bomd-1.png
    id: "bomd-1", realm: "BOMD", name: "BOMD Boss 1",
    health: "400 HP", tier: 1, armor: 6,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 10", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below. Picture: img/bomd/bomd-2.png
    id: "bomd-2", realm: "BOMD", name: "BOMD Boss 2",
    health: "800 HP", tier: 2, armor: 10,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 20", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below. Picture: img/bomd/bomd-3.png
    id: "bomd-3", realm: "BOMD", name: "BOMD Boss 3",
    health: "1,200 HP", tier: 3, armor: 14,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 30", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below. Picture: img/minecraft/minecraft-1.png
    id: "minecraft-1", realm: "Minecraft", name: "Minecraft Boss 1",
    health: "400 HP", tier: 1, armor: 6,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 10", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below. Picture: img/minecraft/minecraft-2.png
    id: "minecraft-2", realm: "Minecraft", name: "Minecraft Boss 2",
    health: "800 HP", tier: 2, armor: 10,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 20", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below. Picture: img/minecraft/minecraft-3.png
    id: "minecraft-3", realm: "Minecraft", name: "Minecraft Boss 3",
    health: "1,200 HP", tier: 3, armor: 14,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 30", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below. Picture: img/minecraft/minecraft-4.png
    id: "minecraft-4", realm: "Minecraft", name: "Wither",
    health: "1,200 HP", tier: 3, armor: 14,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 30", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below. Picture: img/legendary-monster/legendary-monster-1.png
    id: "legendary-monster-1", realm: "Legendary Monster", name: "Legendary Monster 1",
    health: "400 HP", tier: 1, armor: 6,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 10", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below. Picture: img/legendary-monster/legendary-monster-2.png
    id: "legendary-monster-2", realm: "Legendary Monster", name: "Legendary Monster 2",
    health: "800 HP", tier: 2, armor: 10,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 20", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below. Picture: img/legendary-monster/legendary-monster-3.png
    id: "legendary-monster-3", realm: "Legendary Monster", name: "Legendary Monster 3",
    health: "1,200 HP", tier: 3, armor: 14,
    lore: "Placeholder lore: describe this boss here.",
    spawn: "Placeholder: explain how to summon or find this boss.",
    attacks: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    gear: "Level 30", gearNote: "Placeholder: recommended armor, weapons and potions.",
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does" }
    ]
  }
];

// ---- Saved "defeated" ticks ---------------------------------------------
// Ticks are saved in the visitor's own browser (localStorage), so they are still there on the next visit (per browser/device).
// To reset everyone's ticks (e.g. for a new season), change this name to anything else.
const STORAGE_KEY = "artblk-defeated";
let defeated = new Set();
try { defeated = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []); } catch (_) { /* storage blocked: ticks just won't persist */ }

function toggleDefeated(id) {
  if (defeated.has(id)) defeated.delete(id); else defeated.add(id);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...defeated])); } catch (_) { /* ignore */ }
  refreshChecks();
}
// Keeps every tick box, the "Defeated" button, the stamp on the photo and the "x of y" counter in sync.
function refreshChecks() {
  // The counter follows the selected realm filter (All / Monster Expansion / Cataclysm ...).
  const scope = BOSSES.filter((b) => state.realm === "All" || b.realm === state.realm);
  const done = scope.filter((b) => defeated.has(b.id)).length;
  const counter = $("progress");
  if (counter) counter.textContent = `${done} of ${scope.length} defeated`;
  main.querySelectorAll("[data-check]").forEach((el) => {
    const on = defeated.has(el.dataset.check);
    el.setAttribute("aria-pressed", on);
    const label = el.querySelector(".mark-label");
    if (label) label.textContent = on ? "Defeated" : "Mark as defeated";
  });
  $("boss-detail")?.querySelector(".boss-entry")?.classList.toggle("is-defeated", defeated.has(state.selected));
}

// ---- Boss browser: search, category buttons, Contents list, boss page -------
const state = { realm: "All", query: "", selected: BOSSES[0]?.id };
const bossById = (id) => BOSSES.find((b) => b.id === id);
// Matches the search box against the boss name, realm, attack names and loot names.
// A word that starts with @ filters by CATEGORY instead: "@monster" shows the category whose name STARTS with
// "monster" (Monster Expansion), "@legendary" shows Legendary Monster, "@bomd @minecraft" shows both.
// You can mix them with normal words: "@monster thorn".
const matchesQuery = (b) => {
  const q = state.query;
  if (!q) return true;
  const words = q.split(/\s+/).filter(Boolean);
  const tags = words.filter((w) => w.startsWith("@")).map((w) => slug(w.slice(1)));
  if (tags.length && !tags.some((t) => slug(b.realm).startsWith(t))) return false;
  const hay = [b.name, b.realm, ...(b.attacks || []).map((a) => a.name), ...(b.loot || []).map((l) => l.item)].join(" ").toLowerCase();
  return words.filter((w) => !w.startsWith("@")).every((w) => hay.includes(w));
};
const visibleBosses = () => BOSSES.filter((b) => (state.realm === "All" || b.realm === state.realm) && matchesQuery(b));

// Builds the left Contents column (filter buttons + list) and the empty book area on the right.
function renderBossPanel() {
  const realms = ["All", ...new Set(BOSSES.map((b) => b.realm).filter(Boolean))];
  return `<div class="boss-browser">
    <aside class="contents" aria-label="Contents">
      <h2 class="col-title">Contents</h2>
      <label class="search"><span class="sr">Search bosses</span><input type="search" id="boss-search" placeholder="Search bosses… or @category" autocomplete="off" spellcheck="false"></label>
      <div class="seg" role="group" aria-label="Filter by realm">
        ${realms.map((r) => `<button type="button" data-realm="${esc(r)}" aria-pressed="${r === "All"}">${esc(r)}</button>`).join("")}
      </div>
      <p class="progress" id="progress"></p>
      <ul class="contents-list" id="contents-list"></ul>
    </aside>
    <section class="boss-page" aria-label="Journal entry">
      <h2 class="col-title">Journal entry</h2>
      <article class="boss-detail" id="boss-detail" aria-live="polite"></article>
    </section>
  </div>`;
}

// Fills the Contents list. Runs again whenever a realm filter button is pressed.
function renderContents() {
  const shown = visibleBosses();
  if (!shown.length) { $("contents-list").innerHTML = `<li class="no-results">No bosses match your search.</li>`; return; }
  $("contents-list").innerHTML = shown.map((b) => {
    return `<li>
      <button class="contents-item" type="button" data-boss="${esc(b.id)}" aria-current="${b.id === state.selected}">
        <span class="thumb" aria-hidden="true"${b.art ? ` style="--art:${esc(b.art)}"` : ""}><img src="${esc(bossImg(b))}" alt="" loading="lazy" onerror="this.hidden=true"></span>
        <span><b>${esc(b.name)}</b><em><span class="sr">Tier </span>${roman(b.tier)}</em></span>
      </button>
      <!-- tick box: saved in the visitor's browser -->
      <button class="check" type="button" data-check="${esc(b.id)}" aria-pressed="${defeated.has(b.id)}" aria-label="Defeated: ${esc(b.name)}"><span aria-hidden="true">✓</span></button>
    </li>`;
  }).join("");
}

/* The journal entry (right-hand page of the book). Top row: the name, then the stats.
   Below, two columns: LEFT = photo, handwritten lore note and the "defeated" tick button;
   RIGHT = ruled notebook strip with telegraphs, loot chips and the full-entry button.
   Edit the markup to change what appears; styling is under "Journal entry" in styles.css. */
let shownBossId = null;   // id of the boss currently drawn on the right page
function renderBossEntry(animate = false) {
  const b = bossById(state.selected), el = $("boss-detail");
  if (!b || !visibleBosses().includes(b)) { shownBossId = null; el.innerHTML = `<p class="empty">${state.query ? "No bosses match your search." : "No bosses in this realm yet."}</p>`; return; }
  const page = BOSSES.indexOf(b) + 1;   // page numbers: first boss = 1, second = 2 ...
  const done = defeated.has(b.id);
  shownBossId = b.id;
  el.classList.remove("turning");
  const attacks = b.attacks.map((a) => `<li><strong>${esc(a.name)}:</strong> ${esc(a.tell)}</li>`).join("");
  const loot = b.loot.map((l) => `<div class="chip"><i class="r-${esc(l.rarity)}">${lootIcon(b, l, "chip-img")}</i>${esc(l.item)}</div>`).join("");
  el.innerHTML = `
    <div class="boss-entry${done ? " is-defeated" : ""}">
      <div class="boss-head">
        <h3>${esc(b.name)}</h3>
      </div>
      <div class="boss-stats">
        <div><b>${esc(b.health)}</b><small>Health</small></div>
        <div><b>${esc(b.armor)}</b><small>Armor points</small></div>
        <div><b>Tier ${roman(b.tier)}</b><small>Difficulty</small></div>
      </div>
      <div class="boss-body">
        <div class="boss-left">
          <figure class="photo"><button class="zoom" type="button" data-open="image" data-key="${esc(b.id)}" aria-haspopup="dialog" aria-label="Enlarge image of ${esc(b.name)}">${art(b)}</button><span class="done-stamp" aria-hidden="true">Defeated</span></figure>
          <p class="note">${esc(b.lore)}</p>
          <button class="mark" type="button" data-check="${esc(b.id)}" aria-pressed="${done}"><span class="box" aria-hidden="true">✓</span><span class="mark-label">${done ? "Defeated" : "Mark as defeated"}</span></button>
        </div>
        <div class="more-details">
          <h4>More Details</h4><ul>${attacks}</ul>
          <h4>Loot drops</h4><div class="loot-row">${loot}</div>
          <button class="btn" type="button" data-open="boss" data-key="${esc(b.id)}" aria-haspopup="dialog">Read the full entry</button>
        </div>
      </div>
      <span class="page-no">${page}</span>
    </div>`;
  el.scrollTop = 0;
  if (animate) { void el.offsetWidth; el.classList.add("turning"); }   // page-turn animation: only when a boss is picked from the list
}

// Applies a realm filter ("All" or a realm name from the bosses list).
function setRealm(realm) {
  state.realm = realm;
  main.querySelectorAll("[data-realm]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.realm === realm));
  applyFilters();
}

// Re-draws the list and entry after the realm button or the search text changes.
function applyFilters() {
  if (!visibleBosses().some((b) => b.id === state.selected)) state.selected = visibleBosses()[0]?.id;
  renderContents();
  if (state.selected !== shownBossId) renderBossEntry();   // typing in search must not redraw (or replay the page-turn on) the same boss
  refreshChecks();
}

function selectBoss(id) {
  const b = bossById(id);
  if (!b) return;
  state.selected = id;
  renderBossEntry(true);   // true = play the page-turn animation (only when the visitor picks a boss)
  const list = $("contents-list");
  list.querySelectorAll(".contents-item").forEach((x) => x.setAttribute("aria-current", x.dataset.boss === id));
  if (matchMedia("(max-width: 899px)").matches) {   // phones: list is above the entry, so bring the entry into view
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    $("boss-detail").closest(".boss-page").scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  } else list.querySelector('[aria-current="true"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
}

// ---- Boss pop-ups ("Read the full entry" and the enlarged picture) -----------
// Pop-up opened by "Read the full entry": lore, spawn, gear and the full loot table.
function bossPopup(key) {
  const b = bossById(key);
  if (!b) return "";
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

function bossImagePopup(key) {
  const b = bossById(key);
  if (!b) return "";
  return `<div class="lb-body"><h3 id="modal-title" class="lb-title">${esc(b.name)}</h3><img class="lb-img" src="${esc(bossImg(b))}" alt="${esc(b.name)}"></div>`;
}

/* ==========================================================
   4. STRUCTURES AND NPCs
   One card per structure; clicking it opens a pop-up with the info and the NPCs who live or visit there.
   ========================================================== */

// ---- STRUCTURES & NPCs data -------------------------------------------------
// HOW TO ADD A STRUCTURE: copy the whole Market block (from `{` to `},`), paste it after the last one and change the text.
//   id        : unique short name              name / teaser : card heading and one-sentence summary
//   image     : card + pop-up banner picture. Leave it out to use the default img/structures/<name>.png (see section 7)
//   info      : the short paragraph in the pop-up        infoImage : OPTIONAL picture beside it (infoImageSide: "left" flips it)
//   location  : OPTIONAL line under the info             sections  : OPTIONAL extra blocks { title, text, image, side }
// HOW TO ADD AN NPC: copy one { ... } block inside `npcs` (commas between blocks).
//   category  : group heading. NPCs with the same wording are grouped ("Permanent resident", "Visitor", or your own like
//               "Quest giver"). Groups appear in the order they first show up.
//   role      : short title under the name         description : text shown when the NPC is clicked
//   image     : OPTIONAL picture beside the description (imageSide: "left" flips it)      schedule : OPTIONAL "when to find them"
// (Sample content: replace it.)
const STRUCTURES = [
  {
    id: "market", name: "Market", image: "img/structures/market.png",
    teaser: "The trading hub of Art Blk SMP, with stalls, a smithy and travelling merchants.",
    info: "The busiest spot on the server. Sell your boss loot, repair gear and stock up on supplies. Residents are always around; visitors only drop by now and then.",
    infoImage: "img/structures/market-square.png",   // OPTIONAL: picture beside the info text (delete the line if unused)
  location: "Spawn plaza, just north of the Sunflower Gate",
  sections: [   // OPTIONAL: extra text blocks, each with an optional picture beside it (delete the block if unused)
    { title: "The stalls", text: "Placeholder text: describe what the stalls sell. The picture sits beside this text.", image: "img/structures/market-stalls.png" }
  ],
    npcs: [
      { name: "Marigold", role: "Head merchant", category: "Permanent resident", image: "img/npcs/marigold.png",
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
    // PLACEHOLDER: replace the text below.
    id: "sunwalkers", name: "Sunwalkers", image: "img/structures/sunwalkers.png",
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
];

const renderStructure = (s) => `
  <button class="card" type="button" data-open="structure" data-key="${esc(s.id)}" aria-haspopup="dialog">
    ${cardBanner(cardImg(s, "structures", s.name), s.name)}
    <div class="card-body"><h3>${esc(s.name)}</h3><p>${esc(s.teaser)}</p><span class="badge">${(s.npcs || []).length} NPCs</span></div>
  </button>`;

// One NPC row (click to open). `image` (optional) puts a picture beside the description; imageSide: "left" flips it.
const npcHTML = (n) => `
  <details class="npc">
    <summary>
      <span class="npc-name"><b>${esc(n.name)}</b><small>${esc(n.role)}</small></span>
    </summary>
    <div class="npc-desc">
      ${mediaBlock({ text: n.description, image: n.image, side: n.imageSide })}
      ${n.schedule ? `<p class="npc-when"><strong>When:</strong> ${esc(n.schedule)}</p>` : ""}
    </div>
  </details>`;

// Pop-up for a structure: picture banner, info text (with an optional picture beside it), extra text blocks, then NPCs grouped by `category`.
function structurePopup(key) {
  const s = STRUCTURES.find((x) => x.id === key);
  if (!s) return "";
  const groups = {};
  (s.npcs || []).forEach((n) => { (groups[n.category] = groups[n.category] || []).push(n); });
  const lists = Object.entries(groups).map(([cat, list]) =>
    `<h4>${esc(cat)} <span class="count">${list.length}</span></h4><div class="npc-list">${list.map(npcHTML).join("")}</div>`).join("");
  return `
    ${cardBanner(cardImg(s, "structures", s.name), s.name)}
    <div class="modal-text">
      <h3 id="modal-title">${esc(s.name)}</h3>
      ${mediaBlock({ text: s.info, image: s.infoImage, side: s.infoImageSide })}
      ${s.location ? `<p><strong>Location:</strong> ${esc(s.location)}</p>` : ""}
      ${(s.sections || []).map(mediaBlock).join("")}
      ${lists}
    </div>`;
}

/* ==========================================================
   5. PHOTOS
   The Photos tab: photo + title on one side, paragraph on the other, alternating.
   ========================================================== */

// ---- PHOTOS data -----------------------------------------------------------
// Entries alternate sides:  1st, 3rd ... photo left + paragraph right;  2nd, 4th ... paragraph left + photo right.
// HOW TO ADD A PHOTO: copy one { ... } block below (commas between blocks). Order here = order on the page.
//   title : short title under the photo frame
//   image : the picture path. Leave it out to use the default img/photos/<title>.png
//   text  : the paragraph. For several paragraphs use a list:  text: ["First paragraph.", "Second paragraph."]
//   A missing file shows a "Photo placeholder" frame. Clicking a photo opens it large. (Sample text: replace it.)
const PHOTOS = [
  { title: "First sunrise at spawn", image: "img/photos/first-sunrise-at-spawn.png", text: "Placeholder paragraph: describe what is happening in this photo, who is in it and why it matters." },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] }
];

const renderPhoto = (p, i) => {
  return `
  <article class="photo-row">
    <figure class="photo-row-pic">
      <div class="photo"><button class="zoom" type="button" data-open="photo" data-key="${i}" aria-haspopup="dialog" aria-label="Enlarge photo: ${esc(p.title)}" disabled><div class="shot-frame"><img src="${esc(cardImg(p, "photos", p.title))}" alt="${esc(p.title)}" onload="this.parentNode.classList.add('has-img'); this.closest('button').disabled = false" onerror="this.remove()"></div></button></div>
      <figcaption>${esc(p.title)}</figcaption>
    </figure>
    <div class="photo-row-text">${toParas(p.text)}</div>
  </article>`;
};

function photoPopup(key) {
  const p = PHOTOS[Number(key)];
  if (!p) return "";
  // Just the picture, zoomed. No title, no X: click the picture, click outside it, or press Esc to close.
  // (The title is kept for screen readers only.)
  return `<h3 id="modal-title" class="sr">${esc(p.title)}</h3><img class="lb-img" data-close src="${esc(cardImg(p, "photos", p.title))}" alt="${esc(p.title)}">`;
}

/* ==========================================================
   6. BASIC GUIDE & UPDATES
   The "cards" tabs: each card opens a pop-up with its details.
   ========================================================== */

// ---- CARD data ----------------------------------------------------------------
// One list per "cards" tab; the key (guide / updates) must match the tab `id` in TABS.
// HOW TO ADD A CARD: copy one { ... } block into the right list (commas between blocks).
//   title    : card heading                 teaser : one-sentence summary on the card and at the top of the pop-up
//   image    : the card + pop-up banner picture. Leave it out to use the default img/<tab id>/<title>.png (see section 7)
//   sections : OPTIONAL text blocks in the pop-up, each with an optional picture beside it: { title, text, image, side }
//   topics   : the bullet list in the pop-up
// (Sample text: replace it with your real guides and patch notes.)
const CARDS = {
  guide: [
    { title: "Combat Skills", image: "img/guide/combat-skills.png", teaser: "Weapon skills, dodging and how to get the most out of every fight.",
      sections: [   // OPTIONAL: text blocks with a picture beside them in the pop-up (delete the block if unused)
        { title: "Dodging", text: "Placeholder text: explain how dodging works. The picture sits beside this text.", image: "img/guide/combat-dodging.png" }
      ],
      topics: ["Melee, ranged and magic skills", "Dodging and blocking", "Combos and cooldowns"] },
    { title: "Skill Trees", image: "img/guide/skill-trees.png", teaser: "Choose a path, spend your points and unlock new perks.",
      topics: ["How skill points are earned", "Available paths", "Perks unlocked at each level"] },
    { title: "Temperature", image: "img/guide/temperature.png", teaser: "Stay warm in the cold and cool in the heat to avoid taking damage.",
      topics: ["Hot and cold biomes", "Gear and items that help", "Signs of overheating and freezing"] }
  ],
  updates: [
    { title: "Update 1.0", image: "img/updates/update-1-0.png", teaser: "The first release of the server.",
      topics: ["Core bosses and mobs", "Spawn, market and NPCs", "Starting skills"] },
    { title: "Update 1.1", image: "img/updates/update-1-1.png", teaser: "New content and balance changes.",
      topics: ["New bosses", "Balance changes", "Bug fixes"] },
    { title: "Update 1.2", image: "img/updates/update-1-2.png", teaser: "More structures, NPCs and quality-of-life changes.",
      topics: ["New structures and NPCs", "Quality-of-life changes", "Bug fixes"] }
  ]
};

const renderCard = (item, tabId, i) => `
  <button class="card" type="button" data-open="card" data-key="${esc(tabId)}:${i}" aria-haspopup="dialog">
    ${cardBanner(cardImg(item, tabId, item.title), item.title)}
    <div class="card-body"><h3>${esc(item.title)}</h3><p>${esc(item.teaser)}</p></div>
  </button>`;

// Pop-up for a Basic Guide / Updates card: picture banner, summary, optional text+picture blocks, then the bullet list.
function cardPopup(key) {
  const [tabId, i] = key.split(":");
  const item = (CARDS[tabId] || [])[Number(i)];
  if (!item) return "";
  const topics = (item.topics || []).map((p) => `<li>${esc(p)}</li>`).join("");
  return `
    ${cardBanner(cardImg(item, tabId, item.title), item.title)}
    <div class="modal-text">
      <h3 id="modal-title">${esc(item.title)}</h3>
      <p>${esc(item.teaser)}</p>
      ${(item.sections || []).map(mediaBlock).join("")}
      ${topics ? `<h4>What's inside</h4><ul>${topics}</ul>` : ""}
    </div>`;
}

/* ==========================================================
   7. SHARED CODE
   Helpers, the pop-up window, and the dark-mode + music buttons. Used by every tab.
   ========================================================== */

// Escape text so entries can safely contain symbols like < or &.
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = (id) => document.getElementById(id);
const roman = (n) => ["", "I", "II", "III", "IV", "V"][n] || n;
const slug = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");   // "Update 1.0" -> "update-1-0"
const toParas = (t) => (Array.isArray(t) ? t : [t]).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join("");   // one string or a list -> <p> tags

// BOSS PICTURES: a boss uses its `image` path if it has one, otherwise img/<category>/<boss id>.png (e.g. img/cataclysm/ignis.png).
// If the file is missing the picture hides itself and only the background colour shows.
const bossImg = (b) => b.image || `img/${slug(b.realm)}/${slug(b.id)}.png`;
// Loot icon: img/icons/<boss id>/<item name>.png unless the item has its own `image`. Missing file = icon hides itself.
const lootImg = (b, l) => l.image || `img/icons/${slug(b.id)}/${slug(l.item)}.png`;
const lootIcon = (b, l, cls) => `<img class="${cls}" src="${esc(lootImg(b, l))}" alt="" onerror="this.hidden=true">`;
const art = (b) => `<div class="art"${b.art ? ` style="--art:${esc(b.art)}"` : ""}><img src="${esc(bossImg(b))}" alt="${esc(b.name)}" loading="lazy" onerror="this.hidden=true"></div>`;

// CARD PICTURES (Structures, Basic Guide, Updates, Photos). A card uses its `image` path if it has one.
// If it has none, the default is  img/<tab id>/<card name, lowercase with dashes>.png
//   e.g. the "Market" card on the "structures" tab -> img/structures/market.png, "Update 1.0" on "updates" -> img/updates/update-1-0.png
// That is the only reason for that path: it is just a naming rule, so you do not have to type a path for every card.
// Set `image: "img/anything/you-like.jpg"` on any card to use a different folder, file name or format (png, jpg, webp ...),
// or a full web address. Use forward slashes, and match the file name exactly (hosting is case-sensitive).
// No file at that path = no picture, just the thin banner. The same picture is used on the card and at the top of its pop-up.
const cardImg = (item, folder, name) => item.image || `img/${folder}/${slug(name)}.png`;
const cardBanner = (src, alt) => `<div class="card-banner"><img src="${esc(src)}" alt="${esc(alt)}" onload="this.parentNode.classList.add('has-img')" onerror="this.remove()"></div>`;

// TEXT WITH A PICTURE BESIDE IT (inside pop-ups). One block:
//   { title: "Heading (optional)", text: "a paragraph, or a list of paragraphs", image: "img/...png" (optional), side: "left" (optional) }
// The picture sits on the right unless side is "left". No `image`, or a missing file = the text uses the full width.
const mediaBlock = (b) => {
  if (!b || (!b.text && !b.title && !b.image)) return "";
  const pic = b.image ? `<img class="media-pic" src="${esc(b.image)}" alt="${esc(b.title || "")}" onerror="this.parentNode.classList.add('no-pic'); this.remove()">` : "";
  return `<div class="media${b.side === "left" ? " media-left" : ""}"><div class="media-text">${b.title ? `<h4>${esc(b.title)}</h4>` : ""}${toParas(b.text)}</div>${pic}</div>`;
};

const tablist = $("tablist"), main = $("main"), modal = $("modal");
const modalWindow = modal.querySelector(".modal-window"), modalContent = $("modal-content");

// POP-UP KINDS: a button with data-open="<kind>" data-key="<key>" opens the builder listed here. Each builder lives in its
// category section above and returns HTML (or "" if the key is unknown). To add a kind: write xxxPopup(key) in your
// category, then add one line to POPUPS. Picture kinds (WIDE_POPUPS) get the wide window.
const POPUPS = { boss: bossPopup, image: bossImagePopup, structure: structurePopup, photo: photoPopup, card: cardPopup };
const WIDE_POPUPS = ["image"];     // boss picture: wide window with a title and an X
const BARE_POPUPS = ["photo"];     // Photos tab: only the zoomed picture, no window, title or X

let lastFocus = null;
function openModal(kind, key) {
  const html = POPUPS[kind]?.(key);
  if (!html) return;
  modalWindow.classList.toggle("lightbox", WIDE_POPUPS.includes(kind));
  modalWindow.classList.toggle("bare", BARE_POPUPS.includes(kind));
  modalContent.innerHTML = html;
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

modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") return closeModal();
  if (e.key === "Tab") { // keep keyboard focus inside the window
    const f = [...modalWindow.querySelectorAll("button, [href], summary")];
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === modalWindow)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// Dark mode: light by default; a visitor's choice is remembered in their browser.
function initTheme() {
  const root = document.documentElement, themeBtn = $("theme-toggle");
  const paintTheme = () => {
    const dark = root.dataset.theme === "dark";
    themeBtn.querySelector("span").textContent = dark ? "☀️" : "🌙";
    themeBtn.dataset.tip = dark ? "Switch to light mode" : "Switch to dark mode";
    themeBtn.setAttribute("aria-label", themeBtn.dataset.tip);
  };
  themeBtn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("artblk-theme", root.dataset.theme); } catch (_) { /* storage blocked */ }
    paintTheme();
  });
  paintTheme();
}

// Theme music: plays by default until the visitor turns it off (remembered). File, title and volume: SITE.music.
function initMusic() {
  const mu = SITE.music, musicBtn = $("music-toggle"), audio = $("theme-audio");
  if (!mu || !mu.src) musicBtn.hidden = true;
  else {
    audio.src = mu.src; audio.volume = mu.volume ?? 0.2; audio.preload = "auto";
    const MUSIC_KEY = "artblk-music";
    let missing = false, chosen = false;
    const paintMusic = () => {
      const on = !audio.paused;
      musicBtn.setAttribute("aria-pressed", on);
      musicBtn.classList.toggle("playing", on);
      musicBtn.querySelector("span").textContent = on ? "🎵" : "🔇";
      musicBtn.dataset.tip = missing ? `Theme file not found: add ${mu.src}`
        : on ? `Now playing: ${mu.title}` : `Click to play: ${mu.title}`;
    };
    const tryPlay = async () => { missing = false; try { await audio.play(); return true; } catch (_) { return false; } };
    audio.addEventListener("play", paintMusic);
    audio.addEventListener("pause", paintMusic);
    audio.addEventListener("error", () => { missing = true; paintMusic(); });
    musicBtn.addEventListener("click", async () => {
      chosen = true;
      if (!audio.paused) {
        audio.pause();
        try { localStorage.setItem(MUSIC_KEY, "off"); } catch (_) { /* storage blocked */ }
        return;
      }
      try { localStorage.removeItem(MUSIC_KEY); } catch (_) { /* storage blocked */ }
      await tryPlay(); paintMusic();
    });
    paintMusic();

    // Browsers block sound until the visitor interacts with the page. So: try to play right away, and if that
    // is blocked, start the music on the first click, tap or key press anywhere on the page.
    let off = false; try { off = localStorage.getItem(MUSIC_KEY) === "off"; } catch (_) { /* storage blocked */ }
    if (!off) tryPlay().then((ok) => {
      if (ok) return;
      // Blocked: keep trying on every kind of "real" interaction (mouse, touch, keyboard) and stop once it plays.
      const events = ["pointerdown", "pointerup", "touchend", "keydown", "click"];
      let busy = false;
      const kick = async (e) => {
        if (chosen || busy) return;
        if (musicBtn.contains(e.target)) return;   // the music button handles its own press
        busy = true;
        const started = await tryPlay();
        busy = false;
        if (started) { events.forEach((ev) => document.removeEventListener(ev, kick, true)); paintMusic(); }
      };
      events.forEach((ev) => document.addEventListener(ev, kick, true));
    });
  }
}

/* ==========================================================
   8. PAGE BUILD & START
   Builds the tabs, switches between them, handles clicks and typing, and starts everything.
   ========================================================== */

// HOW EACH TAB TYPE IS DRAWN (the `type` of an entry in TABS). To add a new type: write its render function in its own
// section, add one line here, and use the new type name in TABS.
const TAB_TYPES = {
  home:       () => renderHome(),
  bosses:     () => renderBossPanel(),
  structures: () => `<div class="grid">${STRUCTURES.map(renderStructure).join("")}</div>`,
  photos:     () => `<div class="photo-list">${PHOTOS.map(renderPhoto).join("")}</div>`,
  cards:      (tab) => `<div class="grid">${(CARDS[tab.id] || []).map((it, i) => renderCard(it, tab.id, i)).join("")}</div>`
};

// Fills the header and footer, then creates one tab button + one panel for every entry in TABS.
function build() {
  $("server-name").textContent = SITE.name;
  $("footer-text").textContent = SITE.footer;
  document.title = SITE.name;
  if (SITE.logo) {   // if the file is missing, the dashed "Logo" placeholder comes back
    const lg = $("server-logo");
    lg.classList.add("has-img");
    lg.innerHTML = `<img src="${esc(SITE.logo)}" alt="" onerror="this.parentNode.classList.remove('has-img');this.parentNode.textContent='Logo'">`;
  }
  $("season").textContent = SITE.season || "";
  if (SITE.ip) $("footer-ip").textContent = SITE.ip; else $("footer-ip").parentNode.hidden = true;   // IP hidden when empty
  initTheme();
  initMusic();

  TABS.forEach((tab) => {
    const btn = document.createElement("button");
    btn.className = "tab"; btn.id = `tab-${tab.id}`; btn.type = "button";
    btn.setAttribute("role", "tab"); btn.setAttribute("aria-controls", `panel-${tab.id}`);
    btn.dataset.tab = tab.id;
    btn.textContent = tab.label;
    tablist.appendChild(btn);

    const body = (TAB_TYPES[tab.type] || TAB_TYPES.cards)(tab);
    const hasHeading = tab.type !== "home" && tab.type !== "bosses";   // title + intro above the cards / photos
    const panel = document.createElement("section");
    panel.className = "panel" + (tab.type === "bosses" ? " fit" : "") + (tab.type === "home" ? " home-panel" : "");
    panel.id = `panel-${tab.id}`;
    panel.setAttribute("role", "tabpanel"); panel.setAttribute("aria-labelledby", btn.id);
    panel.tabIndex = 0; panel.hidden = true;
    panel.innerHTML = (hasHeading ? `<div class="panel-head"><h2 class="col-title">${esc(tab.title)}</h2><p>${esc(tab.intro)}</p></div>` : "") + body;
    main.appendChild(panel);
  });
  if (BOSSES.length) setRealm("All");
}

function activate(id, { focus = false, updateHash = true } = {}) {
  const tabs = [...tablist.querySelectorAll(".tab")];
  if (!tabs.some((t) => t.dataset.tab === id)) id = TABS[0].id;
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
  const fwd = (i + 1) % tabs.length, back = (i - 1 + tabs.length) % tabs.length;   // arrow keys move between tabs
  const next = { ArrowRight: fwd, ArrowDown: fwd, ArrowLeft: back, ArrowUp: back, Home: 0, End: tabs.length - 1 }[e.key];
  if (next !== undefined) { e.preventDefault(); activate(tabs[next].dataset.tab, { focus: true }); }
});

main.addEventListener("click", (e) => {
  const chk = e.target.closest("[data-check]");       // tick boxes (Contents list and entry page)
  if (chk) return toggleDefeated(chk.dataset.check);
  const open = e.target.closest("[data-open]");
  if (open) {
    if (open.dataset.open === "image") {   // only enlarge when the picture actually loaded
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
main.addEventListener("input", (e) => {   // boss search box
  if (e.target.id !== "boss-search") return;
  state.query = e.target.value.trim().toLowerCase();
  applyFilters();
});

window.addEventListener("hashchange", () => activate(location.hash.slice(1), { updateHash: false }));

build();
activate(location.hash.slice(1) || TABS[0].id, { updateHash: false });
