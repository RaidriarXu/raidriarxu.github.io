import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// Original typographic artwork; no generated product screenshot or client data.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f8f7f3"/>
<path d="M65 104H1135M65 546H1135" stroke="#d9dacd"/>
<text x="65" y="72" font-family="Arial,sans-serif" font-size="37" font-weight="bold" letter-spacing="-3" fill="#292b27">hx<tspan fill="#b94a26">.</tspan></text>
<text x="1135" y="70" text-anchor="end" font-family="Arial,sans-serif" font-size="15" letter-spacing="2" fill="#66685f">UIUC · MAY 2027</text>
<text x="65" y="182" font-family="Arial,sans-serif" font-size="16" letter-spacing="3" fill="#66685f">HONGYU XU / SOFTWARE ENGINEER</text>
<text x="62" y="280" font-family="Arial,sans-serif" font-size="76" letter-spacing="-3" fill="#292b27">Turning everyday friction</text>
<text x="62" y="378" font-family="Georgia,serif" font-size="86" font-style="italic" letter-spacing="-3" fill="#b94a26">into working software.</text>
<text x="65" y="480" font-family="Arial,sans-serif" font-size="20" fill="#66685f">Applied AI &amp; LLM agents · Full-stack engineering · Business automation</text>
<text x="65" y="586" font-family="Arial,sans-serif" font-size="14" fill="#66685f">SELECTED WORK</text>
<text x="1135" y="586" text-anchor="end" font-family="Arial,sans-serif" font-size="14" fill="#66685f">Tangerine Intelligence / CONE Lab / FQC</text>
</svg>`;
await mkdir("public/images", { recursive: true });
await sharp(Buffer.from(svg)).png().toFile("public/images/social-card.png");
console.log("Generated public/images/social-card.png (1200 × 630).");
