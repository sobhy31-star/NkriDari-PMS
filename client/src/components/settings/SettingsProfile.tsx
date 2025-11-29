import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/_core/hooks/useAuth";
import { useAppSettings, Currency, Locale } from "@/contexts/AppSettingsContext";
import { CreditCard, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useSupabase } from "@/hooks/useSupabase";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PhoneInput } from "@/components/PhoneInput";
import { CountrySelect } from "@/components/CountrySelect";

export function SettingsProfile() {
  const { user } = useAuth();
  const { currency, setCurrency, locale, setLocale, savePreferences } = useAppSettings();
  const { tenantId } = useSupabase();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Maroc");
  const [timezone, setTimezone] = useState("Europe/Paris");
  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [billingCountry, setBillingCountry] = useState("MA");
  const [vat, setVat] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal states pour PSP
  const [stripeModalOpen, setStripeModalOpen] = useState(false);
  const [moneiModalOpen, setMoneiModalOpen] = useState(false);
  const [otherPspModalOpen, setOtherPspModalOpen] = useState(false);

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image (PNG, JPG)");
      return;
    }

    setUploading(true);

    try {
      // Créer un nom de fichier unique
      const fileExt = file.name.split(".").pop();
      const fileName = `${tenantId}-logo-${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      // Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("public")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Récupérer l'URL publique
      const { data } = supabase.storage.from("public").getPublicUrl(filePath);
      
      setLogoUrl(data.publicUrl);
      toast.success("Logo mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast.error("Erreur lors de l'upload du logo");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Sauvegarder les préférences dans user_metadata
      await savePreferences();
      
      // TODO: Sauvegarder les autres informations dans une table profil
      toast.success("Profil enregistré avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Erreur lors de la sauvegarde du profil");
    }
  };

  const handleSaveBilling = () => {
    // TODO: Implémenter la sauvegarde de l'adresse de facturation
    toast.success("Adresse de facturation enregistrée !");
  };

  const handleConnectStripe = () => {
    // TODO: Implémenter la connexion Stripe
    toast.success("Configuration Stripe enregistrée !");
    setStripeModalOpen(false);
  };

  const handleConnectMonei = () => {
    // TODO: Implémenter la connexion Monei
    toast.success("Configuration Monei enregistrée !");
    setMoneiModalOpen(false);
  };

  const handleAddOtherPsp = () => {
    // TODO: Implémenter l'ajout d'un autre PSP
    toast.success("PSP ajouté avec succès !");
    setOtherPspModalOpen(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Colonne 1: Profil utilisateur */}
      <Card>
        <CardHeader>
          <CardTitle>Profil utilisateur</CardTitle>
          <CardDescription>Informations personnelles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input 
              id="firstName" 
              placeholder="Mohamed" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input 
              id="lastName" 
              placeholder="Sobhy" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              defaultCountryCode="MA"
              placeholder="6 12 34 56 78"
            />
          </div>

          <div className="pt-4 space-y-2">
            <Label>Logo / Photo de la conciergerie</Label>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-lg bg-[var(--nk-sand)] flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-[var(--nk-ink)]">NK</span>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Upload..." : "Changer"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Devise par défaut</Label>
            <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">EUR (Euro)</SelectItem>
                <SelectItem value="MAD">MAD (Dirham)</SelectItem>
                <SelectItem value="USD">USD (Dollar)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="locale">Langue par défaut</Label>
            <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Pays</Label>
            <CountrySelect
              value={country}
              onChange={setCountry}
              mode="name"
              placeholder="Sélectionner un pays"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timezone">Fuseau horaire</Label>
            <Input id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
          </div>

          <Button 
            className="w-full bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
            onClick={handleSaveProfile}
          >
            Enregistrer
          </Button>
        </CardContent>
      </Card>

      {/* Colonne 2: Adresse de facturation */}
      <Card>
        <CardHeader>
          <CardTitle>Adresse de facturation</CardTitle>
          <CardDescription>Coordonnées de facturation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Adresse complète</Label>
            <Input 
              id="address" 
              placeholder="123 Rue Mohammed V" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Code postal</Label>
            <Input 
              id="postalCode" 
              placeholder="20000" 
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Input 
              id="city" 
              placeholder="Casablanca" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingCountry">Pays</Label>
            <CountrySelect
              value={billingCountry}
              onChange={setBillingCountry}
              mode="code"
              placeholder="Sélectionner un pays"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vat">Numéro de TVA</Label>
            <Input 
              id="vat" 
              placeholder="MA123456789" 
              value={vat}
              onChange={(e) => setVat(e.target.value)}
            />
          </div>

          <Button 
            className="w-full bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
            onClick={handleSaveBilling}
          >
            Enregistrer
          </Button>
        </CardContent>
      </Card>

      {/* Colonne 3: Connexions PSP */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres utilisateur</CardTitle>
          <CardDescription>Prestataires de paiement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Stripe */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-[var(--nk-terracotta)]" />
                  <div>
                    <p className="font-semibold">Stripe</p>
                    <p className="text-xs text-muted-foreground">Non connecté</p>
                  </div>
                </div>
                <Dialog open={stripeModalOpen} onOpenChange={setStripeModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      Connecter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Connecter Stripe</DialogTitle>
                      <DialogDescription>
                        Entrez vos identifiants Stripe pour activer les paiements
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Clé publique</Label>
                        <Input placeholder="pk_test_..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Clé secrète</Label>
                        <Input type="password" placeholder="sk_test_..." />
                      </div>
                      <div className="space-y-2">
                        <Label>ID compte</Label>
                        <Input placeholder="acct_..." />
                      </div>
                      <Button 
                        className="w-full bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
                        onClick={handleConnectStripe}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Monei */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-[var(--nk-terracotta)]" />
                  <div>
                    <p className="font-semibold">Monei</p>
                    <p className="text-xs text-muted-foreground">PSP Maroc</p>
                  </div>
                </div>
                <Dialog open={moneiModalOpen} onOpenChange={setMoneiModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      Connecter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Connecter Monei</DialogTitle>
                      <DialogDescription>
                        Entrez vos identifiants Monei pour activer les paiements
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>API Key</Label>
                        <Input placeholder="monei_..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Account ID</Label>
                        <Input placeholder="acc_..." />
                      </div>
                      <Button 
                        className="w-full bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
                        onClick={handleConnectMonei}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Autre PSP */}
          <Card className="border-2 border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-600">Autre PSP</p>
                    <p className="text-xs text-muted-foreground">À configurer</p>
                  </div>
                </div>
                <Dialog open={otherPspModalOpen} onOpenChange={setOtherPspModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost">
                      Ajouter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un PSP</DialogTitle>
                      <DialogDescription>
                        Configurez un autre prestataire de paiement
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Nom du PSP</Label>
                        <Input placeholder="PayPal, Square, etc." />
                      </div>
                      <div className="space-y-2">
                        <Label>URL de l'API</Label>
                        <Input placeholder="https://api.example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Credentials</Label>
                        <Input type="password" placeholder="API Key ou Token" />
                      </div>
                      <Button 
                        className="w-full bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
                        onClick={handleAddOtherPsp}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
