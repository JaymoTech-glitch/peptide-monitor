Build a production-ready pharmacovigilance platform called Peptide Monitor.

IMPORTANT ARCHITECTURE RULES

This application must use:

- WeWeb as frontend only
- Supabase as backend only
- Existing Supabase project already exists
- Existing Supabase schema already exists
- Do not create WeWeb database tables
- Do not use WeWeb database
- Do not use WeWeb Auth
- Use Supabase Auth only
- Connect directly to existing Supabase tables and collections
- Do not duplicate any Supabase tables inside WeWeb
- Do not create new tables unless explicitly required

PROJECT PURPOSE

Peptide Monitor is an observational pharmacovigilance platform.

Users voluntarily record peptide use, biometrics, outcomes and adverse events.

The platform provides:

1. Personal health tracking
2. Community safety monitoring
3. Aggregated research datasets
4. Commercial research subscriptions

The platform does not provide medical advice.

GLOBAL DISCLAIMER

Display throughout the application:

"This platform collects anonymous observational data only. Information displayed does not constitute medical advice, diagnosis, treatment, prescribing guidance, or endorsement of peptide use."

AUTHENTICATION

Use Supabase Auth only.

Public users must not be required to enter an email address.

Anonymous account workflow:

1. Generate anonymous username
2. Generate secure password
3. Generate recovery phrase
4. Create hidden synthetic email for Supabase Auth
5. Create Supabase user
6. Store auth.users.id
7. Create profile record
8. Create consent record
9. Display username, password and recovery phrase once
10. Require user acknowledgement that credentials have been saved

Store only a hash of the recovery phrase.

Do not display or expose the synthetic email.

ROLES

Use existing Supabase roles tables.

Roles:

- user
- researcher
- admin

Permissions:

USER

- own dashboard
- own logs
- own biometrics
- own side effects
- own outcomes
- anonymised community insights

RESEARCHER

- aggregated analytics
- dataset exports
- filters
- trend analysis

ADMIN

- taxonomy management
- audit logs
- role management
- researcher subscriptions
- data quality monitoring

DATABASE TABLES

Use existing Supabase tables only:

profiles
consent_records
cycles
peptide_logs
side_effect_reports
outcome_reports
metric_entries
categories
peptides
side_effects
admin_routes
frequencies
outcome_types
metric_types
roles
users_roles
audit_trail

Do not create duplicates.

USER ONBOARDING FLOW

Landing Page

↓

Medical Disclaimer

↓

Consent Screen

↓

Generate Anonymous Account

↓

Credential Confirmation

↓

Baseline Profile

↓

Dashboard

PROFILE DATA

Collect:

- age range
- biological sex
- country
- region/state
- height
- weight
- baseline notes

PEPTIDE LOGGING

Support:

- peptide selection
- peptide stack combinations
- dose
- dose units
- route
- frequency
- cycle
- start date
- stop date
- source type
- batch information
- reconstitution details
- notes

BIOMETRIC TRACKING

Support:

- weight
- body fat
- waist measurement
- blood pressure
- resting heart rate
- glucose
- sleep duration
- sleep quality
- mood
- energy
- recovery
- pain
- appetite
- libido
- performance

OUTCOME REPORTING

Support:

- goal type
- effectiveness score
- tolerability score
- satisfaction score
- notes

SIDE EFFECT REPORTING

Support:

- symptom
- severity
- onset date
- duration
- resolved yes/no
- intervention required yes/no
- hospitalisation required yes/no
- narrative

USER DASHBOARD

Display:

- active cycles
- peptide history
- biometrics history
- outcome trends
- side effect history
- charts
- timeline

COMMUNITY INSIGHTS

Only use aggregated anonymous data.

Display:

- most reported peptides
- most common side effects
- side effect frequency
- average effectiveness
- regional trends
- reporting volumes

No user identifiers.

RESEARCHER PORTAL

Create separate route:

/researcher

Features:

- aggregate dashboards
- CSV export
- JSON export
- filters
- date ranges
- peptide filters
- region filters
- demographic filters
- side effect filters
- outcome filters

ADMIN PORTAL

Create separate route:

/admin

Features:

- taxonomy management
- user role management
- audit logs
- researcher management
- subscription management
- data quality checks

GDPR

Implement:

- export my data
- delete my account
- delete my data
- consent history
- audit trail

COMMERCIAL READINESS

Prepare architecture for:

- researcher subscriptions
- Stripe integration
- researcher upgrades
- regional data licensing
- pharmaceutical partnerships
- institutional analytics

SUPABASE REQUIREMENTS

Verify before building:

1. Supabase Auth connected
2. Existing tables connected
3. Collections imported
4. RLS functioning
5. Anonymous signup functioning

Do not proceed to dashboards until:

- Supabase user creation works
- profile creation works
- consent record creation works

TESTING GATES

Gate 1

Anonymous signup creates:

- auth.users record
- profile record
- consent record

Gate 2

Peptide logging writes to:

peptide_logs

Gate 3

Biometric tracking writes to:

metric_entries

Gate 4

Dashboard displays live Supabase data

Gate 5

Community insights display aggregated data

Only proceed to the next gate after the previous gate passes.
