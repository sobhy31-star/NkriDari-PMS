# N8N_WORKFLOWS — Cartographie des workflows (Phase 1)

Dernière mise à jour : 2025-12-29

## 0) Statut (important)

- **Aucun workflow n8n n’est versionné dans ce dépôt** (aucun export JSON/YAML détecté, aucune définition d’URL/credentials n8n).
- Le dépôt contient seulement des **mentions UI** “Make / n8n” dans `client/src/components/settings/SettingsServices.tsx` et des TODO dans `todo.md`.

Conséquence : cette cartographie ne peut pas lister “tous les workflows actifs” à partir du code. Elle fournit donc :
- ce qu’on sait (absence dans le repo),
- un **template de mapping** à remplir dès qu’on a l’export n8n / accès n8n,
- une liste **hypothétique** des workflows attendus côté produit (à confirmer).

## 1) Où doivent vivre les exports n8n (recommandation repo)

Créer un dossier (quand vous serez prêts à versionner) :
- `ops/n8n/exports/` : exports JSON des workflows
- `ops/n8n/README.md` : conventions (naming, secrets, env vars)

> Ceci n’est pas créé automatiquement en Phase 1, car l’objectif ici est la cartographie sans déplacer l’existant.

## 2) Template de fiche workflow (à appliquer à chaque workflow)

Pour chaque workflow, copier/coller :

```text
Nom :
ID n8n :
Statut (active/inactive/error) :
Trigger (cron/webhook/manual/…):
Entrées (payload / sources) :
Sorties (tables Supabase / API / emails / logs) :
Secrets requis (nom des credentials n8n) :
Gestion d’erreur (retries, dead-letter, alerting) :
Observabilité (logs, traces, notifications) :
Risques (double-exécution, idempotence, RLS, multi-tenant) :
Dernier run OK :
Notes :
```

## 3) Workflows “attendus” (hypothèses à confirmer)

Basé sur les modules UI et scripts DB présents, voici les automatisations typiques attendues :

- **Sync calendriers (iCal)**
  - Trigger : cron (ex: toutes les 15 min / 1h)
  - Rôle : importer réservations → `reservations`
  - Points de vigilance : déduplication, idempotence, fuseaux horaires, collisions.

- **Connecteurs OTA / SU-API**
  - Trigger : webhook (connexion) + cron (sync)
  - Rôle : gérer `ota_connections` (status, erreurs) + synchroniser listings/réservations.

- **Génération de tâches opérationnelles**
  - Trigger : événement “réservation confirmée” (DB/webhook)
  - Rôle : créer `tasks` (ménage, check-in, linge, maintenance).

- **SuperCheckin / check-in online**
  - Trigger : check-in J-1/J-0
  - Rôle : pousser instructions / récupérer devices / valider statuts.

- **Alerting**
  - Trigger : erreurs workflows
  - Rôle : notifier (email/Slack/WhatsApp) + log structuré.

## 4) Actions nécessaires pour compléter la Phase 1 (côté n8n)

Pour terminer la cartographie réellement “exhaustive”, il faut :
- **Exporter la liste des workflows** (actifs + inactifs) depuis n8n
- Pour chaque workflow actif : renseigner le template (section 2)
- Documenter les **credentials** (noms seulement) et les dépendances (Supabase tables, buckets, endpoints externes)

