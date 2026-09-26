## Learning objectives

- Write a scope of work and use a change-order process to control scope creep.
- Read a Gantt chart and find a project's critical path and float.
- Distinguish RFQs, RFPs, and invitations for bids, and explain qualifications-based selection.
- Choose an appropriate contract type and manage a consultant effectively.
- Describe quality assurance and quality control for planning deliverables.

## Key concepts

### The project lifecycle

Planning work, from a corridor study to a code rewrite, is project work. Most projects move through five phases: **initiation** (why are we doing this?), **planning** (scope, schedule, budget, team), **execution**, **monitoring and control** (tracking progress and adjusting), and **closing** (final deliverables, lessons learned).

### The scope of work

The **scope of work** is the project's foundation. A good one states:

- the **objectives** and the decision the project supports;
- **tasks** and the **deliverables** each produces, such as an existing conditions memo, three alternatives, or a draft plan;
- the **schedule** and **milestones**;
- the **budget**;
- **roles and responsibilities** (who reviews, who approves, who leads engagement); and
- **assumptions and exclusions** (for example, "includes four public meetings" or "traffic counts provided by the city").

**Scope creep**, the gradual addition of work beyond the original scope, is best controlled by a **clear scope with a change-order process**. When new work is requested, the change is documented and its cost and schedule effects are agreed before the work proceeds.

:::figure fig-change-order | A change order in four steps, from the scope creep example later in this lesson. Request: add a parking study. Document: write it up. Estimate: cost and schedule. Approve: change order signed. The result: the study gets its own budget, and the plan adds six weeks, openly. A note says scope creep is change without this paperwork.
The work still gets added; what the change order adds is an agreed price and date before anyone starts.
:::

:::checkpoint cp:pm-scope-assumptions

### Schedules: Gantt charts and the critical path

A **Gantt chart** displays **tasks as bars on a timeline**, showing each task's start, duration, and end, and often dependencies and milestones. It's the most common way to communicate a schedule.

The **critical path method (CPM)** identifies the **longest sequence of dependent tasks** from start to finish. That sequence determines the **minimum project duration**. Any delay on the critical path delays the whole project. Tasks off the critical path have **float (slack)**: they can slip some amount without delaying the finish.

**Worked example.** A plan update has these tasks:

| Task | Duration | Depends on |
|---|---|---|
| A. Existing conditions | 3 months | — |
| B. Engagement round 1 | 2 months | — |
| C. Alternatives | 2 months | A and B |
| D. Draft plan | 3 months | C |
| E. Design website | 1 month | — |

Path A → C → D = 3 + 2 + 3 = **8 months** (the critical path). Path B → C → D = 7 months, so B has **1 month of float**. Task E has lots of float. If existing conditions slip by a month, the whole project slips by a month.

Another technique, **PERT** (Program Evaluation and Review Technique), estimates task durations from optimistic, most likely, and pessimistic values, to account for uncertainty.

:::figure fig-critical-path | The worked example as a Gantt chart over 8 months. A, existing conditions, runs months 0 to 3; C, alternatives, months 3 to 5; and D, draft plan, months 5 to 8. These three are the critical path, highlighted. B, engagement, runs months 0 to 2 with 1 month of float before C can start. E, website, runs month 0 to 1 with 7 months of float. A note says the critical path A, C, D takes 8 months.
The red bars have no float: any slip in A, C, or D pushes the finish date; B and E can slip within their dashed lines.
:::

:::checkpoint cp:pm-float

### Procurement

Public agencies buy consulting services through formal procurement. The main solicitation types are:

| Solicitation | Selection basis | Typical use |
|---|---|---|
| **Request for qualifications (RFQ)** | **Qualifications before price**: firm experience, staff, past performance | Professional services; shortlisting; on-call lists |
| **Request for proposals (RFP)** | Proposed approach, qualifications, and usually price, weighed together | Professional services where approach matters |
| **Invitation for bids (IFB)** | **Lowest responsive, responsible bid** | Clearly defined goods or construction |

- A **two-step RFQ–RFP** process **shortlists firms on qualifications**, then asks only the shortlisted firms for detailed proposals.
- **Qualifications-based selection (QBS)** means the agency **ranks firms on qualifications, then negotiates a fee** with the top-ranked firm (moving to the next firm if negotiations fail). Federal law requires QBS for architecture and engineering services on federally funded projects, and many states follow similar rules. <!-- VERIFY: the federal QBS requirement for A/E services comes from the Brooks Act (1972); confirm it applies to the planning services in question. -->
- Selection must be fair and documented: published criteria, a conflict-free evaluation panel, scoring records, and no private contact with competing firms during the process.

:::figure fig-selection-funnel | The two-step selection from the example below, as a funnel. 11 RFQ responses, scored on qualifications; 3 shortlisted, with full proposals and interviews; 1 top firm, with which the county negotiates the fee. A note says qualifications first, price last.
Price enters only at the bottom, in a negotiation with the top-ranked firm, which is the point of qualifications-based selection.
:::

:::checkpoint cp:pm-ifb

### Contract types

- **Fixed price (lump sum)**: one price for the defined scope. The consultant carries the cost risk, so it suits well-defined work.
- **Time and materials**: payment for hours and expenses, often with a **not-to-exceed** cap. It suits uncertain scope.
- **Cost-plus**: costs plus a fee. It's rare for planning work.

### Managing consultants

Managing an external consultant well requires:

- **clear deliverables and milestones** in the contract, with invoices tied to progress;
- a **single point of contact** on each side;
- regular **progress meetings and written reports**;
- realistic **review time** for agency staff built into the schedule;
- early warning of problems, and a documented change-order process; and
- **evaluation at closeout**, to inform future selections.

:::checkpoint cp:pm-consultant-invoices

### Quality control

**Quality assurance (QA)** is the set of processes that prevent errors (templates, standards, training). **Quality control (QC)** checks work products **before release**. For planning deliverables, the most reliable QA/QC is **structured peer review**: a qualified colleague not involved in the work reviews it against a checklist (data sources, calculations, maps, consistency with adopted policy, plain language, accessibility) before it goes to the public or decision-makers.

:::checkpoint cp:pm-qa-vs-qc

## Key terms

- **Scope of work**: A document defining a project's objectives, tasks, deliverables, schedule, budget, and roles.
- **Deliverable**: A defined work product due under a scope or contract.
- **Milestone**: A significant point or event in a schedule.
- **Scope creep**: Uncontrolled growth in a project's scope.
- **Change order**: A documented, agreed change to the scope, cost, or schedule of a contract.
- **Gantt chart**: A bar chart showing tasks and durations on a timeline.
- **Critical path**: The longest sequence of dependent tasks, which sets the minimum project duration.
- **Float (slack)**: The time a task can be delayed without delaying the project.
- **Request for qualifications (RFQ)**: A solicitation evaluating firms' qualifications before price.
- **Request for proposals (RFP)**: A solicitation evaluating proposed approach, qualifications, and usually price.
- **Qualifications-based selection (QBS)**: Ranking firms on qualifications, then negotiating a fee with the top firm.
- **Not-to-exceed**: A contract cap on total payment.
- **Quality control (QC)**: Checking work products for errors before release.

## Real-world examples

**Controlling scope creep.** Midway through a downtown plan, council members ask the consultant to add a parking study. The project manager documents the request, gets a cost and schedule estimate from the consultant, and brings a change order to the city manager for approval. The parking study is added with its own budget, and the plan's schedule is extended by six weeks, openly rather than by surprise.

**A two-step selection.** A county issues an RFQ for its comprehensive plan update and receives 11 responses. A panel scores them against published criteria and shortlists three firms, which submit full proposals and interview. The top-ranked firm is selected, and the county negotiates the final fee and scope.

**Peer review catches an error.** Before a housing needs report is released, a senior planner reviews it against the department's QC checklist and finds that one table used household counts where it should have used housing units. The error is fixed before the report reaches the commission.

## Exam tips

- The **critical path** is the longest chain of dependent tasks and sets the minimum duration.
- A **Gantt chart** shows tasks and durations on a timeline.
- An **RFQ** evaluates qualifications before price. **QBS** ranks firms on qualifications, then negotiates a fee with the top firm.
- Scope creep is controlled by a **clear scope plus a change-order process**.
- The best QA/QC is **structured peer review before release**.

## Summary

A clear scope of work, with tasks, deliverables, schedule, budget, roles, and assumptions, is the foundation of project management, and a change-order process controls scope creep. Gantt charts show tasks on a timeline; the critical path is the longest chain of dependent tasks and sets the minimum duration. RFQs evaluate qualifications before price, RFPs weigh approach and price, and IFBs award to the lowest responsive, responsible bid. QBS ranks on qualifications, then negotiates a fee. Manage consultants through clear deliverables, milestones, and communication, and use structured peer review before releasing any work product.
