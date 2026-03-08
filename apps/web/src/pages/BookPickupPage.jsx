cat > apps/web/src/pages/BookPickupPage.jsx << 'EOF'
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import pb from '@/lib/pocketbaseClient';

const DESTINATIONS = ['USA', 'UK', 'UAE', 'Canada', 'Australia', 'Germany', 'France', 'Singapore', 'Hong Kong', 'Japan'];
const PARCEL_TYPES = [
  { label: 'Documents', value: 'documents' },
  { label: 'Parcels', value: 'parcels' },
  { label: 'Fragile', value: 'fragile' },
  { label: 'Electronics', value: 'electronics' }
];

const BookPickupPage = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    pickup_address: '',
    destination: '',
    weight: '',
    parcel_type: '',
    pickup_time: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(null);

    try {
      const refNumber = `PKP-${Date.now().toString().slice(-6)}`;
      
      await pb.collection('pickup_requests').create({
        customer_name: formData.customer_name,
        phone: formData.phone,
        pickup_address: formData.pickup_address,
        destination: formData.destination,
        weight: parseFloat(formData.weight),
        parcel_type: formData.parcel_type,
        pickup_time: formData.pickup_time ? new Date(formData.pickup_time).toISOString() : null,
        status: 'Pending'
      }, { $autoCancel: false });

      setSuccess(refNumber);
      setFormData({
        customer_name: '', phone: '', pickup_address: '', destination: '', weight: '', parcel_type: '', pickup_time: ''
      });
    } catch (err) {
      setError('Failed to book pickup. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-golden-texture py-12">
      <Helmet>
        <title>Book Free Pickup | Speedat</title>
        <meta name="description" content="Schedule a free parcel pickup from your location in Lahore." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-secondary mb-4 flex items-center justify-center gap-3">
            <Truck className="h-10 w-10 text-primary" />
            Book Free Pickup
          </h1>
          <p className="text-gray-700 text-lg font-medium">Schedule a courier pickup from your doorstep in Lahore.</p>
        </div>

        {success ? (
          <Card className="shadow-2xl border-t-4 border-green-500 text-center py-12 animate-fade-in">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-secondary">Pickup Booked!</h2>
              <p className="text-gray-700 font-medium">Your reference number is:</p>
              <p className="text-2xl font-bold text-primary">{success}</p>
              <p className="text-gray-600">Our driver will contact you soon to confirm the pickup time.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-2xl border-t-4 border-primary">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
              <CardTitle className="text-2xl font-bold">Pickup Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border-l-4 border-red-500 font-medium flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name" className="font-bold text-secondary">Full Name</Label>
                    <Input
                      id="customer_name"
                      placeholder="Your name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-bold text-secondary">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup_address" className="font-bold text-secondary">Pickup Address</Label>
                  <Input
                    id="pickup_address"
                    placeholder="Enter your full address"
                    value={formData.pickup_address}
                    onChange={handleChange}
                    required
                    className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-secondary">Destination Country</Label>
                    <Select value={formData.destination} onValueChange={(value) => handleSelectChange('destination', value)}>
                      <SelectTrigger className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {DESTINATIONS.map(dest => (
                          <SelectItem key={dest} value={dest} className="font-medium">{dest}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="font-bold text-secondary">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="0.5"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-secondary">Parcel Type</Label>
                    <Select value={formData.parcel_type} onValueChange={(value) => handleSelectChange('parcel_type', value)}>
                      <SelectTrigger className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PARCEL_TYPES.map(type => (
                          <SelectItem key={type.value} value={type.value} className="font-medium">{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickup_time" className="font-bold text-secondary">Preferred Pickup Time</Label>
                    <Input
                      id="pickup_time"
                      type="datetime-local"
                      value={formData.pickup_time}
                      onChange={handleChange}
                      className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white h-14 font-bold uppercase tracking-wide rounded-xl mt-8"
                >
                  {loading ? 'Booking Pickup...' : 'Book Free Pickup'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookPickupPage;
EOF
