Eventually Consistent Form
==========================

Overview
--------

This is a small React app that simulates how a frontend can handle unreliable APIs while keeping the UI clear and predictable.

The form collects an email and amount. After submission, the UI immediately shows a loading state while the request is sent to a mock API that may:

-   Succeed quickly

-   Fail temporarily (503)

-   Succeed after a delay

The goal is to model real-world async behavior and handle it cleanly in the UI.

* * * * *

State Transitions
-----------------

Each submission is tracked with a clear status:

-   **pending** → shown immediately after submit (optimistic UI)

-   **retrying** → shown when a temporary failure occurs

-   **success** → final successful state

-   **failed** → shown after retry limit is reached

This makes async behavior visible and easy to understand.

* * * * *

Retry Logic
-----------

If the API fails with a temporary error (503), the app retries automatically.

-   Maximum of **3 attempts**

-   Small delay between retries

-   UI reflects retry progress (e.g., Loading... retry 2/3)

This prevents infinite retries while still handling flaky APIs gracefully.

* * * * *

Preventing Duplicate Records
----------------------------

Duplicates are prevented at two levels:

### 1\. Retry-safe submissions

Each submission gets a unique client-generated ID (`crypto.randomUUID()`).\
Retries reuse the same ID and only update the status of the existing entry.

This ensures retries never create duplicate records.

* * * * *

### 2\. User-level duplicate prevention

The app also prevents duplicate user submissions by checking if the same **email** already exists before creating a new entry.

If a duplicate is detected, the submission is ignored.

This guarantees users never see duplicate records in the UI.

* * * * *

UI Behavior
-----------

The UI is designed to clearly reflect the current state:

-   Immediate feedback after submission 

-   Visible loading and retry states

-   Clear success and failure indicators

-   No duplicate records shown at any point


* * * * *

Mock API Behavior
-----------------

The mock API randomly simulates real-world scenarios:

-   Fast success

-   Temporary failure (503)

-   Delayed success (5--6 seconds)

This helps demonstrate how the UI behaves under unreliable network conditions.

* * * * *

What This Demonstrates
----------------------

This project focuses on practical frontend resilience patterns:

-   Handling unreliable APIs gracefully

-   Explicit async state modeling

-   Automatic retry handling with limits

-   Preventing duplicate records in the UI

-   Clear user feedback during uncertainty

These are common challenges in real-world frontend systems.

* * * * *

Tech Stack
----------

-   React (Vite)

-   Plain CSS

-   Simple mock API (no backend required)

* * * * *

Running the App
---------------

```
npm install
npm run dev

```

* * * * *

Summary
-------

The main goal of this project was to build a simple but realistic example of how a frontend can stay predictable even when APIs are unreliable. The implementation keeps the logic straightforward while ensuring:

-   No duplicate records

-   Automatic retries with limits

-   Clear UI state transitions

-   Simple, understandable code# Eventually-Consistent-Form
