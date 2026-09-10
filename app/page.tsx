'use client'

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  FileImage,
  Leaf,
  Menu,
  Microscope,
  MoveRight,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Upload,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, DragEvent, useRef, useState } from 'react'
import { DISEASE_INFO, predictDisease } from '@/lib/predictionService'

const diseaseNames = Object.keys(DISEASE_INFO)

const diseaseColors: Record<string, string> = {
  Healthy: 'bg-green-100 text-green-700',
  Tungro: 'bg-amber-100 text-amber-700',
  'Rice Hispa': 'bg-orange-100 text-orange-700',
  'Brown Spot': 'bg-amber-100 text-amber-800',
  'Neck Blast': 'bg-red-100 text-red-700',
  'Narrow Brown Spot': 'bg-yellow-100 text-yellow-700',
  'Leaf Blast': 'bg-red-100 text-red-800',
  'Sheath Blight': 'bg-orange-100 text-orange-800',
  'Leaf Scald': 'bg-yellow-100 text-yellow-800',
  'Bacterial Leaf Blight': 'bg-red-100 text-red-700',
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3" aria-label="Vari Raksha AI home">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-green text-white shadow-sm">
        <Leaf className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="leading-tight">
        <span className="block text-base font-bold tracking-tight text-forest-green">Vari Raksha AI</span>
        <span className="block text-xs font-medium text-text-secondary">వరి రక్ష</span>
      </span>
    </a>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    ['Home', '#home'],
    ['Disease Detection', '#detection'],
    ['Disease Library', '#library'],
    ['About', '#about'],
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-text-secondary transition-colors hover:text-forest-green">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <button className="text-sm font-semibold text-text-secondary hover:text-forest-green" aria-label="Switch language">
            English <span className="mx-1 text-border">|</span> తెలుగు
          </button>
          <a href="#detection" className="btn-primary px-4 py-2.5 text-sm">Detect Disease</a>
        </div>
        <button className="focus-ring rounded-lg p-2 text-forest-green md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && (
        <nav className="border-t border-border bg-white px-5 pb-5 pt-3 md:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 text-sm font-medium text-text-secondary last:border-0 hover:text-forest-green">
              {label}
            </a>
          ))}
          <a href="#detection" onClick={() => setMenuOpen(false)} className="btn-primary mt-4 block text-center text-sm">Detect Disease</a>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_1.05fr] lg:px-8 lg:py-24">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-600/20 bg-green-50 px-3 py-1.5 text-sm font-semibold text-forest-green">
            <Sprout className="h-4 w-4" /> Smart Rice Crop Care
          </div>
          <h1 className="max-w-xl text-5xl font-bold leading-[1.08] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
            Protect Your Rice Crop with <span className="text-green-600">AI</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-text-secondary md:text-xl">
            Upload a clear image of a rice leaf and let AI identify possible diseases quickly and easily.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#detection" className="btn-primary inline-flex items-center justify-center gap-2">Detect Rice Disease <ArrowRight className="h-4 w-4" /></a>
            <a href="#library" className="btn-secondary inline-flex items-center justify-center gap-2">Explore Diseases</a>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-text-secondary">
            <span className="flex -space-x-2"><span className="h-8 w-8 rounded-full border-2 border-cream bg-green-100" /><span className="h-8 w-8 rounded-full border-2 border-cream bg-beige" /><span className="h-8 w-8 rounded-full border-2 border-cream bg-green-600" /></span>
            <span>Built for simpler, earlier crop care</span>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-forest-green shadow-xl lg:min-h-[530px]">
          <Image src="/rice-field.png" alt="Healthy rice leaves in a paddy field" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-green/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3">
            <div className="rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-bold text-forest-green"><Sparkles className="h-4 w-4" /> AI Detection</div>
              <p className="mt-1 text-xs text-text-secondary">Fast · Simple · Easy</p>
            </div>
            <div className="rounded-xl bg-forest-green p-4 text-white shadow-lg">
              <p className="text-2xl font-bold">10</p><p className="text-xs text-green-100">Supported classes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    [BarChart3, '10', 'Supported Classes'],
    [Sparkles, 'AI', 'Powered Detection'],
    [FileImage, 'Leaf', 'Image Based'],
    [ShieldCheck, 'Simple', 'Farmer Friendly'],
  ] as const
  return <section className="border-b border-border bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-6 md:grid-cols-4 lg:px-8">{stats.map(([Icon, value, label]) => <div key={label} className="flex items-center gap-3 border-border px-4 py-3 first:pl-0 md:border-r md:last:border-0"><Icon className="h-6 w-6 text-green-600" /><div><p className="font-bold text-text-primary">{value}</p><p className="text-xs text-text-secondary">{label}</p></div></div>)}</div></section>
}

function HowItWorks() {
  const steps = [[Upload, '01', 'Upload a Leaf Image', 'Take or select a clear photo of the rice leaf.'], [Microscope, '02', 'AI Analyzes the Image', 'The trained deep-learning model analyzes visual patterns.'], [CircleCheck, '03', 'View the Result', 'See the predicted disease and confidence score.']] as const
  return <section className="bg-bg px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="max-w-xl"><p className="text-sm font-bold uppercase tracking-widest text-green-600">Simple by design</p><h2 className="section-title mt-3">How Vari Raksha AI Works</h2><p className="section-subtitle">Detect a possible rice crop disease in three simple steps.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{steps.map(([Icon, number, title, copy]) => <div key={number} className="card-base relative"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 font-bold text-forest-green">{number}</span><Icon className="mt-8 h-8 w-8 text-green-600" /><h3 className="mt-5 text-xl font-bold text-text-primary">{title}</h3><p className="mt-2 leading-7 text-text-secondary">{copy}</p></div>)}</div></div></section>
}

function UploadArea({ onFile }: { onFile: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const validate = (file?: File) => {
    if (!file) return
    if (!['image/jpeg', 'image/png'].includes(file.type)) return setError('Please upload a JPG, JPEG, or PNG image.')
    if (file.size > 10 * 1024 * 1024) return setError('Image size must be below 10 MB.')
    setError(''); onFile(file)
  }
  const handleDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); validate(event.dataTransfer.files[0]) }
  return <div><div onDragOver={(e) => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={handleDrop} className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors md:p-12 ${dragging ? 'border-green-600 bg-green-50' : 'border-green-100 bg-green-50/40'}`}><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600"><Upload className="h-6 w-6" /></span><h3 className="mt-4 text-lg font-bold text-text-primary">Upload Rice Leaf Image</h3><p className="mt-2 text-sm text-text-secondary">Drag and drop your image here or click to browse</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button className="btn-primary inline-flex items-center justify-center gap-2" onClick={() => inputRef.current?.click()}><FileImage className="h-4 w-4" /> Choose from Gallery</button><button className="btn-secondary inline-flex items-center justify-center gap-2" onClick={() => inputRef.current?.click()}><Sprout className="h-4 w-4" /> Take Photo</button></div><p className="mt-5 text-xs text-text-secondary">JPG, JPEG, PNG · Up to 10 MB</p><input ref={inputRef} type="file" accept="image/jpeg,image/png" capture="environment" className="hidden" onChange={(e: ChangeEvent<HTMLInputElement>) => validate(e.target.files?.[0])} /></div>{error && <p className="mt-3 flex items-center gap-2 text-sm font-medium text-error"><CircleAlert className="h-4 w-4" />{error}</p>}</div>
}

function ResultCard({ file, onReset }: { file: File; onReset: () => void }) {
  const [result, setResult] = useState<Awaited<ReturnType<typeof predictDisease>> | null>(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(() => URL.createObjectURL(file))
  const analyze = async () => { setLoading(true); setResult(null); await new Promise((resolve) => setTimeout(resolve, 1400)); setResult(await predictDisease(file)); setLoading(false) }
  const info = result ? DISEASE_INFO[result.disease] : null
  return <div className="space-y-5"><div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-4 md:flex-row md:items-center"><div className="relative h-52 w-full shrink-0 overflow-hidden rounded-lg bg-green-50 md:w-56"><Image src={preview} alt="Uploaded rice leaf preview" fill className="object-cover" unoptimized /></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-text-primary">{file.name}</p><p className="mt-1 text-xs text-text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready to analyze</p></div><button onClick={onReset} className="focus-ring rounded-lg p-2 text-text-secondary hover:bg-green-50 hover:text-forest-green" aria-label="Remove image"><X className="h-5 w-5" /></button></div>{!result && !loading && <button onClick={analyze} className="btn-primary mt-8 inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> Analyze Image</button>}{loading && <div className="mt-8 flex items-center gap-3 text-forest-green"><span className="h-5 w-5 animate-spin rounded-full border-2 border-green-100 border-t-green-600" /><div><p className="font-semibold">Analyzing your rice leaf...</p><p className="text-sm text-text-secondary">AI is examining the uploaded image.</p></div></div>}</div></div>{result && (result.isInvalid ? <div className="rounded-xl border border-red-200 bg-red-50 p-6"><div className="flex items-start gap-3"><CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-error" /><div><h3 className="text-xl font-bold text-text-primary">Image Not Supported</h3><p className="mt-2 text-text-secondary">Please upload a clear image of a rice leaf.</p><button onClick={onReset} className="btn-primary mt-5 bg-error">Upload Another Image</button></div></div></div> : result.isLowConfidence ? <div className="rounded-xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-start gap-3"><CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-warning" /><div><h3 className="text-xl font-bold text-text-primary">Prediction Uncertain</h3><p className="mt-2 leading-7 text-text-secondary">Sorry, we couldn&apos;t make a reliable prediction from this image. Try a clearer, well-lit photo.</p><button onClick={onReset} className="btn-primary mt-5 bg-warning">Upload a Clearer Image</button></div></div></div> : info && <div className="rounded-xl border border-green-100 bg-green-50/60 p-6 md:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><p className="text-sm font-bold uppercase tracking-widest text-green-600">Detection result</p><h3 className="mt-2 text-3xl font-bold text-text-primary">{info.name}</h3><span className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${diseaseColors[info.name]}`}>High Confidence</span></div><div className="text-left sm:text-right"><p className="text-4xl font-bold text-forest-green">{(result.confidence * 100).toFixed(1)}%</p><p className="text-sm text-text-secondary">Confidence score</p><div className="mt-3 h-2 w-40 overflow-hidden rounded-full bg-green-100"><div className="h-full rounded-full bg-green-600" style={{ width: `${result.confidence * 100}%` }} /></div></div></div><div className="mt-7 grid gap-5 md:grid-cols-2"><div><h4 className="font-bold text-text-primary">About the Disease</h4><p className="mt-2 leading-7 text-text-secondary">{info.description}</p><h4 className="mt-5 font-bold text-text-primary">Common Symptoms</h4><ul className="mt-2 space-y-2 text-sm text-text-secondary">{info.symptoms.map((symptom) => <li key={symptom} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-green-600" />{symptom}</li>)}</ul></div><div className="rounded-lg border border-amber-200 bg-cream p-5"><p className="text-sm font-bold text-warning">Management Recommendations</p><p className="mt-2 text-sm leading-6 text-text-secondary">{info.recommendations}</p><p className="mt-4 text-xs font-medium text-text-secondary">Always consult a qualified agricultural expert before taking action.</p></div></div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><button onClick={onReset} className="btn-primary inline-flex items-center justify-center gap-2">Analyze Another Image <ArrowRight className="h-4 w-4" /></button><a href="#library" className="btn-secondary inline-flex items-center justify-center gap-2">View Disease Details</a></div></div>)}</div>
}

function Detection() {
  const [file, setFile] = useState<File | null>(null)
  return <section id="detection" className="bg-white px-5 py-20 lg:px-8"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-green-600">Your crop, understood</p><h2 className="section-title mt-3">Rice Disease Detection</h2><p className="section-subtitle">Upload a clear image of a rice leaf to check for possible disease.</p></div><div className="mt-10 rounded-2xl border border-border bg-bg p-4 shadow-sm md:p-8">{file ? <ResultCard file={file} onReset={() => setFile(null)} /> : <UploadArea onFile={setFile} />}<p className="mt-5 text-center text-xs text-text-secondary">For best results, upload a clear photo showing the rice leaf.</p></div></div></section>
}

function DiseaseCard({ name, onSelect }: { name: string; onSelect: (name: string) => void }) {
  const info = DISEASE_INFO[name]
  return <article className="card-base flex flex-col"><div className="flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-beige"><Leaf className="h-14 w-14 text-green-600/70" /></div><div className="mt-5 flex items-start justify-between gap-2"><h3 className="font-bold text-text-primary">{name}</h3><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${diseaseColors[name]}`}>{name === 'Healthy' ? 'Healthy' : 'Disease'}</span></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-text-secondary">{info.description}</p><button onClick={() => onSelect(name)} className="focus-ring mt-5 inline-flex items-center gap-2 self-start text-sm font-bold text-forest-green hover:text-green-600">View Details <ArrowRight className="h-4 w-4" /></button></article>
}

function Library() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const filtered = diseaseNames.filter((name) => name.toLowerCase().includes(query.toLowerCase()))
  const selectedInfo = selected ? DISEASE_INFO[selected] : null
  return <section id="library" className="bg-bg px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-green-600">Know your crop</p><h2 className="section-title mt-3">Rice Disease Library</h2><p className="section-subtitle">Learn about the rice diseases supported by Vari Raksha AI.</p></div><div className="relative w-full md:w-72"><Search className="absolute left-3 top-3 h-5 w-5 text-text-secondary" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search diseases" className="focus-ring w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm" aria-label="Search diseases" /></div></div>{selectedInfo && <div className="mt-8 rounded-xl border border-green-100 bg-white p-6 shadow-sm md:p-8"><div className="flex items-start justify-between gap-4"><div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${diseaseColors[selectedInfo.name]}`}>Disease profile</span><h3 className="mt-4 text-3xl font-bold text-text-primary">{selectedInfo.name}</h3><p className="mt-3 max-w-2xl leading-7 text-text-secondary">{selectedInfo.description}</p></div><button onClick={() => setSelected(null)} className="focus-ring rounded-lg p-2 text-text-secondary hover:bg-green-50" aria-label="Close details"><X /></button></div><div className="mt-7 grid gap-6 border-t border-border pt-6 md:grid-cols-3"><div><h4 className="font-bold text-text-primary">Common symptoms</h4><ul className="mt-3 space-y-2 text-sm text-text-secondary">{selectedInfo.symptoms.map((item) => <li key={item} className="flex gap-2"><Check className="h-4 w-4 text-green-600" />{item}</li>)}</ul></div><div><h4 className="font-bold text-text-primary">Crop impact</h4><p className="mt-3 text-sm leading-6 text-text-secondary">{selectedInfo.impact}</p></div><div><h4 className="font-bold text-text-primary">Management</h4><p className="mt-3 text-sm leading-6 text-text-secondary">Information to be verified with agricultural experts.</p></div></div></div>}<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((name) => <DiseaseCard key={name} name={name} onSelect={setSelected} />)}</div>{filtered.length === 0 && <p className="py-12 text-center text-text-secondary">No diseases found. Try another search.</p>}</div></section>
}

function About() {
  return <section id="about" className="bg-white px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-widest text-green-600">Built for early action</p><h2 className="section-title mt-3">Technology that speaks clearly about crop health.</h2><p className="mt-6 text-lg leading-8 text-text-secondary">Vari Raksha AI is an AI-based rice crop disease detection system designed to help users identify possible rice leaf diseases from images. It turns a complicated model into one clear next step for the field.</p><a href="#detection" className="btn-primary mt-8 inline-flex items-center gap-2">Try Detection <MoveRight className="h-4 w-4" /></a></div><div className="rounded-2xl bg-forest-green p-6 text-white md:p-10"><h3 className="text-2xl font-bold">From image to insight</h3><div className="mt-8 space-y-3">{['Image Upload', 'Image Processing', 'Deep Learning Model', 'Disease Prediction', 'Confidence Score'].map((step, index) => <div key={step} className="flex items-center gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-bold">{index + 1}</span><span className="font-medium">{step}</span>{index < 4 && <ChevronDown className="ml-auto h-4 w-4 text-green-100" />}</div>)}</div><div className="mt-10 border-t border-white/20 pt-6"><h4 className="font-bold">Why early detection matters</h4><p className="mt-2 text-sm leading-6 text-green-100">Noticing changes early gives farmers more time to monitor a crop, seek expert guidance, and protect healthy growth.</p></div></div></div></section>
}

function Footer() {
  return <footer className="bg-forest-green px-5 py-10 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end"><div><Logo /><p className="mt-4 max-w-xs text-sm leading-6 text-green-100">AI-powered rice crop disease detection.</p></div><nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-green-100" aria-label="Footer navigation"><a href="#home" className="hover:text-white">Home</a><a href="#detection" className="hover:text-white">Disease Detection</a><a href="#library" className="hover:text-white">Disease Library</a><a href="#about" className="hover:text-white">About</a></nav></div><div className="mx-auto mt-8 max-w-7xl border-t border-white/15 pt-5 text-xs text-green-100">© 2026 Vari Raksha AI. All rights reserved.</div></footer>
}

export default function Page() {
  return <main><Navbar /><Hero /><Stats /><HowItWorks /><Detection /><Library /><About /><Footer /></main>
}

