# Rising Sun Montessori School Website

The official website for Rising Sun Montessori School (RSMS), located in El Dorado Hills, California. This website provides information about our Montessori education programs, campus, staff, and resources for students and families.

## About Rising Sun Montessori School

Rising Sun Montessori School offers authentic Montessori education for Transitional Kindergarten through Middle School, nurturing curious, independent, and compassionate learners. We are fully accredited by the Accrediting Commission for Schools, Western Association of Schools and Colleges.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: SCSS/Sass + Tailwind CSS
- **UI Components**: Custom components with Framer Motion for animations
- **Icons**: Lucide React
- **Code Quality**: Biome for formatting and linting
- **Fonts**: Plus Jakarta Sans and Inter via next/font

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended package manager)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the website

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js ESLint
- `pnpm format` - Format code with Biome
- `pnpm format:check` - Check code formatting
- `pnpm lint:biome` - Run Biome linter
- `pnpm lint:biome:fix` - Fix Biome linting issues
- `pnpm check` - Run Biome checks (format + lint)
- `pnpm check:fix` - Fix all Biome issues

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About pages (staff, charter, etc.)
│   ├── contact/           # Contact page
│   ├── gallery/           # Photo gallery
│   ├── leadership/        # Board information and policies
│   ├── our-campus/        # Campus information
│   ├── our-classroom/     # Classroom details
│   ├── our-students/      # Student information
│   ├── parents/           # Parent resources
│   ├── program/           # Educational programs
│   └── school-information/ # Academic calendar, schedules, etc.
├── components/
│   ├── common/            # Reusable UI components
│   └── pages/             # Page-specific components
├── lib/                   # Utility functions
└── styles/                # Global styles

public/
├── images/                # Website images and assets
├── assets/fonts/          # Custom Gotham fonts
└── webAssets/             # PDFs and documents
```

## Key Features

- **Responsive Design**: Mobile-first approach with modern UI
- **Dynamic Content**: Carousel components for showcasing campus and programs
- **Staff Directory**: Individual staff profile pages
- **Document Management**: PDF viewing capabilities for handbooks and policies
- **Contact Forms**: Interactive contact and inquiry forms
- **SEO Optimized**: Proper meta tags and structured data

## Development Guidelines

- Use TypeScript for all new code
- Follow the established component structure
- Use SCSS modules for component-specific styles
- Utilize Tailwind for utility classes
- Run `pnpm check:fix` before committing to ensure code quality

## Deployment

The website is optimized for deployment on platforms like Vercel or Netlify. Build the project using:

```bash
pnpm build
```

## Contributing

When contributing to this project:
1. Follow the existing code style and structure
2. Ensure all Biome checks pass
3. Test changes across different screen sizes
4. Update documentation as needed
