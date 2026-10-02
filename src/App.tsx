import { useEffect, useRef, useState, type ReactNode } from "react";

type IconName = "arrow" | "database" | "download" | "github" | "linkedin" | "mail" | "python" | "spark" | "trend" | "web";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    github: (
      <path d="M15 22v-3.9c.04-1-.35-1.76-1-2.1 3.3-.37 6.8-1.62 6.8-7.4a5.8 5.8 0 0 0-1.55-4A5.4 5.4 0 0 0 19.1.65S17.9.25 15 2.2a15.4 15.4 0 0 0-8 0C4.1.25 2.9.65 2.9.65A5.4 5.4 0 0 0 2.75 4.6a5.8 5.8 0 0 0-1.55 4c0 5.78 3.5 7.03 6.8 7.4-.65.32-.95.9-1 2.1V22" />
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <path d="M2 9h4v12H2z" />
        <path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    python: (
      <>
        <path d="M12 3c-4 0-4 1.8-4 4v2h8V8h-5" />
        <path d="M12 21c4 0 4-1.8 4-4v-2H8v1h5" />
        <path d="M8 7H6c-2 0-3 1.5-3 5s1 5 3 5h2" />
        <path d="M16 7h2c2 0 3 1.5 3 5s-1 5-3 5h-2" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.1 4.1L17 9l-3.9 1.9L12 15l-1.1-4.1L7 9l3.9-1.9L12 3Z" />
        <path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" />
      </>
    ),
    trend: (
      <>
        <path d="m3 17 6-6 4 4 8-9" />
        <path d="M15 6h6v6" />
      </>
    ),
    web: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3.4 3 14.6 0 18" />
        <path d="M12 3c-3 3.4-3 14.6 0 18" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  );
}

function Button({ children, href, secondary = false }: { children: ReactNode; href: string; secondary?: boolean }) {
  return (
    <a className={`button ${secondary ? "button-secondary" : ""}`} href={href}>
      {children}
    </a>
  );
}

function Counter({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLStrongElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const started = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - started) / 900, 1);
          setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <strong ref={ref}>
      {count}
      {suffix}
    </strong>
  );
}

const skills = [
  {
    icon: "trend" as const,
    number: "01",
    title: "Data Analytics",
    description: "Analyzing financial, sales, operational, and business data to identify patterns, performance drivers, and opportunities.",
    tools: ["Business Analysis", "KPI", "SQL", "Excel"],
  },
  {
    icon: "web" as const,
    number: "02",
    title: "Business Intelligence",
    description: "Building practical dashboards that turn business metrics into clear information for management and decision-making.",
    tools: ["Power BI", "Dashboards", "Reporting"],
  },
  {
    icon: "python" as const,
    number: "03",
    title: "Python & Automation",
    description: "Using Python for data processing, cleaning, transformation, reporting workflows, and business automation.",
    tools: ["Python", "Pandas", "Automation", "Git"],
  },
  {
    icon: "database" as const,
    number: "04",
    title: "SQL & Data",
    description: "Designing and querying relational data with a focus on reliable reporting and structured business information.",
    tools: ["SQL", "MySQL", "ETL", "Data Modeling"],
  },
  {
    icon: "spark" as const,
    number: "05",
    title: "Business Domain",
    description: "20+ years across finance, accounting, sales, operations, and general management provide strong real-world business context.",
    tools: ["Finance", "Sales", "Operations", "Strategy"],
  },
];

const projects = [
  {
    category: "Business intelligence",
    title: "Sales & Financial Performance Dashboard",
    description: "A business intelligence case study combining sales, revenue, profitability, and KPI reporting to support management decisions.",
    metric: "BI",
    metricLabel: "decision support",
    accent: "cyan",
    tech: ["SQL", "MySQL", "Power BI"],
    chart: [36, 49, 42, 64, 57, 72, 88],
  },
  {
    category: "Data engineering",
    title: "ERP / CSV to MySQL ETL",
    description: "A practical data pipeline for extracting business data from CSV or ERP exports, cleaning and transforming records, and loading them into MySQL for analysis.",
    metric: "ETL",
    metricLabel: "data workflow",
    accent: "violet",
    tech: ["Python", "Pandas", "MySQL", "ETL"],
    chart: [54, 44, 61, 51, 70, 67, 82],
  },
  {
    category: "Web analytics",
    title: "Business Data Web Dashboard",
    description: "A web-based reporting concept that connects structured business data with a simple interface for monitoring performance and exploring management information.",
    metric: "WEB",
    metricLabel: "business reporting",
    accent: "blue",
    tech: ["Python", "MySQL", "HTML", "CSS"],
    chart: [32, 39, 46, 44, 63, 76, 91],
  },
];

const pipeline = [
  { label: "Raw Data", detail: "APIs, files & databases", icon: "database" as const },
  { label: "ETL", detail: "Clean & transform", icon: "python" as const },
  { label: "Warehouse", detail: "Reliable single source", icon: "database" as const },
  { label: "Analysis", detail: "Patterns & modeling", icon: "trend" as const },
  { label: "Dashboard", detail: "Interactive reporting", icon: "web" as const },
  { label: "Insight", detail: "Confident decisions", icon: "spark" as const },
];

const experiences = [
  {
    role: "General Manager",
    company: "PT Buana Setia Jaya",
    date: "05/2019 — Present",
    description: "Leading business operations, financial performance, people management, reporting, and growth initiatives while using business data to support management decisions.",
    bullets: [
      "Develop and implement growth strategies",
      "Prepare and manage budgets and financial plans",
      "Analyze accounting, financial, sales, and operational data",
      "Monitor KPIs, revenue, costs, productivity, and performance",
      "Prepare management reports and presentations",
      "Identify growth opportunities and improve business processes",
    ],
    tech: ["Finance", "Business Analysis", "Power BI", "SQL"],
  },
  {
    role: "Area Sales Manager",
    company: "PT Tanu Alvindo Perkasa",
    date: "02/2014 — 06/2019",
    description: "Managed regional sales strategy, customer development, market research, team performance, and sales reporting.",
    bullets: [
      "Develop sales strategies and plans",
      "Analyze sales and customer performance",
      "Conduct market research and collect customer feedback",
      "Monitor regional sales performance and productivity",
      "Lead, coach, and develop sales teams",
      "Prepare reports to support sales and business planning",
    ],
    tech: ["Sales Analytics", "Excel", "Reporting", "Business Development"],
  },
  {
    role: "Head of Finance & Administration",
    company: "PT Rajawali Hiyoto",
    date: "05/2006 — 01/2014",
    description: "Managed finance and administration with responsibility for budgets, expenditures, financial reporting, business planning, and performance analysis.",
    bullets: [
      "Manage financial and administrative activities",
      "Prepare budgets, business plans, and financial projects",
      "Monitor expenditures against budgets",
      "Analyze financial performance and business results",
      "Establish standardized financial procedures",
      "Collaborate with General Management on operational planning",
    ],
    tech: ["Accounting", "Financial Analysis", "Budgeting", "Forecasting"],
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Yoseph home">
          <span className="brand-mark">Y</span>
          <span>
            Yoseph<span className="brand-dot">.</span>
          </span>
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
          {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
        <Button href="#contact">
          Let&apos;s work together <Icon name="arrow" size={16} />
        </Button>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              Data Analyst • Business Intelligence • Finance Analytics
            </div>
            <h1>
              Turning business data into <span>meaningful insights.</span>
            </h1>
            <p>Hi, I&apos;m Yoseph — a business and finance professional combining real-world management experience with SQL, Python, MySQL, Power BI, ETL, and web technologies.</p>
            <div className="hero-actions">
              <Button href="#projects">
                View my projects <Icon name="arrow" />
              </Button>
              <Button href="#experience" secondary>
                <Icon name="download" /> Download CV
              </Button>
            </div>
            <div className="hero-proof">
              <span>
                <b>20+</b> years business experience
              </span>
              <span>
                <b>3</b> core business functions
              </span>
            </div>
          </div>

          <div className="dashboard-preview" aria-label="Analytics dashboard preview">
            <div className="preview-glow" />
            <div className="dashboard-window">
              <div className="window-bar">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>yoseph.analytics</span>
                <span className="live-label">
                  <i /> Live
                </span>
              </div>
              <div className="dashboard-body">
                <div className="dashboard-heading">
                  <div>
                    <small>Business overview</small>
                    <strong>Performance</strong>
                  </div>
                  <div className="period">Last 30 days</div>
                </div>
                <div className="metrics-row">
                  <div className="metric-card">
                    <small>Total revenue</small>
                    <strong>$284.6K</strong>
                    <span>↗ 18.4%</span>
                  </div>
                  <div className="metric-card">
                    <small>Conversions</small>
                    <strong>8,492</strong>
                    <span>↗ 12.8%</span>
                  </div>
                  <div className="metric-card">
                    <small>Avg. order</small>
                    <strong>$126.40</strong>
                    <span>↗ 4.2%</span>
                  </div>
                </div>
                <div className="chart-card">
                  <div className="chart-title">
                    <div>
                      <small>Revenue trend</small>
                      <strong>$72,840</strong>
                    </div>
                    <div className="legend">
                      <i /> This month
                    </div>
                  </div>
                  <div className="line-chart">
                    <div className="grid-line line-one" />
                    <div className="grid-line line-two" />
                    <div className="grid-line line-three" />
                    <svg viewBox="0 0 520 155" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity=".3" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path className="area" d="M0 130 C42 125 58 92 98 101S154 123 190 82 246 72 275 91 329 67 354 48 405 61 436 35 484 22 520 12V155H0Z" />
                      <path className="stroke" d="M0 130C42 125 58 92 98 101S154 123 190 82 246 72 275 91 329 67 354 48 405 61 436 35 484 22 520 12" />
                    </svg>
                  </div>
                  <div className="chart-labels">
                    <span>May 01</span>
                    <span>May 08</span>
                    <span>May 15</span>
                    <span>May 22</span>
                    <span>May 30</span>
                  </div>
                </div>
                <div className="floating-code">
                  <span>pipeline.py</span>
                  <code>df.transform().validate()</code>
                </div>
              </div>
            </div>
            <figure className="profile-card">
              <div className="profile-image-wrap profile-initials" aria-label="Yoseph Gunawan profile">
                <img src="/Yoseph_gunawan.jpg" alt="Yoseph Gunawan" />
                <span className="profile-available" aria-label="Available for work" />
              </div>
              <figcaption>
                <strong>Yoseph Gunawan</strong>
                <span>Data Analyst • Business Intelligence</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-kicker">01 / About me</div>
          <div className="about-grid">
            <h2>
              Business experience meets <span className="gradient-text">data technology.</span>
            </h2>
            <div className="about-copy">
              <p>
                I am a business and finance professional with more than 20 years of experience across finance and accounting, sales management, business operations, and general management. Throughout my career, I have worked with financial,
                sales, and operational data to monitor performance, prepare reports, identify trends, and support decisions.
              </p>
              <p>
                Today, I combine that business background with data analytics and technology skills including SQL, MySQL, Python, Power BI, ETL, Excel, and web development. My focus is turning business problems into practical, data-driven
                solutions.
              </p>
              <div className="stats">
                <div>
                  <Counter value={20} suffix="+" />
                  <span>Years business experience</span>
                </div>
                <div>
                  <Counter value={3} />
                  <span>Core business functions</span>
                </div>
                <div>
                  <Counter value={6} />
                  <span>Data & technology areas</span>
                </div>
                <div>
                  <Counter value={1} suffix="+" />
                  <span>End-to-end mindset</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="expertise-section" id="skills">
          <div className="section-heading">
            <div>
              <div className="section-kicker">02 / My expertise</div>
              <h2>
                Tools for turning complexity
                <br />
                into confidence.
              </h2>
            </div>
            <p>From exploration to production, I combine analytical thinking with technical execution.</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.title}>
                <div className="card-top">
                  <span className="skill-icon">
                    <Icon name={skill.icon} size={22} />
                  </span>
                  <span className="card-number">{skill.number}</span>
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="tool-list">
                  {skill.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section" id="projects">
          <div className="section-heading work-heading">
            <div>
              <div className="section-kicker">03 / Featured projects</div>
              <h2>
                Built to answer
                <br />
                the right questions.
              </h2>
            </div>
            <a className="text-link" href="#github">
              View GitHub activity <Icon name="arrow" />
            </a>
          </div>
          <div className="projects">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className={`project-visual ${project.accent}`}>
                  <div className="project-ui">
                    <div className="project-ui-top">
                      <i />
                      <span>{project.category}</span>
                      <b>•••</b>
                    </div>
                    <div className="project-mini-grid">
                      <div className="project-side">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="project-chart">
                        <div className="mini-label">Performance overview</div>
                        <div className="mini-value">{project.metric}</div>
                        <div className="bars">
                          {project.chart.map((height, chartIndex) => (
                            <i key={chartIndex} style={{ height: `${height}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-index">0{index + 1}</div>
                  <div>
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tool-list">
                      {project.tech.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      <a href="#github">
                        <Icon name="github" /> GitHub
                      </a>
                      <a href="#demo">
                        Live demo <Icon name="arrow" size={15} />
                      </a>
                    </div>
                  </div>
                  <div className="project-result">
                    <strong>{project.metric}</strong>
                    <span>{project.metricLabel}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pipeline-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">04 / Analytics process</div>
              <h2>
                From raw data
                <br />
                to insight.
              </h2>
            </div>
            <p>A transparent, dependable workflow that moves from disconnected sources to decisions people trust.</p>
          </div>
          <div className="pipeline-flow">
            {pipeline.map((step, index) => (
              <div className="pipeline-step" key={step.label}>
                <div className="pipeline-icon">
                  <Icon name={step.icon} />
                </div>
                <span className="pipeline-number">0{index + 1}</span>
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
                {index < pipeline.length - 1 && <i className="pipeline-arrow">→</i>}
              </div>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-heading">
            <div>
              <div className="section-kicker">05 / Experience</div>
              <h2>
                Business experience
                <br />
                behind the data.
              </h2>
            </div>
            <p>My analytics perspective is grounded in real experience across finance, sales, operations, and general management.</p>
          </div>
          <div className="timeline">
            {experiences.map((item) => (
              <article className="timeline-item" key={item.role}>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span>{item.company}</span>
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="tool-list">
                    {item.tech.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="credentials-section">
          <div className="credential-column">
            <div className="section-kicker">Education</div>
            <article className="credential-card">
              <span className="skill-icon">
                <Icon name="spark" />
              </span>
              <div>
                <small>Bachelor&apos;s Degree</small>
                <h3>Accounting & Business</h3>
                <p>Universitas Swadaya Gunung Jati (UGJ)</p>
              </div>
            </article>
          </div>
          <div className="credential-column">
            <div className="section-kicker">Professional Focus</div>
            <article className="credential-card">
              <span className="skill-icon">
                <Icon name="trend" />
              </span>
              <div>
                <small>Current specialization</small>
                <h3>Data Analytics & BI</h3>
                <p>SQL · Python · MySQL · Power BI · ETL · Web Data Applications</p>
              </div>
            </article>
          </div>
        </section>

        <section className="github-section" id="github">
          <div className="github-copy">
            <div className="section-kicker">06 / Building with data &amp; code</div>
            <h2>
              Always exploring.
              <br />
              Always building.
            </h2>
            <p>My technical learning extends from analytics into data infrastructure, web applications, Docker, Git/GitHub, and a self-hosted Proxmox homelab.</p>
            <Button href="https://github.com/joshe82" secondary>
              <Icon name="github" /> View GitHub profile
            </Button>
          </div>
          <div className="activity-card">
            <div className="activity-top">
              <span>
                <Icon name="github" /> joshe82 / projects
              </span>
              <b>Data & Technology</b>
            </div>
            <div className="contribution-grid">
              {Array.from({ length: 126 }, (_, index) => (
                <i key={index} className={`level-${(index * 7 + (index % 5)) % 5}`} />
              ))}
            </div>
            <div className="repo-list">
              <div>
                <span className="repo-icon">ETL</span>
                <p>
                  <strong>data-pipeline</strong>
                  <small>Business data ingestion and transformation</small>
                </p>
                <b>Python</b>
              </div>
              <div>
                <span className="repo-icon">BI</span>
                <p>
                  <strong>business-dashboard</strong>
                  <small>Interactive management reporting</small>
                </p>
                <b>SQL</b>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-intro">
            <div className="contact-orb">
              <Icon name="spark" size={28} />
            </div>
            <div className="section-kicker">07 / Start a conversation</div>
            <h2>
              Let&apos;s work
              <br />
              with data.
            </h2>
            <p>Have a data problem, dashboard idea, or analytics project? Let&apos;s turn your data into something meaningful.</p>
            <div className="contact-socials">
              <a href="https://github.com/joshe82" target="_blank" rel="noreferrer">
                <Icon name="github" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/yoseph-gunawan-581a74176" target="_blank" rel="noreferrer">
                <Icon name="linkedin" /> LinkedIn
              </a>
              <a href="mailto:yoseph.gunawan09@gmail.com">
                <Icon name="mail" /> Email
              </a>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

              const phone = "6282121000719"; // <-- change your number here
              const text = `Halo Yoseph, I'm ${name} (${email})%0A%0A${message}`;
              const waUrl = `https://wa.me/${phone}?text=${text}`;

              window.open(waUrl, "_blank");
            }}
          >
            <label>
              Name
              <input name="name" type="text" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="you@company.com" required />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} placeholder="Tell me about your data project..." required />
            </label>
            <button className="button" type="submit">
              Send via WhatsApp <Icon name="arrow" />
            </button>
          </form>
        </section>
      </main>

      <footer>
        <a className="brand" href="#home">
          <span className="brand-mark">Y</span>
          <span>
            Yoseph<span className="brand-dot">.</span>
          </span>
        </a>
        <span>© 2026 Yoseph. Built with data, code, and curiosity.</span>
        <div className="socials">
          <a href="https://github.com/joshe82" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Icon name="github" />
          </a>
          <a href="https://www.linkedin.com/in/yoseph-gunawan-581a74176" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
          <a href="mailto:yoseph.gunawan09@gmail.com" aria-label="Email">
            <Icon name="mail" />
          </a>
        </div>
      </footer>
    </div>
  );
}
