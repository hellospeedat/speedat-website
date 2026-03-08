cat > apps/web/src/pages/TrackShipmentPage.jsx << 'EOF'
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Package, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import pb from '@/lib/pocketbaseClient';

const STAGES = ['Booked', 'Packed', 'Dispatched', 'In Transit', 'Delivered'];

const TrackShipmentPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e?.preventDefault();
    if (!trackingNumber.trim()) return;

    setLoading(true);
    setError('');
    setShipment(null);

    try {
      if (trackingNumber === 'DEMO123456') {
        setTimeout(() => {
          setShipment({
            tracking_number: 'DEMO123456',
            origin: 'Lahore, PK',
            destination: 'London, UK',
            weight: 2.5,
            status: 'In Transit',
            estimated_delivery: new Date(Date.now() + 86400000 * 2).toISOString(),
            created: new Date(Date.now() - 86400000 * 2).toISOString()
          });
          setLoading(false);
        }, 800);
        return;
      }

      const record = await pb.collection('shipments').getFirstListItem(`tracking_number="${trackingNumber}"`, { $autoCancel: false });
      setShipment(record);
    } catch (err) {
      setError('Shipment not found. Please check your tracking number and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStageIndex = (status) => {
    return STAGES.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-golden-texture py-12">
      <Helmet>
        <title>Track Shipment | Speedat</title>
        <meta name="description" content="Track your Speedat international shipments in real-time - Speed Against Time!" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-secondary mb-4 flex items-center justify-center gap-3">
            <Package className="h-10 w-10 text-primary" />
            Track Your Shipment
          </h1>
          <p className="text-gray-700 text-lg font-medium">Enter your tracking number to get real-time updates.</p>
        </div>

        <Card className="shadow-2xl border-t-4 border-primary mb-8">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter Tracking Number (e.g. DEMO123456)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="pl-12 h-14 text-lg text-gray-900 bg-white border-2 border-gray-300 focus:border-primary focus:ring-primary font-medium"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading || !trackingNumber}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 h-14 font-bold uppercase tracking-wide rounded-xl"
              >
                {loading ? <RefreshCw className="h-5 w-5 animate-spin" /> : 'Track Now'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="shadow-xl border-l-4 border-red-500 mb-8 animate-fade-in">
            <CardContent className="p-6 flex items-center gap-4 text-red-700 font-medium">
              <AlertCircle className="h-6 w-6 flex-shrink-0" />
              {error}
            </CardContent>
          </Card>
        )}

        {shipment && (
          <div className="space-y-6 animate-fade-in">
            <Card className="shadow-2xl border-t-4 border-primary">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Tracking Number</p>
                      <p className="text-2xl font-bold text-secondary mt-1">{shipment.tracking_number}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">From</p>
                      <p className="text-lg font-bold text-gray-800 mt-1">{shipment.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">To</p>
                      <p className="text-lg font-bold text-gray-800 mt-1">{shipment.destination}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-green-100 rounded-lg border-l-4 border-green-600">
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Current Status</p>
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <p className="text-lg font-bold text-green-700">{shipment.status}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Weight</p>
                      <p className="text-lg font-bold text-gray-800 mt-1">{shipment.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Est. Delivery</p>
                      <p className="text-lg font-bold text-gray-800 mt-1">{new Date(shipment.estimated_delivery).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="mt-12 pt-8 border-t-2 border-gray-200">
                  <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Shipment Journey
                  </h3>
                  <div className="space-y-4">
                    {STAGES.map((stage, idx) => {
                      const isCompleted = idx <= getCurrentStageIndex(shipment.status);
                      return (
                        <div key={idx} className="flex items-start gap-4 group">
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 transition-all group-hover:scale-110 ${
                            isCompleted 
                              ? 'bg-gradient-to-br from-primary to-secondary' 
                              : 'bg-gray-300'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          <div className="pt-2">
                            <p className={`text-lg font-bold ${isCompleted ? 'text-secondary' : 'text-gray-500'}`}>
                              {stage}
                            </p>
                            {isCompleted && (
                              <p className="text-sm text-gray-600 mt-1">
                                {idx === getCurrentStageIndex(shipment.status) ? 'In Progress' : 'Completed'}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackShipmentPage;
EOF
