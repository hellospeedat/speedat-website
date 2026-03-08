cat > apps/web/src/pages/LoginPage.jsx << 'EOF'
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Package, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-golden-texture flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Admin Login | Speedat</title>
      </Helmet>

      <Card className="w-full max-w-md shadow-2xl border-t-4 border-primary">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-8 pt-10 bg-gradient-to-b from-accent/10 to-transparent">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Package className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-secondary">Speedat Admin</CardTitle>
          <p className="text-sm text-gray-700 font-medium">Enter your credentials to access the dashboard</p>
        </CardHeader>
        <CardContent className="pb-10 px-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border-l-4 border-red-500 font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-secondary">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-gray-900 border-2 border-gray-300 focus:border-primary focus:ring-primary font-medium"
                placeholder="admin@speedat.co"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold text-secondary">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-gray-900 border-2 border-gray-300 focus:border-primary focus:ring-primary font-medium"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white mt-4 font-bold uppercase tracking-wide rounded-xl"
            >
              {loading ? 'Authenticating...' : <><Lock className="mr-2 h-4 w-4" /> Sign In</>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
EOF
