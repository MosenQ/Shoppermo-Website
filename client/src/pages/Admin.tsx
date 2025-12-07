import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Lock, Users, Store, UserCheck, LogOut, UserPlus, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface MerchantApplication {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  plan: string;
  createdAt: string;
}

interface UserAccount {
  id: string;
  username: string;
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [applications, setApplications] = useState<MerchantApplication[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [createUserError, setCreateUserError] = useState("");
  const [createUserSuccess, setCreateUserSuccess] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchData();
    }
  }, [isLoggedIn, token]);

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [waitlistRes, applicationsRes, usersRes] = await Promise.all([
        fetch("/api/admin/waitlist", { headers }),
        fetch("/api/admin/applications", { headers }),
        fetch("/api/admin/users", { headers }),
      ]);

      if (waitlistRes.ok) {
        setWaitlist(await waitlistRes.json());
      }
      if (applicationsRes.ok) {
        setApplications(await applicationsRes.json());
      }
      if (usersRes.ok) {
        setUsers(await usersRes.json());
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        sessionStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
      } else {
        const data = await res.json().catch(() => ({}));
        if (res.status === 503) {
          setError("Admin panel is not configured. Please set the ADMIN_PASSWORD.");
        } else {
          setError(data.error || "Invalid password");
        }
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
    sessionStorage.removeItem("adminToken");
    setToken("");
    setIsLoggedIn(false);
    setWaitlist([]);
    setApplications([]);
    setUsers([]);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    setCreateUserError("");
    setCreateUserSuccess("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setCreateUserSuccess(`User "${data.username}" created successfully!`);
        setNewUsername("");
        setNewPassword("");
        fetchData();
      } else {
        setCreateUserError(data.error || "Failed to create user");
      }
    } catch {
      setCreateUserError("Failed to create user. Please try again.");
    } finally {
      setCreatingUser(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <p className="text-gray-600 mt-2">Enter password to access the admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-admin-password"
              />
              {error && <p className="text-red-500 text-sm" data-testid="text-login-error">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={loading}
                data-testid="button-admin-login"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Shoppermo Admin</h1>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Waitlist Signups</p>
                  <p className="text-3xl font-bold" data-testid="text-waitlist-count">{waitlist.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Store Applications</p>
                  <p className="text-3xl font-bold" data-testid="text-applications-count">{applications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Merchant Accounts</p>
                  <p className="text-3xl font-bold" data-testid="text-users-count">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="waitlist" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="waitlist" data-testid="tab-waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="applications" data-testid="tab-applications">Store Applications</TabsTrigger>
            <TabsTrigger value="accounts" data-testid="tab-accounts">Merchant Accounts</TabsTrigger>
          </TabsList>

          <TabsContent value="waitlist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Waitlist Signups
                </CardTitle>
              </CardHeader>
              <CardContent>
                {waitlist.length === 0 ? (
                  <p className="text-gray-500 text-center py-8" data-testid="text-waitlist-empty">No waitlist signups yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {waitlist.map((entry) => (
                        <TableRow key={entry.id} data-testid={`row-waitlist-${entry.id}`}>
                          <TableCell className="font-medium">{entry.name}</TableCell>
                          <TableCell>{entry.email}</TableCell>
                          <TableCell>{format(new Date(entry.createdAt), "MMM d, yyyy")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Store Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <p className="text-gray-500 text-center py-8" data-testid="text-applications-empty">No store applications yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app.id} data-testid={`row-application-${app.id}`}>
                          <TableCell className="font-medium">{app.businessName}</TableCell>
                          <TableCell>{app.contactName}</TableCell>
                          <TableCell>{app.email}</TableCell>
                          <TableCell>{app.phone}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{app.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={app.plan === "premium" ? "bg-orange-600" : "bg-gray-600"}>
                              {app.plan}
                            </Badge>
                          </TableCell>
                          <TableCell>{format(new Date(app.createdAt), "MMM d, yyyy")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Create Merchant Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-username">Username</Label>
                        <Input
                          id="new-username"
                          type="text"
                          placeholder="Enter username"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          data-testid="input-new-username"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="Enter password (min 6 characters)"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          data-testid="input-new-password"
                          required
                        />
                      </div>
                    </div>
                    {createUserError && (
                      <p className="text-red-500 text-sm" data-testid="text-create-user-error">{createUserError}</p>
                    )}
                    {createUserSuccess && (
                      <p className="text-green-600 text-sm" data-testid="text-create-user-success">{createUserSuccess}</p>
                    )}
                    <Button 
                      type="submit" 
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={creatingUser}
                      data-testid="button-create-user"
                    >
                      {creatingUser ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Create User
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    Merchant Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {users.length === 0 ? (
                    <p className="text-gray-500 text-center py-8" data-testid="text-users-empty">No merchant accounts created yet</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Account ID</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell className="text-gray-500 font-mono text-sm">{user.id}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
