import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Github, Loader2, LockKeyhole, LogOut, Plus, RefreshCw, Upload } from 'lucide-react';

const OWNER = 'Faizan-ahmed-ags';
const REPO = 'portfolio';
const BRANCH = 'main';
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
const tokenKey = 'faizanPortfolioGitHubToken';

type Tab = 'certificate' | 'project';

type GithubFile<T> = { sha: string; data: T };

function bytesToBase64(bytes: Uint8Array) {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function textToBase64(text: string) {
  return bytesToBase64(new TextEncoder().encode(text));
}

function base64ToText(value: string) {
  const binary = atob(value.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
}

async function fileToBase64(file: File) {
  const buffer = await file.arrayBuffer();
  return bytesToBase64(new Uint8Array(buffer));
}

function prettyDate(value: string) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
}

export default function StudioPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(tokenKey) ?? '');
  const [connected, setConnected] = useState(false);
  const [checking, setChecking] = useState(false);
  const [tab, setTab] = useState<Tab>('certificate');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }), [token]);

  useEffect(() => {
    document.title = 'Portfolio Studio · Faizan Ahmed Sheikh';
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex,nofollow';
    return () => { if (created) robots?.remove(); };
  }, []);

  useEffect(() => {
    if (token) void checkConnection(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkConnection(showMessage = true) {
    if (!token.trim()) return;
    setChecking(true); setError('');
    try {
      const response = await fetch(API, { headers: authHeaders });
      if (!response.ok) throw new Error('GitHub rejected this token. Check that it can access the portfolio repository.');
      const repo = await response.json();
      if (repo.permissions && repo.permissions.push === false) throw new Error('This token can read the repository but cannot publish changes.');
      sessionStorage.setItem(tokenKey, token);
      setConnected(true);
      if (showMessage) setMessage('Connected. Changes you publish here will be committed to GitHub and Vercel will redeploy automatically.');
    } catch (err) {
      setConnected(false);
      setError(err instanceof Error ? err.message : 'Could not connect to GitHub.');
    } finally { setChecking(false); }
  }

  function disconnect() {
    sessionStorage.removeItem(tokenKey);
    setToken(''); setConnected(false); setMessage(''); setError('');
  }

  async function getJson<T>(path: string): Promise<GithubFile<T>> {
    const response = await fetch(`${API}/contents/${path}?ref=${BRANCH}`, { headers: authHeaders });
    if (!response.ok) throw new Error(`Could not read ${path} from GitHub.`);
    const file = await response.json();
    return { sha: file.sha, data: JSON.parse(base64ToText(file.content)) as T };
  }

  async function put(path: string, content: string, commitMessage: string, sha?: string) {
    const response = await fetch(`${API}/contents/${path}`, {
      method: 'PUT',
      headers: { ...authHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: commitMessage, content, branch: BRANCH, ...(sha ? { sha } : {}) }),
    });
    if (!response.ok) {
      const details = await response.json().catch(() => ({}));
      throw new Error(details?.message || `Could not publish ${path}.`);
    }
    return response.json();
  }

  return <main className="studio-page">
    <div className="studio-shell">
      <div className="studio-topbar">
        <a href="/" className="studio-back"><ArrowLeft size={16}/> Portfolio</a>
        <div><span>FAIZAN PORTFOLIO</span><strong>Content Studio</strong></div>
        {connected ? <button className="studio-ghost" onClick={disconnect}><LogOut size={15}/> Disconnect</button> : <span/>}
      </div>

      {!connected ? <section className="studio-login">
        <div className="studio-login-icon"><LockKeyhole size={28}/></div>
        <p className="eyebrow">PRIVATE PUBLISHING ACCESS</p>
        <h1>Update your portfolio<br/><span className="serif">without touching code.</span></h1>
        <p className="studio-lead">Use a GitHub fine-grained personal access token limited to the <strong>{OWNER}/{REPO}</strong> repository with <strong>Contents: Read and write</strong>. The token is kept only in your browser session and is never stored in the website source.</p>
        <label className="studio-field"><span>GitHub token</span><input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="github_pat_…" autoComplete="off"/></label>
        <button className="studio-primary" disabled={!token.trim() || checking} onClick={() => checkConnection()}>{checking ? <Loader2 className="studio-spin" size={17}/> : <Github size={17}/>} Connect to my portfolio</button>
        <p className="studio-help">For safety, create a dedicated token for this one repository and give it an expiration date. Do not use a full-account classic token.</p>
        {error && <div className="studio-alert studio-error">{error}</div>}
      </section> : <section className="studio-workspace">
        <header className="studio-heading"><div><p className="eyebrow">PUBLISH TO YOUR LIVE PORTFOLIO</p><h1>Add something new.</h1><p>Choose a content type, fill the form, and publish. GitHub receives the change and your connected Vercel project rebuilds from <code>main</code>.</p></div><button className="studio-ghost" onClick={() => checkConnection()}><RefreshCw size={15}/> Check connection</button></header>
        <div className="studio-tabs" role="tablist"><button className={tab === 'certificate' ? 'active' : ''} onClick={() => setTab('certificate')}><Plus size={15}/> Award / Certificate</button><button className={tab === 'project' ? 'active' : ''} onClick={() => setTab('project')}><Plus size={15}/> Project</button></div>
        {message && <div className="studio-alert studio-success"><CheckCircle2 size={17}/>{message}</div>}
        {error && <div className="studio-alert studio-error">{error}</div>}
        {tab === 'certificate' ? <CertificateForm getJson={getJson} put={put} onMessage={setMessage} onError={setError}/> : <ProjectForm getJson={getJson} put={put} onMessage={setMessage} onError={setError}/>} 
      </section>}
    </div>
  </main>;
}

function CertificateForm({ getJson, put, onMessage, onError }: any) {
  const [saving, setSaving] = useState(false);
  const [kind, setKind] = useState('Award');
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [verifyUrl, setVerifyUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!image) { onError('Choose a certificate or award image first.'); return; }
    setSaving(true); onError(''); onMessage('');
    try {
      const baseSlug = slugify(`${title}-${date.slice(0, 4) || new Date().getFullYear()}`);
      const ext = (image.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
      const filename = `${baseSlug}.${ext}`;
      const repoImagePath = `public/certificates/${filename}`;
      await put(repoImagePath, await fileToBase64(image), `Add portfolio media: ${title}`);

      const file = await getJson('src/data/certificates.json');
      const list = file.data as any[];
      const action = kind === 'Award' ? 'Awarded' : kind === 'Participation' ? 'Attended' : 'Completed';
      const item = {
        id: baseSlug,
        kind,
        eyebrow: `${issuer.toUpperCase()} · ${kind.toUpperCase()}`,
        title,
        issuer,
        ...(description.trim() ? { description: description.trim() } : {}),
        date,
        dateLabel: `${action} ${prettyDate(date)}`,
        image: `/certificates/${filename}`,
        ...(verifyUrl.trim() ? { verifyUrl: verifyUrl.trim() } : {}),
      };
      list.unshift(item);
      await put('src/data/certificates.json', textToBase64(`${JSON.stringify(list, null, 2)}\n`), `Add ${kind.toLowerCase()}: ${title}`, file.sha);
      setTitle(''); setIssuer(''); setDate(''); setDescription(''); setVerifyUrl(''); setImage(null);
      const input = document.getElementById('certificate-image') as HTMLInputElement | null; if (input) input.value = '';
      onMessage(`${title} was published. Vercel should pick up the GitHub commit automatically.`);
    } catch (err) { onError(err instanceof Error ? err.message : 'Could not publish this item.'); }
    finally { setSaving(false); }
  }

  return <form className="studio-form" onSubmit={submit}>
    <div className="studio-form-title"><div><span>01</span><h2>Recognition</h2></div><p>Add awards, certificates, hackathon wins and event participation.</p></div>
    <div className="studio-form-grid">
      <label className="studio-field"><span>Type</span><select value={kind} onChange={(e) => setKind(e.target.value)}><option>Award</option><option>Certificate</option><option>Participation</option></select></label>
      <label className="studio-field"><span>Date</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/></label>
      <label className="studio-field studio-span"><span>Title</span><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Fund My Crazy: Build Night Champion" required/></label>
      <label className="studio-field studio-span"><span>Organization / issuer</span><input value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="Google Student Ambassador Program 2026" required/></label>
      <label className="studio-field studio-span"><span>Short description</span><textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What was this recognition for?" rows={4}/></label>
      <label className="studio-field studio-span"><span>Verification URL <small>optional</small></span><input type="url" value={verifyUrl} onChange={(e) => setVerifyUrl(e.target.value)} placeholder="https://…"/></label>
      <label className="studio-upload studio-span" htmlFor="certificate-image"><Upload size={20}/><span>{image ? image.name : 'Choose certificate / award image'}</span><small>JPG, PNG or WEBP recommended</small><input id="certificate-image" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setImage(e.target.files?.[0] ?? null)} required/></label>
    </div>
    <button className="studio-primary studio-publish" disabled={saving}>{saving ? <Loader2 className="studio-spin" size={17}/> : <Upload size={17}/>} Publish recognition</button>
  </form>;
}

function ProjectForm({ getJson, put, onMessage, onError }: any) {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Web & product');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [repo, setRepo] = useState('');
  const [live, setLive] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [overview, setOverview] = useState('');
  const [contributions, setContributions] = useState('');
  const [note, setNote] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault(); setSaving(true); onError(''); onMessage('');
    try {
      const file = await getJson('src/data/projects.json');
      const list = file.data as any[];
      const item = {
        id: slugify(name), number: String(list.length + 1).padStart(2, '0'), name, category,
        label: category === 'AI & automation' ? 'AI / AUTOMATION / EXPERIMENTATION' : 'DESIGN / ENGINEERING / PRODUCT',
        description, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean), repo,
        ...(live.trim() ? { live: live.trim() } : {}), role, status, overview,
        contributions: contributions.split('\n').map((line) => line.trim()).filter(Boolean), note,
      };
      list.push(item);
      await put('src/data/projects.json', textToBase64(`${JSON.stringify(list, null, 2)}\n`), `Add portfolio project: ${name}`, file.sha);
      setName(''); setDescription(''); setTags(''); setRepo(''); setLive(''); setRole(''); setStatus(''); setOverview(''); setContributions(''); setNote('');
      onMessage(`${name} was published. It will appear in Selected Work after Vercel redeploys.`);
    } catch (err) { onError(err instanceof Error ? err.message : 'Could not publish this project.'); }
    finally { setSaving(false); }
  }

  return <form className="studio-form" onSubmit={submit}>
    <div className="studio-form-title"><div><span>02</span><h2>Project</h2></div><p>Add work without editing the homepage layout.</p></div>
    <div className="studio-form-grid">
      <label className="studio-field studio-span"><span>Project name</span><input value={name} onChange={(e) => setName(e.target.value)} required/></label>
      <label className="studio-field"><span>Category</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option>Web & product</option><option>AI & automation</option></select></label>
      <label className="studio-field"><span>Status</span><input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Prototype · In progress" required/></label>
      <label className="studio-field studio-span"><span>One-line description</span><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required/></label>
      <label className="studio-field studio-span"><span>Tags <small>comma separated</small></span><input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, TypeScript, AI" required/></label>
      <label className="studio-field"><span>GitHub repository</span><input type="url" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="https://github.com/…" required/></label>
      <label className="studio-field"><span>Live URL <small>optional</small></span><input type="url" value={live} onChange={(e) => setLive(e.target.value)} placeholder="https://…"/></label>
      <label className="studio-field studio-span"><span>Your role</span><input value={role} onChange={(e) => setRole(e.target.value)} required/></label>
      <label className="studio-field studio-span"><span>Project overview</span><textarea value={overview} onChange={(e) => setOverview(e.target.value)} rows={5} required/></label>
      <label className="studio-field studio-span"><span>Your contributions <small>one item per line</small></span><textarea value={contributions} onChange={(e) => setContributions(e.target.value)} rows={5} required/></label>
      <label className="studio-field studio-span"><span>Note / disclosure</span><textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} required/></label>
    </div>
    <button className="studio-primary studio-publish" disabled={saving}>{saving ? <Loader2 className="studio-spin" size={17}/> : <Upload size={17}/>} Publish project</button>
  </form>;
}
