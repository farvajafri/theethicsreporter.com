/**
 * Ethics Reporter — Branded Image Prompt Generator
 * 
 * Generates consistent editorial images via Gemini that maintain brand identity:
 * - Dark, moody color palette (deep navy, charcoal, maroon #8B0000 accents)
 * - Dramatic chiaroscuro lighting (strong side/top light, deep shadows)
 * - Legal/judicial visual elements (gavels, scales, columns, documents)
 * - Photorealistic editorial style — think ProPublica or The Marshall Project
 * - 16:9 landscape, no text/words in the image
 * - Each image is unique to its article but visually cohesive with the brand
 */

// Visual motifs mapped to article keywords
const MOTIFS: Record<string, string> = {
  disbarment: "a lawyer's nameplate face-down on a mahogany desk, bar certificate torn in half",
  suspension: "a gavel resting on its side with a red ribbon wrapped around the handle",
  reprimand: "an open disciplinary letter on a judge's desk under a brass desk lamp",
  judge: "an empty judge's bench in a dimly lit courtroom, the chair pushed back",
  fraud: "scattered financial documents and a broken fountain pen on a leather blotter",
  theft: "an open empty safe in a law office, papers strewn on the floor",
  misconduct: "courthouse hallway with dramatic shadows cast through tall windows",
  neglect: "an unanswered phone on a cluttered attorney's desk, dust motes in light beam",
  conviction: "courthouse steps at dusk with long shadows from the columns",
  ethics: "the scales of justice slightly tilted on a marble pedestal, dramatic lighting",
  florida: "art deco courthouse facade with palm tree shadows, golden hour",
  "new york": "neoclassical courthouse columns in rain, wet stone reflecting streetlights",
  maryland: "brick federal courthouse with bare winter trees, overcast sky",
  california: "modernist courthouse with harsh california sun casting geometric shadows",
  tennessee: "stone courthouse with southern columns, foggy morning light",
  indiana: "limestone courthouse at dawn, frost on the steps",
  georgia: "antebellum courthouse with spanish moss shadows",
  illinois: "chicago-style courthouse corridor with dramatic overhead lighting",
  "new jersey": "art deco courthouse lobby with terrazzo floors reflecting overhead light",
  patent: "a stack of patent documents beside a magnifying glass on a wood desk",
  immigration: "immigration court waiting room chairs in harsh fluorescent light",
  dui: "a set of car keys beside a gavel on a judge's bench",
  domestic: "a cracked family photo frame on a law office bookshelf",
  probate: "an aged will document under a brass reading lamp",
  bankruptcy: "empty office with only a desk and single banker's lamp remaining",
};

function getMotif(title: string): string {
  const lower = title.toLowerCase();
  
  // Check for specific motifs
  for (const [keyword, motif] of Object.entries(MOTIFS)) {
    if (lower.includes(keyword)) {
      return motif;
    }
  }
  
  // Default motif
  return "a closed law book and brass gavel on a dark wood surface, with a single shaft of light";
}

export function generateImagePrompt(title: string): string {
  const motif = getMotif(title);
  
  return [
    "Create an image:",
    "Photorealistic editorial photograph in the style of a legal affairs magazine cover.",
    `Scene: ${motif}.`,
    "Style: Dark, moody color palette dominated by deep navy, charcoal grays, and warm mahogany tones.",
    "A single accent of deep maroon (#8B0000) appears subtly — in a book spine, ribbon, wax seal, or fabric.",
    "Lighting: Dramatic chiaroscuro — strong directional light from one side creating deep shadows.",
    "Atmosphere: Somber, weighty, institutional. The mood of consequences and accountability.",
    "Composition: Cinematic 16:9 landscape. Shallow depth of field. Professional editorial photography.",
    "IMPORTANT: Do not include any text, words, letters, or numbers anywhere in the image.",
  ].join(" ");
}
