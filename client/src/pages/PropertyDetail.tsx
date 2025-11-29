import * as React from "react";
import DashboardLayoutNew from "@/components/DashboardLayoutNew";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Copy } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { toast } from "sonner";
import { PlatformConnectionCard } from "@/components/PlatformConnectionCard";

/**
 * Page de détail d'une propriété avec 4 onglets
 */
export default function PropertyDetail() {
  const [, params] = useRoute("/properties/:id");
  const [, setLocation] = useLocation();
  const propertyId = params?.id;

  // Onglet actif
  const [activeTab, setActiveTab] = React.useState("infos");

  // TODO: Charger depuis Supabase
  const property = {
    id: propertyId,
    name: "Villa Marrakech",
    city: "Marrakech",
    country: "Maroc",
    status: "active",
  };

  const handleSave = () => {
    toast.success("Modifications enregistrées");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://nkridari.com/property/${propertyId}`);
    toast.success("Lien copié dans le presse-papiers");
  };

  return (
    <DashboardLayoutNew title={property.name}>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation("/properties")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la liste
          </Button>

          <Button
            onClick={handleSave}
            className="gap-2 bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
          >
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
        </div>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="infos">Infos</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="platforms">Plateformes connectées</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
          </TabsList>

          {/* INFOS */}
          <TabsContent value="infos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de la propriété *</Label>
                    <Input id="name" defaultValue={property.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Type de logement</Label>
                    <Select defaultValue="villa">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="apartment">Appartement</SelectItem>
                        <SelectItem value="riad">Riad</SelectItem>
                        <SelectItem value="house">Maison</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville *</Label>
                    <Input id="city" defaultValue={property.city} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays *</Label>
                    <Input id="country" defaultValue={property.country} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Capacité (personnes)</Label>
                    <Input type="number" defaultValue="6" />
                  </div>
                  <div className="space-y-2">
                    <Label>Chambres</Label>
                    <Input type="number" defaultValue="3" />
                  </div>
                  <div className="space-y-2">
                    <Label>Salles de bain</Label>
                    <Input type="number" defaultValue="2" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Prix minimum / nuit</Label>
                    <Input type="number" defaultValue="80" />
                  </div>
                  <div className="space-y-2">
                    <Label>Prix standard / nuit</Label>
                    <Input type="number" defaultValue="120" />
                  </div>
                  <div className="space-y-2">
                    <Label>Devise</Label>
                    <Select defaultValue="EUR">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="MAD">MAD (DH)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Taxe de séjour</Label>
                    <Input type="number" defaultValue="2.5" />
                  </div>
                  <div className="space-y-2">
                    <Label>TVA (%)</Label>
                    <Input type="number" defaultValue="20" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Heure check-in</Label>
                    <Input type="time" defaultValue="15:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Heure check-out</Label>
                    <Input type="time" defaultValue="11:00" />
                  </div>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          {/* SERVICES */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conciergerie NkriDari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Commission (%)</Label>
                    <Input type="number" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label>Frais de ménage (par séjour)</Label>
                    <Input type="number" defaultValue="50" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Frais de check-in</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Frais de linge (optionnel)</Label>
                    <Input type="number" defaultValue="0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Autres frais</Label>
                  <Textarea
                    placeholder="Décrivez les autres frais éventuels..."
                    rows={3}
                  />
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          {/* PLATEFORMES */}
          <TabsContent value="platforms" className="space-y-4">
            <PlatformConnectionCard propertyId={propertyId || ""} />
          </TabsContent>

          {/* WEBSITE */}
          <TabsContent value="website" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Site vitrine & moteur de réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <div className="space-y-2">
                  <Label>URL de la page propriété</Label>
                  <div className="flex gap-2">
                    <Input
                      defaultValue={`https://nkridari.com/property/${propertyId}`}
                      readOnly
                    />
                    <Button variant="outline" size="icon" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>URL du moteur de réservation</Label>
                  <Input
                    defaultValue={`https://booking.nkridari.com/${propertyId}`}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label>Code d'intégration (widget)</Label>
                  <Textarea
                    defaultValue={`<iframe src="https://booking.nkridari.com/widget/${propertyId}" width="100%" height="600"></iframe>`}
                    rows={5}
                    readOnly
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="w-full gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copier le lien de réservation
                </Button>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </DashboardLayoutNew>
  );
}
