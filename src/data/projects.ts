export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectLocationHub {
  hub: string;
  villages: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  detailedParagraphs: string[];
  image: string;
  gallery: string[];
  stats: ProjectStat[];
  highlights?: string[];
  facilities?: string[];
  centers?: ProjectLocationHub[];
  supportTiers?: {
    title: string;
    amount: string;
    desc: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "meals-to-smile",
    title: "Meals to Smile",
    category: "Hunger Relief & Nutrition",
    tagline: "Nourishing underprivileged rural communities with dignity, warmth, and hope.",
    description:
      '"Meals to smile" is a compassionate project dedicated to providing nourishment to the underprivileged and impoverished communities in the rural regions of North India. With a heartfelt mission to alleviate hunger and foster hope, this initiative mobilizes volunteers to distribute wholesome meals directly to those in need. From nutritious staples to comforting dishes, the project aims to address food insecurity while promoting dignity and solidarity among recipients. Through grassroots efforts and community engagement, "Meals to smile" endeavors to make a meaningful impact by ensuring that every individual has access to sustenance and support.',
    detailedParagraphs: [
      '"Meals to smile" is a compassionate project dedicated to providing nourishment to the underprivileged and impoverished communities in the rural regions of North India.',
      'With a heartfelt mission to alleviate hunger and foster hope, this initiative mobilizes volunteers to distribute wholesome meals directly to those in need. From nutritious staples to comforting dishes, the project aims to address food insecurity while promoting dignity and solidarity among recipients.',
      'Through grassroots efforts and community engagement, "Meals to smile" endeavors to make a meaningful impact by ensuring that every individual has access to sustenance and support. In every meal shared, we build stronger, healthier, and more compassionate communities.',
    ],
    image: "/meal to smile/1.jpg",
    gallery: [
      "/meal to smile/1.jpg",
      "/meal to smile/2.jpg",
      "/meal to smile/3.jpg",
      "/meal to smile/4.jpg",
      "/meal to smile/5.jpg",
      "/meal to smile/6.jpg",
      "/meal to smile/7.jpg",
      "/meal to smile/8.jpg",
      "/meal to smile/9.jpg",
    ],
    stats: [
      { label: "Villages Reached", value: "125+" },
      { label: "Wholesome Meals Distributed", value: "12,550+" },
      { label: "Volunteers Mobilized", value: "85+" },
      { label: "Community Kitchens", value: "Active" },
    ],
    highlights: [
      "Wholesome, hot cooked meals prepared with high hygiene standards",
      "Direct village-to-village distribution covering remote regions",
      "Special focus on children, the elderly, and daily wage earners",
      "Fostering human dignity, solidarity, and hope through grassroots care",
    ],
    supportTiers: [
      { title: "Feed 10 Individuals", amount: "500", desc: "Provides fresh, wholesome meals to 10 needy people in rural villages." },
      { title: "Sponsor 50 Meals", amount: "2500", desc: "Supports a full day village food distribution drive." },
      { title: "Village Meal Drive", amount: "5000", desc: "Supplies nutritious meals to 100+ impoverished villagers." },
    ],
  },
  {
    slug: "sacred-learning-academy",
    title: "SACREd Learning Academy",
    category: "Ethical & Islamic Education",
    tagline: "Nurturing ethical values and moral character rooted in universal Islamic teachings.",
    description:
      'The "SACREd Learning Academy" is a comprehensive endeavor dedicated to nurturing ethical values and principles rooted in Islamic teachings. This initiative aims to imbue learners with a deep understanding of Islamic morals, virtues, and ethics, emphasizing concepts such as compassion, justice, humility, and integrity. Through engaging lessons, interactive discussions, and practical applications, the project seeks to cultivate a strong moral character and a sense of responsibility in students. By integrating Islamic teachings into everyday life scenarios, it aims to empower individuals to uphold moral values and make ethical decisions guided by Islamic principles. Collaborating closely with educators, scholars, and community leaders, the "SACREd Learning Academy" endeavors to foster a society grounded in righteousness and benevolence.',
    detailedParagraphs: [
      'The "SACREd Learning Academy" is a comprehensive endeavor dedicated to nurturing ethical values and principles rooted in Islamic teachings.',
      'This initiative aims to imbue learners with a deep understanding of Islamic morals, virtues, and ethics, emphasizing concepts such as compassion, justice, humility, and integrity. Through engaging lessons, interactive discussions, and practical applications, the project seeks to cultivate a strong moral character and a sense of responsibility in students.',
      'By integrating Islamic teachings into everyday life scenarios, it aims to empower individuals to uphold moral values and make ethical decisions guided by Islamic principles. Collaborating closely with educators, scholars, and community leaders, the "SACREd Learning Academy" endeavors to foster a society grounded in righteousness and benevolence.',
    ],
    image: "/academy.jpeg",
    gallery: [
      "/learning centre/1.jpg",
      "/learning centre/2.jpg",
      "/learning centre/3.jpg",
      "/learning centre/4.jpg",
      "/learning centre/5.jpg",
      "/learning centre/6.jpg",
      "/learning centre/7.jpg",
      "/learning centre/8.jpg",
      "/learning centre/9.jpg",
      "/learning centre/10.jpg",
      "/learning centre/11.jpg",
      "/learning centre/12.jpg",
      "/learning centre/14.jpg",
    ],
    stats: [
      { label: "Active Learning Centres", value: "06" },
      { label: "Enrolled Students", value: "240+" },
      { label: "Dedicated Educators", value: "18+" },
      { label: "Interactive Modules", value: "100%" },
    ],
    highlights: [
      "Moral philosophy, compassion, justice, and humility curriculum",
      "Interactive pedagogy integrating ethical values into everyday life",
      "Close collaboration with experienced scholars and community mentors",
      "Empowering students to lead positive social transformation",
    ],
    supportTiers: [
      { title: "Sponsor a Student's Books", amount: "750", desc: "Provides learning materials and activity kits for 1 student." },
      { title: "Monthly Student Sponsorship", amount: "1500", desc: "Covers monthly tuition, materials, and mentoring for a child." },
      { title: "Adopt a Learning Centre", amount: "10000", desc: "Supports operational costs, teachers' honorarium, and resources." },
    ],
  },
  {
    slug: "play-school-initiative",
    title: "Play School Initiative",
    category: "Early Childhood Transformation",
    tagline: "Sparking joy, foundational literacy, and Qur'anic learning for rural toddlers.",
    description:
      "In many villages, children grow up in environments lacking cleanliness and any meaningful connection to education. As a result, they often do not develop an interest in learning. Play schools can help bring about a positive change in this regard. By introducing young minds to the sweetness of the Qur'an along with English, Hindi, and engaging play-based activities, children in North Indian villages can begin to experience a new wave of transformation. The plan is to establish two pre-schools: one in Chharra Rafatpur, targeting the villages of Dhansari, Bhonai, Satrapur, and Sihavali; and another in Dadau, focusing on the villages of Alampur Fatehpur, Haivatpur Kotra, Bhikanpur, and Bhamori.",
    detailedParagraphs: [
      "In many villages, children grow up in environments lacking cleanliness and any meaningful connection to education. As a result, they often do not develop an interest in learning from an early age.",
      "Play schools can help bring about a positive and enduring change in this regard. By introducing young minds to the sweetness of the Qur'an along with English, Hindi, and engaging play-based activities, children in North Indian villages can begin to experience a new wave of educational and behavioral transformation.",
      "The comprehensive plan establishes two modern pre-schools: one in Chharra Rafatpur, targeting the villages of Dhansari, Bhonai, Satrapur, and Sihavali; and another in Dadau, focusing on the villages of Alampur Fatehpur, Haivatpur Kotra, Bhikanpur, and Bhamori.",
    ],
    image: "/ply.jpeg",
    gallery: [
      "/ply.jpeg",
      "/learning centre/1.jpg",
      "/learning centre/2.jpg",
      "/learning centre/5.jpg",
      "/learning centre/7.jpg",
      "/learning centre/10.jpg",
    ],
    stats: [
      { label: "Target Pre-Schools", value: "02" },
      { label: "Target Village Reach", value: "08+" },
      { label: "Tri-Language Focus", value: "En, Hi, Ar" },
      { label: "Play-Based Curriculum", value: "100%" },
    ],
    centers: [
      {
        hub: "Chharra Rafatpur Hub",
        villages: ["Dhansari", "Bhonai", "Satrapur", "Sihavali"],
      },
      {
        hub: "Dadau Hub",
        villages: ["Alampur Fatehpur", "Haivatpur Kotra", "Bhikanpur", "Bhamori"],
      },
    ],
    highlights: [
      "Engaging play-based sensory and cognitive development kits",
      "Sweet introduction to Qur'anic phonetics and foundational ethics",
      "Early English and Hindi alphabetization and conversational skills",
      "Clean, hygienic, and joyful classroom environment",
    ],
    supportTiers: [
      { title: "Play & Learning Kit", amount: "1000", desc: "Provides montessori-style toys, puzzles, and books for toddlers." },
      { title: "Classroom Setup Sponsor", amount: "5000", desc: "Helps furnish child-friendly desks, mats, and learning charts." },
      { title: "Pre-School Foundation Sponsor", amount: "15000", desc: "Helps establish educational infrastructure across rural hubs." },
    ],
  },
  {
    slug: "residential-campus",
    title: "SACREd Residential Campus",
    category: "Holistic Residential Education",
    tagline: "Empowering bright rural minds through world-class holistic boarding and AMU entrance prep.",
    description:
      "The SACREd residential campus initiative is designed to identify and nurture talented students from rural communities through a rigorous selection process that includes entrance examinations and interviews. The goal is to provide a holistic education that integrates religious learning with intellectual and academic development. A building has already been identified in the Chharra Rafatpur region to serve as the first campus. The proposed curriculum will include preparation for the AMU entrance examination, school-level education, foundational teachings of the Hanafi madhhab, and basic computer literacy. This initiative aims to uplift children who, due to poverty, are forced into labor at a young age, and those whose potential remains untapped because of inadequate educational infrastructure. By offering high-quality education and nurturing their talents, SACREd campuses aspire to cultivate a new generation capable of sparking revolutions of progress and dignity in every village they come from.",
    detailedParagraphs: [
      "The SACREd residential campus initiative is designed to identify and nurture talented students from rural communities through a rigorous selection process that includes entrance examinations and interviews. The goal is to provide a holistic education that integrates religious learning with intellectual and academic development.",
      "A building has already been identified in the Chharra Rafatpur region to serve as the first campus. The proposed curriculum will include preparation for the AMU entrance examination, school-level education, foundational teachings of the Hanafi madhhab, and basic computer literacy.",
      "This initiative aims to uplift children who, due to poverty, are forced into labor at a young age, and those whose potential remains untapped because of inadequate educational infrastructure. By offering high-quality education and nurturing their talents, SACREd campuses aspire to cultivate a new generation capable of sparking revolutions of progress and dignity in every village they come from.",
    ],
    image: "/residential.jpeg",
    gallery: [
      "/residential academy/1.jpg",
      "/residential.jpeg",
      "/academy.jpeg",
      "/team.jpeg",
    ],
    stats: [
      { label: "Campus Location", value: "Chharra Rafatpur" },
      { label: "Curriculum Focus", value: "AMU Prep & Hanafi Fiqh" },
      { label: "Modern Facility", value: "Computer Lab & Smart Class" },
      { label: "Selection Mode", value: "Entrance Exam & Interview" },
    ],
    facilities: [
      "Residential accommodation for students",
      "Nutritious daily meals & balanced diet",
      "Uniforms & study materials provided",
      "Modern Computer Lab for digital literacy",
      "Smart Classrooms with audio-visual learning",
      "Dedicated Prayer Hall & spiritual mentoring",
      "Comprehensive AMU Entrance Examination coaching",
      "Foundational Islamic & Hanafi madhhab curriculum",
    ],
    highlights: [
      "Rescuing talented children from the risk of premature child labor",
      "Complete residential boarding with round-the-clock supervision",
      "High academic standards paired with strong moral character",
      "Creating community leaders and scholar-intellectuals for tomorrow",
    ],
    supportTiers: [
      { title: "Student Boarding & Meal", amount: "3000", desc: "Covers boarding, nutritious food, and care for 1 student per month." },
      { title: "Smart Classroom Tech Unit", amount: "10000", desc: "Helps equip digital display and computer hardware for the lab." },
      { title: "Residential Scholar Sponsor", amount: "25000", desc: "Annual holistic scholarship covering living, coaching, and lodging." },
    ],
  },
  {
    slug: "shining-street",
    title: "Shining Street",
    category: "Slum & Street Children Outreach",
    tagline: "Bringing education, dignity, and a future to children in slums and streets.",
    description:
      "Across the streets and slums of North India, countless lives struggle without access to food, education, or identity—living without land, a fixed address, or basic rights. For these communities, education remains a distant dream. Shining Street began with the mission to identify and support children in these areas who show a readiness to learn, and to provide them with foundational education. Through basic learning, we aim to foster social awareness and moral values, helping build a more disciplined and inclusive society. Sacred National envisions this as a transformative initiative—uplifting these children through formal education and guiding them into the mainstream of society.",
    detailedParagraphs: [
      "Across the streets and slums of North India, countless lives struggle without access to food, education, or identity—living without land, a fixed address, or basic rights. For these marginalized communities, education has historically remained a distant dream.",
      "Shining Street began with the mission to identify and support children in these areas who show a readiness to learn, and to provide them with foundational education right where they live.",
      "Through basic learning, literacy, and hygiene orientation, we aim to foster social awareness and moral values, helping build a more disciplined and inclusive society. Sacred National envisions this as a transformative initiative—uplifting these children through formal education and guiding them into the mainstream of society.",
    ],
    image: "/street.jpeg",
    gallery: [
      "/shining street/1.jpg",
      "/shining street/2.jpg",
      "/shining street/3.jpg",
      "/shining street/4.jpg",
    ],
    stats: [
      { label: "Community Focus", value: "Slums & Street Encampments" },
      { label: "Education Focus", value: "Foundational Literacy & Values" },
      { label: "Mainstreaming Pathway", value: "Active" },
      { label: "Hygiene & Care Kits", value: "Distributed" },
    ],
    highlights: [
      "On-site open-air and educational sessions directly in slum pockets",
      "Essential literacy, numeracy, and personal hygiene training",
      "Nutritional snack distribution to incentivize regular learning",
      "Direct pathway counseling to transition children into formal schools",
    ],
    supportTiers: [
      { title: "Street Child Learning Kit", amount: "500", desc: "Includes notebook, stationery, school bag, and hygiene essentials." },
      { title: "Monthly Slum Batch Sponsor", amount: "3500", desc: "Supports daily teaching, snacks, and materials for a slum cluster." },
      { title: "Mainstream School Transition", amount: "8000", desc: "Funds formal school admission fees, uniform, and books for a child." },
    ],
  },
  {
    slug: "sacred-drops",
    title: "Sacred Drops",
    category: "Clean Water & Borewell Installation",
    tagline: "Installing deep borewells and clean water sources for thirsty rural villages.",
    description:
      "Across thousands of homes, the absence of clean water leads to illness, hardship, and long daily treks—often by children and the elderly—just to fetch water. Through the compassion of many and in memory of departed loved ones, over 14 tube wells have been established, bringing relief and dignity to hundreds of families. You too can be part of this life-giving mission. Sponsor a water project in the name of someone you love, and bring clean water to the underserved villages of North India.",
    detailedParagraphs: [
      "Across thousands of homes in rural North India, the absence of clean drinking water leads to severe waterborne illness, hardship, and long daily treks—often by young children and the elderly—just to fetch a single bucket of water.",
      "Through the generosity of donors and dedicated contributions in memory of departed loved ones (Sadaqah Jariyah), over 14 tube wells and 12 borewells have been successfully established, bringing immediate relief, health, and dignity to hundreds of families.",
      "You too can be part of this life-giving mission. Sponsor a complete water project in your name or in the name of someone you love, ensuring generations of villagers have continuous access to fresh, uncontaminated water.",
    ],
    image: "/drop.jpeg",
    gallery: [
      "/drops/1.jpg",
      "/drops/2.jpg",
      "/drops/3.jpg",
      "/drops/4.jpg",
    ],
    stats: [
      { label: "Established Borewells", value: "12+" },
      { label: "Active Tube Wells", value: "14+" },
      { label: "Direct Beneficiaries", value: "950+" },
      { label: "Water Quality Testing", value: "100% Pure" },
    ],
    highlights: [
      "Deep drilling to reach clean, sweet underground aquifers",
      "Heavy-duty hand pumps and electric borewell setups built to last",
      "Sponsorship plaques installed with dedicated names / memorials",
      "Eliminating kilometers of daily walking burdens for rural mothers and children",
    ],
    supportTiers: [
      { title: "Hand Pump Maintenance", amount: "1500", desc: "Maintains and repairs village water pumps to ensure zero downtime." },
      { title: "Partial Tube Well Share", amount: "7500", desc: "Contributes towards drilling and installing a community water source." },
      { title: "Complete Dedicated Borewell", amount: "25000", desc: "Full sponsorship of a named deep borewell with plaque dedication." },
    ],
  },
  {
    slug: "doctors-at-doors",
    title: "Doctors at Doors",
    category: "Mobile Healthcare & Medical Camps",
    tagline: "Delivering free medical consultations, essential diagnostic care, and medications directly to village doorsteps.",
    description:
      '"Doctors on Doors" is a compassionate endeavor dedicated to delivering vital medical care to impoverished communities in the rural regions of North India. This innovative project mobilizes healthcare professionals to provide consultations, free medications, and medical camps directly to those in need. By bringing healthcare services directly to underserved areas, "Doctors on Doors" aims to address barriers to access and improve health outcomes for vulnerable populations. With a commitment to serving the marginalized, this project strives to alleviate suffering, promote wellness, and empower individuals to lead healthier lives. Through collaboration and community engagement, "Doctors at Doors" endeavors to make a meaningful difference in the lives of the most vulnerable.',
    detailedParagraphs: [
      '"Doctors on Doors" is a compassionate endeavor dedicated to delivering vital medical care to impoverished communities in the rural regions of North India.',
      'This innovative project mobilizes qualified healthcare professionals, doctors, and nurses to provide free consultations, essential medications, and comprehensive diagnostic health camps directly to those who cannot afford travel or medical treatment.',
      'By bringing healthcare services directly to underserved areas, "Doctors at Doors" aims to address barriers to access and improve health outcomes for vulnerable populations. With an unwavering commitment to serving the marginalized, this project strives to alleviate suffering, promote wellness, and empower individuals to lead healthier, happier lives.',
    ],
    image: "/doctor.jpeg",
    gallery: [
      "/doctor at door/1.jpg",
      "/doctor at door/2.jpg",
      "/doctor at door/3.jpg",
    ],
    stats: [
      { label: "Mobile Health Camps", value: "Regular" },
      { label: "Free Consultations", value: "100% Free" },
      { label: "Medications Provided", value: "Essential & Free" },
      { label: "Volunteer Doctors", value: "Specialist Team" },
    ],
    highlights: [
      "On-site doctor consultations and physical examinations",
      "Free distribution of prescribed generic and life-saving medicines",
      "Blood sugar, blood pressure, and basic vital diagnostic testing",
      "Preventive health, sanitation, and maternal health education",
    ],
    supportTiers: [
      { title: "Patient Medicine Kit", amount: "500", desc: "Provides prescription antibiotics, vitamins, and pain relief for a patient." },
      { title: "Doctor Mobile Camp Kit", amount: "3000", desc: "Supplies diagnostic tools, test strips, and first aid for a village camp." },
      { title: "Sponsor a Full Day Medical Camp", amount: "12000", desc: "Covers doctors, transport, and free medicine for 150+ villagers." },
    ],
  },
  {
    slug: "ration-of-love",
    title: "Ration of Love",
    category: "Emergency Food Kits & Relief",
    tagline: "Monthly staple food kits protecting impoverished rural families against hunger.",
    description:
      "Ration of love is a humanitarian initiative dedicated to supporting underprivileged and struggling families in rural India. Through this program, we provide essential ration kits containing rice, wheat, pulses, oil, and other daily necessities to poor villagers who face food insecurity. Each ration kit represents more than just food: it represents care, compassion, and community support. The program focuses especially on families affected by poverty, unemployment, and natural hardships, ensuring that help reaches the most remote and neglected village.",
    detailedParagraphs: [
      "Ration of love is a humanitarian initiative dedicated to supporting underprivileged and struggling families in rural India.",
      "Through this program, we provide comprehensive monthly ration kits containing rice, wheat flour, pulses, cooking oil, spices, and other daily necessities to poor villagers who face severe food insecurity.",
      "Each ration kit represents more than just food: it represents care, compassion, and community solidarity. The program focuses especially on widows, disabled individuals, and families affected by extreme poverty, ensuring that help reaches the most remote and neglected villages without delay.",
    ],
    image: "/ration.jpeg",
    gallery: [
      "/ration/1.jpg",
      "/ration/2.jpg",
      "/meal to smile/3.jpg",
      "/meal to smile/4.jpg",
    ],
    stats: [
      { label: "Kit Composition", value: "Rice, Wheat, Dal, Oil" },
      { label: "Target Recipients", value: "Impoverished Families" },
      { label: "Coverage", value: "Remote Rural Clusters" },
      { label: "Relief Response", value: "Immediate" },
    ],
    highlights: [
      "Carefully curated monthly grocery packages covering complete family needs",
      "High quality, non-perishable grain and pulse staples",
      "Priority assistance for widows, orphans, and daily wage families",
      "Direct household delivery ensuring privacy and honor of recipients",
    ],
    supportTiers: [
      { title: "1 Month Family Ration Kit", amount: "1500", desc: "Supplies rice, wheat, pulses, cooking oil, and spices for 1 family." },
      { title: "3 Families Relief Pack", amount: "4500", desc: "Provides complete 1-month food security for 3 impoverished households." },
      { title: "Village Grocery Drive", amount: "15000", desc: "Distributes essential ration packages to 10 vulnerable families." },
    ],
  },
];
