---
name: Task
about: Create a new task
title: "[TASK] Improve accessibility (a11y) compliance"
labels: task, accessibility, ux, seo
assignees: ''
---

## Description
The application has several accessibility issues including empty alt texts, missing ARIA labels, and potential keyboard navigation problems. These need to be fixed to ensure the site is usable by everyone.

## Acceptance Criteria
- [ ] Add meaningful alt text to all images
- [ ] Ensure all interactive elements are keyboard accessible
- [ ] Add proper ARIA labels where needed
- [ ] Ensure proper heading hierarchy
- [ ] Test with screen readers
- [ ] Achieve WCAG 2.1 AA compliance
- [ ] Add skip navigation link

## Technical Details
Current issues found:

1. **Empty alt attributes**:
   - `src/components/events.tsx:76` - Event banner images
   - `src/components/testimonials.tsx:88,94,119` - Author images
   - `src/components/flagshipevents.tsx:92` - Event images
   - `src/components/team.tsx:45` - Team member photos

2. **Missing accessibility features**:
   - No skip navigation link
   - Carousel controls may not be keyboard accessible
   - Form inputs may lack proper labels
   - No focus indicators on some interactive elements

3. **Improvements needed**:
```typescript
// Bad - empty alt
<img src={person.imageUrl} alt="" />

// Good - descriptive alt
<img src={person.imageUrl} alt={`${person.name}, ${person.role}`} />

// Bad - no ARIA label
<button onClick={handleNext}>›</button>

// Good - with ARIA label
<button onClick={handleNext} aria-label="Next slide">›</button>
```

4. **Add skip navigation**:
```typescript
// In layout.tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

5. **Ensure proper heading hierarchy**:
   - Only one h1 per page
   - Don't skip heading levels
   - Use semantic HTML

## Related Issues
- Improves SEO
- Legal compliance (accessibility laws)
- Better user experience for all users
- Expands potential audience

## Additional Notes
- Install and use eslint-plugin-jsx-a11y
- Test with axe DevTools or Lighthouse
- Consider adding automated a11y testing to CI/CD
- Document accessibility guidelines for contributors