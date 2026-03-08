import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { LayoutDashboard, Package, Users, DollarSign, Truck, Settings, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({ orders: 0, customers: 0, revenue: 0 });
  const [shipments, setShipments] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [shipmentsRes, pickupsRes, customersRes, pricingRes] = await Promise.all([
        pb.collection('shipments').getFullList({ sort: '-created', $autoCancel: false }),
        pb.collection('pickup_requests').getFullList({ sort: '-created', $autoCancel: false }),
        pb.collection('customers').getFullList({ sort: '-created', $autoCancel: false }),
        pb.collection('pricing').getFullList({ sort: 'destination_country', $autoCancel: false })
      ]);

      setShipments(shipmentsRes);
      setPickups(pickupsRes);
      setCustomers(customersRes);
      setPricing(pricingRes);

      setStats({
        orders: shipmentsRes.length + pickupsRes.length,
        customers: customersRes.length,
        revenue: shipmentsRes.length * 45 // Mock revenue calculation
      });
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateShipmentStatus = async (id, newStatus) => {
    try {
      await pb.collection('shipments').update(id, { status: newStatus }, { $autoCancel: false });
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const updatePickupStatus = async (id, newStatus) => {
    try {
      await pb.collection('pickup_requests').update(id, { status: newStatus }, { $autoCancel: false });
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Helmet>
        <title>Admin Dashboard | Speedat</title>
      </Helmet>

      <div className="bg-secondary text-white py-8 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-300 mt-1">Manage your logistics operations</p>
          </div>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white p-1 shadow-sm rounded-lg border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pickups">Pickup Requests</TabsTrigger>
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Engine</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">{stats.orders}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">{stats.customers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Est. Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">${stats.revenue}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pickups">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pickups.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">{req.customer_name}<br/><span className="text-xs text-gray-500">{req.phone}</span></TableCell>
                        <TableCell>{req.destination}</TableCell>
                        <TableCell>{req.weight} kg</TableCell>
                        <TableCell>{new Date(req.created).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select value={req.status} onValueChange={(v) => updatePickupStatus(req.id, v)}>
                            <SelectTrigger className="w-[130px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Confirmed">Confirmed</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pickups.length === 0 && (
                      <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-500">No pickup requests found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipments">
            <Card>
              <CardHeader>
                <CardTitle>Active Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking #</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments.map((ship) => (
                      <TableRow key={ship.id}>
                        <TableCell className="font-mono font-medium">{ship.tracking_number}</TableCell>
                        <TableCell>{ship.origin || 'Lahore'} → {ship.destination}</TableCell>
                        <TableCell>{ship.weight} kg</TableCell>
                        <TableCell>
                          <Select value={ship.status} onValueChange={(v) => updateShipmentStatus(ship.id, v)}>
                            <SelectTrigger className="w-[140px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Booked">Booked</SelectItem>
                              <SelectItem value="Packed">Packed</SelectItem>
                              <SelectItem value="Dispatched">Dispatched</SelectItem>
                              <SelectItem value="In Transit">In Transit</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                    {shipments.length === 0 && (
                      <TableRow><TableCell colSpan={4} className="text-center py-8 text-gray-500">No shipments found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Database</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>{c.phone}<br/><span className="text-xs text-gray-500">{c.email}</span></TableCell>
                        <TableCell className="max-w-[200px] truncate">{c.address}</TableCell>
                        <TableCell>{new Date(c.created).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {customers.length === 0 && (
                      <TableRow><TableCell colSpan={4} className="text-center py-8 text-gray-500">No customers found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Destination</TableHead>
                      <TableHead>Weight Range</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Delivery Days</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pricing.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.destination_country}</TableCell>
                        <TableCell>{p.weight_range_min} - {p.weight_range_max} kg</TableCell>
                        <TableCell>${p.base_price}</TableCell>
                        <TableCell>{p.delivery_days} days</TableCell>
                      </TableRow>
                    ))}
                    {pricing.length === 0 && (
                      <TableRow><TableCell colSpan={4} className="text-center py-8 text-gray-500">No pricing rules found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;