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
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function TaskNew() {
  const [formData, setFormData] = useState({
    propertyId: "",
    taskType: "",
    scheduledDate: "",
    assignedTo: "",
    priority: "medium",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la création avec Supabase
    toast.success("Tâche créée (mock)");
    console.log("Nouvelle tâche:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayoutNew title="Nouvelle tâche">
      <div className="space-y-4">
        <Link href="/tasks">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux tâches
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Informations de la tâche</CardTitle>
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

              {/* Type de tâche */}
              <div className="space-y-2">
                <Label htmlFor="taskType">Type de tâche *</Label>
                <Select
                  value={formData.taskType}
                  onValueChange={(value) => handleChange("taskType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleaning">Ménage</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="checkin">Check-in</SelectItem>
                    <SelectItem value="checkout">Check-out</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="owner">Propriétaire</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date et personne assignée */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Date prévue *</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleChange("scheduledDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigné à</Label>
                  <Select
                    value={formData.assignedTo}
                    onValueChange={(value) => handleChange("assignedTo", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une personne" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Propriétaires */}
                      <SelectItem value="owner-1">Mohamed Sobhy (Propriétaire)</SelectItem>
                      <SelectItem value="owner-2">Sarah El Amrani (Propriétaire)</SelectItem>
                      {/* Équipe opérationnelle */}
                      <SelectItem value="1">Fatima (Ménage)</SelectItem>
                      <SelectItem value="2">Ahmed (Maintenance)</SelectItem>
                      <SelectItem value="3">Karim (Accueil)</SelectItem>
                      <SelectItem value="unassigned">Non assigné</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Priorité */}
              <div className="space-y-2">
                <Label htmlFor="priority">Priorité</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleChange("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basse</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Détails de la tâche..."
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button type="submit" className="bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]">
                  Créer la tâche
                </Button>
                <Link href="/tasks">
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
