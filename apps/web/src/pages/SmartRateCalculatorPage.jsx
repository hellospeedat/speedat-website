import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calculator, MessageCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PRICING_LOGIC = {
  'USA': { base: 15, perKg: 0.50, days: '3-5' },
  'UK': { base: 12, perKg: 0.40, days: '2-4' },
  'UAE': { base: 8, perKg: 0.30, days: '1-3' },
  'Canada': { base: 18, perKg: 0.55, days: '4-6' },
  'Australia': { base: 20, perKg: 0.60, days: '5-7' },
  'Germany': { base: 14, perKg: 0.45, days: '3-5' },
  'France': { base: 13, perKg: 0.42, days: '3-5' },
  'Singapore': { base: 10, perKg: 0.35, days: '2-4' },
  'Hong Kong': { base: 11, perKg: 0.38, days: '2-4' },
  'Japan': { base: 16, perKg: 0.52, days: '4-6' },
};

const SmartRateCalculatorPage = () => {
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [period, setPeriod] = useState('Standard');

  const calculatePrice = () => {
    if (!destination || !weight || isNaN(weight) || weight <= 0) return null;
    const logic = PRICING_LOGIC[destination];
    let total = logic.base + (logic.perKg * parseFloat(weight));
    
    if (period === 'Express') total *= 1.5;
    if (period === 'Overnight') total *= 2.5;
    
    return total.toFixed(2);
  };

  const getDeliveryDays = () => {
    if (!destination) return '-';
    const baseDays = PRICING_LOGIC[destination].days;
    if (period === 'Standard') return `${baseDays} Business Days`;
    if (period === 'Express') return '1-2 Business Days';
    if (period === 'Overnight') return 'Next Business Day';
    return '-';
  };

  const price = calculatePrice();

  const handleWhatsAppQuote = () => {
    if (!destination || !weight) return;
    const text = `Hello Speedat! I need a quote for a shipment:\n\n*Destination:* ${destination}\n*Weight:* ${weight} kg\n*Service:* ${period}\n*Estimated Price:* PKR ${price}\n\nPlease confirm the details.`;
    window.open(`https://wa.me/923255943950?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Smart Rate Calculator | Speedat</title>
        <meta name="description" content="Calculate international shipping rates instantly with Speedat." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Smart Rate Calculator</h1>
          <p className="text-gray-600 text-lg">Get instant, accurate shipping estimates for your international parcels.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel: Inputs */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-white border-b rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Calculator className="h-5 w-5 text-primary" />
                Shipment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6 bg-white rounded-b-xl">
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-gray-700">Destination Country</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination" className="h-12 text-gray-900">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(PRICING_LOGIC).map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="text-gray-700">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  min="0.1" 
                  step="0.1" 
                  placeholder="e.g. 2.5" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="h-12 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="period" className="text-gray-700">Delivery Service</Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger id="period" className="h-12 text-gray-900">
                    <SelectValue placeholder="Select service level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard Delivery</SelectItem>
                    <SelectItem value="Express">Express Delivery</SelectItem>
                    <SelectItem value="Overnight">Overnight Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel: Outputs */}
          <Card className="shadow-lg border-0 bg-secondary text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Package className="w-64 h-64" />
            </div>
            <CardHeader className="border-b border-white/10 relative z-10">
              <CardTitle className="text-white">Quote Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-8 relative z-10 flex flex-col h-[calc(100%-73px)]">
              {price ? (
                <div className="space-y-8 flex-grow">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <p className="text-gray-300 mb-1">From</p>
                      <p className="font-semibold text-lg">Lahore, PK</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <p className="text-gray-300 mb-1">To</p>
                      <p className="font-semibold text-lg">{destination}</p>
                    </div>
                  </div>

                  <div className="bg-white/10 p-6 rounded-xl text-center">
                    <p className="text-gray-300 mb-2">Estimated Total</p>
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-golden-gradient mb-2">
                      PKR {price}
                    </p>
                    <p className="text-sm text-gray-300">
                      Est. Delivery: <span className="font-semibold text-white">{getDeliveryDays()}</span>
                    </p>
                  </div>

                  <Button 
                    onClick={handleWhatsAppQuote}
                    className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl shadow-lg transition-all hover:-translate-y-1 mt-auto"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Get WhatsApp Quote
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                  <Calculator className="h-16 w-16 mb-4" />
                  <p className="text-xl">Enter shipment details to see your quote</p>
                  <p className="text-sm font-light">Select destination and weight to calculate instantly.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartRateCalculatorPage;