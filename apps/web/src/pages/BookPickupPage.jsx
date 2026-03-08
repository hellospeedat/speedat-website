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
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Book Free Pickup | Speedat</title>
        <meta name="description" content="Schedule a free parcel pickup from your location in Lahore." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Book Free Pickup</h1>
          <p className="text-gray-600 text-lg">Schedule a courier pickup from your doorstep in Lahore.</p>
        </div>

        {success ? (
          <Card className="shadow-xl border-0 text-center py-12 animate-in zoom-in-95">
            <CardContent className="space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Pickup Scheduled!</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Your pickup request has been received. Our representative will contact you shortly.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl inline-block border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Reference Number</p>
                <p className="text-2xl font-mono font-bold text-primary">{success}</p>
              </div>
              <div>
                <Button onClick={() => setSuccess(null)} variant="outline" className="mt-4">
                  Book Another Pickup
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-white border-b rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Truck className="h-5 w-5 text-primary" />
                Pickup Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              {error && (
                <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-3 text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name" className="text-gray-700">Full Name *</Label>
                    <Input id="customer_name" required value={formData.customer_name} onChange={handleChange} className="text-gray-900" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">Phone Number *</Label>
                    <Input id="phone" type="tel" required placeholder="+92 3XX XXXXXXX" value={formData.phone} onChange={handleChange} className="text-gray-900" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup_address" className="text-gray-700">Complete Pickup Address (Lahore) *</Label>
                  <Input id="pickup_address" required value={formData.pickup_address} onChange={handleChange} className="text-gray-900" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-gray-700">Destination Country *</Label>
                    <Select required value={formData.destination} onValueChange={(v) => handleSelectChange('destination', v)}>
                      <SelectTrigger className="text-gray-900">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {DESTINATIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-gray-700">Approx. Weight (kg) *</Label>
                    <Input id="weight" type="number" min="0.1" step="0.1" required value={formData.weight} onChange={handleChange} className="text-gray-900" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parcel_type" className="text-gray-700">Parcel Type *</Label>
                    <Select required value={formData.parcel_type} onValueChange={(v) => handleSelectChange('parcel_type', v)}>
                      <SelectTrigger className="text-gray-900">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PARCEL_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickup_time" className="text-gray-700">Preferred Pickup Time</Label>
                    <Input id="pickup_time" type="datetime-local" value={formData.pickup_time} onChange={handleChange} className="text-gray-900" />
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md mt-8">
                  {loading ? 'Submitting...' : 'Confirm Pickup Request'}
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