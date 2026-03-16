# Amaan Portfolio 2026

A modern, high-performance portfolio website built with Next.js 15, Tailwind CSS v4, GSAP, and Three.js. Features smooth scrolling, custom cursor interactions, WebGL particle fields, and robust animations.

## Tech Stack
- **Framework:** Next.js 15 (App Router, React 19)
- **Styling:** Tailwind CSS v4
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** GSAP + Framer Motion
- **Scroll:** Lenis (Smooth ScrollProvider)
- **Email:** Resend
- **Icons:** Lucide React

## Getting Started

1. Clone the repository
2. Install dependencies using pnpm:
   \`\`\`bash
   pnpm install
   \`\`\`
3. Set up your environment variables:
   - Copy \`.env.example\` to \`.env.local\`
   - Add your Resend API key and receiving email.
4. Run the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`
5. Open [http://localhost:3000](http://localhost:3000)

## Modifying Projects & Skills
Edit \`/public/data/projects.json\` and \`/public/data/skills.json\` to update the site's content.

## Deployment
Push to GitHub to trigger an automatic deployment on Vercel.

## Performance Targets
This site is optimized for >90 Desktop / >80 Mobile Lighthouse scores using Next.js advanced image loading, bundle code-splitting, font optimization, and Three.js automatic disposal routines.
