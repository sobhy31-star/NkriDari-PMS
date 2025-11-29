import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, Plus, ExternalLink, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Platform {
  id: string;
  name: string;
  email: string;
  userId: string;
  status: "connected" | "not_connected";
  urlConnexion?: string;
}

// URLs de connexion par défaut pour les plateformes courantes
const PLATFORM_CONNECTION_URLS: Record<string, string> = {
  airbnb: "https://www.airbnb.com/hosting",
  booking: "https://admin.booking.com/",
  vrbo: "https://www.vrbo.com/owner/login",
  expedia: "https://www.expediapartnercentral.com/",
  "google vacation rentals": "https://www.google.com/travel/hotels/",
  tripadvisor: "https://www.tripadvisor.com/Owners",
};

export function SettingsPlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: "1",
      name: "Airbnb",
      email: "mohamed@nkridari.com",
      userId: "12345678",
      status: "connected",
      urlConnexion: PLATFORM_CONNECTION_URLS.airbnb,
    },
    {
      id: "2",
      name: "Booking.com",
      email: "mohamed@nkridari.com",
      userId: "987654321",
      status: "connected",
      urlConnexion: PLATFORM_CONNECTION_URLS.booking,
    },
    {
      id: "3",
      name: "VRBO",
      email: "mohamed@nkridari.com",
      userId: "—",
      status: "not_connected",
      urlConnexion: PLATFORM_CONNECTION_URLS.vrbo,
    },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userId: "",
    status: "not_connected" as "connected" | "not_connected",
    urlConnexion: "",
  });

  const handleAddPlatform = () => {
    const newPlatform: Platform = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      userId: formData.userId,
      status: formData.status,
      urlConnexion: formData.urlConnexion || PLATFORM_CONNECTION_URLS[formData.name.toLowerCase()],
    };

    setPlatforms([...platforms, newPlatform]);
    setIsAddOpen(false);
    toast.success("Plateforme ajoutée avec succès");

    // Reset form
    setFormData({
      name: "",
      email: "",
      userId: "",
      status: "not_connected",
      urlConnexion: "",
    });
  };

  const handleEditPlatform = () => {
    if (!selectedPlatform) return;

    const updatedPlatforms = platforms.map((p) =>
      p.id === selectedPlatform.id
        ? {
            ...p,
            email: formData.email,
            userId: formData.userId,
            status: formData.status,
            urlConnexion: formData.urlConnexion,
          }
        : p
    );

    setPlatforms(updatedPlatforms);
    setIsEditOpen(false);
    setSelectedPlatform(null);
    toast.success("Plateforme mise à jour");
  };

  const openEditDialog = (platform: Platform) => {
    setSelectedPlatform(platform);
    setFormData({
      name: platform.name,
      email: platform.email,
      userId: platform.userId,
      status: platform.status,
      urlConnexion: platform.urlConnexion || "",
    });
    setIsEditOpen(true);
  };

  const handleOpenUrl = (platform: Platform) => {
    if (platform.urlConnexion) {
      window.open(platform.urlConnexion, "_blank", "noopener,noreferrer");
    } else {
      toast.info("Aucune URL de connexion définie");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Plateformes de réservation</CardTitle>
              <CardDescription>Gérez vos connexions aux plateformes OTA</CardDescription>
            </div>
            <Button
              className="gap-2 bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
              onClick={() => setIsAddOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Ajouter une plateforme
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plateforme</TableHead>
                <TableHead>Email / Compte</TableHead>
                <TableHead>ID utilisateur</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platforms.map((platform) => (
                <TableRow key={platform.id}>
                  <TableCell className="font-medium">{platform.name}</TableCell>
                  <TableCell>{platform.email}</TableCell>
                  <TableCell>{platform.userId}</TableCell>
                  <TableCell>
                    <Badge
                      variant={platform.status === "connected" ? "default" : "secondary"}
                      className={
                        platform.status === "connected"
                          ? "bg-[var(--nk-success)] text-white"
                          : "bg-gray-200 text-gray-700"
                      }
                    >
                      {platform.status === "connected" ? "Connecté API" : "Non connecté"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(platform)}>
                          <Settings className="h-4 w-4 mr-2" />
                          Gérer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenUrl(platform)}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ouvrir la plateforme
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog d'ajout */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter une plateforme</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle plateforme de réservation à votre compte
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Nom de la plateforme *</Label>
              <Select
                value={formData.name}
                onValueChange={(value) => setFormData({ ...formData, name: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une plateforme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Airbnb">Airbnb</SelectItem>
                  <SelectItem value="Booking.com">Booking.com</SelectItem>
                  <SelectItem value="VRBO">VRBO</SelectItem>
                  <SelectItem value="Expedia">Expedia</SelectItem>
                  <SelectItem value="Google Vacation Rentals">Google Vacation Rentals</SelectItem>
                  <SelectItem value="TripAdvisor">TripAdvisor</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="platform-email">Email / Compte *</Label>
                <Input
                  id="platform-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="host@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform-userId">ID utilisateur</Label>
                <Input
                  id="platform-userId"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  placeholder="12345678"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="platform-status">Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "connected" | "not_connected") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="connected">Connecté API</SelectItem>
                    <SelectItem value="not_connected">Non connecté</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform-url">URL de connexion (optionnel)</Label>
                <Input
                  id="platform-url"
                  value={formData.urlConnexion}
                  onChange={(e) => setFormData({ ...formData, urlConnexion: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleAddPlatform}
              className="bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
              disabled={!formData.name || !formData.email}
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog d'édition */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Gérer la plateforme</DialogTitle>
            <DialogDescription>Modifiez les paramètres de {selectedPlatform?.name}</DialogDescription>
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
                  onValueChange={(value: "connected" | "not_connected") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="connected">Connecté API</SelectItem>
                    <SelectItem value="not_connected">Non connecté</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-url">URL de connexion</Label>
                <Input
                  id="edit-url"
                  value={formData.urlConnexion}
                  onChange={(e) => setFormData({ ...formData, urlConnexion: e.target.value })}
                />
              </div>
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
    </div>
  );
}
