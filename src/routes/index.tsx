import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';

import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Download,
  Menu,
  GraduationCap,
  Code2,
  Braces,
  Database,
  GitBranch,
  Network,
  Bug,
  Trophy,
  Shield,
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
} from 'lucide-react';


import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ProjectPreview } from '@/components/project-preview';
import { ContactForm } from '@/components/contact-form';
import {
  navigation,
  projects,
  skillGroups,
  certifications,
  personalLinks,
} from '@/lib/portfolio-data';
import orbit from '@/assets/engineering-orbit.jpg';
import profileImage from '@/assets/omar-profile.png';

// ---------------------------------------------------------------------------
// Grouped Class Names & Styles
// ---------------------------------------------------------------------------
const styles = {
  // Global & Typography Utilities
  a11y: {
    skipLink:
      'sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-primary focus:text-primary-foreground focus:p-4',
  },
  typography: {
    primaryAccent: 'text-primary',
    subduedText: 'subdued',
    sectionLabel: 'section-label',
    sectionHeading: 'section-heading',
    sectionNote: 'section-note',
  },

  // Layout Containers
  layout: {
    shell: 'shell',
    section: 'section',
  },

  // Navigation & Header
  header: {
    siteHeader: 'site-header',
    inner: 'shell header-inner',
    wordmark: 'wordmark',
    desktopNav: 'desktop-nav',
    navLink: (isActive: boolean) => `nav-link ${isActive ? 'active' : ''}`,
    connectButton: 'connect-button',
    menuButton: 'menu-button',
    mobileNav: 'mobile-navigation',
  },

  // Hero
  hero: {
    container: 'hero',
    art: 'hero-art',
    content: 'shell hero-content',
    eyebrow: 'eyebrow entrance',
    title: 'entrance delay-1',
    description: 'hero-description entrance delay-2',
    actions: 'hero-actions entrance delay-3',
    talkLink: 'talk-link',
    talkIcon: 'size-3',
    profileContainer: 'hero-profile',
    profileFrame: 'profile-frame',
    profileCaption: 'profile-caption',
    profileStatus: 'profile-status',
    orbitMeta: 'orbit-meta',
    bottom: 'shell hero-bottom',
    scrollIcon: 'size-3',
    coordinates: 'coordinates',
  },

  // Discipline Strip
  strip: {
    container: 'discipline-strip',
    inner: 'shell discipline-inner',
  },

  // About Section
  about: {
    grid: 'about-grid',
    principles: 'principles',
    copy: 'about-copy',
    education: 'education',
    eduIcon: 'size-6',
    eduMeta: 'font-mono mt-2',
  },

  // Projects Section
  projects: {
    grid: 'project-grid',
    card: 'project-card',
    copy: 'project-copy',
    category: 'project-category',
    title: 'project-title',
    tagsContainer: 'tags',
    tag: 'tag',
    actionButton: 'project-action',
    modalDialog: 'detail-dialog',
    modalTitle: 'font-display text-3xl',
    modalHighlightHeader: 'text-lg font-display',
    modalList: 'detail-list',
    modalDisclaimer: 'text-xs text-muted-foreground',
  },

  // Toolkit Section
  skills: {
    grid: 'skills-grid',
    group: 'skill-group',
  },

  // Recognition Section
  achievements: {
    grid: 'recognition-grid',
    card: 'award-card',
    valueBadge: 'award-value',
    certHeading: 'cert-heading',
    certRow: 'cert-row',
  },

  // Engineering Approach Section
  approach: {
    grid: 'process-grid',
    step: 'process-step',
  },

  // Contact Section
  contact: {
    grid: 'contact-grid',
    heading: 'contact-heading',
    copy: 'contact-copy',
    links: 'contact-links',
    location: 'contact-location',
    locationIcon: 'size-4',
    resumeButton: 'contact-resume min-h-11',
  },

  // Footer
  footer: {
    container: 'footer shell',
    top: 'footer-top',
    wordmark: 'wordmark',
    note: 'footer-note',
    nav: 'footer-nav',
    navIcon: 'inline size-3',
    bottom: 'footer-bottom',
    backToTop: 'inline-flex items-center gap-2',
    backToTopIcon: 'size-3',
  },
} as const;

// ---------------------------------------------------------------------------
// TanStack Route Definition
// ---------------------------------------------------------------------------
export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Mukka Omar — Software Engineer Portfolio' },
      {
        name: 'description',
        content:
          'Mukka Omar, Computer Science and Engineering graduate. Explore full-stack projects, Java and Python skills, and connected systems.',
      },
      {
        property: 'og:title',
        content: 'Mukka Omar — Thoughtful software. Real-world solutions.',
      },
      {
        property: 'og:description',
        content:
          'Explore Mukka Omar’s projects, engineering approach, technical toolkit and achievements.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Portfolio,
});

// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------
function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function ResumeButton({ className = '' }: { className?: string }) {
  if (personalLinks.resume) {
    return (
      <Button asChild variant="outline" className={className}>
        <a href={personalLinks.resume} download>
          <Download />
          Download Resume
        </a>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      disabled
      title="Original resume PDF not yet supplied"
      className={className}
    >
      <Download />
      Resume · coming soon
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Main Portfolio Component
// ---------------------------------------------------------------------------
function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('home');
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('pending');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    if (!reduced) {
      reveals.forEach((el) => {
        el.classList.add('pending');
        observer.observe(el);
      });
    }

    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-15% 0px -65% 0px' }
    );

    sections.forEach((s) => sectionObserver.observe(s));

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const icons = [Code2, Braces, Network, Database, GitBranch, Code2, Bug];

  return (
    <>
      {/* Skip Link */}
      <a href="#main-content" className={styles.a11y.skipLink}>
        Skip to content
      </a>

      {/* Header */}
      <header className={styles.header.siteHeader}>
        <div className={styles.header.inner}>
          <a href="#home" className={styles.header.wordmark} aria-label="Mukka Omar home">
            MO<span>.</span>
          </a>

          <nav className={styles.header.desktopNav} aria-label="Main navigation">
            {navigation.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className={styles.header.navLink(active === n.toLowerCase())}
                aria-current={active === n.toLowerCase() ? 'location' : undefined}
              >
                {n}
              </a>
            ))}
          </nav>

          <Button asChild className={styles.header.connectButton}>
            <a href="#contact">
              Let’s Connect <ArrowUpRight />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={styles.header.menuButton}
            aria-label="Open navigation"
            onClick={() => setMenu(true)}
          >
            <Menu />
          </Button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Dialog open={menu} onOpenChange={setMenu}>
        <DialogContent>
          <DialogTitle>Explore</DialogTitle>
          <DialogDescription>Mukka Omar · Portfolio</DialogDescription>
          <nav className={styles.header.mobileNav} aria-label="Mobile navigation">
            {navigation.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                onClick={() => setMenu(false)}
              >
                {n}
              </a>
            ))}
          </nav>
        </DialogContent>
      </Dialog>

      <main id="main-content">
        {/* Hero Section */}
        <section className={styles.hero.container} id="home">
          <img
            className={styles.hero.art}
            src={orbit}
            width={1920}
            height={1024}
            alt=""
            fetchPriority="high"
          />

          <div className={styles.hero.content}>
            <div className={styles.hero.eyebrow}>SOFTWARE ENGINEER · INDIA</div>

            <h1 className={styles.hero.title}>
              Building thoughtful<br />
              software. Solving<br />
              <span>real-world problems.</span>
            </h1>

            <p className={styles.hero.description}>
              I'm <strong>Mukka Omar</strong>, a Computer Science and Engineering
              graduate interested in software development, full-stack applications,
              APIs, and intelligent connected systems. I enjoy turning ideas into
              practical, user-focused solutions.
            </p>

            <div className={styles.hero.actions}>
              <Button asChild>
                <a href="#projects">
                  Explore My Work <ArrowUpRight />
                </a>
              </Button>
              <ResumeButton />
            </div>

            <a className={styles.hero.talkLink} href="#contact">
              Let’s Talk <ArrowUpRight className={styles.hero.talkIcon} />
            </a>

            <div className={styles.hero.profileContainer}>
              <div className={styles.hero.profileFrame}>
                <img
                  src={profileImage}
                  alt="Mukka Omar"
                  width={540}
                  height={675}
                  fetchPriority="high"
                />
              </div>
              <span className={styles.hero.profileCaption}>
                <span className={styles.hero.profileStatus} />
                SOFTWARE ENGINEER · INDIA
              </span>
            </div>
          </div>

          <div className={styles.hero.orbitMeta}>
            <span>IDEAS → CODE → IMPACT</span>
            <span>SYSTEM / 001</span>
          </div>

          <div className={styles.hero.bottom}>
            <a href="#about">
              <ArrowDown className={styles.hero.scrollIcon} />
              SCROLL TO EXPLORE
            </a>
            <span className={styles.hero.coordinates}>
              BASED IN TELANGANA, INDIA{' '}
              <span className={styles.typography.primaryAccent}>↗</span>
            </span>
          </div>
        </section>

        {/* Discipline Ticker */}
        <div className={styles.strip.container}>
          <div className={styles.strip.inner}>
            {[
              'SOFTWARE DEVELOPMENT',
              'FULL-STACK APPLICATIONS',
              'REST APIs & INTEGRATIONS',
              'INTELLIGENT CONNECTED SYSTEMS',
            ].map((t) => (
              <span key={t}>
                <i>✳</i>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 01: About */}
        <section className={styles.layout.section} id="about">
          <Reveal className={styles.layout.shell}>
            <div className={styles.typography.sectionLabel}>01 / ABOUT</div>
            <div className={styles.about.grid}>
              <div>
                <h2 className={styles.typography.sectionHeading}>
                  Curious by nature.<br />
                  <span className={styles.typography.subduedText}>
                    Engineer by mindset.
                  </span>
                </h2>
                <div className={styles.about.principles}>
                  {[
                    'Understand the problem.',
                    'Build with purpose.',
                    'Test, refine, and improve.',
                  ].map((p, i) => (
                    <div key={p}>
                      <span>0{i + 1}</span>
                      <p>{p}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.about.copy}>
                <p>
                  I’m Omar — a Computer Science and Engineering graduate who
                  enjoys understanding how things work, and finding ways to make
                  them work better.
                </p>
                <p>
                  My interests span{' '}
                  <strong>
                    Java and Python programming, full-stack web applications, REST
                    APIs, testing and debugging
                  </strong>
                  , and IoT-based problem-solving. I learn by building, asking
                  questions, and paying attention to the details.
                </p>
                <div className={styles.about.education}>
                  <GraduationCap className={styles.about.eduIcon} />
                  <div>
                    <h3>B.Tech · Computer Science & Engineering</h3>
                    <p>Kamala Institute of Technology and Science, Singapuram</p>
                    <p className={styles.about.eduMeta}>
                      2022 — 2026{' '}
                      <span className={styles.typography.primaryAccent}> / </span>{' '}
                      CGPA / SCORE: 7.3
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 02: Selected Work */}
        <section className={styles.layout.section} id="projects">
          <Reveal className={styles.layout.shell}>
            <div className={styles.typography.sectionLabel}>02 / SELECTED WORK</div>
            <div className="section-top">
              <h2 className={styles.typography.sectionHeading}>
                Ideas, brought to life
                <span className={styles.typography.primaryAccent}>.</span>
              </h2>
              <p className={styles.typography.sectionNote}>
                A selection of projects exploring useful software, meaningful
                communities, and connected systems.
              </p>
            </div>

            <div className={styles.projects.grid}>
              {projects.map((p) => (
                <article className={styles.projects.card} key={p.id}>
                  <ProjectPreview kind={p.kind} />
                  <div className={styles.projects.copy}>
                    <div className={styles.projects.category}>{p.category}</div>
                    <div className={styles.projects.title}>
                      <h3>{p.name}</h3>
                      <span>/{p.id}</span>
                    </div>
                    <p>{p.summary}</p>
                    <div className={styles.projects.tagsContainer}>
                      {p.tags.map((t) => (
                        <span className={styles.projects.tag} key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className={styles.projects.actionButton}
                      onClick={() => setSelected(p)}
                      aria-label={`View ${p.name} project`}
                    >
                      View Project <ArrowUpRight />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 03: Toolkit */}
        <section className={styles.layout.section} id="skills">
          <Reveal className={styles.layout.shell}>
            <div className={styles.typography.sectionLabel}>03 / TOOLKIT</div>
            <div className="section-top">
              <h2 className={styles.typography.sectionHeading}>
                Tools I use to turn<br />
                <span className={styles.typography.subduedText}>
                  ideas into software.
                </span>
              </h2>
              <p className={styles.typography.sectionNote}>
                A growing toolkit. A foundation in fundamentals.<br />
                Always something new to learn.
              </p>
            </div>

            <div className={styles.skills.grid}>
              {skillGroups.map((g, i) => {
                const Icon = icons[i] ?? Code2;
                return (
                  <div className={styles.skills.group} key={g.title}>
                    <h3>
                      <Icon />
                      {g.title}
                    </h3>
                    <ul>
                      {g.skills.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* 04: Recognition */}
        <section className={styles.layout.section} id="achievements">
          <Reveal className={styles.layout.shell}>
            <div className={styles.typography.sectionLabel}>04 / RECOGNITION</div>
            <div className="section-top">
              <h2 className={styles.typography.sectionHeading}>Beyond the code.</h2>
              <p className={styles.typography.sectionNote}>
                Innovation, discipline, and the experiences<br />
                that shape how I work.
              </p>
            </div>

            <div className={styles.achievements.grid}>
              <article className={styles.achievements.card}>
                <Trophy />
                <div>
                  <h3>TASK Ideathon Recognition</h3>
                  <p>
                    Selected among the top entries in the TASK Ideathon,
                    representing KITS, Singapuram. Recognized for ideation and
                    innovation with an official Certificate of Recognition.
                  </p>
                  <div className={styles.achievements.valueBadge}>
                    ₹10,000 CASH PRIZE ↗
                  </div>
                </div>
              </article>

              <article className={styles.achievements.card}>
                <Shield />
                <div>
                  <h3>NCC · C Certificate</h3>
                  <p>
                    A foundation in discipline, teamwork, and leadership through NCC
                    participation, training, and field activities.
                  </p>
                  <div className={styles.achievements.valueBadge}>
                    DISCIPLINE. TEAMWORK. PURPOSE.
                  </div>
                </div>
              </article>
            </div>

            <h3 className={styles.achievements.certHeading}>Continuous learning.</h3>

            <div>
              {certifications.map(([title, issuer]) => (
                <div className={styles.achievements.certRow} key={title}>
                  <Award />
                  <h4>{title}</h4>
                  <span>{issuer}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 05: Engineering Approach */}
        <section className={styles.layout.section} id="approach">
          <Reveal className={styles.layout.shell}>
            <div className={styles.typography.sectionLabel}>
              05 / ENGINEERING APPROACH
            </div>
            <h2 className={styles.typography.sectionHeading}>
              Good software starts<br />
              <span className={styles.typography.subduedText}>
                with good questions.
              </span>
            </h2>

            <div className={styles.approach.grid}>
              {[
                ['Explore', 'Understand requirements and identify the problem.'],
                ['Develop', 'Build structured, maintainable solutions.'],
                [
                  'Validate',
                  'Test functionality, inspect edge cases, and debug issues.',
                ],
                ['Improve', 'Refine usability, reliability, and performance.'],
              ].map(([name, description], i) => (
                <div className={styles.approach.step} key={name}>
                  <span>0{i + 1} —</span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 06: Contact */}
        <section className={styles.layout.section} id="contact">
          <Reveal className={styles.layout.shell}>
            <div className={styles.typography.sectionLabel}>06 / GET IN TOUCH</div>
            <div className={styles.contact.grid}>
              <div>
                <h2 className={styles.contact.heading}>
                  Have a problem<br />
                  worth solving
                  <span className={styles.typography.primaryAccent}>?</span>
                </h2>
                <p className={styles.contact.copy}>
                  I'm interested in opportunities where I can learn, contribute, and
                  build useful software with a collaborative team.
                </p>

                <div className={styles.contact.links}>
                  <a href="mailto:mukkaomar@gmail.com">
                    <Mail />
                    mukkaomar@gmail.com <ArrowUpRight />
                  </a>
                  <a href="tel:+919063746010">
                    <Phone />
                    +91-9063746010
                  </a>
                  {personalLinks.github && (
                    <a
                      href={personalLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub <ArrowUpRight />
                    </a>
                  )}
                  {personalLinks.linkedin && (
                    <a
                      href={personalLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn <ArrowUpRight />
                    </a>
                  )}
                </div>

                <div className={styles.contact.location}>
                  <MapPin className={styles.contact.locationIcon} />
                  Telangana, India
                </div>

                <ResumeButton className={styles.contact.resumeButton} />
              </div>

              <ContactForm />
            </div>
          </Reveal>
        </section>
      </main>

      
<footer className="footer shell">
  <div className="footer-top">
    <a
      className="wordmark"
      href="#home"
      aria-label="Mukka Omar home"
    >
      MO<span>.</span>
    </a>

    <nav className="footer-nav" aria-label="Social media links">
      <a
        href="https://www.linkedin.com/in/mukkaomar/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        title="LinkedIn"
      >
        <Linkedin />
      </a>

      <a
        href="https://github.com/Mromar1112"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        title="GitHub"
      >
        <Github />
      </a>

      <a
        href="https://www.instagram.com/iam_omar_11"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram profile"
        title="Instagram"
      >
        <Instagram />
      </a>

      <a
        href="mailto:mukkaomar@gmail.com"
        aria-label="Send an email"
        title="Email"
      >
        <Mail />
      </a>
    </nav>
  </div>

  <div className="footer-bottom">
    <span>© {new Date().getFullYear()} MUKKA OMAR</span>

    <a
      className="inline-flex items-center gap-2"
      href="#home"
    >
      BACK TO TOP <ArrowUp className="size-3" />
    </a>
  </div>
</footer>


      {/* Project Detail Modal */}
      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className={styles.projects.modalDialog}>
          {selected && (
            <>
              <div className={styles.typography.sectionLabel}>
                PROJECT / {selected.id}
              </div>
              <DialogTitle className={styles.projects.modalTitle}>
                {selected.name}
              </DialogTitle>
              <DialogDescription>{selected.description}</DialogDescription>
              <ProjectPreview kind={selected.kind} />
              <div className={styles.projects.tagsContainer}>
                {selected.tags.map((t) => (
                  <span className={styles.projects.tag} key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <h3 className={styles.projects.modalHighlightHeader}>What I built</h3>
              <ul className={styles.projects.modalList}>
                {selected.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className={styles.projects.modalDisclaimer}>
                Visuals are illustrative concepts, not screenshots of a deployed
                application. Dashboard values are sample data.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}