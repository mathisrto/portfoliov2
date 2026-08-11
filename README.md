<div align="center">

# 🌐 Portfolio — Mathis Ratron

**Mon portfolio personnel construit avec Next.js, Tailwind CSS et Framer Motion.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)](https://mathis-ratron.fr)

<br/>

[🔗 **mathis-ratron.fr**](https://www.mathis-ratron.fr)

</div>

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **🏠 À propos** | Présentation personnelle avec effet machine à écrire et informations de contact |
| **💼 Compétences** | Langages, frameworks, bases de données, outils DevOps, UX/UI et soft skills |
| **🏢 Expériences** | Parcours professionnel détaillé avec missions et compétences acquises |
| **🎓 Parcours scolaire** | Formation du collège au BUT Informatique |
| **📂 Portfolio** | Galerie de projets avec vue colonne / grille, filtres par langage et type de projet |
| **🌍 Multilingue** | Support français / anglais via `next-intl` |
| **🎨 Thèmes** | Mode clair, sombre et système avec transition fluide |
| **📱 Responsive** | Adapté mobile, tablette et desktop |
| **🔍 SEO** | Sitemap, Open Graph, JSON-LD, Google Analytics |

---

## 🛠️ Stack technique

### Core

- **[Next.js 15](https://nextjs.org/)** — Framework React avec App Router et Turbopack
- **[React 19](https://react.dev/)** — Bibliothèque UI
- **[TypeScript 5](https://www.typescriptlang.org/)** — Typage statique
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first CSS

### UI & Animations

- **[Framer Motion](https://www.framer.com/motion/)** — Animations déclaratives et transitions fluides
- **[Radix UI](https://www.radix-ui.com/)** — Composants accessibles (Dialog, Popover, Select, Switch…)
- **[Lucide React](https://lucide.dev/)** — Icônes SVG
- **[Embla Carousel](https://www.embla-carousel.com/)** — Carousel d'images des projets

### Internationalisation & Thèmes

- **[next-intl](https://next-intl-docs.vercel.app/)** — i18n avec routing localisé
- **[next-themes](https://github.com/pacocoursey/next-themes)** — Gestion des thèmes clair/sombre

### Analytics & Performance

- **[Vercel Analytics](https://vercel.com/analytics)** — Suivi des visites
- **[Vercel Speed Insights](https://vercel.com/docs/speed-insights)** — Monitoring des performances
- **Google Analytics** — Suivi avancé du trafic

---

## 📁 Structure du projet

```
portfoliov2/
├── app/
│   ├── globals.css              # Variables CSS & thèmes (oklch)
│   ├── sitemap.xml/             # Sitemap dynamique
│   └── [locale]/                # Routes localisées (fr, en)
│       ├── layout.tsx           # Layout principal (sidebar, providers, SEO)
│       ├── page.tsx             # Redirection vers /about
│       ├── about/               # Page d'accueil / présentation
│       ├── skills/              # Compétences techniques
│       ├── experiences/         # Expériences professionnelles
│       ├── education/           # Parcours scolaire
│       └── portfolio/           # Projets (vue colonne/grille + filtres)
│           └── [projectId]/     # Page détaillée d'un projet
├── components/ui/               # Composants Radix/shadcn
├── data/                        # Données JSON (projets, menu, compétences…)
├── hooks/                       # Hooks personnalisés (useIsMobile)
├── i18n/                        # Configuration next-intl (routing, request)
├── lib/
│   ├── components/              # Composants métier (Sidebar, ProjectCard…)
│   ├── contexts/                # Contexts React (Portfolio, Skills, Locale…)
│   └── controllers/             # Controllers de chargement des données
├── messages/                    # Traductions (fr.json, en.json)
└── public/images/               # Assets des projets
```

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** ≥ 18
- **npm**, **yarn**, **pnpm** ou **bun**

### Installation

```bash
# Cloner le repo
git clone https://github.com/votre-utilisateur/portfoliov2.git
cd portfoliov2

# Installer les dépendances
npm install
```

### Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## 🌐 Déploiement

Le portfolio est déployé sur **[Vercel](https://vercel.com/)** avec déploiement automatique à chaque push.

---

## 📄 Licence

© 2025 Mathis Ratron — Tous droits réservés.
