import { useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, FileText, FolderKanban, GraduationCap, Menu, MessageCircle, UserRound, X } from 'lucide-react';

export default function SiteHeader({ active = 'home' }: { active?: 'home' | 'education' | 'experience' }) {
  const [open, setOpen] = useState(false);
  const home = active === 'home';
  return <header className="site-header">
    <a href={home ? '#top' : '/'} className="wordmark" aria-label="Faizan home">faizan<span>✳</span></a>
    <nav className={open ? 'navigation open' : 'navigation'} aria-label="Main navigation">
      <a href={home ? '#work' : '/#work'} onClick={() => setOpen(false)}><span className="nav-icon nav-icon-work"><FolderKanban/></span>Work</a>
      <a href={home ? '#about' : '/#about'} onClick={() => setOpen(false)}><span className="nav-icon nav-icon-person"><UserRound/></span>The person</a>
      <a href="/education.html" aria-current={active === 'education' ? 'page' : undefined}><span className="nav-icon nav-icon-education"><GraduationCap/></span>Education</a>
      <a href="/experience.html" aria-current={active === 'experience' ? 'page' : undefined}><span className="nav-icon nav-icon-experience"><BriefcaseBusiness/></span>Experience</a>
      <a className="resume-nav" href="/resume/Faizan-Ahmed-Shaikh-Resume.pdf" target="_blank" rel="noreferrer"><span className="nav-icon nav-icon-resume"><FileText/></span>Resume</a>
      <a href={home ? '#contact' : '/#contact'} onClick={() => setOpen(false)}><span className="nav-icon nav-icon-talk"><MessageCircle/></span>Let’s talk <ArrowUpRight size={15}/></a>
    </nav>
    <span className="header-location">BENGALURU, INDIA <span className="location-dot"/></span>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
  </header>;
}
