import { FaRegFilePdf, FaChartLine, FaDownload, FaBuilding, FaHandHoldingUsd } from "react-icons/fa";

export default function Investor() {
  const reports = [
    { name: "SFPPL Annual Statement - FY 2024-25", size: "2.4 MB", type: "PDF Report", url: "/annual_report.pdf", filename: "SFPPL_Annual_Statement.pdf" },
    { name: "Certificate of Incorporation - 2012", size: "1.1 MB", type: "Official Gazette", url: "/incorporation_certificate.pdf", filename: "SFPPL_Certificate_of_Incorporation.pdf" },
    { name: "Corporate Quality Standards & Audits 2025", size: "3.2 MB", type: "Audit Log", url: "/quality_standards.pdf", filename: "SFPPL_Quality_Standards.pdf" },
    { name: "Investor Presentation Deck Q3", size: "4.8 MB", type: "PPTX PDF", url: "/investor_presentation.pdf", filename: "SFPPL_Investor_Presentation.pdf" }
  ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200"
          alt="Investor Hub"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Investor Relations</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Review SADAF FOOD PROCESSORS PRIVATE LIMITED financial progress, capacity indices, and corporate governance models.
          </p>
        </div>
      </section>
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Financial stats & Growth profiles (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main profile */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center space-x-2">
              <FaBuilding className="text-brand-primary" />
              <span>Enterprise Overview</span>
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              SFPPL has scaled consistently since its incorporation on December 13, 2012. Backed by solid asset holdings and regional supply pipelines, the company operates clean factories in Bihar. With zero debt and strong profitability indices, we are expanding our automated processing capabilities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Paid Up Capital</span>
                <span className="text-lg font-black text-slate-800 block">₹ 15,00,000 (INR 15 Lakhs)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">YoY Earnings growth</span>
                <span className="text-lg font-black text-brand-primary block">+24.5% (FY 2024-25)</span>
              </div>
            </div>
          </div>

          {/* Growth analytics chart placeholders */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center space-x-2">
              <FaChartLine className="text-brand-accent" />
              <span>Capital Growth Indices</span>
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <span className="text-2xl font-black text-slate-800">22%</span>
                <span className="text-[9px] uppercase font-bold text-slate-400 block mt-1">RoE (Return on Equity)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <span className="text-2xl font-black text-slate-800">18K MT</span>
                <span className="text-[9px] uppercase font-bold text-slate-400 block mt-1">Milled Output/Yr</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <span className="text-2xl font-black text-slate-800">99.8%</span>
                <span className="text-[9px] uppercase font-bold text-slate-400 block mt-1">Quality audits pass</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Filings & Downloads (5 Columns) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-800 border-b border-gray-100 pb-3 flex items-center space-x-2">
              <FaHandHoldingUsd className="text-brand-primary" />
              <span>Corporate Downloads</span>
            </h3>
            
            <div className="space-y-4">
              {reports.map((rep, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 rounded-2xl border border-gray-100 hover:border-brand-primary/20 transition-all flex justify-between items-center"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <FaRegFilePdf className="text-red-500 text-xl shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 text-xs truncate">{rep.name}</h4>
                      <p className="text-[10px] text-gray-400">{rep.type} • {rep.size}</p>
                    </div>
                  </div>
                  <a
                    href={rep.url}
                    download={rep.filename}
                    className="p-2 bg-white text-slate-600 hover:bg-brand-primary hover:text-white rounded-xl shadow-sm cursor-pointer transition-colors flex items-center justify-center"
                  >
                    <FaDownload size={10} />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
