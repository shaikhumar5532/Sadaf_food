import { FaLeaf, FaHandsHelping, FaSolarPanel, FaGraduationCap } from "react-icons/fa";

export default function CSR() {
  const pillars = [
    {
      icon: <FaHandsHelping />,
      title: "Farmer Empowerment Programs",
      desc: "Direct procurement networks from 1000+ local smallholder farmers in North Bihar. We eliminate middlemen commissions and guarantee fair pricing schedules."
    },
    {
      icon: <FaSolarPanel />,
      title: "Renewable Energy Miling",
      desc: "We have commissioned hybrid solar roofs generating 45kW clean power to run secondary cleaners and reduce carbon outputs."
    },
    {
      icon: <FaLeaf />,
      title: "Biodegradable PP Packaging",
      desc: "Introduced recycled, eco-friendly food sacks. 100% recyclable components ensure safe shipping with low packaging impact."
    },
    {
      icon: <FaGraduationCap />,
      title: "Rural Literacy & Food Security",
      desc: "SFPPL supports primary educational aids in Katara village, Bihar, providing healthy nutritional meals and learning kits."
    }
  ];

  return (
    <div className="pt-24 bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200"
          alt="CSR Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Corporate Social Responsibility</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            SFPPL believes in creating sustainable value for farmers, workers, and community ecology.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        
        {/* Main story */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm text-center max-w-4xl mx-auto space-y-4">
          <span className="text-brand-primary text-2xl font-black">🌱 Sustainable Growth</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Caring for the Community Since 2012</h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Food processing is deeply connected to agriculture and regional soil health. At SFPPL, we audit our entire supply lifecycle to save water, prevent chemical run-offs, and ensure agricultural sustainability.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pil, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-4">
              <div className="text-2xl text-brand-primary bg-emerald-50 p-3.5 rounded-2xl shrink-0 mt-1">
                {pil.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-slate-800 text-lg">{pil.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pil.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
