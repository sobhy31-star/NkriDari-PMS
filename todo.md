# Project TODO - NkriDari Lite PMS

## Phase 1: Configuration de base
- [x] Configurer le schéma de base de données (tenants, properties, reservations, tasks)
- [x] Créer les types TypeScript pour Supabase
- [x] Configurer les variables d'environnement

## Phase 2: Composants UI de base
- [x] Créer le composant DashboardLayout avec sidebar
- [x] Créer le composant Header avec menu utilisateur
- [x] Créer le composant Sidebar avec navigation
- [x] Configurer les couleurs et le thème (charte NkriDari)

## Phase 3: Authentification
- [x] Implémenter la connexion avec Manus OAuth
- [x] Créer la page de login avec design NkriDari
- [x] Gérer la déconnexion
- [x] Protéger les routes authentifiées

## Phase 4: Module Propriétés
- [x] Page liste des propriétés avec filtres
- [x] Page création de propriété
- [x] Page édition de propriété
- [x] Opérations CRUD complètes

## Phase 5: Module Réservations
- [ ] Page liste des réservations avec filtres
- [ ] Page création de réservation
- [ ] Page édition de réservation
- [ ] Vérification des conflits de dates

## Phase 6: Module Tâches
- [ ] Page liste des tâches avec filtres
- [ ] Page création de tâche
- [ ] Page édition de tâche
- [ ] Changement de statut rapide

## Phase 7: Dashboard
- [ ] Calcul KPI réservations du mois
- [ ] Calcul KPI taux d'occupation
- [ ] Calcul KPI revenus du mois
- [ ] Calcul KPI tâches en attente
- [ ] Graphique d'occupation (12 mois)
- [ ] Graphique de revenus (12 mois)
- [ ] Tableau activité récente

## Phase 8: Paramètres
- [ ] Page paramètres du compte
- [ ] Modification du profil utilisateur
- [ ] Affichage des informations tenant

## Phase 9: Tests et documentation
- [ ] Tests des opérations CRUD
- [ ] Documentation d'installation
- [ ] Guide de démarrage
- [ ] Fichier .env.example

## Phase 10: Refonte UI et Layout (Nouvelle demande)
- [x] Implémenter la palette de couleurs NkriDari complète
- [x] Créer le système de design avec tokens de couleurs
- [x] Refaire le composant Sidebar avec mode rétractable (260px → 72px)
- [x] Implémenter le layout global avec sidebar fixe gauche
- [x] Ajouter les transitions fluides sur le sidebar
- [x] Adapter le Header avec nouvelles couleurs
- [x] Mettre à jour tous les boutons avec nk-terracotta
- [x] Adapter tous les composants UI (cards, badges, inputs)
- [x] Implémenter le comportement responsive (overlay mobile)
- [x] Tester le scroll et éviter les double scrollbars

## Phase 11: Améliorations majeures (Nouvelle demande)
- [x] Corriger le comportement du sidebar sur desktop (flex layout au lieu d'overlay)
- [x] Créer le contexte AppSettings (devise + langue)
- [x] Ajouter les sélecteurs Devise (EUR/MAD/USD) et Langue (FR/EN/AR) dans le Dashboard
- [x] Créer la page /reservations/new avec formulaire
- [x] Créer la page /tasks/new avec formulaire
- [x] Refondre la page Paramètres avec onglets principaux (Paramètres / Équipe)
- [x] Créer les sous-onglets dans Paramètres (Profil, Services, Plateformes, Website, Facturation)
- [x] Implémenter l'onglet Équipe avec gestion des membres
- [x] Créer le composant MultiCalendar pour le Dashboard
- [x] Intégrer le multicalendrier avec données mock
- [x] Relier le multicalendrier au sélecteur de devise

## Phase 12: Ajustements ciblés (Nouvelle demande)
- [x] Remplacer les boutons Devise/Langue par des selects (dropdowns)
- [x] Créer un système de traductions basique (FR/EN/AR) pour les labels du Dashboard
- [x] Implémenter la fonction t(key, locale) pour les traductions
- [x] Corriger le layout sidebar desktop (flex au lieu d'overlay)
- [x] Implémenter le filtre du multicalendrier (par propriété)
- [x] Implémenter les filtres de l'équipe (Tous/Propriétaires/Équipe opérationnelle)
- [x] Améliorer la page Propriétés : redirection après création
- [x] Ajouter le toggle Actif/Masqué sur les cartes de propriétés
- [x] Créer la fiche propriété avec 4 onglets (Infos/Services/Plateformes/Website)
- [x] Onglet Infos : formulaire complet de la propriété
- [x] Onglet Services : commission, frais de ménage, check-in, linge
- [x] Onglet Plateformes : PriceMultiplier + connexions OTA
- [x] Onglet Website : URL, widget, code d'intégration
- [x] Ajouter des commentaires dans le code aux endroits importants

## Phase 13: Corrections et améliorations ciblées (Nouvelle demande)

### 1. Sidebar desktop définitif
- [x] Vérifier la structure du layout racine (flex container)
- [x] Ajouter les classes CSS .nk-app-root et .nk-app-main
- [x] S'assurer que le sidebar est en position relative sur desktop (≥1024px)
- [x] Garder le mode overlay uniquement sur mobile (<1024px)
- [x] Tester que le contenu ne disparaît jamais derrière le sidebar sur desktop

### 2. Traductions arabes réelles
- [x] Remplacer toutes les traductions arabes phonétiques par de vrais textes arabes
- [x] Traduire tous les labels du Dashboard en arabe
- [x] S'assurer que la police supporte l'arabe
- [x] Tester l'affichage du texte arabe

### 3. Plateformes dans la fiche propriété
- [x] Créer une section avec boutons de plateformes (Airbnb, Booking, VRBO, Website, Autre)
- [x] Ajouter un panneau de configuration pour chaque plateforme
- [x] Champs : ID utilisateur, Email, Statut, Lien/ICS/API key
- [x] Bouton "Ajouter une plateforme" avec formulaire
- [x] Sauvegarder les connexions dans Supabase ou localement

### 4. Services configurables
- [x] Créer la map SERVICE_CONFIG_URLS avec les URLs de configuration
- [x] Associer chaque service à une clé (serviceId)
- [x] Rendre les boutons "Configurer" fonctionnels (ouvrir URL dans nouvel onglet)
- [x] Ajouter un modal placeholder si aucune URL n'est définie

### 5. Paramètres > Plateformes
- [x] Rendre le bouton "+ Ajouter une plateforme" fonctionnel
- [x] Créer le formulaire d'ajout (Nom, Email, ID, Statut, URL)
- [x] Remplacer le bouton Actions inactif par un bouton "Gérer"
- [x] Ouvrir un modal de détail ou l'URL de connexion au clic
- [x] Créer une map avec les URLs de connexion des plateformes courantes

### 6. Composants réutilisables
- [x] Créer le composant PhoneInput (indicatif + numéro)
- [x] Liste des indicatifs pays (+212, +33, +34, +32, etc.)
- [x] Remplacer tous les champs Téléphone par PhoneInput
- [x] Créer le composant CountrySelect avec liste complète des pays
- [x] Utiliser CountrySelect partout où il y a un champ Pays
- [x] Relier les sélections aux modèles de données existants

## Phase 14: Corrections prioritaires (Nouvelle demande URGENTE)

### 1. Sidebar desktop définitif (PRIORITÉ ABSOLUE)
- [x] Identifier le composant de layout racine (AppLayout, DashboardLayout, App.tsx)
- [x] Mettre en place une structure flex avec .nk-app-root et .nk-app-main
- [x] Corriger le CSS du sidebar pour utiliser position: relative sur desktop
- [x] Séparer les classes desktop (.nk-sidebar) et mobile (.nk-sidebar-overlay)
- [x] Vérifier que le sidebar pousse le contenu sur desktop (pas d'overlay)
- [x] Conserver le comportement overlay sur mobile

### 2. Traduction globale (sidebar + pages)
- [x] Créer le fichier central i18n/translations.ts avec FR/EN/AR
- [x] Créer le hook useTranslation qui lit locale depuis AppSettingsContext
- [x] Traduire le sidebar (Dashboard, Propriétés, Réservations, Tâches, Paramètres)
- [x] Traduire les titres de pages principales
- [x] Traduire les sections principales de Propriétés et Paramètres
- [x] Vérifier que le changement de langue s'applique partout immédiatement
- [x] S'assurer que l'arabe s'affiche en vrais caractères arabes

## Phase 15: Corrections finales sidebar + traductions
- [x] Diagnostiquer pourquoi le sidebar recouvre encore la page sur desktop
- [x] Vérifier la structure HTML du layout racine (nk-app-root, nk-app-main)
- [x] Vérifier les classes CSS du sidebar (nk-sidebar-desktop, nk-sidebar-mobile)
- [x] Corriger le layout pour que le sidebar soit en flex sur desktop
- [x] Étendre les traductions à la page Propriétés (titres, boutons, sections)
- [x] Étendre les traductions à la page Réservations (titres, boutons, sections)
- [x] Étendre les traductions à la page Tâches (titres, boutons, sections)
- [x] Étendre les traductions à la page Paramètres et sous-onglets
- [x] Tester en changeant la langue vers EN et AR
- [x] Vérifier que l'arabe s'affiche en vrais caractères arabes

## Phase 16: Migration vers Supabase Auth (Option 1)
- [x] Inspecter le code serveur et identifier l'erreur OAuth
- [x] Vérifier que le client Supabase fonctionne côté client
- [x] Créer le hook useSupabaseAuth qui utilise supabase.auth
- [x] Créer une page de login Supabase (email/password)
- [x] Mettre à jour useSupabase pour utiliser l'utilisateur Supabase
- [x] Remplacer tous les appels à useAuth() par useSupabaseAuth() (DashboardLayoutNew, SidebarNew, useSupabase)
- [ ] Désactiver les routes OAuth Manus côté serveur
- [ ] Tester la page /properties sans erreur OAuth
- [ ] Tester le login/logout avec Supabase Auth
- [ ] Vérifier que toutes les pages protégées fonctionnent

## Phase 17: Correction des erreurs Supabase Auth (27 nov 2025)

- [x] Tester la connexion avec test@nkridari.com
- [x] Identifier les erreurs 400 exactes (récursion infinie RLS)
- [x] Créer la fonction get_user_tenant_id() pour récupérer le tenant_id
- [x] Adapter les politiques RLS pour utiliser get_user_tenant_id()
- [x] Vérifier l'accès au dashboard sans erreur
- [x] Vérifier l'accès à /properties sans erreur (création réussie)
- [x] Vérifier l'accès à /reservations et /tasks sans erreur
- [x] Afficher les détails des erreurs dans les logs (intercepteur réseau)

## Phase 18: Corrections UX et activation des fonctionnalités (28 nov 2025)

### Dashboard
- [x] Identifier et corriger le bloc "Chargement…" qui reste bloqué
- [x] Synchroniser les sélecteurs Devise/Langue avec les valeurs par défaut du Profil

### Propriétés
- [x] Supprimer le bouton "Superhote" de l'onglet Plateformes connectées
- [x] Garder uniquement : Nom, Email, ID, Price Multiplier, bouton Gérer

### Réservations
- [x] Rendre la devise dynamique dans "Nouvelle réservation" (suivre Dashboard ou Profil)
- [x] Enregistrer le montant ET la devise dans Supabase

### Tâches
- [x] Ajouter "Propriétaire" dans le menu Type de tâche
- [x] Permettre d'assigner une tâche à un propriétaire (liste depuis Équipe → Propriétaires)

### Paramètres → Profil
- [x] Activer le bouton "Changer" pour uploader le logo (Supabase Storage)
- [x] Synchroniser Devise par défaut et Langue par défaut avec le Dashboard
- [x] Transformer le champ Téléphone en indicatif + numéro
- [x] Rendre le champ Email modifiable
- [x] Remplacer le champ Pays par un menu déroulant

### Paramètres → Prestataires de paiement
- [x] Activer le bouton "Connecter" pour Stripe (modal avec clés API)
- [x] Activer le bouton "Connecter" pour Monei (modal avec credentials)
- [x] Activer le bouton "Ajouter" pour Autre PSP (modal de configuration)

### Paramètres → Facturation
- [x] Rendre la devise du Forfait mensuel dynamique (suivre Dashboard ou Profil)

### Paramètres → Équipe
- [x] Activer les boutons "Modifier" dans tous les onglets (Tous, Propriétaires, Équipe opérationnelle)
- [x] Créer le modal d'édition avec tous les champs (Nom, Email, Téléphone, Rôle, Modules, Statut)
- [x] Enregistrer les modifications dans Supabase (TODO backend)

## Phase 19: Améliorations UI et préparation intégration SU-API (28 nov 2025)

### 1. Paramètres → Services : modals de configuration internes
- [x] Créer un modal "Configurer SuperCheckin" avec :
  - [x] Colonne "Appareil connecté" (liste radio/checkbox de devices mock)
  - [x] Colonne "Type" (select: Rental, Owner, Autre)
  - [x] Colonne "Heure d'arrivée" (time picker)
  - [x] Colonne "Heure de départ" (time picker)
  - [x] Bouton "Enregistrer" qui sauvegarde dans localStorage (TODO: Supabase)
- [x] Créer un modal générique pour les autres services (Netatmo, Nuki, Igloohome, TheKeys, Make/n8n) avec :
  - [x] Champ "Identifiant API / Client ID"
  - [x] Champ "Clé secrète / Token" (type password)
  - [x] Toggle "Activer ce service"
  - [x] Sauvegarde dans localStorage (TODO: Supabase)
- [x] Mettre à jour les badges : "Connecté" (vert) si config existe et active, sinon "Non configuré" (gris)

### 2. Dashboard : graphiques & calendrier avec données mock
- [x] Ajouter des données mock pour le mode preview Manus :
  - [x] Graphique d'occupation mensuelle (12 mois avec %)
  - [x] Graphique de revenus mensuels (12 mois avec montants)
  - [x] Calendrier des réservations (propriétés mock + jours occupés par plateforme)
- [x] Garder la logique Supabase pour la production (hors preview)
- [x] Préparer l'architecture pour consommer les vraies données plus tard

### 3. Téléphone & Pays : composants réutilisables partout
- [x] Créer le composant PhoneInput (indicatif + numéro)
- [x] Créer le composant CountrySelect (menu déroulant pays du monde)
- [x] Remplacer tous les champs Téléphone par PhoneInput :
  - [x] Paramètres → Profil
  - [x] Paramètres → Facturation (TODO: vérifier)
  - [x] Paramètres → Équipe (TODO: vérifier)
  - [x] Page Nouvelle réservation
- [x] Remplacer tous les champs Pays par CountrySelect :
  - [x] Paramètres → Profil
  - [x] Paramètres → Facturation
  - [x] Paramètres → Équipe (si présent)
- [x] Vérifier que la valeur complète (indicatif + numéro) est stockée en base

### 4. Préparation intégration SU-API pour les plateformes
- [ ] Créer la table Supabase ota_connections avec :
  - [ ] Colonnes : id, tenant_id, platform, connection_type, su_api_account_id, su_api_property_id, status, created_at
  - [ ] Politique RLS : un tenant ne voit que ses connexions
- [ ] Dans Paramètres → Plateformes, créer un modal "Connecter API" avec :
  - [ ] Sélecteur "Mode de connexion" (SU-API, iCal, Autre)
  - [ ] Champ "Email du compte OTA"
  - [ ] Champ "Référence / ID SU-API"
  - [ ] Bouton "Enregistrer" qui crée/met à jour ota_connections
- [ ] Mettre à jour le badge "Connecté API" / "Non connecté" selon le status
- [ ] Créer une route API placeholder /api/su-api/connect (validation + update status)
- [ ] Ajouter des commentaires TODO pour l'intégration réelle SU-API plus tard

### 5. Vérification globale
- [ ] Vérifier que tous les boutons "Configurer" des Services ouvrent les modals
- [ ] Vérifier que les pays et téléphones ont des menus déroulants partout
- [ ] Vérifier que les graphiques et calendrier affichent des données de test en preview
- [ ] Ajouter des commentaires TODO pour les intégrations réelles

## Phase 20: Améliorations Dashboard et Propriétés

### 1. Filtres de période sur le Dashboard
- [x] Ajouter un menu déroulant sur la carte "Réservations du mois" avec options : Mois, Trimestre, Semestre, Année
- [x] Ajouter un menu déroulant sur la carte "Revenus du mois" avec les mêmes options
- [x] Mettre à jour la carte "Taux d'occupation" pour réagir au filtre de période sélectionné
- [x] Créer des données mock pour chaque période (bookings, revenue, occupancyRate)
- [x] Préparer la structure pour remplacer les mock par getDashboardStats(period) plus tard

### 2. Graphique de revenus (Dashboard)
- [x] Implémenter le graphique de revenus avec Recharts (actuellement vide)
- [x] Créer des données de test : { month: "Jan", revenue: 4500 }, etc.
- [x] Lier le graphique au filtre de période :
  - [x] Si "Mois" → afficher le détail par jour du mois courant
  - [x] Si "Trimestre/Semestre/Année" → afficher les revenus par mois
- [x] Afficher le tooltip avec le montant formaté selon la devise actuelle
- [x] Garder le style cohérent avec la charte NkriDari

### 3. Carte "Tâches en attente" cliquable
- [x] Rendre la carte "Tâches en attente" cliquable (redirection vers /tasks)
- [x] Ajouter un hover visuel (curseur pointer, légère ombre)
- [x] Ouvrir la page /tasks avec un filtre par défaut sur "À traiter / En attente" (TODO: implémenter le filtre)

### 4. "Activités récentes" → contenu réel
- [x] Renommer "Activité récente" en "Activités récentes" (pluriel)
- [x] Afficher une liste des 3 prochaines activités à venir :
  - [x] Check-in : date + nom du client (depuis réservations)
  - [x] Check-out : date + nom du client
  - [x] Ménage : date + nom de l'agent (depuis tâches)
- [x] Créer un mock Activity[] avec type, date, label
- [x] Trier les activités par date et afficher les 3 prochaines

### 5. Page Propriétés : tableau "Top 5" performances
- [x] Ajouter un bloc "Top 5 des propriétés" sous la liste des propriétés
- [x] Créer un tableau avec colonnes : Nom, Ville, Taux d'occupation (%), Revenus
- [x] Utiliser des données de test pour 5 propriétés
- [x] Trier par taux d'occupation décroissant
- [x] Indiquer le critère de tri dans le sous-titre
- [x] Préparer la structure pour alimenter avec des données Supabase plus tard

### 6. Vérification des menus déroulants Pays / Téléphone
- [x] Vérifier que tous les champs Pays utilisent CountrySelect (déjà fait en Phase 19)
- [x] Vérifier que tous les champs Téléphone utilisent PhoneInput (déjà fait en Phase 19)
- [x] Identifier les formulaires où ces composants ne sont pas encore utilisés (déjà fait en Phase 19)
- [x] Uniformiser partout (profil, propriétés, réservations, tâches, équipe) (déjà fait en Phase 19)

### 7. Préparation future pour SU-API (structure seulement)
- [x] Créer le fichier lib/suApiClient.ts
- [x] Ajouter des stubs TypeScript : connectChannelAccount, syncListings, etc.
- [x] Documenter où seront stockées les clés (Supabase ou env vars)
- [x] Préparer la structure pour gérer les identifiants API SU-API
- [x] Documenter la logique de connexion aux plateformes (Airbnb, Booking, Vrbo)

## Phase 21: Refonte complète page /reservations (vue analytique)

### Bloc 1 – Vue analytique mensuelle
- [x] Ajouter un sélecteur de période (Mois en cours, Mois précédent, Année en cours)
- [x] Créer 10 KPI cards pour le mois sélectionné :
  - [x] Hébergements actifs
  - [x] Nuits louées
  - [x] Nuits restantes non louées
  - [x] Taux d'occupation (%)
  - [x] Prix moyen par réservation
  - [x] Revenu brut (CA brut)
  - [x] Commissions plateformes
  - [x] Commission conciergerie
  - [x] Revenus nets propriétaire
  - [x] Nombre de check-in / check-out
- [x] Utiliser la devise du Dashboard/Profil pour afficher les montants
- [x] Préparer les calculs pour être réutilisables sur d'autres périodes

### Bloc 2 – Tableau de bord des plateformes (mois courant)
- [x] Créer le composant PlatformDashboard avec 2 graphiques donuts Recharts
- [x] Donut 1 : Taux d'occupation par plateforme
  - [x] Calculer nuits_louées_plateforme pour chaque channel
  - [x] Afficher % part d'occupation avec légende
- [x] Donut 2 : Revenus par plateforme
  - [x] Calculer CA_brut_plateforme pour chaque channel
  - [x] Afficher % part de revenu avec montants dans la légende
- [x] Utiliser les couleurs NkriDari pour les segments

### Bloc 3 – Tableau annuel détaillé
- [x] Créer le composant YearlyStatsTable avec 12 lignes (Janvier → Décembre)
- [x] Colonnes du tableau :
  - [x] Période (mois)
  - [x] Nuits louées
  - [x] Nuits restantes
  - [x] % Occupation
  - [x] Commissions plateformes
  - [x] Taxe de séjour
  - [x] CA brut
  - [x] Revenus net propriétaire
- [x] Ajouter une ligne "Total" qui additionne toutes les colonnes
- [x] Ranger les réservations par mois selon start_date

### Données & mode Preview
- [x] Créer un jeu de données mock cohérent pour une année complète
  - [x] 4 propriétés
  - [x] 4 plateformes (Airbnb, Booking.com, Direct, Vrbo)
  - [x] Montants, nuits, commissions réalistes (~120 réservations)
- [x] Préparer la structure pour brancher Supabase plus tard
- [x] Assurer que tous les graphiques s'affichent remplis en mode Preview

### UX & style
- [x] Respecter le style NkriDari (beige, terracotta, cartes arrondies)
- [x] Garder la navigation existante (sidebar, header)
- [x] Code TypeScript propre avec composants réutilisables
- [x] Tester l'affichage sans erreur en mode Preview Manus

## Phase 22: Correction du graphique de revenus vide sur Dashboard

- [ ] Vérifier la source de données du graphique (reservations.total_amount ou total_price)
- [ ] Générer des données de test pour 30 jours en mode Preview Manus
- [ ] Transformer les données réelles Supabase au format Recharts
- [ ] Vérifier que dataKey="revenue" correspond au champ utilisé
- [ ] Ajouter un état de chargement pendant la récupération des données
- [ ] Ajouter un fallback avec données de test si aucune réservation
- [ ] Tester le changement de période (Mois/Trimestre/Semestre/Année)
- [ ] Vérifier que le style reste cohérent (couleurs noir/terracotta)

## Phase 22: Correction du graphique de revenus du Dashboard (28 nov 2025)

- [x] Identifier le problème : graphique vide (ligne invisible)
- [x] Diagnostiquer la cause : variable CSS --color-revenue non définie
- [x] Corriger la configuration du ChartConfig (utiliser couleur directe #D97757)
- [x] Corriger le composant Line (stroke et fill avec couleur terracotta)
- [x] Tester le graphique avec période Mois (30 jours de données)
- [x] Tester le graphique avec période Trimestre (12 mois de données)
- [x] Tester le graphique avec période Semestre (12 mois de données)
- [x] Tester le graphique avec période Année (12 mois de données)
- [x] Vérifier la synchronisation des KPI avec les filtres de période
- [x] Vérifier le tooltip interactif avec devise dynamique

## Phase 23: Correction du sidebar sur la page /reservations (28 nov 2025)

- [x] Vérifier le routeur principal (App.tsx) pour identifier le layout de /reservations
- [x] Comparer le layout utilisé par /reservations avec celui du Dashboard
- [x] Vérifier si la page Reservations.tsx utilise son propre layout ou DashboardLayoutNew
- [x] Corriger la couleur de fond du sidebar (doit être bleu nuit comme les autres pages)
- [x] Corriger le comportement de rétractation du sidebar (doit fonctionner comme sur Dashboard)
- [x] S'assurer que la page utilise le SidebarContext global
- [x] Tester le sidebar sur Dashboard (couleur + rétractation)
- [x] Tester le sidebar sur Propriétés (couleur + rétractation)
- [x] Tester le sidebar sur Réservations (couleur + rétractation)
- [x] Tester le sidebar sur Tâches (couleur + rétractation)
- [x] Tester le sidebar sur Paramètres (couleur + rétractation)
- [x] Vérifier le comportement mobile (drawer plein écran)

## Phase 24: Mise à jour complète du PMS NkriDari Lite (28 nov 2025)

### 1. Système de design & couleurs NkriDari.fr
- [x] Mettre à jour les variables CSS avec la nouvelle charte (#D27A5F terracotta, #1E1E1E ink, #F4EDE4 beige)
- [x] Remplacer tous les boutons primaires par terracotta (#D27A5F)
- [ ] Créer des variantes de boutons secondaires en contour terracotta
- [ ] Harmoniser les icônes "modifier", "voir", "supprimer"
- [x] Uniformiser le design sur toutes les pages

### 2. Traductions i18n complètes (FR/EN/AR)
- [ ] Étendre le système de traductions à toutes les pages
- [ ] Traduire Dashboard (KPI, graphiques, calendrier, activités)
- [ ] Traduire Propriétés (tableau, formulaires, mini-dashboard)
- [ ] Traduire Réservations (vue analytique, tableaux, graphiques)
- [ ] Traduire Tâches (liste, formulaires, statuts)
- [ ] Traduire Paramètres (tous les onglets et sous-sections)
- [ ] Traduire Sidebar et Headers
- [ ] Implémenter le support RTL complet pour l'arabe
- [ ] Gérer les formats de dates et devises selon la langue

### 3. Sidebar - Corrections
- [x] Changer la couleur de fond du sidebar en beige clair (#F4EDE4)
- [x] Vérifier l'animation de rétractation sur toutes les pages
- [ ] Activer le mode RTL quand la langue est Arabe
- [x] Uniformiser l'apparence avec la nouvelle charte

### 4. Dashboard - Améliorations
- [x] Ajouter les filtres de période pour Réservations (Mois/Trimestre/Semestre/Année)
- [x] Ajouter les filtres de période pour Revenus (Mois/Trimestre/Semestre/Année)
- [x] Corriger le graphique de revenus (afficher les données mock)
- [x] Ajouter un bouton cliquable sur "Tâches en attente" → redirection vers /tasks
- [x] "Activités récentes" déjà au pluriel
- [x] Ajouter 3 prochains check-ins (date + nom client)
- [x] Ajouter 3 prochains check-outs (date + nom client)
- [x] Ajouter 3 prochains ménages (date + agent)
- [ ] Traduire le calendrier des réservations (FR/EN/AR)
- [ ] Corriger le calendrier en mode RTL
- [x] Peupler le calendrier avec données mock

### 5. Propriétés - Améliorations
- [ ] Créer un mini-dashboard sous le tableau des propriétés
- [ ] Ajouter Top 5 propriétés par taux d'occupation
- [ ] Ajouter Top 5 propriétés par revenus générés
- [ ] Afficher des graphiques ou cartes pour ces indicateurs

### 6. Services connectés - Formulaires internes
- [ ] Créer le composant ServiceConfigForm générique
- [ ] Implémenter le formulaire pour Netatmo (API Key, Type, Heures)
- [ ] Implémenter le formulaire pour SuperCheckin
- [ ] Implémenter le formulaire pour Nuki
- [ ] Implémenter le formulaire pour Igloohome
- [ ] Implémenter le formulaire pour TheKeys
- [ ] Implémenter le formulaire pour Make/N8N
- [ ] Créer la table connected_services dans Supabase
- [ ] Stocker les configurations dans Supabase
- [ ] Permettre d'activer/désactiver chaque device

### 7. SU-API - Architecture backend
- [ ] Créer le module Plateformes → SU-API dans l'interface
- [ ] Créer la route /api/suapi/connect (backend)
- [ ] Créer la route /api/suapi/fetchReservations (backend)
- [ ] Créer la route /api/suapi/updateRates (backend)
- [ ] Créer la route /api/suapi/updateAvailability (backend)
- [ ] Formulaire pour saisir identifiants Booking/Airbnb
- [ ] Masquer complètement SU-API côté utilisateur

### 8. Page Réservations - Refonte complète
- [ ] Créer la section "Indicateurs clés du mois" avec 9 KPI
- [ ] KPI : Hébergements actifs
- [ ] KPI : Nuits louées
- [ ] KPI : Nuits restantes
- [ ] KPI : Taux d'occupation
- [ ] KPI : Prix moyen / réservation
- [ ] KPI : Revenu brut (CA)
- [ ] KPI : Commissions OTA
- [ ] KPI : Commission conciergerie
- [ ] KPI : Revenus nets propriétaire
- [ ] KPI : Check-in / Check-out du mois
- [ ] Créer le "Dashboard des plateformes" avec 2 graphiques
- [ ] Graphique : Taux d'occupation par canal
- [ ] Graphique : Revenus par plateforme
- [ ] Créer le tableau annuel détaillé (12 mois + total)
- [ ] Colonnes : Période, Nuits louées, Nuits restantes, % Occupation
- [ ] Colonnes : Commissions plateformes, Taxe de séjour, CA Brut, Revenu net
- [ ] Ajouter une ligne "Total annuel" au bas du tableau
- [ ] Peupler avec des données mock réalistes

### 9. Paramètres - Corrections
- [ ] Téléphone : Ajouter sélecteur d'indicatif (+212, +33, +34, +49, etc.)
- [ ] Téléphone : Auto-format selon le pays sélectionné
- [ ] Email : Rendre le champ modifiable (actuellement grisé)
- [ ] Pays : Remplacer par un menu déroulant avec tous les pays
- [ ] Logo : Réparer le bouton "Changer" (upload vers Supabase Storage)
- [ ] PSP Stripe : Activer le bouton "Connecter" avec formulaire
- [ ] PSP Monei : Activer le bouton "Connecter" avec formulaire
- [ ] PSP Autre : Créer un formulaire d'ajout personnalisé
- [ ] Équipe : Activer tous les boutons "Modifier" avec modal d'édition

### 10. Problèmes techniques généraux
- [x] Réparer le graphique des revenus (dashboard)
- [ ] Compléter les traductions manquantes
- [x] Corriger le sidebar (couleur + animation)
- [ ] Uniformiser les couleurs selon la nouvelle charte
- [ ] Charger des données mock sur les pages vides
- [ ] Implémenter le RTL complet pour l'arabe
- [ ] Nettoyage global du CSS

## Phase 25: Système de traductions i18n complet FR/EN/AR avec RTL (28 nov 2025)

### 1. Vérifier et activer le système i18n
- [ ] Vérifier que i18n et useTranslation() sont chargés globalement
- [ ] Vérifier que le contexte de langue applique un force rerender
- [ ] Vérifier les fichiers de traductions existants

### 2. Créer les fichiers de traductions complets
- [x] Créer/compléter locales/fr/common.json avec toutes les clés
- [x] Créer/compléter locales/en/common.json avec traductions anglaises
- [x] Créer/compléter locales/ar/common.json avec traductions arabes
- [x] Ajouter les clés pour Dashboard (KPI, graphiques, périodes)
- [x] Ajouter les clés pour Réservations (vue analytique, tableaux)
- [x] Ajouter les clés pour Paramètres (profil, facturation, PSP)
- [x] Ajouter les clés pour Propriétés (tableau, actions)
- [x] Ajouter les clés pour Tâches
- [x] Ajouter les clés pour les mois (janvier-décembre)
- [x] Ajouter les clés pour les actions communes (connecter, ajouter, modifier, supprimer)

### 3. Traduire la page Dashboard
- [ ] Remplacer "Réservations (Mois)" par t()
- [ ] Remplacer "Revenus (Mois)" par t()
- [ ] Remplacer "Taux d'occupation" par t()
- [ ] Remplacer "Tâches en attente" par t()
- [ ] Remplacer "Activités récentes" par t()
- [ ] Remplacer "Graphique d'occupation" par t()
- [ ] Remplacer "Graphique de revenus" par t()
- [ ] Traduire les mois du graphique (Jan-Déc)
- [ ] Traduire "Propriétés (2)" par t()
- [ ] Traduire la date "Novembre 2025" avec month_*
- [ ] Traduire les filtres de période (Mois/Trimestre/Semestre/Année)

### 4. Traduire la page Réservations
- [ ] Traduire "Vue analytique"
- [ ] Traduire "Hébergements actifs"
- [ ] Traduire "Nuits louées"
- [ ] Traduire "Nuits restantes"
- [ ] Traduire "Taux d'occupation"
- [ ] Traduire "Prix moyen / réservation"
- [ ] Traduire "Revenu brut (CA)"
- [ ] Traduire "Commissions plateformes"
- [ ] Traduire "Commission conciergerie"
- [ ] Traduire "Revenus nets propriétaire"
- [ ] Traduire "Check-in / Check-out"
- [ ] Traduire "Tableau de bord des plateformes"
- [ ] Traduire "Taux d'occupation par plateforme"
- [ ] Traduire "Revenus par plateforme"
- [ ] Traduire "Statistiques annuelles"
- [ ] Traduire "Tableau annuel détaillé"
- [ ] Traduire les colonnes du tableau (Période, Nuits louées, etc.)

### 5. Traduire la page Paramètres
- [ ] Traduire "Profil utilisateur"
- [ ] Traduire "Prénom"
- [ ] Traduire "Nom"
- [ ] Traduire "Email"
- [ ] Traduire "Téléphone"
- [ ] Traduire "Logo / Photo de la conciergerie"
- [ ] Traduire "Devise par défaut"
- [ ] Traduire "Langue par défaut"
- [ ] Traduire "Pays"
- [ ] Traduire "Fuseau horaire"
- [ ] Traduire "Adresse de facturation"
- [ ] Traduire "Adresse complète"
- [ ] Traduire "Code postal"
- [ ] Traduire "Ville"
- [ ] Traduire "Numéro de TVA"
- [ ] Traduire "Paramètres utilisateur"
- [ ] Traduire "Stripe", "Monei", "Autre PSP"
- [ ] Traduire "Connecter", "Ajouter"
- [ ] Traduire tous les placeholders

### 6. Traduire la page Propriétés
- [ ] Traduire "Propriétés (2)"
- [ ] Traduire "Nom"
- [ ] Traduire "Ville"
- [ ] Traduire "Capacité"
- [ ] Traduire "Statut"
- [ ] Traduire "Plateforme"
- [ ] Traduire "Actions"
- [ ] Traduire "Gérer"
- [ ] Traduire "Modifier"
- [ ] Traduire "Supprimer"
- [ ] Traduire "Nouvelle propriété"

### 7. Traduire la page Tâches
- [ ] Traduire tous les labels et boutons

### 8. Implémenter le support RTL pour l'arabe
- [ ] Ajouter dir="rtl" quand lang === "ar" sur Dashboard
- [ ] Ajouter dir="rtl" quand lang === "ar" sur Réservations
- [ ] Ajouter dir="rtl" quand lang === "ar" sur Paramètres
- [ ] Ajouter dir="rtl" quand lang === "ar" sur Tâches
- [ ] Ajouter dir="rtl" quand lang === "ar" sur Propriétés
- [ ] Ajouter dir="rtl" sur le Sidebar
- [ ] Tester l'affichage RTL sur toutes les pages

### 9. Correction des dates traduites
- [ ] Implémenter la traduction automatique des mois via t(`month_${monthNumber}`)
- [ ] Adapter le format des dates selon la langue (FR/EN/AR)
- [ ] Tester les dates sur Dashboard
- [ ] Tester les dates sur Réservations

## Phase 26: Harmonisation complète des couleurs avec nkridari.fr (28 nov 2025)

### 1. Analyse de la palette nkridari.fr
- [x] Ouvrir https://nkridari.fr et identifier les couleurs principales
- [x] Noter la couleur principale (boutons/accents) : Or #D4AF37
- [x] Noter la couleur de fond principale : Beige clair #F5F5F0
- [x] Noter la couleur de texte principale (ink) : Teal #1E4D4D
- [x] Noter les couleurs secondaires (gris, blanc, etc.)
- [x] Documenter toutes les valeurs hex dans un commentaire

### 2. Création du système de design tokens
- [x] Créer les variables nk-primary (#D4AF37) et nk-primary-hover (#C19B2E)
- [x] Créer les variables nk-bg (#F5F5F0) fond général
- [x] Créer les variables nk-card (#FFFFFF) fond des cartes
- [x] Créer les variables nk-border (#E0E0E0) bordures
- [x] Créer les variables nk-text (#1E4D4D) et nk-muted (#6B6B6B)
- [x] Créer les variables nk-danger (#E74C3C) et nk-danger-hover (#C0392B)
- [x] Implémenter les tokens dans index.css
- [x] Mapper les tokens vers les variables Tailwind

### 3. Sidebar - Harmonisation
- [x] Fond du sidebar : teal foncé (#1E4D4D)
- [x] Texte et icônes : blanc (#FFFFFF)
- [x] Élément actif : fond or (#D4AF37), texte blanc
- [x] Élément hover : fond or adouci
- [x] Séparateurs : teal adouci

### 4. Dashboard - Harmonisation
- [ ] Cartes KPI : fond nk-card, bordure nk-border
- [ ] Boutons : nk-primary avec hover
- [ ] Graphiques : couleurs cohérentes
- [ ] Calendrier : couleurs cohérentes
- [ ] Activités récentes : couleurs cohérentes

### 5. Propriétés - Harmonisation
- [ ] Tableau : header et lignes avec couleurs cohérentes
- [ ] Boutons "Gérer/Modifier/Supprimer" : nk-primary, nk-danger
- [ ] Page détail : onglets, boutons, badges de statut
- [ ] Badges : couleurs cohérentes

### 6. Réservations - Harmonisation
- [ ] Sidebar : remettre la bonne couleur (ink)
- [ ] Cartes analytiques : fond nk-card
- [ ] Graphiques donut : couleurs cohérentes
- [ ] Tableau annuel : couleurs cohérentes

### 7. Tâches - Harmonisation
- [ ] Boutons "Nouvelle tâche" : nk-primary
- [ ] Filtres : couleurs cohérentes
- [ ] Badges de statut (À faire/En cours/Terminé) : couleurs cohérentes

### 8. Paramètres - Harmonisation
- [ ] Profil : bouton "Enregistrer" nk-primary
- [ ] Profil : bouton "Changer" (logo) nk-primary
- [ ] Adresse facturation : bouton "Enregistrer" nk-primary
- [ ] PSP : boutons "Connecter/Ajouter" nk-primary
- [ ] Équipe : boutons "Modifier/Ajouter" nk-primary
- [ ] Équipe : badges "Actif/Invité" couleurs cohérentes

### 9. Services - Harmonisation
- [ ] Cartes d'intégration : bouton "Configurer" nk-primary
- [ ] Toutes les cartes : fond nk-card, bordure nk-border

### 10. Tests finaux
- [ ] Tester Dashboard en FR/EN/AR
- [ ] Tester Propriétés en FR/EN/AR
- [ ] Tester Réservations en FR/EN/AR
- [ ] Tester Tâches en FR/EN/AR
- [ ] Tester Paramètres en FR/EN/AR
- [ ] Tester Services en FR/EN/AR
- [ ] Vérifier que les couleurs sont identiques sur toutes les langues

## Phase 27: Correction complète interface + traductions + palette NkriDari.fr (28 nov 2025)

### 1. Palette officielle NkriDari.fr (VALEURS EXACTES)
- [x] Remplacer --nk-primary par #CE7A58
- [x] Remplacer --nk-bg par #F2EDE7
- [x] Remplacer --nk-beige par #E8DCCF
- [x] Remplacer --nk-text par #1A1A1A
- [x] Remplacer --nk-muted par #4A4A4A
- [x] Remplacer --nk-success par #37A169
- [x] Remplacer --nk-danger par #D9534F
- [x] Mettre à jour le mapping Tailwind
- [x] Sidebar beige avec élément actif primary

### 2. Traductions i18n complètes - Dashboard
- [ ] Traduire "Réservations (Mois/Trimestre/Semestre/Année)" en EN/AR
- [ ] Traduire "Revenus (Mois/Trimestre/Semestre/Année)" en EN/AR
- [ ] Traduire "Taux d'occupation" en EN/AR
- [ ] Traduire "Tâches en attente" en EN/AR
- [ ] Traduire "Activités récentes" en EN/AR
- [ ] Traduire "Check-in / Check-out" en EN/AR
- [ ] Traduire les noms des mois (Jan-Déc) en EN/AR
- [ ] Traduire "Novembre 2025" dynamiquement selon la langue

### 3. Traductions i18n complètes - Réservations
- [ ] Traduire "Vue analytique" en EN/AR
- [ ] Traduire "Indicateurs clés du mois" en EN/AR
- [ ] Traduire "Hébergements actifs" en EN/AR
- [ ] Traduire "Nuits louées" en EN/AR
- [ ] Traduire "Nuits restantes" en EN/AR
- [ ] Traduire "Prix moyen / réservation" en EN/AR
- [ ] Traduire "Revenu brut (CA)" en EN/AR
- [ ] Traduire "Commissions plateformes" en EN/AR
- [ ] Traduire "Commission conciergerie" en EN/AR
- [ ] Traduire "Revenus nets propriétaire" en EN/AR
- [ ] Traduire "Tableaux de bord des plateformes" en EN/AR
- [ ] Traduire "Statistiques annuelles" (toutes colonnes + mois) en EN/AR

### 4. Traductions i18n complètes - Propriétés
- [ ] Traduire "Liste des propriétés" en EN/AR
- [ ] Traduire "Nom / Ville / Capacité / Statut / Plateforme / Actions" en EN/AR
- [ ] Traduire "Nouveau bien / Gérer" en EN/AR
- [ ] Traduire les labels du calendrier en EN/AR
- [ ] Traduire la légende "Airbnb / Booking / Vrbo / Direct" en EN/AR

### 5. Traductions i18n complètes - Paramètres
- [ ] Traduire "Profil utilisateur" en EN/AR
- [ ] Traduire "Téléphone" en EN/AR
- [ ] Traduire "Langue par défaut" en EN/AR
- [ ] Traduire "Devise par défaut" en EN/AR
- [ ] Traduire "Pays" en EN/AR
- [ ] Traduire "Fuseau horaire" en EN/AR
- [ ] Traduire "Logo / Photo" en EN/AR
- [ ] Traduire "Enregistrer" en EN/AR
- [ ] Traduire "Adresse de facturation" en EN/AR
- [ ] Traduire "Adresse complète / Code postal / Ville / Pays" en EN/AR
- [ ] Traduire "Numéro de TVA" en EN/AR
- [ ] Traduire "PSP (Stripe, Monei, autre PSP)" en EN/AR
- [ ] Traduire "Connecter / Ajouter" en EN/AR
- [ ] Traduire "Non connecté / Connecté / À configurer" en EN/AR

### 6. Traductions i18n complètes - Tâches
- [ ] Traduire "Types de tâches" en EN/AR
- [ ] Traduire "Statut" en EN/AR
- [ ] Traduire "Assigné à" en EN/AR
- [ ] Traduire "Créer une tâche" en EN/AR

### 7. Traductions i18n complètes - Calendrier
- [ ] Traduire "Tous les logements" en EN/AR
- [ ] Traduire "Mois, navigation dates" en EN/AR
- [ ] Traduire "Nom de la propriété" en EN/AR
- [ ] Traduire "Plateformes" en EN/AR
- [ ] Traduire la légende multilingue en EN/AR

### 8. Page Login - Mot de passe oublié
- [ ] Créer la page Contact.tsx
- [ ] Ajouter formulaire avec Nom, Email, Téléphone, Message
- [ ] Implémenter l'envoi d'email vers contact.nkridari@gmail.com
- [ ] Rediriger "Créer un compte" vers Contact.tsx
- [ ] Rediriger "Mot de passe oublié" vers Contact.tsx

### 9. Sidebar - Corrections
- [ ] Appliquer la palette NkriDari au sidebar
- [ ] Corriger le hover : primary (#CE7A58) + texte blanc
- [ ] Vérifier la rétractation sur toutes les pages
- [ ] Uniformiser toutes les icônes

### 10. Dashboard - Graphiques
- [ ] Graphique de revenus : données tests 3000-9000 MAD/mois
- [ ] Graphique de revenus : changer selon Mois/Trimestre/Année
- [ ] Graphique d'occupation : harmoniser les couleurs

### 11. Page Propriétés - Tableau Top 5
- [ ] Créer tableau "Top 5 des performances"
- [ ] Colonnes : Propriété, Taux d'occupation (%), Revenus du mois
- [ ] Ajouter données mockées

### 12. Vérifications finales
- [ ] Vérifier que toutes les clés i18n sont appelées via t("clé")
- [ ] Supprimer tous les textes en dur
- [ ] Vérifier que les mois sont traduits via i18n
- [ ] Vérifier que les dates changent selon la langue (ar, en, fr)
- [ ] Tester visuellement chaque page
- [ ] Tester arabe / anglais / français
- [ ] Tester les graphiques
- [ ] Tester la sidebar
- [ ] Tester propriétés / réservations / paramètres
- [ ] Vérifier la cohérence avec NkriDari.fr

## Phase 28: Application des traductions i18n existantes (28 nov 2025)

### 1. Vérifier useTranslation.ts
- [ ] Vérifier la signature de la fonction t()
- [ ] Harmoniser sur le modèle t('section', 'key')
- [ ] Créer une fonction utilitaire getMonthLabel() si nécessaire

### 2. Dashboard - Remplacer textes en dur
- [x] "Réservations (Mois)" → t('sidebar', 'reservations') + periodLabels
- [x] "Revenus (Mois)" → t('dashboard', 'totalRevenue') + periodLabels
- [x] "Tâches en attente" → t('dashboard', 'pendingTasks')
- [x] "Réservations actives" → t('dashboard', 'activeReservations')
- [x] "Moyenne mois" → t('dashboard', 'monthlyAverage')
- [x] "Total des revenus" → t('dashboard', 'totalRevenue')
- [x] "Activités récentes" → t('dashboard', 'recentActivities')
- [x] "Aucune activité récente" → t('dashboard', 'noActivityYet')
- [x] Filtres : Mois/Trimestre/Semestre/Année → t('dashboard', ...)
- [x] Mois dans graphiques : déjà traduits dans mockData
- [x] "Calendrier des réservations" → t('dashboard', 'reservationCalendar')
- [x] "Tous les logements" → t('dashboard', 'allProperties')

### 3. Sidebar - Remplacer textes en dur
- [ ] "Dashboard" → t('sidebar', 'dashboard')
- [ ] "Propriétés" → t('sidebar', 'properties')
- [ ] "Réservations" → t('sidebar', 'reservations')
- [ ] "Tâches" → t('sidebar', 'tasks')
- [ ] "Paramètres" → t('sidebar', 'settings')
- [ ] "Déconnexion" → t('sidebar', 'logout')

### 4. Propriétés - Remplacer textes en dur
- [ ] "Propriétés" → t('properties', 'title')
- [ ] "Liste des propriétés" → t('properties', 'list')
- [ ] "Nouvelle propriété" → t('properties', 'newProperty')
- [ ] Colonnes : Nom/Ville/Pays/Statut/Plateforme/Actions → t('properties', ...)
- [ ] "Gérer" → t('properties', 'manage')
- [ ] "Modifier" → t('properties', 'edit')
- [ ] "Supprimer" → t('properties', 'delete')
- [ ] "Aucune propriété" → t('properties', 'noProperties')

### 5. Réservations - Remplacer textes en dur
- [ ] "Réservations" → t('reservations', 'title')
- [ ] "Vue analytique" → t('reservations', 'analyticsView')
- [ ] "Mois en cours" → t('reservations', 'currentMonth')
- [ ] "Indicateurs clés du mois" → t('reservations', 'keyIndicators')
- [ ] Tous les KPI → t('reservations', ...)
- [ ] "Tableau de bord des plateformes" → t('reservations', 'platformDashboard')
- [ ] "Statistiques annuelles" → t('reservations', 'annualStats')

### 6. Paramètres - Remplacer textes en dur
- [ ] Onglets : Profil/Services/Plateformes/Website/Facturation/Équipe → t('settings', ...)
- [ ] "Profil utilisateur" → t('settings', 'userProfile')
- [ ] Tous les champs → t('settings', ...)
- [ ] "Adresse de facturation" → t('settings', 'billingAddress')
- [ ] "Prestataires de paiement" → t('settings', 'paymentProviders')

### 7. Tâches - Remplacer textes en dur
- [ ] Tous les textes → t('tasks', ...)

### 8. Boutons génériques - Remplacer par t('common', ...)
- [ ] "Enregistrer" → t('common', 'save')
- [ ] "Annuler" → t('common', 'cancel')
- [ ] "Supprimer" → t('common', 'delete')
- [ ] "Modifier" → t('common', 'edit')
- [ ] "Ajouter" → t('common', 'add')

### 9. Support RTL
- [ ] Appliquer dir="rtl" quand locale === 'ar'
- [ ] Vérifier que tous les textes arabes s'affichent correctement

### 10. Tests finaux
- [ ] Tester Dashboard en EN : tout doit être en anglais
- [ ] Tester Dashboard en AR : tout doit être en arabe + RTL
- [ ] Tester Réservations en EN/AR
- [ ] Tester Propriétés en EN/AR
- [ ] Tester Paramètres en EN/AR
- [ ] Vérifier qu'aucun texte FR ne reste en dur
