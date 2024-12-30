# Argent-De-Niro REST API

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/31940054-20306cb1-2467-43b7-a2db-819a748bed77?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D31940054-20306cb1-2467-43b7-a2db-819a748bed77%26entityType%3Dcollection%26workspaceId%3Da177125b-88fd-4c6a-bbb9-7da65193df8b)

Backend REST API written in Flask.

## Prerequisites

- Python 3.8+
- pip
- Virtual environment (Optional)

## Setup Instructions

1. Create and activate virtual environment: (Optional)

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

2. Install dependencies:

```bash
pip install -r api/requirements.txt
```

3. Setup mongodb on your machine.

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
