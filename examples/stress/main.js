import TreeTable from "../../dist/treetable.esm.js";

function generateStressData(depth = 0, maxDepth = 6, maxChildren = 8) {
  if (depth >= maxDepth) {
    return [];
  }

  const nodes = [];
  const numChildren = Math.floor(Math.random() * maxChildren) + 1;

  for (let i = 0; i < numChildren; i++) {
    const name = `node-${depth}-${i}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    const value = Math.floor(Math.random() * 1000) + 1;
    const totalValue =
      value + (depth < maxDepth - 1 ? Math.floor(Math.random() * 500) : 0);

    const node = {
      name: name,
      path: `/${name}`,
      value: value,
      totalValue: totalValue,
      codeowner: `@team/${Math.random().toString(36).substring(2, 8)}`,
      children: generateStressData(depth + 1, maxDepth, maxChildren),
    };
    nodes.push(node);
  }

  return nodes;
}

document.addEventListener("DOMContentLoaded", () => {
  console.time("data generation");
  const stressData = generateStressData();
  console.timeEnd("data generation");

  const treeTable = new TreeTable(stressData, {
    filter: true,
    sortKey: "totalValue",
    sortDirection: "desc",
    collapsed: false,
    columns: [
      {
        key: "value",
        header: "Value",
        basis: "15%",
        type: "numeric",
      },
      {
        key: "totalValue",
        header: "Total Value",
        basis: "15%",
        type: "numeric",
      },
      {
        key: "name",
        header: "Node",
        basis: "60%",
        type: "text",
        isTreeColumn: true,
        secondaryKey: "path",
      },
      {
        key: "codeowner",
        header: "Code Owner",
        basis: "20%",
        type: "text",
      },
    ],
  });

  console.time("render");
  treeTable.render(".treetable-container");
  console.timeEnd("render");
});
