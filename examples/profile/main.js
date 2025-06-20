import TreeTable from "../../dist/treetable.esm.js";

document.addEventListener("DOMContentLoaded", () => {
  const sampleData = [
    {
      name: "Task",
      selfTime: 0.5,
      totalTime: 1234.5,
      source: "script.js:10",
      children: [
        {
          name: "Function Call",
          selfTime: 10.2,
          totalTime: 1200.0,
          source: "script.js:25",
          children: [
            {
              name: "Evaluate Script",
              selfTime: 50.0,
              totalTime: 1100.0,
              source: "framework.js:500",
            },
            {
              name: "Layout",
              selfTime: 150.0,
              totalTime: 150.0,
              source: "browser",
            },
            {
              name: "Paint",
              selfTime: 20.0,
              totalTime: 50.0,
              source: "browser",
              children: [
                {
                  name: "Commit",
                  selfTime: 30.0,
                  totalTime: 30.0,
                  source: "browser",
                },
              ],
            },
          ],
        },
        { name: "Minor GC", selfTime: 20.0, totalTime: 20.0, source: "v8" },
      ],
    },
    {
      name: "Animation Frame Fired",
      selfTime: 2.0,
      totalTime: 800.0,
      source: "browser",
      children: [
        {
          name: "Run Microtasks",
          selfTime: 5.0,
          totalTime: 790.0,
          source: "browser",
          children: [
            {
              name: "Update Layer Tree",
              selfTime: 300.0,
              totalTime: 300.0,
              source: "browser",
            },
            {
              name: "(anonymous)",
              selfTime: 400.0,
              totalTime: 450.0,
              source: "app.js:123",
              children: [
                {
                  name: "s",
                  selfTime: 50.0,
                  totalTime: 50.0,
                  source: "vendor.js:45",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Recalculate Style",
      selfTime: 100.0,
      totalTime: 100.0,
      source: "browser",
    },
    {
      name: "Major GC",
      selfTime: 250.0,
      totalTime: 250.0,
      source: "v8",
    },
    {
      name: "n",
      selfTime: 0.3,
      totalTime: 656.6,
      source: "(index):11:47958",
      children: [
        {
          name: "Function call",
          selfTime: 26.5,
          totalTime: 647.2,
          source: "",
          children: [
            {
              name: "Evaluate script",
              selfTime: 2.0,
              totalTime: 636.0,
              source: "VM341 frame-modern.39372bc3.js:1:458631",
            },
            {
              name: "Profiling overhead",
              selfTime: 632.9,
              totalTime: 632.9,
              source: "",
            },
          ],
        },
      ],
    },
    {
      name: "(anonymous)",
      selfTime: 124.1,
      totalTime: 512.1,
      source: "bundle-app-production-index-e303868....js:41:98803",
      children: [
        {
          name: "IR",
          selfTime: 1.1,
          totalTime: 484.9,
          source: "bundle-app-production-index-e303868....js:41:35206",
        },
        {
          name: "s",
          selfTime: 22.3,
          totalTime: 475.5,
          source: "bundle-app-production-index-e303868....js:161:14293",
        },
      ],
    },
    {
      name: "Recalculate style",
      selfTime: 176.0,
      totalTime: 176.3,
      source: "(index):64:454",
    },
  ];

  const treeTable = new TreeTable(sampleData, {
    filter: true,
    columns: [
      {
        key: "selfTime",
        header: "Self (ms)",
        basis: "15%",
        type: "numeric",
        showPercentage: true,
      },
      {
        key: "totalTime",
        header: "Total (ms)",
        basis: "15%",
        type: "numeric",
        valueBar: true,
      },
      {
        key: "name",
        header: "Activity",
        basis: "70%",
        type: "text",
        isTreeColumn: true,
        secondaryKey: "source",
      },
    ],
  });
  treeTable.render(".treetable-container");
});
