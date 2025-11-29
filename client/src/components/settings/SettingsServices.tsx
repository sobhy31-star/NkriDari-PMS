import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, Home, Key, Lock, Workflow, Zap } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "connected" | "not_configured";
}

interface SuperCheckinDevice {
  id: string;
  name: string;
  deviceId: string;
}

interface ServiceConfig {
  service_name: string;
  active: boolean;
  config: any;
}

// Mock devices pour SuperCheckin
const mockDevices: SuperCheckinDevice[] = [
  { id: "1", name: "S5344_479bf2 (20712286)", deviceId: "20712286" },
  { id: "2", name: "S5344_479bf2 (17138481)", deviceId: "17138481" },
  { id: "3", name: "S5344_479bf2 (18681447)", deviceId: "18681447" },
];

const services: Service[] = [
  {
    id: "netatmo",
    name: "Netatmo",
    description: "Thermostats et capteurs connectés",
    icon: Cloud,
    status: "not_configured",
  },
  {
    id: "supercheckin",
    name: "SuperCheckin",
    description: "Service d'enregistrement en ligne",
    icon: Home,
    status: "not_configured",
  },
  {
    id: "nuki",
    name: "Nuki",
    description: "Serrures connectées",
    icon: Lock,
    status: "not_configured",
  },
  {
    id: "igloohome",
    name: "Igloohome",
    description: "Gestion d'accès intelligent",
    icon: Key,
    status: "not_configured",
  },
  {
    id: "thekeys",
    name: "TheKeys",
    description: "Gestion de clés et accès",
    icon: Key,
    status: "not_configured",
  },
  {
    id: "automation",
    name: "Make / n8n",
    description: "Automatisation et workflows",
    icon: Workflow,
    status: "not_configured",
  },
];

export function SettingsServices() {
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceConfigs, setServiceConfigs] = useState<Record<string, ServiceConfig>>({});

  // SuperCheckin specific state
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [deviceType, setDeviceType] = useState<string>("Rental");
  const [checkinTime, setCheckinTime] = useState<string>("15:00");
  const [checkoutTime, setCheckoutTime] = useState<string>("11:00");

  // Generic service config state
  const [apiClientId, setApiClientId] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [serviceActive, setServiceActive] = useState<boolean>(false);

  // Load configs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("service_configs");
    if (stored) {
      setServiceConfigs(JSON.parse(stored));
    }
  }, []);

  const handleOpenConfig = (serviceId: string) => {
    setSelectedService(serviceId);
    
    // Load existing config if any
    const existing = serviceConfigs[serviceId];
    if (existing) {
      if (serviceId === "supercheckin") {
        setSelectedDevice(existing.config.device_id || "");
        setDeviceType(existing.config.device_type || "Rental");
        setCheckinTime(existing.config.checkin_time || "15:00");
        setCheckoutTime(existing.config.checkout_time || "11:00");
      } else {
        setApiClientId(existing.config.client_id || "");
        setApiSecret(existing.config.secret || "");
        setServiceActive(existing.active);
      }
    } else {
      // Reset to defaults
      setSelectedDevice("");
      setDeviceType("Rental");
      setCheckinTime("15:00");
      setCheckoutTime("11:00");
      setApiClientId("");
      setApiSecret("");
      setServiceActive(false);
    }
    
    setConfigModalOpen(true);
  };

  const handleSaveConfig = () => {
    if (!selectedService) return;

    let config: ServiceConfig;
    
    if (selectedService === "supercheckin") {
      if (!selectedDevice) {
        toast.error("Veuillez sélectionner un appareil");
        return;
      }
      config = {
        service_name: selectedService,
        active: true,
        config: {
          device_id: selectedDevice,
          device_type: deviceType,
          checkin_time: checkinTime,
          checkout_time: checkoutTime,
        },
      };
    } else {
      if (!apiClientId || !apiSecret) {
        toast.error("Veuillez remplir tous les champs requis");
        return;
      }
      config = {
        service_name: selectedService,
        active: serviceActive,
        config: {
          client_id: apiClientId,
          secret: apiSecret,
        },
      };
    }

    // Save to localStorage (TODO: replace with Supabase when table is created)
    const updated = { ...serviceConfigs, [selectedService]: config };
    setServiceConfigs(updated);
    localStorage.setItem("service_configs", JSON.stringify(updated));

    toast.success(`Configuration de ${services.find(s => s.id === selectedService)?.name} enregistrée !`);
    setConfigModalOpen(false);
  };

  const getServiceStatus = (serviceId: string): "connected" | "not_configured" => {
    const config = serviceConfigs[serviceId];
    return config && config.active ? "connected" : "not_configured";
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--nk-ink)]">Services connectés</h3>
        <p className="text-sm text-muted-foreground">
          Connectez vos services tiers pour automatiser votre conciergerie
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          const status = getServiceStatus(service.id);
          return (
            <Card key={service.id} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[var(--nk-sand)] p-3">
                      <Icon className="h-6 w-6 text-[var(--nk-terracotta)]" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{service.name}</CardTitle>
                      <CardDescription className="text-xs">{service.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={status === "connected" ? "default" : "secondary"}
                    className={
                      status === "connected"
                        ? "bg-[var(--nk-success)] text-white"
                        : "bg-gray-200 text-gray-700"
                    }
                  >
                    {status === "connected" ? "Connecté" : "Non configuré"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenConfig(service.id)}
                  >
                    Configurer
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal de configuration */}
      <Dialog open={configModalOpen} onOpenChange={setConfigModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Configurer {services.find(s => s.id === selectedService)?.name}
            </DialogTitle>
            <DialogDescription>
              Configurez les paramètres de connexion pour ce service
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedService === "supercheckin" ? (
              <>
                {/* Configuration SuperCheckin */}
                <div className="space-y-2">
                  <Label>Appareil connecté</Label>
                  <RadioGroup value={selectedDevice} onValueChange={setSelectedDevice}>
                    {mockDevices.map((device) => (
                      <div key={device.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={device.deviceId} id={device.id} />
                        <Label htmlFor={device.id} className="font-normal cursor-pointer">
                          {device.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deviceType">Type</Label>
                  <Select value={deviceType} onValueChange={setDeviceType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rental">Rental</SelectItem>
                      <SelectItem value="Owner">Owner</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="checkinTime">Heure d'arrivée</Label>
                    <Input
                      id="checkinTime"
                      type="time"
                      value={checkinTime}
                      onChange={(e) => setCheckinTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkoutTime">Heure de départ</Label>
                    <Input
                      id="checkoutTime"
                      type="time"
                      value={checkoutTime}
                      onChange={(e) => setCheckoutTime(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Configuration générique pour les autres services */}
                <div className="space-y-2">
                  <Label htmlFor="clientId">Identifiant API / Client ID</Label>
                  <Input
                    id="clientId"
                    value={apiClientId}
                    onChange={(e) => setApiClientId(e.target.value)}
                    placeholder="Entrez votre identifiant API"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiSecret">Clé secrète / Token</Label>
                  <Input
                    id="apiSecret"
                    type="password"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    placeholder="Entrez votre clé secrète"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="serviceActive"
                    checked={serviceActive}
                    onCheckedChange={setServiceActive}
                  />
                  <Label htmlFor="serviceActive" className="cursor-pointer">
                    Activer ce service
                  </Label>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigModalOpen(false)}>
              Annuler
            </Button>
            <Button
              className="bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
              onClick={handleSaveConfig}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
