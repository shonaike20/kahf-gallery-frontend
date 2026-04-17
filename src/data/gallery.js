// Monolithic local gallery data — no backend required.
// All images are resolved via Vite's import.meta.glob at build time.

// Full-resolution URLs (used in lightbox / series detail)
const allImages = import.meta.glob('../kahf-images/**/*', { eager: true, query: '?url', import: 'default' })

// Thumbnail URLs — 350px wide WebP, used for landing page cards and series grids
const thumbImages = import.meta.glob('../kahf-images/**/*', {
  eager: true,
  query: { w: 350, format: 'webp' },
  import: 'default',
})

/** Resolve a local image file to its full-res Vite URL */
function i(folder, file) {
  const key = `../kahf-images/${folder}/${file}`
  return allImages[key] ?? ''
}

/** Resolve a local image file to its thumbnail URL (falls back to full-res) */
function t(folder, file) {
  const key = `../kahf-images/${folder}/${file}`
  return thumbImages[key] ?? allImages[key] ?? ''
}

// ── Fisher-Yates shuffle ───────────────────────────────────────────────────────
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Series data ────────────────────────────────────────────────────────────────

export const GALLERY_SERIES = [

  // ── 1. Jnoub – What Survives the Light ──────────────────────────────────────
  {
    id: 'jnoub-what-survives-the-light',
    series_name: 'Jnoub – What Survives the Light',
    author: 'Ali Abou Khalil',
    description: `A place where the past has not finished yet, and the future has already begun.  This is how my Lebanon is best described. A Lebanon that exists in a state of temporal overlap. These photographs were taken in Lebanon's Southern parts months after an Israeli aggression against the country. Jnoub, often referred to as the South of Lebanon, is marked by destruction and disappearance, resilience and hope, and moments filled with movement, play, and a sense of the extraordinary. Here, time does not progress - it accumulates.

Rubble becomes an archive. Walls remember. Streets carry echoes of what was, while children run through them as if time were negotiable. Their play is not a denial of loss, but dialogue with it. In these moments, destruction and imagination occupy the same breath. A place where the present constantly engages with the past & future.

Photography, in this context, is not documentation but translation. Light extracts fragments of truth from places where history has been repeatedly interrupted. Shadows are not absence. They are evidence - proof of lives & routines continuing within fractured landscapes.

This series resists the spectacle of ruin. Instead, it attends to the ordinary gestures that survive instability: a glance, a game, a pause. Searching not for resolution but for continuity, the camera becomes a third eye, Lebanon is not suspended between collapse and hope - it contains both simultaneously. These images ask us to remain inside that tension, where past, present, and future merge, and where survival itself becomes an act of imagination & resistance.`,
    images: [
      {
        id: '1-01',
        image_name: 'Where Time Accumulates',
        description: 'Tyre, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '1. Where time accumulate (Tyre, South Lebanon) .jpg'),
      },
      {
        id: '1-02',
        image_name: 'An Architectural Wound',
        description: 'Toul, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '2. An architectual wound (Toul, South Lebanon).jpg'),
      },
      {
        id: '1-03',
        image_name: 'Jamal in Ruins',
        description: 'Naqoura, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '3. Jamal in Ruins (Naqoura, South Lebanon) .jpg'),
      },
      {
        id: '1-04',
        image_name: 'Abandoned',
        description: 'Yater, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '4. Abandoned (Yater, South Lebanon).jpg'),
      },
      {
        id: '1-05',
        image_name: 'Our Future Left in the Past',
        description: 'Al Qlaileh, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '5. Our Future left in the Past (Al Qlaileh, Sotuh Lebanon).jpg'),
      },
      {
        id: '1-06',
        image_name: 'Backbone and Guardian of the Future',
        description: 'Al Qlaile, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '6. Backbone and Guardian of the Future (Al Qlaile, South Lebanon).jpg'),
      },
      {
        id: '1-07',
        image_name: 'Routine of Past, Present, and Future',
        description: 'Tyre, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '7. Routine of Past, Present, and Future (Tyre, South Lebanon) .jpg'),
      },
      {
        id: '1-08',
        image_name: 'Graveyard of Untold Futures',
        description: 'Zebqine, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '8. Graveyard of Untold Futures (Zebqine, South Lebanon).jpg'),
      },
      {
        id: '1-09',
        image_name: 'When Light Breaks the Occupier',
        description: 'Yarine, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '9. When Light Breaks the Occupier (Yarine, South Lebanon).jpg'),
      },
      {
        id: '1-10',
        image_name: 'Past, Present, and Future — Lebanon Where Time Overlaps',
        description: 'Tyre, South Lebanon',
        src: i('1. Jnoub \u2013 What Survives the Light by Ali Abou Khalil', '10. Past, Present, and Future - Lebanon Where Time Overlaps (Tyre, South Lebanon).jpg'),
      },
    ],
  },

  // ── 2. Minan: An Outer Womb ───────────────────────────────────────────────
  {
    id: 'minan-an-outer-womb',
    series_name: 'Minan: An Outer Womb',
    author: 'Sayid Don',
    description: `In Somali, the word "minan" has two meanings. The first is a mother's womb; the second is home itself, a womb in the outer world. The city of Mogadishu hosts millions of residents living within her womb. Once a beautiful city, Mogadishu endured a heartbreaking history of destruction, civil war, and terrorism. Today, she dreams of healing. Mogadishu's inhabitants mirror her condition; broken people slowly recovering from the wounds of time.

This photographic series, titled "Minan: An Outer Womb," explores the relationship of coexistence between Mogadishu and its residents. When this project began, I sought to understand how urban spaces host people within them. But what happens when that city is war-torn, and its people are resilient?

An old man stands tall in a compound once home to one of East Africa's most famous jazz clubs, Al Uruba. Behind him, the skyline is split between crumbling, demolished buildings and newly rising skyscrapers. Elsewhere, a teenage girl sits on a stool beside her younger sister, with freshly washed clothes hanging behind them. At the beach, a group of youths play football.

This project treats Mogadishu as a canvas of resilience and recovery.`,
    images: [
      { id: '2-01', image_name: 'Al Uruba Hotel',                                    description: 'Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', '1000330627.jpg') },
      { id: '2-02', image_name: 'Rising',                                             description: 'Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', '1000330736.jpg') },
      { id: '2-03', image_name: 'The Shop Opposite the Sea',                          description: 'Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', '1000330739.jpg') },
      { id: '2-04', image_name: 'A Dawn of a Thousand Dawns',                        description: 'Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', '1000389680.jpg') },
      { id: '2-05', image_name: 'The Fish Market Has a View',                        description: 'Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', 'DSCF3441.jpg') },
      { id: '2-06', image_name: 'Dhallaanimo Hufneydaa (Oh Precious Childhood)',     description: 'Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', 'DSCF3944.JPG') },
      { id: '2-07', image_name: 'Gacal is ma Ciriirsho (The Stairs Can Carry Us Both)', description: 'Lido Beach, Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', 'DSCF4367.JPG') },
      { id: '2-08', image_name: 'Sisters',                                            description: 'Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', 'DSCF4369.JPG') },
      { id: '2-09', image_name: 'Resilience',                                         description: 'Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', 'DSCF4620.JPG') },
      { id: '2-10', image_name: 'Young Sufis',                                        description: 'Mogadishu', src: i('2. Minan- An Outer Womb by Sayid Sayid', 'DSCF8023.JPG') },
    ],
  },

  // ── 3. Childhood ──────────────────────────────────────────────────────────
  {
    id: 'childhood',
    series_name: 'Childhood',
    author: 'Maveric Galmiche',
    description: `There is a quiet form of mourning we all go through: the loss of childhood. Not childhood as an idealized memory, but as a state of openness, of unguarded presence in the world, that slowly slips away without ever fully disappearing. The child does not die; it lies dormant. It hides in restrained gestures, postponed desires, overly serious gazes.

We spend our lives searching for childhood, often without knowing exactly what we are looking for. It is through the lens that I found my inner child again.

In Senegal, children take over the streets, courtyards, and beaches. They transform shared spaces into playgrounds. For the duration of an improvised match, children transform space with only two stones as goalposts and a worn ball. Most often, not even with that. Everything is playable, nothing is fixed.

Burning sand, asphalt, and crumbling walls bend to their imagination. They inhabit the world with an ease most of us have forgotten. In their movement, their shouts, their moments of stillness, you can recognize the child within you- no longer intact, but still alive, still surprised.

All photographs were taken with a Nikon F2 using Kodak Tri-X 400 film.`,
    images: [
      { id: '3-01', image_name: 'Balle au Centre',     description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Balle au centre.jpg') },
      { id: '3-02', image_name: 'Basketball',           description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Basketball.jpg') },
      { id: '3-03', image_name: 'Beach Ball',           description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Beach ball.jpg') },
      { id: '3-04', image_name: 'Beach Hair Stylist',   description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Beach hair stylist.jpg') },
      { id: '3-05', image_name: 'Bo\u00eete \u00e0 Chaussures', description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Bo\u00eete \u00e0 chaussures.jpg') },
      { id: '3-06', image_name: 'Child Labour',         description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Child labour.jpg') },
      { id: '3-07', image_name: 'Horizon',              description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Horizon.jpg') },
      { id: '3-08', image_name: 'Night',                description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Night.jpg') },
      { id: '3-09', image_name: 'School Girls',         description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'School girls.jpg') },
      { id: '3-10', image_name: 'Shoes',                description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Shoes`.jpg') },
      { id: '3-11', image_name: 'Street Play',          description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Street play.jpg') },
      { id: '3-12', image_name: 'Way to School',        description: 'Senegal', src: i('3. Childhood by Maveric Galmiche', 'Way to school.jpg') },
    ],
  },

  // ── 4. Big City Life ──────────────────────────────────────────────────────
  {
    id: 'big-city-life',
    series_name: 'Big City Life',
    author: 'Karim Sakr',
    description: '',
    images: [
      { id: '4-01', image_name: 'I',    description: '', src: i('4. Big city life by Karim Sakr', 'DSCF0560-2.jpg') },
      { id: '4-02', image_name: 'II',   description: '', src: i('4. Big city life by Karim Sakr', 'DSCF1360.jpg') },
      { id: '4-03', image_name: 'III',  description: '', src: i('4. Big city life by Karim Sakr', 'DSCF2160.jpg') },
      { id: '4-04', image_name: 'IV',   description: '', src: i('4. Big city life by Karim Sakr', 'DSCF5284-2.jpg') },
      { id: '4-05', image_name: 'V',    description: '', src: i('4. Big city life by Karim Sakr', 'DSCF5573.jpg') },
      { id: '4-06', image_name: 'VI',   description: '', src: i('4. Big city life by Karim Sakr', 'DSCF9256-17.jpg') },
      { id: '4-07', image_name: 'VII',  description: '', src: i('4. Big city life by Karim Sakr', 'DSCF9280-66.jpg') },
      { id: '4-08', image_name: 'VIII', description: '', src: i('4. Big city life by Karim Sakr', 'DSCF9353-28.jpg') },
      { id: '4-09', image_name: 'IX',   description: '', src: i('4. Big city life by Karim Sakr', 'GR000826-Edit.jpg') },
      { id: '4-10', image_name: 'X',    description: '', src: i('4. Big city life by Karim Sakr', 'IMG_2628-169.jpg') },
    ],
  },

  // ── 5. Djanet ─────────────────────────────────────────────────────────────
  {
    id: 'djanet',
    series_name: 'Djanet',
    author: 'Hassan Gray',
    description: `"The general perception [from] the world is that the desert is desolate. That the desert is dominated by nothingness. That the desert is a void. And this is not true. In reality the desert has everything."
- Ibrahim Al-Koni, 2014

After only one week in Djanet, Algeria, spending time with the incredibly hospitable Tuareg people, I came to understand Al-Koni's description of the Sahara and all that it encompasses. It is nothing short of dishonest and unjust to claim this land as a desolate void.

Within the Djanet province, the Saharan landscape's diversity is made manifest with the oasis city consisting mainly of manmade buildings from locally sourced mud-brick and stone. Djanet's surrounding region ranges from sand dunes and watering holes to rocky cliff faces and canyons. Amidst extreme elements, survival is an everyday consideration for the Tuaregs, achieved with a great understanding of and deep respect for the land. Life here, due to its harsh conditions, is stripped of all unnecessaries. This only echoes Al-Koni's point once more that the desert truly has everything.`,
    images: [
      { id: '5-01', image_name: 'Djanet I',    description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF0560_2025.jpg') },
      { id: '5-02', image_name: 'Djanet II',   description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF0579_2025.jpg') },
      { id: '5-03', image_name: 'Djanet III',  description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF0689_2025.jpg') },
      { id: '5-04', image_name: 'Djanet IV',   description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF0779_2025.jpg') },
      { id: '5-05', image_name: 'Djanet V',    description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF0789_2025.jpg') },
      { id: '5-06', image_name: 'Djanet VI',   description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF0809_2025.jpg') },
      { id: '5-07', image_name: 'Djanet VII',  description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF0838_2025.jpg') },
      { id: '5-08', image_name: 'Djanet VIII', description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF1006_2025.jpg') },
      { id: '5-09', image_name: 'Djanet IX',   description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF1032_2025.jpg') },
      { id: '5-10', image_name: 'Djanet X',    description: 'Djanet, Algeria, 2025', src: i('5. Djanet by Hassan Grey', 'HassanGray_Djanet_DSCF1132_2025.jpg') },
    ],
  },

  // ── 6. Untitled ───────────────────────────────────────────────────────────
  {
    id: 'untitled',
    series_name: 'Untitled',
    author: 'Roberto Tenace',
    description: `In this series of photographs, there are people and places of different faiths. With its own set of rules and expectations, the differences amongst the world's faith traditions are rooted in time. People in these photographs live far from each other and worship their own God in their own personal ways. Nonetheless, and despite these differences, they seem to me closer than I would have thought. I found similarities where differences should have been. It felt simultaneously unexpected and true. These pictures explain my feelings. The project was shot in the last year across Armenia and Turkey.`,
    images: [
      { id: '6-01', image_name: 'Untitled 1',  description: 'Armenia / Turkey', src: i('6. Untitled by Roberto Tenace', 'roberto - tenace -1.jpg') },
      { id: '6-02', image_name: 'Untitled 3',  description: 'Armenia / Turkey', src: i('6. Untitled by Roberto Tenace', 'roberto - tenace -3.jpg') },
      { id: '6-03', image_name: 'Untitled 4',  description: 'Armenia / Turkey', src: i('6. Untitled by Roberto Tenace', 'roberto - tenace -4.jpg') },
      { id: '6-04', image_name: 'Untitled 5',  description: 'Armenia / Turkey', src: i('6. Untitled by Roberto Tenace', 'roberto - tenace -5.jpg') },
      { id: '6-05', image_name: 'Untitled 8',  description: 'Armenia / Turkey', src: i('6. Untitled by Roberto Tenace', 'roberto - tenace -8jpg.jpg') },
      { id: '6-06', image_name: 'Untitled 9',  description: 'Armenia / Turkey', src: i('6. Untitled by Roberto Tenace', 'roberto - tenace -9.jpg') },
      { id: '6-07', image_name: 'Untitled 13', description: 'Armenia / Turkey', src: i('6. Untitled by Roberto Tenace', 'roberto - tenace -13.jpg') },
      { id: '6-09', image_name: 'Untitled 14', description: 'Armenia / Turkey', src: i('6. Untitled by Roberto Tenace', 'roberto - tenace -14.jpg') },
      { id: '6-10', image_name: 'Untitled 15', description: 'Armenia / Turkey', src: i('6. Untitled by Roberto Tenace', 'roberto - tenace -15.jpg') },
    ],
  },

  // ── 7. Unspoken Feelings ──────────────────────────────────────────────────
  {
    id: 'unspoken-feelings',
    series_name: 'Unspoken Feelings',
    author: 'Mohamed Rachdi',
    description: `Produced between 2022 and 2024 across different regions of Tunisia, Unspoken Feelings brings together fragmented moments, people, gestures, atmospheres, ambiguities, unfamiliarities, and places. Each of these collectively evoke emotions without the use of words.

Rather than forming a fixed narrative, the photographs in Unspoken Feelings function as emotional fragments. Each image captures a suspended moment where meaning emerges through suggestion: a posture, a gaze, a space, or an absence. Sentiments of alienation, intimacy, tension, or quiet contemplation resonate across the series without being explicitly defined.

This series invites viewers to actively engage with an image, to intuitively connect them, and to complete the story for themselves. Unspoken Feelings proposes photography as a shared space of interpretation, where emotion precedes explanation and silence is a form of expression.`,
    images: [
      { id: '7-01', image_name: 'Fragment I',   description: 'Tunisia, 2022\u20132024', src: i('7. Unspoken feelings by Mohamed Rachdi', '146036472.jpg') },
      { id: '7-02', image_name: 'Fragment II',  description: 'Tunisia, 2022\u20132024', src: i('7. Unspoken feelings by Mohamed Rachdi', '20201108_224044.jpg') },
      { id: '7-03', image_name: 'Fragment III', description: 'Tunisia, 2022\u20132024', src: i('7. Unspoken feelings by Mohamed Rachdi', '20211706408.jpg') },
      { id: '7-04', image_name: 'Fragment IV',  description: 'Tunisia, 2022\u20132024', src: i('7. Unspoken feelings by Mohamed Rachdi', '2022_0803_11235000.jpg') },
      { id: '7-05', image_name: 'Fragment V',   description: 'Tunisia, 2022\u20132024', src: i('7. Unspoken feelings by Mohamed Rachdi', '20240609_223339.jpg') },
      { id: '7-06', image_name: 'Fragment VI',  description: 'Tunisia, 2022\u20132024', src: i('7. Unspoken feelings by Mohamed Rachdi', 'IMG_2985 (1).JPG') },
      { id: '7-07', image_name: 'Disappearing', description: 'Tunisia, 2022\u20132024', src: i('7. Unspoken feelings by Mohamed Rachdi', 'disappearing.JPG') },
    ],
  },

  // ── 8. Souk System ────────────────────────────────────────────────────────
  {
    id: 'souk-system',
    series_name: 'Souk System',
    author: 'Taha Limane',
    description: '',
    images: [
      { id: '8-01', image_name: 'Souk I',    description: '', src: i('8. Souk System by Taha Limane', '1b188728-4668-4796-a56b-4fc3e05f70d0.jpeg') },
      { id: '8-02', image_name: 'Souk II',   description: '', src: i('8. Souk System by Taha Limane', '32fc2c3c-d6e7-4b47-93b6-12853ae02f59.jpeg') },
      { id: '8-03', image_name: 'Souk III',  description: '', src: i('8. Souk System by Taha Limane', '440fd5ee-9832-4a60-8fef-f9a2a1c8cb88.jpeg') },
      { id: '8-04', image_name: 'Souk IV',   description: '', src: i('8. Souk System by Taha Limane', '5fc8965b-fb4b-4391-9798-7b5fefa8509a.jpeg') },
      { id: '8-05', image_name: 'Souk V',    description: '', src: i('8. Souk System by Taha Limane', '6d513b04-bb3c-4f26-9e52-63d1740f7cef.jpeg') },
      { id: '8-06', image_name: 'Souk VI',   description: '', src: i('8. Souk System by Taha Limane', 'b33593cf-47ae-4e82-913a-58c18a5ba14f.jpeg') },
      { id: '8-07', image_name: 'Souk VII',  description: '', src: i('8. Souk System by Taha Limane', 'd5038e1c-cb15-4e06-a01b-84a1f955f521.jpeg') },
      { id: '8-08', image_name: 'Souk VIII', description: '', src: i('8. Souk System by Taha Limane', 'f3a9ff7b-3a79-4792-a137-ab5773d93f25.jpeg') },
    ],
  },

  // ── 9. Everything Under Heaven / 天下 ────────────────────────────────────
  {
    id: 'everything-under-heaven',
    series_name: 'Everything Under Heaven / \u5929\u4e0b',
    author: 'Joseph Cochran',
    description: `In the early 2010s, Joseph Cochran left the United States for the People's Republic of China. He was looking for distance from a country that felt increasingly unlivable. In Shanghai, he found a different pace. Over the next five years, Cochran built a life, and with it, a purpose. China gave him what America couldn't: time, relative stability, and room to observe.

In China, instinct became discipline, built through daily walking and sustained attention. Across China and neighboring regions, Cochran produced hundreds of images that would later be gathered under a single title: Everything Under Heaven.

Everything under Heaven translates the classical idea of tianxia -a phrase that carries more than poetic scale. Tianxia names the world as a physical totality, a political order that claims to organize it, and a moral story used to justify that claim. In that sense, Everything Under Heaven is not simply a portrait of a place, but a study of how a world is structured, administered, and made legible through daily life.

This work holds two interwoven narratives: an intimate portrait of China during a period of rapid urban and technological change, and a portrait of the artist in formation.`,
    images: [
      { id: '9-01', image_name: '2 (Fahuazhen Lu)',       description: 'Shanghai, 2015', src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', '2 (Fahuazhen Lu), 2015.jpg') },
      { id: '9-02', image_name: 'Daniela',               description: '2016',           src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', 'Daniela, 2016.jpg') },
      { id: '9-03', image_name: 'DuoDuo',                description: '2015',           src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', 'DuoDuo,2015.JPG') },
      { id: '9-04', image_name: 'Elevator',              description: '2016',           src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', 'Elevator, 2016.jpg') },
      { id: '9-05', image_name: 'First Day Out',         description: '2014',           src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', 'First Day Out, 2014.JPG') },
      { id: '9-06', image_name: 'Huxi Mosque',           description: 'Shanghai, 2016', src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', 'Huxi Mosque, 2016.JPG') },
      { id: '9-07', image_name: 'Morning (Shanghai)',    description: '2014',           src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', 'Morning (Shanghai), 2014.jpg') },
      { id: '9-08', image_name: 'PR1959-09n',            description: '',               src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', 'PR1959-09n.jpg') },
      { id: '9-09', image_name: 'PR1966-33 Shot One',    description: '',               src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', 'PR1966-33_Shot ONE.jpg') },
      { id: '9-10', image_name: 'Zhujiajiao',            description: '2015',           src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', 'Zhuiajiao, 2015.jpg') },
      { id: '9-11', image_name: '\u5e7f\u573a\u821e (Square Dance)', description: 'Shanghai, 2017', src: i('9. Everything Under Heaven_ \u5929\u4e0b by Joseph Cochran', '\u5e7f\u573a\u821e (Square Dance, Shanghai), 2017.jpg') },
    ],
  },

  // ── 10. Knowledge That Refuses to Disappear ───────────────────────────────
  {
    id: 'knowledge-that-refuses-to-disappear',
    series_name: 'Knowledge That Refuses to Disappear',
    author: 'Saqib Ali',
    description: `Kashmir has lived under prolonged conflict for decades. It is a region shaped by militarization, surveillance, and political uncertainty. For generations growing up in this environment, everyday life is marked by interruption, fear, and instability. Nonetheless, within this fractured landscape, madrassas have quietly endured.

For many children, madrassas offer more than religious instruction. They provide food, shelter, routine, and a rare sense of continuity in lives otherwise shaped by conflict and poverty. Yet madrassas themselves exist under persistent suspicion. In recent years, increased state scrutiny has led to revoked registrations, administrators interrogated, and curricula contested. In this environment, education is a political act; those who sustain these institutions struggle to carry that burden daily.

Despite pressure, madrassas remain open. Under surveillance, teachers continue their work. Children memorize verses, recite, wait, and return each day, largely unaware that their learning is viewed through a lens of mistrust. This project neither defends nor explains these spaces. It observes them as they live.

The photographs carry no hidden argument. They attend to routine, repetition, and presence. In a region where narratives are often imposed from above, these images trace a quieter persistence: knowledge sustained through practice, memory held in bodies, and an education that refuses to disappear.`,
    images: [
      { id: '10-01', image_name: 'Madrasa I',    description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '01_SAIND20250726Madrasa.jpg') },
      { id: '10-02', image_name: 'Madrasa II',   description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '02_SAIND20250805Madrasa.jpg') },
      { id: '10-03', image_name: 'Madrasa III',  description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '03_SAIND20250429Madrasa.jpg') },
      { id: '10-04', image_name: 'Madrasa IV',   description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '04_SAIND20250429Madrasa.jpg') },
      { id: '10-05', image_name: 'Madrasa V',    description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '05_SAIND20250703Madrasa.jpg') },
      { id: '10-06', image_name: 'Madrasa VI',   description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '06_SAIND20250429Madrasa.jpg') },
      { id: '10-07', image_name: 'Madrasa VII',  description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '07_SAIND20250812Madrasa.jpg') },
      { id: '10-08', image_name: 'Madrasa VIII', description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '08_SAIND20250429Madrasa.jpg') },
      { id: '10-09', image_name: 'Madrasa IX',   description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '09_SAIND20250705Madrasa.jpg') },
      { id: '10-10', image_name: 'Madrasa X',    description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '10_SAIND20250429Madrasa.jpg') },
      { id: '10-11', image_name: 'Madrasa XI',   description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '11_SAIND20250429Madrasa.jpg') },
      { id: '10-12', image_name: 'Madrasa XII',  description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '12_SAIND20250820Madrasa.jpg') },
      { id: '10-13', image_name: 'Madrasa XIII', description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '13_SAIND20250703Madrasa.jpg') },
      { id: '10-14', image_name: 'Madrasa XIV',  description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '14_SAIND20250429Madrasa.jpg') },
      { id: '10-15', image_name: 'Madrasa XV',   description: 'Kashmir, India', src: i('10. Knowledge That Refuses to Disappear by Saqib Ali', '15_SAIND20250429Madrasa.jpg') },
    ],
  },
]

// ── Derived helpers ────────────────────────────────────────────────────────────

// Map full-res URL → optimised thumbnail URL (same key in both globs)
const srcToThumb = new Map(
  Object.entries(allImages)
    .filter(([, url]) => url)
    .map(([key, url]) => [url, thumbImages[key] ?? url])
)

/** Flat array of every image across all series, with series_name and author attached */
export const ALL_IMAGES = GALLERY_SERIES.flatMap(series =>
  series.images.map(img => ({
    ...img,
    series_name: series.series_name,
    series_id:   series.id,
    author:      series.author,
    thumb: srcToThumb.get(img.src) ?? img.src,
  }))
)

export function getSeriesByName(name) {
  return GALLERY_SERIES.find(s => s.series_name === name) ?? null
}

export function getSeriesById(id) {
  return GALLERY_SERIES.find(s => s.id === id) ?? null
}
