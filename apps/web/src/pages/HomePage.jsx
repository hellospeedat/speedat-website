import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Calculator, Truck, MessageCircle, Globe, Clock, ShieldCheck, TrendingUp } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Speedat | International Courier & Cargo</title>
        <meta name="description" content="Send Parcels Worldwide from Lahore with Speedat International Courier & Cargo." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1699549196390-e31bfc88536d" 
            alt="Global logistics and shipping containers" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
        </div>

        <div className="container relative z-10 px-4 text-center text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
            Trusted Logistics Partner
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Send Parcels <span className="text-transparent bg-clip-text bg-golden-gradient">Worldwide</span> from Lahore
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            Fast, secure, and affordable international courier services. Track your shipments in real-time and get instant quotes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white h-14 px-8 text-lg rounded-xl shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-1">
              <Link to="/smart-rate-calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Smart Rate Calculator
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 h-14 px-8 text-lg rounded-xl backdrop-blur-sm transition-all hover:-translate-y-1">
              <Link to="/book-pickup">
                <Truck className="mr-2 h-5 w-5" />
                Book Free Pickup
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20BD5A] text-white h-14 px-8 text-lg rounded-xl shadow-lg transition-all hover:-translate-y-1">
              <a href="https://wa.me/923255943950" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Quote
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Why Choose Speedat?</h2>
            <p className="text-gray-600 text-lg">We deliver excellence across borders with our premium logistics network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: 'Fast Delivery', desc: 'Express shipping options to ensure your parcels arrive on time, every time.' },
              { icon: Globe, title: 'Global Coverage', desc: 'Extensive network covering over 200+ countries and territories worldwide.' },
              { icon: ShieldCheck, title: 'Real-time Tracking', desc: 'Monitor your shipment\'s journey 24/7 with our advanced tracking system.' },
              { icon: TrendingUp, title: 'Competitive Pricing', desc: 'Get the best rates in the market without compromising on service quality.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="h-7 w-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;