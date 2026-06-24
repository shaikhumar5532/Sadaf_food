import { FaCheckCircle, FaAward, FaBuilding, FaTools, FaFileDownload, FaUsers } from "react-icons/fa";

export default function About() {
  const milestones = [
    { year: "2012", title: "Incorporation", desc: "SADAF FOOD PROCESSORS PRIVATE LIMITED officially incorporated under ROC Patna, targeting clean food manufacturing in Bihar." },
    { year: "2016", title: "Facility Upgrades", desc: "Upgraded machinery lines to improve milling standards and processing speeds." },
    { year: "2020", title: "Packaged Food Launch", desc: "Introduced unpolished packaged pulses and milled spices with automated hygiene containment." },
    { year: "2023", title: "Automation & Quality Control", desc: "Fitted state-of-the-art optical sorters for zero-contamination grain purification." },
    { year: "Today", title: "Scaling Markets", desc: "Reaching over 300+ distributors nationwide and exploring export routes." }
  ];

  const values = [
    { title: "Hygiene & Pure Safety", desc: "Strict adherence to FSSAI standards with zero-human contact processing." },
    { title: "Honest Sourcing", desc: "procuring premium agro-yield directly from local and native farms in Bihar." },
    { title: "Empowering People", desc: "Generating skilled employment and offering modern food tech roles to regional graduates." }
  ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 text-white py-28 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1200"
          alt="Makhana processing"
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="text-brand-accent uppercase font-bold text-xs tracking-[0.2em] bg-white/5 border border-white/10 px-4.5 py-2 rounded-full inline-block backdrop-blur-md">
            Established 2012
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Our Journey & <span className="text-gradient">Heritage</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Processing premium Shahi Litchis, organic Makhanas, and freshwater fish using advanced zero-contact automated sorting technologies.
          </p>
        </div>
      </section>

      {/* 2. CORPORATE SUMMARY & STATS */}
      <section className="py-20 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 text-brand-primary font-bold">
            <FaBuilding />
            <span className="text-xs uppercase tracking-wider">Company Profile</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800">Our Story</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            SADAF FOOD PROCESSORS PRIVATE LIMITED began operations in 2012 with a mission to satisfy the growing domestic demand for safe, premium processed Shahi Litchi, organic Makhana (fox nuts), and fresh aquaculture fish products. Located in Muzaffarpur, Bihar—the litchi and makhana capital of India—SFPPL operates out of a highly automated processing facility that manages sorting, cold storage containment, and nitrogen-sealed packaging.
          </p>
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700">Company Type:</span>
              <span className="text-slate-500 text-right">Private — Non Government Company</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700">CIN Number:</span>
              <span className="text-slate-500 text-right">U15400BR2012PTC019623</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700">Registrar of Companies:</span>
              <span className="text-slate-500 text-right">ROC Patna</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700">Status:</span>
              <span className="text-brand-primary font-bold flex items-center space-x-1 justify-end">
                <FaCheckCircle className="inline" /> <span>Active</span>
              </span>
            </div>
          </div>

          <div className="pt-4">
            <a
              href="/sfppl_brochure.pdf"
              download="SFPPL_Corporate_Brochure.pdf"
              className="w-full text-center inline-flex items-center justify-center space-x-2 bg-brand-primary hover:bg-brand-green-hover text-white py-3 rounded-xl font-bold transition-colors cursor-pointer shadow-sm"
            >
              <FaFileDownload />
              <span>Download SFPPL Brochure</span>
            </a>
          </div>
        </div>

        {/* Board of Directors / Leadership */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider flex items-center space-x-2">
              <FaUsers /> <span>Leadership</span>
            </span>
            <h2 className="text-3xl font-black text-slate-800">Board of Directors</h2>
            <p className="text-slate-500 text-sm">Empowering SFPPL's strategic direction and core manufacturing goals.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex flex-col">
              <div className="w-full aspect-square overflow-hidden border-b border-slate-100">
                <img src="/directors/irshad_alam.jpg" alt="Irshad Alam" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center space-y-2">
                <h3 className="text-lg font-bold text-slate-800">IRSHAD ALAM</h3>
                <p className="text-xs text-brand-accent font-bold uppercase tracking-wider">Managing Director</p>
                <p className="text-xs text-slate-400">Pioneered SFPPL's initial automated machinery procurement strategy.</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex flex-col">
              <div className="w-full aspect-square overflow-hidden border-b border-slate-100">
                <img src="/directors/zinat_jahan.jpg" alt="Zinat Jahan" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center space-y-2">
                <h3 className="text-lg font-bold text-slate-800">ZINAT JAHAN</h3>
                <p className="text-xs text-brand-accent font-bold uppercase tracking-wider">Director</p>
                <p className="text-xs text-slate-400">Oversees corporate finance, quality standards implementation and sales.</p>
              </div>
            </div>
          </div>

          {/* Infrastructure Metrics */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-brand-primary font-bold">
              <FaTools />
              <span className="text-xs uppercase tracking-wider">Infrastructure</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Factory & Mill Capacity</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our main mill operates out of Katara, Muzaffarpur, spanning over 25,000 square feet. It includes specialized cleaning sieves, optical color sorters, and high-precision packaging devices.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center pt-2">
              <div className="bg-slate-50 p-4 rounded-xl">
                <div className="text-2xl font-black text-brand-primary">50 MT</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Daily Processing Limit</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <div className="text-2xl font-black text-brand-primary">100%</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Automated sorting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MILESTONE TIMELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-2 mb-16">
            <span className="text-xs uppercase font-bold text-brand-primary tracking-wider">The Journey</span>
            <h2 className="text-3xl font-black text-slate-800">Our Milestones</h2>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 space-y-12 pl-6">
            {milestones.map((mile, idx) => (
              <div key={idx} className="relative pl-6 hover:translate-x-2 transition-transform duration-200">
                <div className="absolute -left-[35px] top-1 w-5 h-5 rounded-full bg-white border-4 border-brand-primary shadow-sm" />
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <span className="text-lg font-black text-brand-accent">{mile.year}</span>
                  <h3 className="text-base font-black text-slate-800">{mile.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{mile.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VALUES & CERTIFICATION CREDITS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-brand-primary tracking-wider">Guiding Principles</span>
            <h2 className="text-3xl font-black text-slate-800">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-brand-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-primary flex items-center justify-center text-xl font-bold">
                  {idx === 0 ? "🛡️" : idx === 1 ? "🌾" : "👥"}
                </div>
                <h3 className="font-black text-slate-800 text-lg">{val.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>

          {/* Certifications badges */}
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm text-center space-y-6">
            <h3 className="font-bold text-xl text-slate-800 flex items-center justify-center space-x-2">
              <FaAward className="text-brand-accent" />
              <span>Certified Standards & Compliance</span>
            </h3>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We process food strictly in compliance with international parameters. SFPPL is licensed under FSSAI central controls and maintains HACCP protocols.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 pt-4">
              <span className="px-5 py-2.5 bg-slate-100 rounded-full text-xs font-bold text-slate-700">FSSAI Central Licence</span>
              <span className="px-5 py-2.5 bg-slate-100 rounded-full text-xs font-bold text-slate-700">ISO 22000:2018</span>
              <span className="px-5 py-2.5 bg-slate-100 rounded-full text-xs font-bold text-slate-700">HACCP Certified</span>
              <span className="px-5 py-2.5 bg-slate-100 rounded-full text-xs font-bold text-slate-700">APEDA Registered</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
