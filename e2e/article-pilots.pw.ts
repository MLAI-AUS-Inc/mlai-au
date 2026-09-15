import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({page})=>{
  if(process.env.CI)await page.route('**/*',route=>new URL(route.request().url()).origin==='http://127.0.0.1:4198'?route.continue():route.abort());
});
test('beginner exercise has a keyboard answer guide with and without scripts',async({page},info)=>{
  await page.goto('/articles/featured/what-is-artificial-intelligence-in-simple-words');
  const answers=page.getByText('Read all answers and explanations',{exact:true});
  await answers.focus();await page.keyboard.press('Enter');
  await expect(answers.locator('..')).toHaveAttribute('open','');
  await expect(answers.locator('..').locator('li')).toHaveCount(8);
  if(info.project.name!=='without-javascript'){
    const button=page.locator('fieldset').first().getByRole('button',{name:'Not AI',exact:true});
    await button.focus();await page.keyboard.press('Space');
    await expect(button).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('fieldset').first().getByRole('status')).toContainText('Correct.');
  }
});
test('accelerator worksheet preserves mismatches and saves exactly the copyable record',async({page},info)=>{
  await page.goto('/articles/featured/startup-accelerator-australia');
  const fieldset=page.locator('#accelerator-fit fieldset');
  if(info.project.name==='without-javascript'){
    await expect(fieldset.locator("input").first()).toBeDisabled();
    const resource=await page.request.get('/downloads/accelerator-decision/evidence-worksheet.txt');
    expect(resource.status()).toBe(200);expect(await resource.body()).toEqual(readFileSync('public/downloads/accelerator-decision/evidence-worksheet.txt'));
    return;
  }
  await expect(fieldset.locator("input").first()).toBeEnabled();
  for(const select of await fieldset.locator('select').all()){
    const id=(await select.getAttribute('id'))!.replace('accelerator-status-','');
    await select.selectOption('verified');await page.locator(`#accelerator-evidence-${id}`).fill('Fictional automated test entry');
  }
  await expect(page.locator('[data-fit-result]')).toHaveAttribute('data-fit-result','recorded');
  await page.locator('#accelerator-status-eligibility').selectOption('not-met');
  await expect(page.locator('[data-fit-result]')).toHaveAttribute('data-fit-result','mismatch');
  await expect(page.locator('[data-fit-result]')).toContainText('7 of 8');
  const download=page.waitForEvent('download');await page.getByRole('button',{name:'Save my evidence record (TXT)',exact:true}).click();
  const saved=await download;const path=await saved.path();expect(path).not.toBeNull();
  expect(readFileSync(path!,'utf8')).toBe(await page.locator('#accelerator-fit details pre').textContent());
  expect(page.url()).not.toContain('Fictional');
});
test('an open accelerator page marks its source checks overdue at Sydney midnight',async({page},info)=>{
  test.skip(info.project.name==='without-javascript','Unit tests and corpus checks separately cover server-clock rendering.');
  await page.clock.install({time:new Date('2026-09-21T13:59:30Z')});
  await page.goto('/articles/featured/startup-accelerator-australia');
  await expect(page.locator('[data-review-state="fresh"]')).toHaveCount(7);
  await page.clock.fastForward(60_000);
  await expect(page.locator('[data-review-state="needs-review"]')).toHaveCount(7);
  await expect(page.locator('[data-review-state="fresh"]')).toHaveCount(0);
});
