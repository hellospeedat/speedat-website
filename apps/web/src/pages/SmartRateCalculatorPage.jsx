cat > apps/web/src/pages/SmartRateCalculatorPage.jsx << 'EOF'
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
    <div className="min-h-screen bg-golden-texture py-12">
      <Helmet>
        <title>Smart Rate Calculator | Speedat</title>
        <meta name="description" content="Calculate shipping rates for your international parcels with Speedat - Speed Against Time!" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-secondary mb-4 flex items-center justify-center gap-3">
            <Calculator className="h-10 w-10 text-primary" />
            Smart Rate Calculator
          </h1>
          <p className="text-gray-700 text-lg font-medium">Get instant shipping quotes - Speed Against Time!</p>
        </div>

        <Card className="shadow-2xl border-t-4 border-primary">
          <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6" />
              Calculate Your Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-secondary text-lg">Destination Country</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium text-gray-900">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(PRICING_LOGIC).map(country => (
                        <SelectItem key={country} value={country} className="font-medium">{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="font-bold text-secondary text-lg">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-secondary text-lg">Service Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Standard', 'Express', 'Overnight'].map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setPeriod(service)}
                      className={`p-4 rounded-lg font-bold uppercase tracking-wide transition-all border-2 ${
                        period === service
                          ? 'bg-gradient-to-r from-primary to-secondary text-white border-primary'
                          : 'bg-gray-50 text-secondary border-gray-300 hover:border-primary'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {price && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t-2 border-gray-200">
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border-2 border-primary">
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Estimated Price</p>
                    <p className="text-4xl font-bold text-primary mt-2">PKR {price}</p>
                  </div>
                  <div className="p-6 bg-accent/10 rounded-xl border-2 border-accent">
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Delivery Time</p>
                    <p className="text-2xl font-bold text-secondary mt-2">{getDeliveryDays()}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button 
                  type="button"
                  onClick={handleWhatsAppQuote}
                  disabled={!destination || !weight}
                  className="flex-1 bg-accent hover:bg-accent/90 text-secondary h-14 font-bold uppercase tracking-wide rounded-xl"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Quote
                </Button>
                <Button 
                  type="button"
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white h-14 font-bold uppercase tracking-wide rounded-xl"
                >
                  Proceed to Booking
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartRateCalculatorPage;
EOF
