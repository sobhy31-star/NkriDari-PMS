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
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "active" | "invited" | "suspended";
  modules: string[];
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mohamed Sobhy",
    role: "Admin conciergerie",
    email: "mohamed@nkridari.com",
    phone: "+212 6 12 34 56 78",
    status: "active",
    modules: ["Dashboard", "Propriétés", "Réservations", "Tâches", "Facturation", "Rapports"],
  },
  {
    id: "2",
    name: "Fatima El Amrani",
    role: "Ménage",
    email: "fatima@nkridari.com",
    phone: "+212 6 23 45 67 89",
    status: "active",
    modules: ["Tâches", "Calendrier"],
  },
  {
    id: "3",
    name: "Ahmed Benali",
    role: "Propriétaire",
    email: "ahmed@example.com",
    phone: "+212 6 34 56 78 90",
    status: "invited",
    modules: ["Dashboard", "Rapports"],
  },
];

const availableModules = [
  "Dashboard",
  "Calendrier / Multicalendrier",
  "Propriétés",
  "Réservations",
  "Tâches",
  "Facturation",
  "Rapports / Analytics",
];

export function SettingsTeam() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  // Filtre actif : 'all' | 'owners' | 'ops'
  const [activeFilter, setActiveFilter] = useState<'all' | 'owners' | 'ops'>('all');

  const toggleModule = (module: string) => {
    setSelectedModules((prev) =>
      prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]
    );
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setSelectedModules(member.modules);
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    // TODO: Implémenter la sauvegarde avec Supabase
    toast.success(`Membre "${editingMember?.name}" mis à jour avec succès !`);
    setIsEditOpen(false);
    setEditingMember(null);
  };

  const handleAddMember = () => {
    // TODO: Implémenter l'ajout avec Supabase
    toast.success("Membre ajouté avec succès !");
    setIsAddOpen(false);
    setSelectedModules([]);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestion de l'équipe</CardTitle>
              <CardDescription>Gérez les membres de votre équipe et leurs accès</CardDescription>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]">
                  <UserPlus className="h-4 w-4" />
                  Ajouter un membre
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Ajouter un membre de l'équipe</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations du nouveau membre et définissez ses accès
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" placeholder="Karim" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" placeholder="Bennani" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin conciergerie</SelectItem>
                        <SelectItem value="owner">Propriétaire</SelectItem>
                        <SelectItem value="cleaning">Ménage</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="accounting">Comptabilité</SelectItem>
                        <SelectItem value="reception">Accueil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="karim@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" placeholder="+212 6 12 34 56 78" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Modules accessibles</Label>
                    <div className="grid gap-3 rounded-lg border p-4">
                      {availableModules.map((module) => (
                        <div key={module} className="flex items-center space-x-2">
                          <Checkbox
                            id={module}
                            checked={selectedModules.includes(module)}
                            onCheckedChange={() => toggleModule(module)}
                          />
                          <label
                            htmlFor={module}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {module}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                    Annuler
                  </Button>
                  <Button 
                    className="bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
                    onClick={handleAddMember}
                  >
                    Ajouter le membre
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtres rapides - fonctionnels */}
          <div className="mb-4 flex gap-2">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
              className={activeFilter === 'all' ? 'bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]' : ''}
            >
              Tous
            </Button>
            <Button
              variant={activeFilter === 'owners' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('owners')}
              className={activeFilter === 'owners' ? 'bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]' : ''}
            >
              Propriétaires
            </Button>
            <Button
              variant={activeFilter === 'ops' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('ops')}
              className={activeFilter === 'ops' ? 'bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]' : ''}
            >
              Équipe opérationnelle
            </Button>
          </div>

          {/* Tableau des membres */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTeamMembers
                .filter((member) => {
                  // Logique de filtrage
                  if (activeFilter === 'all') return true;
                  if (activeFilter === 'owners') return member.role.toLowerCase().includes('propriétaire');
                  // ops = tout sauf propriétaires (ménage, maintenance, opérations, etc.)
                  return !member.role.toLowerCase().includes('propriétaire');
                })
                .map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {member.modules.slice(0, 2).join(", ")}
                      {member.modules.length > 2 && ` +${member.modules.length - 2}`}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === "active" ? "default" : "secondary"}
                      className={
                        member.status === "active"
                          ? "bg-[var(--nk-success)] text-white"
                          : member.status === "invited"
                            ? "bg-[var(--nk-warning)] text-white"
                            : "bg-gray-400 text-white"
                      }
                    >
                      {member.status === "active"
                        ? "Actif"
                        : member.status === "invited"
                          ? "Invité"
                          : "Suspendu"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditMember(member)}
                      >
                        Modifier
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal d'édition */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier un membre de l'équipe</DialogTitle>
            <DialogDescription>
              Modifiez les informations de {editingMember?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="editFirstName">Prénom</Label>
                <Input 
                  id="editFirstName" 
                  defaultValue={editingMember?.name.split(' ')[0]} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLastName">Nom</Label>
                <Input 
                  id="editLastName" 
                  defaultValue={editingMember?.name.split(' ').slice(1).join(' ')} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editRole">Rôle</Label>
              <Select defaultValue={editingMember?.role}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin conciergerie">Admin conciergerie</SelectItem>
                  <SelectItem value="Propriétaire">Propriétaire</SelectItem>
                  <SelectItem value="Ménage">Ménage</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Comptabilité">Comptabilité</SelectItem>
                  <SelectItem value="Accueil">Accueil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="editEmail">Email</Label>
                <Input 
                  id="editEmail" 
                  type="email" 
                  defaultValue={editingMember?.email} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPhone">Téléphone</Label>
                <Input 
                  id="editPhone" 
                  defaultValue={editingMember?.phone} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Modules accessibles</Label>
              <div className="grid gap-3 rounded-lg border p-4">
                {availableModules.map((module) => (
                  <div key={module} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${module}`}
                      checked={selectedModules.includes(module)}
                      onCheckedChange={() => toggleModule(module)}
                    />
                    <label
                      htmlFor={`edit-${module}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {module}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editStatus">Statut</Label>
              <Select defaultValue={editingMember?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="invited">Invité</SelectItem>
                  <SelectItem value="suspended">Suspendu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Annuler
            </Button>
            <Button 
              className="bg-[var(--nk-terracotta)] hover:bg-[var(--nk-terracotta-soft)]"
              onClick={handleSaveEdit}
            >
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
