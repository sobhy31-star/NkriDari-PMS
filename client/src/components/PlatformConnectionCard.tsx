import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, Settings, CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface PlatformConnection {
  id: string;
  platform: string;
  email: string;
  userId: string;
  status: "connected" | "disconnected";
  apiKey?: string;
  icsUrl?: string;
  priceMultiplier: number;
}

const PLATFORM_LOGOS: Record<string, string> = {
  airbnb: "https://cdn.worldvectorlogo.com/logos/airbnb-2.svg",
  booking: "https://cdn.worldvectorlogo.com/logos/booking-com-1.svg",
  vrbo: "https://www.vrbo.com/favicon.ico",
  website: "🌐",
  other: "📦",
};

const PLATFORM_LABELS: Record<string, string> = {
  airbnb: "Airbnb",
  booking: "Booking.com",
  vrbo: "VRBO",
  website: "Website",
  other: "Autre",
};

interface PlatformConnectionCardProps {
  propertyId: string;
}

export function PlatformConnectionCard({ propertyId }: PlatformConnectionCardProps) {
  const [connections, setConnections] = useState<PlatformConnection[]>([
    {
      id: "1",
      platform: "airbnb",
      email: "host@example.com",
      userId: "12345678",
      status: "connected",
      priceMultiplier: 22,
    },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<PlatformConnection | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    platform: "",
    email: "",
    userId: "",
    status: "disconnected" as "connected" | "disconnected",
    apiKey: "",
    icsUrl: "",
    priceMultiplier: "20",
  });

  const handleAddPlatform = () => {
    const newConnection: PlatformConnection = {
      id: Date.now().toString(),
      platform: formData.platform,
      email: formData.email,
      userId: formData.userId,
      status: formData.status,
      apiKey: formData.apiKey,
      icsUrl: formData.icsUrl,
      priceMultiplier: parseInt(formData.priceMultiplier),
    };

    setConnections([...connections, newConnection]);
    setIsAddOpen(false);
    toast.success("Plateforme ajoutée avec succès");

    // Reset form
    setFormData({
      platform: "",
      email: "",
      userId: "",
      status: "disconnected",
      apiKey: "",
      icsUrl: "",
      priceMultiplier: "20",
    });
  };

  const handleEditPlatform = () => {
    if (!selectedConnection) return;

    const updatedConnections = connections.map((conn) =>
      conn.id === selectedConnection.id
        ? {
            ...conn,
            email: formData.email,
            userId: formData.userId,
            status: formData.status,
            apiKey: formData.apiKey,
            icsUrl: formData.icsUrl,
            priceMultiplier: parseInt(formData.priceMultiplier),
          }
        : conn
    );

    setConnections(updatedConnections);
    setIsEditOpen(false);
    setSelectedConnection(null);
    toast.success("Connexion mise à jour");
  };

  const openEditDialog = (connection: PlatformConnection) => {
    setSelectedConnection(connection);
    setFormData({
      platform: connection.platform,
      email: connection.email,
      userId: connection.userId,
      status: connection.status,
      apiKey: connection.apiKey || "",
      icsUrl: connection.icsUrl || "",
      priceMultiplier: connection.priceMultiplier.toString(),
    });
    setIsEditOpen(true);
  };



  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Connexion aux plateformes</CardTitle>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]">
                <Plus className="h-4 w-4" />
                Ajouter une plateforme
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter une connexion plateforme</DialogTitle>
                <DialogDescription>
                  Connectez une nouvelle plateforme de réservation à cette propriété
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Plateforme *</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => setFormData({ ...formData, platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une plateforme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="airbnb">Airbnb</SelectItem>
                      <SelectItem value="booking">Booking.com</SelectItem>
                      <SelectItem value="vrbo">VRBO</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email / Compte *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="host@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userId">ID utilisateur</Label>
                    <Input
                      id="userId"
                      value={formData.userId}
                      onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                      placeholder="12345678"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "connected" | "disconnected") =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="connected">Connecté API</SelectItem>
                        <SelectItem value="disconnected">Non connecté</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceMultiplier">Price Multiplier (%)</Label>
                    <Input
                      id="priceMultiplier"
                      type="number"
                      value={formData.priceMultiplier}
                      onChange={(e) => setFormData({ ...formData, priceMultiplier: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key / Token (optionnel)</Label>
                  <Input
                    id="apiKey"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    placeholder="sk_live_..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icsUrl">Lien ICS / Calendrier (optionnel)</Label>
                  <Input
                    id="icsUrl"
                    value={formData.icsUrl}
                    onChange={(e) => setFormData({ ...formData, icsUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Annuler
                </Button>
                <Button
                  onClick={handleAddPlatform}
                  className="bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
                  disabled={!formData.platform || !formData.email}
                >
                  Ajouter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Liste des connexions */}
        {connections.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Aucune plateforme connectée
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {connections.map((connection) => (
              <Card key={connection.id} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {PLATFORM_LOGOS[connection.platform]?.startsWith("http") ? (
                        <img
                          src={PLATFORM_LOGOS[connection.platform]}
                          alt={PLATFORM_LABELS[connection.platform]}
                          className="h-8 w-8"
                        />
                      ) : (
                        <span className="text-2xl">{PLATFORM_LOGOS[connection.platform]}</span>
                      )}
                      <div>
                        <h4 className="font-semibold">{PLATFORM_LABELS[connection.platform]}</h4>
                        <p className="text-xs text-muted-foreground">{connection.email}</p>
                      </div>
                    </div>
                    <Badge
                      variant={connection.status === "connected" ? "default" : "secondary"}
                      className={
                        connection.status === "connected"
                          ? "bg-[var(--nk-success)] text-white"
                          : "bg-gray-400 text-white"
                      }
                    >
                      {connection.status === "connected" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {connection.status === "connected" ? "Connecté" : "Non connecté"}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID utilisateur:</span>
                      <span className="font-medium">{connection.userId || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price Multiplier:</span>
                      <span className="font-medium">{connection.priceMultiplier}%</span>
                    </div>
                  </div>

                       <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(connection)}
                      className="w-full"
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Gérer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Dialog d'édition */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gérer la connexion</DialogTitle>
              <DialogDescription>
                Modifiez les paramètres de connexion pour{" "}
                {selectedConnection && PLATFORM_LABELS[selectedConnection.platform]}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email / Compte</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-userId">ID utilisateur</Label>
                  <Input
                    id="edit-userId"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "connected" | "disconnected") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="connected">Connecté API</SelectItem>
                      <SelectItem value="disconnected">Non connecté</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-priceMultiplier">Price Multiplier (%)</Label>
                  <Input
                    id="edit-priceMultiplier"
                    type="number"
                    value={formData.priceMultiplier}
                    onChange={(e) => setFormData({ ...formData, priceMultiplier: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-apiKey">API Key / Token</Label>
                <Input
                  id="edit-apiKey"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-icsUrl">Lien ICS / Calendrier</Label>
                <Input
                  id="edit-icsUrl"
                  value={formData.icsUrl}
                  onChange={(e) => setFormData({ ...formData, icsUrl: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Annuler
              </Button>
              <Button
                onClick={handleEditPlatform}
                className="bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
