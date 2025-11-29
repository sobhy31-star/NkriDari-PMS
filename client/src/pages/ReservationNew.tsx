import DashboardLayoutNew from "@/components/DashboardLayoutNew";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/PhoneInput";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useAppSettings, Currency } from "@/contexts/AppSettingsContext";

export default function ReservationNew() {
  const { currency: defaultCurrency } = useAppSettings();
  
  const [formData, setFormData] = useState({
    propertyId: "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: "",
    checkOut: "",
    channel: "",
    totalPrice: "",
    currency: defaultCurrency,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la création avec Supabase
    toast.success("Réservation créée (mock)");
    console.log("Nouvelle réservation:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayoutNew title="Nouvelle réservation">
      <div className="space-y-4">
        <Link href="/reservations">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux réservations
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Informations de la réservation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Propriété */}
              <div className="space-y-2">
                <Label htmlFor="property">Propriété *</Label>
                <Select
                  value={formData.propertyId}
                  onValueChange={(value) => handleChange("propertyId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une propriété" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Villa Marrakech</SelectItem>
                    <SelectItem value="2">Riad Fès</SelectItem>
                    <SelectItem value="3">Appartement Casablanca</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Informations client */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="guestName">Nom du client *</Label>
                  <Input
                    id="guestName"
                    value={formData.guestName}
                    onChange={(e) => handleChange("guestName", e.target.value)}
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestEmail">Email</Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={formData.guestEmail}
                    onChange={(e) => handleChange("guestEmail", e.target.value)}
                    placeholder="jean@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestPhone">Téléphone</Label>
                <PhoneInput
                  value={formData.guestPhone}
                  onChange={(value) => handleChange("guestPhone", value)}
                  defaultCountryCode="MA"
                  placeholder="6 12 34 56 78"
                />
              </div>

              {/* Dates */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Date d'arrivée *</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => handleChange("checkIn", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Date de départ *</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => handleChange("checkOut", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Canal et prix */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="channel">Canal de réservation *</Label>
                  <Select
                    value={formData.channel}
                    onValueChange={(value) => handleChange("channel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un canal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="airbnb">Airbnb</SelectItem>
                      <SelectItem value="booking">Booking.com</SelectItem>
                      <SelectItem value="vrbo">VRBO</SelectItem>
                      <SelectItem value="direct">Direct</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalPrice">Prix total</Label>
                  <div className="flex gap-2">
                    <Input
                      id="totalPrice"
                      type="number"
                      value={formData.totalPrice}
                      onChange={(e) => handleChange("totalPrice", e.target.value)}
                      placeholder="1500"
                      className="flex-1"
                    />
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => handleChange("currency", value)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="MAD">MAD</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Informations supplémentaires..."
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button type="submit" className="bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]">
                  Créer la réservation
                </Button>
                <Link href="/reservations">
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayoutNew>
  );
}
