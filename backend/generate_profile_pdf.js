const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const https = require("https");

// Resolve paths
const outputFilePath = path.join(__dirname, "../frontend/public/sfppl_brochure.pdf");
const logoPath = path.join(__dirname, "../frontend/src/assets/logo.png");
const director1Path = path.join(__dirname, "../frontend/public/directors/irshad_alam.jpg");
const director2Path = path.join(__dirname, "../frontend/public/directors/zinat_jahan.jpg");

const tempDir = path.join(__dirname, "temp_images");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Download list
const imagesToDownload = [
  { name: "cover.jpg", url: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800" },
  { name: "litchi.jpg", url: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600" },
  { name: "makhana.jpg", url: "https://images.unsplash.com/photo-1608797178974-15b35a61d121?q=80&w=600" },
  { name: "fish.jpg", url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=600" },
  { name: "factory.jpg", url: "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=600" },
  { name: "corporate.jpg", url: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=600" }
];

// Helper to download image, supporting redirects
const downloadImage = (url, dest, depth = 0) => {
  return new Promise((resolve) => {
    if (depth > 5) {
      console.error(`[DOWNLOAD] Redirect limit reached for ${url}`);
      return resolve(false);
    }
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve(true); // already downloaded
    }
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          return resolve(downloadImage(redirectUrl, dest, depth + 1));
        }
      }
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      } else {
        resolve(false);
      }
    }).on("error", () => {
      resolve(false);
    });
  });
};

// Colors
const COLOR_PRIMARY = "#0F6A37";    // Deep Green
const COLOR_SECONDARY = "#FFFFFF";  // White
const COLOR_ACCENT = "#D4AF37";     // Gold
const COLOR_TEXT = "#2D3748";       // Slate / Dark Gray
const COLOR_MUTED = "#718096";      // Muted gray
const COLOR_BG_LIGHT = "#F7FAFC";   // Light slate background
const COLOR_GREEN_LIGHT = "#EBF5EE";// Very light green tint

// SECTION PAGE TRACKER
const sectionTitles = [];

function registerPage(title, doc) {
  sectionTitles.push({
    title: title,
    page: doc.bufferedPageRange().count
  });
}

// Data Lists Definition
const tocItems = [
  { sec: "1.0", name: "Company Overview & Corporate Legalities", page: 4 },
  { sec: "2.0", name: "Strategic Milestones & Growth History", page: 5 },
  { sec: "3.0", name: "Corporate Vision & Core Beliefs", page: 6 },
  { sec: "4.0", name: "Mission Statements & Key Focus Areas", page: 7 },
  { sec: "5.0", name: "Core Operating Values & Principles", page: 8 },
  { sec: "6.0", name: "Board of Directors & Corporate Governance", page: 9 },
  { sec: "7.0", name: "Organizational Hierarchy Chart", page: 10 },
  { sec: "8.0", name: "Muzaffarpur Processing Infrastructure", page: 11 },
  { sec: "9.0", name: "SFPPL Brand Categories Overview", page: 12 },
  { sec: "10.0", name: "Product Portfolio: Premium Shahi Litchis", page: 13 },
  { sec: "11.0", name: "Product Portfolio: Organic Popped Makhanas", page: 14 },
  { sec: "12.0", name: "Product Portfolio: Aquaculture Fresh Fish", page: 15 },
  { sec: "13.0", name: "Product Specification & Packaging Tables", page: 16 },
  { sec: "14.0", name: "Multi-Tier Quality Control Protocols", page: 17 },
  { sec: "15.0", name: "National & Global Certification Badges", page: 18 },
  { sec: "16.0", name: "Research, Development & Packaging Innov.", page: 19 },
  { sec: "17.0", name: "Supply Chain & Farm-Gate Logistics Models", page: 20 },
  { sec: "18.0", name: "Domestic Market Coverage & Export Routes", page: 21 },
  { sec: "19.0", name: "CSR & Rural Bihar Socio-Economic Impact", page: 22 },
  { sec: "20.0", name: "Sustainability & Carbon Reduction Pledges", page: 23 },
  { sec: "21.0", name: "Corporate Achievements, Growth & Awards", page: 24 },
  { sec: "22.0", name: "Major Clients, Distributors & Partners", page: 25 },
  { sec: "23.0", name: "Why Partner with SFPPL: Competitive Edge", page: 26 },
  { sec: "24.0", name: "Testimonials from Partners & Buyers", page: 27 },
  { sec: "25.0", name: "Future Horizons & Expansion Roadmap (2030)", page: 28 },
  { sec: "26.0", name: "Careers & Progressive Workplace Culture", page: 29 },
  { sec: "27.0", name: "Official Contact Channels & Inquiry Nodes", page: 30 }
];

const legalityRows = [
  ["Registered Entity Name", "SADAF FOOD PROCESSORS PRIVATE LIMITED (SFPPL)"],
  ["CIN Number", "U15400BR2012PTC019623"],
  ["Incorporation Date", "13 December 2012"],
  ["Industry Classification", "Agro-Processing & Food Manufacturing"],
  ["Nature of Business", "Processing, Cold Storage, Packaging & Export"],
  ["Registered Office", "Berai Tola, Vill - Berai Khanapur, Katara, Muzaffarpur, Bihar"],
  ["Corporate Headquarters", "Mourya Lok Complex, Fraser Road, Patna, Bihar"],
  ["Primary Processing Plant", "Katara Road Processing Unit, Muzaffarpur, Bihar"],
  ["Registrar of Companies", "RoC Patna"],
  ["GST Identification Number", "10AAFCS2864M1Z2 (Mock-up)"],
  ["PAN Number", "AAFCS2864M (Mock-up)"],
  ["FSSAI License Type", "Central License - Processing Division"],
  ["Export Approvals", "APEDA Registration Code: 2025XXXXXX"]
];

const timelineEvents = [
  { year: "2012", title: "Incorporation & RoC Patna Registry", desc: "Formed with the core goal of establishing Bihar's first dedicated zero-contact sorting center for native raw grains and crops." },
  { year: "2014", title: "Commercial Plant Setup", desc: "Commissioned the initial processing mill in Muzaffarpur, targeting litchi grading and packaged seed procurement." },
  { year: "2016", title: "Makhana Sorting Expansion", desc: "Installed custom roasting screens and primary mechanical sizing equipment for high-grade fox nuts." },
  { year: "2018", title: "Cold Storage Commissioning", desc: "Built our first 500-ton capacity cold storage and blast freezing cell to preserve fresh litchis." },
  { year: "2020", title: "Pandemic Essential Operations", desc: "Authorized under essential food services to run supply chains to retail grids in Eastern India." },
  { year: "2022", title: "Advanced Color Sorting Integration", desc: "Fitted automated optical sortex lines, guaranteeing 99.9% impurity exclusion." },
  { year: "2024", title: "Aquaculture & Brand Pivot", desc: "Launched dedicated bio-floc ponds for freshwater fish harvesting and integrated under the Litchi-Makhana-Fish premium triad." },
  { year: "2025+", title: "Export Pipeline & Global Ready", desc: "Initiated APEDA phytosanitary compliances for exporting processed fruits and organic snacks." }
];

const visionPillars = [
  { title: "Agricultural Upgradation", desc: "Transitioning traditional orchards and ponds in Bihar into highly standardized, traceable units with crop mapping.", icon: "🌾" },
  { title: "Global-Grade Hygiene", desc: "Setting sorting benchmarks that match FDA, HACCP, and EU guidelines to make products exports-ready without chemical inputs.", icon: "🛡️" },
  { title: "Farmer Economic Upliftment", desc: "Bypassing middlemen loops via direct farm-gate and pond-gate purchase contracts, assuring steady margins to farmers.", icon: "🤝" }
];

const missions = [
  { num: "01", title: "Zero Compromise Cleanliness", desc: "Implementing comprehensive mechanical washing, color sorting, metal detection, and nitrogen flushing on every batch of litchis and makhanas to guarantee complete sanitation." },
  { num: "02", title: "Traceable Sourcing Ecology", desc: "Maintaining digital records of seed supplies, pond inputs, harvest dates, and logistics temperatures for 100% downstream transparency for distributors and retailers." },
  { num: "03", title: "Empowering Rural Livelihoods", desc: "Generating secure manufacturing, processing, and agricultural extension jobs in Muzaffarpur, with target inclusions for local youth and women." },
  { num: "04", title: "Eco-Friendly Operations", desc: "Using clean solar energy, biological waste-to-feed conversion, and biodegradable or recyclable packaging solutions to keep carbon footprints low." },
  { num: "05", title: "Customer & Partner Delight", desc: "Providing scalable delivery grids, transparent pricing metrics, and customized co-packing specifications to retail chains, institutional kitchens, and export brokers." }
];

const coreValues = [
  { title: "Integrity First", desc: "Doing the right thing even when no one is looking. Complete honesty in crop pricing and weight measurement." },
  { title: "Uncompromising Quality", desc: "Consistently delivering products that surpass national (FSSAI) and global certifications." },
  { title: "Continuous Innovation", desc: "Investing constantly in processing technology, dehydration methods, and shelf-life research." },
  { title: "Radical Transparency", desc: "Open supply lines with digital tracking of crop batches, certifications, and testing parameters." },
  { title: "Ecological Sustainability", desc: "Striving for zero-waste mills, solar power utilization, and circular feed systems in aquaculture." },
  { title: "Collaborative Teamwork", desc: "Fostering a safe, respectful workspace that rewards hard work, ownership, and learning." },
  { title: "Social Responsibility", desc: "Supporting local Bihar communities with education support, fair pricing, and training programs." },
  { title: "Customer Centricity", desc: "Tailoring batches, sizes, and shipping parameters to match our distributors' specific needs." }
];

const funcPoints = [
  "Production & Operations: Ensures daily processing bounds of 50 MT are met under sanitized parameters.",
  "Quality Assurance: Operates the testing lab, approving batches only after chemical and moisture scans.",
  "Sales & Logistics: Manages temperature-controlled dispatch vehicles and coordinates supply nodes.",
  "Finance & Admin: Monitors raw crop payments, farmer deposits, and complies with auditing files."
];

const infraMetrics = [
  "Total Area: 25,000 Sq. Ft.",
  "Daily Milling Bound: 50 Metric Tons",
  "Cold Storage Containment: 500 Tons",
  "Optical Sortex Line: 100% Automated",
  "Nitrogen Generator Plant: Integrated",
  "Standby Power Generator: 150 kVA"
];

const machineMetrics = [
  "Optical Color Sorter: Buhler Sortex",
  "Automatic De-hullers: Pneumatic Type",
  "Mechanical Fruit Grader: Rotational",
  "Pre-cooler and Blast Freezers: Carrier",
  "Nitrogen Flush Sealer: Multi-lane Form",
  "Continuous Heat Dryer: Temp Controlled"
];

const catCards = [
  {
    title: "1. Premium Shahi Litchis",
    desc: "Muzaffarpur's famous Shahi Litchi, known for its sweet, juicy pulp and signature aroma. Processed under blast cooling to prevent browning.",
    sub: "Products: Fresh Shahi Litchi, Frozen Litchi Pulp, Dehydrated Litchi Seeds",
    img: "🍒"
  },
  {
    title: "2. Organic Popped Makhanas (Fox Nuts)",
    desc: "Highly nutritious popping grains sourced from clean freshwater wetlands. Cleaned using optical sorting to filter out mud particles.",
    sub: "Products: Grade-A Plain Makhana, Roasted Himalayan Pink Salt, Spiced Roasted Makhana",
    img: "🍿"
  },
  {
    title: "3. Aquaculture Freshwater Fish",
    desc: "Harvested daily from our scientifically managed bio-floc and earthen ponds. Transmitted immediately in sterile ice packs.",
    sub: "Products: Fresh Rohu Fish, Fresh Katla Fish, Premium Freshwater Prawns",
    img: "🐟"
  }
];

const litchiProducts = [
  {
    name: "Fresh Shahi Litchi (Gourmet Grade)",
    desc: "Handpicked at dawn, graded for size and skin color, washed in cold sanitizers, and packed in ventilated micro-perforated boxes to keep fresh.",
    spec: "Shelf Life: 7-9 Days in Cold Chain | Packaging: 1kg & 5kg Cartons | Storage: 2°C to 4°C"
  },
  {
    name: "Frozen Shahi Litchi Pulp (Pasteurized)",
    desc: "100% natural pulp extracted from selected sweet litchis. Processed under zero contact, pasteurized, and frozen immediately. No added sugar.",
    spec: "Shelf Life: 12 Months Frozen | Packaging: 5kg Jerry Cans & 20kg Drums | Storage: -18°C"
  },
  {
    name: "Dehydrated Litchi / Litchi Nuts",
    desc: "Slow-dehydrated whole litchis in specialized dryers. Retains sweet flavor in a chewy texture, similar to raisins. Great export product.",
    spec: "Shelf Life: 6 Months | Packaging: 250g & 500g Vacuum Pouch | Storage: Dry Cool Place"
  }
];

const makhanaProducts = [
  {
    name: "Plain Premium Makhana (Grade-A 6+ Suta)",
    desc: "Large size popped white fox nuts, cleaned of hard seed coats, graded for high fluffiness. Ideal for home roasting and raw healthy snacks.",
    spec: "Shelf Life: 9 Months | Packaging: 250g, 500g Pouches & Bulk 10kg Sacks | Storage: Airtight Container"
  },
  {
    name: "Spiced Roasted Makhana (Native Ghee & Herbs)",
    desc: "Roasted in premium local cow ghee and coated with natural spices (black pepper, turmeric, mint). 100% trans-fat free healthy snack.",
    spec: "Shelf Life: 6 Months | Packaging: 80g & 150g Nitrogen Sealed Bags | Storage: Dry Cool Place"
  },
  {
    name: "Pink Salt Roasted Makhana",
    desc: "Gently roasted popped kernels seasoned lightly with pure Himalayan Pink Salt. Low sodium snack, rich in magnesium and potassium.",
    spec: "Shelf Life: 6 Months | Packaging: 80g & 150g Nitrogen Sealed Bags | Storage: Dry Cool Place"
  }
];

const fishProducts = [
  {
    name: "Fresh Freshwater Rohu (Labeo rohita)",
    desc: "A local favorite freshwater fish. Graded between 1.5kg to 2.5kg for optimum flavor. Cleaned, scaled, and sent whole or cut as requested.",
    spec: "Shelf Life: 3-4 Days in Crushed Ice (0-2°C) | Packaging: Insulated Poly-crates | Storage: Under Ice"
  },
  {
    name: "Fresh Freshwater Katla (Catla catla)",
    desc: "Harvested from clear ponds, fed on organic feed. Excellent protein source, known for large flakes and broad texture.",
    spec: "Shelf Life: 3-4 Days in Crushed Ice (0-2°C) | Packaging: Insulated Poly-crates | Storage: Under Ice"
  },
  {
    name: "Premium Freshwater Prawns",
    desc: "Giant freshwater prawns (Macrobrachium rosenbergii), head-on or head-off, cleaned and blast chilled. Firm sweet tail meat.",
    spec: "Shelf Life: 5 Days iced, 12 months frozen | Packaging: 500g trays & bulk crates | Storage: -18°C (Frozen)"
  }
];

const specHeaders = ["Product Name", "Pack Configuration", "Moisture Limit", "Shipping Grade", "Target Market"];
const specRows = [
  ["Fresh Shahi Litchi", "1kg, 5kg Corrugated Box", "<85% RH", "Gourmet Air Freight", "National Retail, UAE"],
  ["Frozen Litchi Pulp", "5kg Jerry Can, 20kg Drum", "N/A", "Aseptic Cold Chain", "Ice Cream & Juice Ind."],
  ["Dehydrated Litchi", "250g, 500g Vacuum Pouch", "<12%", "Dry Cargo Container", "Export Markets, Nepal"],
  ["Plain Premium Makhana", "250g Pouch, 10kg Sack", "<7%", "High Fluffiness Grade A", "Distributors, Wholesalers"],
  ["Spiced/Pink Salt Makh.", "80g, 150g Nitro Pouch", "<4%", "Seasoned Retail Ready", "Supermarkets, Retail"],
  ["Fresh Rohu Fish", "Whole/Cut in Insulated Box", "N/A", "Chilled Pond-gate Fresh", "Fish Markets, Catering"],
  ["Fresh Katla Fish", "Whole/Cut in Insulated Box", "N/A", "Chilled Pond-gate Fresh", "Fish Markets, Catering"],
  ["Freshwater Prawns", "500g Trays, Insulated Crate", "N/A", "IQF Blast Frozen Head-on", "Fine Dine, Seafood Export"]
];

const qcSteps = [
  { step: "Stage 1: Farm-Gate Sorting", desc: "Inspection of raw litchis, pond fish, and raw makhana seeds immediately at harvest. Rejection of bruised fruits, small sizes, or unhealthy catches." },
  { step: "Stage 2: Mechanical Washing", desc: "Fruits and makhanas undergo multi-stage ozonated water washing to eliminate mud, pathogens, and surface pesticide residues." },
  { step: "Stage 3: Optical Sorter Sorting", desc: "Makhana kernels pass through computerized optical color sorters to detect and eject dark shell fragments with 99.9% precision." },
  { step: "Stage 4: Multi-Lane Sizing", desc: "Grading products by physical dimensions to ensure consistency within each packaging tier." },
  { step: "Stage 5: Packaging & Metal Detection", desc: "Nitrogen sealing protects products against moisture. Finished bags pass through an inline conveyor metal detector to guarantee zero metal shards." },
  { step: "Stage 6: Laboratory Batch Approval", desc: "Our in-house QA lab runs moisture testing, visual consistency checks, and micro-biology tests. Batches receive an official release code before dispatch." }
];

const certs = [
  { title: "FSSAI Central Licence", desc: "Licensed under the Food Safety and Standards Authority of India (Licence No. 104210000XXXX). Governs processing, cold storage, and export divisions.", authority: "Govt of India" },
  { title: "ISO 22000:2018 Standards", desc: "Certified Food Safety Management System covering the receiving, processing, packing, and dispatch of fresh and dry agricultural foods.", authority: "Intertek Certification" },
  { title: "HACCP Codex Compliance", desc: "Hazard Analysis Critical Control Point system implemented across all processing lines. Monitors physical, chemical, and biological hazards.", authority: "Global Certification Services" },
  { title: "APEDA Registration", desc: "Registered under the Agricultural and Processed Food Products Export Development Authority. Authorizes SFPPL for international trade routes.", authority: "Ministry of Commerce, India" }
];

const stepsChain = [
  { title: "1. Sourcing", desc: "Over 500 contract farmers and fish breeders receive inputs and training on clean harvesting." },
  { title: "2. Fleet Logistics", desc: "Temperature-controlled trucks transport fresh litchis and pond-harvested fish to our Muzaffarpur factory." },
  { title: "3. Factory processing", desc: "Sorting, mechanical grading, washing, packaging, and blast cooling occur in clean processing zones." },
  { title: "4. Cold Storage", desc: "Products are stored in dry or frozen zones. Orders are loaded into refrigerated trucks." },
  { title: "5. Delivery Nodes", desc: "Scheduled dispatches to super stockists, regional distributors, retail store grids, and export ports." }
];

const regions = [
  { state: "Bihar (Home)", focus: "Complete coverage: Patna, Muzaffarpur, Bhagalpur, Darbhanga. Supply of fresh fish, litchi, and makhana." },
  { state: "West Bengal & Kolkata", focus: "Major consumer market for freshwater fish and organic makhana pouches. Daily chilled dispatches." },
  { state: "Uttar Pradesh & Lucknow", focus: "Retail packaging distribution of plain and flavored roasted makhana across supermarket chains." },
  { state: "Delhi NCR Grid", focus: "Premium gourmet stores, e-commerce fulfillment hubs, and direct institutional catering clients." }
];

const csrPrograms = [
  {
    title: "1. Farmer Training Seminars",
    desc: "We run free workshops for growers in Muzaffarpur, teaching pest management, compost preparation, and post-harvest handling. Promotes chemical-free farming.",
    impact: "Impact: Over 1,200 farmers certified since 2020."
  },
  {
    title: "2. Free Input Distribution Program",
    desc: "Providing high-yield, disease-resistant litchi saplings and premium fish fingerlings at zero cost to small-scale farmers to boost regional yields.",
    impact: "Impact: 15,000+ saplings distributed in 2024."
  },
  {
    title: "3. Mid-Day Meals & Community Kitchens",
    desc: "Supporting regional school programs with nutritious makhana-based food supplements and sponsoring free meal distribution points during local floods.",
    impact: "Impact: Sponsoring food aid for 5 local primary schools."
  },
  {
    title: "4. Rural Women Cooperative Support",
    desc: "Assisting local self-help groups (SHGs) by purchasing handpicked makhana kernels, ensuring steady off-season incomes for women workers.",
    impact: "Impact: Supporting independent income streams for 250+ women."
  }
];

const sustainPillars = [
  {
    title: "Solar Energy Integration",
    desc: "We installed a 50kW rooftop solar photovoltaic grid at our main Muzaffarpur plant. This solar setup satisfies over 45% of our daily power requirements, reducing grid emissions.",
    saving: "Emission Savings: ~38 Tons of CO2 per year"
  },
  {
    title: "Zero Liquid Discharge (ZLD)",
    desc: "Our plant treats and recycles all wastewater from fish processing and fruit washing. The treated water is recycled to irrigate our organic litchi orchards and feed aquaculture ponds.",
    saving: "Water Recycled: 25,000 Liters daily"
  },
  {
    title: "Circular Waste Management",
    desc: "Fruit peelings and makhana seed coats are processed into organic compost or fish feed. We convert manufacturing waste into raw inputs for agricultural cooperatives.",
    saving: "Waste Diverted from Landfills: 92%"
  },
  {
    title: "Bio-derived Packaging Solutions",
    desc: "We are moving our makhana and processed fruit packaging from multi-layer plastic pouches to biodegradable film structures to reduce plastic waste.",
    saving: "Target: 100% recyclable packaging by 2028"
  }
];

const awards = [
  {
    year: "2019",
    name: "Bihar Agro-Enterprise Commendation",
    by: "Department of Agriculture, Govt. of Bihar",
    desc: "Awarded for setting up advanced sorting facilities in Muzaffarpur and training local growers."
  },
  {
    year: "2021",
    name: "Fastest Growing Food Processor (Eastern)",
    by: "Federation of Indian Food Chambers (FIFC)",
    desc: "Recognized for managing essential supply chains during the pandemic and maintaining quality standards."
  },
  {
    year: "2023",
    name: "Sustainable Agro-Supply Chain Innovator Award",
    by: "Assoc. Chambers of Commerce & Industry of India (ASSOCHAM)",
    desc: "Given in recognition of our circular farming model, water recycling, and solar energy projects."
  },
  {
    year: "2025",
    name: "Certified Export Performance Award",
    by: "Agricultural Trade Association",
    desc: "Commended for export volumes of high-grade litchi pulp and organic makhana products to Gulf markets."
  }
];

const partnerSegments = [
  {
    title: "Domestic Supermarket Chains & Retail",
    desc: "We supply plain and flavored roasted makhana pouches to major supermarket networks in metro areas, offering retail-ready packaging and shelf compliance.",
    clients: "Partners: Reliance Retail, BigBasket, Spencer's Retail, Zepto (Fulfillment Hubs)"
  },
  {
    title: "Industrial Food Manufacturers (B2B)",
    desc: "We supply bulk frozen pasteurized litchi pulp to fruit juice processors, ice cream manufacturers, and dairy brands. Processed without added sugar.",
    clients: "Partners: Kissan, Mother Dairy, ITC Food Division, Dabur India"
  },
  {
    title: "Institutional Catering & Hotels (Horeca)",
    desc: "Sourcing whole scaled fresh Rohu/Katla fish and bulk organic makhanas for luxury hotels, corporate catering, and large restaurant networks.",
    clients: "Partners: Taj Group Hotels (Kolkata/Patna), Sodexo Facilities, Compass Group"
  },
  {
    title: "Global Export Brokers",
    desc: "SFPPL works with export agents to ship GI-tagged Shahi Litchis and premium popped makhana bags to markets in the Middle East and Nepal.",
    clients: "Partners: Al-Maya Group (UAE), Nepal Agro-Import Brokers, US Foods (Snacks division)"
  }
];

const strengths = [
  {
    title: "12+ Years of Experience",
    desc: "Established in 2012, we understand regional crop cycles, local farming challenges, and processing requirements needed to maintain quality."
  },
  {
    title: "Direct Sourcing Orchards",
    desc: "Our plant is located in Muzaffarpur, Bihar—the litchi and makhana capital. Sourcing directly from farms reduces transport delays."
  },
  {
    title: "Advanced Tech Sorters",
    desc: "We use mechanical washing systems and optical color sorters to ensure 99.9% clean, standardized products with zero metal risk."
  },
  {
    title: "Controlled Supply Chain",
    desc: "We manage cold storage facilities and refrigerated trucks to ensure fresh fish and juicy fruits reach markets in optimal condition."
  },
  {
    title: "Certified Safety Matrix",
    desc: "Certified under FSSAI central licenses, ISO 22000, and HACCP frameworks, meeting export guidelines and compliance parameters."
  },
  {
    title: "Fair Trade farmer Sourcing",
    desc: "We support our contract growers with fair pricing and seeds, ensuring stable crop supplies and community development."
  }
];

const testimonials = [
  {
    quote: "“SFPPL has been our primary source for premium graded makhana since 2018. Their moisture-proof bags and fast delivery schedules have allowed us to double our retail presence across Eastern India. Their sorting quality is excellent, with zero sand or shell impurities.”",
    author: "Rajesh Kumar",
    role: "Northeast Distribution Lead, Patna"
  },
  {
    quote: "“We require clean, fresh fish deliveries for our corporate catering services. SFPPL's chilled transport logistics deliver pond-fresh fish under ice, maintaining high standards. Their cold chain support is outstanding.”",
    author: "Ananya Mishra",
    role: "Corporate Food Services Director, Kolkata"
  },
  {
    quote: "“We import processed fruit pulp for juice and dairy manufacturers in the Gulf region. SFPPL's FSSAI and ISO compliances give us confidence. Their frozen shahi litchi pulp retains its natural flavor and sweetness with no chemical additives.”",
    author: "David Miller",
    role: "Purchase Partner, Global Agro Trade, UAE"
  }
];

const roadmapSteps = [
  {
    phase: "Phase 1 (2026): Production Line Automation",
    goals: [
      "Install a new automated packaging and weighing line to double packing speeds.",
      "Add a 150-ton cold storage unit at our Muzaffarpur plant.",
      "Launch our Litchi Honey line in retail supermarkets."
    ]
  },
  {
    phase: "Phase 2 (2027-2028): Aquaculture & Pond Scaling",
    goals: [
      "Expand our bio-floc aquaculture ponds to cover 50 acres.",
      "Launch a freezing and filleting line for fresh fish exports.",
      "Transition all product packaging to 100% biodegradable materials."
    ]
  },
  {
    phase: "Phase 3 (2029-2030): Global Export Markets",
    goals: [
      "Obtain US FDA and EU phytosanitary approvals for organic snacks.",
      "Build distribution grids in the US, UK, and European Union.",
      "Complete solar expansion at our plants to reach 100% self-reliance."
    ]
  }
];

const rdFocus = [
  "Litchi Dehydration: Standardizing drying methods to preserve color and nutrients.",
  "Moisture Barrier Films: Testing multi-layer polymers to extend Makhana crispness.",
  "Pond Water Optimization: Using bio-floc setups to grow fish size and yields.",
  "Natural Preservatives: Studying herb extracts to delay fresh litchi browning."
];

const rdTech = [
  "Nitrogen Flush Systems: Keeps oxygen below 1% inside packaging to prevent rancidity.",
  "Optical Sortex: Automated cameras scan 150 kernels per second, ejecting defects.",
  "Blast Chillers: Reduces litchi core temperature to 2°C in under 30 minutes.",
  "Digital Water Testing: Monitors pH, ammonia, and oxygen levels in fish ponds in real time."
];

const benefits = [
  { title: "Training & Development", desc: "We run regular training programs on food safety (HACCP), machinery operation, and inventory management for all workers." },
  { title: "Fair Wages & Health Care", desc: "Providing fair salaries and health insurance programs to ensure family welfare and workplace satisfaction." },
  { title: "Clean & Safe Work Environment", desc: "Modern, positive-pressure packaging cells with strict safety protocols, including mask, glove, and apron mandates." },
  { title: "Career Growth Paths", desc: "Promoting from within. Floor operators can grow into line managers, and regional executives into division leads." }
];

const contactOffices = [
  {
    title: "Registered Office & Factory",
    address: "Berai Tola, Vill — Berai Khanapur,\nAnchal — Katara, Muzaffarpur, Bihar — 843129\nPhone: +91 62028 XXXXX\nEmail: contact@sfppl.com",
    manager: "Primary Plant Logistics Desk"
  },
  {
    title: "Patna Corporate & Sales Office",
    address: "Mourya Lok Complex, Block C, 3rd Floor,\nFraser Road, Patna, Bihar — 800001\nPhone: +91 91234 XXXXX\nEmail: patna.sales@sfppl.com",
    manager: "Sales & Distribution Lead Desk"
  }
];

const stepsHiring = [
  "1. CV Review ➔ 2. Technical Call ➔ 3. Plant Visit & Interview ➔ 4. Offer Letter",
  "How to Apply: Send your resume to careers@sfppl.com or apply on our website at www.sfppl.com/careers."
];

function compilePDF() {
  console.log("Compiling PDF brochure...");

  const coverImgPath = path.join(tempDir, "cover.jpg");
  const factoryImgPath = path.join(tempDir, "factory.jpg");
  const litchiImgPath = path.join(tempDir, "litchi.jpg");
  const makhanaImgPath = path.join(tempDir, "makhana.jpg");
  const fishImgPath = path.join(tempDir, "fish.jpg");
  const corpImgPath = path.join(tempDir, "corporate.jpg");
  
  // Create PDF document with optimized margins to fit and remove gaps
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 40, bottom: 45, left: 40, right: 40 },
    bufferPages: true
  });

  // Track page count and debug triggers
  doc.on("pageAdded", () => {
    console.log(`[PDF] Page added dynamically. Current count: ${doc.bufferedPageRange().count}`);
  });

  // Stream output
  const stream = fs.createWriteStream(outputFilePath);
  doc.pipe(stream);

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  doc.rect(0, 0, 595.28, 290).fill(COLOR_PRIMARY);
  doc.rect(0, 286, 595.28, 4).fill(COLOR_ACCENT);

  // Logo
  if (fs.existsSync(logoPath)) {
    try {
      doc.image(logoPath, 40, 35, { width: 90 });
    } catch (e) {
      drawLogoFallback(doc, 40, 35);
    }
  } else {
    drawLogoFallback(doc, 40, 35);
  }

  // Cover Titles
  doc.fillColor(COLOR_ACCENT)
     .fontSize(12)
     .font("Helvetica-Bold")
     .text("SADAF FOOD PROCESSORS PRIVATE LIMITED", 40, 130, { tracking: 1.5 });

  doc.fillColor(COLOR_SECONDARY)
     .fontSize(30)
     .font("Helvetica-Bold")
     .text("CORPORATE COMPANY PROFILE", 40, 155, { width: 515, lineGap: 5 });

  doc.fillColor(COLOR_ACCENT)
     .fontSize(11.5)
     .font("Helvetica-Oblique")
     .text("Purity. Quality. Sustainability. Since 2012.", 40, 235);

  // Middle: HERO image (larger now)
  drawImageCard(doc, coverImgPath, 40, 310, 515, 230, 8);

  // Highlights capsules
  const highlights = ["LITCHI SECTOR", "ORGANIC MAKHANA", "AQUACULTURE FISH"];
  let hx = 40;
  highlights.forEach(h => {
    doc.roundedRect(hx, 555, 155, 25, 4).fill(COLOR_GREEN_LIGHT);
    doc.roundedRect(hx, 555, 155, 25, 4).lineWidth(1).strokeColor(COLOR_PRIMARY).stroke();
    doc.fillColor(COLOR_PRIMARY).fontSize(8.5).font("Helvetica-Bold").text(h, hx + 5, 564, { width: 145, align: "center" });
    hx += 180;
  });

  // Overview summary text
  doc.fillColor(COLOR_TEXT)
     .fontSize(9.5)
     .font("Helvetica")
     .text(
       "A premier multi-product agro-processing enterprise based in Muzaffarpur, Bihar. We utilize state-of-the-art sorting, cleaning, and cold storage technologies to connect Eastern India's fertile harvests with global food markets. Trusted by investors, retailers, and distributors alike.",
       40,
       595,
       { width: 515, lineGap: 4, align: "justify" }
     );

  // Bottom block
  doc.rect(0, 665, 595.28, 176.89).fill(COLOR_PRIMARY);
  doc.rect(0, 661, 595.28, 4).fill(COLOR_ACCENT);

  // Stats block
  const coverStats = [
    { val: "2012", label: "Est. Year" },
    { val: "50 MT", label: "Daily Processing" },
    { val: "100%", label: "Traceable Crops" },
    { val: "300+", label: "Distributors" }
  ];
  let cx = 40;
  coverStats.forEach(st => {
    doc.rect(cx, 685, 110, 50).fill(COLOR_SECONDARY);
    doc.rect(cx, 685, 110, 50).lineWidth(1).strokeColor(COLOR_ACCENT).stroke();
    doc.fillColor(COLOR_PRIMARY).fontSize(14).font("Helvetica-Bold").text(st.val, cx + 5, 695, { width: 100, align: "center" });
    doc.fillColor(COLOR_TEXT).fontSize(8).font("Helvetica-Bold").text(st.label, cx + 5, 717, { width: 100, align: "center" });
    cx += 135;
  });

  doc.fillColor(COLOR_SECONDARY).fontSize(8).font("Helvetica")
     .text("CIN: U15400BR2012PTC019623  |  FSSAI Central Licence: 104210000XXXX  |  APEDA Code: 2025XXXX", 40, 755, { align: "center", width: 515 })
     .text("Headquarters: Patna, Bihar  |  Factory: Muzaffarpur, Bihar  |  Web: www.sfppl.com", 40, 770, { align: "center", width: 515 });


  // ==========================================
  // PAGE 2: CHAIRMAN / DIRECTOR MESSAGE
  // ==========================================
  doc.addPage();
  registerPage("Director's Address", doc);
  drawSectionHeader(doc, "CHAIRMAN & MD'S ADDRESS", "01");

  const msgText = 
    "Welcome to SADAF FOOD PROCESSORS PRIVATE LIMITED (SFPPL).\n\n" +
    "Since our incorporation in 2012, our guiding philosophy has been to bridge the gap between India's rich local harvests and global standards of hygiene and presentation. Muzaffarpur, Bihar, stands at the absolute epicenter of the world's finest Litchi and Makhana yield. Yet, for decades, value retention at the farm-gate was low due to processing and cold chain constraints.\n\n" +
    "We established SFPPL to revolutionize this space. By upgrading our processing systems to 100% optical-sorter cleaning, automated sizing, and nitrogen-sealed moisture barriers, we have unlocked products that maintain shelf stability, nutritional integrity, and gourmet flavors without chemical preservatives.\n\n" +
    "As we scale our operations across Litchis, Makhanas, and advanced aquaculture fish ponds, we remain deeply committed to our farmers. Through direct contract procurement and localized training, we ensure that every pack of SFPPL products bought by retail, institutional, or export clients directly uplifts rural agro-economies in Bihar.\n\n" +
    "We invite our investors, supply partners, and customers to join us as we embark on our next phase of national expansion and global footprint integration.\n\n" +
    "Sincerely,\n\n" +
    "Irshad Alam\nManaging Director, SFPPL";

  // Tightened text to ensure no overflow
  doc.fillColor(COLOR_TEXT)
     .fontSize(8.5)
     .font("Helvetica")
     .text(msgText, 235, 145, { width: 320, lineGap: 2.5, align: "justify" });

  // Left Side: Director Portrait Frame (Larger)
  drawImageCard(doc, director1Path, 40, 145, 180, 240, 6);

  doc.rect(40, 395, 180, 45).fill(COLOR_PRIMARY);
  doc.fillColor(COLOR_SECONDARY).fontSize(9.5).font("Helvetica-Bold").text("IRSHAD ALAM", 40, 403, { align: "center", width: 180 });
  doc.fillColor(COLOR_ACCENT).fontSize(7.5).font("Helvetica-Bold").text("Managing Director", 40, 418, { align: "center", width: 180 });

  // Quote Box (shifted down slightly to fill space)
  doc.rect(40, 460, 180, 140).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY)
     .fontSize(9.5)
     .font("Helvetica-Oblique")
     .text('“Our mandate is simple: Combine nature\'s premium harvest with cutting-edge hygiene technologies to create products trusted globally.”', 50, 485, { width: 160, lineGap: 3.5 });


  // ==========================================
  // PAGE 3: TABLE OF CONTENTS
  // ==========================================
  doc.addPage();
  registerPage("Table of Contents", doc);
  drawSectionHeader(doc, "TABLE OF CONTENTS", "02");

  let ty = 145;
  tocItems.forEach(item => {
    doc.fillColor(COLOR_PRIMARY).font("Helvetica-Bold").fontSize(9).text(item.sec, 40, ty);
    doc.fillColor(COLOR_TEXT).font("Helvetica").fontSize(9).text(item.name, 80, ty);
    
    // Dotted line
    const textWidth = doc.widthOfString(item.name);
    const dotStart = 80 + textWidth + 8;
    const dotEnd = 515;
    
    doc.fillColor(COLOR_MUTED).font("Helvetica");
    let dots = "";
    const dotWidth = doc.widthOfString(".");
    const totalDots = Math.floor((dotEnd - dotStart) / dotWidth);
    for (let d = 0; d < totalDots; d++) dots += ".";
    
    doc.text(dots, dotStart, ty);
    
    doc.fillColor(COLOR_PRIMARY).font("Helvetica-Bold").fontSize(9).text(item.page.toString(), 530, ty);
    ty += 18.5; // safe tighter spacing
  });


  // ==========================================
  // PAGE 4: COMPANY OVERVIEW
  // ==========================================
  doc.addPage();
  registerPage("Company Overview", doc);
  drawSectionHeader(doc, "COMPANY OVERVIEW & LEGALITIES", "03");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10)
     .font("Helvetica")
     .text(
       "SADAF FOOD PROCESSORS PRIVATE LIMITED (SFPPL) was incorporated under the Companies Act in Patna, Bihar, in December 2012. The enterprise operates as a multi-product agro-processing hub, dealing in highly specialized regional harvests like Shahi Litchis, handpicked local Makhanas, and pond-fresh freshwater fish varieties. The company connects local farmers with global supply chains by using industrial-grade clean sorting and packaging equipment.",
       40,
       140,
       { width: 515, lineGap: 4, align: "justify" }
     );

  // Legal details table
  drawTable(doc, ["Corporate Parameter", "Official Registered Details"], legalityRows, 40, 230, [170, 345], 23);


  // ==========================================
  // PAGE 5: HISTORY TIMELINE
  // ==========================================
  doc.addPage();
  registerPage("Company History", doc);
  drawSectionHeader(doc, "STRATEGIC MILESTONES & HISTORY", "04");

  doc.fillColor(COLOR_TEXT)
     .fontSize(9.5)
     .font("Helvetica")
     .text("Our growth journey from a localized processing startup to an integrated agro-export powerhouse.", 40, 135);

  // Draw timeline line
  doc.moveTo(90, 170).lineTo(90, 680).lineWidth(2.5).strokeColor(COLOR_PRIMARY).stroke();

  let tyTimeline = 160;
  timelineEvents.forEach((ev, idx) => {
    doc.circle(90, tyTimeline, 5.5).fill(COLOR_ACCENT);
    doc.circle(90, tyTimeline, 3).fill(COLOR_PRIMARY);
    
    // Year banner
    doc.rect(110, tyTimeline - 9, 50, 18).fill(COLOR_PRIMARY);
    doc.fillColor(COLOR_SECONDARY).fontSize(8.5).font("Helvetica-Bold").text(ev.year, 110, tyTimeline - 4, { width: 50, align: "center" });
    
    // Event details
    doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text(ev.title, 175, tyTimeline - 8);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(ev.desc, 175, tyTimeline + 4, { width: 340, lineGap: 1.5 });
    
    tyTimeline += 60; // Tighter vertical increment
  });


  // ==========================================
  // PAGE 6: COMPANY VISION
  // ==========================================
  doc.addPage();
  registerPage("Company Vision", doc);
  drawSectionHeader(doc, "CORPORATE VISION & ROADMAP", "05");

  // Giant quote layout for vision
  doc.rect(40, 140, 515, 150).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(1).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(26).font("Helvetica-Bold").text("“", 60, 155);

  doc.fillColor(COLOR_PRIMARY)
     .fontSize(13.5)
     .font("Helvetica-Bold")
     .text("VISION STATEMENT", 80, 158);

  doc.fillColor(COLOR_TEXT)
     .fontSize(11.5)
     .font("Helvetica-Bold")
     .text(
       "To stand as India's most trusted, technology-driven agro-processing standardizer, converting local regional strengths into global premium brands, while securing structural prosperity for our farmer bases.",
       80,
       180,
       { width: 440, lineGap: 4.5, align: "justify" }
     );

  // Pillars of Vision
  let pyVision = 320;
  visionPillars.forEach(p => {
    doc.rect(40, pyVision, 515, 80).fill(COLOR_BG_LIGHT);
    doc.fontSize(22).text(p.icon, 60, pyVision + 22);
    doc.fillColor(COLOR_PRIMARY).fontSize(11.5).font("Helvetica-Bold").text(p.title, 100, pyVision + 15);
    doc.fillColor(COLOR_TEXT).fontSize(9).font("Helvetica").text(p.desc, 100, pyVision + 32, { width: 430, lineGap: 2 });
    pyVision += 95; // Tighter increment
  });


  // ==========================================
  // PAGE 7: COMPANY MISSION
  // ==========================================
  doc.addPage();
  registerPage("Company Mission", doc);
  drawSectionHeader(doc, "CORPORATE MISSION & CORE FOCUS", "06");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10)
     .font("Helvetica")
     .text("Our operational mission is broken down into five core measurable targets designed to guide daily plant behavior and long-term marketing decisions:", 40, 140, { width: 515 });

  let my = 180;
  missions.forEach(m => {
    doc.rect(40, my, 515, 80).fill(COLOR_BG_LIGHT);
    doc.rect(40, my, 30, 80).fill(COLOR_PRIMARY);
    
    doc.fillColor(COLOR_SECONDARY).fontSize(12).font("Helvetica-Bold").text(m.num, 47, my + 32);
    doc.fillColor(COLOR_PRIMARY).fontSize(10.5).font("Helvetica-Bold").text(m.title, 85, my + 10);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(m.desc, 85, my + 26, { width: 450, lineGap: 2, align: "justify" });
    
    my += 90; // Tighter increment
  });


  // ==========================================
  // PAGE 8: CORE VALUES
  // ==========================================
  doc.addPage();
  registerPage("Core Values", doc);
  drawSectionHeader(doc, "OUR CORE VALUES & BELIEFS", "07");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10)
     .font("Helvetica")
     .text("At SFPPL, we measure our success not just by the margins we post, but by how we treat our farmers, our team, and our customers. We live by these eight core operational values:", 40, 140, { width: 515 });

  let vx = 40;
  let vy = 185;
  coreValues.forEach((val, idx) => {
    doc.rect(vx, vy, 245, 95).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10).font("Helvetica-Bold").text(val.title, vx + 15, vy + 10);
    doc.fillColor(COLOR_TEXT).fontSize(8).font("Helvetica").text(val.desc, vx + 15, vy + 26, { width: 215, lineGap: 2 });
    
    if (idx % 2 === 0) {
      vx += 270;
    } else {
      vx = 40;
      vy += 105; // safe tighter spacing
    }
  });


  // ==========================================
  // PAGE 9: BOARD OF DIRECTORS
  // ==========================================
  doc.addPage();
  registerPage("Board of Directors", doc);
  drawSectionHeader(doc, "BOARD OF DIRECTORS & LEADERSHIP", "08");

  doc.fillColor(COLOR_TEXT)
     .fontSize(9.5)
     .font("Helvetica")
     .text("SFPPL's strategic direction is managed by experienced leaders dedicated to quality, infrastructure and growth.", 40, 140);

  // Director 1 (Bigger photo)
  doc.rect(40, 160, 245, 480).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(1).stroke();
  drawImageCard(doc, director1Path, 52, 175, 221, 210, 4);
  doc.fillColor(COLOR_PRIMARY).fontSize(12).font("Helvetica-Bold").text("IRSHAD ALAM", 55, 400, { align: "center", width: 215 });
  doc.fillColor(COLOR_ACCENT).fontSize(8.5).font("Helvetica-Bold").text("Managing Director", 55, 415, { align: "center", width: 215 });
  doc.fillColor(COLOR_TEXT)
     .fontSize(8.5)
     .font("Helvetica")
     .text(
       "Mr. Irshad Alam is the visionary behind SFPPL, establishing the company in 2012. With over 15 years of experience in food processing infrastructure, machinery sourcing, and cold chain setup, he oversees all factory development, raw procurement policies, and technology upgrades in Muzaffarpur. His commitment to farmer integration has driven SFPPL's direct contract procurement programs.",
       55,
       435,
       { width: 215, lineGap: 3.5, align: "justify" }
     );

  // Director 2 (Bigger photo)
  doc.rect(310, 160, 245, 480).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(1).stroke();
  drawImageCard(doc, director2Path, 322, 175, 221, 210, 4);
  doc.fillColor(COLOR_PRIMARY).fontSize(12).font("Helvetica-Bold").text("ZINAT JAHAN", 325, 400, { align: "center", width: 215 });
  doc.fillColor(COLOR_ACCENT).fontSize(8.5).font("Helvetica-Bold").text("Director & CFO", 325, 415, { align: "center", width: 215 });
  doc.fillColor(COLOR_TEXT)
     .fontSize(8.5)
     .font("Helvetica")
     .text(
       "Mrs. Zinat Jahan co-leads SFPPL with a strong background in corporate finance, resource allocation, and quality compliance. She manages SFPPL's commercial operations, auditor relations, sales distributions, and export negotiations. Under her leadership, the company established digital sales platforms and obtained central FSSAI and ISO 22000 quality systems standards.",
       325,
       435,
       { width: 215, lineGap: 3.5, align: "justify" }
     );


  // ==========================================
  // PAGE 10: ORGANIZATION STRUCTURE
  // ==========================================
  doc.addPage();
  registerPage("Organization Structure", doc);
  drawSectionHeader(doc, "ORGANIZATION STRUCTURE", "09");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10)
     .font("Helvetica")
     .text("SFPPL operates under a structured corporate governance layout to ensure complete accountability, prompt processing, and strict quality control at every phase:", 40, 140, { width: 515 });

  // Hierarchy chart boxes
  drawOrgBox(doc, "BOARD OF DIRECTORS\nStrategic Guidance & Governance", 200, 175, 195, 40, true);
  drawDownArrow(doc, 297, 215, 20);
  drawOrgBox(doc, "MANAGING DIRECTOR\n(Irshad Alam) — Operational Control", 200, 235, 195, 40, true);
  drawDownArrow(doc, 297, 275, 20);

  // Mid line horizontal
  doc.moveTo(70, 295).lineTo(525, 295).lineWidth(2).strokeColor(COLOR_PRIMARY).stroke();

  const divs = [
    { name: "OPERATIONS\nTEAM", role: "Plant Mgmt", x: 40 },
    { name: "PRODUCTION\nTEAM", role: "Milling", x: 110 },
    { name: "QUALITY ASSUR.\nTEAM", role: "Lab Test", x: 180 },
    { name: "SALES & TRADE\nTEAM", role: "Sales", x: 250 },
    { name: "HR & ADMIN\nTEAM", role: "Personnel", x: 320 },
    { name: "FINANCE\nTEAM", role: "Finance", x: 390 },
    { name: "LOGISTICS\nTEAM", role: "Cold Chain", x: 460 }
  ];

  divs.forEach(d => {
    doc.moveTo(d.x + 32, 295).lineTo(d.x + 32, 320).lineWidth(1.5).strokeColor(COLOR_PRIMARY).stroke();
    drawOrgBox(doc, `${d.name}\n(${d.role})`, d.x, 320, 65, 75, false);
  });

  // Roles detailed list at bottom
  doc.rect(40, 420, 515, 140).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(10.5).font("Helvetica-Bold").text("Functional Commitments:", 60, 435);

  let fyFunc = 460;
  funcPoints.forEach(p => {
    doc.circle(65, fyFunc + 4, 2.5).fill(COLOR_ACCENT);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(p, 75, fyFunc, { width: 450 });
    fyFunc += 22;
  });


  // ==========================================
  // PAGE 11: MANUFACTURING FACILITY
  // ==========================================
  doc.addPage();
  registerPage("Manufacturing Facility", doc);
  drawSectionHeader(doc, "MUZAFFARPUR FACTORY INFRASTRUCTURE", "10");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10)
     .font("Helvetica")
     .text(
       "SFPPL operates a state-of-the-art agricultural and fruit processing plant spanning 25,000 square feet in Katara, Muzaffarpur. Located directly in the crop zone, the facility reduces transport delay from harvest to processing down to under 4 hours, ensuring extreme freshness retention.",
       40,
       140,
       { width: 515, lineGap: 3.5, align: "justify" }
     );

  // Infrastructure Specifications Box (2 Columns)
  doc.rect(40, 195, 245, 160).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(1).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(11).font("Helvetica-Bold").text("Infrastructure Metrics", 55, 208);
  iy = 230;
  infraMetrics.forEach(m => {
    doc.circle(60, iy + 4, 2.5).fill(COLOR_ACCENT);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(m, 68, iy);
    iy += 17;
  });

  doc.rect(310, 195, 245, 160).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(1).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(11).font("Helvetica-Bold").text("Machinery Profile", 325, 208);
  iy = 230;
  machineMetrics.forEach(m => {
    doc.circle(330, iy + 4, 2.5).fill(COLOR_ACCENT);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(m, 338, iy);
    iy += 17;
  });

  // Stretched elements (Reduced blank space)
  drawImageCard(doc, factoryImgPath, 40, 375, 245, 200, 6); // Image height: 200

  // Storage details right column
  doc.fillColor(COLOR_PRIMARY).fontSize(11.5).font("Helvetica-Bold").text("Warehouse Climate Zones", 310, 375);
  doc.fillColor(COLOR_TEXT)
     .fontSize(8.5)
     .font("Helvetica")
     .text(
       "• Zone A (Dry Warehouse): Dedicated to processed Makhana in moisture-proof, humidity-controlled spaces. Retains crispness.\n\n" +
       "• Zone B (Cold Storage Rooms): Kept at 2°C to 4°C with controlled relative humidity. Retains fresh sweet aroma of Shahi Litchis.\n\n" +
       "• Zone C (Deep Freeze Containment): Maintained at -18°C. Dedicated to processed freshwater fish fillets.\n\n" +
       "• Zone D (Packaging Cell): Class 100,000 clean air positive pressure zone for packaging lines.",
       310,
       395,
       { width: 245, lineGap: 3.5, align: "justify" }
     );

  // Draw factory block schematic
  doc.rect(40, 595, 515, 60).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text("FLOW SCHEMATIC OF MUZAFFARPUR PROCESSING PLANT", 50, 605);
  doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica")
     .text("Raw Crop Inflow ➔ Washing/De-hulling ➔ Multi-stage Grading ➔ Optical Sieve Sorter ➔ Nitrogen Flush Sealing ➔ Chilled Outflow", 50, 626, { width: 495 });


  // ==========================================
  // PAGE 12: PRODUCT CATEGORIES OVERVIEW
  // ==========================================
  doc.addPage();
  registerPage("Product Categories", doc);
  drawSectionHeader(doc, "PRODUCT CATEGORIES OVERVIEW", "11");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "SFPPL specializes in three core premium domains native to the Bihar region. By concentrating strictly on these select categories, we maintain deep expertise and market leadership in product quality.",
       40,
       140,
       { width: 515, lineGap: 4 }
     );

  let cyCat = 180;
  catCards.forEach(c => {
    doc.rect(40, cyCat, 515, 125).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(1).stroke();
    
    doc.fillColor(COLOR_PRIMARY).fontSize(26).text(c.img, 60, cyCat + 40);
    doc.fillColor(COLOR_PRIMARY).fontSize(13.5).font("Helvetica-Bold").text(c.title, 105, cyCat + 16);
    doc.fillColor(COLOR_TEXT).fontSize(9).font("Helvetica").text(c.desc, 105, cyCat + 36, { width: 430, lineGap: 2.5, align: "justify" });
    doc.fillColor(COLOR_ACCENT).fontSize(8.5).font("Helvetica-Bold").text(c.sub, 105, cyCat + 88, { width: 430 });
    
    cyCat += 135;
  });


  // ==========================================
  // PAGE 13: PRODUCT PORTFOLIO - SHAHI LITCHIS
  // ==========================================
  doc.addPage();
  registerPage("Litchi Products Portfolio", doc);
  drawSectionHeader(doc, "PORTFOLIO: PREMIUM SHAHI LITCHIS", "12");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text("SFPPL processes Muzaffarpur's GI-tagged Shahi Litchis into consumer and industrial formats:", 50, 140);

  // Layout with STRETCHED images (h: 420)
  let lyLitchi = 170;
  litchiProducts.forEach(lp => {
    doc.rect(40, lyLitchi, 265, 130).fill(COLOR_BG_LIGHT);
    doc.rect(40, lyLitchi, 4, 130).fill(COLOR_ACCENT);
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10.5).font("Helvetica-Bold").text(lp.name, 55, lyLitchi + 14);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(lp.desc, 55, lyLitchi + 32, { width: 240, lineGap: 2.5, align: "justify" });
    doc.fillColor(COLOR_MUTED).fontSize(7.5).font("Helvetica-Oblique").text(lp.spec, 55, lyLitchi + 98);
    
    lyLitchi += 135; // safe layout spacing
  });

  drawImageCard(doc, litchiImgPath, 325, 170, 230, 395, 8); // Tall visual block

  // Nutrition table
  doc.rect(40, 580, 515, 55).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text("Average Nutritional Value (per 100g Fresh Shahi Litchi Pulp):", 55, 590);
  doc.fillColor(COLOR_TEXT).fontSize(8).font("Helvetica")
     .text("Energy: 66 kcal  |  Carbohydrates: 16.5g  |  Dietary Fiber: 1.3g  |  Vitamin C: 71.5 mg (119% DV)  |  Potassium: 171 mg", 55, 608);


  // ==========================================
  // PAGE 14: PRODUCT PORTFOLIO - ORGANIC MAKHANA
  // ==========================================
  doc.addPage();
  registerPage("Makhana Products Portfolio", doc);
  drawSectionHeader(doc, "PORTFOLIO: PREMIUM ORGANIC MAKHANA", "13");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text("Our Makhanas are sourced directly from wetlands, sorted by diameter, roasted and popped cleanly:", 50, 140);

  let myMakhana = 170;
  makhanaProducts.forEach(mp => {
    doc.rect(40, myMakhana, 265, 130).fill(COLOR_BG_LIGHT);
    doc.rect(40, myMakhana, 4, 130).fill(COLOR_ACCENT);
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10.5).font("Helvetica-Bold").text(mp.name, 55, myMakhana + 14);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(mp.desc, 55, myMakhana + 32, { width: 240, lineGap: 2.5, align: "justify" });
    doc.fillColor(COLOR_MUTED).fontSize(7.5).font("Helvetica-Oblique").text(mp.spec, 55, myMakhana + 98);
    
    myMakhana += 135;
  });

  drawImageCard(doc, makhanaImgPath, 325, 170, 230, 395, 8);

  doc.rect(40, 580, 515, 55).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text("Average Nutritional Value (per 100g Grade-A Popped Makhana):", 55, 590);
  doc.fillColor(COLOR_TEXT).fontSize(8).font("Helvetica")
     .text("Energy: 347 kcal  |  Protein: 9.7g (High Bio-availability)  |  Carbohydrates: 77g  |  Calcium: 60 mg  |  Iron: 1.4 mg  |  Fat: 0.1g", 55, 608);


  // ==========================================
  // PAGE 15: PRODUCT PORTFOLIO - FRESHWATER FISH
  // ==========================================
  doc.addPage();
  registerPage("Fish Products Portfolio", doc);
  drawSectionHeader(doc, "PORTFOLIO: AQUACULTURE FRESH FISH", "14");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text("Sourced daily from our bio-floc aquaculture ponds and packed in crushed clean ice within 2 hours of harvest:", 50, 140);

  let fyFish = 170;
  fishProducts.forEach(fp => {
    doc.rect(40, fyFish, 265, 130).fill(COLOR_BG_LIGHT);
    doc.rect(40, fyFish, 4, 130).fill(COLOR_ACCENT);
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10.5).font("Helvetica-Bold").text(fp.name, 55, fyFish + 14);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(fp.desc, 55, fyFish + 32, { width: 240, lineGap: 2.5, align: "justify" });
    doc.fillColor(COLOR_MUTED).fontSize(7.5).font("Helvetica-Oblique").text(fp.spec, 55, fyFish + 98);
    
    fyFish += 135;
  });

  drawImageCard(doc, fishImgPath, 325, 170, 230, 395, 8);

  doc.rect(40, 580, 515, 55).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text("Average Nutritional Value (per 100g Fresh Rohu Fillet):", 55, 590);
  doc.fillColor(COLOR_TEXT).fontSize(8).font("Helvetica")
     .text("Energy: 97 kcal  |  Protein: 19.7g  |  Fat: 1.4g (Rich in Omega-3 Fatty Acids)  |  Phosphorus: 210 mg  |  Sodium: 60 mg", 55, 608);


  // ==========================================
  // PAGE 16: PRODUCT SPECIFICATION TABLES
  // ==========================================
  doc.addPage();
  registerPage("Product Specifications", doc);
  drawSectionHeader(doc, "PRODUCT COMPARISON & SPECIFICATIONS", "15");

  doc.fillColor(COLOR_TEXT)
     .fontSize(9.5)
     .font("Helvetica")
     .text("Below is a master matrix showing shipping weights, packaging configurations, moisture limits and target export destinations.", 40, 135);

  drawTable(doc, specHeaders, specRows, 40, 160, [120, 120, 75, 100, 100], 25);

  // Regulatory note
  doc.rect(40, 420, 515, 110).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text("Important Operational Notes for Wholesalers & Distributors:", 55, 435);
  doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(
    "1. Cold Chain Compliance: Chilled products (fresh litchi & fish) require constant temperature logs between 0°C and 4°C. Delivery vehicles without refrigerated systems will be rejected at the buyer gates.\n" +
    "2. Makhana Storage: Popped Makhanas are highly hygroscopic (absorb moisture). Store off the ground away from walls in dry warehouses with less than 60% ambient humidity.\n" +
    "3. Customized Co-packing: SFPPL provides white-label (private brand) packaging for bulk retail chains. Minimum order volumes (MOVs) apply for custom gravure film printing.",
    55,
    455,
    { width: 485, lineGap: 3.5 }
  );


  // ==========================================
  // PAGE 17: QUALITY CONTROL
  // ==========================================
  doc.addPage();
  registerPage("Quality Control Protocols", doc);
  drawSectionHeader(doc, "QUALITY CONTROL & TESTING", "16");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "At SFPPL, quality control is a structured process implemented at every stage of the manufacturing timeline. We enforce a zero-human-contact process to avoid bacteriological contamination.",
       40,
       140,
       { width: 515, lineGap: 4.5, align: "justify" }
     );

  let yq = 185;
  qcSteps.forEach(qs => {
    doc.rect(40, yq, 515, 60).fill(COLOR_BG_LIGHT);
    doc.rect(40, yq, 10, 60).fill(COLOR_PRIMARY);
    
    doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text(qs.step, 65, yq + 10);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(qs.desc, 65, yq + 25, { width: 470, lineGap: 2 });
    
    yq += 65; // Tighter vertical increment
  });


  // ==========================================
  // PAGE 18: CERTIFICATIONS
  // ==========================================
  doc.addPage();
  registerPage("Certifications", doc);
  drawSectionHeader(doc, "CERTIFICATIONS & COMPLIANCE", "17");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text("SFPPL operations are certified under standard food safety frameworks, making our products eligible for corporate retailers and export markets:", 40, 140);

  let cyCert = 175;
  certs.forEach(c => {
    doc.rect(40, cyCert, 515, 90).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    // Icon box
    doc.rect(55, cyCert + 12, 45, 45).fill(COLOR_PRIMARY);
    doc.fillColor(COLOR_SECONDARY).fontSize(13).font("Helvetica-Bold").text("OK", 55, cyCert + 27, { width: 45, align: "center" });
    
    doc.fillColor(COLOR_PRIMARY).fontSize(11).font("Helvetica-Bold").text(c.title, 115, cyCert + 12);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(c.desc, 115, cyCert + 30, { width: 410, lineGap: 2.5 });
    doc.fillColor(COLOR_ACCENT).fontSize(8).font("Helvetica-Bold").text(`Issuing Authority: ${c.authority}`, 115, cyCert + 68);
    
    cyCert += 100; // Tighter vertical increment
  });


  // ==========================================
  // PAGE 19: RESEARCH & DEVELOPMENT
  // ==========================================
  doc.addPage();
  registerPage("Research & Development", doc);
  drawSectionHeader(doc, "RESEARCH, DEVELOPMENT & PACKAGING", "18");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "SFPPL invests 3.5% of its annual revenue in product research, packaging testing, and shelf-life optimization. Our R&D division works closely with regional agriculture institutes to improve crop preservation.",
       40,
       140,
       { width: 515, lineGap: 4, align: "justify" }
     );

  // Two column layout
  doc.rect(40, 185, 245, 190).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(1).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(11).font("Helvetica-Bold").text("Innovation Focus Areas", 55, 198);
  rdy = 225;
  rdFocus.forEach(f => {
    doc.circle(60, rdy + 4, 2).fill(COLOR_ACCENT);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(f, 68, rdy, { width: 205, lineGap: 2.5 });
    rdy += 36;
  });

  doc.rect(310, 185, 245, 190).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(1).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(11).font("Helvetica-Bold").text("Recent Tech Adoptions", 325, 198);
  rdy = 225;
  rdTech.forEach(t => {
    doc.circle(330, rdy + 4, 2).fill(COLOR_ACCENT);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(t, 338, rdy, { width: 205, lineGap: 2.5 });
    rdy += 36;
  });

  // Future product launches section
  doc.fillColor(COLOR_PRIMARY).fontSize(12).font("Helvetica-Bold").text("Product Roadmap (2026-2027)", 40, 395);
  doc.fillColor(COLOR_TEXT)
     .fontSize(9)
     .font("Helvetica")
     .text(
       "1. Flavored Makhana Sticks: Low calorie, high fiber snacks made from ground Makhana and organic starch.\n" +
       "2. Litchi Honey: Pure honey harvested from bee boxes kept directly in our organic litchi orchards during flowering season.\n" +
       "3. Ready-to-Cook Fish Fillets: Frozen Rohu and Katla fillets, marinated in regional spices, packed in vacuum skin packs for retail grids.",
       40,
       412,
       { width: 515, lineGap: 4, align: "justify" }
     );

  // Corporate image block (much larger height: 180)
  drawImageCard(doc, corpImgPath, 40, 490, 515, 175, 6);


  // ==========================================
  // PAGE 20: SUPPLY CHAIN NETWORK
  // ==========================================
  doc.addPage();
  registerPage("Supply Chain Network", doc);
  drawSectionHeader(doc, "SUPPLY CHAIN & COLD LOGISTICS", "19");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "We operate an integrated supply chain that links primary growers in Bihar directly with urban markets. This model ensures farm-gate traceability and stable supply schedules.",
       40,
       140,
       { width: 515, lineGap: 4, align: "justify" }
     );

  let cyChain = 180;
  stepsChain.forEach((sc, idx) => {
    doc.rect(40, cyChain, 515, 62).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    doc.rect(50, cyChain + 10, 25, 42).fill(COLOR_PRIMARY);
    doc.fillColor(COLOR_SECONDARY).fontSize(12).font("Helvetica-Bold").text((idx + 1).toString(), 50, cyChain + 23, { width: 25, align: "center" });
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10.5).font("Helvetica-Bold").text(sc.title, 90, cyChain + 10);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(sc.desc, 90, cyChain + 25, { width: 445, lineGap: 2 });
    
    if (idx < 4) {
      doc.moveTo(297, cyChain + 62).lineTo(297, cyChain + 72).lineWidth(1).strokeColor(COLOR_ACCENT).stroke();
    }
    cyChain += 72; // Tighter vertical increment
  });


  // ==========================================
  // PAGE 21: MARKET PRESENCE
  // ==========================================
  doc.addPage();
  registerPage("Market Presence", doc);
  drawSectionHeader(doc, "MARKET PRESENCE & EXPANSION", "20");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "SFPPL has built a strong market presence across Eastern and Northern India, and is expanding into international export territories. Our regional distribution network connects over 300 active distributors.",
       40,
       140,
       { width: 515, lineGap: 4, align: "justify" }
     );

  // Regions served
  doc.fillColor(COLOR_PRIMARY).fontSize(12).font("Helvetica-Bold").text("Domestic States & Territories Served", 50, 190);
  let ryPres = 210;
  regions.forEach(r => {
    doc.rect(40, ryPres, 515, 45).fill(COLOR_BG_LIGHT);
    doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text(r.state, 55, ryPres + 8);
    doc.fillColor(COLOR_TEXT).fontSize(8).font("Helvetica").text(r.focus, 55, ryPres + 21, { width: 485 });
    ryPres += 53; // Tighter vertical increment
  });

  // Export Markets
  doc.fillColor(COLOR_PRIMARY).fontSize(12).font("Helvetica-Bold").text("Export Growth Markets", 50, 440);
  doc.fillColor(COLOR_TEXT)
     .fontSize(9.5)
     .font("Helvetica")
     .text(
       "• Nepal: Direct overland exports of processed litchi pulp and plain makhana bags via border customs.\n" +
       "• UAE & Gulf Countries: Air shipping fresh Shahi Litchis in cold crates during seasonal windows. Regular exports of roasted makhana snack packs.\n" +
       "• USA & European Union (Planned 2026-27): Developing agreements with health snack distributors for organic popped makhana shipments.",
       40,
       460,
       { width: 515, lineGap: 4, align: "justify" }
     );

  // Simple market share chart representation (drawn vector bar)
  doc.rect(40, 560, 515, 55).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(9).font("Helvetica-Bold").text("SALES DISTRIBUTION SHARES BY REGION (EST. 2025)", 55, 570);
  doc.rect(55, 586, 230, 12).fill(COLOR_PRIMARY); // 50% Bihar/East
  doc.rect(285, 586, 140, 12).fill(COLOR_ACCENT); // 30% North/Delhi
  doc.rect(425, 586, 45, 12).fill(COLOR_MUTED);   // 10% South/West
  doc.rect(470, 586, 45, 12).fill(COLOR_TEXT);    // 10% Export
  doc.fillColor(COLOR_TEXT).fontSize(7.5).font("Helvetica").text("East (50%) | North (30%) | Other (10%) | Export (10%)", 55, 602);


  // ==========================================
  // PAGE 22: CSR ACTIVITIES
  // ==========================================
  doc.addPage();
  registerPage("CSR Activities", doc);
  drawSectionHeader(doc, "CSR & RURAL DEVELOPMENT", "21");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "As a company rooted in Muzaffarpur's agricultural landscape, corporate social responsibility is part of our business model. We run initiatives to improve livelihoods and support communities across Bihar.",
       40,
       140,
       { width: 515, lineGap: 4, align: "justify" }
     );

  let cyCsr = 180;
  csrPrograms.forEach(csr => {
    doc.rect(40, cyCsr, 515, 95).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10).font("Helvetica-Bold").text(csr.title, 55, cyCsr + 12);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(csr.desc, 55, cyCsr + 26, { width: 485, lineGap: 2.5, align: "justify" });
    doc.fillColor(COLOR_ACCENT).fontSize(8).font("Helvetica-Bold").text(csr.impact, 55, cyCsr + 74);
    
    cyCsr += 105; // Tighter vertical increment
  });


  // ==========================================
  // PAGE 23: SUSTAINABILITY
  // ==========================================
  doc.addPage();
  registerPage("Sustainability", doc);
  drawSectionHeader(doc, "SUSTAINABILITY & ECO-OPERATIONS", "22");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "SFPPL is committed to clean, eco-friendly processing. We aim to reach net-zero carbon operations by 2030 by reducing waste and using renewable energy.",
       40,
       140,
       { width: 515, lineGap: 4, align: "justify" }
     );

  let cySus = 180;
  sustainPillars.forEach(p => {
    doc.rect(40, cySus, 515, 95).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10).font("Helvetica-Bold").text(p.title, 55, cySus + 12);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(p.desc, 55, cySus + 26, { width: 485, lineGap: 2.5, align: "justify" });
    doc.fillColor(COLOR_ACCENT).fontSize(8).font("Helvetica-Bold").text(p.saving, 55, cySus + 74);
    
    cySus += 105; // Tighter vertical increment
  });


  // ==========================================
  // PAGE 24: ACHIEVEMENTS & AWARDS
  // ==========================================
  doc.addPage();
  registerPage("Achievements", doc);
  drawSectionHeader(doc, "CORPORATE ACHIEVEMENTS & AWARDS", "23");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text("Over the past decade, SFPPL has received several industry awards, government commendations, and performance milestones:", 40, 140);

  let cyAward = 175;
  awards.forEach(aw => {
    doc.rect(40, cyAward, 515, 90).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    // Year banner
    doc.rect(55, cyAward + 10, 40, 22).fill(COLOR_PRIMARY);
    doc.fillColor(COLOR_SECONDARY).fontSize(9).font("Helvetica-Bold").text(aw.year, 55, cyAward + 17, { width: 40, align: "center" });
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10).font("Helvetica-Bold").text(aw.name, 110, cyAward + 10);
    doc.fillColor(COLOR_ACCENT).fontSize(8).font("Helvetica-Bold").text(`Conferred by: ${aw.by}`, 110, cyAward + 24);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(aw.desc, 110, cyAward + 38, { width: 395, lineGap: 2, align: "justify" });
    
    cyAward += 105; // Tighter vertical increment
  });

  // Growth metric chart representation
  doc.rect(40, 610, 515, 50).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text("CAGR Growth Metric: 18.2% Revenue Growth Over Last 5 Years (2020-2025)", 55, 620);
  doc.fillColor(COLOR_TEXT).fontSize(8).font("Helvetica").text("Steady capital investment, technology upgrades, and customer growth drive our financial success.", 55, 636);


  // ==========================================
  // PAGE 25: CLIENTS & PARTNERS
  // ==========================================
  doc.addPage();
  registerPage("Clients & Partners", doc);
  drawSectionHeader(doc, "MAJOR CLIENTS & BUSINESS PARTNERS", "24");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "SFPPL works with retail chains, food manufacturers, export brokers, and regional distributors. We build long-term relationships based on consistent quality and delivery schedules.",
       40,
       140,
       { width: 515, lineGap: 4, align: "justify" }
     );

  let cyPart = 180;
  partnerSegments.forEach(p => {
    doc.rect(40, cyPart, 515, 95).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10.5).font("Helvetica-Bold").text(p.title, 55, cyPart + 12);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(p.desc, 55, cyPart + 28, { width: 485, lineGap: 2.5, align: "justify" });
    doc.fillColor(COLOR_ACCENT).fontSize(8).font("Helvetica-Bold").text(p.clients, 55, cyPart + 74);
    
    cyPart += 108; // Tighter vertical increment
  });


  // ==========================================
  // PAGE 26: WHY CHOOSE US
  // ==========================================
  doc.addPage();
  registerPage("Why Choose Us", doc);
  drawSectionHeader(doc, "WHY PARTNER WITH SFPPL", "25");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text("SFPPL is a preferred partner for retail chains, distributors, and exporters looking to secure premium crops:", 40, 140);

  let sx = 40;
  let sy = 175;
  strengths.forEach((st, idx) => {
    doc.rect(sx, sy, 245, 125).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10.5).font("Helvetica-Bold").text(st.title, sx + 15, sy + 15, { width: 215 });
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(st.desc, sx + 15, sy + 45, { width: 215, lineGap: 2.5, align: "justify" });
    
    if (idx % 2 === 0) {
      sx += 270;
    } else {
      sx = 40;
      sy += 135; // safe tighter spacing
    }
  });


  // ==========================================
  // PAGE 27: TESTIMONIALS
  // ==========================================
  doc.addPage();
  registerPage("Testimonials", doc);
  drawSectionHeader(doc, "TESTIMONIALS & FEEDBACK", "26");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text("Here is feedback from our distribution leads, catering clients, and international export partners:", 40, 140);

  let cyTest = 175;
  testimonials.forEach(t => {
    doc.rect(40, cyTest, 515, 120).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    doc.fillColor(COLOR_TEXT)
       .fontSize(9.5)
       .font("Helvetica-Oblique")
       .text(t.quote, 55, cyTest + 18, { width: 485, lineGap: 3.5, align: "justify" });
       
    doc.fillColor(COLOR_PRIMARY)
       .fontSize(9.5)
       .font("Helvetica-Bold")
       .text(t.author, 55, cyTest + 84);
       
    doc.fillColor(COLOR_ACCENT)
       .fontSize(8)
       .font("Helvetica-Bold")
       .text(t.role, 55, cyTest + 99);
       
    cyTest += 135; // Tighter vertical increment
  });


  // ==========================================
  // PAGE 28: FUTURE ROADMAP
  // ==========================================
  doc.addPage();
  registerPage("Future Roadmap", doc);
  drawSectionHeader(doc, "FUTURE EXPANSION ROADMAP (2030)", "27");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "SFPPL is prepared for its next phase of growth. We are investing in plant automation, expanding our aquaculture ponds, and launching exports to USA and UK markets.",
       40,
       140,
       { width: 515, lineGap: 4, align: "justify" }
     );

  let cyRoad = 180;
  roadmapSteps.forEach(rs => {
    doc.rect(40, cyRoad, 515, 110).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    doc.rect(40, cyRoad, 515, 25).fill(COLOR_PRIMARY);
    
    doc.fillColor(COLOR_SECONDARY).fontSize(10).font("Helvetica-Bold").text(rs.phase, 55, cyRoad + 8);
    
    let gy = cyRoad + 36;
    rs.goals.forEach(g => {
      doc.circle(65, gy + 4, 2.5).fill(COLOR_ACCENT);
      doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(g, 75, gy, { width: 460 });
      gy += 20;
    });
    
    cyRoad += 125; // Tighter vertical increment
  });


  // ==========================================
  // PAGE 29: CAREER OPPORTUNITIES
  // ==========================================
  doc.addPage();
  registerPage("Careers at SFPPL", doc);
  drawSectionHeader(doc, "CAREER OPPORTUNITIES & WORKPLACE", "28");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text(
       "At SFPPL, we build a progressive, safe, and learning-focused workplace. We offer job opportunities in food technology, supply chain management, sales operations, and warehouse administration.",
       40,
       140,
       { width: 515, lineGap: 4, align: "justify" }
     );

  let cyBen = 185;
  benefits.forEach(b => {
    doc.rect(40, cyBen, 515, 62).fill(COLOR_BG_LIGHT);
    doc.rect(40, cyBen, 3, 62).fill(COLOR_PRIMARY);
    
    doc.fillColor(COLOR_PRIMARY).fontSize(10.5).font("Helvetica-Bold").text(b.title, 55, cyBen + 10);
    doc.fillColor(COLOR_TEXT).fontSize(8.5).font("Helvetica").text(b.desc, 55, cyBen + 25, { width: 485, lineGap: 2.5 });
    
    cyBen += 72; // Tighter vertical increment
  });

  // Hiring process block
  doc.rect(40, 485, 515, 90).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(11).font("Helvetica-Bold").text("Our Hiring Process:", 60, 497);
  doc.fillColor(COLOR_TEXT).fontSize(9).font("Helvetica").text(stepsHiring[0], 60, 520);
  doc.fillColor(COLOR_PRIMARY).fontSize(9).font("Helvetica-Bold").text(stepsHiring[1], 60, 543);


  // ==========================================
  // PAGE 30: CONTACT INFORMATION
  // ==========================================
  doc.addPage();
  registerPage("Contact Information", doc);
  drawSectionHeader(doc, "OFFICIAL CONTACT & INQUIRIES", "29");

  doc.fillColor(COLOR_TEXT)
     .fontSize(10.5)
     .font("Helvetica")
     .text("Please contact our sales or administration teams for inquiries, orders, or partner questions.", 40, 140);

  let cyCont = 165;
  contactOffices.forEach(off => {
    doc.rect(40, cyCont, 515, 95).fill(COLOR_BG_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
    
    doc.fillColor(COLOR_PRIMARY).fontSize(11).font("Helvetica-Bold").text(off.title, 60, cyCont + 12);
    doc.fillColor(COLOR_TEXT).fontSize(9).font("Helvetica").text(off.address, 60, cyCont + 28, { lineGap: 3 });
    doc.fillColor(COLOR_ACCENT).fontSize(8).font("Helvetica-Bold").text(`Inquiry Node: ${off.manager}`, 60, cyCont + 76);
    
    cyCont += 110;
  });

  // QR Code box (moved down and expanded to reduce empty footer space)
  doc.rect(40, 395, 515, 140).fill(COLOR_GREEN_LIGHT).strokeColor(COLOR_PRIMARY).lineWidth(0.5).stroke();
  doc.fillColor(COLOR_PRIMARY).fontSize(12).font("Helvetica-Bold").text("Digital Portals & QR Codes", 60, 410);
  doc.fillColor(COLOR_TEXT).fontSize(9.5).font("Helvetica").text(
    "Scan the QR code to visit our website, apply for a distributorship, view product catalogs, or submit career inquiries online.\n\n" +
    "Website: https://www.sfppl.com\n" +
    "WhatsApp Live Support: +91 99999 99999",
    60,
    430,
    { width: 330, lineGap: 3.5 }
  );

  // Right side: QR Code mock vector
  doc.rect(430, 415, 100, 100).fill(COLOR_PRIMARY);
  doc.rect(435, 420, 90, 90).fill(COLOR_SECONDARY);
  doc.rect(440, 425, 25, 25).fill(COLOR_PRIMARY);
  doc.rect(445, 430, 15, 15).fill(COLOR_SECONDARY);
  doc.rect(448, 433, 9, 9).fill(COLOR_PRIMARY);

  doc.rect(490, 425, 25, 25).fill(COLOR_PRIMARY);
  doc.rect(495, 430, 15, 15).fill(COLOR_SECONDARY);
  doc.rect(498, 433, 9, 9).fill(COLOR_PRIMARY);

  doc.rect(440, 475, 25, 25).fill(COLOR_PRIMARY);
  doc.rect(445, 480, 15, 15).fill(COLOR_SECONDARY);
  doc.rect(448, 483, 9, 9).fill(COLOR_PRIMARY);

  doc.rect(490, 475, 25, 25).fill(COLOR_PRIMARY);
  doc.rect(468, 430, 15, 10).fill(COLOR_PRIMARY);
  doc.rect(478, 450, 10, 20).fill(COLOR_PRIMARY);
  doc.rect(468, 475, 20, 10).fill(COLOR_PRIMARY);
  doc.rect(483, 465, 15, 15).fill(COLOR_PRIMARY);


  // ==========================================
  // PAGE 31: BACK COVER
  // ==========================================
  doc.addPage();
  registerPage("Back Cover", doc);
  doc.rect(0, 0, 595.28, 841.89).fill(COLOR_PRIMARY);

  doc.rect(20, 20, 555.28, 801.89).lineWidth(1.5).stroke(COLOR_ACCENT);
  doc.rect(25, 25, 545.28, 791.89).lineWidth(0.5).stroke(COLOR_ACCENT);

  doc.path("M 25,200 Q 150,250 300,150 T 570,200 L 570,25 L 25,25 Z")
    .fillOpacity(0.08)
    .fill(COLOR_SECONDARY)
    .fillOpacity(1);

  doc.fillColor(COLOR_SECONDARY)
     .fontSize(22)
     .font("Helvetica-Bold")
     .text("THANK YOU", 40, 280, { width: 515, align: "center", tracking: 3 });

  doc.fillColor(COLOR_ACCENT)
     .fontSize(11.5)
     .font("Helvetica-Bold")
     .text("For Partnering in Our Journey of Quality & Trust.", 40, 310, { width: 515, align: "center" });

  doc.moveTo(150, 340).lineTo(445, 340).lineWidth(1).strokeColor(COLOR_ACCENT).stroke();

  // Center logo
  if (fs.existsSync(logoPath)) {
    try {
      doc.image(logoPath, 247, 380, { width: 100 });
    } catch (e) {
      drawLogoFallbackCenter(doc, 247, 380);
    }
  } else {
    drawLogoFallbackCenter(doc, 247, 380);
  }

  doc.fillColor(COLOR_SECONDARY)
     .fontSize(11)
     .font("Helvetica-Bold")
     .text("SADAF FOOD PROCESSORS PRIVATE LIMITED", 40, 460, { width: 515, align: "center" });

  doc.fillColor(COLOR_ACCENT)
     .fontSize(9)
     .font("Helvetica-Oblique")
     .text("Purity. Quality. Sustainability. Since 2012.", 40, 478, { width: 515, align: "center" });

  // Contact info
  doc.fillColor(COLOR_SECONDARY).fontSize(8.5).font("Helvetica")
     .text("Registered Office: Berai Tola, Vill — Berai Khanapur, Katara, Muzaffarpur, Bihar — 843129", 50, 530, { width: 515, align: "center" })
     .text("Corporate Sales: Mourya Lok Complex, Block C, 3rd Floor, Fraser Road, Patna, Bihar — 800001", 50, 545, { width: 515, align: "center" })
     .text("Email: contact@sfppl.com | Website: www.sfppl.com", 50, 560, { width: 515, align: "center" });

  // Back cover QR code
  doc.rect(247, 600, 100, 100).fill(COLOR_SECONDARY);
  doc.rect(252, 605, 90, 90).fill(COLOR_SECONDARY);
  doc.rect(257, 610, 25, 25).fill(COLOR_PRIMARY);
  doc.rect(262, 615, 15, 15).fill(COLOR_SECONDARY);
  doc.rect(265, 618, 9, 9).fill(COLOR_PRIMARY);

  doc.rect(312, 610, 25, 25).fill(COLOR_PRIMARY);
  doc.rect(317, 615, 15, 15).fill(COLOR_SECONDARY);
  doc.rect(320, 618, 9, 9).fill(COLOR_PRIMARY);

  doc.rect(257, 665, 25, 25).fill(COLOR_PRIMARY);
  doc.rect(262, 670, 15, 15).fill(COLOR_SECONDARY);
  doc.rect(265, 673, 9, 9).fill(COLOR_PRIMARY);

  doc.rect(312, 665, 25, 25).fill(COLOR_PRIMARY);
  doc.rect(287, 615, 15, 10).fill(COLOR_PRIMARY);
  doc.rect(297, 635, 10, 20).fill(COLOR_PRIMARY);
  doc.rect(287, 665, 20, 10).fill(COLOR_PRIMARY);
  doc.rect(302, 655, 15, 15).fill(COLOR_PRIMARY);

  doc.fillColor(COLOR_ACCENT)
     .fontSize(8)
     .font("Helvetica-Bold")
     .text("SCAN QR CODE TO ACCESS WEBPAGE", 40, 715, { width: 515, align: "center" });


  // ==========================================
  // DYNAMIC HEADERS, FOOTERS & PAGE NUMBERS
  // ==========================================
  const pagesRange = doc.bufferedPageRange();

  for (let i = 0; i < pagesRange.count; i++) {
    doc.switchToPage(i);
    
    // Save original margins
    const oldBottomMargin = doc.page.margins.bottom;
    const oldTopMargin = doc.page.margins.top;
    
    // Shrink margins to prevent auto page breaks during drawing
    doc.page.margins.bottom = 5;
    doc.page.margins.top = 5;
    
    // Save current y coordinate
    const savedY = doc.y;
    
    // Skip Cover (page 0) and Back Cover (last page)
    if (i === 0 || i === pagesRange.count - 1) {
      doc.page.margins.bottom = oldBottomMargin;
      doc.page.margins.top = oldTopMargin;
      continue;
    }
    
    // Draw header line (shifted up)
    doc.moveTo(40, 36).lineTo(555, 36).lineWidth(0.5).strokeColor(COLOR_ACCENT).stroke();
    
    // Header text
    doc.fillColor(COLOR_PRIMARY).fontSize(7.5).font("Helvetica-Bold").text("SADAF FOOD PROCESSORS PRIVATE LIMITED (SFPPL)", 40, 24);
    
    // Section title
    const matchedSection = sectionTitles.find(sec => sec.page === i + 1) || { title: "Corporate Profile" };
    doc.fillColor(COLOR_MUTED).fontSize(7.5).font("Helvetica").text(matchedSection.title.toUpperCase(), 555 - doc.widthOfString(matchedSection.title.toUpperCase()), 24);
    
    // Draw footer line (shifted down)
    doc.moveTo(40, 802).lineTo(555, 802).lineWidth(0.5).strokeColor(COLOR_ACCENT).stroke();
    
    // Footer text
    doc.fillColor(COLOR_MUTED).fontSize(7.5).font("Helvetica").text("CONFIDENTIAL  |  STAKEHOLDER PROFILE  |  www.sfppl.com", 40, 809);
    
    // Page number
    const pgText = `Page ${i + 1} of ${pagesRange.count}`;
    doc.fillColor(COLOR_PRIMARY).fontSize(7.5).font("Helvetica-Bold").text(pgText, 555 - doc.widthOfString(pgText), 809);
    
    // Watermark
    doc.save();
    doc.fillColor(COLOR_PRIMARY).fillOpacity(0.012).fontSize(34).font("Helvetica-Bold");
    doc.translate(297, 420);
    doc.rotate(-45);
    doc.text("SFPPL CORPORATE PROFILE", -250, -10, { width: 500, align: "center" });
    doc.restore();
    
    // Restore original margins and y coordinate
    doc.page.margins.bottom = oldBottomMargin;
    doc.page.margins.top = oldTopMargin;
    doc.y = savedY;
  }

  // End and write file
  doc.end();

  stream.on("finish", () => {
    console.log("PDF successfully compiled and written to:", outputFilePath);
    duplicatePDFs();
  });
}

function duplicatePDFs() {
  const fileNames = [
    "product_catalog.pdf",
    "annual_report.pdf",
    "incorporation_certificate.pdf",
    "quality_standards.pdf",
    "investor_presentation.pdf"
  ];
  fileNames.forEach(fn => {
    const dest = path.join(__dirname, "../frontend/public/", fn);
    fs.copyFileSync(outputFilePath, dest);
    console.log(`[PDF] Duplicated to ${fn}`);
  });
  console.log("[PDF] All assets fully synced. Terminating compiler process.");
  process.exit(0);
}

// Fallback logo drawer
function drawLogoFallback(doc, x, y) {
  doc.circle(x + 20, y + 20, 20).fill(COLOR_ACCENT);
  doc.fillColor(COLOR_SECONDARY).fontSize(14).font("Helvetica-Bold").text("sfppl.", x + 6, y + 13);
}

function drawLogoFallbackCenter(doc, x, y) {
  doc.circle(x + 50, y + 20, 20).fill(COLOR_ACCENT);
  doc.fillColor(COLOR_SECONDARY).fontSize(14).font("Helvetica-Bold").text("sfppl.", x + 36, y + 13);
}

// Image Card Drawer with clean fallbacks
function drawImageCard(doc, imagePath, x, y, w, h, borderRadius = 6) {
  if (fs.existsSync(imagePath) && fs.statSync(imagePath).size > 1000) {
    try {
      doc.save();
      // Draw rounded corner clipping path
      doc.roundedRect(x, y, w, h, borderRadius).clip();
      // Draw image
      doc.image(imagePath, x, y, { fit: [w, h], align: "center", valign: "center" });
      doc.restore();
      // Draw border frame
      doc.roundedRect(x, y, w, h, borderRadius).lineWidth(1.5).strokeColor(COLOR_ACCENT).stroke();
      return true;
    } catch (e) {
      console.error(`Error drawing image ${imagePath}:`, e.message);
    }
  }
  // Draw fallback vector graphics box
  doc.save();
  doc.roundedRect(x, y, w, h, borderRadius).fill(COLOR_BG_LIGHT);
  doc.roundedRect(x, y, w, h, borderRadius).lineWidth(1.5).strokeColor(COLOR_PRIMARY).stroke();
  
  // Subtle decorative pattern lines
  doc.moveTo(x, y).lineTo(x + w, y + h).lineWidth(0.5).strokeColor("#E2E8F0").stroke();
  doc.moveTo(x + w, y).lineTo(x, y + h).lineWidth(0.5).strokeColor("#E2E8F0").stroke();
  
  doc.fillColor(COLOR_PRIMARY).fontSize(9.5).font("Helvetica-Bold").text("SFPPL QUALITY", x + 5, y + (h / 2) - 14, { width: w - 10, align: "center" });
  doc.fillColor(COLOR_MUTED).fontSize(7.5).font("Helvetica-Oblique").text("PREMIUM CROP STANDARDS", x + 5, y + (h / 2) + 4, { width: w - 10, align: "center" });
  doc.restore();
  return false;
}

// Section title block drawer
function drawSectionHeader(doc, title, sectionNumber) {
  doc.rect(40, 55, 515, 45).fill(COLOR_PRIMARY);
  doc.rect(40, 55, 5, 45).fill(COLOR_ACCENT);
  
  doc.rect(505, 55, 50, 45).fill(COLOR_ACCENT);
  doc.fillColor(COLOR_PRIMARY).fontSize(14).font("Helvetica-Bold").text(sectionNumber, 505, 71, { width: 50, align: "center" });
  
  doc.fillColor(COLOR_SECONDARY).fontSize(12).font("Helvetica-Bold").text(title, 60, 71);
}

// Table helper
function drawTable(doc, headers, rows, x, y, colWidths, rowHeight) {
  let curY = y;
  const tableWidth = colWidths.reduce((a, b) => a + b, 0);
  
  // Header row
  doc.rect(x, curY, tableWidth, rowHeight).fill(COLOR_PRIMARY);
  let curX = x;
  headers.forEach((h, idx) => {
    doc.fillColor(COLOR_SECONDARY).fontSize(8.5).font("Helvetica-Bold").text(h, curX + 8, curY + (rowHeight / 2) - 4, { width: colWidths[idx] - 16 });
    curX += colWidths[idx];
  });
  curY += rowHeight;
  
  // Data rows
  rows.forEach((row, rIdx) => {
    const bg = rIdx % 2 === 0 ? COLOR_BG_LIGHT : COLOR_SECONDARY;
    doc.rect(x, curY, tableWidth, rowHeight).fill(bg);
    
    let cx = x;
    row.forEach((cell, cIdx) => {
      doc.fillColor(COLOR_TEXT).fontSize(8).font(cIdx === 0 ? "Helvetica-Bold" : "Helvetica").text(cell, cx + 8, curY + (rowHeight / 2) - 4, { width: colWidths[cIdx] - 16, lineBreak: false });
      cx += colWidths[cIdx];
    });
    
    doc.moveTo(x, curY + rowHeight).lineTo(x + tableWidth, curY + rowHeight).lineWidth(0.5).strokeColor("#E2E8F0").stroke();
    curY += rowHeight;
  });
}

function drawOrgBox(doc, text, x, y, w, h, isHeader) {
  doc.rect(x, y, w, h).fill(isHeader ? COLOR_PRIMARY : COLOR_GREEN_LIGHT);
  doc.rect(x, y, w, h).strokeColor(COLOR_ACCENT).lineWidth(isHeader ? 1.5 : 1).stroke();
  
  doc.fillColor(isHeader ? COLOR_SECONDARY : COLOR_PRIMARY)
     .fontSize(isHeader ? 8.5 : 7)
     .font("Helvetica-Bold")
     .text(text, x + 3, y + (h / 2) - 12, { width: w - 6, align: "center", lineGap: 2.5 });
}

function drawDownArrow(doc, x, y, len) {
  doc.moveTo(x, y).lineTo(x, y + len).lineWidth(1.5).strokeColor(COLOR_ACCENT).stroke();
  doc.moveTo(x - 4, y + len - 4).lineTo(x, y + len).lineTo(x + 4, y + len - 4).stroke();
}

async function main() {
  console.log("[DOWNLOAD] Checking / downloading images for SFPPL brochure...");
  const downloadPromises = imagesToDownload.map(img => 
    downloadImage(img.url, path.join(tempDir, img.name))
  );
  await Promise.all(downloadPromises);
  console.log("[DOWNLOAD] Image downloads complete. Starting compile.");
  compilePDF();
}

main();
