/**
 * Avatar Generation Script
 * 
 * Generates 22 single-portrait avatars for alumni journey map.
 * Each person gets consistent character appearance across life stages.
 * 
 * Run: node generate-avatars.js
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CHARACTERS = [
  {
    id: "alumni-frank-ji-2020",
    name: "Frank Ji",
    race: "Chinese East Asian",
    gender: "male",
    baseDescription: "short tousled black hair with slight volume, slim oval face, warm brown eyes",
    stages: [
      { age: 20, desc: "curious student, wearing dark blue hoodie with backpack strap visible, youthful energetic expression" },
      { age: 25, desc: "PhD researcher at Yale, wearing glasses and light grey sweater over collared shirt, thoughtful focused expression, holding small notebook" },
      { age: 30, desc: "AI startup founder in Shanghai, wearing navy blazer over white t-shirt, confident mature expression with subtle smile" }
    ]
  },
  {
    id: "alumni-marina-ross-1989",
    name: "Marina Ross",
    race: "White",
    gender: "female",
    baseDescription: "straight auburn shoulder-length hair, oval face with refined features, green eyes",
    stages: [
      { age: 20, desc: "art history student at Yale, wearing cream turtleneck sweater, thoughtful artistic expression, small silver earrings" },
      { age: 22, desc: "Yale graduate, wearing camel coat over cream turtleneck, holding leather sketchbook, confident artistic expression" },
      { age: 34, desc: "New York gallery professional, wearing tailored black blazer, pearl stud earrings, sophisticated confident look" },
      { age: 57, desc: "London independent curator, hair with graceful silver streaks, wearing olive green silk scarf over charcoal blazer, wise cultured expression" }
    ]
  },
  {
    id: "alumni-daniel-park-1998",
    name: "Daniel Park",
    race: "Korean East Asian",
    gender: "male",
    baseDescription: "neatly combed black hair with side part, angular jawline, sharp focused eyes",
    stages: [
      { age: 20, desc: "economics student in Seoul, wearing navy sweater, ambitious determined expression" },
      { age: 22, desc: "Yale economics student, wearing preppy blazer over button-down shirt, intellectual confident look" },
      { age: 28, desc: "Hong Kong investment banker, wearing charcoal business suit with tie, polished professional expression" },
      { age: 45, desc: "Singapore impact capital director, wearing tailored navy suit, silver temples, confident mature leadership presence" }
    ]
  },
  {
    id: "alumni-lucia-herrera-2007",
    name: "Lucia Herrera",
    race: "Latina",
    gender: "female",
    baseDescription: "thick wavy dark brown hair, expressive dark eyes, warm smile lines",
    stages: [
      { age: 18, desc: "Monterrey electronics enthusiast, wearing casual denim jacket, bright curious expression" },
      { age: 24, desc: "Yale engineering graduate student, wearing glasses and grey cardigan, technical focused expression, holding tablet" },
      { age: 30, desc: "Silicon Valley hardware engineer, wearing startup-casual hoodie over t-shirt, innovative energetic look" },
      { age: 42, desc: "Shenzhen robotics VP, wearing structured blazer, confident authoritative expression, leadership presence" }
    ]
  },
  {
    id: "alumni-owen-cheng-2014",
    name: "Owen Cheng",
    race: "Chinese East Asian",
    gender: "male",
    baseDescription: "medium-length black hair slightly swept back, gentle intellectual face, thoughtful eyes behind glasses",
    stages: [
      { age: 22, desc: "Vancouver youth observer, wearing casual flannel shirt, contemplative thoughtful expression" },
      { age: 28, desc: "Yale sociology PhD scholar, wearing tweed jacket over sweater, books under arm, academic focused look" },
      { age: 38, desc: "Toronto professor-policy consultant, wearing professorial corduroy jacket, wise approachable expression" }
    ]
  },
  {
    id: "alumni-priya-menon-2022",
    name: "Priya Menon",
    race: "South Asian Indian",
    gender: "female",
    baseDescription: "long black hair often in braid, warm brown eyes, kind compassionate face",
    stages: [
      { age: 20, desc: "Bengaluru youth idealist, wearing colorful salwar kameez, empathetic hopeful expression" },
      { age: 25, desc: "Yale medical student, wearing white coat over scrubs, stethoscope around neck, dedicated studious look" },
      { age: 30, desc: "Mumbai public health physician, wearing practical kurta with lab coat, determined compassionate expression" },
      { age: 38, desc: "Dubai physician-founder, wearing elegant professional attire, visionary confident expression, subtle jewelry" }
    ]
  }
];

const STYLE = "Cartoon hand-drawn stylish sketch portrait, expressive ink lines, clean color blocks, editorial illustration style, warm color palette, clean cream background, no text, shoulder-up bust shot, single person portrait";

function generatePrompt(character, stage, stageIndex) {
  const isFirst = stageIndex === 0;
  const anchorIntro = isFirst 
    ? `Single portrait of one ${character.race} ${character.gender === 'male' ? 'man' : 'woman'}, age ${stage.age}`
    : `Single portrait of same ${character.race} ${character.gender === 'male' ? 'man' : 'woman'}, now age ${stage.age}`;
  
  return `${anchorIntro}, ${character.baseDescription}, ${stage.desc}. ${STYLE}, one person only.`;
}

function generateAllPrompts() {
  const allPrompts = [];
  
  for (const char of CHARACTERS) {
    for (let i = 0; i < char.stages.length; i++) {
      const stage = char.stages[i];
      allPrompts.push({
        profileId: char.id,
        stageIndex: i,
        prompt: generatePrompt(char, stage, i),
        outputPath: join(__dirname, 'public/avatars/stages', char.id, `step-${i + 1}.png`)
      });
    }
  }
  
  return allPrompts;
}

const prompts = generateAllPrompts();
console.log(`Generated ${prompts.length} avatar prompts:`);
prompts.forEach((p, i) => {
  console.log(`\n${i + 1}. ${p.profileId} - Step ${p.stageIndex + 1}`);
  console.log(`   ${p.prompt.substring(0, 100)}...`);
  console.log(`   -> ${p.outputPath}`);
});

const outputPath = join(__dirname, 'prompts/avatar-generation-tasks.json');
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(prompts, null, 2));
console.log(`\n\nSaved to ${outputPath}`);
console.log(`\nRun: node generate-avatars.js`);
