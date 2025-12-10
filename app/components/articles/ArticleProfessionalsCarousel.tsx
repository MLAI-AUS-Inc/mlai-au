import { Link, useFetcher } from 'react-router'
import type { ClinicianProfile } from '~/data/types'
import ProfessionalsCarousel from '../ProfessionalsCarousel'
// import { getArticleProfessionals, getFeaturedProfessionals } from '@server/backend'

type Props = {
  title: string
  persona?: string
  limit?: number
  className?: string
  subtitle?: string
  articleSlug?: string
  articleType?: 'informational' | 'local'
  articleSummary?: string
  keywords?: string[]
  location?: {
    state?: string
    city?: string
    suburb?: string
  }
}

type ExtendedProfile = ClinicianProfile & Record<string, any>

const allowedDisciplines: ClinicianProfile['discipline'][] = [
  'psychology',
  'speech-therapy',
  'occupational-therapy',
  'physiotherapy',
]

const PERSONA_TO_FALLBACK: Record<string, ClinicianProfile['discipline']> = {
  'speech-therapy': 'speech-therapy',
  'speech-pathologist': 'speech-therapy',
  psychologist: 'psychology',
  psychology: 'psychology',
  'occupational-therapy': 'occupational-therapy',
  'occupational-therapist': 'occupational-therapy',
  physiotherapist: 'physiotherapy',
  physiotherapy: 'physiotherapy',
  'plan-manager': 'occupational-therapy',
  'support-coordinator': 'occupational-therapy',
  'support-worker': 'occupational-therapy',
}

function normalizePersonaForBackend(persona?: string): string | undefined {
  if (!persona) return persona
  return persona.toLowerCase() === 'plan-manager' ? 'support-coordinator' : persona
}

export default async function ArticleProfessionalsCarousel({
  title,
  persona,
  limit,
  className = '',
  subtitle,
  articleSlug,
  articleType = 'informational',
  articleSummary,
  keywords,
  location,
}: Props) {
  const effectiveLimit = limit ?? (persona ? 8 : 12)
  const fetchedPersona = normalizePersonaForBackend(persona)
  let rawResults: any[] | null = []

  /*
  if (articleSlug && fetchedPersona) {
    const payload = {
      slug: articleSlug,
      articleType,
      title,
      summary: articleSummary || subtitle || title,
      keywords,
      persona: fetchedPersona,
      location,
      limit: effectiveLimit,
    }
    rawResults = await getArticleProfessionals(payload)
  }

  if (!rawResults || rawResults.length === 0) {
    rawResults = await getFeaturedProfessionals(fetchedPersona, effectiveLimit, {
      state: location?.state,
      suburb: location?.suburb || location?.city,
      topic: keywords ? keywords.join(', ') : undefined,
    })
  }
  */

  if (!Array.isArray(rawResults) || rawResults.length === 0) {
    return null
  }

  const unique = new Map<string, any>()
  rawResults.forEach((item, index) => {
    const key = item?.slug || item?.professional_id || `professional-${index}`
    if (!unique.has(key)) {
      unique.set(key, item)
    }
  })

  if (unique.size === 0) {
    return null
  }

  const fallbackDiscipline: ClinicianProfile['discipline'] = PERSONA_TO_FALLBACK[String(persona || '').toLowerCase()] ?? 'psychology'

  const profiles: ExtendedProfile[] = Array.from(unique.values())
    .slice(0, effectiveLimit)
    .map((raw, idx) => mapToProfile(raw, idx, fallbackDiscipline))

  if (profiles.length === 0) {
    return null
  }

  return (
    <div className={`my-12 ${className}`}>
      <ProfessionalsCarousel title={title} profiles={profiles} />
      {articleSlug ? (
        <ArticleProfessionalsSchema
          articleSlug={articleSlug}
          articleTitle={title}
          profiles={profiles}
        />
      ) : null}
      {subtitle ? (
        <p className="mt-3 text-sm text-gray-600 text-center sm:text-left">{subtitle}</p>
      ) : null}
    </div>
  )
}

function mapToProfile(raw: any, idx: number, fallback: ClinicianProfile['discipline']): ExtendedProfile {
  const safeName = raw?.name
    ? String(raw.name).trim()
    : `${raw?.first_name || ''} ${raw?.last_name || ''}`.trim() || 'Professional'

  const availability = Array.isArray(raw?.availability)
    ? raw.availability.map((slot: any) => ({
      day: slot?.day || '',
      start: slot?.start || '',
      end: slot?.end || '',
      fee: slot?.fee || '',
      rebate: slot?.rebate || '',
    }))
    : raw?.availability || []

  const disciplineFromPersona = (() => {
    const personaField = raw?.persona || raw?.personas
    const firstValue = Array.isArray(personaField)
      ? personaField[0]
      : (personaField ? String(personaField).split(',')[0] : undefined)
    if (firstValue) {
      const normalized = String(firstValue).toLowerCase().trim()
      if (normalized === 'occupational-therapist' || normalized === 'occupational-therapy') return 'occupational-therapy'
      if (normalized === 'psychologist' || normalized === 'psychology') return 'psychology'
      if (normalized === 'speech-pathologist' || normalized === 'speech-therapy') return 'speech-therapy'
      if (normalized === 'physiotherapist' || normalized === 'physiotherapy') return 'physiotherapy'
    }
    return undefined
  })()

  const discipline = (() => {
    if (allowedDisciplines.includes(raw?.discipline)) return raw.discipline
    if (disciplineFromPersona && allowedDisciplines.includes(disciplineFromPersona)) return disciplineFromPersona
    return allowedDisciplines.includes(fallback) ? fallback : 'psychology'
  })()

  const profile: ExtendedProfile = {
    slug: raw?.slug || raw?.professional_id || `professional-${idx}`,
    name: safeName,
    headshot: raw?.avatar || raw?.avatar_url || raw?.blurred_avatar_url || '',
    niches: raw?.niches || [],
    languages: raw?.languages || [],
    discipline,
    registration: raw?.registration || '',
    headline: raw?.headline || raw?.summary || '',
    empathyHook: raw?.empathyHook || raw?.summary || '',
    longBio: raw?.longBio || '',
    whoIHelp: raw?.whoIHelp || [],
    availability,
    telehealth: Boolean(raw?.telehealth_offered || raw?.telehealth_only || raw?.telehealth),
    inPerson: raw?.practice_suburb || raw?.city_suburb || '',
    ndisReports: Boolean(raw?.ndisReports),
    newSpots: raw?.waitlist || '',
    credentials: raw?.credentials || raw?.credBullets || [],
    faq: Array.isArray(raw?.faq) ? raw.faq : [],
    tagline: raw?.tagline || raw?.summary || '',
    credBullets: raw?.credBullets || raw?.credentials || [],
    specialisations: raw?.specialisations || raw?.specializations || raw?.specialties || [],
    approachLong: raw?.approachLong || '',
    caseBlurbs: raw?.caseBlurbs || raw?.case_blurbs || [],
    fees: raw?.fees || '',
    hours: raw?.hours || '',
    bulkBilling: raw?.bulkBilling ?? null,
    bookingUrl: raw?.bookingUrl || '',
    gbpUrl: raw?.gbpUrl || '',
    blurred_avatar_url: raw?.blurred_avatar_url,
    avatar_url: raw?.avatar_url,
    professional_id: raw?.professional_id,
    experience: raw?.experience || [],
    practiceSlug: raw?.practice_slug || '',
    locations: raw?.locations || [],
    personas: raw?.persona || raw?.personas || [],
    availableLanguage: raw?.availableLanguage || raw?.languages || [],
    availability_order: raw?.availability_order,
    waitlist: raw?.waitlist || '',
    summary: raw?.summary || raw?.tagline || raw?.headline || '',
    city_suburb: raw?.city_suburb || raw?.practice_suburb || '',
    state_region: raw?.state_region || '',
    telehealth_only: Boolean(raw?.telehealth_only),
    telehealth_offered: Boolean(raw?.telehealth_offered),
    specialties: raw?.specialties || raw?.specialisations || raw?.specializations || [],
    credibility_bullets: raw?.credibility_bullets || raw?.credBullets || [],
    initials: raw?.initials,
  }

  return profile
}

type SchemaProps = {
  articleSlug: string
  articleTitle: string
  profiles: ExtendedProfile[]
}

function ArticleProfessionalsSchema({ articleSlug, articleTitle, profiles }: SchemaProps) {
  if (!profiles.length) return null

  const baseUrl = 'https://www.supportsorted.com'

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleTitle,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/articles/${articleSlug}`,
    },
    mentions: profiles.slice(0, 9).map((p) => ({
      '@type': 'Person',
      name: p.name,
      jobTitle: (Array.isArray(p.personas) ? p.personas.join(', ') : p.discipline) || undefined,
      url: `${baseUrl}/professionals/${p.slug}`,
      address: p.city_suburb
        ? {
          '@type': 'PostalAddress',
          addressLocality: p.city_suburb,
          addressRegion: p.state_region || undefined,
          addressCountry: 'Australia',
        }
        : undefined,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
