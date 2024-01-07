# Argent-De-Niro REST API

Here's the code for the backend API written in Flask.

### Running the API

```bash
python3 -m api.v1.app
```

- Environment variables
  - `ADN_SECRET_KEY` _Defaults to `foobar`_
  - `ADN_API_HOST` _Defaults to `0.0.0.0`_
  - `ADN_API_PORT` _Defaults to `5000`_

### Seeding the database with data

```bash
python3 -m api.seeder
```

- Environment variables
  - `TRANSACTION_COUNT_PER_USER` _Defaults to `30`_
  - `BUDGET_COUNT_PER_USER` _Defaults to `10`_
  - `GOAL_COUNT_PER_USER` _Defaults to `10`_
