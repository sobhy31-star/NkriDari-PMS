import DashboardLayoutNew from "@/components/DashboardLayoutNew";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Building2, Eye } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useState } from "react";
import { useLocation } from "wouter";
import type { Property } from "@shared/supabase.types";
import { useTranslation } from "@/i18n/useTranslation";

export default function PropertiesComplete() {
  const { properties, loading, createProperty, updateProperty, deleteProperty } = useProperties();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    capacity: "",
    status: "active" as "active" | "inactive" | "archived",
    platform: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProperty({
        title: formData.title,
        city: formData.city || null,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        status: formData.status,
        platform: formData.platform || null,
      });
      setIsCreateOpen(false);
      setFormData({
        title: "",
        city: "",
        capacity: "",
        status: "active",
        platform: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    try {
      await updateProperty(editingProperty.id, {
        title: formData.title,
        city: formData.city || null,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        status: formData.status,
        platform: formData.platform || null,
      });
      setIsEditOpen(false);
      setEditingProperty(null);
    } catch (error) {
      console.error(error);
    }
  };

  const openEditDialog = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      city: property.city || "",
      capacity: property.capacity?.toString() || "",
      status: property.status,
      platform: property.platform || "",
    });
    setIsEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm(t('properties', 'confirmArchive'))) {
      await deleteProperty(id);
    }
  };

  const getStatusBadge = (property: Property) => {
    const isActive = property.status === "active";
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const newStatus = isActive ? "inactive" : "active";
          updateProperty(property.id, { status: newStatus });
        }}
      >
        <Badge
          variant={isActive ? "default" : "secondary"}
          className={isActive ? "bg-[var(--nk-success)] text-white" : "bg-gray-400 text-white"}
        >
          {isActive ? t('properties', 'active') : t('properties', 'hidden')}
        </Badge>
      </Button>
    );
  };

  return (
    <DashboardLayoutNew title={t('pages', 'properties')}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{t('properties', 'list')}</h3>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t('properties', 'newProperty')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreate}>
                <DialogHeader>
                  <DialogTitle>{t('properties', 'createProperty')}</DialogTitle>
                  <DialogDescription>
                    Ajoutez une nouvelle propriété à votre portefeuille
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Nom de la propriété *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacité (personnes)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="platform">Plateforme</Label>
                    <Input
                      id="platform"
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      placeholder="Airbnb, Booking.com, etc."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Créer</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Propriétés ({properties.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : properties.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucune propriété pour le moment
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>Capacité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Plateforme</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.title}</TableCell>
                      <TableCell>{property.city || "-"}</TableCell>
                      <TableCell>{property.capacity || "-"}</TableCell>
                      <TableCell>{getStatusBadge(property)}</TableCell>
                      <TableCell>{property.platform || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* Bouton Gérer - ouvre la fiche */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLocation(`/properties/${property.id}`)}
                            className="gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            Gérer
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(property)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <form onSubmit={handleEdit}>
              <DialogHeader>
                <DialogTitle>Modifier la propriété</DialogTitle>
                <DialogDescription>
                  Modifiez les informations de la propriété
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Nom de la propriété *</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-city">Ville</Label>
                  <Input
                    id="edit-city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-capacity">Capacité (personnes)</Label>
                  <Input
                    id="edit-capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-platform">Plateforme</Label>
                  <Input
                    id="edit-platform"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    placeholder="Airbnb, Booking.com, etc."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Enregistrer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayoutNew>
  );
}
