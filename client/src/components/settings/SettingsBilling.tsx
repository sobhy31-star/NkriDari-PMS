import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSettings } from "@/contexts/AppSettingsContext";

export function SettingsBilling() {
  const { currency } = useAppSettings();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conditions de facturation</CardTitle>
          <CardDescription>Configuration de votre modèle de facturation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billingMode">Mode de facturation</Label>
            <Select defaultValue="percentage">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Pourcentage sur réservation</SelectItem>
                <SelectItem value="fixed">Forfait mensuel</SelectItem>
                <SelectItem value="mixed">Mixte (forfait + %)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="percentage">Pourcentage (%)</Label>
              <Input id="percentage" type="number" placeholder="15" defaultValue="15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fixedFee">Forfait mensuel ({currency})</Label>
              <Input id="fixedFee" type="number" placeholder="500" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoiceFrequency">Fréquence de facturation</Label>
            <Select defaultValue="monthly">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
                <SelectItem value="monthly">Mensuelle</SelectItem>
                <SelectItem value="quarterly">Trimestrielle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coordonnées bancaires</CardTitle>
          <CardDescription>Pour recevoir vos paiements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">Nom de la banque</Label>
            <Input id="bankName" placeholder="Attijariwafa Bank" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iban">IBAN</Label>
            <Input id="iban" placeholder="MA00 0000 0000 0000 0000 0000 000" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bic">BIC / SWIFT</Label>
            <Input id="bic" placeholder="BCMAMAMC" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountHolder">Titulaire du compte</Label>
            <Input id="accountHolder" placeholder="NkriDari SARL" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adresse de facturation</CardTitle>
          <CardDescription>Adresse pour vos factures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billingAddress">Adresse complète</Label>
            <Input id="billingAddress" placeholder="123 Rue Mohammed V" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="billingPostalCode">Code postal</Label>
              <Input id="billingPostalCode" placeholder="20000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingCity">Ville</Label>
              <Input id="billingCity" placeholder="Casablanca" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingCountry">Pays</Label>
            <Input id="billingCountry" placeholder="Maroc" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingVat">Numéro de TVA</Label>
            <Input id="billingVat" placeholder="MA123456789" />
          </div>

          <Button className="w-full bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]">
            Enregistrer les informations
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
