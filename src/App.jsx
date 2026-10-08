import { useEffect, useState } from 'react'

/* =====================================================================
   SITE CONTENT
   Edit this object to change the text on the site.
   Files in /public (profile.jpg, resume.pdf) are linked by name.
   ===================================================================== */
const DEFAULT_DATA = {
  firstName: 'Yash',
  lastName: 'Desai',
  initials: 'YD',
  email: 'yashdesai201@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ydesai1',
  github: 'https://github.com/ydesai877',
  photo: 'profile.jpg', // in /public. If the file is missing, the site shows the initials.
  resumePdf: 'resume.pdf', // in /public

  about: [
    'I’m Yash Desai, a finance graduate from San Francisco State University with a B.S. in Business and a concentration in Finance. I have hands-on experience in financial analysis, ESG investing, and data-driven decision-making, with a strong foundation in financial statement analysis, risk management, and portfolio evaluation.',
    'I build budgets, forecasts, financial models, and KPI reports with Excel, SQL, Power BI, Tableau, and Python. Through roles at Dollar Tree, Chipotle, and Walmart, I have reconciled cash against sales reports, audited discrepancies, and enforced asset controls in fast-paced, high-volume operations. I hold Risk Management and Compliance Risk Management credentials from CFI, completed the Goldman Sachs Risk Job Simulation, and I am pursuing the FINRA SIE. My goal is an entry-level role in finance or banking.',
  ],

  education: [
    {
      degree: 'B.S. Business, Finance',
      school: 'San Francisco State University',
      dates: 'Graduated May 2026',
    },
  ],

  experience: [
    {
      title: 'Customer Service Associate / Cashier',
      org: 'Dollar Tree',
      location: 'Sunnyvale, CA',
      dates: 'Sep 2026 - Present',
      points: [
        'Processed high-volume transactions accurately while enforcing strict asset and cash-handling controls.',
        'Reconciled register drawers against sales reports to audit and resolve discrepancies.',
        'Managed inventory intake and verified stock counts to reduce retail shrinkage.',
        'Resolved customer inquiries efficiently to support fast-paced, high-volume retail floor operations.',
      ],
    },
    {
      title: 'Operations Specialist',
      org: 'Chipotle',
      location: 'Cupertino, CA',
      dates: 'Dec 2023 - Aug 2025',
      points: [
        'Processed high-volume cash and card transactions accurately while enforcing strict security controls.',
        'Reconciled daily cash drawers against point-of-sale reports to audit and resolve discrepancies.',
        'Monitored station inventory and portion control to reduce food waste and shrinkage.',
        'Delivered fast-paced customer service during peak volume periods to optimize operational throughput.',
      ],
    },
    {
      title: 'Customer Service Associate / Cashier',
      org: 'Walmart',
      location: 'Mountain View, CA',
      dates: 'Jul 2021 - Jan 2022',
      points: [
        'Executed daily POS transactions and resolved client inquiries with consistent financial accuracy.',
        'Supported critical floor operations across six distinct retail departments during peak hours.',
        'Enforced internal loss prevention controls and security compliance to protect store assets.',
        'Addressed complex customer service and transaction issues while maintaining high client satisfaction.',
      ],
    },
  ],

  skills: [
    { group: 'Financial Skills', items: 'Budgeting, Forecasting, Financial Modeling, Variance Analysis, KPI Reporting, Margin Analysis' },
    { group: 'Technical Skills', items: 'Excel (Advanced Functions, Power Query), SQL (JOINs, CTEs), Power BI, Tableau, Python' },
    { group: 'Visualization & Dashboarding', items: 'Power BI, Tableau, KPI Dashboards' },
  ],

  certificates: [
    { name: 'Risk Job Simulation', issuer: 'Goldman Sachs', date: 'Aug 2026' },
    { name: 'Risk Management Specialization', issuer: 'Corporate Finance Institute (CFI)', date: 'Dec 2025' },
    { name: 'Compliance Risk Management', issuer: 'Corporate Finance Institute (CFI)', date: 'Dec 2025' },
    { name: 'Securities Industry Essentials (SIE)', issuer: 'FINRA', date: 'In Progress' },
  ],

  projects: [
    {
      title: 'Interactive Coffee Sales & Revenue Analytics Dashboard',
      meta: 'Microsoft Excel · Sep 2026',
      art: 'dashboard',
      link: '', // Optional: add a URL to show a "View project" link
      points: [
        'Built an interactive Excel dashboard analyzing multi-year transactional order and revenue trends.',
        'Implemented dynamic timeline slicers and multi-attribute filters to enable targeted variance analysis.',
        'Visualized international revenue distributions while identifying and tracking top-performing customer accounts.',
      ],
    },
    {
      title: 'Bloomberg Trading Challenge',
      meta: 'Researcher / Analyst · Oct 2024 - Nov 2024',
      art: 'market',
      link: '',
      points: [
        'Collaborated with a team of five to analyze market data and develop trading strategies for a national competition.',
        'Conducted financial research and data analysis to support investment decisions under time constraints.',
      ],
    },
  ],

  // To publish a post: set status to the post date (for example 'Nov 11, 2026') and add a link.
  blogs: [
    { title: 'What the Goldman Sachs Risk Simulation Taught Me About Risk', art: 'risk', status: 'Coming soon', link: '' },
    { title: 'Inside the Bloomberg Trading Challenge: Research Under Time Pressure', art: 'market', status: 'Coming soon', link: '' },
    { title: 'Building a Sales Dashboard in Excel: Slicers, Timelines, and Variance', art: 'excel', status: 'Coming soon', link: '' },
  ],
}

// Each item is a separate page. "path" is the folder that holds that page's index.html.
const NAV = [
  { id: 'about', label: 'About Me', path: '' },
  { id: 'resume', label: 'Resume', path: 'resume/' },
  { id: 'projects', label: 'Projects', path: 'projects/' },
  { id: 'blogs', label: 'Blogs', path: 'blogs/' },
  { id: 'contact', label: 'Contact', path: 'contact/' },
]

const asset = (file) => `${import.meta.env.BASE_URL}${file}`
const pageUrl = (id) => asset(NAV.find((n) => n.id === id).path)

/* ---------------------------- Icons ---------------------------- */
const ICONS = {
  github: 'M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
  linkedin: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
}
const LINE_ICONS = {
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  download: 'M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14',
}

function Icon({ name }) {
  if (ICONS[name]) {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={ICONS[name]} /></svg>
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={LINE_ICONS[name]} />
    </svg>
  )
}

function SocialIcons({ data }) {
  return (
    <>
      <a className="icon-link" href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a>
      <a className="icon-link li" href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
    </>
  )
}

function PageTitle({ children }) {
  return <h2 className="page-title"><span className="square" aria-hidden="true" />{children}</h2>
}

/* ---------------------------- Illustrations ---------------------------- */
/* Simple drawings that stand in for project and blog photos.
   To use a real image instead, put it in /public and swap the <Art /> for <img src={asset('file.jpg')} />. */
function DashboardArt() {
  const bars = [52, 80, 66, 104, 92, 128, 116, 150]
  return (
    <svg viewBox="0 0 290 364" preserveAspectRatio="xMidYMid slice">
      <rect width="290" height="364" fill="#f1e8e2" />
      <rect x="24" y="28" width="242" height="308" rx="6" fill="#fff" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={40 + i * 72} y="48" width="62" height="44" rx="4" fill={i === 0 ? '#0b3dff' : '#e1d5c9'} />
          <rect x={48 + i * 72} y="58" width="28" height="5" rx="2.5" fill={i === 0 ? '#9fb2ff' : '#fff'} />
          <rect x={48 + i * 72} y="70" width="40" height="10" rx="3" fill={i === 0 ? '#fff' : '#b9a998'} />
        </g>
      ))}
      <g transform="translate(40 280)">
        {bars.map((h, i) => <rect key={i} x={i * 26} y={-h} width="17" height={h} rx="2" fill={i === bars.length - 1 ? '#0b3dff' : '#c9b8a6'} />)}
      </g>
      <polyline points="48,236 74,214 100,222 126,190 152,198 178,168 204,176 230,146" fill="none" stroke="#0b3dff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="40" y="296" width="210" height="2" fill="#e1d5c9" />
      <rect x="40" y="308" width="90" height="6" rx="3" fill="#e1d5c9" />
    </svg>
  )
}

function MarketArt({ dark = '#0a1430' }) {
  // [x, wickTop, wickBottom, bodyTop, bodyHeight, up]
  const c = [
    [30, 250, 320, 268, 34, 0], [60, 232, 300, 246, 36, 1], [90, 210, 280, 222, 38, 1], [120, 222, 286, 232, 30, 0],
    [150, 190, 256, 200, 36, 1], [180, 172, 236, 182, 34, 1], [210, 184, 244, 190, 32, 0], [240, 150, 214, 160, 36, 1],
    [270, 128, 190, 136, 36, 1],
  ]
  return (
    <svg viewBox="0 0 290 364" preserveAspectRatio="xMidYMid slice">
      <rect width="290" height="364" fill={dark} />
      {[90, 160, 230, 300].map((y) => <line key={y} x1="0" y1={y} x2="290" y2={y} stroke="#1c2a55" />)}
      {c.map(([x, t, b, by, bh, up]) => {
        const col = up ? '#4d74ff' : '#e1d5c9'
        return (
          <g key={x}>
            <line x1={x} y1={t} x2={x} y2={b} stroke={col} strokeWidth="2" />
            <rect x={x - 7} y={by} width="14" height={bh} fill={col} />
          </g>
        )
      })}
      <polyline points="10,300 60,270 120,250 180,200 240,170 285,130" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="6 6" opacity=".7" />
    </svg>
  )
}

function RiskArt() {
  return (
    <svg viewBox="0 0 290 290" preserveAspectRatio="xMidYMid slice">
      <rect width="290" height="290" fill="#6f6458" />
      <path d="M60 190a85 85 0 0 1 170 0" fill="none" stroke="#e1d5c9" strokeWidth="22" opacity=".35" />
      <path d="M60 190a85 85 0 0 1 60-81" fill="none" stroke="#4d74ff" strokeWidth="22" />
      <path d="M120 109a85 85 0 0 1 70 0" fill="none" stroke="#e1d5c9" strokeWidth="22" />
      <path d="M190 109a85 85 0 0 1 40 81" fill="none" stroke="#d9573f" strokeWidth="22" />
      <line x1="145" y1="190" x2="195" y2="132" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <circle cx="145" cy="190" r="10" fill="#fff" />
      <path d="M232 40l26 10v20c0 18-11 30-26 36-15-6-26-18-26-36V50l26-10Z" fill="#f1e8e2" opacity=".9" />
      <path d="m220 70 9 9 16-17" fill="none" stroke="#6f6458" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExcelArt() {
  const rows = 9, cols = 6
  return (
    <svg viewBox="0 0 290 290" preserveAspectRatio="xMidYMid slice">
      <rect width="290" height="290" fill="#1b3a2a" />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect key={`${r}-${c}`} x={14 + c * 46} y={14 + r * 30} width="42" height="26" rx="2"
            fill={r === 0 ? '#2f6b4c' : (r + c) % 5 === 0 ? '#4d74ff' : '#244c37'} />
        ))
      )}
      <polyline points="30,230 80,200 130,212 180,160 230,170 270,120" fill="none" stroke="#e1d5c9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ART = {
  dashboard: DashboardArt,
  market: MarketArt,
  risk: RiskArt,
  excel: ExcelArt,
}

/* ---------------------------- Header ---------------------------- */
function Header({ data, active }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav" aria-label="Main">
        <a className="brand" href={pageUrl('about')}><span className="square" aria-hidden="true" />{data.firstName} {data.lastName}</a>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`} id="nav-links">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={pageUrl(n.id)}
                className={active === n.id ? 'active' : ''}
                aria-current={active === n.id ? 'page' : undefined}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

/* ---------------------------- About Me ---------------------------- */
function Avatar({ data }) {
  const [failed, setFailed] = useState(!data.photo)
  return (
    <div className="avatar">
      {failed
        ? <span aria-hidden="true">{data.initials}</span>
        : <img src={asset(data.photo)} alt={`${data.firstName} ${data.lastName}`} onError={() => setFailed(true)} />}
    </div>
  )
}

function About({ data }) {
  return (
    <section id="about">
      <div className="about-bg" aria-hidden="true" />
      <div className="about-grid">
        <aside className="profile-card">
          <div className="profile-top">
            <Avatar data={data} />
            <h1>{data.firstName}<br />{data.lastName}</h1>
            <div className="rule" aria-hidden="true" />
          </div>
          <div className="profile-bottom"><SocialIcons data={data} /></div>
        </aside>

        <div className="about-copy">
          <h2 className="hello">Hello</h2>
          <h3 className="tagline">Here&apos;s who I am &amp; what I do</h3>
          {data.about.map((p) => <p key={p}>{p}</p>)}
          <div className="about-actions">
            <a className="btn" href={asset(data.resumePdf)} download><Icon name="download" />Download Resume</a>
            <a className="btn outline" href={pageUrl('contact')}>Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------- Resume ---------------------------- */
function Resume({ data }) {
  return (
    <section id="resume" className="beige">
      <div className="wrap">
        <PageTitle>Resume</PageTitle>
        <div className="resume-actions">
          <a className="btn" href={asset(data.resumePdf)} target="_blank" rel="noopener noreferrer"><Icon name="download" />View PDF</a>
        </div>

        <h3 className="sub-title">Education</h3>
        {data.education.map((e) => (
          <div className="card edu-card" key={e.degree}>
            <h4 className="blue-title">{e.degree}</h4>
            <p>{e.school}</p>
            <p className="small">{e.dates}</p>
          </div>
        ))}

        <h3 className="sub-title">Experience</h3>
        {data.experience.map((j) => (
          <div className="card job-card" key={j.org + j.dates}>
            <div>
              <h4 className="blue-title">{j.title}</h4>
              <p className="org">{j.org}</p>
              <p className="small">{j.location}<br />{j.dates}</p>
            </div>
            <ul className="bullets">{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}

        <h3 className="sub-title">Professional Skillset</h3>
        <div className="card">
          {data.skills.map((s) => (
            <div className="skill-row" key={s.group}>
              <h4 className="blue-title" style={{ fontSize: '1.05rem' }}>{s.group}</h4>
              <p style={{ margin: 0 }}>{s.items}</p>
            </div>
          ))}
        </div>

        <h3 className="sub-title">Certificates</h3>
        {data.certificates.map((c) => (
          <div className="card cert-card" key={c.name}>
            <div>
              <h4 className="blue-title" style={{ fontSize: '1.1rem' }}>{c.name}</h4>
              <p>{c.issuer}</p>
            </div>
            <span className={`when${/progress/i.test(c.date) ? ' progress' : ''}`}>{c.date}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------- Projects ---------------------------- */
function Projects({ data }) {
  return (
    <section id="projects" className="beige">
      <div className="wrap">
        <PageTitle>Projects</PageTitle>
        {data.projects.map((p) => {
          const Art = ART[p.art] || DashboardArt
          return (
            <article className="project-card" key={p.title}>
              <div className="project-text">
                <h3 className="blue-title">{p.title}</h3>
                <p className="meta">{p.meta}</p>
                <ul className="bullets">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                {p.link && <a className="project-link" href={p.link} target="_blank" rel="noopener noreferrer">View project →</a>}
              </div>
              <div className="project-img" aria-hidden="true"><Art /></div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ---------------------------- Blogs ---------------------------- */
function Blogs({ data }) {
  return (
    <section id="blogs">
      <div className="blog-inner">
        <span className="crumb">All Posts</span>
        <h2>All Posts</h2>
        <div className="blog-grid">
          {data.blogs.map((b) => {
            const Art = ART[b.art] || MarketArt
            return (
              <article className="post" key={b.title}>
                <div className="post-bg" aria-hidden="true"><Art /></div>
                <div className="post-meta">{data.firstName} {data.lastName}<br />{b.status}</div>
                <div>
                  <h3>{b.link ? <a href={b.link} target="_blank" rel="noopener noreferrer">{b.title}</a> : b.title}</h3>
                  <div className="post-foot">{b.link && <span>Read post →</span>}</div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------- Contact ---------------------------- */
function Contact({ data }) {
  const [form, setForm] = useState({ first: '', last: '', email: '', subject: '', message: '' })
  const [invalid, setInvalid] = useState({})
  const [status, setStatus] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const bad = {
      first: !form.first.trim(),
      last: !form.last.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    }
    setInvalid(bad)
    if (bad.first || bad.last || bad.email) {
      setStatus('Please fill in your name and a valid email.')
      return
    }
    // GitHub Pages has no server, so the form opens the visitor's email app with the message filled in.
    const subject = form.subject.trim() || `Portfolio message from ${form.first} ${form.last}`
    const body = `${form.message}\n\n— ${form.first} ${form.last}\n${form.email}`
    window.location.href = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('Opening your email app…')
  }

  return (
    <section id="contact" className="beige">
      <PageTitle>Let&apos;s talk</PageTitle>
      <div className="contact-card">
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="first">First Name *</label>
            <input id="first" type="text" autoComplete="given-name" required value={form.first} onChange={set('first')} aria-invalid={invalid.first || undefined} />
          </div>
          <div className="field">
            <label htmlFor="last">Last Name *</label>
            <input id="last" type="text" autoComplete="family-name" required value={form.last} onChange={set('last')} aria-invalid={invalid.last || undefined} />
          </div>
          <div className="field full">
            <label htmlFor="email">Email *</label>
            <input id="email" type="email" autoComplete="email" required value={form.email} onChange={set('email')} aria-invalid={invalid.email || undefined} />
          </div>
          <div className="field full">
            <label htmlFor="subject">Subject</label>
            <input id="subject" type="text" value={form.subject} onChange={set('subject')} />
          </div>
          <div className="field full">
            <label htmlFor="message">Message</label>
            <textarea id="message" value={form.message} onChange={set('message')} />
          </div>
          <div className="form-foot">
            <button className="btn" type="submit">Send</button>
            <p className="form-status" role="status" aria-live="polite">{status}</p>
          </div>
        </form>
      </div>
    </section>
  )
}

/* ---------------------------- App ---------------------------- */
const PAGES = { about: About, resume: Resume, projects: Projects, blogs: Blogs, contact: Contact }

// "page" comes from the data-page attribute in each page's index.html (see main.jsx).
export default function App({ page = 'about' }) {
  const data = DEFAULT_DATA
  const Page = PAGES[page] || About

  return (
    <>
      <Header data={data} active={page} />
      <main>
        <Page data={data} />
      </main>
      <footer>
        <div>© {new Date().getFullYear()} by {data.firstName} {data.lastName}.</div>
        <div className="foot-cols">
          <div>
            <h4>Email</h4>
            <a href={`mailto:${data.email}`}>{data.email}</a>
          </div>
          <div>
            <h4>Follow</h4>
            <div className="foot-icons"><SocialIcons data={data} /></div>
          </div>
        </div>
      </footer>
    </>
  )
}
