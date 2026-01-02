# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern portfolio website for Anthony Fullam (fullam.net), a Senior Bioinformatics Software Engineer at EMBL. Built with Jekyll and customized Minimal Mistakes remote theme, the site showcases bioinformatics research, tools, publications, and professional experience. Hosted on GitHub Pages with a single-page scrolling design.

## Development Commands

### Local Development
```bash
# Install dependencies (requires Ruby and Bundler)
bundle install

# Serve the site locally with live reload
bundle exec jekyll serve

# Serve with drafts visible
bundle exec jekyll serve --drafts

# Build the site (output to _site/)
bundle exec jekyll build
```

### Deployment
The site is deployed automatically via GitHub Pages when changes are pushed to the `main` branch. No manual deployment steps are required.

## Site Architecture

### Configuration
- **_config.yml**: Main Jekyll configuration containing site metadata, theme settings, author information, social links, and analytics (Google Analytics ID: G-N2BC96R915)
- **remote_theme**: Uses customized `mmistakes/minimal-mistakes` theme with extensive SCSS overrides

### Layout & Design
- **Single-page scrolling portfolio** with sections: Hero, Featured Work, Publications, Skills, Experience
- **Dark theme** with bioinformatics-inspired color palette (blues, greens, purples)
- **Custom layouts**: `_layouts/portfolio.html` - Full-width sections with minimal navigation
- **Custom components**: `_includes/` directory contains modular sections (hero, projects, publications, skills, timeline)
- **Custom styling**: `_sass/custom/` directory with component-specific SCSS files
- **Interactive features**: Smooth scrolling, typing animation, counter animations, filterable publications

### Data Structure
- **_data/publications.yml**: Research publications with metadata (title, journal, year, citations, links, tags)
- **_data/projects.yml**: Featured projects (GUNC, proGenomes, SPIRE, VIRE) with impact metrics
- **_data/skills.yml**: Technical expertise organized by category (Bioinformatics, Software Dev, Infrastructure)
- **_data/timeline.yml**: Professional experience with highlights and tech stacks
- **_data/navigation.yml**: Section navigation links

### Assets
- **assets/css/main.scss**: Master stylesheet importing Minimal Mistakes + custom styles
- **assets/js/**: JavaScript files for interactivity (smooth-scroll.js, portfolio-interactions.js)
- **assets/images/**: Images and project screenshots

### Key Features
- **Modern portfolio design**: Impact-focused, not CV-style
- **Interactive publications**: Filterable by type, searchable, with citation metrics
- **Animated elements**: Typing effect, counter animations, scroll-triggered fade-ins
- **Particle background**: Canvas-based animation in hero section
- **Responsive design**: Mobile-optimized with adaptive layouts
- **SEO optimized**: Meta tags, structured data, sitemap
- **Analytics**: Google Analytics integration

### Jekyll Plugins
- jekyll-sitemap
- jekyll-feed
- jemoji
- jekyll-include-cache

## Content Management

### Updating Publications
Edit `_data/publications.yml` to add or update publications:
- Add to `featured:` array for prominent display
- Include: title, authors, journal, year, citations, DOI, links, tags
- Tags enable filtering: genomics, metagenomics, database, tools, etc.
- Set `first_author: true` for first-author publications

### Updating Projects
Edit `_data/projects.yml` to add or modify featured projects:
- Include: name, tagline, description, impact metrics, tech_stack, links
- Set `featured: true` and `featured_order` for display priority
- Add project images to `assets/images/projects/`

### Updating Skills
Edit `_data/skills.yml` to modify technical expertise:
- Organized by categories: Bioinformatics, Software Development, Data Science, Infrastructure
- Each skill includes: name, level (expert/advanced/intermediate), description, tools/frameworks
- Visual indicators automatically generated from `level` field

### Updating Experience
Edit `_data/timeline.yml` to add or modify positions:
- Include: title, organization, location, dates, type (industry/academic)
- Add highlights array for key achievements
- List relevant technologies in tech array

## Styling and Customization

### Color Scheme
Colors defined in `_sass/custom/variables.scss`:
- Primary: `$primary-bio-blue` (#4A90E2)
- Secondary: `$secondary-green` (#7ED321)
- Accent: `$accent-purple` (#BD10E0)
- Backgrounds: `$dark-bg`, `$darker-bg`, `$card-bg`

### Component Styles
Each section has dedicated SCSS in `_sass/custom/`:
- `hero.scss` - Hero section with typing animation
- `projects.scss` - Featured projects cards
- `publications.scss` - Publications grid and filters
- `skills.scss` - Skills matrix layout
- `timeline.scss` - Professional experience timeline

### JavaScript Customization
Interactive features in `assets/js/`:
- `smooth-scroll.js` - Section navigation and scroll behavior
- `portfolio-interactions.js` - Animations, filters, counters, particles

## Development Notes
- Site uses Minimal Mistakes as base theme with extensive customization
- Custom layouts override default theme behavior
- Jekyll Liquid templates in `_includes/` for modular components
- All data-driven content stored in `_data/` directory for easy updates
- GitHub Pages automatically rebuilds on push to `main` branch
