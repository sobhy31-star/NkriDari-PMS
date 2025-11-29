import * as React from "react";
import DashboardLayoutNew from "@/components/DashboardLayoutNew";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/i18n/useTranslation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type SettingsTab =
  | "profile"
  | "services"
  | "platforms"
  | "website"
  | "billing"
  | "team";

export default function Settings() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [subTab, setSubTab] = React.useState<SettingsTab>("profile");

  const teamMembers = [
    {
      name: "Mohamed Sobhy",
      role: "Owner / Admin",
      email: "test@nkridari.com",
      status: "Actif",
    },
    {
      name: "Sara",
      role: "Guest relations",
      email: "sara@example.com",
      status: "Actif",
    },
    {
      name: "Youssef",
      role: "Housekeeping manager",
      email: "youssef@example.com",
      status: "En pause",
    },
  ];

  return (
    <DashboardLayoutNew title={t("pages", "settings")}>
      <div className="space-y-6 pt-4">

        {/* ------------------------------ NAVIGATION BAR ------------------------------ */}
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-between rounded-xl bg-[#1E3D3D] px-10 py-3">

            <Button variant="nav" data-active={subTab === "profile"} onClick={() => setSubTab("profile")}>
              Profil
            </Button>

            <Button variant="nav" data-active={subTab === "services"} onClick={() => setSubTab("services")}>
              Services
            </Button>

            <Button variant="nav" data-active={subTab === "platforms"} onClick={() => setSubTab("platforms")}>
              Plateformes
            </Button>

            <Button variant="nav" data-active={subTab === "website"} onClick={() => setSubTab("website")}>
              Website
            </Button>

            <Button variant="nav" data-active={subTab === "billing"} onClick={() => setSubTab("billing")}>
              Facturation
            </Button>

            <Button variant="nav" data-active={subTab === "team"} onClick={() => setSubTab("team")}>
              Équipe
            </Button>

          </div>
        </div>

        {/* ------------------------------ PROFIL ------------------------------ */}
        {subTab === "profile" && (
          <div className="grid gap-6 lg:grid-cols-[2fr_2fr_1.5fr]">

            {/* Profil utilisateur */}
            <Card>
              <CardHeader>
                <CardTitle>Profil utilisateur</CardTitle>
                <CardDescription>Informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Prénom</Label>
                  <Input value={user?.name?.split(" ")[0] || "Mohamed"} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input value={user?.name?.split(" ")[1] || "Sobhy"} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email || "test@nkridari.com"} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input value="+212 6 12 34 56 78" disabled />
                </div>
              </CardContent>
            </Card>

            {/* Adresse de facturation */}
            <Card>
              <CardHeader>
                <CardTitle>Adresse de facturation</CardTitle>
                <CardDescription>Coordonnées utilisées pour les reçus.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Adresse complète</Label>
                  <Input value="123 Rue Mohammed V" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Code postal</Label>
                  <Input value="20000" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Input value="Casablanca" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Pays</Label>
                  <Input value="Maroc" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Numéro de TVA</Label>
                  <Input value="MA123456789" disabled />
                </div>
              </CardContent>
            </Card>

            {/* Prestataires de paiement */}
            <Card>
              <CardHeader>
                <CardTitle>Prestataires de paiement</CardTitle>
                <CardDescription>Encaissement cartes en ligne.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">

                {/* Stripe */}
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <div className="font-semibold">Stripe</div>
                      <div className="text-xs text-muted-foreground">Non connecté</div>
                    </div>
                    <Button variant="secondary" onClick={() => toast.info("Stripe : à configurer bientôt")}>
                      Connecter
                    </Button>
                  </CardContent>
                </Card>

                {/* Monei */}
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <div className="font-semibold">Monei</div>
                      <div className="text-xs text-muted-foreground">PSP Maroc</div>
                    </div>
                    <Button variant="secondary" onClick={() => toast.info("Monei : à configurer bientôt")}>
                      Connecter
                    </Button>
                  </CardContent>
                </Card>

                {/* Autre */}
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <div className="font-semibold">Autre PSP</div>
                      <div className="text-xs text-muted-foreground">Ajouter un prestataire</div>
                    </div>
                    <Button variant="secondary" onClick={() => toast.info("Ajout d’un PSP : bientôt")}>
                      Ajouter
                    </Button>
                  </CardContent>
                </Card>

              </CardContent>
            </Card>

          </div>
        )}

        {/* ------------------------------ SERVICES ------------------------------ */}
        {subTab === "services" && (
          <div className="grid gap-6 lg:grid-cols-[2fr_1.5fr]">

            <Card>
              <CardHeader>
                <CardTitle>Catalogue des services</CardTitle>
                <CardDescription>Prestations facturables.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm">Tu pourras définir :</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Types de services (ménage, transferts…)</li>
                  <li>Prix (par séjour, par nuit, par invité…)</li>
                  <li>Durée estimée & équipe assignée</li>
                  <li>Étape : avant, pendant, après séjour</li>
                </ul>

                <Button
                  variant="default"
                  onClick={() => toast.info("Création d’un service (bientôt)")}
                >
                  Ajouter un type de service
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exemples</CardTitle>
                <CardDescription>Idées de configuration.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 text-sm">
                <ul className="space-y-2">
                  <li>Ménage standard – 250 MAD</li>
                  <li>Ménage départ tardif – 150 MAD</li>
                  <li>Blanchisserie au kilo</li>
                  <li>Transfert aéroport – jour/nuit</li>
                </ul>
              </CardContent>
            </Card>

          </div>
        )}

        {/* ------------------------------ PLATEFORMES ------------------------------ */}
        {subTab === "platforms" && (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">

            {[
              {
                name: "Airbnb",
                status: "Non connecté",
                desc: "Connexion channel manager Airbnb.",
              },
              {
                name: "Booking.com",
                status: "Non connecté",
                desc: "Synchronisation complète avec ton extranet.",
              },
              {
                name: "Vrbo / Abritel",
                status: "À venir",
                desc: "Disponible en V2.",
              },
              {
                name: "Site direct",
                status: "Bientôt",
                desc: "Ton site de réservation connectable.",
              },
            ].map((p) => (
              <Card key={p.name} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>{p.desc}</CardDescription>
                </CardHeader>

                <CardContent className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Statut : {p.status}</span>
                  <Button variant="secondary" onClick={() => toast.info(`${p.name} : fonctionnalité à venir`)}>
                    Configurer
                  </Button>
                </CardContent>
              </Card>
            ))}

          </div>
        )}

        {/* ------------------------------ WEBSITE ------------------------------ */}
        {subTab === "website" && (
          <div className="grid gap-6 lg:grid-cols-[2fr_1.5fr]">

            <Card>
              <CardHeader>
                <CardTitle>Site de réservation NkriDari</CardTitle>
                <CardDescription>Maquette du site direct.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>Nom du site</Label>
                  <Input value="NkriDari – Conciergerie" disabled />
                </div>

                <div>
                  <Label>Domaine</Label>
                  <Input value="https://nkridari.com" disabled />
                </div>

                <div>
                  <Label>Mode de réservation</Label>
                  <Input value="Demande de réservation (paiement V2)" disabled />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prochaine étape</CardTitle>
                <CardDescription>Connexion moteur de réservation.</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Calendrier automatique</li>
                  <li>Tarifs dynamiques</li>
                  <li>Formulaire sécurisé</li>
                  <li>Page propriétaire</li>
                </ul>
              </CardContent>
            </Card>

          </div>
        )}

        {/* ------------------------------ FACTURATION ------------------------------ */}
        {subTab === "billing" && (
          <div className="grid gap-6 lg:grid-cols-[2fr_1.5fr]">

            <Card>
              <CardHeader>
                <CardTitle>Préférences de facturation</CardTitle>
                <CardDescription>Règles appliquées sur les factures.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Format numérotation</Label>
                  <Input value="NKRI-{année}-{compteur}" disabled />
                </div>
                <div>
                  <Label>Délai de paiement</Label>
                  <Input value="7 jours après émission" disabled />
                </div>
                <div>
                  <Label>TVA par défaut</Label>
                  <Input value="20%" disabled />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types de factures</CardTitle>
              </CardHeader>

              <CardContent className="text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Factures propriétaires</li>
                  <li>Factures voyageurs</li>
                  <li>Notes de débit / crédit</li>
                </ul>
              </CardContent>
            </Card>

          </div>
        )}

        {/* ------------------------------ ÉQUIPE ------------------------------ */}
        {subTab === "team" && (
          <div className="grid gap-6 lg:grid-cols-[2fr_1.5fr]">

            <Card>
              <CardHeader>
                <CardTitle>Équipe NkriDari</CardTitle>
                <CardDescription>Gestion des accès (maquette).</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="border rounded-xl divide-y">
                  {teamMembers.map((m) => (
                    <div key={m.email} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <div className="font-semibold">{m.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {m.role} • {m.email}
                        </div>
                      </div>

                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="default"
                  onClick={() => toast.info("Ajout membre équipe (V2)")}
                >
                  Ajouter un membre
                </Button>

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rôles prévus</CardTitle>
                <CardDescription>Permissions multi-conciergeries.</CardDescription>
              </CardHeader>

              <CardContent className="text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Admin : configuration globale, factures</li>
                  <li>Manager conciergerie : propriétés, planning</li>
                  <li>Housekeeping : tâches, stocks</li>
                  <li>Comptable : factures, reporting</li>
                </ul>
              </CardContent>
            </Card>

          </div>
        )}

      </div>
    </DashboardLayoutNew>
  );
}
