---
name: Task
about: Create a new task
title: "[TASK] Replace external forms with native implementations"
labels: task, ui/ux, forms, user-experience
assignees: ''
---

## Description
All forms currently redirect to external services (Google Forms, Substack), creating a fragmented user experience. Implement native forms with proper validation, error handling, and success states.

## Acceptance Criteria
- [ ] Create native contact form to replace Google Forms
- [ ] Implement newsletter signup with API integration
- [ ] Add proper form validation with inline errors
- [ ] Show loading states during submission
- [ ] Display success/error messages clearly
- [ ] Ensure forms are fully accessible
- [ ] Add form analytics tracking

## Technical Details
1. **Create Contact Form** (`src/components/ContactForm.tsx`):
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* More fields... */}

      <Button type="submit" isLoading={isSubmitting}>
        Send Message
      </Button>

      {submitStatus === 'success' && (
        <Alert variant="success">
          Thank you! We'll get back to you soon.
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="error">
          Something went wrong. Please try again.
        </Alert>
      )}
    </form>
  );
}
```

2. **Create Newsletter Component** (`src/components/NewsletterForm.tsx`):
```typescript
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === 'loading'}
        className="flex-1 rounded-md border-gray-300"
      />
      <Button type="submit" isLoading={status === 'loading'}>
        Subscribe
      </Button>
    </form>
  );
}
```

3. **Create API Routes**:
- `/api/contact` - Handle contact form submissions
- `/api/newsletter` - Handle newsletter signups

## Related Issues
- Users leave site to fill forms (high bounce rate)
- No control over form UX/branding
- Can't track form analytics properly
- No way to follow up automatically

## Additional Notes
- Consider implementing reCAPTCHA for spam prevention
- Add rate limiting to prevent abuse
- Store submissions in database for follow-up
- Send email notifications using SendGrid/AWS SES