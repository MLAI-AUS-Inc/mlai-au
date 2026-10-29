"""Python + SQLite companion to workload-forecast-v1. Entirely synthetic data.
Run: python3 forecast_python_sql.py [synthetic-workload.json]
Standard library only; no network, accounts, or external actions.
"""
import datetime as dt
import json
from pathlib import Path
import sqlite3
import sys


def validate(rows):
    if not isinstance(rows, list) or len(rows) != 42:
        raise ValueError('Expected exactly 28 training and 14 evaluation days')
    previous = None
    for row in rows:
        if not isinstance(row, dict) or set(row) != {'date', 'requests'}:
            raise ValueError('Each row needs only date and requests')
        day = dt.date.fromisoformat(row['date'])
        if day.isoformat() != row['date'] or not 2000 <= day.year <= 2099:
            raise ValueError('Use ISO dates in 2000–2099')
        if previous is not None and day != previous + dt.timedelta(days=1):
            raise ValueError('Dates must be ordered, unique and consecutive')
        if type(row['requests']) is not int or not 0 <= row['requests'] <= 100000:
            raise ValueError('Requests must be integer counts from 0 to 100000')
        previous = day
    if dt.date.fromisoformat(rows[0]['date']).weekday() != 0:
        raise ValueError('Training must start on Monday')


def run(rows):
    validate(rows)
    training, evaluation = rows[:28], rows[28:]
    weekly_means = [sum(r['requests'] for r in training[w:w+7]) / 7 for w in range(0, 28, 7)]
    centre_x, centre_y = 1.5, sum(weekly_means) / 4
    slope = sum((w-centre_x)*(value-centre_y) for w, value in enumerate(weekly_means)) / 5
    intercept = centre_y - slope * centre_x
    offsets = [sum(training[w*7+d]['requests'] - weekly_means[w] for w in range(4))/4 for d in range(7)]
    # Fit above sees training only. Actual evaluation counts enter SQL scoring below.
    predictions = [(r['date'], training[21+i % 7]['requests'], round(max(0, intercept+slope*((28+i)//7)+offsets[i % 7]), 6)) for i, r in enumerate(evaluation)]
    with sqlite3.connect(':memory:') as db:
        db.execute('CREATE TABLE actual(day TEXT PRIMARY KEY, requests INTEGER NOT NULL CHECK(requests >= 0))')
        db.execute('CREATE TABLE prediction(day TEXT PRIMARY KEY, baseline REAL NOT NULL, candidate REAL NOT NULL)')
        db.executemany('INSERT INTO actual VALUES (?, ?)', [(r['date'], r['requests']) for r in evaluation])
        db.executemany('INSERT INTO prediction VALUES (?, ?, ?)', predictions)
        # One row per day on each side. Primary keys prevent an unnoticed many-to-many join.
        count, baseline, candidate = db.execute('''
            SELECT COUNT(*), AVG(ABS(a.requests - p.baseline)), AVG(ABS(a.requests - p.candidate))
            FROM actual AS a JOIN prediction AS p ON a.day = p.day
        ''').fetchone()
        if count != len(evaluation):
            raise ValueError('Scoring must retain every evaluation day')
    return {'evaluation_days': count, 'baseline_mae': round(baseline, 6), 'candidate_mae': round(candidate, 6),
            'units': 'requests per day', 'predictions': predictions,
            'decision': 'Compare these synthetic cases only; no operational approval'}


if __name__ == '__main__':
    try:
        if len(sys.argv) > 2:
            raise ValueError('Usage: python3 forecast_python_sql.py [synthetic-workload.json]')
        path = Path(sys.argv[1]) if len(sys.argv) == 2 else Path(__file__).with_name('synthetic-workload.json')
        if path.stat().st_size > 1000000:
            raise ValueError('Input exceeds the lab size limit')
        print(json.dumps(run(json.loads(path.read_text())), indent=2))
    except (ValueError, TypeError, KeyError, OSError) as error:
        print('Forecast exercise failed: ' + str(error), file=sys.stderr)
        sys.exit(1)
