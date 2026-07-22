# Dialogue

Practice interviews with a live AI video interviewer, then get a scored report
on how you did. For anyone prepping for a job interview and wanting reps before
the real thing. Built on the [DeepSpace SDK](https://deep.space).

**Live app:** https://mock-interview.app.space

## What it does
- Runs a real-time mock interview against a talking video avatar that asks questions and follows up
- Covers different interview styles (behavioral, coding, and more)
- After you hang up, turns the transcript into a scored report that grades each answer
- Keeps a history of your past interviews and reports

## How it's built
The face-to-face interview is driven by the `tavus` integration through the
DeepSpace integrations proxy — the app creates a persona and a conversation, then
polls it for the finished transcript. Scoring runs as a durable JobRoom job
(`score-interview`): once the call ends it waits for the transcript, sends it to
the `anthropic` integration to grade each answer, and writes the `reports` row,
flipping the interview to "scored." The report page subscribes with the `useJobs`
hook to show live progress, and interviews and reports are stored in RecordRooms
with per-collection RBAC.

## Run your own

Deploy your own copy in three commands:

```sh
npm install
npx deepspace login     # one-time, opens a browser tab
npx deepspace deploy    # -> <name>.app.space
```

Auth, the database, real-time sync, and hosting all come from DeepSpace, so
there is nothing else to configure. Your subdomain is the `name` field in
`wrangler.toml`; change it for your own deployment.

Or build something new: apps like this are made by handing a prompt to a
coding agent — start at [deep.space/get-started](https://deep.space/get-started),
or scaffold from scratch: `npm create deepspace@latest my-app`.

---
*Dialogue was built end-to-end by an AI agent on the DeepSpace SDK.
DeepSpace is laying the foundation for rebuilding the Internet in an AI-native
way — [deep.space](https://deep.space) · [docs](https://docs.deep.space).*
