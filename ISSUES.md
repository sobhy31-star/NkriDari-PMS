# ISSUES — Audit & Priorisation (Phase 2)

Dernière mise à jour : 2025-12-29  
Périmètre : **analyse uniquement** (aucun correctif).  
Sources : code frontend exporté Manus (repo), + docs Phase 1 **validées** (`INVENTORY.md`, `SUPABASE_MAP.md`, `N8N_WORKFLOWS.md`, `USER_FLOWS.md`).

---

## 🔴 P0 — Bloquants bêta

### P0-01 — Auth incohérente (Supabase Auth vs Manus OAuth / tRPC) → redirections et états utilisateur cassés
- **Description précise** : Le frontend mélange deux systèmes d’authentification :
  - login Supabase email/password via `/login` (`pages/Login.tsx`, `hooks/useSupabaseAuth.ts`)
  - legacy Manus OAuth / session cookie + tRPC auth (`client/src/_core/hooks/useAuth.ts`, `server/_core/oauth.ts`, `client/src/const.ts`).
  De plus, la redirection “unauthorized” dans `client/src/main.tsx` renvoie vers `getLoginUrl()` (Manus OAuth) et non `/login`.
- **Zone impactée** : Frontend (Manus → GitHub) + Backend (server legacy) + Supabase (indirect)
- **Cause probable** : migration incomplète entre Manus OAuth/tRPC et Supabase Auth (coexistence des deux couches).
- **Impact utilisateur** : boucles de login, redirections vers un mauvais écran, infos utilisateur incohérentes selon la page/composant.
- **Risque si non corrigé** : impossibilité d’accéder de façon fiable au produit en bêta (blocage onboarding) + comportements “fantômes”.
- **Estimation d’effort** : **M**

### P0-02 — Onboarding cassé : signup Supabase ne provisionne pas le `tenant_id`
- **Description précise** : la création de compte (`signUp`) existe (`pages/Login.tsx`) mais il n’y a **aucun flux** qui assigne `user_metadata.tenant_id`. Or `useSupabase()` dépend de `user.user_metadata.tenant_id` pour toutes les opérations multi-tenant.
- **Zone impactée** : Frontend + Supabase
- **Cause probable** : absence de “post-signup provisioning” (trigger DB, edge function, ou UI admin).
- **Impact utilisateur** : un nouveau compte ne peut pas utiliser les modules (tenantId null → écrans vides / erreurs RLS).
- **Risque si non corrigé** : bêta inutilisable hors comptes pré-provisionnés.
- **Estimation d’effort** : **M**

### P0-03 — Protection des routes insuffisante (accès aux pages sans session Supabase)
- **Description précise** : `client/src/App.tsx` ne protège pas les routes “app”. La redirection vers login n’est pas centralisée (seulement sur erreurs tRPC dans `main.tsx`, alors que la majorité des pages requêtent Supabase directement).
- **Zone impactée** : Frontend
- **Cause probable** : garde de route non implémentée / héritage tRPC.
- **Impact utilisateur** : navigation possible sans être connecté, puis écrans incomplets/erreurs → UX cassée.
- **Risque si non corrigé** : perception “produit instable” + support élevé.
- **Estimation d’effort** : **S**

### P0-04 — Module Réservations non branché Supabase (données mock / vide en prod)
- **Description précise** : `pages/Reservations.tsx` utilise `mockReservations` en mode preview, sinon tableau vide (pas de `.from('reservations')`).
- **Zone impactée** : Frontend + Supabase
- **Cause probable** : implémentation DB non réalisée (placeholder).
- **Impact utilisateur** : impossibilité de gérer/consulter les réservations en production.
- **Risque si non corrigé** : bêta non fonctionnelle (module central PMS).
- **Estimation d’effort** : **M**

### P0-05 — Création Réservation non fonctionnelle (bouton “Créer la réservation” = mock)
- **Description précise** : `pages/ReservationNew.tsx` affiche un formulaire mais `handleSubmit` fait `toast.success("Réservation créée (mock)")` et ne persiste rien.
- **Zone impactée** : Frontend + Supabase
- **Cause probable** : CRUD Supabase non implémenté.
- **Impact utilisateur** : création impossible → blocage opérationnel.
- **Risque si non corrigé** : bêta bloquée dès la première utilisation “réservation”.
- **Estimation d’effort** : **M**

### P0-06 — Module Tâches non branché Supabase (liste + création = mock)
- **Description précise** :
  - `pages/Tasks.tsx` : placeholder (pas de requêtes).
  - `pages/TaskNew.tsx` : `toast.success("Tâche créée (mock)")` sans persistance.
- **Zone impactée** : Frontend + Supabase
- **Cause probable** : CRUD Supabase non implémenté.
- **Impact utilisateur** : tâches opérationnelles indisponibles.
- **Risque si non corrigé** : bêta non viable pour conciergerie.
- **Estimation d’effort** : **M**

### P0-07 — Fiche propriété non persistante (bouton “Enregistrer” sans effet)
- **Description précise** : `pages/PropertyDetail.tsx` est majoritairement mock (`// TODO: Charger depuis Supabase`) et `handleSave()` fait juste un toast “Modifications enregistrées”.
- **Zone impactée** : Frontend + Supabase
- **Cause probable** : page de détail créée avant modélisation DB complète.
- **Impact utilisateur** : l’écran “Gérer” donne l’illusion de modifier, mais rien n’est sauvegardé.
- **Risque si non corrigé** : perte de confiance + données incohérentes (user pense que c’est enregistré).
- **Estimation d’effort** : **M**

### P0-08 — Incohérences Supabase/RLS/schéma pouvant casser l’accès aux données (risque de blocage + sécurité)
- **Description précise** : `SUPABASE_MAP.md` identifie des divergences :
  - plusieurs fonctions/patterns pour le tenant (`public.get_user_tenant_id()` vs `auth.get_user_tenant_id()` vs JWT direct),
  - scripts RLS ciblant `tasks` **et** `taches`, `tenants` **et** `conciergeries`,
  - table `utilisateurs` présente dans les types mais supprimée par migration.
  Si l’environnement Supabase ne correspond pas exactement, les policies peuvent refuser l’accès ou s’appliquer sur de mauvaises tables.
- **Zone impactée** : Supabase
- **Cause probable** : migrations successives non consolidées + coexistence d’anciens schémas.
- **Impact utilisateur** : erreurs 401/403/“infinite recursion”/données invisibles, ou au contraire policies trop permissives selon le cas.
- **Risque si non corrigé** : blocage bêta + risque de fuite inter-tenant.
- **Estimation d’effort** : **L**

---

## 🟠 P1 — Dégradation forte (bêta possible mais mauvaise expérience / zones critiques “incomplètes”)

### P1-01 — `/settings` route sur une page “maquette” (beaucoup de champs désactivés) alors qu’une version plus complète existe
- **Description précise** : la route `/settings` pointe sur `pages/Settings.tsx` (maquettes, inputs `disabled`, nombreux `toast.info("bientôt")`), tandis que `pages/SettingsNew.tsx` (avec sous-composants `components/settings/*`) n’est pas routée.
- **Zone impactée** : Frontend
- **Cause probable** : migration UI inachevée / routage non mis à jour.
- **Impact utilisateur** : onglets Paramètres peu utiles, confusion, impossibilité de configurer des éléments attendus.
- **Risque si non corrigé** : support élevé, churn en bêta, “boutons inactifs”.
- **Estimation d’effort** : **S**

### P1-02 — “Services connectés” : configuration stockée en localStorage au lieu de Supabase (`service_settings`)
- **Description précise** : `SettingsServices.tsx` persiste dans `localStorage` (`service_configs`) et non dans la table Supabase prévue (`service_settings`).
- **Zone impactée** : Frontend + Supabase
- **Cause probable** : table/mapping existant mais intégration non faite.
- **Impact utilisateur** : perte de config (multi-device, logout, navigateurs), pas de centralisation.
- **Risque si non corrigé** : instabilité de configuration + incapacité à auditer côté backend.
- **Estimation d’effort** : **M**

### P1-03 — “Plateformes” : données mock côté UI, non persistées, non alignées avec `ota_connections`
- **Description précise** : `SettingsPlatforms.tsx` gère une liste `platforms` en state (hardcodée + ajout local) sans persistance Supabase, alors qu’une table `ota_connections` est prévue.
- **Zone impactée** : Frontend + Supabase
- **Cause probable** : flux “connecter une plateforme” non finalisé.
- **Impact utilisateur** : connexions non fiables, pas de source de vérité.
- **Risque si non corrigé** : blocage des intégrations / confusion sur statut “Connecté API”.
- **Estimation d’effort** : **M**

### P1-04 — SU-API : stubs qui lèvent “Not implemented” (risque de crash si branchés)
- **Description précise** : `client/src/lib/suApiClient.ts` contient des fonctions exportées (`connectChannelAccount`, `syncListings`, etc.) qui `throw new Error("Not implemented yet")`.
- **Zone impactée** : Frontend
- **Cause probable** : stubs préparatoires laissés en prod.
- **Impact utilisateur** : si un écran commence à appeler ces fonctions, crash immédiat.
- **Risque si non corrigé** : régressions dès activation partielle.
- **Estimation d’effort** : **S**

### P1-05 — Upload logo (Supabase Storage) fragile : dépend de policies bucket `public` non documentées
- **Description précise** : `SettingsProfile.tsx` upload dans le bucket `public` puis récupère une URL publique. Les policies storage ne sont pas dans le repo (à auditer côté Supabase).
- **Zone impactée** : Frontend + Supabase Storage
- **Cause probable** : policies Storage non alignées (ou bucket absent).
- **Impact utilisateur** : bouton “Changer” peut échouer (403) ou exposer plus que prévu.
- **Risque si non corrigé** : fonctionnalité profil instable + risque sécurité (si bucket trop ouvert).
- **Estimation d’effort** : **S**

### P1-06 — Données “preview/mock” utilisées dans des pages clés (Dashboard, Calendar, Reservations)
- **Description précise** : `lib/mockData.ts`, `lib/mockReservations.ts`, `components/MultiCalendar.tsx` alimentent l’UI en données mock selon `isPreviewMode()` (inclut `import.meta.env.DEV`).
- **Zone impactée** : Frontend
- **Cause probable** : mode preview Manus réutilisé pour dev/prod sans séparation stricte.
- **Impact utilisateur** : indicateurs/graphes non fiables, confusion “données réelles vs démo”.
- **Risque si non corrigé** : perte de confiance sur KPI.
- **Estimation d’effort** : **M**

### P1-07 — Duplication/chevauchement de providers et de hooks (risque d’états incohérents)
- **Description précise** : `AppSettingsProvider` est monté dans `App.tsx` et aussi dans `main.tsx`. En parallèle, il existe deux `useAuth` différents (`hooks/useAuth.ts` Supabase vs `_core/hooks/useAuth.ts` tRPC).
- **Zone impactée** : Frontend
- **Cause probable** : migration progressive sans suppression des anciens wrappers.
- **Impact utilisateur** : préférences devise/langue ou état user qui ne se propagent pas comme attendu selon la branche de rendu.
- **Risque si non corrigé** : bugs intermittents difficiles à reproduire.
- **Estimation d’effort** : **M**

### P1-08 — n8n : impossibilité d’auditer depuis le repo (pas d’exports, pas de statut)
- **Description précise** : `N8N_WORKFLOWS.md` indique que les workflows ne sont pas versionnés dans ce repo ; donc aucun contrôle possible (actifs, erreurs, retries, idempotence) depuis GitHub.
- **Zone impactée** : n8n
- **Cause probable** : gouvernance “ops” séparée du code.
- **Impact utilisateur** : intégrations/automations peuvent être cassées sans visibilité côté dev.
- **Risque si non corrigé** : incidents silencieux en bêta.
- **Estimation d’effort** : **S** (pour auditer / documenter), **M** (si corrections nécessaires côté n8n)

---

## 🟡 P2 — Post-bêta (améliorations, dette technique, nettoyage à auditer)

### P2-01 — Présence de pages/composants “legacy” et fichiers `.backup` (risque de confusion)
- **Description précise** : existence de doublons/anciens écrans (`pages/Properties.tsx`, `pages/Reservations.tsx.backup`, `pages/PropertyDetail.tsx.backup`, etc.) non utilisés par le routeur actuel.
- **Zone impactée** : Frontend
- **Cause probable** : itérations rapides export Manus sans purge.
- **Impact utilisateur** : indirect (surtout coût maintenance / confusion dev).
- **Risque si non corrigé** : erreurs de maintenance, mauvais import, régressions.
- **Estimation d’effort** : **S**

### P2-02 — Backend “server” garde OAuth + Drizzle MySQL (probable legacy) alors que le produit vise Supabase
- **Description précise** : `server/_core/oauth.ts` + `server/db.ts` (Drizzle dialect MySQL) persistent, alors que le frontend consomme principalement Supabase direct.
- **Zone impactée** : Backend (repo)
- **Cause probable** : ancien socle Manus OAuth / DB MySQL non supprimé.
- **Impact utilisateur** : faible si non utilisé, mais augmente surface d’attaque et complexité.
- **Risque si non corrigé** : dette technique + risques d’incompréhension / config.
- **Estimation d’effort** : **M**

### P2-03 — i18n/UX : textes encore “en dur” et incohérences mineures
- **Description précise** : certaines chaînes restent en FR (ex: “Mois précédent” dans `Reservations.tsx`, diverses descriptions), et certains écrans ont des labels non uniformisés.
- **Zone impactée** : Frontend
- **Cause probable** : migration i18n incomplète.
- **Impact utilisateur** : qualité perçue, pas bloquant.
- **Risque si non corrigé** : expérience moins “pro”.
- **Estimation d’effort** : **S**

### P2-04 — Observabilité : logs console dispersés, pas de tracking d’erreurs central
- **Description précise** : nombreuses `console.error`/`console.warn` sans canal d’observabilité centralisé (front).
- **Zone impactée** : Frontend
- **Cause probable** : absence d’outil de monitoring (Sentry, etc.) dans le scope.
- **Impact utilisateur** : indirect (diagnostic plus lent).
- **Risque si non corrigé** : investigations coûteuses pendant la bêta.
- **Estimation d’effort** : **M**

