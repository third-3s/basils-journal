/* ==========================================================
   MAP (search for the heading)
    1. SITE SETTINGS ......... name, logo, server IP, footer, music, and the list of tabs
    2. HOME .................. the Home text
    3. BOSSES ................ boss entries, search + category buttons, boss page, saved "defeated" ticks
    4. STRUCTURES AND NPCs ... structure cards and their NPC lists
    5. PHOTOS ................ the photo notebook: ruled pages, two zig-zag photo rows per spread, page turns
    6. MECHANICS & UPDATES . the "cards" tabs
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
  name: "BASIL's Journal",          
  logo: "img/mainlogo.png",          
  logoAlt: "img/mainlogoalt.png",
  ip: "139.99.38.79:25621",            
  footer: "BASIL's Journal. Information updated from time to time.",
  music: { src: "audio/theme.mp3", title: "Pause, Bond", volume: 0.01 }
};

// TABS: the index tabs on the left edge of the book, in this order.
//   id    : unique short name, also used in the URL (#mechanics). Letters, numbers and dashes only.
//   label : text on the tab.
//   type  : "home" | "bosses" | "structures" | "photos" | "cards"
//   title / intro : heading and sentence shown above the cards or photos (not used by "home", "bosses" and "photos").
// A "cards" tab (Mechanics, Updates) needs a list with the SAME id inside CARDS in section 6.
const TABS = [
    { id: "home",       label: "Home",                type: "home" },
    { id: "bosses",     label: "Bosses",              type: "bosses" },
    { id: "structures", label: "Structures and NPCs", type: "structures", title: "Structures and NPCs",
      intro: "Landmarks of the server and the people you will meet there. Select a card to see who lives or visits." },
    { id: "mechanics",  label: "Mechanics",           type: "cards", title: "Mechanics",
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
    title: "Welcome to my journal!",
    paragraphs: [
      "I've made notes to keep track of things on the server.",
      "This journal provides a way to document my experiences and disco veries."
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
// Lines (one string per line in a list):
//   "text"        paragraph (in boss notes and recommendations: a bullet)
//   "- text"       bullet            
//   "1. text"      numbered step         
//   "# text"       small heading
//   "> text"       paragraph without a bullet (useful inside boss notes)
//   **bold**      ==highlighted==      *cursive*       (they can be mixed: **==bold and highlighted==**)
// Gradients (the first and last hex values create the starting and ending colors):
//   "linear-gradient(135deg,#ffdab9,#ff9f43)"  orange
//   "linear-gradient(135deg,#f3d9a4,#e6a15a)"  gold
//   "linear-gradient(135deg,#cfe3dc,#9fc3bd)"  aqua
//   "linear-gradient(135deg,#e8c9a8,#b97a56)"  brown
//   "linear-gradient(135deg,#d8c8b5,#8b6f47)"  tan
//   "linear-gradient(135deg,#f1b6b4,#9f3e52)"  red
//   "linear-gradient(135deg,#cdb4db,#7a4fa3)"  purple
//   "linear-gradient(135deg,#b9d7ee,#4a86b8)"  blue
//   "linear-gradient(135deg,#bfe3c0,#5f9364)"  green
//   "linear-gradient(135deg,#f0f0f0,#8a8a8a)"  gray
//   "linear-gradient(135deg,#ffffff,#c4c4c4)"  white
//   "linear-gradient(135deg,#9f9f9f,#181818)"  black

const TIERS_INTRO = "A boss's tier shows how many players, and how strong, you need to defeat it.";
const TIERS = [
  { tier: 1, label: "Solo.", text: "Can be soloed with the right gear and class." },
  { tier: 2, label: "Duo.", text: "Needs 2 players to defeat it." },
  { tier: 3, label: "Full party.", text: "Needs a party of 4, each with their own specialization." },
  { tier: 4, label: "Elite party.", text: "Everyone in the party needs to be strong enough to take it on." },
  { tier: 5, label: "Beyond players.", text: "Players alone won't be enough to defeat this one." }
];
function tiersPopup() {
  const rows = TIERS.map((t) => `<li><span class="tier-badge">${roman(t.tier)}</span><p><b>${rich(t.label)}</b> ${rich(t.text)}</p></li>`).join("");
  return `
    <div class="m-head"><h3 id="modal-title">Boss tiers</h3></div>
    <div class="detail">
      <p>${rich(TIERS_INTRO)}</p>
      <ul class="tier-list">${rows}</ul>
    </div>`;
}

const BOSSES = [
  {
    id: "ignathos", realm: "Monster Expansion", name: "Ignathos",
    art: "linear-gradient(135deg,#ffdab9,#ff9f43)",
    image: "img/bosses/monster-expansion/ignathos.png",
    health: "2500 HP", armor: 5, tier: 1,
    lore: "A medium-sized avian beast with a fiery temper. Known for its vice-like claws that allows them to pull solid blocks.",
    location: "Commonly found in Birch Forests, but can spawn in any forest biomes.",
    notes: [
      "One of the rare bosses that are naturally **neutral**, hurting them initiates the battle.",
      "Its **head** and **arms** are breakable; breaking them makes them vulnerable in that spot and drops additional loot.",
      "Its **tail** is **severable**; cutting it disables some movesets.",
      "When enraged, it will occasionally grab ==flammable blocks== to consume them, ==empowering its attacks.==",
      "An ignathos is resistant to fire but weak to **ice**.",
      // "> Tip:"
    ],
    recommendations: [
      "Wear full ==diamond== armor, having protection enchantments is recommended.",
      "Target their ==tail== first, it receives more damage.",
      "Lure the monster to a flat area for easier dodging.",
      "Avoid using Guard, it stuns you and leave you vulnerable to attacks, use ==Parry== instead or a shield to avoid the stun.",
      "Dodging away from the anticipated attacks is the best way to avoid damage.",
      // "*No special enchantments needed.*"
    ],
    loot: [
      { item: "Monster Hardbone", quantity: "5 - 10", chance: "100%", note: "Sturdy bones dropped by large monsters.", image: "img/icons/monsterexpansion/monster_hardbone.png" },
      { item: "Ignathos Hide", quantity: "5 - 10", chance: "100%", note: "Thick slab of fire-resistant hide stripped from the ignathos.", image: "img/icons/ignathos/ignathos_hide.png" },
      { item: "Ignathos Feather", quantity: "5 - 10", chance: "100%", note: "Feathers plucked from the ignathos.", image: "img/icons/ignathos/ignathos_feather.png" },
      { item: "Ignathos Talon", quantity: "2 - 4", chance: "75%", note: "Sharp talons ripped from the ignathos.", image: "img/icons/ignathos/ignathos_talon.png" },
      { item: "Catalytic Ignition Crop", quantity: "1", chance: "25%", note: "The volatile organ the ignathos uses to ignite its internal furnace.", image: "img/icons/ignathos/catalytic_ignition_crop.png" },
      { item: "Ignathos Tail", quantity: "1", chance: "Tail drop", note: "Ignathos's tail piece dropped by severing the beast's tail from its body.", image: "img/icons/ignathos/ignathos_tail.png" }                                
    ]
  },
  {
    id: "rhyza", realm: "Monster Expansion", name: "Rhyza",
    art: "linear-gradient(135deg,#ffffff,#c4c4c4)",
    image: "img/bosses/monster-expansion/rhyza.png",
    health: "2500 HP", armor: 5, tier: 2,
    lore: "Elusive chimeran native to the barren, floating islands of the End. Known for its speed and attacks that blind its prey.",
    location: "End Islands.",
    notes: [
      "Its **head** and **arms** are breakable; breaking them makes them vulnerable in that spot and drops additional loot.",
      "It has two **tails** and both are **severable**; cutting it disables some movesets.",
      "Rhyzas excel at dealing damage over time through ==bleeding attacks==.",
      "Rhyzas are resistant to ice but weak to **fire**.",
      // "> Tip:"
    ],
    recommendations: [
      "Wear ==enchanted diamond armor==, get passives and artifacts that increase your overall hp to tank the bleeding effect.",
      "Rhyzas are fast and have ==disappearing properties==; so always be on the move as well.",
      "Some if its attacks cause bleeding, avoid getting hit frequently and always monitor your health.",
      "There's an audio cue that plays before a rhyza initiate its blinding attack; turn your camera around when you hear it to avoid being blinded.",
      "A rhyza has ==two tails==, cut them both to disable its **blinding attacks**.",
      // "*No special enchantments needed.*"
    ],
    loot: [
      { item: "Monster Hardbone", quantity: "5 - 10", chance: "100%", note: "Sturdy bones dropped by large monsters.", image: "img/icons/monsterexpansion/monster_hardbone.png" },
      { item: "Rhyza Fur", quantity: "10 - 20", chance: "100%", note: "A thick piece of fur dropped by the rhyza.", image: "img/icons/rhyza/rhyza_fur.png" },
      { item: "Rhyza Scale", quantity: "5 - 10", chance: "100%", note: "A hard shard of scale dropped by the rhyza.", image: "img/icons/rhyza/rhyza_scale.png" },
      { item: "Rhyza Carapace", quantity: "1 - 2", chance: "75%", note: "A hardened segment of exoskeleton dropped by the rhyza.", image: "img/icons/rhyza/rhyza_carapace.png" },
      { item: "Rhyza Gleam Core", quantity: "1 - 2", chance: "75%", note: "A radiant core pulsing with blinding light.", image: "img/icons/rhyza/rhyza_gleam_core.png" },
      { item: "Rhyza Claw", quantity: "2 - 6", chance: "75%", note: "Razor-sharp claw dropped by the rhyza.", image: "img/icons/rhyza/rhyza_claw.png" },
      { item: "Serrated Sharpclaw", quantity: "1", chance: "25%", note: "A jagged claw from the rhyza, edged with unnatural precision.", image: "img/icons/rhyza/serrated_sharpclaw.png" },
      { item: "Rhyza Tail", quantity: "1-2", chance: "Tail drop", note: "Rhyza's tail piece dropped by severing the beast's tail from its body.", image: "img/icons/rhyza/rhyza_tail.png" }                                
    ]
  },
  {
    id: "skrythe", realm: "Monster Expansion", name: "Skrythe",
    art: "linear-gradient(135deg,#b9d7ee,#4a86b8)",
    image: "img/bosses/monster-expansion/skrythe.png",
    health: "7500 HP", armor: 5, tier: 3,
    lore: "Highly territorial carnivorous wyverns. A skrythe's throat is capable of generating devastating, high-frequency vibrations.",
    location: "Almost any biome in the Overworld.",
    notes: [
      "Its **head** and **wings** are breakable; breaking them makes them vulnerable in that spot and drops additional loot.",
      "Its **tail** is **severable**; cutting it lessens the effectiveness of the skrythe's tail attacks.",
      "A skrythe's roar has a ==wide range in front of it==; getting caught in it will cause ==heavy damage and stun you.==",
      "Skrythes are **weak to ice damage**",
      
      // "> Tip:"
    ],
    recommendations: [
      "Wear full ==netherite== armor enchanted with ==Prot IV== along with other sustaining perks and artifacts.",
      "Hold your ==Guard skill== when infront of the skrythe to block its roar, you will be stunned but it's beter than taking damage.",
      "Its charge attack is ==unblockable by any means==, so make sure to dodge away from it.",
      "Its eyes glow red when enraged; be extra careful during that phase and prepare for its **ultimate**.",
      "When a skrythe ==presses its mouth to the ground== during an enraged state, it is about to unleash its **ultimate**; back away immediately and have your guard up.",
      // "*No special enchantments needed.*"
    ],
    loot: [
      { item: "Monster Hardbone", quantity: "5 - 10", chance: "100%", note: "Sturdy bones dropped by large monsters.", image: "img/icons/monsterexpansion/monster_hardbone.png" },
      { item: "Skrythe Armorplate", quantity: "10 - 20", chance: "100%", note: "A dense fragment of scale dropped from the skrythe.", image: "img/icons/skrythe/skrythe_armorplate.png" },
      { item: "Skrythe Wing Membrane", quantity: "5 - 10", chance: "100%", note: "A torn stretch of wing membrane from the skrythe.", image: "img/icons/skrythe/skrythe_wing_membrane.png" },
      { item: "Skrythe Fang", quantity: "1 - 2", chance: "75%", note: "Sharp fangs broken from the skrythe's jaw.", image: "img/icons/skrythe/skrythe_fang.png" },
      { item: "Vocal Resonance Fold", quantity: "1", chance: "25%", note: "A magical fragment of the skrythe's throat, humming with the wyvern's lingering roar.", image: "img/icons/skrythe/vocal_resonance_fold.png" },
      { item: "Skrythe Tail", quantity: "1", chance: "Tail drop", note: "Skrythe's tail piece dropped by severing the wyvern's tail from its body.", image: "img/icons/skrythe/skrythe_tail.png" }                                
    ]
  },
  {
    id: "rakoth", realm: "Monster Expansion", name: "Rakoth",
    art: "linear-gradient(135deg,#b9d7ee,#4a86b8)",
    image: "img/bosses/monster-expansion/rakoth.png",
    health: "7500 HP", armor: 5, tier: 3,
    lore: "Massive four-legged lacertian geovore known for its heavily armored and rocky shell covering its back.",
    location: "Deserts and Badlands.",
    notes: [
      "Its **head** and **feet** are breakable; breaking them makes them vulnerable in that spot and drops additional loot.",
      "Its **tail** is **severable**; cutting it lessens the effectiveness of the rakoth's tail attacks.",
      "Rakoths attack slow but deal ==heavy damage==, but in their enraged state, they can gain massive speed by ==rolling themselves into a ball==; charging towards their targets.",
      // "> Tip:"
    ],
    recommendations: [
      "Wear full ==netherite== armor enchanted with ==Prot IV== along with other sustaining perks and artifacts.",
      // "*No special enchantments needed.*"
    ],
    loot: [
      { item: "Monster Hardbone", quantity: "5 - 10", chance: "100%", note: "Sturdy bones dropped by large monsters.", image: "img/icons/monsterexpansion/monster_hardbone.png" },
      { item: "Rakoth Underplate", quantity: "6 - 12", chance: "100%", note: "A dense, scarred armor plate torn from the rakoth's underside.", image: "img/icons/rakoth/rakoth_underplate.png" },
      { item: "Rakoth Carapace", quantity: "6 - 12", chance: "100%", note: "A hardened segment of exoskeleton dropped by the rakoth.", image: "img/icons/rakoth/rakoth_carapace.png" },
      { item: "Rakoth Horn", quantity: "1 - 2", chance: "75%", note: "A jagged horn broken from the rakoth's crown.", image: "img/icons/rakoth/rakoth_horn.png" },
      { item: "Bedrock Core", quantity: "1", chance: "25%", note: "A dense, ancient core formed under unimaginable pressure. It carries the unyielding strength of the earth.", image: "img/icons/rakoth/bedrock_core.png" },
      { item: "Rakoth Tail", quantity: "1", chance: "Tail drop", note: "Rakoth's tail piece dropped by severing the beast's tail from its body.", image: "img/icons/rakoth/rakoth_tail.png" }                                
    ]
  },
  {
    id: "leivekilth", realm: "Monster Expansion", name: "Leivekilth",
    art: "linear-gradient(135deg,#cfe3dc,#9fc3bd)",
    image: "img/bosses/monster-expansion/leivekilth.png",
    health: "15000 HP", armor: 5, tier: 4,  
    lore: "A colossal, solitary therian bearing the traits of a walrus. Its tough hide and devastating ice attacks make it a formidable predator in the frozen biomes.",
    location: "Frozen Oceans and Deep Frozen Oceans",
    notes: [
      "Its **head** and **arms** are breakable; breaking them makes them vulnerable in that spot and drops additional loot.",
      "Its **tail** is **severable**; cutting it lessens the effectiveness of the leivekilth's tail attacks.",
      "Leivekilths are **extremely weak to fire damage**",

      // "> Tip:"
    ],
    recommendations: [
      "Wear full ==netherite== armor, Prot IV is highly recommended. ",
      "A leivekilth will start floating upside down and start unleashing ice attacks towards its targets, at the end of this attack the leivekilth will unleash its **ultimate**",
      "Its **ultimate** has an ==absurd amount of range and damage==, make sure to clear the area before it is unleashed.",
      // "*No special enchantments needed.*"
    ],
    loot: [
      { item: "Monster Hardbone", quantity: "5 - 10", chance: "100%", note: "Sturdy bones dropped by large monsters.", image: "img/icons/monsterexpansion/monster_hardbone.png" },
      { item: "Leivekilth Rimepelt", quantity: "5 - 10", chance: "100%", note: "A frost-laced pelt shed from the leivekilth.", image: "img/icons/leivekilth/leivekilth_rimepelt.png" },
      { item: "Leivekilth Armorplate", quantity: "10 - 20", chance: "100%", note: "A dense fragment of scale dropped from the leivekilth.", image: "img/icons/leivekilth/leivekilth_armorplate.png" },
      { item: "Leivekilth Tusk", quantity: "1 - 2", chance: "75%", note: "A massive, frozen tusk torn from the leivekilth.", image: "img/icons/leivekilth/leivekilth_tusk.png" },
      { item: "Hoardfrost Shard", quantity: "4 - 8", chance: "75%", note: "A crystalline shard infused with biting hoarfrost dropped from the leivekilth.", image: "img/icons/leivekilth/hoarfrost_shard.png" },,
      { item: "Deepfreeze Gland", quantity: "1", chance: "25%", note: "A subzero organ harvested from the Leivekilth. It secretes an essence cold enough to freeze steel solid.", image: "img/icons/leivekilth/deepfreeze_gland.png" },
      { item: "Leivekilth Tail", quantity: "1", chance: "Tail drop", note: "Leivekilth's tail piece dropped by severing the beasts's tail from its body.", image: "img/icons/leivekilth/leivekilth_tail.png" }                                
    ]
  },
  /* ================================================================================================================= */
  {
    id: "cinder-warden", realm: "Cataclysm", name: "Cinder Warden",
    art: "linear-gradient(135deg,#f3d9a4,#e6a15a)",
    image: "img/bosses/cataclysm/cinder-warden.png",
    health: "1,400 HP", tier: 4, armor: 16,
    location: "Always present in the Ashfall Citadel (Nether). It respawns 2 real-time hours after defeat.",
    notes: [
      // Free-form notes: every line is one bullet and YOU choose the formatting
      // "**Magma Slam:** he raises both fists and the floor turns orange. ==Back away at least 6 blocks.==",
      "",
      "**Lava Pull:** a red chain appears. ==Break line of sight== behind a pillar.",
      "# Obsidian Guard",
      "His plates close and he takes **80% less damage**. *Back off and heal until they open again.*",
      "> Tip: bring Fire Resistance II potions, the whole fight is fire damage."
    ],
    recommendations: [
      "==Level 45==",
      "Fire Resistance II potions, Protection III armor, 2 stacks of golden apples."
    ],
    loot: [
      { item: "Obsidian Plate", rarity: "common", chance: "100%", note: "Crafting material for Warden gear", image: "img/icons/cinder-warden/obsidian_plate.png" },
      { item: "Emberforged Axe", rarity: "rare", chance: "12%", note: "Ignites enemies on critical hits", image: "img/icons/cinder-warden/emberforged_axe.png" },
      { item: "Warden's Core", rarity: "rare", chance: "6%", note: "Unlocks the Citadel vault", image: "img/icons/cinder-warden/warden_s_core.png" },
      { item: "Cinder Wings", rarity: "legendary", chance: "0.8%", note: "Short controlled glide, fire immune", image: "img/icons/cinder-warden/cinder_wings.png" }
    ]
  },
  {
    id: "cinder-warden", realm: "Cataclysm", name: "Cinder Warden",
    art: "linear-gradient(135deg,#f3d9a4,#e6a15a)",
    image: "img/bosses/cataclysm/cinder-warden.png",
    health: "1,400 HP", tier: 4, armor: 16,
    location: "Always present in the Ashfall Citadel (Nether). It respawns 2 real-time hours after defeat.",
    notes: [
      // Free-form notes: every line is one bullet and YOU choose the formatting
      // "**Magma Slam:** he raises both fists and the floor turns orange. ==Back away at least 6 blocks.==",
      "",
      "**Lava Pull:** a red chain appears. ==Break line of sight== behind a pillar.",
      "# Obsidian Guard",
      "His plates close and he takes **80% less damage**. *Back off and heal until they open again.*",
      "> Tip: bring Fire Resistance II potions, the whole fight is fire damage."
    ],
    recommendations: [
      "==Level 45==",
      "Fire Resistance II potions, Protection III armor, 2 stacks of golden apples."
    ],
    loot: [
      { item: "Obsidian Plate", rarity: "common", chance: "100%", note: "Crafting material for Warden gear", image: "img/icons/cinder-warden/obsidian_plate.png" },
      { item: "Emberforged Axe", rarity: "rare", chance: "12%", note: "Ignites enemies on critical hits", image: "img/icons/cinder-warden/emberforged_axe.png" },
      { item: "Warden's Core", rarity: "rare", chance: "6%", note: "Unlocks the Citadel vault", image: "img/icons/cinder-warden/warden_s_core.png" },
      { item: "Cinder Wings", rarity: "legendary", chance: "0.8%", note: "Short controlled glide, fire immune", image: "img/icons/cinder-warden/cinder_wings.png" }
    ]
  },
  {
    id: "tide-king", realm: "Cataclysm", name: "The Drowned King",
    art: "linear-gradient(135deg,#cfe3dc,#9fc3bd)",
    image: "img/bosses/cataclysm/tide-king.png",
    health: "900 HP", tier: 3, armor: 12,
    lore: "Once the ruler of a sunken kingdom, now a coral-crusted spirit that rises with the tide at ocean monuments.",
    location: "Throw a Tidal Pearl into the Monument's central pool during rain.",
    notes: [
      { name: "Riptide Charge", tell: "Trident spins and water swirls. Dodge sideways and avoid open water." },
      { name: "Summon Drowned", tell: "A horn sounds. Kill adds quickly or they swarm you." },
      { name: "Whirlpool", tell: "Surface sinks in a spiral. Swim up and out, and use Respiration." }
    ],
    recommendations: [
      "==Level 30==",
      "Respiration III helmet, Depth Strider boots, Impaling or Sharpness weapon."
    ],
    loot: [
      { item: "Tidal Pearl", rarity: "common", chance: "100%", note: "Key for rematch", image: "img/icons/tide-king/tidal_pearl.png" },
      { item: "Coral Shield", rarity: "uncommon", chance: "25%", note: "Blocks projectiles at a wider angle", image: "img/icons/tide-king/coral_shield.png" },
      { item: "Kingsong Trident", rarity: "rare", chance: "7%", note: "Lightning on throw, even without rain", image: "img/icons/tide-king/kingsong_trident.png" },
      { item: "Crown of Tides", rarity: "legendary", chance: "1%", note: "Permanent Water Breathing", image: "img/icons/tide-king/crown_of_tides.png" }
    ]
  },
  // ---- Placeholder bosses: BOMD, Minecraft and Legendary Monster (3 each). To add more to a category, copy a
  // block and keep the same `realm` text. A new realm name makes a new category button automatically.
  {
    // PLACEHOLDER: replace everything below.
    id: "bomd-1", realm: "BOMD", name: "BOMD Boss 1",
    image: "img/bosses/bomd/bomd-1.png",
    health: "400 HP", tier: 1, armor: 6,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 10==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/bomd-1/placeholder_drop.png" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below.
    id: "bomd-2", realm: "BOMD", name: "BOMD Boss 2",
    image: "img/bosses/bomd/bomd-2.png",
    health: "800 HP", tier: 2, armor: 10,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 20==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/bomd-2/placeholder_drop.png" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below.
    id: "bomd-3", realm: "BOMD", name: "BOMD Boss 3",
    image: "img/bosses/bomd/bomd-3.png",
    health: "1,200 HP", tier: 3, armor: 14,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 30==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/bomd-3/placeholder_drop.png" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below.
    id: "minecraft-1", realm: "Minecraft", name: "Minecraft Boss 1",
    image: "img/bosses/minecraft/minecraft-1.png",
    health: "400 HP", tier: 1, armor: 6,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 10==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/minecraft-1/placeholder_drop.png" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below.
    id: "minecraft-2", realm: "Minecraft", name: "Minecraft Boss 2",
    image: "img/bosses/minecraft/minecraft-2.png",
    health: "800 HP", tier: 2, armor: 10,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 20==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/minecraft-2/placeholder_drop.png" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below.
    id: "minecraft-3", realm: "Minecraft", name: "Minecraft Boss 3",
    image: "img/bosses/minecraft/minecraft-3.png",
    health: "1,200 HP", tier: 3, armor: 14,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 30==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/minecraft-3/placeholder_drop.png" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below.
    id: "minecraft-4", realm: "Minecraft", name: "Wither",
    image: "img/bosses/minecraft/minecraft-4.png",
    health: "1,200 HP", tier: 3, armor: 14,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 30==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/minecraft-4/placeholder_drop.png" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below.
    id: "legendary-monster-1", realm: "Legendary Monster", name: "Legendary Monster 1",
    image: "img/bosses/legendary-monster/legendary-monster-1.png",
    health: "400 HP", tier: 1, armor: 6,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 10==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/legendary-monster-1/placeholder_drop.png" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below.
    id: "legendary-monster-2", realm: "Legendary Monster", name: "Legendary Monster 2",
    image: "img/bosses/legendary-monster/legendary-monster-2.png",
    health: "800 HP", tier: 2, armor: 10,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 20==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/legendary-monster-2/placeholder_drop.png" }
    ]
  },
  {
    // PLACEHOLDER: replace everything below.
    id: "legendary-monster-3", realm: "Legendary Monster", name: "Legendary Monster 3",
    image: "img/bosses/legendary-monster/legendary-monster-3.png",
    health: "1,200 HP", tier: 3, armor: 14,
    lore: "Placeholder lore: describe this boss here.",
    location: "Placeholder: explain how to summon or find this boss.",
    notes: [
      { name: "Placeholder attack", tell: "Placeholder: what to watch for and how to react." }
    ],
    recommendations: [
      "==Level 30==",
      "Placeholder: recommended armor, weapons and potions."
    ],
    loot: [
      { item: "Placeholder Drop", rarity: "common", chance: "100%", note: "Placeholder: what it does", image: "img/icons/legendary-monster-3/placeholder_drop.png" }
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
// A note can be a plain string (free-form, with your own formatting) or { name, tell } (a bold name + text).
const noteLine = (n) => (typeof n === "string" ? n : `**${n.name}:** ${n.tell}`);
// Matches the search box against the boss name, realm, attack names and loot names.
// A word that starts with @ filters by CATEGORY instead: "@monster" shows the category whose name STARTS with
const matchesQuery = (b) => {
  const q = state.query;
  if (!q) return true;
  const words = q.split(/\s+/).filter(Boolean);
  const tags = words.filter((w) => w.startsWith("@")).map((w) => slug(w.slice(1)));
  if (tags.length && !tags.some((t) => slug(b.realm).startsWith(t))) return false;
  const hay = [b.name, b.realm, ...(b.notes || []).map((n) => noteLine(n).replace(/[*=#>]/g, "")), ...(b.loot || []).map((l) => l.item)].join(" ").toLowerCase();
  return words.filter((w) => !w.startsWith("@")).every((w) => hay.includes(w));
};
const visibleBosses = () => BOSSES.filter((b) => (state.realm === "All" || b.realm === state.realm) && matchesQuery(b));

function renderBossPanel() {
  const realms = ["All", ...new Set(BOSSES.map((b) => b.realm).filter(Boolean))];
  return `<div class="boss-browser">
    <aside class="contents" aria-label="Contents">
      <div class="col-head"><h2 class="col-title">Contents</h2><button class="info-btn" type="button" data-open="tiers" aria-haspopup="dialog" aria-label="What do the tiers mean?" title="What do the tiers mean?">?</button></div>
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
  const notes = richBlocks((b.notes || []).map(noteLine), "li");   // every note = one bullet; bold / highlight / cursive are up to you
  const loot = b.loot.map((l) => `<div class="chip"><i>${lootIcon(b, l, "chip-img")}</i>${esc(l.item)}</div>`).join("");
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
          <p class="note">${rich(b.lore)}</p>
          <button class="mark" type="button" data-check="${esc(b.id)}" aria-pressed="${done}"><span class="box" aria-hidden="true">✓</span><span class="mark-label">${done ? "Defeated" : "Mark as defeated"}</span></button>
        </div>
        <div class="more-details">
          <h4>Information</h4>${notes}
          <h4>Loot drops</h4><div class="loot-row">${loot}</div>
          <button class="btn" type="button" data-open="boss" data-key="${esc(b.id)}" aria-haspopup="dialog">More details</button>
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
// Pop-up opened by "Read the full entry": lore, location, recommendations and the full loot table.
function bossPopup(key) {
  const b = bossById(key);
  if (!b) return "";
  // Icon + name stay together on one line (.loot-name); data-label is the small label shown next to the numbers on phones.
  const loot = b.loot.map((l) => `<tr><td><span class="loot-name">${lootIcon(b, l, "loot-ico")}<span>${esc(l.item)}</span></span></td><td data-label="Qty">${esc(l.quantity || "1")}</td><td data-label="Chance">${esc(l.chance)}</td><td>${esc(l.note)}</td></tr>`).join("");
  return `
    <div class="m-head"><h3 id="modal-title">${esc(b.name)}</h3></div>
    <div class="detail">
      <h4>Location</h4><p>${rich(b.location)}</p>
      <h4>Notes & Recommendations</h4><div class="rich">${richBlocks(b.recommendations, "li")}</div>
      <h4>Loot &amp; drops</h4>
      <div class="loot-wrap"><table class="loot">
        <thead><tr><th scope="col">Item</th><th scope="col">Quantity</th><th scope="col">Chance</th><th scope="col">Notes</th></tr></thead>
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
//   image     : card + pop-up banner picture. Leave it out to use the default img/structures/<name>.png
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
    id: "market", name: "Market Market", image: "img/structures/market.png",
    teaser: "The main trading hub in the Art Blk SMP, Guild Master and his associates reside here.",
    info: "Market Market is the place for starting to players to ",
    infoImage: "img/structures/market-square.png",   // OPTIONAL: picture beside the info text (delete the line if unused)
  location: "World Spawn (-290.00 -273.50)", 
  sections: [   // OPTIONAL: extra text blocks, each with an optional picture beside it (delete the block if unused)
    { title: "The stalls", text: "Placeholder text: describe what the stalls sell. The picture sits beside this text.", image: "img/structures/market-stalls.png" }
  ],
    npcs: [
      { name: "Oshaune", role: "Coin Trader", category: "Permanent resident", image: "img/npcs/marigold.png",
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
   The Photos tab: a ruled notebook. Each spread has two rows (photo + its paragraph) that zig-zag across the pages.
   ========================================================== */

// ---- PHOTOS data -----------------------------------------------------------
// Entries fill the notebook in order, PHOTOS_PER_SPREAD per spread. Each entry is one ROW across the two pages and the rows zig-zag:
//   row 1: photo on the left page, its paragraph on the right page
//   row 2: paragraph on the left page, photo on the right page
// On phones the pages become one column: photo, its paragraph, next photo, its paragraph.
// Visitors turn pages with the buttons or the left / right arrow keys.
const PHOTOS_PER_SPREAD = 2;   // photos per spread = rows across the two pages. 2 fits the screen best.
const PHOTOS = [
  { title: "First sunrise at spawn", image: "img/photos/first-sunrise-at-spawn.png", text: "Placeholder paragraph: describe what is happening in this photo, who is in it and why it matters." },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] },
  { title: "The first builds", image: "img/photos/the-first-builds.png", text: "Placeholder paragraph: add the story behind this photo here." },
  { title: "Down the first boss", image: "img/photos/down-the-first-boss.png", text: "Placeholder paragraph: another memory from the server." },
  { title: "Community builds", image: "img/photos/community-builds.png", text: ["Placeholder paragraph: who built it and what makes it special.", "A second paragraph can go here if you need one."] }
];

// ---- The notebook: each spread = PHOTOS_PER_SPREAD rows across two ruled pages, with a page-turn between spreads ----
const photoBook = { spread: 0 };   // which spread is open (0 = the first)
const photoSpreadCount = () => Math.ceil(PHOTOS.length / PHOTOS_PER_SPREAD);

// The empty notebook (spread + Previous / Next buttons). showPhotoSpread() fills it.
function renderPhotoBook() {
  if (!PHOTOS.length) return `<p class="empty">No photos yet.</p>`;
  const total = photoSpreadCount();   // the "Page 1 of 14" label is a menu: pick a page to jump to it
  const options = Array.from({ length: total }, (_, i) => `<option value="${i}">Page ${i + 1} of ${total}</option>`).join("");
  return `
  <div class="notebook">
    <div class="nb-spread" id="photo-spread" aria-live="polite"></div>
    <div class="nb-nav">
      <button class="btn nb-turn" type="button" data-photo-turn="-1" aria-label="Previous page"><span aria-hidden="true">&larr;</span><span class="nb-word" aria-hidden="true"> Previous</span></button>
      <label class="nb-count"><span class="sr">Jump to page</span><select id="photo-jump">${options}</select></label>
      <button class="btn nb-turn" type="button" data-photo-turn="1" aria-label="Next page"><span class="nb-word" aria-hidden="true">Next </span><span aria-hidden="true">&rarr;</span></button>
    </div>
  </div>`;
}

// One photo with its title label (click the photo to enlarge it). `order` = its place in the phone layout (photo, text, photo, text...).
const photoBand = (g, order) => {
  const p = PHOTOS[g];
  return `
    <div class="nb-band nb-pic${order > 1 ? " nb-lower" : ""}" style="order:${order}">
      <div class="photo"><button class="zoom" type="button" data-open="photo" data-key="${g}" aria-haspopup="dialog" aria-label="Enlarge photo: ${esc(p.title)}" disabled><div class="shot-frame"><img src="${esc(cardImg(p, "photos", p.title))}" alt="${esc(p.title)}" onload="this.parentNode.classList.add('has-img'); this.closest('button').disabled = false" onerror="this.remove()"></div></button></div>
      <p class="nb-title"><span>${esc(p.title)}</span></p>
    </div>`;
};
// The paragraph(s) of one photo, written on the ruled lines.
const textBand = (g, order) => `<div class="nb-band nb-text${order > 1 ? " nb-lower" : ""}" style="order:${order}">${toParas(PHOTOS[g].text)}</div>`;

// Draws the open spread. dir: 1 = turned forward, -1 = turned back (plays the page-turn), 0 = first draw.
function showPhotoSpread(dir = 0) {
  const el = $("photo-spread");
  if (!el) return;
  const s = photoBook.spread, first = s * PHOTOS_PER_SPREAD;
  const left = [], right = [];
  for (let g = first, row = 0; g < Math.min(first + PHOTOS_PER_SPREAD, PHOTOS.length); g++, row++) {
    const pic = photoBand(g, row * 2), text = textBand(g, row * 2 + 1);
    if (row % 2 === 0) { left.push(pic); right.push(text); }   // even rows: photo left, paragraph right
    else { left.push(text); right.push(pic); }                  // odd rows: the other way round
  }
  el.innerHTML = `
    <div class="nb-page nb-left">${left.join("")}</div>
    <div class="nb-page nb-right">${right.join("")}</div>`;
  el.classList.remove("turn-next", "turn-prev");
  if (dir) { void el.offsetWidth; el.classList.add(dir > 0 ? "turn-next" : "turn-prev"); }
  $("photo-jump").value = String(s);   // one spread = one page; the menu between the buttons shows which one is open
  const buttons = [...main.querySelectorAll("[data-photo-turn]")];
  buttons.forEach((b) => { b.disabled = Number(b.dataset.photoTurn) < 0 ? s === 0 : s === photoSpreadCount() - 1; });
  if (document.activeElement?.disabled) buttons.find((b) => !b.disabled)?.focus();   // keep keyboard focus on a working button
}

// Jump straight to a page (spread) number, 0 = the first. Plays the page-turn in the right direction.
function jumpPhotoPage(target) {
  const to = Math.max(0, Math.min(photoSpreadCount() - 1, Number(target) || 0));
  if (to === photoBook.spread) return;
  const dir = to > photoBook.spread ? 1 : -1;
  photoBook.spread = to;
  showPhotoSpread(dir);
}

// Turn one spread forward (1) or back (-1). Does nothing past the first or last spread.
function turnPhotoPage(dir) {
  const next = photoBook.spread + dir;
  if (next < 0 || next >= photoSpreadCount()) return;
  photoBook.spread = next;
  showPhotoSpread(dir);
}

function photoPopup(key) {
  const p = PHOTOS[Number(key)];
  if (!p) return "";
  // Just the picture, zoomed. No title, no X: click the picture, click outside it, or press Esc to close.
  // (The title is kept for screen readers only.)
  return `<h3 id="modal-title" class="sr">${esc(p.title)}</h3><img class="lb-img" data-close src="${esc(cardImg(p, "photos", p.title))}" alt="${esc(p.title)}">`;
}

/* ==========================================================
   6. MECHANICS & UPDATES
   The "cards" tabs: each card opens a pop-up with its details.
   ========================================================== */

// ---- CARD data ----------------------------------------------------------------
// One list per "cards" tab; the key (mechanics / updates) must match the tab `id` in TABS.
// HOW TO ADD A CARD: copy one { ... } block into the right list (commas between blocks).
//   title   : card heading                 teaser : one-sentence summary on the card and at the top of the pop-up
//   image   : the card + pop-up banner picture. Leave it out to use the default img/<tab id>/<title>.png (see section 7)
//   content : the pop-up body, written however you like: a list of lines where you choose paragraphs, "- " bullets, "1. " steps,
//             "# " headings, **bold**, ==highlight==, *cursive*, and { image, caption } taped photos. See WRITING STYLE in section 7;
//             the "Combat Skills" card below is a sample.
//   topics  : OPTIONAL shortcut instead of content: just a bullet list
// (Sample text: replace it with your real guides and patch notes.)
const CARDS = {
  mechanics: [
    { title: "Combat Skills", image: "img/guide/combat-skills.png", teaser: "Weapon skills, dodging and how to get the most out of every fight.",
      content: [   // SAMPLE of the free-form style: you decide what is a paragraph, a list, bold, highlighted or cursive
        "# How combat works",
        "Every fight rewards **timing** over button-mashing. *Watch the telegraph, then strike.*",
        { image: "img/guide/combat-dodging.png", caption: "Dodging an attack" },
        "# The basics",
        "- **Melee, ranged and magic** skills each have their own tree",
        "- ==Dodging and blocking== both use stamina",
        "- Combos and cooldowns reset when you are hit",
        "# A good rhythm",
        "1. Lock on to your target",
        "2. Dodge the attack",
        "3. Hit back while they recover"
      ] },
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

// Pop-up for a Mechanics / Updates card: picture banner, summary, optional text+picture blocks, then the bullet list.
function cardPopup(key) {
  const [tabId, i] = key.split(":");
  const item = (CARDS[tabId] || [])[Number(i)];
  if (!item) return "";
  const topics = (item.topics || []).map((p) => `<li>${rich(p)}</li>`).join("");   // older, simple form: just a bullet list
  const body = item.content ? `<div class="rich">${richBlocks(item.content, "p")}</div>` : (topics ? `<h4>What's inside</h4><ul>${topics}</ul>` : "");
  return `
    ${cardBanner(cardImg(item, tabId, item.title), item.title, true)}
    <div class="modal-text">
      <h3 id="modal-title">${esc(item.title)}</h3>
      <p>${rich(item.teaser)}</p>
      ${(item.sections || []).map(mediaBlock).join("")}
      ${body}
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


const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/==(.+?)==/g, '<mark class="hl">$1</mark>').replace(/\*(.+?)\*/g, '<em class="cursive">$1</em>');

// A taped photo with an optional title label, like the Photos tab (shows a placeholder until the picture file exists). Click it to enlarge.
const pictureHtml = (p) => `
  <figure class="pic">
    <div class="photo"><button class="zoom" type="button" data-zoom="${esc(p.image)}" data-alt="${esc(p.caption || "")}" aria-label="Enlarge picture${p.caption ? ": " + esc(p.caption) : ""}" disabled><div class="shot-frame"><img src="${esc(p.image)}" alt="${esc(p.caption || "")}" onload="this.parentNode.classList.add('has-img'); this.closest('button').disabled = false" onerror="this.remove()"></div></button></div>
    ${p.caption ? `<p class="pic-title"><span>${rich(p.caption)}</span></p>` : ""}
  </figure>`;

// Turns a list of lines (strings and { image, caption } pictures) into HTML. defaultKind: "p" = paragraphs (cards), "li" = bullets (boss notes).
function richBlocks(lines, defaultKind = "p") {
  const out = [];
  let list = null;
  const flush = () => { if (list) { out.push(`<${list.tag}>${list.items.map((x) => `<li>${x}</li>`).join("")}</${list.tag}>`); list = null; } };
  const item = (tag, html) => { if (!list || list.tag !== tag) { flush(); list = { tag, items: [] }; } list.items.push(html); };
  [].concat(lines || []).forEach((raw) => {
    if (raw && typeof raw === "object") { flush(); if (raw.image) out.push(pictureHtml(raw)); return; }
    const t = String(raw);
    let m;
    if ((m = t.match(/^#\s+(.*)/))) { flush(); out.push(`<h4>${rich(m[1])}</h4>`); }
    else if ((m = t.match(/^-\s+(.*)/))) item("ul", rich(m[1]));
    else if ((m = t.match(/^\d+[.)]\s+(.*)/))) item("ol", rich(m[1]));
    else if ((m = t.match(/^>\s+(.*)/))) { flush(); out.push(`<p>${rich(m[1])}</p>`); }
    else if (defaultKind === "li") item("ul", rich(t));
    else { flush(); out.push(`<p>${rich(t)}</p>`); }
  });
  flush();
  return out.join("");
}

// BOSS PICTURES: a boss uses its `image` path if it has one, otherwise img/<category>/<boss id>.png (e.g. img/cataclysm/ignis.png).
const bossImg = (b) => b.image || `img/${slug(b.realm)}/${slug(b.id)}.png`;
// Loot icon: img/icons/<boss id>/<item name>.png
const lootImg = (b, l) => l.image || `img/icons/${slug(b.id)}/${slug(l.item)}.png`;
const lootIcon = (b, l, cls) => `<img class="${cls}" src="${esc(lootImg(b, l))}" alt="" onerror="this.hidden=true">`;
const art = (b) => `<div class="art"${b.art ? ` style="--art:${esc(b.art)}"` : ""}><img src="${esc(bossImg(b))}" alt="${esc(b.name)}" loading="lazy" onerror="this.hidden=true"></div>`;

// CARD PICTURES (Structures, Mechanics, Updates, Photos). A card uses its `image` path if it has one.
// If it has none, the default is  img/<tab id>/<card name, lowercase with dashes>.png
//   e.g. the "Market" card on the "structures" tab -> img/structures/market.png, "Update 1.0" on "updates" -> img/updates/update-1-0.png
const cardImg = (item, folder, name) => item.image || `img/${folder}/${slug(name)}.png`;
// zoom = true (used inside pop-ups) makes the banner click-to-enlarge once its picture has loaded.
const cardBanner = (src, alt, zoom = false) => `<div class="card-banner"><img src="${esc(src)}" alt="${esc(alt)}" onload="this.parentNode.classList.add('has-img')${zoom ? "; this.nextElementSibling.disabled = false" : ""}" onerror="this.remove()">${zoom ? `<button class="zoom-hit" type="button" data-zoom="${esc(src)}" data-alt="${esc(alt)}" aria-label="Enlarge picture: ${esc(alt)}" disabled></button>` : ""}</div>`;

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
const POPUPS = { boss: bossPopup, image: bossImagePopup, structure: structurePopup, photo: photoPopup, card: cardPopup, tiers: tiersPopup };
const WIDE_POPUPS = ["image"];     // boss picture: wide window with a title and an X
const MEDIUM_POPUPS = ["boss"];    // boss full entry: a bit wider than normal so the loot table fits
const BARE_POPUPS = ["photo"];     // Photos tab: only the zoomed picture, no window, title or X

let lastFocus = null;
function openModal(kind, key) {
  const html = POPUPS[kind]?.(key);
  if (!html) return;
  modalWindow.classList.toggle("lightbox", WIDE_POPUPS.includes(kind));
  modalWindow.classList.toggle("medium", MEDIUM_POPUPS.includes(kind));
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

// PICTURE ZOOM: a picture inside a pop-up (data-zoom="<src>") opens large on top of it; closing it returns to the pop-up.
let zoomLayer = null, zoomFrom = null;
function openZoom(src, alt, from) {
  if (!zoomLayer) {   // created the first time it is needed
    zoomLayer = document.createElement("div");
    zoomLayer.className = "zoom-layer"; zoomLayer.tabIndex = -1; zoomLayer.hidden = true;
    zoomLayer.innerHTML = '<img class="zoom-img" alt="">';
    zoomLayer.addEventListener("click", closeZoom);
    document.body.appendChild(zoomLayer);
  }
  const img = zoomLayer.querySelector("img");
  img.src = src; img.alt = alt || "";
  zoomFrom = from;
  zoomLayer.hidden = false;
  zoomLayer.focus();
}
function closeZoom() {   // returns true if a zoomed picture was open
  if (!zoomLayer || zoomLayer.hidden) return false;
  zoomLayer.hidden = true;
  zoomFrom?.focus();
  return true;
}

modal.addEventListener("click", (e) => {
  const z = e.target.closest("[data-zoom]");
  if (z) return openZoom(z.dataset.zoom, z.dataset.alt, z);
  if (e.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") return closeZoom() || closeModal();   // Esc closes a zoomed picture first, then the pop-up
  if (zoomLayer && !zoomLayer.hidden) { if (e.key === "Tab") e.preventDefault(); return; }
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
    themeBtn.setAttribute("aria-label", "Toggle color theme");
    const logo = $("server-logo")?.querySelector("img");
    if (logo) logo.src = dark && SITE.logoAlt ? SITE.logoAlt : SITE.logo;
    const favicon = document.getElementById("favicon");
    if (favicon) favicon.href = dark && SITE.logoAlt ? SITE.logoAlt : SITE.logo;
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
      musicBtn.querySelector("span").textContent = on ? "🔊" : "🔇";
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
  photos:     () => renderPhotoBook(),
  cards:      (tab) => `<div class="grid">${(CARDS[tab.id] || []).map((it, i) => renderCard(it, tab.id, i)).join("")}</div>`
};

// Fills the header and footer, then creates one tab button + one panel for every entry in TABS.
function build() {
  $("server-name").textContent = SITE.name;
  $("footer-text").textContent = SITE.footer;
  document.title = SITE.name;
if (SITE.logo) {
    const lg = $("server-logo");
    lg.classList.add("has-img");
    const img = document.createElement("img");
    img.src = SITE.logo;
    img.alt = "";
    img.addEventListener("error", () => {
      if (SITE.logoAlt && !img.dataset.triedAlt) {
        img.dataset.triedAlt = "1";
        img.src = SITE.logoAlt;
      } else {
        lg.classList.remove("has-img");
        lg.textContent = "Logo";
      }
    });
    lg.replaceChildren(img);
  }
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
    const hasHeading = !["home", "bosses", "photos"].includes(tab.type);   // title + intro above the cards / photos
    const panel = document.createElement("section");
    panel.className = "panel" + (tab.type === "bosses" ? " fit" : "") + (tab.type === "photos" ? " nb-panel" : "") + (tab.type === "home" ? " home-panel" : "");
    panel.id = `panel-${tab.id}`;
    panel.setAttribute("role", "tabpanel"); panel.setAttribute("aria-labelledby", btn.id);
    panel.tabIndex = 0; panel.hidden = true;
    panel.innerHTML = (hasHeading ? `<div class="panel-head"><h2 class="col-title">${esc(tab.title)}</h2><p>${esc(tab.intro)}</p></div>` : "") + body;
    main.appendChild(panel);
  });
  if (BOSSES.length) setRealm("All");
  showPhotoSpread();   // first photo spread
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
  const turn = e.target.closest("[data-photo-turn]");   // notebook Previous / Next
  if (turn) return turnPhotoPage(Number(turn.dataset.photoTurn));
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

main.addEventListener("change", (e) => {   // notebook: the "Page 1 of 14" menu jumps to the chosen page
  if (e.target.id === "photo-jump") jumpPhotoPage(e.target.value);
});
main.addEventListener("keydown", (e) => {   // notebook: left / right arrow keys turn the page
  if (e.altKey || e.ctrlKey || e.metaKey || e.target.closest("select") || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
  if (!e.target.closest(".panel")?.querySelector(".notebook")) return;
  turnPhotoPage(e.key === "ArrowRight" ? 1 : -1);
});
window.addEventListener("hashchange", () => activate(location.hash.slice(1), { updateHash: false }));

build();
activate(location.hash.slice(1) || TABS[0].id, { updateHash: false });
