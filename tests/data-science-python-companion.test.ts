import { test, expect } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const script = 'public/downloads/data-science-portfolio/forecast_python_sql.py';
const expected = JSON.parse(readFileSync('public/downloads/data-science-portfolio/recorded-result.json', 'utf8'));
test('Python training and SQL scoring reproduce each existing JavaScript prediction and both MAEs', () => {
 const result = spawnSync('python3', [script], { encoding: 'utf8' });
 expect(result.status).toBe(0);
 const actual = JSON.parse(result.stdout);
 expect(actual.evaluation_days).toBe(14);
 expect(actual.baseline_mae).toBe(expected.mae.baseline);
 expect(actual.candidate_mae).toBe(expected.mae.candidate);
 expect(actual.predictions).toEqual(expected.cases.map((row: any) => [row.date, row.baseline, row.candidate]));
});
test('Python rejects duplicate dates and prevents held-out targets changing fitted predictions', () => {
 const check = `import importlib.util,json,copy,sys\nsys.dont_write_bytecode=True\ns=importlib.util.spec_from_file_location('companion','${script}')\nm=importlib.util.module_from_spec(s);s.loader.exec_module(m)\nr=json.load(open('public/downloads/data-science-portfolio/synthetic-workload.json'))\np=m.run(r)['predictions']\nchanged=copy.deepcopy(r)\nfor x in changed[28:]: x['requests']+=100\nassert m.run(changed)['predictions']==p\nr[29]['date']=r[28]['date']\ntry: m.run(r)\nexcept ValueError: pass\nelse: raise AssertionError('duplicate date accepted')`;
 const result = spawnSync('python3', ['-c', check], { encoding: 'utf8' });
 expect(result.stderr).toBe('');expect(result.status).toBe(0);
});
