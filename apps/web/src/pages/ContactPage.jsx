cat > apps/web/src/pages/ContactPage.jsx << 'EOF'
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import pb from '@/lib/pocketbaseClient';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await pb.collection('contacts').create(formData, { $autoCancel: false });
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 5000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-golden-texture py-12">
      <Helmet>
        <title>Contact Us | Speedat</title>
        <meta name="description" content="Get in touch with Speedat International Courier & Cargo - Speed Against Time!" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-secondary mb-4">Contact Us</h1>
          <p className="text-gray-700 text-lg font-medium">We're here to help with all your shipping needs - Speed Against Time!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="shadow-xl border-t-4 border-primary hover:shadow-2xl transition-all group">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all group-hover:scale-110">
                <Phone className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Call Us</h3>
              <div className="space-y-2 text-gray-700 font-medium">
                <a href="https://wa.me/923255943950" className="flex items-center justify-center gap-2 text-primary font-bold hover:underline">
                  <MessageCircle className="h-4 w-4" /> +92 325 5943950
                </a>
                <p>+92 321 4174421</p>
                <p>+92 333 7667076</p>
                <p>+92 315 7667076</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-t-4 border-accent hover:shadow-2xl transition-all group">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-secondary transition-all group-hover:scale-110">
                <Mail className="h-8 w-8 text-accent group-hover:text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Email Us</h3>
              <div className="space-y-2 text-gray-700 font-medium">
                <a href="mailto:info@speedat.com.pk" className="hover:text-primary font-bold">info@speedat.com.pk</a>
                <a href="mailto:support@speedat.com.pk" className="hover:text-primary font-bold">support@speedat.com.pk</a>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-t-4 border-secondary hover:shadow-2xl transition-all group">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-all group-hover:scale-110">
                <MapPin className="h-8 w-8 text-secondary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Visit Us</h3>
              <p className="text-gray-700 font-medium">Lahore, Pakistan</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-2xl border-t-4 border-primary">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Send us a Message</h2>
            
            {status.success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border-l-4 border-green-500 font-medium">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border-l-4 border-red-500 font-medium">
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold text-secondary">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold text-secondary">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="border-2 border-gray-300 focus:border-primary focus:ring-primary h-12 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-bold text-secondary">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  className="border-2 border-gray-300 focus:border-primary focus:ring-primary min-h-32 font-medium"
                />
              </div>

              <Button 
                type="submit" 
                disabled={status.loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white h-14 font-bold uppercase tracking-wide rounded-xl"
              >
                {status.loading ? 'Sending...' : <><Send className="mr-2 h-5 w-5" /> Send Message</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
EOF
