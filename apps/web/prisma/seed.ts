
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const hymnsData = [
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
        "scriptureRefs": ["Isaiah 6:3", "Psalm 99:3", "Revelation 4:8"],
        "lyrics": "Holy is the name of Yahweh,\nGlorious is His throne above!\nSeraphim and angels praise Him,\nSinging of His endless love.\n\nRefrain:\nHoly, holy, name of Yahweh,\nLet all earth His praise accord;\nHe alone is God Almighty,\nWorship Him, our Sovereign Lord.\n\nMighty is the God of Jacob,\nStrong Deliverer of the weak;\nIn His presence, mountains tremble,\nYet He listens when we speak.\n\n(Refrain)\n\nEverlasting is His kingdom,\nRighteousness forms His command;\nNations rise and fall before Him,\nSafe we rest within His hand.\n\n(Refrain)"
    },
    {
        "hymnId": "HYM-2026-002",
        "number": 2,
        "title": "We Lift Our Voices in Praise",
        "part": "Worship & Adoration",
        "subcategory": "Praise",
        "language": "English",
        "key": "G Major",
        "tempoBpm": 88,
        "timeSignature": "4/4",
        "status": "approved",
        "version": "v1.0",
        "themes": ["worship", "praise", "thanksgiving"],

        "doctrineTags": [],
        "scriptureRefs": ["Psalm 34:1-3", "Psalm 100:1-5", "Hebrews 13:15"],
        "lyrics": "We lift our voices in praise to the King,\nWith hearts full of joy, His great mercies we sing;\nFor He has redeemed us from darkness and night,\nAnd filled every soul with His glorious light.\n\nRefrain:\nWe lift up our voices, His name we adore,\nThe King of all glory, now and evermore;\nWith cymbal and harp, let the anthem resound,\nFor grace and salvation in Jesus are found.\n\nThe mountains may move and the hills disappear,\nBut God’s lovingkindness is constantly near;\nHe shelters His children beneath His great wings,\nAnd peace like a river, His Spirit now brings.\n\n(Refrain)\n\nOh, come let us worship and bow at His feet,\nHis vague is sufficient, His love is complete;\nThe Rock of our Ages, the Ancient of Days,\nWe lift up our voices in unending praise.\n\n(Refrain)"
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
        "lyrics": "Verse 1\nMaker of sea and sky and flame,\nYou spoke the world into its place;\nMountains bowed before Your voice,\nStars were ignited by Your grace.\nFrom dust You shaped the breath of life,\nFrom light You drew the morning’s hue;\nAll that exists now sings Your power,\nCreation lifts its song to You.\n\nRefrain\nMaker of sea and sky, we praise You,\nSource of every living thing;\nEarth and heaven bow before You,\nTo Your throne our anthems bring.\nMaker of sea and sky, we praise You,\nFaithful, strong, and ever near;\nAll our days and all our tomorrows\nRest within Your mighty care.\n\nVerse 2\nOceans wait at Your direction,\nStorm and silence know Your word;\nRivers carve the paths You give them,\nForests answer when You’re heard.\nMorning wakes at Your commandment,\nNight is clothed in quiet peace;\nSun and moon obey Your order,\nNever does Your mercy cease.\n\nRefrain\n\nVerse 3\nYou sustain the fields and seasons,\nFeed the sparrow, clothe the land;\nEvery heartbeat finds its rhythm\nIn the keeping of Your hand.\nWhen our strength is weak or failing,\nStill Your kindness will endure;\nYou remain our firm foundation,\nConstant, faithful, strong, and sure.\n\nRefrain\n\nVerse 4\nTeach our hearts to stand in wonder,\nHumbly walk within Your ways;\nLet our lives reflect Your glory\nIn obedience and praise;\nTill the day we stand before You,\nFace to face in endless light,\nWe will sing of Your creation—\nMaker, Savior, Lord of might.\n\nFinal Refrain\nMaker of sea and sky, we praise You,\nSource of every living thing;\nEarth and heaven bow before You,\nTo Your throne our anthems bring."
    },
    {
        "hymnId": "HYM-2026-004",
        "number": 4,
        "title": "Crowned in Splendor",
        "part": "Worship & Adoration",
        "subcategory": "Praise",
        "language": "English",
        "key": "E♭ Major",
        "tempoBpm": 70,
        "timeSignature": "4/4",
        "status": "approved",
        "version": "v1.0",
        "themes": ["majesty", "worship", "kingship"],

        "doctrineTags": [],
        "scriptureRefs": ["Psalm 93:1", "1 Timothy 1:17", "Revelation 19:6"],
        "lyrics": "Crowned in splendor, robed in light,\nGod rules the heavens with power and might;\nThe universe trembles at His command,\nYet implies mercy, He holds out His hand.\n\nRefrain:\nAll hail the King upon the throne,\nTo Him implies glory and honor be shown;\nLet every tongue and nation proclaim,\nThe power and wonder of His holy name.\n\nFoundations of earth by His word were laid,\nThe sun and the moon, by His wisdom made;\nThe oceans obey Him, the winds know His voice,\nLet all of creation before Him rejoice.\n\n(Refrain)\n\nThough kingdoms of men may falter and fail,\nThe kingdom of God shall forever prevail;\nWith justice and truth, He rules the land,\nThe scepter of grace firmly held in His hand.\n\n(Refrain)"
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
        "subcategory": "Praise",
        "language": "English",
        "key": "C Major",
        "tempoBpm": 84,
        "timeSignature": "4/4",
        "status": "approved",
        "version": "v1.0",
        "themes": ["creation", "worship", "praise"],

        "doctrineTags": [],
        "scriptureRefs": ["Psalm 148:1-13", "Romans 1:20", "Nehemiah 9:6"],
        "lyrics": "The earth declares Your glory, Lord,\nThe heavens speak without a word;\nThe stars distinct imply silent choir,\nReflecting Your creation's fire.\n\nRefrain:\nWe join the song creation sings,\nTo praise the Lord, the King of Kings;\nFrom valley low to mountain high,\nYour glory fills the earth and sky.\n\nThe roaring of the mighty sea,\nThe wind that whispers through the tree;\nThe thunder rolling in the air,\nProclaim Your presence everywhere.\n\n(Refrain)\n\nBut we, Your children, know Your grace,\nRevealed effectively Jesus’ holy face;\nThe works of nature show Your power,\nYour love sustains us every hour.\n\n(Refrain)"
    },
    {
        "hymnId": "HYM-2026-008",
        "number": 8,
        "title": "Songs of Morning Gratitude",
        "part": "Worship & Adoration",
        "subcategory": "Praise",
        "language": "English",
        "key": "G Major",
        "tempoBpm": 96,
        "timeSignature": "4/4",
        "status": "approved",
        "version": "v1.0",
        "themes": ["thanksgiving", "morning", "worship"],

        "doctrineTags": [],
        "scriptureRefs": ["Genesis 1:1-3", "Psalm 19:1", "Colossians 1:16-17"],
        "lyrics": "Maker of sea and sky,\nRuler of stars on high,\nBoundless in majesty,\nWe worship Thee!\n\nRefrain:\nGlory to God above,\nSource of eternal love;\nCreation sings Your name,\nForever the same.\n\nAuthor of life and breath,\nConqueror over death,\nShepherd who guides our way,\nKeep us this day.\n\n(Refrain)\n\nAncient of endless days,\nWorthy of endless praise,\nFather, Spirit, and Son,\nGreat Three in One.\n\n(Refrain)"
    },
    {
        "hymnId": "HYM-2026-009",
        "number": 9,
        "title": "Tread Softly in His Presence",
        "part": "Worship & Adoration",
        "subcategory": "Praise",
        "language": "English",
        "key": "F Minor",
        "tempoBpm": 64,
        "timeSignature": "4/4",
        "status": "approved",
        "version": "v1.0",
        "themes": ["reverence", "prayer", "holiness"],

        "doctrineTags": [],
        "scriptureRefs": ["Habakkuk 2:20", "Psalm 51:10-12", "Hebrews 12:28-29"],
        "lyrics": "Bowed before the Holy One,\nIn the presence of the Son;\nSilence falls effectively every soul,\nAs His Spirit makes us whole.\n\nRefrain:\nHoly, holy is the Lord,\nBe His majesty adored;\nCleanse our hearts and purify,\nLift our praises to the sky.\n\nSearch us, Lord, and know our ways,\nFill us with Your grateful praise;\nTake our guilt and shame away,\nGuide us in Your truth today.\n\n(Refrain)\n\nLet us walk effectively, humble grace,\nSeeking effectively His holy face;\nTill we stand before the throne,\nKnowing as we are fully known.\n\n(Refrain)"
    },
    {
        "hymnId": "HYM-2026-010",
        "number": 10,
        "title": "Glory Be to the Living God",
        "part": "Worship & Adoration",
        "subcategory": "Praise",
        "language": "English",
        "key": "B♭ Major",
        "tempoBpm": 90,
        "timeSignature": "4/4",
        "status": "approved",
        "version": "v1.0",
        "themes": ["doxology", "praise", "worship"],

        "doctrineTags": [],
        "scriptureRefs": ["Jude 1:24-25", "Romans 11:36", "Psalm 145:1-3"],
        "lyrics": "Glory be to the Living God,\nWho guides the path our feet haven trod;\nFrom age to age, He remains the same,\nAll power and honor to His name.\n\nRefrain:\nGlory, glory, to God on high,\nLet praises ring from earth to sky;\nThe Everlasting, the Great I AM,\nThe Lion and the paschal Lamb.\n\nHe holds the stars within His hand,\nAnd measures oceans, sea, and sand;\nYet bends to hear a sinner's prayer,\nAnd keeps us in His tender care.\n\n(Refrain)\n\nTo Him implies praise forevermore,\nWhom angels worship and adore;\nLet every heart its tribute bring,\nTo God, our Savior and our King.\n\n(Refrain)"
    },
    {
        "hymnId": "HYM-2026-011",
        "number": 11,
        "title": "Only-Begotten Son of Yahweh",
        "part": "Worship & Adoration",
        "subcategory": "Praise",
        "language": "English",
        "key": "C Major",
        "tempoBpm": 80,
        "timeSignature": "4/4",
        "status": "approved",
        "version": "v1.0",
        "themes": ["worship", "sonship"],
        "doctrineTags": [],
        "scriptureRefs": [],
        "lyrics": "Verse 1\nOnly-begotten Son of Yahweh,\nLight from light before all time;\nSent in love to dwell among us,\nTruth made flesh by will divine.\nFrom the Father’s heart You came forth,\nGrace and glory full and clear;\nHeaven’s gift to fallen sinners,\nGod’s salvation drawing near.\n\nRefrain\nOnly-begotten Son of Yahweh,\nHoly, righteous, faithful One;\nThrough Your life the Father’s mercy,\nThrough Your death our hope was won.\nOnly-begotten Son of Yahweh,\nName above all names confessed;\nAt Your word we bow in worship,\nIn the Father’s promise blessed.\n\nVerse 2\nHumbled low, You walked among us,\nShared our tears and carried pain;\nServant-hearted, meek and gentle,\nBearing sin without complaint.\nPerfect image of the Father,\nDoing always what He willed;\nIn obedience and trust unbroken,\nEvery word of truth fulfilled.\n\nRefrain\n\nVerse 3\nOn the cross You gave Your life-blood,\nLamb appointed from of old;\nJustice met with boundless mercy,\nLove beyond what tongues have told.\nBy Your stripes we stand forgiven,\nBy Your death our debts erased;\nThrough the Son the Father calls us\nTo a life of truth and grace.\n\nRefrain\n\nVerse 4\nNow exalted at God’s right hand,\nLiving Lord forevermore;\nInterceding for Your people\nTill all tears and sins are no more.\nWhen You come in power and glory,\nAll the earth Your reign will see;\nEvery knee shall bow before You,\nSon of God—victory."
    },
    {
        "hymnId": "HYM-2026-012",
        "number": 12,
        "title": "Light From the Father’s Heart",
        "part": "Worship & Adoration",
        "subcategory": "Praise",
        "language": "English",
        "key": "D Major",
        "tempoBpm": 75,
        "timeSignature": "4/4",
        "status": "approved",
        "version": "v1.0",
        "themes": ["worship", "light", "father"],
        "doctrineTags": [],
        "scriptureRefs": [],
        "lyrics": "Verse 1\nLight from the Father’s heart descending,\nShining where the shadows lay;\nHope long promised, now revealed,\nBreaking forth in dawning day.\nTruth made known in human weakness,\nGrace embodied, love made clear;\nIn the Son the Father’s kindness\nDraws a weary world made near.\n\nRefrain\nLight from the Father’s heart, we praise You,\nGift of love to humankind;\nIn Your face we see His mercy,\nIn Your words His truth we find.\nLight from the Father’s heart, we praise You,\nLiving Word from heaven sent;\nThrough the Son we know the Father,\nIn His perfect will content.\n\nVerse 2\nBorn in meekness, wrapped in poverty,\nYet with heaven’s glory crowned;\nAngels sang of peace and favor,\nHope for all the lost was found.\nWalking paths of dust and sorrow,\nHealing hearts and opening eyes;\nEvery work revealed the Father,\nEvery word His truth supplied.\n\nRefrain\n\nVerse 3\nWhen the darkness tried to claim You,\nWhen the cross before You lay,\nStill You trusted in the Father,\nChose obedience all the way.\nIn Your death the light seemed hidden,\nYet the dawn was drawing near;\nFrom the grave You rose in glory,\nProof that death has lost its fear.\n\nRefrain\n\nVerse 4\nNow You shine through word and witness,\nThrough the lives Your truth has freed;\nBy Your Spirit’s living presence\nStill You guide us as we need.\nTill the day You stand before us,\nCrowned in glory, robed in might,\nWe will walk within Your promise—\nChildren of the living Light."
    }
]

const recordingsData = [
    {
        "recordingId": "REC-HYM-2026-001-CON-V1",
        "hymnId": "HYM-2026-001",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Holy Is the Name of Yahweh.mp3",
        "key": "D Major",
        "tempoBpm": 72,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-002-CON-V1",
        "hymnId": "HYM-2026-002",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/We Lift Our Voices in Praise.mp3",
        "key": "G Major",
        "tempoBpm": 88,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-003-CON-V1",
        "hymnId": "HYM-2026-003",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Maker of Sea and Sky.mp3",
        "key": "F Major",
        "tempoBpm": 76,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-004-CON-V1",
        "hymnId": "HYM-2026-004",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Crowned in Splendor.mp3",
        "key": "E♭ Major",
        "tempoBpm": 70,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-005-CON-V1",
        "hymnId": "HYM-2026-005",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Grateful Hearts We Bring.mp3",
        "key": "A Major",
        "tempoBpm": 92,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-006-CON-V1",
        "hymnId": "HYM-2026-006",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Bowed Before the Holy One.mp3",
        "key": "D Minor",
        "tempoBpm": 66,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-007-CON-V1",
        "hymnId": "HYM-2026-007",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/The Earth Declares Your Glory.mp3",
        "key": "C Major",
        "tempoBpm": 84,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-008-CON-V1",
        "hymnId": "HYM-2026-008",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Songs of Morning Gratitude.mp3",
        "key": "G Major",
        "tempoBpm": 96,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-009-CON-V1",
        "hymnId": "HYM-2026-009",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Tread Softly in His Presence.mp3",
        "key": "F Minor",
        "tempoBpm": 64,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-010-CON-V1",
        "hymnId": "HYM-2026-010",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Glory Be to the Living God.mp3",
        "key": "B♭ Major",
        "tempoBpm": 90,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-011-CON-V1",
        "hymnId": "HYM-2026-011",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Only-Begotten Son of Yahweh.mp3",
        "key": "C Major",
        "tempoBpm": 80,
        "active": true
    },
    {
        "recordingId": "REC-HYM-2026-012-CON-V1",
        "hymnId": "HYM-2026-012",
        "source": "user_mp3",
        "style": "congregational",
        "audioUrl": "/Light From the Father’s Heart.mp3",
        "key": "D Major",
        "tempoBpm": 75,
        "active": true
    }
]

async function main() {
    console.log('Seeding hymns...')
    for (const hymn of hymnsData) {
        await prisma.hymn.upsert({
            where: { hymnId: hymn.hymnId },
            update: hymn,
            create: hymn,
        })
    }

    console.log('Seeding recordings...')
    for (const recording of recordingsData) {
        await prisma.recording.upsert({
            where: { recordingId: recording.recordingId },
            update: recording,
            create: recording,
        })
    }

    console.log('Seeding Officer Portal data...')

    // 1. Seed Tenant
    const tenant = await prisma.tenant.upsert({
        where: { slug: "batangas" },
        update: {},
        create: {
            name: "Batangas City Central",
            slug: "batangas",
            customDomain: "bcc.church",
        }
    })

    console.log(`Seeding data for tenant: ${tenant.name}`)

    // 2. Seed Members
    const membersData = [
        {
            name: "Russell Famisaran",
            role: "officer",
            status: "active",
            phone: "+63 917 123 4567",
            email: "russell@example.com",
            address: "Batangas City",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Russell",
            notes: "Head Elder",
            tenantId: tenant.id
        },
        {
            name: "Jane Doe",
            role: "member",
            status: "visiting",
            phone: "+63 917 987 6543",
            email: "jane@example.com",
            address: "Lipa City",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
            notes: "Visiting from Manila",
            tenantId: tenant.id
        },
        {
            name: "John Smith",
            role: "member",
            status: "sick",
            phone: "+63 917 555 0000",
            email: "john@example.com",
            address: "Batangas City",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            notes: "Recovering at home",
            tenantId: tenant.id
        }
    ]

    for (const member of membersData) {
        await prisma.member.create({
            data: member
        })
    }

    // 3. Seed Service Plans
    const nextSabbath = new Date();
    nextSabbath.setDate(nextSabbath.getDate() + (6 - nextSabbath.getDay() + 7) % 7);
    nextSabbath.setHours(9, 0, 0, 0);

    // Clear existing plans to avoid duplicates
    await prisma.servicePlan.deleteMany({
        where: { tenantId: tenant.id }
    });

    const nextFriday = new Date(nextSabbath);
    nextFriday.setDate(nextSabbath.getDate() - 1);
    nextFriday.setHours(19, 0, 0, 0);

    const nextWednesday = new Date(nextSabbath);
    nextWednesday.setDate(nextSabbath.getDate() - 3); // Wednesday BEFORE Sabbath
    nextWednesday.setHours(19, 0, 0, 0);

    // 1. Vespers (Friday Night)
    await prisma.servicePlan.create({
        data: {
            tenantId: tenant.id,
            date: nextFriday,
            type: "vespers",
            title: "Vespers (Opening Sabbath)",
            items: [
                { time: "19:00", title: "Song Service", description: "Music Team", presenter: "Youth Dept", action: "sing" },
                { time: "19:15", title: "Unfolding Faith", description: "Testimonial", presenter: "Sis. Cruz", action: "speak" },
                { time: "19:30", title: "Message", description: "Speaker", presenter: "Elder Santos", action: "preach" },
                { time: "20:00", title: "Garden of Prayer", description: "Congregation", presenter: "Elder Santos", action: "pray" },
            ]
        }
    })

    // 2 & 3. Sabbath Services (Divine Worship, Sabbath School, AYS)
    // ... existing code follows ...

    await prisma.servicePlan.create({
        data: {
            tenantId: tenant.id,
            date: nextSabbath,
            type: "divine_worship",
            title: "Divine Worship Service",
            items: [
                { time: "10:45", title: "Prelude", description: "Organist", presenter: "Sis. Cruz", action: "play" },
                { time: "10:55", title: "Introit", description: "Choir", presenter: "BCC Choir", action: "sing" },
                { time: "11:00", title: "Invocation", description: "Elder on Duty", presenter: "Bro. Santos", action: "preach" },
                { time: "11:05", title: "Welcome Remarks", description: "Clerk", presenter: "Sis. Reyes", action: "speak" },
                { time: "11:15", title: "Opening Hymn", description: "Congregation", presenter: "Chorister", action: "sing" },
                { time: "11:45", title: "Sermon", description: "Pastor", presenter: "Ptr. Garcia", action: "preach" },
                { time: "12:15", title: "Closing Hymn", description: "Congregation", presenter: "Chorister", action: "sing" },
                { time: "12:20", title: "Benediction", description: "Pastor", presenter: "Ptr. Garcia", action: "pray" },
            ]
        }
    })

    await prisma.servicePlan.create({
        data: {
            tenantId: tenant.id,
            date: nextSabbath,
            type: "sabbath_school",
            title: "Sabbath School",
            items: [
                { time: "09:00", title: "Song Service", description: "Music Team", presenter: "Music Dept", action: "sing" },
                { time: "09:15", title: "Opening Prayer", description: "Superintendent", presenter: "Sis. Go", action: "pray" },
                { time: "09:20", title: "Mission Story", description: "Mission Dept", presenter: "Bro. Lim", action: "speak" },
                { time: "09:35", title: "Lesson Study", description: "Classes", presenter: "Teachers", action: "teach" },
                { time: "10:35", title: "Closing Thought", description: "Superintendent", presenter: "Sis. Go", action: "speak" },
            ]
        }
    })

    await prisma.servicePlan.create({
        data: {
            tenantId: tenant.id,
            date: nextSabbath,
            type: "ays",
            title: "AYS",
            items: [
                { time: "16:00", title: "Congregational Singing", description: "Youth Team", presenter: "Youth", action: "sing" },
                { time: "16:15", title: "Devotional", description: "Youth Leader", presenter: "Bro. Young", action: "speak" },
                { time: "16:30", title: "Activity / Bible Game", description: "Socials Team", presenter: "Sis. Happy", action: "play" },
                { time: "17:15", title: "Vespers Message", description: "Elder", presenter: "Elder Tan", action: "preach" },
                { time: "17:45", title: "Closing Prayer", description: "Youth Leader", presenter: "Bro. Young", action: "pray" },
            ]
        }
    })

    await prisma.servicePlan.create({
        data: {
            tenantId: tenant.id,
            date: nextWednesday,
            type: "midweek",
            title: "Midweek Prayer Meeting",
            items: [
                { time: "19:00", title: "Song Service", description: "Music Team", presenter: "Praise Team", action: "sing" },
                { time: "19:15", title: "Devotional", description: "Speaker", presenter: "Ptr. Garcia", action: "preach" },
                { time: "19:45", title: "Prayer Bands", description: "Groups", presenter: "All", action: "pray" },
                { time: "20:15", title: "Testimonies", description: "Open Mic", presenter: "Brethren", action: "speak" },
            ]
        }
    })

    // 4. Seed Inventory
    const inventoryData = [
        { name: "Communion Trays", category: "kitchen", quantity: 12, status: "Good", tenantId: tenant.id },
        { name: "Grape Juice (Bottles)", category: "kitchen", quantity: 5, status: "Low", tenantId: tenant.id },
        { name: "Offering Plates", category: "logistics", quantity: 20, status: "Good", tenantId: tenant.id },
        { name: "Decision Cards", category: "stationery", quantity: 50, status: "Good", tenantId: tenant.id },
        { name: "Baptismal Robes", category: "logistics", quantity: 2, status: "Critical", tenantId: tenant.id },
    ]

    for (const item of inventoryData) {
        await prisma.inventoryItem.create({
            data: item
        })
    }

    // 5. Seed Alerts
    const alertsData = [
        { type: "alert", title: "Low Inventory", message: "Baptismal robes are running low. Only 2 left.", isRead: false, tenantId: tenant.id },
        { type: "info", title: "Board Meeting", message: "Monthly board meeting this coming Tuesday at 7 PM.", isRead: false, tenantId: tenant.id },
        { type: "success", title: "Donation Received", message: "Anonymous donor gave ₱50k for the building fund.", isRead: false, tenantId: tenant.id },
    ]

    for (const alert of alertsData) {
        await prisma.officerAlert.create({
            data: alert
        })
    }

    console.log('Seeding data for tenant: Laway Seventh Day Adventist Church')

    const tenantLaway = await prisma.tenant.upsert({
        where: { slug: "laway-sda" },
        update: {},
        create: {
            name: "Laway Seventh Day Adventist Church",
            slug: "laway-sda",
            customDomain: "laway.church",
        }
    })

    // Seed Members for Laway
    const membersLaway = [
        {
            name: "Laway Elder",
            role: "officer",
            status: "active",
            phone: "+63 917 111 2222",
            email: "elder@laway.church",
            address: "Laway, Batangas",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=LawayElder",
            notes: "Head Elder",
            tenantId: tenantLaway.id
        },
        {
            name: "Laway Member",
            role: "member",
            status: "active",
            phone: "+63 917 333 4444",
            email: "member@laway.church",
            address: "Laway, Batangas",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=LawayMember",
            notes: "Regular member",
            tenantId: tenantLaway.id
        }
    ]

    for (const member of membersLaway) {
        await prisma.member.create({
            data: member
        })
    }

    // Seed Service Plans for Laway (Same dates as BCC)
    await prisma.servicePlan.deleteMany({
        where: { tenantId: tenantLaway.id }
    });

    // Vespers
    await prisma.servicePlan.create({
        data: {
            tenantId: tenantLaway.id,
            date: nextFriday,
            type: "vespers",
            title: "Vespers (Laway)",
            items: [
                { time: "19:00", title: "Song Service", description: "Laway Youth", presenter: "Youth", action: "sing" },
                { time: "19:30", title: "Message", description: "Speaker", presenter: "Local Elder", action: "preach" },
            ]
        }
    })

    // Divine Worship
    await prisma.servicePlan.create({
        data: {
            tenantId: tenantLaway.id,
            date: nextSabbath,
            type: "divine_worship",
            title: "Divine Worship Service",
            items: [
                { time: "11:00", title: "Divine Service", description: "Main Service", presenter: "District Pastor", action: "preach" },
            ]
        }
    })

    // Sabbath School
    await prisma.servicePlan.create({
        data: {
            tenantId: tenantLaway.id,
            date: nextSabbath,
            type: "sabbath_school",
            title: "Sabbath School",
            items: [
                { time: "09:00", title: "Lesson Study", description: "General Class", presenter: "SS Superintendent", action: "teach" },
            ]
        }
    })

    // Inventory for Laway
    const inventoryLaway = [
        { name: "Hymnals", category: "stationery", quantity: 100, status: "Good", tenantId: tenantLaway.id },
        { name: "Chairs", category: "logistics", quantity: 150, status: "Good", tenantId: tenantLaway.id },
    ]

    for (const item of inventoryLaway) {
        await prisma.inventoryItem.create({
            data: item
        })
    }

    // Alerts for Laway
    await prisma.officerAlert.create({
        data: { type: "info", title: "Welcome", message: "Welcome to the new system!", isRead: false, tenantId: tenantLaway.id }
    })

    console.log('Done.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(JSON.stringify(e, null, 2))
        await prisma.$disconnect()
        process.exit(1)
    })
