# EduCare - Frontend

**EduCare** est une plateforme web dédiée à la lutte contre la précarité étudiante. Elle met en relation les étudiants en difficulté avec des organismes d'aide (associations, institutions publiques comme le CROUS, etc.). La plateforme permet aux petites associations de gagner en visibilité et d'atteindre efficacement leur public cible.

Ce repository contient la partie frontend du projet, développée avec le framework Angular 15 
[Voir le back-end du projet](https://github.com/Slyannn/EduCare_backend.git)
## 🎯 Mission

- **Faciliter l'accès** aux aides et services dont les étudiants ont besoin
- **Lutter contre l'isolement** et la précarité étudiante
- **Encourager la solidarité** et l'entraide entre étudiants et organismes
- **Diffuser l'information** sur les aides disponibles pour les étudiants en Île-de-France

## 🚀 Technologies Utilisées

### Frontend
- **Angular 15** - Framework principal
- **Angular Material** - Composants UI
- **Bootstrap 5.3.2** - Framework CSS
- **Google Maps API** - Géolocalisation et cartographie
- **SweetAlert2** - Notifications et alertes
- **TypeScript** - Langage de programmation
- **RxJS** - Programmation réactive

### Dépendances Principales
```json
{
  "@angular/core": "^15.0.0",
  "@angular/material": "^15.2.9",
  "@angular/google-maps": "^17.0.4",
  "bootstrap": "^5.3.2",
  "sweetalert2": "^11.10.1"
}
```

## 👥 Types d'Utilisateurs

### 1. **Étudiants** (`ROLE_STUDENT`)
- Créent un profil avec leurs informations personnelles
- Définissent leurs besoins spécifiques
- Recherchent des associations par proximité géographique
- Consultent les profils des associations
- Contactent les organismes
- Laissent des avis et évaluations

### 2. **Associations/Organismes** (`ROLE_ORGANISM`)
- Inscrivent leur association avec validation administrative
- Gèrent leur profil et services proposés
- Reçoivent les demandes de contact des étudiants
- Consultent les avis reçus
- Mettent à jour leurs informations

### Installation
```bash
# Cloner le repository
git clone [repository-url]
cd afreesoft-frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve
```

### Configuration
1. **API Backend** : Configurer l'URL dans `src/app/services/baseUrl.ts`
2. **Google Maps** : Ajouter votre clé API dans `src/index.html`
3. **Variables d'environnement** : Configurer selon l'environnement

## 📁 Structure du Projet

```
src/app/
├── components/          # Composants réutilisables
│   ├── header/         # Navigation principale
│   ├── footer/         # Pied de page
│   ├── home/           # Page d'accueil
│   ├── login/          # Connexion
│   ├── explor/         # Page d'exploration
│   └── organism-list/  # Liste des associations
├── pages/              # Pages principales
│   ├── student/        # Espace étudiant
│   │   ├── signup/     # Inscription
│   │   ├── profile/    # Profil
│   │   ├── student-needs/ # Gestion des besoins
│   │   └── notifications/ # Notifications
│   └── organism/       # Espace association
│       ├── signup/     # Inscription
│       ├── profile/    # Profil
│       ├── update-organism/ # Mise à jour
│       └── review/     # Gestion des avis
├── services/           # Services métier
│   ├── login.service.ts    # Authentification
│   ├── student.service.ts  # Gestion étudiants
│   ├── organism.service.ts # Gestion associations
│   ├── need.service.ts     # Gestion des besoins
│   └── review.service.ts   # Gestion des avis
├── models/             # Modèles de données
│   ├── user.ts         # Utilisateur
│   ├── student.ts      # Étudiant
│   ├── organism.ts     # Association
│   ├── need.ts         # Besoin
│   └── review.ts       # Avis
├── guard/              # Protection des routes
└── assets/             # Ressources statiques
```

## 🔄 Flux Utilisateur

### Pour un Étudiant
1. **Découverte** → Visite de la page d'accueil
2. **Exploration** → Consultation des associations sans inscription
3. **Inscription** → Création de compte avec vérification email
4. **Configuration** → Définition des besoins
5. **Recherche** → Filtrage des associations par proximité
6. **Contact** → Communication avec les associations
7. **Évaluation** → Partage d'expérience via les avis

### Pour une Association
1. **Inscription** → Processus en 4 étapes avec validation
2. **Attente** → Validation manuelle par l'équipe
3. **Activation** → Profil visible par les étudiants
4. **Gestion** → Mise à jour des informations et services
5. **Communication** → Réception et traitement des demandes
6. **Suivi** → Consultation des avis et statistiques

## 🎨 Interface Utilisateur

### Design System
- **Couleurs** : Palette cohérente avec la marque EduCare
- **Typographie** : Police Open Sans pour la lisibilité
- **Composants** : Angular Material pour la consistance
- **Responsive** : Bootstrap pour l'adaptabilité mobile

### Expérience Utilisateur
- **Navigation intuitive** avec breadcrumbs
- **Feedback visuel** pour toutes les actions
- **Chargement optimisé** avec gestion des états
- **Accessibilité** respectant les standards WCAG

## 📊 Fonctionnalités Avancées

### Performance
- **Lazy loading** des modules
- **Cache local** avec localStorage
- **Optimisation des images** et assets
- **Pagination** pour les listes importantes

### Géolocalisation
- **Calcul de distance** précis avec Google Maps
- **Géocodage** d'adresses automatique
- **Tri par proximité** intelligent
- **Cartes interactives** intégrées

### Communication
- **Système de messagerie** entre utilisateurs
- **Notifications** en temps réel (future)
- **Email de confirmation** automatique
- **Formulaires de contact** intégrés

## 📱 Fonctionnalités Principales

### 🔐 **Système d'Authentification**
- **Inscription sécurisée** avec validation par email
- **Connexion** avec gestion des rôles
- **Vérification de compte** obligatoire
- **Guards de protection** des routes selon les rôles
- **Gestion des sessions** avec localStorage

### 🏠 **Page d'Accueil**
- **Présentation de la mission** et des objectifs
- **Interface différenciée** selon le statut (connecté/non connecté)
- **Processus d'inscription** expliqué pour chaque type d'utilisateur
- **Informations de contact** de l'équipe

### 🎓 **Espace Étudiant**

#### Inscription et Profil
- **Formulaire multi-étapes** : informations personnelles, adresse, université
- **Profil personnalisable** avec gestion des besoins
- **Mise à jour des informations** avec validation sécurisée

#### Gestion des Besoins
- **Interface intuitive** avec chips autocomplétées
- **Ajout/suppression** de besoins en temps réel
- **Sauvegarde locale** pour une expérience fluide
- **Synchronisation** avec le backend

#### Recherche d'Associations
- **Filtrage intelligent** basé sur les besoins sélectionnés
- **Calcul automatique des distances** avec l'API Google Maps
- **Tri par proximité géographique**
- **Affichage des services** proposés par chaque association

#### Système d'Avis
- **Rédaction d'avis** avec titre, contenu et note (1-5)
- **Consultation des avis** rédigés
- **Interface carousel** pour naviguer entre les avis

### 🏢 **Espace Association**

#### Inscription Validée
- **Processus en 4 étapes** :
  1. Création du compte utilisateur
  2. Informations de l'association
  3. Adresse et localisation
  4. Documents justificatifs (certificat, logo)
- **Validation manuelle** par l'équipe EduCare
- **Sélection des services** proposés

#### Gestion du Profil
- **Profil public** consultable par les étudiants
- **Informations de contact** : email, téléphone, site web
- **Description détaillée** des services
- **Gestion des services** proposés
- **Mise à jour** des informations

#### Communication
- **Réception de messages** des étudiants intéressés
- **Formulaire de contact** intégré au profil
- **Consultation des avis** reçus des étudiants

### 🗺️ **Fonctionnalités Géographiques**

#### Géolocalisation Avancée
- **Calcul de distance** précis entre étudiant et association
- **Géocodage d'adresses** avec Google Maps API
- **Affichage cartographique** des emplacements
- **Itinéraires** entre étudiant et association

#### Interface Cartographique
- **Cartes interactives** sur les profils d'associations
- **Marqueurs personnalisés** pour différencier les positions
- **Zoom automatique** pour afficher les deux positions
- **Directions routières** intégrées

### 🔍 **Système d'Exploration**

#### Page Explorer
- **Catalogue complet** des associations disponibles
- **Filtrage par catégories** de services
- **Interface responsive** avec cartes d'aperçu
- **Accès direct** aux profils détaillés

#### Recherche Intelligente
- **Filtres multiples** par type de besoin
- **Résultats en temps réel**
- **Pagination** pour une navigation fluide
- **Sauvegarde des préférences**

### ⭐ **Système d'Évaluation**

#### Pour les Étudiants
- **Notation sur 5 étoiles**
- **Avis détaillés** avec titre et description
- **Historique des avis** donnés
- **Interface de rédaction** intuitive

#### Pour les Associations
- **Consultation des évaluations** reçues
- **Affichage public** des avis sur le profil
- **Moyenne des notes** (fonctionnalité future)

### 🛡️ **Sécurité et Protection**

#### Guards de Route
- **`StudentGuard`** : Protège les routes étudiants
- **`OrganismGuard`** : Protège les routes associations
- **`NotLoggedInGuard`** : Redirige les utilisateurs connectés
- **`ConfirmAccountGuard`** : Force la vérification email

#### Validation des Données
- **Formulaires réactifs** avec validation en temps réel
- **Vérification côté client** et serveur
- **Gestion des erreurs** avec messages explicites
- **Protection contre les injections**

## 🛠️ Installation et Configuration

### Prérequis
- Node.js (version 16+)
- npm ou yarn
- Angular CLI



## 🔮 Évolutions Futures

### Fonctionnalités Prévues
- **Chat en temps réel** entre étudiants et associations
- **Système de notifications** push
- **Application mobile** native
- **Dashboard administrateur** complet
- **Statistiques avancées** et analytics
- **Système de matching** automatique
- **Intégration réseaux sociaux**

### Améliorations Techniques
- **Migration vers Angular 17+**
- **Tests unitaires** et e2e complets
- **CI/CD** automatisé
- **Monitoring** et logs avancés
- **PWA** (Progressive Web App)

## 👨‍💻 Équipe de Développement

Ce projet a été développé par l'équipe **Afreesoft** dans le cadre de la lutte contre la précarité étudiante.

### Contact
- **Email** : contact@afreesoft.org
- **Site web** : [En cours de développement]

## 📄 Licence

Ce projet est développé dans un cadre éducatif et social. Tous droits réservés à l'équipe Afreesoft.

---

**EduCare** - *Ensemble contre la précarité étudiante* 🎓💪
