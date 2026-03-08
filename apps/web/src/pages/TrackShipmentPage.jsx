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
      // Demo fallback
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
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Track Shipment | Speedat</title>
        <meta name="description" content="Track your Speedat international shipments in real-time." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Track Your Shipment</h1>
          <p className="text-gray-600 text-lg">Enter your tracking number to get real-time updates.</p>
        </div>

        <Card className="shadow-lg border-0 mb-8">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter Tracking Number (e.g. DEMO123456)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="pl-12 h-14 text-lg text-gray-900 bg-gray-50 border-gray-200 focus-visible:ring-primary"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading || !trackingNumber}
                className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md"
              >
                {loading ? <RefreshCw className="h-5 w-5 animate-spin" /> : 'Track Now'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
            <AlertCircle className="h-6 w-6 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {shipment && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8">
            {/* Timeline */}
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-secondary p-6 text-white flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-300 mb-1">Tracking Number</p>
                  <p className="text-2xl font-bold tracking-wider">{shipment.tracking_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300 mb-1">Current Status</p>
                  <p className="text-xl font-semibold text-accent">{shipment.status}</p>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="relative">
                  {/* Progress Bar Background */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden sm:block"></div>
                  
                  {/* Active Progress Bar */}
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 hidden sm:block transition-all duration-1000"
                    style={{ width: `${(getCurrentStageIndex(shipment.status) / (STAGES.length - 1)) * 100}%` }}
                  ></div>

                  <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-0">
                    {STAGES.map((stage, idx) => {
                      const isCompleted = idx <= getCurrentStageIndex(shipment.status);
                      const isCurrent = idx === getCurrentStageIndex(shipment.status);
                      
                      return (
                        <div key={stage} className="flex sm:flex-col items-center gap-4 sm:gap-2">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500
                            ${isCompleted ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-200 text-gray-400'}
                            ${isCurrent ? 'ring-4 ring-primary/20' : ''}
                          `}>
                            {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Clock className="h-5 w-5" />}
                          </div>
                          <span className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                            {stage}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md border-0">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg text-secondary border-b pb-2">Shipment Details</h3>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Origin</p>
                      <p className="font-medium text-gray-900">{shipment.origin || 'Lahore, PK'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Destination</p>
                      <p className="font-medium text-gray-900">{shipment.destination}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Weight</p>
                      <p className="font-medium text-gray-900">{shipment.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Created On</p>
                      <p className="font-medium text-gray-900">
                        {new Date(shipment.created).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0 bg-gradient-to-br from-secondary to-secondary/90 text-white">
                <CardContent className="p-6 flex flex-col justify-center h-full text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <p className="text-gray-300 mb-2">Estimated Delivery</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-golden-gradient">
                    {shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : 'Pending'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackShipmentPage;