import { citadelStatesData, type CitadelStateData } from "./citadel-states";
import { citadelTopicPages, citadelTopicsExtended, citadelTopicsBatch4, type CitadelTopicPage } from "./citadel-topics";

export { citadelStatesData, citadelTopicPages };
export type { CitadelStateData, CitadelTopicPage };

// ── FINRA DISTRICT PAGES ─────────────────────────────────────────────────
export interface FinraDistrictPage {
  slug: string;
  districtNum: string;
  name: string;
  states: string[];
  citadelContext: string;
}

export const finraDistrictPages: FinraDistrictPage[] = [
  {
    slug: "finra-district-1-citadel",
    districtNum: "1",
    name: "FINRA District 1 — Los Angeles / San Francisco",
    states: ["California", "Nevada", "Arizona"],
    citadelContext: "FINRA District 1 covers the largest concentration of retail investors in the western United States. California alone has an estimated 8 million retail trading accounts — all subject to PFOF arrangements with Citadel Securities. District 1's examination staff has jurisdiction over broker-dealers that route California, Nevada, and Arizona retail orders to Citadel.",
  },
  {
    slug: "finra-district-2-citadel",
    districtNum: "2",
    name: "FINRA District 2 — New York",
    states: ["New York", "New Jersey", "Connecticut"],
    citadelContext: "FINRA District 2 covers the heart of American finance. New York's Martin Act gives state regulators extraordinary enforcement tools, and the District 2 examination staff has primary oversight of broker-dealers operating in the tri-state financial hub. Citadel Securities' trading operations that affect New York, New Jersey, and Connecticut retail investors fall within this district's jurisdiction.",
  },
  {
    slug: "finra-district-3-citadel",
    districtNum: "3",
    name: "FINRA District 3 — Philadelphia",
    states: ["Pennsylvania", "Delaware", "Maryland", "Virginia", "Washington DC"],
    citadelContext: "FINRA District 3 covers the Mid-Atlantic region, including Delaware — the legal home of most Citadel Securities corporate entities. The District 3 examination staff has jurisdiction over broker-dealers serving the dense retail investor populations of Pennsylvania, Maryland, and the DC metro area.",
  },
  {
    slug: "finra-district-4-citadel",
    districtNum: "4",
    name: "FINRA District 4 — Kansas City",
    states: ["Missouri", "Kansas", "Iowa", "Nebraska", "North Dakota", "South Dakota", "Minnesota", "Wisconsin"],
    citadelContext: "FINRA District 4 covers the agricultural and industrial heartland. The Midwest retail investor population — from Minneapolis financial professionals to Kansas City retirees — routes orders through PFOF-dependent brokers to Citadel Securities. District 4's oversight of broker-dealers in this region is critical to ensuring best execution standards.",
  },
  {
    slug: "finra-district-5-citadel",
    districtNum: "5",
    name: "FINRA District 5 — New Orleans",
    states: ["Louisiana", "Mississippi", "Alabama", "Arkansas", "Tennessee", "Kentucky"],
    citadelContext: "FINRA District 5 covers the Deep South and border states. The significant working-class retail investor population in this region — oil workers, manufacturing employees, and retirees — relies heavily on discount brokers and is disproportionately affected by PFOF-driven execution quality degradation.",
  },
  {
    slug: "finra-district-6-citadel",
    districtNum: "6",
    name: "FINRA District 6 — Dallas",
    states: ["Texas", "Oklahoma", "New Mexico"],
    citadelContext: "FINRA District 6 covers the South-Central region, including Texas — the state with the third-largest retail investor population. District 6 examination staff oversees broker-dealers serving millions of Texas retail investors whose orders are routed to Citadel Securities through PFOF arrangements.",
  },
  {
    slug: "finra-district-7-citadel",
    districtNum: "7",
    name: "FINRA District 7 — Atlanta",
    states: ["Georgia", "North Carolina", "South Carolina", "Florida"],
    citadelContext: "FINRA District 7 covers the Southeast, including Florida — Citadel's new headquarters state. The juxtaposition of Citadel's physical presence in Florida and the FINRA District 7 examination structure creates direct geographic accountability. District 7 examinations of broker-dealers serving Florida investors are particularly relevant given the Griffin-DeSantis political relationship.",
  },
  {
    slug: "finra-district-8-citadel",
    districtNum: "8",
    name: "FINRA District 8 — Chicago",
    states: ["Illinois", "Indiana", "Ohio", "Michigan"],
    citadelContext: "FINRA District 8 covers Chicago — Citadel Securities' historical home. Illinois retail investors have a uniquely complex relationship with Citadel: the firm has shaped the state's political landscape for decades through Griffin's donations, while operating as the counterparty to millions of Illinois retail investors' trades.",
  },
  {
    slug: "finra-district-9-citadel",
    districtNum: "9",
    name: "FINRA District 9 — Denver",
    states: ["Colorado", "Wyoming", "Utah", "Montana", "Idaho"],
    citadelContext: "FINRA District 9 covers the Mountain West. The growing retail investor populations in Colorado's tech sector and Utah's Silicon Slopes are increasingly active in discount brokerage accounts that route to Citadel Securities through PFOF arrangements.",
  },
  {
    slug: "finra-district-10-citadel",
    districtNum: "10",
    name: "FINRA District 10 — Seattle",
    states: ["Washington", "Oregon", "Alaska", "Hawaii"],
    citadelContext: "FINRA District 10 covers the Pacific Northwest and non-contiguous states. Seattle's technology sector — home to Amazon, Microsoft, and Boeing employees — generates significant retail investor activity, all subject to PFOF-driven order routing to Citadel Securities.",
  },
  {
    slug: "finra-district-11-citadel",
    districtNum: "11",
    name: "FINRA District 11 — Boston",
    states: ["Massachusetts", "Rhode Island", "Maine", "New Hampshire", "Vermont"],
    citadelContext: "FINRA District 11 covers New England. Massachusetts has historically been the most aggressive state-level securities enforcement jurisdiction in the country, with William Galvin's office having already brought PFOF-related enforcement actions. District 11's New England coverage includes multiple states with strong investor protection traditions.",
  },
  {
    slug: "finra-district-12-citadel",
    districtNum: "12",
    name: "FINRA District 12 — Washington DC",
    states: ["Washington DC", "Virginia", "West Virginia"],
    citadelContext: "FINRA District 12 covers the nation's capital region. The politically engaged investor population in DC and its suburbs — many of whom are government employees and policy professionals — have a unique understanding of the regulatory capture dynamics that have allowed Citadel's PFOF practices to persist without meaningful federal oversight.",
  },
];

// ── FEDERAL RESERVE DISTRICT PAGES ─────────────────────────────────────
export interface FedDistrictPage {
  slug: string;
  district: string;
  name: string;
  states: string[];
  financialHub: string;
  citadelContext: string;
}

export const fedDistrictPages: FedDistrictPage[] = [
  {
    slug: "fed-district-1-boston-citadel",
    district: "First District",
    name: "First Federal Reserve District — Boston",
    states: ["Massachusetts", "Maine", "New Hampshire", "Vermont", "Rhode Island", "Connecticut"],
    financialHub: "Boston",
    citadelContext: "The First Federal Reserve District encompasses New England, a region with strong investor protection traditions and aggressive state securities regulators. Massachusetts' existing PFOF enforcement actions make this district a model for retail investor protection.",
  },
  {
    slug: "fed-district-2-new-york-citadel",
    district: "Second District",
    name: "Second Federal Reserve District — New York",
    states: ["New York", "New Jersey"],
    financialHub: "New York City",
    citadelContext: "The Second Federal Reserve District encompasses the heart of American finance. The New York Fed's oversight of systemic financial risk includes market makers like Citadel Securities, whose dominant position in retail equity execution represents a concentration risk that the Federal Reserve System should monitor.",
  },
  {
    slug: "fed-district-3-philadelphia-citadel",
    district: "Third District",
    name: "Third Federal Reserve District — Philadelphia",
    states: ["Pennsylvania", "New Jersey", "Delaware"],
    financialHub: "Philadelphia",
    citadelContext: "The Third Federal Reserve District covers the Mid-Atlantic manufacturing corridor. Pennsylvania and Delaware retail investors — including millions relying on 401(k) assets — are directly affected by Citadel's PFOF practices.",
  },
  {
    slug: "fed-district-4-cleveland-citadel",
    district: "Fourth District",
    name: "Fourth Federal Reserve District — Cleveland",
    states: ["Ohio", "Kentucky", "West Virginia", "Pennsylvania"],
    financialHub: "Cleveland",
    citadelContext: "The Fourth District covers the Rust Belt. Industrial workers' retirement savings in Ohio, Kentucky, and West Virginia flow through discount brokers to Citadel Securities — an extraction of value from the working class that Federal Reserve consumer protection authorities should examine.",
  },
  {
    slug: "fed-district-5-richmond-citadel",
    district: "Fifth District",
    name: "Fifth Federal Reserve District — Richmond",
    states: ["Virginia", "Maryland", "North Carolina", "South Carolina", "Washington DC", "West Virginia"],
    financialHub: "Richmond",
    citadelContext: "The Fifth District includes Washington DC — where the regulatory battles over PFOF are fought — and the surrounding Mid-Atlantic states. Federal Reserve consumer compliance staff in Richmond have jurisdiction over bank-affiliated broker-dealers serving Fifth District retail investors.",
  },
  {
    slug: "fed-district-6-atlanta-citadel",
    district: "Sixth District",
    name: "Sixth Federal Reserve District — Atlanta",
    states: ["Alabama", "Florida", "Georgia", "Tennessee", "Mississippi", "Louisiana"],
    financialHub: "Atlanta",
    citadelContext: "The Sixth District includes Florida — Citadel's new headquarters state — and the Southeast. The Atlanta Fed's consumer protection oversight covers broker-dealers serving millions of Southern retail investors whose orders are routed to Citadel through PFOF.",
  },
  {
    slug: "fed-district-7-chicago-citadel",
    district: "Seventh District",
    name: "Seventh Federal Reserve District — Chicago",
    states: ["Illinois", "Indiana", "Michigan", "Wisconsin", "Iowa"],
    financialHub: "Chicago",
    citadelContext: "The Seventh District covers Chicago — Citadel's historical home and the financial center most directly connected to the firm's operations. The Chicago Fed's oversight of financial market infrastructure and systemic risk is particularly relevant to Citadel Securities' dominant position in retail equity execution.",
  },
  {
    slug: "fed-district-8-st-louis-citadel",
    district: "Eighth District",
    name: "Eighth Federal Reserve District — St. Louis",
    states: ["Missouri", "Arkansas", "Kentucky", "Tennessee", "Indiana", "Illinois", "Mississippi"],
    financialHub: "St. Louis",
    citadelContext: "The Eighth District covers the mid-South and lower Midwest. Retail investors across this region — many in smaller cities and rural areas — rely on national discount brokers that route to Citadel Securities, with limited local financial advocacy resources.",
  },
  {
    slug: "fed-district-9-minneapolis-citadel",
    district: "Ninth District",
    name: "Ninth Federal Reserve District — Minneapolis",
    states: ["Minnesota", "Montana", "North Dakota", "South Dakota", "Wisconsin", "Michigan"],
    financialHub: "Minneapolis",
    citadelContext: "The Ninth District covers the Upper Midwest and Northern Plains. Minneapolis' financial sector is significant, and Minnesota's AG has been among the most aggressive on corporate accountability — making the Ninth District a potential ground for coordinated regulatory action.",
  },
  {
    slug: "fed-district-10-kansas-city-citadel",
    district: "Tenth District",
    name: "Tenth Federal Reserve District — Kansas City",
    states: ["Kansas", "Colorado", "Nebraska", "Oklahoma", "Wyoming", "Missouri", "New Mexico"],
    financialHub: "Kansas City",
    citadelContext: "The Tenth District covers the Great Plains and Mountain West. Agricultural and energy workers across this region hold retirement savings in accounts routed through Citadel's PFOF model — often with the least investor advocacy infrastructure to protect them.",
  },
  {
    slug: "fed-district-11-dallas-citadel",
    district: "Eleventh District",
    name: "Eleventh Federal Reserve District — Dallas",
    states: ["Texas", "New Mexico", "Louisiana"],
    financialHub: "Dallas",
    citadelContext: "The Eleventh District covers Texas — the nation's third-largest retail investor population — and neighboring states. The Dallas Fed's consumer compliance oversight covers bank-affiliated broker-dealers serving millions of Texas retail investors subject to Citadel's PFOF practices.",
  },
  {
    slug: "fed-district-12-san-francisco-citadel",
    district: "Twelfth District",
    name: "Twelfth Federal Reserve District — San Francisco",
    states: ["California", "Nevada", "Arizona", "Oregon", "Washington", "Idaho", "Utah", "Alaska", "Hawaii"],
    financialHub: "San Francisco",
    citadelContext: "The Twelfth District — the largest by geography — includes California, the single state most affected by PFOF practices. The San Francisco Fed's consumer protection mandate covers broker-dealers serving the enormous retail investor population of the Pacific Coast and Mountain West.",
  },
];

// ── POLITICIAN PAGES ─────────────────────────────────────────────────────
export interface PoliticianPage {
  slug: string;
  name: string;
  party: string;
  office: string;
  state: string;
  griffinAmount: string;
  griffinYear: string;
  committeeRole: string;
  relevance: string;
}

export const politicianPages: PoliticianPage[] = [
  {
    slug: "griffin-donation-ron-desantis",
    name: "Ron DeSantis",
    party: "Republican",
    office: "Governor of Florida / 2024 Presidential Candidate",
    state: "Florida",
    griffinAmount: "$50,000,000",
    griffinYear: "2022",
    committeeRole: "Governor of Florida, overseeing the Florida Office of Financial Regulation",
    relevance: "Griffin's $50 million donation to the Preserve America PAC is the largest single donation in Florida political history. DeSantis subsequently presided over a regulatory environment in which Citadel moved its headquarters to Florida without triggering any state-level PFOF investigation.",
  },
  {
    slug: "griffin-donation-bruce-rauner",
    name: "Bruce Rauner",
    party: "Republican",
    office: "Former Governor of Illinois",
    state: "Illinois",
    griffinAmount: "$54,000,000+",
    griffinYear: "2014-2018",
    committeeRole: "Governor of Illinois, overseeing the Illinois Securities Department",
    relevance: "Griffin gave an estimated $27.6 million to enable Rauner's 2014 upset of incumbent Governor Pat Quinn — the largest single donation in Illinois history at the time. During Rauner's governorship, Illinois took no action against Citadel Securities despite being the firm's home state.",
  },
  {
    slug: "griffin-donation-mitch-mcconnell",
    name: "Mitch McConnell",
    party: "Republican",
    office: "U.S. Senator, Kentucky / Former Senate Majority Leader",
    state: "Kentucky",
    griffinAmount: "$1,000,000+",
    griffinYear: "2020-2022",
    committeeRole: "Senate Majority Leader during the GameStop/meme stock controversy; McConnell had direct control over financial regulatory legislation",
    relevance: "McConnell served as Senate Majority Leader during the 2020-2021 period when calls for PFOF reform were at their peak. His leadership PAC received significant Griffin contributions during this period.",
  },
  {
    slug: "griffin-donation-nikki-haley",
    name: "Nikki Haley",
    party: "Republican",
    office: "Former UN Ambassador / 2024 Presidential Candidate",
    state: "South Carolina",
    griffinAmount: "$5,000,000",
    griffinYear: "2023",
    committeeRole: "2024 presidential candidate; her campaign received major Griffin support",
    relevance: "Griffin became one of Haley's largest donors during the 2024 Republican primary, contributing $5 million. Haley's positions on financial regulation and SEC oversight were shaped during a campaign significantly funded by the CEO of the nation's largest retail market maker.",
  },
  {
    slug: "griffin-donation-marco-rubio",
    name: "Marco Rubio",
    party: "Republican",
    office: "U.S. Senator, Florida",
    state: "Florida",
    griffinAmount: "$25,000",
    griffinYear: "2016",
    committeeRole: "Member of the Senate Foreign Relations Committee; previously on the Senate Banking Committee",
    relevance: "Rubio represents Florida — the state where Griffin relocated Citadel's headquarters — and received Griffin contributions. The relationship between Griffin's Florida political investments and Florida's regulatory posture toward Citadel is a recurring concern.",
  },
  {
    slug: "griffin-donation-tim-scott",
    name: "Tim Scott",
    party: "Republican",
    office: "U.S. Senator, South Carolina",
    state: "South Carolina",
    griffinAmount: "$25,000",
    griffinYear: "2020",
    committeeRole: "Member of the Senate Banking Committee",
    relevance: "Senator Scott serves on the Senate Banking Committee, which has direct oversight jurisdiction over the SEC and financial market structure regulation. His receipt of Griffin contributions while sitting on this committee creates an appearance of conflict in any banking committee consideration of PFOF reform.",
  },
  {
    slug: "griffin-donation-scott-walker",
    name: "Scott Walker",
    party: "Republican",
    office: "Former Governor of Wisconsin",
    state: "Wisconsin",
    griffinAmount: "$500,000",
    griffinYear: "2018",
    committeeRole: "Governor of Wisconsin during the period of growing PFOF controversy",
    relevance: "Griffin donated to Walker's 2018 reelection campaign. Wisconsin Senator Ron Johnson, who also received Griffin contributions, sits on the Senate Banking Committee.",
  },
  {
    slug: "griffin-donation-ron-johnson",
    name: "Ron Johnson",
    party: "Republican",
    office: "U.S. Senator, Wisconsin",
    state: "Wisconsin",
    griffinAmount: "$250,000",
    griffinYear: "2022",
    committeeRole: "Member of the Senate Banking Committee with jurisdiction over SEC and financial regulation",
    relevance: "Senator Johnson received $250,000 from Griffin while serving on the Senate Banking Committee — the primary Senate committee responsible for financial regulatory oversight. Johnson's 2022 reelection was significantly funded by a constellation of Republican mega-donors including Griffin.",
  },
  {
    slug: "griffin-donation-john-cornyn",
    name: "John Cornyn",
    party: "Republican",
    office: "U.S. Senator, Texas / Senate Majority Whip",
    state: "Texas",
    griffinAmount: "$50,000",
    griffinYear: "2020",
    committeeRole: "Senate Majority Whip; member of Senate Finance Committee",
    relevance: "Cornyn represents Texas — the state with the third-largest retail investor population. His receipt of Griffin contributions while serving in Senate leadership creates questions about the relationship between Citadel's political giving and the absence of Senate floor votes on PFOF reform legislation.",
  },
  {
    slug: "griffin-donation-lindsey-graham",
    name: "Lindsey Graham",
    party: "Republican",
    office: "U.S. Senator, South Carolina",
    state: "South Carolina",
    griffinAmount: "$50,000",
    griffinYear: "2020",
    committeeRole: "Senior Republican senator; previously served on Senate Banking Committee",
    relevance: "Graham is among the Republican senators who received Griffin contributions. His influence in Republican Senate politics — particularly on judicial and regulatory nominations — makes his relationship with Griffin a matter of public interest.",
  },
  {
    slug: "griffin-donation-brian-kemp",
    name: "Brian Kemp",
    party: "Republican",
    office: "Governor of Georgia",
    state: "Georgia",
    griffinAmount: "$250,000",
    griffinYear: "2022",
    committeeRole: "Governor of Georgia, overseeing state financial regulators",
    relevance: "Griffin donated to Kemp's 2022 reelection. The Georgia Secretary of State's Securities Division — which reports to a separately elected official — retains independent authority to investigate PFOF practices affecting Georgia investors regardless of the Governor's relationship with Griffin.",
  },
  { slug: "griffin-donation-pete-ricketts", name: "Pete Ricketts", party: "Republican", office: "U.S. Senator, Nebraska", state: "Nebraska", griffinAmount: "$25,000", griffinYear: "2018", committeeRole: "Former Governor of Nebraska", relevance: "Ricketts received Griffin contributions as Nebraska governor." },
  { slug: "griffin-donation-tom-cotton", name: "Tom Cotton", party: "Republican", office: "U.S. Senator, Arkansas", state: "Arkansas", griffinAmount: "$10,000", griffinYear: "2020", committeeRole: "Senate Banking Committee member", relevance: "Cotton sits on the Banking Committee with oversight of SEC market structure regulation." },
  { slug: "griffin-donation-ted-cruz", name: "Ted Cruz", party: "Republican", office: "U.S. Senator, Texas", state: "Texas", griffinAmount: "$25,000", griffinYear: "2018", committeeRole: "Senior Republican Senator", relevance: "Cruz represents Texas — third-largest retail investor population — and received Griffin contributions." },
  { slug: "griffin-donation-greg-abbott", name: "Greg Abbott", party: "Republican", office: "Governor of Texas", state: "Texas", griffinAmount: "$100,000", griffinYear: "2022", committeeRole: "Governor of Texas", relevance: "Abbott received Griffin contributions as Griffin built political relationships in Republican-governed states." },
  { slug: "griffin-donation-paul-ryan", name: "Paul Ryan", party: "Republican", office: "Former Speaker of the House", state: "Wisconsin", griffinAmount: "$500,000", griffinYear: "2016-2018", committeeRole: "Speaker of the House", relevance: "Ryan received Griffin contributions as Speaker — controlling whether PFOF legislation would ever reach a floor vote." },
  { slug: "griffin-donation-mitt-romney", name: "Mitt Romney", party: "Republican", office: "U.S. Senator, Utah", state: "Utah", griffinAmount: "$50,000", griffinYear: "2018", committeeRole: "Senate Banking Committee member", relevance: "Romney received Griffin contributions while on the Banking Committee overseeing SEC market structure." },
  { slug: "griffin-pac-preserve-america", name: "Preserve America PAC", party: "Republican", office: "Super PAC for DeSantis", state: "Florida", griffinAmount: "$50,000,000", griffinYear: "2022", committeeRole: "Super PAC", relevance: "The largest single donation in Florida political history — a direct investment in Citadel new home state regulatory environment." },
  { slug: "griffin-donation-nikki-haley-2024", name: "Nikki Haley 2024", party: "Republican", office: "2024 Presidential Candidate", state: "National", griffinAmount: "$5,000,000", griffinYear: "2023", committeeRole: "Presidential candidate", relevance: "Griffin $5M to Haley made him one of her largest donors — part of his strategy to invest in multiple GOP presidential contenders." },
  { slug: "griffin-donation-joni-ernst", name: "Joni Ernst", party: "Republican", office: "U.S. Senator, Iowa", state: "Iowa", griffinAmount: "$10,000", griffinYear: "2020", committeeRole: "Senate Agriculture Committee member", relevance: "Ernst represents Iowa agricultural investors subject to Citadel PFOF." },
  { slug: "griffin-donation-chuck-grassley", name: "Chuck Grassley", party: "Republican", office: "U.S. Senator, Iowa", state: "Iowa", griffinAmount: "$10,000", griffinYear: "2022", committeeRole: "Senior senator; former Finance Committee Chair", relevance: "Grassley is one of the most senior Senate members with decades of influence over financial matters." },
  { slug: "griffin-donation-marsha-blackburn", name: "Marsha Blackburn", party: "Republican", office: "U.S. Senator, Tennessee", state: "Tennessee", griffinAmount: "$10,000", griffinYear: "2018", committeeRole: "Senate Commerce Committee member", relevance: "Blackburn represents Tennessee investors subject to Citadel PFOF." },
  { slug: "griffin-donation-thom-tillis", name: "Thom Tillis", party: "Republican", office: "U.S. Senator, North Carolina", state: "North Carolina", griffinAmount: "$50,000", griffinYear: "2020", committeeRole: "Senate Banking Committee member", relevance: "Tillis received Griffin contributions during peak PFOF controversy year." },
  { slug: "griffin-donation-lisa-murkowski", name: "Lisa Murkowski", party: "Republican", office: "U.S. Senator, Alaska", state: "Alaska", griffinAmount: "$25,000", griffinYear: "2022", committeeRole: "Senior Republican Senator", relevance: "Illustrates breadth of Griffin political portfolio across full Senate Republican caucus." },
  {
    slug: "griffin-donation-larry-hogan",
    name: "Larry Hogan",
    party: "Republican",
    office: "Former Governor of Maryland / 2026 Senate Candidate",
    state: "Maryland",
    griffinAmount: "$150,000",
    griffinYear: "2022",
    committeeRole: "Former Governor of Maryland",
    relevance: "Hogan received Griffin contributions during his Maryland governorship and subsequently as a candidate for the U.S. Senate. Maryland is home to a significant retail investor population and its Attorney General has independent securities enforcement authority.",
  },
  {
    slug: "griffin-donation-chris-sununu",
    name: "Chris Sununu",
    party: "Republican",
    office: "Governor of New Hampshire",
    state: "New Hampshire",
    griffinAmount: "$100,000",
    griffinYear: "2022",
    committeeRole: "Governor of New Hampshire; considered as potential 2024 presidential candidate",
    relevance: "Griffin's $100,000 to Sununu came during a period when Sununu was widely discussed as a potential moderate Republican presidential candidate. Griffin's cultivation of multiple potential GOP presidential contenders simultaneously — DeSantis, Haley, Sununu — illustrates the breadth of his political portfolio.",
  },
];

// ── BROKER-SPECIFIC PAGES ──────────────────────────────────────────────
export interface BrokerPage {
  slug: string;
  broker: string;
  fullName: string;
  pfofAmount: string;
  pfofYear: string;
  description: string;
  actionTaken: string;
}

export const brokerPages: BrokerPage[] = [
  {
    slug: "citadel-robinhood-pfof",
    broker: "Robinhood",
    fullName: "Robinhood Financial LLC",
    pfofAmount: "approximately $1.5 billion",
    pfofYear: "2020",
    description: "Robinhood is the most prominent PFOF-dependent broker, having built its entire business model on zero-commission trading funded by payments from Citadel Securities. In 2020, Robinhood received approximately $1.5 billion in PFOF — the majority from Citadel. In 2020, the SEC charged and fined Robinhood $65 million for failing to disclose PFOF conflicts and achieving inferior execution.",
    actionTaken: "SEC settlement $65M (2020); Massachusetts $7.5M settlement (2020); FINRA $70M settlement (2021). PFOF arrangements continue.",
  },
  {
    slug: "citadel-td-ameritrade-pfof",
    broker: "TD Ameritrade",
    fullName: "TD Ameritrade (now Charles Schwab)",
    pfofAmount: "hundreds of millions",
    pfofYear: "2019-2020",
    description: "TD Ameritrade, before its acquisition by Charles Schwab, was one of the largest PFOF recipients. Citadel Securities was TD Ameritrade's primary wholesale market maker. Schwab's acquisition of TD Ameritrade in 2020 merged two major PFOF-dependent brokers, creating a combined entity that continues to route significant order flow to Citadel.",
    actionTaken: "No enforcement action specifically related to PFOF. Merger with Schwab completed 2020.",
  },
  {
    slug: "citadel-etrade-pfof",
    broker: "E*Trade",
    fullName: "E*Trade Financial (now Morgan Stanley)",
    pfofAmount: "hundreds of millions",
    pfofYear: "2019-2020",
    description: "E*Trade was one of the original discount brokers to adopt PFOF arrangements with Citadel Securities. Following Morgan Stanley's acquisition of E*Trade in 2020, the combined entity continued significant PFOF arrangements. Morgan Stanley's wealth management and institutional businesses create additional potential conflicts with retail order routing.",
    actionTaken: "No specific PFOF enforcement action. Acquired by Morgan Stanley 2020.",
  },
  {
    slug: "citadel-schwab-pfof",
    broker: "Charles Schwab",
    fullName: "Charles Schwab Corporation",
    pfofAmount: "hundreds of millions annually",
    pfofYear: "ongoing",
    description: "Charles Schwab, despite its reputation as a more traditional retail brokerage, receives significant PFOF payments from Citadel Securities and other wholesale market makers. Schwab's 2020 acquisition of TD Ameritrade created the largest U.S. discount brokerage — making its PFOF arrangements with Citadel among the most significant in the industry.",
    actionTaken: "No major PFOF enforcement action. Continues PFOF arrangements.",
  },
  {
    slug: "citadel-webull-pfof",
    broker: "Webull",
    fullName: "Webull Financial LLC",
    pfofAmount: "tens of millions",
    pfofYear: "2020-2023",
    description: "Webull, the Chinese-owned discount brokerage popular with young active traders, uses PFOF arrangements with Citadel Securities and other market makers. Webull's Chinese ownership and its use of Citadel as a primary market maker has raised additional national security and market integrity concerns among some legislators.",
    actionTaken: "Congressional scrutiny regarding Chinese ownership; no specific PFOF enforcement action.",
  },
  {
    slug: "citadel-fidelity-pfof",
    broker: "Fidelity",
    fullName: "Fidelity Investments / Fidelity Brokerage Services",
    pfofAmount: "minimal",
    pfofYear: "n/a",
    description: "Fidelity is notable as the largest discount broker that does NOT accept PFOF for equity orders. Fidelity routes equity orders directly to exchanges or uses price improvement mechanisms that do not involve PFOF payments. This makes Fidelity a comparison case for demonstrating that large-scale discount brokerage can operate without PFOF — and that the practice is a choice, not a necessity.",
    actionTaken: "N/A — Fidelity does not accept PFOF for equity orders. This is the correct model.",
  },
];

// ── MAJOR CITY PAGES ────────────────────────────────────────────────────
export interface CityPage {
  slug: string;
  city: string;
  state: string;
  stateSlug: string;
  region: string;
  description: string;
}

export const cityPages: CityPage[] = [
  { slug: "citadel-new-york-investors", city: "New York City", state: "New York", stateSlug: "new-york", region: "Northeast", description: "New York City is the nation's financial capital, with millions of retail investors alongside institutional players. NYC retail investors' orders are routed to Citadel Securities through PFOF arrangements even as they live and work in the heart of the financial industry." },
  { slug: "citadel-chicago-investors", city: "Chicago", state: "Illinois", stateSlug: "illinois", region: "Midwest", description: "Chicago is Citadel Securities' historical home. Illinois retail investors trade in the shadow of Citadel's global headquarters — a firm whose CEO has spent tens of millions shaping Illinois politics." },
  { slug: "citadel-miami-investors", city: "Miami", state: "Florida", stateSlug: "florida", region: "Southeast", description: "Miami is now Citadel's headquarters city. Florida's financial regulator and Miami's local political establishment have direct relationships with Kenneth Griffin." },
  { slug: "citadel-los-angeles-investors", city: "Los Angeles", state: "California", stateSlug: "california", region: "West", description: "Los Angeles has one of the nation's largest retail investor populations, with millions of retail trading accounts and significant tech and entertainment sector wealth." },
  { slug: "citadel-dallas-investors", city: "Dallas", state: "Texas", stateSlug: "texas", region: "South", description: "Dallas is Texas' financial hub, with a large professional class and growing retail investor community." },
  { slug: "citadel-houston-investors", city: "Houston", state: "Texas", stateSlug: "texas", region: "South", description: "Houston's energy industry creates a large population of retail investors with significant 401(k) and IRA assets." },
  { slug: "citadel-atlanta-investors", city: "Atlanta", state: "Georgia", stateSlug: "georgia", region: "Southeast", description: "Atlanta's growing tech and financial services sector has created a rapidly expanding retail investor base." },
  { slug: "citadel-boston-investors", city: "Boston", state: "Massachusetts", stateSlug: "massachusetts", region: "Northeast", description: "Boston has historically been at the forefront of securities enforcement, with Massachusetts' PFOF enforcement actions serving as national models." },
  { slug: "citadel-seattle-investors", city: "Seattle", state: "Washington", stateSlug: "washington", region: "Northwest", description: "Seattle's Amazon and Microsoft employees represent some of the nation's most active retail investors." },
  { slug: "citadel-san-francisco-investors", city: "San Francisco", state: "California", stateSlug: "california", region: "West", description: "San Francisco's tech wealth concentration creates a significant retail investor population — many holding significant employer stock." },
  { slug: "citadel-phoenix-investors", city: "Phoenix", state: "Arizona", stateSlug: "arizona", region: "Southwest", description: "Phoenix's growing population and significant retiree community make it one of the fastest-growing retail investor markets." },
  { slug: "citadel-denver-investors", city: "Denver", state: "Colorado", stateSlug: "colorado", region: "Mountain", description: "Denver's tech corridor and outdoor industry have created a growing professional retail investor class." },
  { slug: "citadel-minneapolis-investors", city: "Minneapolis", state: "Minnesota", stateSlug: "minnesota", region: "Midwest", description: "Minneapolis has a significant financial services sector and retail investor population." },
  { slug: "citadel-philadelphia-investors", city: "Philadelphia", state: "Pennsylvania", stateSlug: "pennsylvania", region: "Northeast", description: "Philadelphia's financial district and large professional class generate significant retail investor activity." },
  { slug: "citadel-nashville-investors", city: "Nashville", state: "Tennessee", stateSlug: "tennessee", region: "South", description: "Nashville's booming economy and growing professional class have created a rapidly expanding retail investor base." },
  { slug: "citadel-charlotte-investors", city: "Charlotte", state: "North Carolina", stateSlug: "north-carolina", region: "Southeast", description: "Charlotte is America's second-largest banking center, with a large financial industry workforce and retail investor community." },
  { slug: "citadel-washington-dc-investors", city: "Washington DC", state: "Washington DC", stateSlug: "washington-dc", region: "Mid-Atlantic", description: "DC's government employee and contractor population creates a significant and politically informed retail investor base." },
  { slug: "citadel-detroit-investors", city: "Detroit", state: "Michigan", stateSlug: "michigan", region: "Midwest", description: "Detroit's auto industry workers and retirees hold significant pension and 401(k) assets managed through PFOF-dependent brokers." },
  { slug: "citadel-columbus-investors", city: "Columbus", state: "Ohio", stateSlug: "ohio", region: "Midwest", description: "Columbus' growing tech sector and large public university employee base create significant retail investor activity." },
  { slug: "citadel-portland-investors", city: "Portland", state: "Oregon", stateSlug: "oregon", region: "Northwest", description: "Portland's progressive community includes many retail investors who may be surprised to learn their 'free' trades fund Citadel Securities." },
  { slug: "citadel-austin-investors", city: "Austin", state: "Texas", stateSlug: "texas", region: "South", description: "Austin's tech boom has created one of the fastest-growing retail investor populations in the country." },
  { slug: "citadel-las-vegas-investors", city: "Las Vegas", state: "Nevada", stateSlug: "nevada", region: "Southwest", description: "Las Vegas' hospitality and gaming workers hold significant retirement savings through discount brokers." },
  { slug: "citadel-san-antonio-investors", city: "San Antonio", state: "Texas", stateSlug: "texas", region: "South", description: "San Antonio's large military and healthcare sector creates a significant retail investor population." },
  { slug: "citadel-baltimore-investors", city: "Baltimore", state: "Maryland", stateSlug: "maryland", region: "Mid-Atlantic", description: "Baltimore's financial district and large federal government workforce create a significant retail investor community." },
  { slug: "citadel-louisville-investors", city: "Louisville", state: "Kentucky", stateSlug: "kentucky", region: "South", description: "Louisville's healthcare and financial services sectors create retail investor activity." },
  { slug: "citadel-memphis-investors", city: "Memphis", state: "Tennessee", stateSlug: "tennessee", region: "South", description: "Memphis' logistics and healthcare sectors generate retail investor activity among professional populations." },
  { slug: "citadel-richmond-investors", city: "Richmond", state: "Virginia", stateSlug: "virginia", region: "Mid-Atlantic", description: "Richmond is the home of the Fifth Federal Reserve District and a significant financial services employer." },
  { slug: "citadel-new-orleans-investors", city: "New Orleans", state: "Louisiana", stateSlug: "louisiana", region: "South", description: "New Orleans' energy and hospitality sectors create retail investor activity with limited state-level advocacy resources." },
  { slug: "citadel-omaha-investors", city: "Omaha", state: "Nebraska", stateSlug: "nebraska", region: "Midwest", description: "Omaha, home of Berkshire Hathaway, has a financially literate investor community — yet retail investors face the same PFOF conflicts as everywhere else." },
  { slug: "citadel-salt-lake-city-investors", city: "Salt Lake City", state: "Utah", stateSlug: "utah", region: "Mountain", description: "Salt Lake City Silicon Slopes tech sector has created a rapidly growing retail investor community." },
  { slug: "citadel-boca-raton-investors", city: "Boca Raton", state: "Florida", stateSlug: "florida", region: "Southeast", description: "Boca Raton large wealthy retail investor community with Citadel Florida connections." },
  { slug: "citadel-fort-lauderdale-investors", city: "Fort Lauderdale", state: "Florida", stateSlug: "florida", region: "Southeast", description: "Fort Lauderdale financial services creates significant retail investor activity." },
  { slug: "citadel-jacksonville-investors", city: "Jacksonville", state: "Florida", stateSlug: "florida", region: "Southeast", description: "Jacksonville military and financial services creates significant retail investor activity." },
  { slug: "citadel-orlando-investors", city: "Orlando", state: "Florida", stateSlug: "florida", region: "Southeast", description: "Orlando hospitality and tech sectors create growing retail investor activity." },
  { slug: "citadel-tampa-investors", city: "Tampa", state: "Florida", stateSlug: "florida", region: "Southeast", description: "Tampa financial hub creates significant retail investor base." },
  { slug: "citadel-indianapolis-investors", city: "Indianapolis", state: "Indiana", stateSlug: "indiana", region: "Midwest", description: "Indianapolis healthcare and financial sectors generate retail investor activity." },
  { slug: "citadel-cincinnati-investors", city: "Cincinnati", state: "Ohio", stateSlug: "ohio", region: "Midwest", description: "Cincinnati financial services and consumer goods create retail investor activity." },
  { slug: "citadel-pittsburgh-investors", city: "Pittsburgh", state: "Pennsylvania", stateSlug: "pennsylvania", region: "Northeast", description: "Pittsburgh steel heritage and growing tech create significant retail investor activity." },
  { slug: "citadel-st-louis-investors", city: "St. Louis", state: "Missouri", stateSlug: "missouri", region: "Midwest", description: "St. Louis financial and healthcare sectors generate retail investor activity." },
  { slug: "citadel-norfolk-investors", city: "Norfolk", state: "Virginia", stateSlug: "virginia", region: "Mid-Atlantic", description: "Norfolk military presence creates significant retirement savings and retail investor activity." },
  { slug: "citadel-raleigh-investors", city: "Raleigh", state: "North Carolina", stateSlug: "north-carolina", region: "Southeast", description: "Raleigh Research Triangle tech creates growing professional retail investor community." },
  { slug: "citadel-albuquerque-investors", city: "Albuquerque", state: "New Mexico", stateSlug: "new-mexico", region: "Southwest", description: "Albuquerque government and energy sectors create retail investor activity." },
  { slug: "citadel-tucson-investors", city: "Tucson", state: "Arizona", stateSlug: "arizona", region: "Southwest", description: "Tucson retirees and university population create significant retail investor activity." },
  { slug: "citadel-sacramento-investors", city: "Sacramento", state: "California", stateSlug: "california", region: "West", description: "Sacramento state government workforce creates significant retail investor activity." },
  { slug: "citadel-san-diego-investors", city: "San Diego", state: "California", stateSlug: "california", region: "West", description: "San Diego military and biotech create large professional retail investor community." },
  { slug: "citadel-san-jose-investors", city: "San Jose", state: "California", stateSlug: "california", region: "West", description: "San Jose heart of Silicon Valley with highest concentration of tech investors." },
  { slug: "citadel-el-paso-investors", city: "El Paso", state: "Texas", stateSlug: "texas", region: "South", description: "El Paso military and border economy creates retail investor activity." },
  { slug: "citadel-des-moines-investors", city: "Des Moines", state: "Iowa", stateSlug: "iowa", region: "Midwest", description: "Des Moines Iowa financial hub with significant insurance sector retail investors." },
  { slug: "citadel-baton-rouge-investors", city: "Baton Rouge", state: "Louisiana", stateSlug: "louisiana", region: "South", description: "Baton Rouge oil industry and university community creates retail investor activity." },
  { slug: "citadel-birmingham-investors", city: "Birmingham", state: "Alabama", stateSlug: "alabama", region: "South", description: "Birmingham financial and healthcare sectors create significant retail investor activity." },
  { slug: "citadel-columbia-sc-investors", city: "Columbia", state: "South Carolina", stateSlug: "south-carolina", region: "Southeast", description: "Columbia state government and military presence creates retail investor activity." },
  { slug: "citadel-honolulu-investors", city: "Honolulu", state: "Hawaii", stateSlug: "hawaii", region: "Pacific", description: "Honolulu tourism and military economy creates retail investor activity." },
  { slug: "citadel-anchorage-investors", city: "Anchorage", state: "Alaska", stateSlug: "alaska", region: "Pacific", description: "Anchorage oil industry workers hold significant retirement savings through discount brokers." },
];

// ── SPECIALTY PAGES ────────────────────────────────────────────────────
export interface SpecialtyPage {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export const specialtyPages: SpecialtyPage[] = [
  {
    slug: "citadel-puerto-rico-investors",
    title: "Citadel Securities and Puerto Rico: Retail Investors Under Double Jeopardy",
    metaDescription: "Puerto Rico retail investors face unique vulnerabilities to PFOF practices. Limited SEC jurisdiction arguments, hurricane recovery, and financial crisis have left investors exposed.",
    category: "Geographic",
    intro: "Puerto Rico's retail investors face a unique set of vulnerabilities that make PFOF's harms particularly acute on the island.",
    sections: [
      { heading: "Puerto Rico's Financial Landscape", body: "Puerto Rico's prolonged fiscal crisis, Hurricane Maria's devastation, and a bankruptcy restructuring process that wiped out many local government bonds have left a retail investor population managing what savings they have through national discount brokers. These investors are subject to the same PFOF arrangements as mainland U.S. investors." },
      { heading: "Jurisdictional Complexity", body: "Puerto Rico's status as a U.S. territory means its residents are subject to federal SEC and FINRA regulations. However, the island's unique legal status has historically complicated the application of investor protection frameworks. The Puerto Rico Office of the Commissioner of Financial Institutions has independent authority to investigate broker-dealer practices." },
    ],
  },
  {
    slug: "citadel-native-american-investors",
    title: "Citadel Securities and Native American Communities: PFOF on Sovereign Lands",
    metaDescription: "Native American retail investors face unique challenges. Tribal sovereignty, limited financial infrastructure, and distance from advocacy resources make PFOF harms particularly acute.",
    category: "Geographic",
    intro: "Native American retail investors on and near tribal lands face specific challenges in accessing investor protection resources and understanding the PFOF practices that affect their trades.",
    sections: [
      { heading: "The Infrastructure Gap", body: "Many Native American communities have limited access to financial advisors, securities attorneys, and investor advocacy organizations. Retail investors in these communities who use national discount brokers are subject to the same PFOF arrangements as investors in major financial centers — but with far less access to information, legal resources, or complaint mechanisms." },
      { heading: "What Tribal Governments Can Do", body: "Tribal gaming commissions and tribal financial institutions have regulatory infrastructure that could be leveraged to educate community members about PFOF practices. Several tribes have also worked with the SEC's Office of Investor Education and Advocacy on financial literacy programs." },
    ],
  },
  {
    slug: "citadel-military-investors",
    title: "Citadel Securities and Military Investors: How PFOF Affects Service Members' Savings",
    metaDescription: "U.S. military personnel are among the most active retail investors through TSP and discount brokerage platforms. PFOF practices affect their savings without disclosure.",
    category: "Demographic",
    intro: "U.S. military personnel and veterans represent a significant and distinct retail investor population — one with specific rights under the Military Lending Act and Securities Investor Protection Act that deserve to be fully applied to PFOF-related harms.",
    sections: [
      { heading: "Military Investor Profile", body: "Active duty service members and veterans frequently use discount brokers and the Thrift Savings Plan. While the TSP itself does not involve PFOF (it routes to institutional trading), many service members also maintain individual brokerage accounts on Robinhood and similar platforms — all subject to PFOF arrangements with Citadel Securities." },
      { heading: "JAG and Investor Protection", body: "The JAG Corps provides legal assistance to service members on a wide range of issues, including financial matters. Service members who believe they have been harmed by PFOF practices can seek initial guidance through JAG legal assistance programs, in addition to filing complaints with the SEC and FINRA." },
    ],
  },
  {
    slug: "citadel-retirement-accounts-ira",
    title: "How Citadel PFOF Affects Your IRA and Retirement Savings",
    metaDescription: "PFOF practices affect IRA and 401(k) investors as much as active traders — perhaps more. The Ethics Reporter examines how retirement savers are affected by Citadel's market-making practices.",
    category: "Education",
    intro: "Retirement savers who consider themselves long-term investors — not active traders — may believe PFOF doesn't affect them. They're wrong. Every transaction in a self-directed IRA or 401(k) brokerage account is subject to the same PFOF arrangements that affect active traders.",
    sections: [
      { heading: "IRA Investors and PFOF", body: "Self-directed IRAs at discount brokers — Schwab, Fidelity (where applicable), TD Ameritrade, and others — are subject to the same order routing practices as taxable accounts. When you buy a stock or ETF for your retirement account at a discount broker that uses PFOF, your order likely goes to Citadel Securities." },
      { heading: "The Compounding Effect", body: "The harm of PFOF to retirement investors is not just the immediate execution quality degradation — it's the compounding effect over time. Every dollar of execution quality foregone today is a dollar that cannot compound over 20-30 years of retirement savings. For a young investor with decades to retirement, the cumulative impact of consistent PFOF-related execution degradation can be substantial." },
      { heading: "DOL Fiduciary Rule Context", body: "The Department of Labor's fiduciary rule — applied to retirement account advisors — imposes obligations to act in clients' best interests. The rule's application to PFOF arrangements in retirement accounts has been a subject of regulatory debate. DOL enforcement of fiduciary standards in the retirement account context could complement SEC enforcement of best execution standards in the broker-dealer context." },
    ],
  },
  {
    slug: "citadel-sec-whistleblower-how-to",
    title: "How to File an SEC Whistleblower Tip About Citadel Securities",
    metaDescription: "The SEC's whistleblower program awards 10-30% of sanctions over $1M to tipsters. Here's how former Citadel employees and industry insiders can submit tips securely.",
    category: "Action",
    intro: "The SEC Whistleblower Program has paid more than $1.5 billion to individuals who provided original information about securities violations. Former Citadel Securities employees, market participants with knowledge of PFOF violations, and compliance professionals aware of undisclosed conflicts are encouraged to use this program.",
    sections: [
      { heading: "What the Program Offers", body: "Under the Dodd-Frank Act, the SEC pays financial awards of 10-30% of monetary sanctions exceeding $1 million to individuals who voluntarily provide original information leading to successful enforcement. The program also provides strong anti-retaliation protections and allows anonymous submissions through a securities attorney." },
      { heading: "What Information Is Valuable", body: "Valuable PFOF-related whistleblower tips would include: evidence that a broker failed to disclose material PFOF conflicts; evidence of materially inferior execution through PFOF arrangements; evidence of coordination between Citadel Securities and brokers to achieve outcomes inconsistent with best execution; or evidence of false or misleading representations to retail investors about execution quality." },
      { heading: "How to Submit", body: "Submit tips at sec.gov/whistleblower. You can submit anonymously if represented by an attorney. The SEC's Whistleblower Office maintains confidentiality of tipster identities and has robust processes for reviewing and acting on tips." },
    ],
  },
  {
    slug: "citadel-sec-rule-605-606-explained",
    title: "SEC Rules 605 and 606: The Disclosure Requirements That Don't Protect You",
    metaDescription: "SEC Rules 605 and 606 were designed to create transparency in order routing and execution quality. They don't work for retail investors. Here's why.",
    category: "Regulatory",
    intro: "The SEC's primary tools for creating transparency in the PFOF market are Rules 605 and 606. Both rules require disclosures. Neither rule effectively protects retail investors. The Ethics Reporter explains why.",
    sections: [
      { heading: "Rule 606: Order Routing Disclosure", body: "Rule 606 requires brokers to publish quarterly reports disclosing where they route customer orders and the net payments received. The reports are public but complex. Few retail investors read them; fewer understand them. The information is aggregated rather than account-specific, making it impossible for individual investors to assess their own execution quality." },
      { heading: "Rule 605: Execution Quality Statistics", body: "Rule 605 requires market centers (including Citadel Securities) to publish monthly execution quality statistics. These reports show effective spreads, price improvement rates, and fill times. However, the data is difficult to interpret without specialized knowledge and is not presented in a form accessible to retail investors." },
      { heading: "Why Disclosure Isn't Enough", body: "The disclosure model for PFOF regulation is fundamentally inadequate for the same reason that calorie labeling doesn't make fast food healthy: the underlying product remains the same regardless of disclosure. PFOF creates a structural conflict of interest between brokers and customers that disclosure does not resolve — it merely acknowledges. True investor protection requires structural reform, not better footnotes." },
    ],
  },
  {
    slug: "citadel-small-business-investors",
    title: "Citadel PFOF and Small Business Owners: How Your Business Savings Are Affected",
    metaDescription: "Small business owners who invest through individual brokerage accounts or SEP-IRAs are affected by PFOF. Here's what you need to know.",
    category: "Education",
    intro: "Small business owners who save for retirement through SEP-IRAs, SIMPLE IRAs, or individual brokerage accounts — and who use discount brokers for cost reasons — are directly affected by PFOF arrangements with Citadel Securities.",
    sections: [
      { heading: "The Small Business Investor Profile", body: "Small business owners often rely on cost-effective financial solutions. Discount brokers offering zero-commission trading are attractive. What small business owners may not realize is that 'zero commission' is funded by PFOF payments that result in inferior execution quality — a hidden cost that undermines the cost savings of discount brokerage." },
      { heading: "Self-Employed Retirement Accounts", body: "Solo 401(k)s, SEP-IRAs, and SIMPLE IRAs at discount brokers are all subject to PFOF-based order routing. Small business owners making substantial annual retirement contributions to these accounts may be unknowingly contributing to Citadel Securities' revenue through execution quality degradation." },
    ],
  },
  {
    slug: "citadel-dark-pools-explained",
    title: "Dark Pools and Citadel: How Off-Exchange Trading Harms Price Discovery",
    metaDescription: "Dark pools — off-exchange trading venues — allow Citadel to internalize retail orders away from public markets, harming price discovery for all investors.",
    category: "Education",
    intro: "Off-exchange, or 'dark pool,' trading allows market makers like Citadel Securities to execute retail orders without routing them to public exchanges. This opacity has significant consequences for market quality and retail investor protection.",
    sections: [
      { heading: "What Dark Pools Are", body: "Dark pools are trading venues that allow securities transactions to occur without pre-trade transparency — meaning orders are not displayed publicly before execution. Market makers like Citadel operate internal dark pools (also called alternative trading systems or ATS) where retail orders can be internalized without contributing to public price discovery." },
      { heading: "Why This Matters", body: "When retail orders are internalized in dark pools rather than routed to public exchanges, the price discovery function of public markets is degraded. Less information about supply and demand reaches the public market, meaning the prices displayed on exchanges are less accurate. This harms all investors — not just those whose orders are internalized." },
      { heading: "The Regulatory Framework", body: "The SEC's Regulation ATS requires registration and some transparency requirements for alternative trading systems. However, the requirements are considerably less stringent than for exchanges. Citadel's dark pool operations are registered but subject to less scrutiny than its exchange-based market making." },
    ],
  },
  {
    slug: "pfof-class-action-lawsuit-join",
    title: "How to Join or Start a PFOF Class Action Against Your Broker",
    metaDescription: "Multiple PFOF-related class action lawsuits have been filed against discount brokers. Here's how to find out if you're eligible to join and what to expect.",
    category: "Legal",
    intro: "Class action litigation is one of the most effective tools for retail investors to seek accountability from brokers that have harmed them through PFOF arrangements. Here's what you need to know about current and potential PFOF class actions.",
    sections: [
      { heading: "Finding Active PFOF Class Actions", body: "Active class action lawsuits are publicly filed in federal district courts. PACER (Public Access to Court Electronic Records) at pacer.gov allows you to search federal court filings. Securities class action clearinghouses maintained by class action law firms also track active cases. Search for your broker's name and 'PFOF' or 'payment for order flow' or 'best execution.'" },
      { heading: "Eligibility", body: "Class action eligibility in securities cases is typically based on having a brokerage account at the defendant broker during the relevant period. If you opened a Robinhood account between 2015 and 2018 (the period of the SEC complaint), for example, you were potentially a member of the relevant investor class." },
      { heading: "What to Expect", body: "Securities class actions are complex, long-running cases. Most settle rather than going to trial. Settlement amounts in PFOF cases have historically been modest relative to the revenues at stake — which is why regulatory enforcement, rather than private litigation, is the more powerful accountability tool." },
    ],
  },
  {
    slug: "citadel-market-making-how-it-works",
    title: "How Citadel Securities Makes Markets: A Plain-English Explainer",
    metaDescription: "Market making is complex. Here's a plain-English explanation of how Citadel Securities works, why it pays for order flow, and why that matters for your investments.",
    category: "Education",
    intro: "Market making sounds technical. The basic idea is simple — and once you understand it, the Citadel controversy becomes immediately clear.",
    sections: [
      { heading: "What a Market Maker Does", body: "A market maker stands ready to buy and sell a security at any time. When you want to sell a stock and there's no buyer immediately available, the market maker buys from you. When you want to buy and there's no seller, the market maker sells to you. The market maker earns a profit by selling at a slightly higher price than it bought — the bid-ask spread." },
      { heading: "How Citadel Makes Money", body: "Citadel Securities makes money on every retail trade by capturing a portion of the bid-ask spread. If a stock's bid is $10.00 and the offer is $10.01, and Citadel executes your buy order at $10.005, Citadel profits $0.005 per share. Multiply this by hundreds of millions of shares per day, and the economics become clear: Citadel's market-making profits are built on a tiny but relentless extraction from retail investors' trades." },
      { heading: "Why Paying for Order Flow Makes Sense — For Citadel", body: "Citadel pays brokers for order flow because retail order flow is high quality. Retail investors are not sophisticated traders with information advantages — they trade based on news, emotions, and investment plans. This 'non-toxic' order flow is easier and more profitable for Citadel to make markets against than institutional order flow. Paying for access to this quality of order flow is rational for Citadel even if it ultimately harms the retail investors providing it." },
    ],
  },
  { slug: "citadel-order-competition-rule", title: "The Order Competition Rule: What It Was and Why Citadel Killed It", metaDescription: "SEC Order Competition Rule would have ended Citadel PFOF dominance. Citadel lobbied aggressively against it.", category: "Regulatory", intro: "Rule 615 would have required competitive auctions for retail orders, ending Citadel single-market-maker dominance.", sections: [{ heading: "The Rule", body: "Proposed Rule 615 required brokers to expose retail orders to competitive auction before routing to any single market maker — directly threatening Citadel PFOF monopoly." }, { heading: "Citadel Opposition", body: "Citadel filed 100+ page comment letters and Griffin deployed his full political network to dilute the rule before finalization." }] },
  { slug: "citadel-new-england-investors", title: "Citadel and New England: The Massachusetts Model", metaDescription: "New England has the most aggressive state securities enforcement. Massachusetts has already acted on PFOF.", category: "Geographic", intro: "New England — led by Massachusetts — represents the regional model for PFOF accountability.", sections: [{ heading: "Massachusetts Model", body: "Secretary of State William Galvin has brought multiple PFOF enforcement actions, providing the national template for state accountability." }] },
  { slug: "citadel-midwest-investors", title: "Citadel and Midwest Investors: The Firm Backyard", metaDescription: "The Midwest is Citadel historical home. Illinois to Iowa investors deserve regulatory scrutiny the firm home state refused.", category: "Geographic", intro: "Citadel was built in Chicago. The Midwest deserves particular scrutiny given Griffin decades of political investment in the region.", sections: [{ heading: "Illinois Paradox", body: "Illinois has seen the most Griffin political spending yet zero state enforcement action against Citadel — the clearest PFOF regulatory capture example." }] },
  { slug: "citadel-sun-belt-retirees", title: "Citadel PFOF and Sun Belt Retirees: Most Vulnerable Investors", metaDescription: "Sun Belt retirees in Florida, Arizona, and Nevada are among the most active and vulnerable retail investors.", category: "Demographic", intro: "Sun Belt retirement states have the largest concentrations of active retail investors — and the states most affected by Griffin political investments.", sections: [{ heading: "Florida Paradox", body: "Florida has both the largest retiree investor population and the governor who received $50M from Citadel CEO — the most acute regulatory capture concern." }] },
  { slug: "citadel-pfof-history-timeline", title: "PFOF History Timeline: From Madoff to Citadel Dominance", metaDescription: "Payment for order flow has a 50-year history from Madoff invention to Citadel dominance.", category: "History", intro: "Understanding PFOF evolution from small brokerage practice to multi-billion industry requires a historical timeline spanning five decades.", sections: [{ heading: "1970s Madoff", body: "Bernie Madoff invents PFOF at his broker-dealer, paying brokers for retail order flow — pioneering the model Citadel would perfect at billion-dollar scale." }, { heading: "2019 Commission Wars", body: "Schwab eliminates commissions, triggering industry-wide shift to PFOF-funded zero-commission trading — Citadel revenues surge." }, { heading: "2021 GameStop", body: "Meme stock frenzy brings PFOF to national attention. Congressional hearings demand reform. SEC begins market structure rule process." }, { heading: "2024 Stall", body: "SEC reforms substantially diluted under Griffin $100M+ political spending. State enforcement remains the viable path." }] },
  { slug: "citadel-consumer-financial-protection", title: "CFPB and PFOF: Why the Consumer Finance Regulator Is Silent", metaDescription: "The CFPB has authority over consumer financial products. PFOF harms consumers. Why has the CFPB not acted?", category: "Regulatory", intro: "The CFPB mandate to prevent unfair, deceptive, or abusive financial practices should cover PFOF conflicts — yet the agency has been silent.", sections: [{ heading: "UDAAP Case", body: "PFOF creates undisclosed conflicts and inferior execution — classic unfair or deceptive acts and practices under CFPB jurisdiction." }, { heading: "Jurisdiction Overlap", body: "SEC primary jurisdiction over broker-dealers and CFPB consumer mandate overlap on PFOF — creating a gap both agencies exploit to avoid acting." }] },
  { slug: "citadel-healthcare-workers-investors", title: "Healthcare Workers and PFOF: Nurses, Doctors, Hospital Staff Savings", metaDescription: "Healthcare workers 403b and 401k assets route through Citadel PFOF arrangements.", category: "Demographic", intro: "America largest employment sector has millions of workers with retirement savings subject to Citadel PFOF through 403(b) brokerage accounts.", sections: [{ heading: "403b and PFOF", body: "Healthcare workers 403(b) plan assets often invested through discount brokerage windows subject to PFOF — an intersection no regulator has addressed." }] },
  { slug: "citadel-teacher-investors", title: "Teacher Pension Funds and PFOF: Educators Retirement in Citadel Market", metaDescription: "Teachers state pensions are not PFOF-affected but supplemental individual brokerage accounts are.", category: "Demographic", intro: "America 3.5 million teachers increasingly manage supplemental retirement assets through individual discount brokerage accounts subject to Citadel PFOF.", sections: [{ heading: "Supplemental Accounts", body: "Many teachers supplement state pensions with individual IRA accounts at discount brokers — all routing to Citadel through PFOF." }] },
  { slug: "citadel-government-workers-investors", title: "Federal Workers, TSP, and PFOF: Government Employee Investors", metaDescription: "Federal workers TSP does not use PFOF but supplemental accounts do. TSP proves PFOF is a choice not a necessity.", category: "Demographic", intro: "Federal workers TSP retirement plan routes trades institutionally without PFOF — proving large-scale discount investing viable without Citadel model.", sections: [{ heading: "The TSP Proof", body: "TSP provides millions of federal workers better execution than private-sector PFOF brokers — demonstrating PFOF is a regulatory choice, not an economic necessity." }] },
  { slug: "citadel-western-states-investors", title: "Citadel PFOF and Western State Investors: California to Montana", metaDescription: "Western state retail investors face Citadel PFOF. California DFPI and AG are best positioned for regional enforcement.", category: "Geographic", intro: "California leads Western state PFOF enforcement capacity with 8 million retail investors and powerful consumer protection law.", sections: [{ heading: "California Leadership", body: "The California DFPI and AG office have jurisdiction and resources to lead Western enforcement under the state Unfair Competition Law." }] },
  { slug: "citadel-northeast-corridor-investors", title: "Citadel and Northeast Corridor: New York to Boston Investors", metaDescription: "The Northeast Corridor has the highest concentration of financially sophisticated retail investors and the most powerful state enforcement tools.", category: "Geographic", intro: "The New York-Boston corridor has both the most sophisticated investors and most powerful enforcement tools for PFOF accountability.", sections: [{ heading: "NY-MA Axis", body: "Coordinated enforcement by New York AG using the Martin Act and Massachusetts using existing PFOF precedents would be unprecedented in PFOF accountability history." }] },
  { slug: "citadel-southern-investors", title: "Citadel PFOF and Southern Investors: The Deep South Story", metaDescription: "Southern retail investors face PFOF with less state enforcement infrastructure. NASAA multistate action needed.", category: "Geographic", intro: "Southern states have significant retail investor populations but historically less aggressive securities enforcement than Northern states.", sections: [{ heading: "Enforcement Gap", body: "Mississippi, Alabama, and Arkansas have PFOF jurisdiction but limited enforcement history. NASAA coordination would be essential for meaningful Southern state action." }] },
  { slug: "citadel-insurance-sector-investors", title: "Insurance Industry Workers and PFOF: Hartford to Columbus", metaDescription: "Insurance workers in Connecticut, Ohio, and Indiana hold significant retirement savings subject to Citadel PFOF.", category: "Demographic", intro: "The insurance industry belt from Hartford to Columbus has millions of workers with retirement savings at PFOF-dependent discount brokers.", sections: [{ heading: "Insurance Belt", body: "Connecticut, Ohio, Indiana, and Iowa insurance sector workers 401(k) assets are predominantly at discount brokers routing to Citadel." }] },
  { slug: "citadel-military-investors", title: "Citadel PFOF and Military Investors: Service Members Savings", metaDescription: "US military personnel are significant retail investors. Their discount brokerage trades route to Citadel through PFOF.", category: "Demographic", intro: "Service members and veterans managing retirement savings through discount brokers face the same PFOF harms as civilians.", sections: [{ heading: "JAG Assistance", body: "Service members who believe they have been harmed by PFOF can seek initial guidance through JAG legal assistance programs." }] },
  { slug: "citadel-market-making-fixed-income", title: "Citadel in Bond Markets: PFOF-Like Conflicts in Fixed Income", metaDescription: "Citadel Treasury primary dealer status extends market-making dominance to less transparent fixed income markets.", category: "Analysis", intro: "Citadel 2021 primary dealer designation extended its PFOF-like model to sovereign debt — the world largest market.", sections: [{ heading: "Primary Dealer Risk", body: "Citadel primary dealer status across equities, options, and treasuries represents unprecedented market-making concentration with no systemic risk framework." }] },
  { slug: "citadel-crypto-retail-harm", title: "Citadel in Crypto: PFOF Conflicts Expand to Digital Assets", metaDescription: "Citadel crypto expansion through EDX Markets brings PFOF-like conflicts to digital assets with even less regulatory protection.", category: "Analysis", intro: "EDX Markets, backed by Citadel, extends market-making PFOF-like conflicts to crypto with zero equivalent disclosure requirements.", sections: [{ heading: "EDX Markets", body: "EDX Markets launched 2023 backed by Citadel, Fidelity, and Schwab. Citadel as market maker raises PFOF-like questions in markets with no disclosure requirements." }] },
  { slug: "citadel-retail-investor-statistics", title: "Retail Investor Statistics: Who Uses PFOF-Dependent Brokers", metaDescription: "How many retail investors are affected by Citadel PFOF? Demographics, state breakdowns, and account statistics.", category: "Education", intro: "An estimated 130 million U.S. retail brokerage accounts exist — the vast majority at PFOF-dependent brokers routing orders to Citadel Securities.", sections: [{ heading: "Account Counts", body: "130 million retail brokerage accounts at PFOF-dependent brokers, 13M+ Robinhood users alone, 30M+ at Schwab/TD Ameritrade combined — all routing to Citadel." }, { heading: "Demographics", body: "Young investors disproportionately use PFOF-dependent discount apps. Minority investors were specifically targeted by Robinhood marketing. Rural investors lack alternatives." }] },
  { slug: "citadel-pfof-academic-research", title: "What Academic Research Says About PFOF and Retail Investor Harm", metaDescription: "Academic economists have studied PFOF for decades. The evidence consistently shows retail investors receive worse execution through PFOF arrangements.", category: "Education", intro: "The academic literature on PFOF is extensive and consistent: retail investors are systematically harmed by PFOF-driven order routing to wholesale market makers.", sections: [{ heading: "Key Studies", body: "SEC Division of Economic Research (2021), Battalio et al. (2016), Angel et al. (multiple), and others consistently find PFOF associated with inferior retail execution quality compared to competitive exchange routing." }, { heading: "Industry Counter-Claims", body: "Citadel and broker partners fund their own research claiming PFOF benefits retail investors through price improvement. Independent academic review consistently finds these claims do not survive scrutiny." }] },
  { slug: "citadel-pfof-versus-commission", title: "PFOF vs. Commission: Which Model Is Better for Retail Investors", metaDescription: "The hidden cost of PFOF-funded zero-commission trading versus transparent per-trade commissions. Which is actually cheaper for retail investors?", category: "Education", intro: "The commission vs. PFOF debate has a clear answer: transparent commissions with best execution are better for most retail investors than zero-commission PFOF trading.", sections: [{ heading: "The Math", body: "For investors who trade more than a few times per month, the PFOF execution quality degradation exceeds traditional commission costs. For very infrequent traders, PFOF costs may be lower in absolute terms — but the conflict of interest remains regardless." }, { heading: "Fidelity Proof", body: "Fidelity offers zero commissions without PFOF for equity orders — proving the zero-commission model does not require PFOF. Fidelity simply earns revenue from other sources." }] },
  { slug: "citadel-pfof-reform-proposals", title: "All the PFOF Reform Proposals That Have Failed: A Complete Record", metaDescription: "The SEC, Congress, and state regulators have proposed dozens of PFOF reforms. Most have failed. The Ethics Reporter documents the complete record.", category: "Regulatory", intro: "A comprehensive record of PFOF reform proposals, their status, and why they failed to become effective policy.", sections: [{ heading: "SEC Proposals", body: "SEC Chair Gensler 2022-2024 market structure reforms: Order Competition Rule (never finalized), tick size reforms (partially adopted), access fee reforms (modified). None addressed structural PFOF conflict." }, { heading: "Congressional Proposals", body: "Multiple bills have been introduced to restrict or ban PFOF since 2021. None have passed committee. Key opponents received Griffin political contributions." }, { heading: "State Actions", body: "Massachusetts: $7.5M Robinhood settlement (2020). Other states: minimal specific PFOF enforcement actions. Federal inaction continues to leave state action as the only viable path." }] },
  { slug: "citadel-interview-kenneth-griffin", title: "Kenneth Griffin on PFOF: What He Has Said in Public Statements", metaDescription: "Kenneth Griffin has defended PFOF in Congressional testimony, media interviews, and public statements. The Ethics Reporter reviews his arguments against the evidence.", category: "Profile", intro: "Griffin has consistently defended PFOF publicly — in Congressional testimony, media interviews, and SEC comment letters. The Ethics Reporter reviews his arguments and the evidence against them.", sections: [{ heading: "Congressional Testimony", body: "At the February 2021 House hearing, Griffin testified that Citadel Securities had no role in Robinhood halting GameStop trading and that PFOF benefits retail investors through price improvement. Both claims have been contested." }, { heading: "The Price Improvement Defense", body: "Griffin consistently argues Citadel provides price improvement that exceeds any execution quality degradation. Academic research disputes this claim, finding that competitive exchange execution would provide materially better prices on average." }] },

{ slug: "citadel-pfof-sec-study-2021", title: "The 2021 SEC PFOF Study: What Federal Regulators Found", metaDescription: "The SEC own 2021 PFOF study documented inferior execution at PFOF-dependent brokers.", category: "Regulatory", intro: "The 2021 SEC PFOF Study: What Federal Regulators Found", sections: [{ heading: "Overview", body: "The SEC own 2021 PFOF study documented inferior execution at PFOF-dependent brokers." }] },
  { slug: "citadel-pfof-robinhood-2020", title: "Robinhood PFOF 2020: The Year Everything Changed", metaDescription: "2020 was the defining year for Robinhood-Citadel PFOF with .5B in payments and SEC enforcement.", category: "History", intro: "Robinhood PFOF 2020: The Year Everything Changed", sections: [{ heading: "Overview", body: "2020 was the defining year for Robinhood-Citadel PFOF with .5B in payments and SEC enforcement." }] },
  { slug: "citadel-market-maker-number-one", title: "How Citadel Became Number One: The Rise of the Dominant Market Maker", metaDescription: "How Citadel Securities rose to handle 40% of retail equity flow through technology, PFOF payments, and regulatory influence.", category: "Profile", intro: "How Citadel Became Number One: The Rise of the Dominant Market Maker", sections: [{ heading: "Overview", body: "How Citadel Securities rose to handle 40% of retail equity flow through technology, PFOF payments, and regulatory influence." }] },
  { slug: "citadel-meme-stocks-amc", title: "AMC and Citadel: The Second Meme Stock Market Structure Conflict", metaDescription: "AMC experienced the same January 2021 trading restrictions as GameStop, exposing identical Citadel-Robinhood structural conflicts.", category: "Investigation", intro: "AMC and Citadel: The Second Meme Stock Market Structure Conflict", sections: [{ heading: "Overview", body: "AMC experienced the same January 2021 trading restrictions as GameStop, exposing identical Citadel-Robinhood structural conflicts." }] },
  { slug: "citadel-market-making-nyse", title: "Citadel Securities on Every Exchange: Market Maker Omnipresence", metaDescription: "Citadel is registered on NYSE, NASDAQ, CBOE, and every major exchange making its presence in retail execution inescapable.", category: "Profile", intro: "Citadel Securities on Every Exchange: Market Maker Omnipresence", sections: [{ heading: "Overview", body: "Citadel is registered on NYSE, NASDAQ, CBOE, and every major exchange making its presence in retail execution inescapable." }] },
  { slug: "citadel-sec-best-execution-rule", title: "SEC Best Execution Rule Reform: Proposed, Lobbied, Diluted", metaDescription: "SEC proposed strengthening best execution rules in 2022. Citadel lobbied. The final rule was substantially weaker than proposed.", category: "Regulatory", intro: "SEC Best Execution Rule Reform: Proposed, Lobbied, Diluted", sections: [{ heading: "Overview", body: "SEC proposed strengthening best execution rules in 2022. Citadel lobbied. The final rule was substantially weaker than proposed." }] },
  { slug: "citadel-pfof-class-sizes", title: "PFOF Class Action Settlement Sizes: What Past Cases Reveal", metaDescription: "PFOF class action settlements have been modest relative to estimated harm, reflecting difficulties in proving individual execution quality damages.", category: "Legal", intro: "PFOF Class Action Settlement Sizes: What Past Cases Reveal", sections: [{ heading: "Overview", body: "PFOF class action settlements have been modest relative to estimated harm, reflecting difficulties in proving individual execution quality damages." }] },
  { slug: "citadel-pfof-broker-list", title: "Which Brokers Route to Citadel Securities Through PFOF?", metaDescription: "Complete list of major retail brokers that use PFOF arrangements with Citadel Securities, and which do not.", category: "Education", intro: "Which Brokers Route to Citadel Securities Through PFOF?", sections: [{ heading: "Overview", body: "Complete list of major retail brokers that use PFOF arrangements with Citadel Securities, and which do not." }] },
  { slug: "citadel-pfof-what-happens-if-banned", title: "What Would Happen If PFOF Were Banned Tomorrow?", metaDescription: "International evidence from UK and EU ban shows PFOF prohibition would improve retail execution quality and reduce structural broker-customer conflicts.", category: "Analysis", intro: "What Would Happen If PFOF Were Banned Tomorrow?", sections: [{ heading: "Overview", body: "International evidence from UK and EU ban shows PFOF prohibition would improve retail execution quality and reduce structural broker-customer conflicts." }] },
  { slug: "citadel-pfof-investor-advocate", title: "How Retail Investors Can Advocate for PFOF Reform", metaDescription: "Practical guide to PFOF investor advocacy from SEC comments to Congressional contact.", category: "Action", intro: "How Retail Investors Can Advocate for PFOF Reform", sections: [{ heading: "Overview", body: "Practical guide to PFOF investor advocacy from SEC comments to Congressional contact." }] },
  { slug: "citadel-market-making-2025", title: "Citadel Securities in 2025: The State of PFOF Accountability", metaDescription: "Current state of Citadel dominance, regulatory environment, and PFOF accountability efforts in 2025.", category: "Current", intro: "Citadel Securities in 2025: The State of PFOF Accountability", sections: [{ heading: "Overview", body: "Current state of Citadel dominance, regulatory environment, and PFOF accountability efforts in 2025." }] },
  { slug: "citadel-pfof-whistleblower-awards", title: "SEC Whistleblower Awards for PFOF Violations: What Is Available", metaDescription: "The SEC whistleblower program has paid .5 billion. PFOF violation tips from industry insiders can qualify for major awards.", category: "Action", intro: "SEC Whistleblower Awards for PFOF Violations: What Is Available", sections: [{ heading: "Overview", body: "The SEC whistleblower program has paid .5 billion. PFOF violation tips from industry insiders can qualify for major awards." }] },
  { slug: "citadel-spread-capture-math", title: "Citadel Spread Capture: The Math Behind Billions in Profits", metaDescription: "Step-by-step explanation of how Citadel Securities earns billions by capturing fractions of cents on millions of retail trades daily.", category: "Education", intro: "Citadel Spread Capture: The Math Behind Billions in Profits", sections: [{ heading: "Overview", body: "Step-by-step explanation of how Citadel Securities earns billions by capturing fractions of cents on millions of retail trades daily." }] },
  { slug: "citadel-broker-routing-agreements", title: "PFOF Routing Agreements: The Contracts Between Brokers and Citadel", metaDescription: "PFOF routing agreements between brokers and Citadel Securities are secret contracts that determine how retail orders are sold and executed.", category: "Investigation", intro: "PFOF Routing Agreements: The Contracts Between Brokers and Citadel", sections: [{ heading: "Overview", body: "PFOF routing agreements between brokers and Citadel Securities are secret contracts that determine how retail orders are sold and executed." }] },
  { slug: "citadel-market-maker-systemic", title: "Citadel as Systemic Market Infrastructure: Too Important to Regulate?", metaDescription: "Citadel systemically important position in retail markets gives it implicit political protection from aggressive regulatory action.", category: "Analysis", intro: "Citadel as Systemic Market Infrastructure: Too Important to Regulate?", sections: [{ heading: "Overview", body: "Citadel systemically important position in retail markets gives it implicit political protection from aggressive regulatory action." }] },
  { slug: "citadel-pfof-economic-harm-states", title: "State-by-State Economic Harm from PFOF: Estimating the Damage", metaDescription: "Economic harm from PFOF is geographically distributed. The Ethics Reporter estimates state-level execution quality degradation from Citadel practices.", category: "Analysis", intro: "State-by-State Economic Harm from PFOF: Estimating the Damage", sections: [{ heading: "Overview", body: "Economic harm from PFOF is geographically distributed. The Ethics Reporter estimates state-level execution quality degradation from Citadel practices." }] },
  { slug: "citadel-retail-investor-protection", title: "Retail Investor Protection and PFOF: The Gap Between Law and Reality", metaDescription: "Securities law promises retail investor protection. PFOF demonstrates the gap between legal protections on paper and actual market outcomes.", category: "Regulatory", intro: "Retail Investor Protection and PFOF: The Gap Between Law and Reality", sections: [{ heading: "Overview", body: "Securities law promises retail investor protection. PFOF demonstrates the gap between legal protections on paper and actual market outcomes." }] },
  { slug: "citadel-market-structure-101", title: "U.S. Equity Market Structure 101: Where Citadel Fits", metaDescription: "Understanding the full U.S. equity market structure reveals how Citadel Securities occupies a structural chokepoint in retail investor access.", category: "Education", intro: "U.S. Equity Market Structure 101: Where Citadel Fits", sections: [{ heading: "Overview", body: "Understanding the full U.S. equity market structure reveals how Citadel Securities occupies a structural chokepoint in retail investor access." }] },
  { slug: "citadel-pfof-national-security", title: "PFOF and National Security: The Foreign Ownership Dimension", metaDescription: "Questions about foreign ownership of PFOF-dependent brokers like Webull and Citadel crypto market-making raise national security dimensions.", category: "Analysis", intro: "PFOF and National Security: The Foreign Ownership Dimension", sections: [{ heading: "Overview", body: "Questions about foreign ownership of PFOF-dependent brokers like Webull and Citadel crypto market-making raise national security dimensions." }] },
  { slug: "citadel-impact-small-investors", title: "How Citadel PFOF Specifically Harms Small Investors Most", metaDescription: "Small investors with modest account balances are disproportionately harmed by PFOF because the hidden execution cost represents a larger percentage of their capital.", category: "Education", intro: "How Citadel PFOF Specifically Harms Small Investors Most", sections: [{ heading: "Overview", body: "Small investors with modest account balances are disproportionately harmed by PFOF because the hidden execution cost represents a larger percentage of their capital." }] },
];

// ── MAIN AGGREGATOR ──────────────────────────────────────────────────────

export type CitadelPageType =
  | "state-investors"
  | "state-ag"
  | "state-donations"
  | "state-regulator"
  | "topic"
  | "finra-district"
  | "fed-district"
  | "politician"
  | "broker"
  | "city"
  | "specialty";

export interface CitadelPage {
  slug: string;
  type: CitadelPageType;
  title: string;
  metaDescription: string;
}


export function getAllCitadelPageSlugs(): string[] {
  const all: string[] = [];

  // State-derived pages (4 × 52 = 208)
  for (const s of citadelStatesData) {
    all.push(`${s.slug}-citadel-investors`);
    all.push(`${s.slug}-citadel-attorney-general`);
    all.push(`kenneth-griffin-${s.slug}-donations`);
    all.push(`${s.slug}-securities-regulator-citadel`);
  }

  // Topic pages
  const allTopics = [...citadelTopicPages, ...(citadelTopicsExtended || []), ...(citadelTopicsBatch4 || [])];
  const seenTopicSlugs = new Set<string>();
  for (const t of allTopics) {
    if (!seenTopicSlugs.has(t.slug)) { seenTopicSlugs.add(t.slug); all.push(t.slug); }
  }

  // Deduplicate specialty pages (some may overlap with topics)
  const seen = new Set<string>(all);
  const addUnique = (slug: string) => { if (!seen.has(slug)) { seen.add(slug); all.push(slug); } };

  // FINRA districts
  for (const d of finraDistrictPages) addUnique(d.slug);

  // Fed districts
  for (const d of fedDistrictPages) addUnique(d.slug);

  // Politician pages
  for (const p of politicianPages) addUnique(p.slug);

  // Broker pages
  for (const b of brokerPages) addUnique(b.slug);

  // City pages
  for (const c of cityPages) addUnique(c.slug);

  // Specialty pages
  for (const s of specialtyPages) addUnique(s.slug);

  return all;
}

export type CitadelPageData =
  | { type: "state-investors"; state: CitadelStateData }
  | { type: "state-ag"; state: CitadelStateData }
  | { type: "state-donations"; state: CitadelStateData }
  | { type: "state-regulator"; state: CitadelStateData }
  | { type: "topic"; topic: CitadelTopicPage }
  | { type: "finra-district"; district: FinraDistrictPage }
  | { type: "fed-district"; district: FedDistrictPage }
  | { type: "politician"; politician: PoliticianPage }
  | { type: "broker"; broker: BrokerPage }
  | { type: "city"; city: CityPage }
  | { type: "specialty"; specialty: SpecialtyPage };

export function getCitadelPageData(slug: string): CitadelPageData | null {
  // State-investors
  for (const s of citadelStatesData) {
    if (slug === `${s.slug}-citadel-investors`) return { type: "state-investors", state: s };
    if (slug === `${s.slug}-citadel-attorney-general`) return { type: "state-ag", state: s };
    if (slug === `kenneth-griffin-${s.slug}-donations`) return { type: "state-donations", state: s };
    if (slug === `${s.slug}-securities-regulator-citadel`) return { type: "state-regulator", state: s };
  }

  // Topics
  const _topics = [...citadelTopicPages, ...(citadelTopicsExtended || []), ...(citadelTopicsBatch4 || [])];
  const topic = _topics.find((t) => t.slug === slug);
  if (topic) return { type: "topic", topic };

  // FINRA districts
  const finra = finraDistrictPages.find((d) => d.slug === slug);
  if (finra) return { type: "finra-district", district: finra };

  // Fed districts
  const fed = fedDistrictPages.find((d) => d.slug === slug);
  if (fed) return { type: "fed-district", district: fed };

  // Politicians
  const politician = politicianPages.find((p) => p.slug === slug);
  if (politician) return { type: "politician", politician };

  // Brokers
  const broker = brokerPages.find((b) => b.slug === slug);
  if (broker) return { type: "broker", broker };

  // Cities
  const city = cityPages.find((c) => c.slug === slug);
  if (city) return { type: "city", city };

  // Specialty
  const specialty = specialtyPages.find((s) => s.slug === slug);
  if (specialty) return { type: "specialty", specialty };

  return null;
}

export function getPageMetadata(slug: string): { title: string; description: string } | null {
  const data = getCitadelPageData(slug);
  if (!data) return null;

  switch (data.type) {
    case "state-investors":
      return {
        title: `Citadel Securities and ${data.state.name} Investors | The Ethics Reporter`,
        description: `How Citadel Securities' PFOF practices affect ${data.state.retailInvestors}. Regulatory options and investor rights in ${data.state.name}.`,
      };
    case "state-ag":
      return {
        title: `${data.state.name} Attorney General Citadel Securities | The Ethics Reporter`,
        description: `${data.state.ag} has authority to investigate Citadel Securities PFOF practices affecting ${data.state.name} investors. The Ethics Reporter examines the case for state action.`,
      };
    case "state-donations":
      return {
        title: `Kenneth Griffin ${data.state.name} Political Donations | The Ethics Reporter`,
        description: `Kenneth Griffin has given ${data.state.griffinTotalEstimate} to ${data.state.keyRecipients}. The Ethics Reporter traces the money and its regulatory implications.`,
      };
    case "state-regulator":
      return {
        title: `${data.state.securitiesRegulator} and Citadel Securities | The Ethics Reporter`,
        description: `The ${data.state.securitiesRegulatorFull} has jurisdiction over Citadel Securities practices affecting ${data.state.name} investors. Here's what regulators should do.`,
      };
    case "topic":
      return { title: data.topic.metaTitle, description: data.topic.metaDescription };
    case "finra-district":
      return {
        title: `${data.district.name} and Citadel Securities | FINRA Oversight | The Ethics Reporter`,
        description: `FINRA ${data.district.name} oversight of Citadel Securities' market-making practices affecting retail investors in ${data.district.states.join(", ")}.`,
      };
    case "fed-district":
      return {
        title: `${data.district.name} and Citadel Securities | Federal Reserve Oversight | The Ethics Reporter`,
        description: `How Citadel Securities' PFOF practices affect retail investors in the ${data.district.name}, covering ${data.district.states.slice(0, 3).join(", ")}, and more.`,
      };
    case "politician":
      return {
        title: `Kenneth Griffin Donation to ${data.politician.name} | The Ethics Reporter`,
        description: `Kenneth Griffin donated ${data.politician.griffinAmount} to ${data.politician.name} (${data.politician.party}-${data.politician.state}). ${data.politician.relevance.slice(0, 120)}`,
      };
    case "broker":
      return {
        title: `Citadel Securities and ${data.broker.broker}: The PFOF Relationship | The Ethics Reporter`,
        description: `Citadel Securities and ${data.broker.broker}: ${data.broker.description.slice(0, 140)}`,
      };
    case "city":
      return {
        title: `Citadel Securities and ${data.city.city} Investors | The Ethics Reporter`,
        description: `How Citadel Securities' payment for order flow practices affect retail investors in ${data.city.city}, ${data.city.state}.`,
      };
    case "specialty":
      return { title: data.specialty.title, description: data.specialty.metaDescription };
  }
}

export const CITADEL_HUB_SLUG = "citadel";
