# Peptide Monitor Architecture

## Frontend

WeWeb

Routes:

- /consent
- /signup
- /dashboard
- /log-peptide
- /cycles
- /biometrics
- /side-effects
- /outcomes
- /settings
- /insights

## Backend

Supabase

Project Reference:

iwupkspdtnviiqxgvanc

## Authentication

Anonymous account generation using:

- Synthetic email
- Generated password
- Recovery phrase

## Core Workflow

User Signup
→ Create Supabase Auth User
→ Create Profile Record
→ Create Consent Record
→ Dashboard

## Future Workflow

User
→ Log Peptide
→ Record Biometrics
→ Record Outcomes
→ Record Side Effects
→ Generate Community Insights
