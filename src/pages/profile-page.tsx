import { ArrowLeft, ArrowUpRight, ArrowRight, BookOpen, GraduationCap, Code2, BriefcaseBusiness, Download, FileText } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import ArrowFillButton from '@/components/ui/arrow-fill-button';
import { certificates } from '@/data/certificates';

const mail = 'mailto:faizan.ags106@gmail.com?subject=Internship%20opportunity';
const ctaColors = { bgColor: '#712e3e', textColor: '#fffaf5', fillBgColor: '#f5ede4', fillTextColor: '#712e3e', hoverFillBgColor: '#f5ede4', hoverFillTextColor: '#712e3e' };

function Certifications() {
  return <section className="certifications" aria-labelledby="certifications-title">
    <div className="profile-section-heading"><p className="eyebrow">02 / CERTIFICATIONS & RECOGNITION</p><div><h2 id="certifications-title">Curiosity, with<br/><span className="serif">something to show.</span></h2><p className="certificates-intro">Awards, certifications and learning experiences that mark the work I’m doing beyond the classroom. Newest milestones are added here as they happen.</p></div></div>
    <div className="certificate-grid">
      {certificates.map((certificate) => {
        const primaryHref = certificate.document ?? certificate.image;
        return <article className={`certificate-card${certificate.featured ? ' certificate-card-featured' : ''}`} key={certificate.id}>
          <a className="certificate-image" href={primaryHref} target="_blank" rel="noreferrer" aria-label={`View ${certificate.title}`}>
            {certificate.featured && <span className="certificate-featured-label">LATEST AWARD</span>}
            <img src={certificate.image} alt={`${certificate.title} — ${certificate.issuer}`} loading="lazy"/>
          </a>
          <div className="certificate-info">
            <p className="eyebrow">{certificate.eyebrow}</p>
            <h3>{certificate.title}</h3>
            <p>{certificate.issuer}{certificate.description && <><br/>{certificate.description}</>}</p>
            <time dateTime={certificate.date}>{certificate.dateLabel}</time>
            <div className="certificate-links">
              <a className="inline-link" href={primaryHref} target="_blank" rel="noreferrer">View {certificate.kind === 'Award' ? 'award' : 'certificate'} <ArrowUpRight size={15}/></a>
              {certificate.verifyUrl && <a className="inline-link" href={certificate.verifyUrl} target="_blank" rel="noreferrer">Verify on Coursera <ArrowUpRight size={15}/></a>}
            </div>
          </div>
        </article>;
      })}
    </div>
  </section>;
}

function Education() {
  return <>
    <section className="profile-intro shell" aria-labelledby="page-title">
      <div><p className="eyebrow">THE FOUNDATION / EDUCATION</p><h1 id="page-title">Always a student.<br/><span className="serif">Always building.</span></h1><p className="profile-lead">A foundation in science, a growing understanding of software, and a habit of putting what I learn to work.</p></div>
      <aside className="profile-summary"><GraduationCap size={30} strokeWidth={1.2}/><p className="eyebrow">CURRENT CHAPTER</p><h2>B.Tech<br/>Information Technology</h2><p>Garden City University<br/>Bengaluru, Karnataka</p><span className="profile-badge"><span className="availability-dot"/>Second year · In progress</span></aside>
    </section>
    <section className="profile-body shell" aria-labelledby="education-title">
      <div className="profile-section-heading"><p className="eyebrow">01 / ACADEMIC JOURNEY</p><h2 id="education-title">Learning the principles.<br/><span className="serif">Testing the possibilities.</span></h2></div>
      <div className="journey-list">
        <article className="journey-item"><div className="journey-aside"><span className="journey-number">01</span><p>UNDERGRADUATE</p><span>In progress</span></div><div className="journey-content"><h3>B.Tech in Information Technology</h3><p className="journey-place">Garden City University · Bengaluru</p><p>My current degree gives me a place to develop the fundamentals behind the products I want to build: how programs work, how data is organized, and how intelligent systems make decisions.</p><div className="subject-tags">{['C & Python','Java & OOP','Data structures','Operating systems','Artificial intelligence','Probability & statistics'].map(t=><span key={t}>{t}</span>)}</div></div></article>
        <article className="journey-item"><div className="journey-aside"><span className="journey-number">02</span><p>PRE-UNIVERSITY</p><span>Completed in 2025</span></div><div className="journey-content"><h3>Second PUC · PCMB</h3><p className="journey-place">St. Joseph’s</p><p>Studied Physics, Chemistry, Mathematics and Biology before moving into Information Technology. This science background shaped my interest in analytical thinking and understanding how systems behave.</p><div className="subject-tags">{['Physics','Chemistry','Mathematics','Biology'].map(t=><span key={t}>{t}</span>)}</div></div></article>
      </div>
      <div className="learning-grid"><article><BookOpen size={23} strokeWidth={1.3}/><h3>From concepts to code</h3><p>I work through programming exercises and then apply the same ideas to websites, AI experiments and operations interfaces.</p><a href="https://github.com/Faizan-ahmed-ags/python-programs" target="_blank" rel="noreferrer">Python practice <ArrowUpRight size={15}/></a></article><article><Code2 size={23} strokeWidth={1.3}/><h3>Learning by debugging</h3><p>Setting up models, connecting tools and troubleshooting my local environment has become a practical part of my learning.</p><a href="/experience.html">Explore my experience <ArrowUpRight size={15}/></a></article><article className="learning-event"><img src="/images/tedx-moment.jpg" alt="Faizan with fellow attendees at TEDxSJCC" loading="lazy"/><div><span className="eyebrow">BEYOND THE CLASSROOM</span><h3>TEDxSJCC · Attendee</h3><p>Attended “Artificial Minds and Natural Limits,” exploring AI and sustainability.</p></div></article></div>
      <Certifications/>
    </section>
  </>;
}

function Experience() {
  return <>
    <section className="profile-intro shell" aria-labelledby="page-title">
      <div><p className="eyebrow">THE PRACTICE / EXPERIENCE</p><h1 id="page-title">Learning through<br/><span className="serif">real responsibility.</span></h1><p className="profile-lead">Founder-led work, personal software projects, and collaborative prototypes. The experiences shaping how I think and build.</p></div>
      <aside className="profile-summary experience-summary"><BriefcaseBusiness size={30} strokeWidth={1.2}/><p className="eyebrow">MY APPROACH</p><h2>Understand.<br/>Build. Improve.</h2><p>Business context meets<br/>hands-on technical exploration.</p><span className="profile-badge"><span className="availability-dot"/>Open to internships</span></aside>
    </section>
    <section className="profile-body shell" aria-labelledby="experience-title">
      <div className="profile-section-heading"><p className="eyebrow">01 / PRACTICAL EXPERIENCE</p><h2 id="experience-title">A closer look<br/><span className="serif">at the work.</span></h2></div>
      <div className="journey-list">
        <article className="journey-item"><div className="journey-aside"><span className="journey-number">01</span><p>ENTREPRENEURSHIP</p><span>Founder-led work</span></div><div className="journey-content"><h3>Founder · KZEL Global Ventures</h3><p className="journey-place">Indian spices & international trade · Bengaluru</p><p>Building an export business has put me close to the full problem: presenting a product clearly, understanding a buyer’s requirements, and organizing the work needed to follow through.</p><ul><li>Worked on buyer research, supplier coordination, product specifications and outreach preparation for spice exports.</li><li>Built the company’s web presence and added search metadata, structured data and Google Search Console verification.</li><li>Explored CRM and automation workflows to organize leads, markets, campaigns and follow-ups.</li></ul><div className="subject-tags"><span>Business development</span><span>Web development</span><span>SEO</span><span>Workflow design</span></div><a className="inline-link" href="https://github.com/Faizan-ahmed-ags/KZEL-GLOBAL-VENTURES" target="_blank" rel="noreferrer">Explore the website source <ArrowUpRight size={15}/></a></div></article>
        <figure className="experience-photo"><img src="/images/faizan-candid.jpg" alt="Faizan in a black polo shirt and jeans" loading="lazy"/><figcaption><p className="eyebrow">THE PERSON BEHIND THE WORK</p><h2>A builder.<br/>A learner.<br/><span className="serif">Always in progress.</span></h2><p>From university projects and hackathons to building KZEL, I look for opportunities to turn learning into something useful.</p><a href="/education.html#certifications-title" className="inline-link">Explore my learning <ArrowUpRight size={16}/></a></figcaption></figure>
        <article className="journey-item"><div className="journey-aside"><span className="journey-number">02</span><p>INDEPENDENT PROJECTS</p><span>Personal technical work</span></div><div className="journey-content"><h3>AI & software exploration</h3><p className="journey-place">JARVIS · KZEL operations interfaces</p><p>My personal projects give me room to explore how AI and software can support everyday work, from a voice assistant on Windows to an interface for an export business.</p><ul><li>Set up and tested voice input, wake-word listening and model connections for my JARVIS assistant.</li><li>Explored local models, persistent project memory and tool integration while troubleshooting a Windows development environment.</li><li>Worked on product direction and frontend integration for the KZEL operations interface.</li></ul><div className="subject-tags"><span>Python</span><span>React & TypeScript</span><span>Local AI</span><span>Integration</span></div><p className="experience-context">JARVIS builds on MARK XLVIII by FatihMakes. The KZEL operations repository is an interface prototype with simulated agent workflows.</p><a className="inline-link" href="/#work">Read the project notes <ArrowUpRight size={15}/></a></div></article>
        <article className="journey-item"><div className="journey-aside"><span className="journey-number">03</span><p>TEAM PROJECT</p><span>Collaborative prototype</span></div><div className="journey-content"><h3>Frontend · Service portal bridge</h3><p className="journey-place">Student, healthcare and farmer-scheme portal concept</p><p>In our team’s service-portal project, my assigned focus is the frontend of a bridge application. The goal is to make repeated form-filling easier across multiple prototype portals.</p><ul><li>Helped define the user journey between separate portals and a shared form-filling interface.</li><li>Coordinated frontend responsibilities with teammates handling websites, backend tokens and connections.</li></ul><div className="subject-tags"><span>Frontend planning</span><span>User flows</span><span>Team coordination</span></div><p className="experience-context">Student prototype in development, focused on the frontend and proposed user journey.</p></div></article>
        <article className="journey-item"><div className="journey-aside"><span className="journey-number">04</span><p>HACKATHONS</p><span>Participation</span></div><div className="journey-content"><h3>Smart India Hackathon & other hackathons</h3><p className="journey-place">Learning beyond the classroom</p><p>I have participated in Smart India Hackathon (SIH) and other hackathons, alongside my university studies and personal projects. These experiences are part of my interest in building with others and exploring practical problems.</p><div className="subject-tags"><span>Hackathon participation</span><span>Collaborative learning</span><span>Problem-solving</span></div></div></article>
      </div>
      <div className="experience-outlook"><p className="eyebrow">WHAT I WANT TO BUILD ON</p><p>I’m ready to bring this curiosity to an internship: contribute to useful software, learn from code reviews, and grow through ownership of real tasks.</p><a href="/education.html" className="inline-link">View my education <ArrowRight size={16}/></a></div>
    </section>
  </>;
}

export default function ProfilePage({page}:{page:'education'|'experience'}) {
  return <><a className="skip-link" href="#main">Skip to content</a><SiteHeader active={page}/><main id="main" className="profile-page"><div className="shell profile-back"><a href="/" className="inline-link"><ArrowLeft size={14}/>Back to portfolio</a><a className="profile-resume-link" href="/resume/Faizan-Ahmed-Shaikh-Resume.pdf" target="_blank" rel="noreferrer"><FileText size={15}/>Résumé <Download size={14}/></a></div>{page==='education'?<Education/>:<Experience/>}<section className="profile-cta shell" aria-labelledby="profile-cta-title"><div><p className="eyebrow">THE NEXT CHAPTER</p><h2 id="profile-cta-title">Let’s put curiosity<br/><span className="serif">to work.</span></h2></div><div><p>Looking for an intern who enjoys building,<br/>learning and solving practical problems?</p><div className="profile-cta-actions"><ArrowFillButton href={mail} btnText="Start a conversation" {...ctaColors}/><a className="resume-button" href="/resume/Faizan-Ahmed-Shaikh-Resume.pdf" target="_blank" rel="noreferrer"><span><FileText/></span>View résumé <Download/></a></div></div></section></main><div className="profile-footer shell"><footer><a href="/" className="wordmark">faizan<span>.</span></a><span>© {new Date().getFullYear()} FAIZAN AHMED SHEIKH</span><a href={page==='education'?'/experience.html':'/education.html'}>{page==='education'?'EXPERIENCE':'EDUCATION'} <ArrowUpRight size={14}/></a></footer></div></>;
}
