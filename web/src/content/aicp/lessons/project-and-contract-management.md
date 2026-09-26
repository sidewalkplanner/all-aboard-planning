## Learning objectives

- Write a scope of work and use a change-order process to control scope creep.
- Read a Gantt chart and find a project's critical path and float.
- Distinguish RFQs, RFPs, and invitations for bids, and explain qualifications-based selection.
- Choose an appropriate contract type and manage a consultant effectively.
- Describe quality assurance and quality control for planning deliverables.
- Identify and respond to project risks, and track cost and schedule with earned value.
- Manage external relationships through memoranda of understanding and intergovernmental agreements.

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

Large projects break the scope into a **work breakdown structure (WBS)**: the whole project divided into deliverables, then into smaller work packages that can be assigned, scheduled, and priced. If something isn't in the WBS, it isn't in the project.

Scope, schedule, and budget are linked, a relationship often called the **triple constraint** (or iron triangle). Change one and at least one of the others has to give: more scope needs more time or money, and a shorter schedule needs more money or less scope. Quality depends on keeping all three in balance.

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

### Managing risk

Every project has things that could go wrong: a key data set arrives late, a council election changes priorities, a consultant's lead planner leaves. A **risk register** lists each risk with its **likelihood**, its **impact**, an **owner**, and a planned response. The four standard responses:

- **Avoid**: change the plan so the risk can't happen (drop a task that depends on unreliable data).
- **Mitigate**: reduce its likelihood or impact (start the survey early, build in review time).
- **Transfer**: shift it to another party (a fixed-price contract transfers cost risk to the consultant).
- **Accept**: live with it, usually with a contingency in time or budget.

Review the register at regular project meetings; risks change as the project moves.

:::checkpoint cp:pm-risk

### Procurement

Public agencies buy consulting services through formal procurement. The main solicitation types are:

| Solicitation | Selection basis | Typical use |
|---|---|---|
| **Request for qualifications (RFQ)** | **Qualifications before price**: firm experience, staff, past performance | Professional services; shortlisting; on-call lists |
| **Request for proposals (RFP)** | Proposed approach, qualifications, and usually price, weighed together | Professional services where approach matters |
| **Invitation for bids (IFB)** | **Lowest responsive, responsible bid** | Clearly defined goods or construction |

- A **two-step RFQ–RFP** process **shortlists firms on qualifications**, then asks only the shortlisted firms for detailed proposals.
- **Qualifications-based selection (QBS)** means the agency **ranks firms on qualifications, then negotiates a fee** with the top-ranked firm (moving to the next firm if negotiations fail). Federal law requires QBS for architecture and engineering services on federally funded projects, and many states follow similar rules. <!-- VERIFY: the federal QBS requirement for A/E services comes from the Brooks Act (1972); confirm it applies to the planning services in question. -->
- **Sole-source** (noncompetitive) procurement is allowed only in narrow cases, such as when just one qualified source exists or in a genuine emergency, and must be justified in writing. Small purchases below thresholds set by law or policy can use simpler quotes.
- Selection must be fair and documented: published criteria, a conflict-free evaluation panel, scoring records, and no private contact with competing firms during the process.

:::figure fig-selection-funnel | The two-step selection from the example below, as a funnel. 11 RFQ responses, scored on qualifications; 3 shortlisted, with full proposals and interviews; 1 top firm, with which the county negotiates the fee. A note says qualifications first, price last.
Price enters only at the bottom, in a negotiation with the top-ranked firm, which is the point of qualifications-based selection.
:::

:::checkpoint cp:pm-ifb

### Contract types

- **Fixed price (lump sum)**: one price for the defined scope. The consultant carries the cost risk, so it suits well-defined work.
- **Time and materials**: payment for hours and expenses, often with a **not-to-exceed** cap. It suits uncertain scope.
- **Cost-plus**: costs plus a fee. It's rare for planning work.

Many contracts also use **retainage**: the agency withholds a small percentage of each payment until the work is complete and accepted, giving the contractor a reason to finish every item.

### Managing consultants

Managing an external consultant well requires:

- **clear deliverables and milestones** in the contract, with invoices tied to progress;
- a **single point of contact** on each side;
- regular **progress meetings and written reports**;
- realistic **review time** for agency staff built into the schedule;
- early warning of problems, and a documented change-order process; and
- **evaluation at closeout**, to inform future selections.

:::checkpoint cp:pm-consultant-invoices

### Tracking progress: earned value

A budget that's 50% spent says nothing on its own: is the work 50% done? **Earned value** compares three numbers at a point in time:

- **Planned value (PV)**: the budgeted cost of the work scheduled to be done by now.
- **Earned value (EV)**: the budgeted cost of the work actually done.
- **Actual cost (AC)**: what the work done actually cost.

**Schedule variance = EV − PV**; a negative number means behind schedule. **Cost variance = EV − AC**; a negative number means over budget. Example: by month six, $60,000 of work was planned, $50,000 worth has been done, and $55,000 has been spent. SV = 50,000 − 60,000 = −$10,000 (behind), and CV = 50,000 − 55,000 = −$5,000 (over budget).

:::try earned-value

:::checkpoint cp:pm-earned-value

### External relationships

Planning projects depend on people outside the project team: other departments, other governments, utilities, the state DOT, community organizations, and elected officials. Managing those relationships is part of the job:

- A **memorandum of understanding (MOU)** records how partners intend to work together, their roles, and their commitments. It's often not legally binding.
- An **intergovernmental (interlocal) agreement** is a binding contract between governments, authorized by state law, for shared services, joint planning, cost-sharing, or boundary issues.
- Keep partners informed on a regular schedule, not only when you need something, and brief elected officials before they read about a project in the news.

:::checkpoint cp:pm-mou

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
- **Work breakdown structure (WBS)**: The project's scope divided into deliverables and assignable work packages.
- **Triple constraint**: The linked limits of scope, schedule, and budget.
- **Risk register**: A list of project risks with likelihood, impact, owner, and response.
- **Sole-source procurement**: Buying from one supplier without competition, allowed only with written justification.
- **Retainage**: A share of each payment withheld until the work is complete.
- **Earned value**: The budgeted cost of the work actually completed, compared with planned value and actual cost.
- **Memorandum of understanding (MOU)**: A document recording partners' roles and intentions, often not legally binding.
- **Intergovernmental (interlocal) agreement**: A binding contract between governments for shared services or joint action.

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
- Risk responses: **avoid, mitigate, transfer, accept**. Earned value: **SV = EV − PV** and **CV = EV − AC**; negative means behind schedule or over budget.

## Summary

A clear scope of work, with tasks, deliverables, schedule, budget, roles, and assumptions, is the foundation of project management, and a change-order process controls scope creep. Gantt charts show tasks on a timeline; the critical path is the longest chain of dependent tasks and sets the minimum duration. RFQs evaluate qualifications before price, RFPs weigh approach and price, and IFBs award to the lowest responsive, responsible bid. QBS ranks on qualifications, then negotiates a fee. Manage consultants through clear deliverables, milestones, and communication, and use structured peer review before releasing any work product. Scope, schedule, and budget move together, so manage risks with a register and track progress with earned value. MOUs record intentions; intergovernmental agreements bind governments.
