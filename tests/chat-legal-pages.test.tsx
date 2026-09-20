import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import Privacy from '../app/routes/privacy';
import Terms from '../app/routes/terms';

test('Chat privacy has a stable destination without removing Carbon disclosures', () => {
  const html = renderToStaticMarkup(<Privacy />);
  expect(html).toContain('id="mlai-chat"');
  expect(html).toContain('href="#mlai-chat"');
  expect(html).toContain('Carbon, Cost &amp; Convenience');
  expect(html).toContain('Continue Solo Offline');
  expect(html).toContain('90 days');
  expect(html).toContain('Slack');
  expect(html).toContain('Account deletion and retention');
});

test('community rules render with reporting, blocking and a support contact', () => {
  const html = renderToStaticMarkup(<Terms />);
  expect(html).toContain('id="mlai-chat"');
  expect(html).toContain('We do not tolerate objectionable content');
  expect(html).toContain('in-app reporting controls');
  expect(html).toContain('block members');
  expect(html).toContain('hi@mlai.au');
  expect(html).toContain('Australian Consumer Law');
});
