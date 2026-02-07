IDE Agent Required Instructions (FaithHub Hymns: Import Songs 1–10 + MP3)
1) Mission

Implement FaithHub Hymns data ingestion for Songs 1–10:

Create hymn records (canonical lyrics + metadata).

Create recording records pointing to MP3 URLs.

Ensure search/filter works by Part/Subcategory/Language/Status.

No hallucinated data; only use the dataset provided below.

2) Scope

In scope

Data model + storage schema (Firestore or Postgres)

Import script (one-time seed) OR admin upload screen (bulk)

MP3 upload mapping (filename → hymnId)

Read UI endpoints: list hymns, hymn detail, list recordings per hymn

Out of scope

Audio transcription

Melody/chords generation

Auto-tagging beyond what’s in the dataset

3) Non-negotiable Guardrails

No lyric edits. Store lyrics exactly as provided (including line breaks).

No inventing scripture refs/tags. If missing, leave empty arrays.

No embedding MP3 blobs in DB. Store MP3 in object storage; DB stores only URLs + metadata.

No “best guess” keys/tempo changes. Use the provided key/tempo.

Idempotent seeding. Re-running import must not duplicate records.

Stable IDs. Use hymnId as primary key: HYM-2026-001 … HYM-2026-010.

4) Storage Pattern (Required)
Option A — Firestore (recommended for FaithHub style apps)

Collection: hymns

Doc ID: HYM-2026-001

Collection: recordings

Doc ID: REC-HYM-2026-001-V1 (or random)

Fields include hymnId, audioUrl, etc.

Indexes needed

hymns: part, subcategory, language, status

array-contains indexes if you later use themes/doctrineTags

Option B — Postgres

Table: hymns (hymn_id PK)

Table: recordings (recording_id PK, hymn_id FK)

Use GIN index for arrays if you store tags in JSONB.

5) MP3 Handling Rules

Required naming convention (pick one and enforce):

Preferred: HYM-2026-001_congregational_v1.mp3

Upload location:

faithhub-hymns/{hymnId}/{filename}

After upload, write a recordings row/doc:

style = "congregational"

source = "user_mp3" (or "suno" if these are Suno exports)

active = true

6) Acceptance Tests (Must Pass)

 Hymn list shows 10 hymns under Part I

 Opening hymn detail shows exact lyrics (line breaks preserved)

 Each hymn resolves ≥1 recording and can play MP3

 Filter works: Part = “Worship & Adoration” returns 10

 Seed/import re-run does not create duplicates

7) Implementation Tasks (Ticket Breakdown)

FH-HYM-001 Create schema: hymns + recordings
FH-HYM-002 Build seed/import (JSON → DB) idempotent
FH-HYM-003 MP3 upload utility (manual mapping)
FH-HYM-004 API: list hymns, hymn detail (+ recordings)
FH-HYM-005 UI: Hymns list + Hymn detail + audio player
FH-HYM-006 Validation: ensure no missing hymnId/title/lyrics

8) “No-Hallucination” Operating Mode (Agent Rule)

If any field is unknown (e.g., duration), store null and do not guess.

B) Data for Songs 1–10 (JSON seed)

Use this as hymns.seed.json (or equivalent). Lyrics are included in full for each of the 10 hymns we created.

Note: recordings are separate below. You will paste the final audioUrl after upload.

{
  "hymns": [
    {
      "hymnId": "HYM-2026-001",
      "number": 1,
      "title": "Holy Is the Name of Yahweh",
      "part": "Worship & Adoration",
      "subcategory": "Praise to God",
      "language": "English",
      "key": "D Major",
      "tempoBpm": 72,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["worship", "holiness", "adoration"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nHoly is the Name of Yahweh,\nHigh above the earth and sea;\nLight unending, throne of mercy,\nSource of truth eternally.\nFrom the dawn of all creation\nTo the end our songs proclaim:\nHeaven, earth, and every nation\nBless and magnify His Name.\n\nRefrain\nHoly, holy, holy forever,\nLord of light and righteous flame;\nAll creation sings Your splendor—\nHoly is Your matchless Name.\nHoly, holy, holy forever,\nFaithful, just, and still the same;\nEvery tongue and tribe confess You:\nHoly is Your matchless Name.\n\nVerse 2\nStars obey Your spoken promise,\nOceans rest at Your command;\nWind and fire declare Your glory,\nWorks of wonder fill the land.\nMorning breaks with songs of kindness,\nNight is wrapped within Your care;\nAll the earth reflects Your goodness,\nSigns of love are everywhere.\n\nRefrain\n\nVerse 3\nHumbled hearts before You gather,\nSeeking truth and walking light;\nFrom our sins You gently cleanse us,\nLead us into paths made right.\nLives redeemed now rise in offering,\nHands uplifted, voices raised;\nWith one breath and one confession,\nWe proclaim You worthy—praised.\n\nRefrain\n\nVerse 4\nEndless ages tell Your greatness,\nTime itself before You bends;\nAlpha, Omega, Lord eternal,\nGrace that saves and never ends.\nWhen all kingdoms fade in shadow,\nStill Your throne remains the same;\nWe will stand in joyful wonder,\nSinging holy is Your Name.\n\nFinal Refrain\nHoly, holy, holy forever,\nLord of light and righteous flame;\nAll creation sings Your splendor—\nHoly is Your matchless Name.\nHoly, holy, holy forever,\nFaithful, just, and still the same;\nEvery tongue and tribe confess You:\nHoly is Your matchless Name."
    },
    {
      "hymnId": "HYM-2026-002",
      "number": 2,
      "title": "We Lift Our Voices in Praise",
      "part": "Worship & Adoration",
      "subcategory": "Praise to God",
      "language": "English",
      "key": "G Major",
      "tempoBpm": 88,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["worship", "praise", "thanksgiving"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nWe lift our voices in praise today,\nWith grateful hearts before Your throne;\nYou wake the dawn with mercy bright,\nYour love in every blessing shown.\nFrom morning light to evening calm,\nOur lives declare Your faithful ways;\nWith one accord we rise and sing,\nOur God eternal—worthy praise.\n\nRefrain\nWe lift our voices, hearts and hands,\nIn joyful songs to You we raise;\nFrom every land Your people cry:\nOur God is good—we live to praise.\nWe lift our voices, strong and free,\nYour truth our song through endless days;\nForevermore our anthem stands:\nOur God is good—we live to praise.\n\nVerse 2\nYou feed the fields with gentle rain,\nYou guard our steps along the road;\nEach breath we draw is gift of grace,\nEach burden lightened by Your load.\nIn times of want and times of rest,\nYour steady hand will still provide;\nWe trust the One who walks with us,\nOur Shepherd sure, our faithful Guide.\n\nRefrain\n\nVerse 3\nTogether now Your church arises,\nYoung and old in single voice;\nIn every tongue Your wonders ring,\nIn hope and faith we now rejoice.\nSend us to serve with humble love,\nTo shine Your light where shadows stay;\nOur lives become the song we sing—\nA living hymn from day to day.\n\nRefrain\n\nVerse 4\nWhen trials come or triumphs rise,\nYour name our banner lifted high;\nThrough every age our praise endures,\nUntil we sing before Your sky.\nAll that we are, to You we bring,\nOur song, our work, our every breath;\nForever shall Your glory reign,\nIn life and joy and even death.\n\nFinal Refrain\nWe lift our voices, hearts and hands,\nIn joyful songs to You we raise;\nFrom every land Your people cry:\nOur God is good—we live to praise."
    },
    {
      "hymnId": "HYM-2026-003",
      "number": 3,
      "title": "Maker of Sea and Sky",
      "part": "Worship & Adoration",
      "subcategory": "Creation & Providence",
      "language": "English",
      "key": "F Major",
      "tempoBpm": 76,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["creation", "worship", "providence"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nMaker of sea and sky and flame,\nYou spoke the world into its place;\nMountains bowed before Your voice,\nStars were ignited by Your grace.\nFrom dust You shaped the breath of life,\nFrom light You drew the morning’s hue;\nAll that exists now sings Your power,\nCreation lifts its song to You.\n\nRefrain\nMaker of sea and sky, we praise You,\nSource of every living thing;\nEarth and heaven bow before You,\nTo Your throne our anthems bring.\nMaker of sea and sky, we praise You,\nFaithful, strong, and ever near;\nAll our days and all our tomorrows\nRest within Your mighty care.\n\nVerse 2\nOceans wait at Your direction,\nStorm and silence know Your word;\nRivers carve the paths You give them,\nForests answer when You’re heard.\nMorning wakes at Your commandment,\nNight is clothed in quiet peace;\nSun and moon obey Your order,\nNever does Your mercy cease.\n\nRefrain\n\nVerse 3\nYou sustain the fields and seasons,\nFeed the sparrow, clothe the land;\nEvery heartbeat finds its rhythm\nIn the keeping of Your hand.\nWhen our strength is weak or failing,\nStill Your kindness will endure;\nYou remain our firm foundation,\nConstant, faithful, strong, and sure.\n\nRefrain\n\nVerse 4\nTeach our hearts to stand in wonder,\nHumbly walk within Your ways;\nLet our lives reflect Your glory\nIn obedience and praise.\nTill the day we stand before You,\nFace to face in endless light,\nWe will sing of Your creation—\nMaker, Savior, Lord of might.\n\nFinal Refrain\nMaker of sea and sky, we praise You,\nSource of every living thing;\nEarth and heaven bow before You,\nTo Your throne our anthems bring."
    },
    {
      "hymnId": "HYM-2026-004",
      "number": 4,
      "title": "Crowned in Splendor",
      "part": "Worship & Adoration",
      "subcategory": "Majesty & Glory",
      "language": "English",
      "key": "E♭ Major",
      "tempoBpm": 70,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["majesty", "worship", "kingship"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nCrowned in splendor, robed in glory,\nLight unending, throne on high;\nHeaven tells Your ancient story,\nEarth replies with lifted cry.\nFrom the ages past unbroken\nTo the dawn yet still unseen,\nAll creation joins in chorus,\nHailing You our rightful King.\n\nRefrain\nCrowned in splendor, Lord eternal,\nHigh above all rule and name;\nEvery power bows before You,\nEvery tongue Your worth proclaim.\nCrowned in splendor, Lord eternal,\nJustice, mercy intertwined;\nAll the world will stand in wonder,\nAt Your throne forever shine.\n\nVerse 2\nFire and cloud attend Your presence,\nThunder marks Your holy way;\nNations tremble at Your greatness,\nYet the humble find Your stay.\nFrom the dust You raise the lowly,\nBreak the chains the proud have spun;\nTruth and love Your scepter wielding,\nTill Your saving work is done.\n\nRefrain\n\nVerse 3\nKings will fade and thrones will crumble,\nEmpires pass like fleeting breath;\nStill Your kingdom stands unshaken,\nRising over time and death.\nFrom our hearts to highest heavens\nLet one anthem now ascend:\nYou alone are Lord forever,\nReign whose glory has no end.\n\nRefrain\n\nVerse 4\nWhen at last we stand before You,\nWashed in light and robed in peace,\nSongs of earth and heaven blending,\nNevermore our praise will cease.\nFace to face in holy wonder,\nJoy beyond what words can frame,\nWe will cry with endless voices:\nBlessed be Your mighty Name!\n\nFinal Refrain\nCrowned in splendor, Lord eternal,\nHigh above all rule and name;\nEvery power bows before You,\nEvery tongue Your worth proclaim."
    },
    {
      "hymnId": "HYM-2026-005",
      "number": 5,
      "title": "Grateful Hearts We Bring",
      "part": "Worship & Adoration",
      "subcategory": "Thanksgiving",
      "language": "English",
      "key": "A Major",
      "tempoBpm": 92,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["thanksgiving", "worship", "gratitude"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nGrateful hearts we bring before You,\nEvery gift from heaven flows;\nMorning light and daily mercies\nMark the pathways where we go.\nHands that work and bread that feeds us,\nRest at night and strength to stand—\nAll we are and all we carry\nLie within Your faithful hand.\n\nRefrain\nGrateful hearts we bring in worship,\nSongs of thanks to You we raise;\nFor Your kindness never falters,\nFor Your love that crowns our days.\nGrateful hearts we bring in worship,\nLives returned in trust and cheer;\nAll we have is Yours forever—\nWe rejoice that You are near.\n\nVerse 2\nFields are filled with gentle harvest,\nRain and sun obey Your word;\nShelter given, meals provided,\nEvery cry by You is heard.\nIn our need You walk beside us,\nIn our joy You still remain;\nThrough the seasons of our living\nYour provision stands the same.\n\nRefrain\n\nVerse 3\nWhen our plans are torn or shifting,\nWhen our strength is running low,\nStill Your grace supplies our footing,\nStill Your peace within us grows.\nTeach our hearts to live in offering,\nLoose our grip on wealth and fear;\nMay our lives become thanksgiving,\nFlowing freely year by year.\n\nRefrain\n\nVerse 4\nAll our days we give back gladly,\nTime and talents, hopes and breath;\nTill we sing in endless glory\nSongs that conquer doubt and death.\nFrom this place we go rejoicing,\nBearing light into the world;\nGrateful hearts and willing spirits\nNow in faithful love unfurled.\n\nFinal Refrain\nGrateful hearts we bring in worship,\nSongs of thanks to You we raise;\nFor Your kindness never falters,\nFor Your love that crowns our days."
    },
    {
      "hymnId": "HYM-2026-006",
      "number": 6,
      "title": "Bowed Before the Holy One",
      "part": "Worship & Adoration",
      "subcategory": "Reverence & Awe",
      "language": "English",
      "key": "D Minor",
      "tempoBpm": 66,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["reverence", "holiness", "repentance"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nBowed before the Holy One,\nSilent hearts in trembling awe;\nDust and breath before His glory,\nWeak yet held by righteous law.\nShadows flee the light of mercy,\nFear dissolves where truth is near;\nFrom the depths our prayers are rising,\nFor the Lord Himself is here.\n\nRefrain\nBowed before the Holy One,\nHearts laid bare in sacred light;\nMercy streams from heaven’s throne room,\nWashing us and making right.\nBowed before the Holy One,\nGrace enough for every sin;\nIn His presence we are lifted,\nPure and whole and drawn within.\n\nVerse 2\nConfess our faults and hidden burdens,\nLay them down before His face;\nHands once closed now open upward,\nNeeding nothing but His grace.\nTears are turned to quiet praises,\nBroken lives to hope restored;\nFrom the ashes of our failures\nRise the children of the Lord.\n\nRefrain\n\nVerse 3\nTeach our souls to walk in meekness,\nGuard our thoughts and shape our ways;\nWrite Your truth upon our spirits,\nTune our hearts to sing Your praise.\nLet our days reflect Your mercy,\nLet our speech be clean and kind;\nMay our lives become an offering,\nHoly, humble, undefined.\n\nRefrain\n\nVerse 4\nWhen the storms of doubt surround us,\nWhen the night seems long and deep,\nStill Your presence stands beside us,\nFaithful watch while others sleep.\nTill we stand before Your glory,\nClothed in light beyond our sight,\nWe will live in holy reverence,\nWalking daily in Your light.\n\nFinal Refrain\nBowed before the Holy One,\nHearts laid bare in sacred light;\nMercy streams from heaven’s throne room,\nWashing us and making right."
    },
    {
      "hymnId": "HYM-2026-007",
      "number": 7,
      "title": "The Earth Declares Your Glory",
      "part": "Worship & Adoration",
      "subcategory": "Creation & Providence",
      "language": "English",
      "key": "C Major",
      "tempoBpm": 84,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["creation", "worship", "praise"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nThe earth declares Your glory bright,\nThe skies proclaim Your truth and might;\nThe mountains lift their ancient song,\nThe seas respond in rolling strong.\nFrom dawn to dusk Your wonders rise,\nIn golden fields and star-lit skies;\nAll that breathes in land and sea\nJoins one great hymn of praise to Thee.\n\nRefrain\nThe earth declares Your glory,\nHeaven echoes back Your name;\nEvery valley, hill, and river\nSings the wonders of Your reign.\nThe earth declares Your glory,\nFrom the depths to highest height;\nAll creation joins the chorus,\nCrowned in truth and clothed in light.\n\nVerse 2\nThe wind repeats what You have spoken,\nStorm and silence both awoken;\nRivers trace the paths You send,\nForests bow where branches bend.\nMorning wakes at Your decree,\nNight is wrapped in quiet peace;\nSun and moon in ordered flight\nGuard the seasons by Your light.\n\nRefrain\n\nVerse 3\nWe raise our voice among creation,\nCalled to holy dedication;\nLives aligned with truth and grace\nShine Your light in every place.\nFrom our work and rest and care\nLet Your goodness echo there;\nTill the world with joy confesses:\nYou alone are righteousness.\n\nRefrain\n\nVerse 4\nWhen the final song is sounded,\nWhen the ages all are rounded,\nStill Your glory shall endure,\nBright and steadfast, strong and sure.\nHeaven, earth in one accord\nBow before their sovereign Lord;\nWith the stars our anthem grows—\nEndless praise in rising flows.\n\nFinal Refrain\nThe earth declares Your glory,\nHeaven echoes back Your name;\nEvery valley, hill, and river\nSings the wonders of Your reign."
    },
    {
      "hymnId": "HYM-2026-008",
      "number": 8,
      "title": "Songs of Morning Gratitude",
      "part": "Worship & Adoration",
      "subcategory": "Thanksgiving",
      "language": "English",
      "key": "G Major",
      "tempoBpm": 96,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["thanksgiving", "morning", "worship"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nSongs of morning gratitude rise,\nAs golden light fills up the skies;\nNew mercies greet our waking breath,\nHope reborn from night and rest.\nEvery step and every hour\nBear the mark of saving power;\nFrom this dawn our lives declare\nThanks and praise in answered prayer.\n\nRefrain\nSongs of morning gratitude,\nHearts awake and voices strong;\nTo the Giver of all goodness\nNow we lift our thankful song.\nSongs of morning gratitude,\nFresh as dew on fields of grace;\nAll our days and all our living\nFlow within Your faithful ways.\n\nVerse 2\nYou renew the strength we need,\nGuard our ways in word and deed;\nBread is broken, work begun,\nUnder heaven’s rising sun.\nIn our tasks both small and great\nYou are present, sure and straight;\nEvery moment, kept by You,\nTurns to praise in all we do.\n\nRefrain\n\nVerse 3\nWhen the road is long and steep,\nWhen the harvest seems to sleep,\nStill Your hand will guide us through,\nStill Your promises prove true.\nTeach our hearts to trust Your care,\nCast our worries into prayer;\nLet our lives from dawn till night\nShine with thanks before Your sight.\n\nRefrain\n\nVerse 4\nSend us out with joyful living,\nBearing light in humble giving;\nTill the final morning breaks\nAnd the world in glory wakes.\nThen with saints in endless day\nWe will sing our thanks always;\nSongs begun at sunrise here\nEcho through eternal years.\n\nFinal Refrain\nSongs of morning gratitude,\nHearts awake and voices strong;\nTo the Giver of all goodness\nNow we lift our thankful song."
    },
    {
      "hymnId": "HYM-2026-009",
      "number": 9,
      "title": "Tread Softly in His Presence",
      "part": "Worship & Adoration",
      "subcategory": "Reverence & Awe",
      "language": "English",
      "key": "F Minor",
      "tempoBpm": 64,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["reverence", "prayer", "holiness"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nTread softly in His presence now,\nFor holy ground is near;\nLay every weight and restless thought\nBefore the Lord most dear.\nThe flame that spoke from ancient days\nStill lights the path we tread;\nIn quiet awe our spirits bow,\nBy living mercy led.\n\nRefrain\nTread softly in His presence,\nStand still before His light;\nLet every heart in silence wait\nTill fear is put to flight.\nTread softly in His presence,\nDraw near with humble plea;\nFor here the Holy One receives\nThe prayers of you and me.\n\nVerse 2\nThe whisper of His gentle voice\nOutshines the thunder’s roar;\nHis word divides the soul and bone,\nYet heals us more and more.\nThe shadows fade where truth is known,\nThe broken find release;\nIn stillness God is working deep\nTo fashion lasting peace.\n\nRefrain\n\nVerse 3\nUncover pride and secret sin,\nWash clean our hidden ways;\nRefine our thoughts, restore our joy,\nReignite our song of praise.\nFrom trembling knees to lifted eyes\nWe rise by promised grace;\nForgiven, sent, and sanctified\nWithin His holy place.\n\nRefrain\n\nVerse 4\nTill all our days are lived in light\nAnd faith has turned to sight,\nWe walk in reverence, love, and truth\nBefore His throne so bright.\nWhen heaven’s veil is drawn aside\nAnd saints in glory stand,\nWe still will bow in holy fear\nBefore His righteous hand.\n\nFinal Refrain\nTread softly in His presence,\nStand still before His light;\nLet every heart in silence wait\nTill fear is put to flight."
    },
    {
      "hymnId": "HYM-2026-010",
      "number": 10,
      "title": "Glory Be to the Living God",
      "part": "Worship & Adoration",
      "subcategory": "Majesty & Glory",
      "language": "English",
      "key": "B♭ Major",
      "tempoBpm": 90,
      "timeSignature": "4/4",
      "status": "approved",
      "version": "v1.0",
      "themes": ["doxology", "praise", "worship"],
      "doctrineTags": [],
      "scriptureRefs": [],
      "lyrics": "Verse 1\nGlory be to the living God,\nSource of life and truth and light;\nFrom the dawn of all creation\nTo the stars that fill the night.\nEvery breath His gift sustaining,\nEvery hope by grace begun;\nWe lift praise in humble wonder\nTo the Everlasting One.\n\nRefrain\nGlory be to the living God,\nHonor, thanks, and praise proclaim;\nFrom all peoples, tongues, and nations\nBless and magnify His Name.\nGlory be to the living God,\nNow and through eternity;\nLet our lives declare forever\nAll His grace and majesty.\n\nVerse 2\nLove that called us out of darkness,\nMercy strong to save and heal;\nTruth that guides our steps in justice,\nPromises both sure and real.\nWhen our strength is weak or failing,\nStill His faithfulness remains;\nHe is near to all who seek Him,\nRich in mercy, slow to blame.\n\nRefrain\n\nVerse 3\nThrough the ages saints have trusted,\nFound His word their solid ground;\nStorms may rise and kingdoms falter,\nYet His throne is never bound.\nFrom the cradle to the grave-side,\nFrom our joy to deepest loss,\nHe is God, our hope eternal,\nVictory through love and cross.\n\nRefrain\n\nVerse 4\nWhen at last the song is finished\nAnd our faith has turned to sight,\nWe will join the endless chorus\nIn the fullness of His light.\nTill that day our praise continues,\nStrong in deed and pure in word;\nGlory be to the living God,\nEver faithful, ever Lord.\n\nFinal Refrain\nGlory be to the living God,\nHonor, thanks, and praise proclaim;\nFrom all peoples, tongues, and nations\nBless and magnify His Name."
    }
  ],
  "recordings": [
    {
      "recordingId": "REC-HYM-2026-001-CON-V1",
      "hymnId": "HYM-2026-001",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "D Major",
      "tempoBpm": 72,
      "active": true
    },
    {
      "recordingId": "REC-HYM-2026-002-CON-V1",
      "hymnId": "HYM-2026-002",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "G Major",
      "tempoBpm": 88,
      "active": true
    },
    {
      "recordingId": "REC-HYM-2026-003-CON-V1",
      "hymnId": "HYM-2026-003",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "F Major",
      "tempoBpm": 76,
      "active": true
    },
    {
      "recordingId": "REC-HYM-2026-004-CON-V1",
      "hymnId": "HYM-2026-004",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "E♭ Major",
      "tempoBpm": 70,
      "active": true
    },
    {
      "recordingId": "REC-HYM-2026-005-CON-V1",
      "hymnId": "HYM-2026-005",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "A Major",
      "tempoBpm": 92,
      "active": true
    },
    {
      "recordingId": "REC-HYM-2026-006-CON-V1",
      "hymnId": "HYM-2026-006",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "D Minor",
      "tempoBpm": 66,
      "active": true
    },
    {
      "recordingId": "REC-HYM-2026-007-CON-V1",
      "hymnId": "HYM-2026-007",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "C Major",
      "tempoBpm": 84,
      "active": true
    },
    {
      "recordingId": "REC-HYM-2026-008-CON-V1",
      "hymnId": "HYM-2026-008",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "G Major",
      "tempoBpm": 96,
      "active": true
    },
    {
      "recordingId": "REC-HYM-2026-009-CON-V1",
      "hymnId": "HYM-2026-009",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "F Minor",
      "tempoBpm": 64,
      "active": true
    },
    {
      "recordingId": "REC-HYM-2026-010-CON-V1",
      "hymnId": "HYM-2026-010",
      "source": "user_mp3",
      "style": "congregational",
      "audioUrl": "",
      "key": "B♭ Major",
      "tempoBpm": 90,
      "active": true
    }
  ]
}

C) CSV (optional, for bulk import / admin tool)

If you prefer CSV for hymns:

hymnId,number,title,part,subcategory,language,key,tempoBpm,timeSignature,status,version
HYM-2026-001,1,"Holy Is the Name of Yahweh","Worship & Adoration","Praise to God","English","D Major",72,"4/4","approved","v1.0"
HYM-2026-002,2,"We Lift Our Voices in Praise","Worship & Adoration","Praise to God","English","G Major",88,"4/4","approved","v1.0"
HYM-2026-003,3,"Maker of Sea and Sky","Worship & Adoration","Creation & Providence","English","F Major",76,"4/4","approved","v1.0"
HYM-2026-004,4,"Crowned in Splendor","Worship & Adoration","Majesty & Glory","English","E♭ Major",70,"4/4","approved","v1.0"
HYM-2026-005,5,"Grateful Hearts We Bring","Worship & Adoration","Thanksgiving","English","A Major",92,"4/4","approved","v1.0"
HYM-2026-006,6,"Bowed Before the Holy One","Worship & Adoration","Reverence & Awe","English","D Minor",66,"4/4","approved","v1.0"
HYM-2026-007,7,"The Earth Declares Your Glory","Worship & Adoration","Creation & Providence","English","C Major",84,"4/4","approved","v1.0"
HYM-2026-008,8,"Songs of Morning Gratitude","Worship & Adoration","Thanksgiving","English","G Major",96,"4/4","approved","v1.0"
HYM-2026-009,9,"Tread Softly in His Presence","Worship & Adoration","Reverence & Awe","English","F Minor",64,"4/4","approved","v1.0"
HYM-2026-010,10,"Glory Be to the Living God","Worship & Adoration","Majesty & Glory","English","B♭ Major",90,"4/4","app