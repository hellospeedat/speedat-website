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
        <meta
          name="description"
          content="Fast and reliable international courier & cargo services. Track shipments, calculate shipping costs, and ship worldwide with Speedat."
        />
      </Helmet>

      {/* HERO SECTION */}

      <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-5xl font-bold mb-6">
            Speedat Courier & Cargo
          </h1>

          <p className="text-xl mb-10 opacity-90">
            Speed Against Time – Reliable international courier and cargo services worldwide.
          </p>

          {/* TRACKING BOX */}

          <form
            onSubmit={handleTrack}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <input
              type="text"
              placeholder="Enter Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="px-4 py-3 rounded-lg text-black w-full md:w-96"
            />

            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Track Package
            </Button>
          </form>

          {/* TRACKING RESULT */}

          {trackingStatus && (
            <div className="mt-8 bg-white text-black rounded-xl p-6 max-w-xl mx-auto shadow-lg">

              <h3 className="text-lg font-semibold mb-2">
                Tracking Result
              </h3>

              <p><strong>Tracking Number:</strong> {trackingStatus.number}</p>
              <p><strong>Status:</strong> {trackingStatus.status}</p>
              <p><strong>Current Location:</strong> {trackingStatus.location}</p>
              <p><strong>Destination:</strong> {trackingStatus.destination}</p>
              <p><strong>Date:</strong> {trackingStatus.date}</p>

            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-xl shadow">
              <Truck className="h-8 w-8 mb-4 text-blue-600"/>
              <h3 className="text-xl font-semibold mb-2">International Shipping</h3>
              <p>Fast worldwide delivery with trusted logistics partners.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Calculator className="h-8 w-8 mb-4 text-blue-600"/>
              <h3 className="text-xl font-semibold mb-2">Shipping Calculator</h3>
              <p>Estimate shipping costs instantly before sending your package.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <Globe className="h-8 w-8 mb-4 text-blue-600"/>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p>Delivering parcels and cargo to destinations across the globe.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold mb-6">
            Ready to Ship Your Package?
          </h2>

          <p className="mb-8 opacity-90">
            Contact Speedat today and experience fast, secure, and affordable shipping.
          </p>

          <Button asChild>
            <a
              href="https://wa.me/923255943950"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </Button>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
