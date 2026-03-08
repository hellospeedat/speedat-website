cat > apps/web/src/pages/HomePage.jsx << 'EOF'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Calculator, Truck, MessageCircle, Globe, Clock, ShieldCheck, TrendingUp, Search, MapPin, Package, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingStatus, setTrackingStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setTrackingStatus({
        number: trackingNumber,
        status: 'In Transit',
        location: 'Dubai Hub',
        date: '2026-03-08',
        destination: 'Lahore, Pakistan'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Speedat | International Courier & Cargo - Speed Against Time</title>
        <meta name="description" content="Send Parcels Worldwide from Lahore with Speedat International Courier & Cargo - Speed Against Time!" />
      </Helmet>

      {/* Enhanced Hero Section with Speedat Brand */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with golden texture */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-golden-texture"></div>
          
          {/* Speedat Brand Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 mix-blend-multiply"></div>
          
          {/* Animated brand elements */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/10 rounded-full mix-blend-screen blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Speedat Logo & Hero Banner Content */}
        <div className="container relative z-10 px-4 text-center">
          <div className="inline-block mb-8 animate-fade-in">
            <img 
              src="https://via.placeholder.com/300x100/C41E3A/1F3B7C?text=SPEEDAT+LOGO" 
              alt="Speedat Logo - Speed Against Time" 
              className="h-24 mx-auto drop-shadow-lg"
            />
          </div>
          
          <div className="inline-block mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block py-2 px-6 rounded-full bg-primary/20 border-2 border-primary text-primary text-sm font-bold backdrop-blur-md uppercase tracking-widest">
              🚀 Speed Against Time
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl mx-auto leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Send Parcels <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Worldwide</span>
            <br />
            <span className="text-secondary text-3xl md:text-5xl font-bold">from Lahore</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Experience seamless international shipping with real-time tracking, competitive pricing, and 200+ countries coverage. <span className="text-primary font-bold">Speed Against Time</span> - Your trusted logistics partner.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white h-14 px-8 text-lg rounded-xl shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-1 group">
              <Link to="/smart-rate-calculator">
                <Calculator className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Smart Rate Calculator
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-secondary/10 hover:bg-secondary/20 text-secondary border-2 border-secondary h-14 px-8 text-lg rounded-xl backdrop-blur-md transition-all hover:-translate-y-1 group font-semibold">
              <Link to="/book-pickup">
                <Truck className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Book Free Pickup
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-secondary h-14 px-8 text-lg rounded-xl shadow-xl transition-all hover:-translate-y-1 group font-semibold">
              <a href="https://wa.me/923255943950" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                WhatsApp Quote
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Courier Tracking Section */}
      <section className="py-20 bg-gradient-to-b from-white via-accent/5 to-white border-b-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-3">Track Your Shipment</h2>
              <p className="text-lg text-gray-700 font-medium">Real-time tracking for all your international parcels</p>
            </div>

            {/* Tracking Form */}
            <form onSubmit={handleTrack} className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-primary">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Enter tracking number (e.g., SPD123456789)"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-700 placeholder-gray-500 font-medium"
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-8 md:px-12 h-12 md:h-auto rounded-xl font-bold transition-all hover:shadow-lg uppercase tracking-wide"
                >
                  Track Now
                </Button>
              </div>
            </form>

            {/* Tracking Results */}
            {trackingStatus && (
              <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8 border-l-4 border-primary animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                      <Package className="h-6 w-6 text-primary" />
                      Shipment Details
                    </h3>
                    
                    <div className="space-y-5">
                      <div className="p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
                        <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Tracking Number</p>
                        <p className="text-secondary font-bold text-lg mt-1">{trackingStatus.number}</p>
                      </div>
                      
                      <div className="p-4 bg-green-100/50 rounded-lg border-l-4 border-green-500">
                        <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Current Status</p>
                        <div className="flex items-center gap-2 mt-1">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <p className="text-green-700 font-bold text-lg">{trackingStatus.status}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-blue-100/50 rounded-lg border-l-4 border-secondary">
                        <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Location</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-5 w-5 text-secondary" />
                          <p className="text-secondary font-bold text-lg">{trackingStatus.location}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                        <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Destination</p>
                        <p className="text-secondary font-bold text-lg mt-1">{trackingStatus.destination}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                      <Clock className="h-6 w-6 text-primary" />
                      Delivery Timeline
                    </h3>
                    <div className="space-y-4">
                      {[
                        { step: 'Picked Up', date: '2026-03-05', completed: true },
                        { step: 'In Transit', date: '2026-03-07', completed: true },
                        { step: 'At Hub', date: trackingStatus.date, completed: true },
                        { step: 'Out for Delivery', date: '2026-03-10', completed: false },
                        { step: 'Delivered', date: '2026-03-11', completed: false }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all group-hover:scale-110 ${
                            item.completed 
                              ? 'bg-gradient-to-br from-primary to-secondary text-white' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {item.completed ? '✓' : idx + 1}
                          </div>
                          <div className="pt-1">
                            <p className={`font-bold text-lg ${item.completed ? 'text-secondary' : 'text-gray-500'}`}>
                              {item.step}
                            </p>
                            <p className="text-sm text-gray-600">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-24 bg-gradient-to-br from-white via-accent/5 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Why Choose Speedat?</h2>
            <p className="text-lg text-gray-700 font-medium">We deliver excellence across borders with our premium logistics network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: 'Fast Delivery', desc: 'Express shipping options to ensure your parcels arrive on time, every time.' },
              { icon: Globe, title: 'Global Coverage', desc: 'Extensive network covering over 200+ countries and territories worldwide.' },
              { icon: ShieldCheck, title: 'Real-time Tracking', desc: 'Monitor your shipment\'s journey 24/7 with our advanced tracking system.' },
              { icon: TrendingUp, title: 'Competitive Pricing', desc: 'Get the best rates in the market without compromising on service quality.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-accent hover:shadow-2xl hover:border-primary hover:-translate-y-2 transition-all duration-300 group">
                <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all group-hover:scale-110">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Speedat Branding */}
      <section className="py-20 bg-speedat-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-screen blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-screen blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Ship with Speedat?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            Get instant quotes, book free pickups, and track your shipments in real-time. <span className="text-accent font-bold">Speed Against Time!</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="w-full sm:w-auto bg-accent text-secondary hover:bg-accent/90 h-14 px-8 font-bold rounded-xl transition-all hover:shadow-2xl uppercase tracking-wide">
              <Link to="/smart-rate-calculator">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 h-14 px-8 font-bold rounded-xl transition-all">
              <a href="https://wa.me/923255943950" target="_blank" rel="noopener noreferrer">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
EOF
