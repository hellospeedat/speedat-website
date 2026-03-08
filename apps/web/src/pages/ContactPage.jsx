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
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Contact Us | Speedat</title>
        <meta name="description" content="Get in touch with Speedat International Courier & Cargo." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">We're here to help with all your shipping needs.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="shadow-md border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Call Us</h3>
              <div className="space-y-2 text-gray-600">
                <a href="https://wa.me/923255943950" className="flex items-center justify-center gap-2 text-[#25D366] font-medium hover:underline">
                  <MessageCircle className="h-4 w-4" /> +92 325 5943950
                </a>
                <p>+92 321 4174421</p>
                <p>+92 333 7667076</p>
                <p>+92 315 7667076</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Email Us</h3>
              <a href="mailto:hellospeedat@gmail.com" className="text-gray-600 hover:text-primary transition-colors">
                hellospeedat@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Visit Us</h3>
              <p className="text-gray-600">
                Al-Sheikh Plaza, Model Town<br />
                Lahore, Pakistan
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0 overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3402.565568140884!2d74.3219!3d31.4811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI4JzUyLjAiTiA3NMKwMTknMTguOCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '400px' }} 
              allowFullScreen="" 
              loading="lazy"
              title="Speedat Office Location"
            ></iframe>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-secondary mb-6">Send us a Message</h3>
              
              {status.success && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {status.error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {status.error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Your Name</Label>
                  <Input 
                    id="name" 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700">Message</Label>
                  <Textarea 
                    id="message" 
                    required 
                    rows={5}
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="text-gray-900 resize-none"
                  />
                </div>
                <Button type="submit" disabled={status.loading} className="w-full h-12 bg-primary hover:bg-primary/90 text-white">
                  {status.loading ? 'Sending...' : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;