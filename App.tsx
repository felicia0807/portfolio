
import React, { useState, useEffect } from 'react';
import { TOUR_DATA } from './constants';
import { Player } from './types';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const [activeRankingTab, setActiveRankingTab] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "Player Sponsorship",
    "Tournament Partnership",
    "Media & Press Inquiry",
    "Pro Clinic Booking",
    "Coaching Certification",
    "Brand Ambassador"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.message.trim() || !formData.email.trim()) {
      setFormError('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setIsSubmitting(true);
    const servicesText = selectedServices.length > 0 ? selectedServices.join(', ') : 'None specified';
    
    // Prepare webhook data
    const payload = {
      name: formData.name,
      email: formData.email,
      services: servicesText,
      message: formData.message,
      timestamp: new Date().toISOString()
    };

    try {
      // Send to Google Sheets Webhook
      await fetch('https://script.google.com/macros/s/AKfycbzw2-ffOQQdvRkb3xLOvou02ZzJYCr5UbIbFKx98IWNAeJOJK1lwF2YG0z7rr7_BfE0/exec', {
        method: 'POST',
        mode: 'no-cors', // Use no-cors for simple Google Apps Script redirects
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Webhook submission error:', err);
      // We proceed to WhatsApp regardless so the lead is never lost
    } finally {
      setIsSubmitting(false);
    }

    const whatsappNumber = '60120000000'; // Target number
    const waMessageBody = `NEW INQUIRY\nName: ${formData.name}\nEmail: ${formData.email}\nServices: ${servicesText}\nMessage: ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(waMessageBody);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'} px-4 md:px-6 py-4`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center rounded-sm rotate-12">
               <span className="text-black font-black italic -rotate-12">P</span>
            </div>
            <span className="font-black tracking-tighter text-lg md:text-xl uppercase italic">
              {TOUR_DATA.name}
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/70">
            <a href="#tournaments" className="hover:text-yellow-400 transition-colors">Tournaments</a>
            <a href="#rules" className="hover:text-yellow-400 transition-colors">The Kitchen</a>
            <a href="#rankings" className="hover:text-yellow-400 transition-colors">Rankings</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">Inquiry</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block bg-yellow-400 text-black px-4 py-2 rounded-sm font-black text-xs uppercase tracking-tighter hover:bg-yellow-300 transition-all">
              Buy Tickets
            </button>
            <button onClick={toggleMenu} className="md:hidden p-2 text-white" aria-label="Toggle menu">
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[64px] bg-black z-50 flex flex-col p-8 space-y-6 animate-in slide-in-from-right duration-300">
            <a href="#tournaments" onClick={toggleMenu} className="text-3xl font-black uppercase italic tracking-tighter">Tournaments</a>
            <a href="#rules" onClick={toggleMenu} className="text-3xl font-black uppercase italic tracking-tighter">Rules</a>
            <a href="#rankings" onClick={toggleMenu} className="text-3xl font-black uppercase italic tracking-tighter">Rankings</a>
            <a href="#contact" onClick={toggleMenu} className="text-3xl font-black uppercase italic tracking-tighter">Contact</a>
            <div className="pt-8">
              <button className="w-full bg-yellow-400 text-black py-4 rounded-sm font-black text-lg uppercase tracking-widest">
                Buy Tickets
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] md:h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 object-center"
            alt="Close up of a pickleball paddle and perforated ball"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-black/70"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="mb-6 inline-block bg-indigo-600 px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] skew-x-[-10deg]">
             Official 2025 Tour
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic uppercase leading-none tracking-tighter mb-6">
            Pickleball <span className="text-yellow-400 block sm:inline">Unleashed</span>
          </h1>
          <p className="text-lg md:text-2xl font-light text-white/80 mb-10 max-w-2xl mx-auto">
            {TOUR_DATA.tagline}. No strings attached—literally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-10 py-5 bg-yellow-400 text-black font-black uppercase italic tracking-widest hover:bg-yellow-300 transition-all text-sm flex items-center justify-center">
              Partner with Us
            </a>
            <button className="px-10 py-5 border-2 border-white/20 font-black uppercase italic tracking-widest hover:border-yellow-400 transition-all text-sm">
              View Ladder
            </button>
          </div>
        </div>
      </header>

      {/* Court Logic Section */}
      <section id="rules" className="py-24 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 leading-none">
              Master the <br/><span className="text-indigo-500">Kitchen</span>
            </h2>
            <div className="space-y-8 relative z-10">
              <div className="flex gap-6">
                <div className="text-yellow-400 font-black text-2xl">01</div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-1">Non-Volley Zone</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Stay out of the 7-foot kitchen zone unless the ball has bounced. It's the heart of pickleball strategy.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-yellow-400 font-black text-2xl">02</div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-1">Double Bounce Rule</h4>
                  <p className="text-white/50 text-sm leading-relaxed">The serve must bounce, and the return must bounce. After that, let the volleys fly.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-yellow-400 font-black text-2xl">03</div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-1">The Dinking Game</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Soft touch, precise placement. Dinking is how the pros win the battle at the net.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass p-2 rounded-2xl transform md:rotate-3 shadow-2xl">
             <img src="https://images.unsplash.com/photo-1592719315570-36e78996615b?q=80&w=1000&auto=format&fit=crop" className="rounded-xl w-full" alt="Professional pickleball players at the net"/>
          </div>
        </div>
      </section>

      {/* Rankings Leaderboard */}
      <section id="rankings" className="py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8">World Paddle Rankings</h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {TOUR_DATA.rankings.map((r, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveRankingTab(i)}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeRankingTab === i ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'bg-white/5 text-white/40 hover:text-white'}`}
                >
                  {r.category}
                </button>
              ))}
            </div>
            <p className="mt-4 text-white/30 text-[10px] font-black uppercase tracking-widest">Click an athlete to view their pro bio</p>
          </div>

          <div className="hidden sm:block glass rounded-xl overflow-hidden border-white/5 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Pro Athlete</th>
                  <th className="px-6 py-4">Total Points</th>
                  <th className="px-6 py-4 text-right">Region</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {TOUR_DATA.rankings[activeRankingTab].players.map(p => (
                  <tr 
                    key={p.name} 
                    className="hover:bg-white/[0.05] cursor-pointer transition-colors group"
                    onClick={() => setSelectedPlayer(p)}
                  >
                    <td className="px-6 py-6 text-2xl font-black italic text-yellow-400">{p.rank}</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <img src={p.image} className="w-10 h-10 rounded-full border border-white/10 object-cover bg-gray-800" alt={p.name} />
                        <span className="font-bold text-lg group-hover:text-yellow-400 transition-colors">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-mono text-sm text-white/70 tracking-tighter">{p.points.toLocaleString()}</td>
                    <td className="px-6 py-6 text-right font-black uppercase italic text-white/30 group-hover:text-indigo-400 transition-colors">{p.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-4">
            {TOUR_DATA.rankings[activeRankingTab].players.map(p => (
              <div 
                key={p.name} 
                className="glass p-4 rounded-xl border-white/5 flex items-center justify-between active:bg-white/10 transition-colors"
                onClick={() => setSelectedPlayer(p)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-black italic text-yellow-400 min-w-[40px]">{p.rank}</span>
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-12 h-12 rounded-full border border-white/10 object-cover bg-gray-800" alt={p.name} />
                    <div>
                      <div className="font-bold text-base leading-tight">{p.name}</div>
                      <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{p.country}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-yellow-400">{p.points.toLocaleString()}</div>
                  <div className="text-[10px] text-white/40 uppercase font-black">Points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Form Section */}
      <section id="contact" className="py-24 px-4 md:px-6 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Tour <span className="text-yellow-400">Inquiry</span></h2>
            <p className="text-white/50 uppercase tracking-widest text-[10px] font-black">Professional sponsorships & media partnerships</p>
          </div>

          <form onSubmit={handleFormSubmit} className="glass p-8 md:p-12 rounded-3xl border-indigo-500/20 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-400 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-400 transition-all font-medium"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-4">Pickleball Services/Interests</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map(service => (
                  <div 
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`flex items-center gap-3 p-4 rounded-sm border cursor-pointer transition-all ${selectedServices.includes(service) ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400' : 'border-white/10 bg-white/[0.02] hover:border-white/30 text-white/50'}`}
                  >
                    <div className={`w-4 h-4 border flex items-center justify-center rounded-sm ${selectedServices.includes(service) ? 'bg-yellow-400 border-yellow-400' : 'border-white/30'}`}>
                      {selectedServices.includes(service) && (
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                      )}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-tight">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-10">
              <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Message / Inquiry Details *</label>
              <textarea 
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tell us more about your interest in the PPC Tour..."
                className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-400 transition-all font-medium resize-none"
              ></textarea>
            </div>

            {formError && (
              <div className="mb-6 p-4 bg-rose-500/20 border border-rose-500 text-rose-500 text-xs font-bold uppercase tracking-widest rounded-sm">
                {formError}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-yellow-600 cursor-not-allowed opacity-70' : 'bg-yellow-400 hover:bg-yellow-300'} text-black py-5 rounded-sm font-black uppercase italic tracking-[0.2em] shadow-lg shadow-yellow-400/20 transition-all flex items-center justify-center gap-3`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.403 0 6.556-5.332 11.891-11.891 11.891-2.093 0-4.141-.544-5.946-1.587l-6.13 1.611c-.139.038-.28.058-.419.058-.337 0-.663-.131-.904-.372-.259-.258-.372-.631-.303-1.002zm6.34-3.244l.366.213c1.528.887 3.274 1.355 5.077 1.355 5.454 0 9.891-4.437 9.891-9.891 0-2.64-1.029-5.122-2.898-6.991-1.87-1.868-4.352-2.897-6.993-2.897-5.454 0-9.891 4.437-9.891 9.891 0-2.023.613 3.996 1.772 5.688l.235.344-1.011 3.691 3.844-1.011z" /></svg>
                  Submit Inquiry
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Player Bio Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="glass w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 border-indigo-500/40 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black rounded-full text-white/70 hover:text-white transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="flex flex-col md:flex-row overflow-y-auto">
              <div className="w-full md:w-[35%] min-h-[400px] md:min-h-0 overflow-hidden bg-gray-900 sticky top-0">
                <img src={selectedPlayer.image} className="w-full h-full object-cover" alt={selectedPlayer.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:hidden"></div>
              </div>
              <div className="flex-1 p-6 md:p-12 flex flex-col">
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-6xl font-black italic text-yellow-400 leading-none">{selectedPlayer.rank}</span>
                  <div>
                    <h3 className="text-3xl md:text-5xl font-black uppercase italic leading-tight tracking-tighter">{selectedPlayer.name}</h3>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-white/40">{selectedPlayer.country} • Professional Pickleball Athlete</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 mb-3 tracking-widest border-b border-indigo-500/20 pb-1 inline-block">Professional Biography</h4>
                    <p className="text-sm text-white/80 leading-relaxed italic">
                      {selectedPlayer.bio || "Placeholder Bio: One of the most dynamic athletes on the professional pickleball circuit today, known for their strategic mastery of the kitchen and relentless court movement."}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 mb-4 tracking-widest border-b border-indigo-500/20 pb-1 inline-block">Career Highlights</h4>
                    <ul className="space-y-3">
                      {(selectedPlayer.highlights || ["National Medalist", "Masters Series Finalist", "Ranked Top 10 Globally"]).map((h, i) => (
                        <li key={i} className="flex items-center gap-4 text-xs font-bold text-white/90">
                          <span className="w-2 h-2 rotate-45 bg-yellow-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Video Highlights Section */}
                <div className="mb-10">
                  <h4 className="text-[10px] font-black uppercase text-indigo-400 mb-4 tracking-widest border-b border-indigo-500/20 pb-1 inline-block">Reel Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(selectedPlayer.videos && selectedPlayer.videos.length > 0) ? (
                      selectedPlayer.videos.map((vid, i) => (
                        <div key={i} className="relative group rounded-xl overflow-hidden glass border-white/10 aspect-video">
                          <video 
                            src={vid} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            muted
                            loop
                            playsInline
                            onMouseOver={(e) => e.currentTarget.play()}
                            onMouseOut={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                          </div>
                          <div className="absolute bottom-2 left-3 text-[9px] font-black uppercase tracking-widest text-white/40">Clip #{i+1}</div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 py-8 glass rounded-xl border-dashed border-white/10 flex flex-col items-center justify-center text-white/20">
                        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        <span className="text-[10px] uppercase font-black tracking-widest">No highlight clips currently available</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/10 flex justify-between items-center bg-gray-900/50 -mx-6 md:-mx-12 px-6 md:px-12 -mb-6 md:-mb-12 py-8">
                  <div className="flex gap-8">
                    <div>
                      <div className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-1">Total Points</div>
                      <div className="text-3xl font-mono text-yellow-400 font-black">{selectedPlayer.points.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-1">Win Rate</div>
                      <div className="text-3xl font-mono text-indigo-400 font-black">78%</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="hidden sm:block border border-white/20 hover:border-white text-white px-8 py-3 rounded-sm font-black uppercase text-[10px] italic transition-all">
                      Full Statistics
                    </button>
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-sm font-black uppercase text-[10px] italic transition-all shadow-lg shadow-yellow-400/20">
                      Follow Pro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Close by clicking overlay */}
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedPlayer(null)}></div>
        </div>
      )}

      {/* Tournaments Section */}
      <section id="tournaments" className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-2">PPC Pro Stops</h2>
              <div className="h-1 w-24 bg-yellow-400"></div>
            </div>
            <a href="#" className="text-xs font-bold uppercase text-yellow-400 hover:underline tracking-widest">Full 2025 Calendar →</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOUR_DATA.tournaments.map(t => (
              <div key={t.id} className="group glass rounded-sm overflow-hidden border-white/5 hover:border-yellow-400/50 transition-all duration-500">
                <div className="h-48 overflow-hidden relative bg-gray-800">
                  <img src={t.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={t.name} />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-black font-black text-[10px] uppercase">
                    {t.status}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-mono text-indigo-400 mb-2 uppercase">{t.date}</div>
                  <h3 className="text-2xl font-black uppercase mb-1">{t.name}</h3>
                  <p className="text-white/50 text-xs mb-6 uppercase tracking-wider">{t.location}</p>
                  <button className="w-full py-3 border border-white/10 text-xs font-black uppercase hover:bg-white hover:text-black transition-all">
                    Ticket Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-3xl relative overflow-hidden border-indigo-500/20">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-yellow-400 to-rose-500"></div>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">The Future is <br/> <span className="text-yellow-400">Perforated</span></h2>
          <p className="text-base md:text-xl text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join the movement that's sweeping the globe. Experience the precision and athleticism of professional pickleball.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#contact" className="bg-white text-black px-12 py-5 font-black uppercase italic tracking-widest hover:bg-yellow-400 transition-all text-sm flex items-center justify-center">
              Register as Pro
            </a>
            <button className="border-2 border-white/10 px-12 py-5 font-black uppercase italic tracking-widest hover:border-white transition-all text-sm">
              Sponsorships
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-black px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row justify-between gap-12 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
               <span className="text-black font-black text-xs italic">P</span>
            </div>
            <div>
              <span className="font-black text-lg uppercase italic block leading-none">{TOUR_DATA.name}</span>
              <span className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-bold">World Headquarters</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            <a href="#" className="hover:text-yellow-400 transition-colors">Anti-Doping</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Official Rules</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Code of Conduct</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
          <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">
            © 2025 Professional Pickleball Championship. All Rights Reserved.
          </div>
        </div>
      </footer>

      <AIChat />
    </div>
  );
};

export default App;
