import TreeTable from "../../dist/treetable.esm.js";

document.addEventListener("DOMContentLoaded", () => {
  const dependencyData = [
    {
      name: "index.tsx",
      path: "src/index.tsx",
      size: 5,
      codeowner: "@-org/team-app-infra",
      children: [
        {
          name: "react-dom",
          path: "node_modules/react-dom",
          size: 120,
          codeowner: "@-org/team-platform",
          children: [],
        },
        {
          name: "App.tsx",
          path: "src/App.tsx",
          size: 15,
          codeowner: "@-org/team-feature-A",
          children: [
            {
              name: "useAuth.ts",
              path: "src/hooks/useAuth.ts",
              size: 8,
              codeowner: "@-org/team-feature-B",
              children: [
                {
                  name: "jwt-decode",
                  path: "node_modules/jwt-decode/index.js",
                  size: 7,
                  codeowner: "@-org/team-platform",
                  children: [],
                },
              ],
            },
            {
              name: "Button.tsx",
              path: "src/components/Button.tsx",
              size: 12,
              codeowner: "@-org/team-design-system",
              children: [
                {
                  name: "@emotion/styled",
                  path: "node_modules/@emotion/styled",
                  size: 22,
                  codeowner: "@-org/team-platform",
                  children: [
                    {
                      name: "@emotion/cache",
                      path: "node_modules/@emotion/cache/dist/cache.cjs.js",
                      size: 11,
                      codeowner: "@-org/team-platform",
                      children: [
                        {
                          name: "stylis",
                          path: "node_modules/stylis/src/index.js",
                          size: 29,
                          codeowner: "@-org/team-platform",
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "Modal.tsx",
              path: "src/components/Modal.tsx",
              size: 25,
              codeowner: "@-org/team-design-system",
              children: [
                {
                  name: "react-focus-lock",
                  path: "node_modules/react-focus-lock/dist/cjs.js",
                  size: 15,
                  codeowner: "@-org/team-platform",
                  children: [],
                },
              ],
            },
            {
              name: "api.ts",
              path: "src/services/api.ts",
              size: 18,
              codeowner: "@-org/team-app-infra",
              children: [
                {
                  name: "axios",
                  path: "node_modules/axios",
                  size: 45,
                  codeowner: "@-org/team-platform",
                  children: [],
                },
              ],
            },
            {
              name: "Header.tsx",
              path: "src/components/Header.tsx",
              size: 30,
              codeowner: "@-org/team-feature-A",
              children: [
                {
                  name: "Logo.svg",
                  path: "src/assets/logo.svg",
                  size: 4,
                  codeowner: "@-org/team-design-system",
                  children: [],
                },
              ],
            },
            {
              name: "UserProfile.tsx",
              path: "src/pages/UserProfile.tsx",
              size: 40,
              codeowner: "@-org/team-feature-B",
              children: [
                {
                  name: "useUser.ts",
                  path: "src/hooks/useUser.ts",
                  size: 10,
                  codeowner: "@-org/team-feature-B",
                  children: [],
                },
                {
                  name: "Avatar.tsx",
                  path: "src/components/Avatar.tsx",
                  size: 14,
                  codeowner: "@-org/team-design-system",
                  children: [],
                },
                {
                  name: "Tabs.tsx",
                  path: "src/components/Tabs.tsx",
                  size: 28,
                  codeowner: "@-org/team-design-system",
                  children: [
                    {
                      name: "useTabs.ts",
                      path: "src/hooks/useTabs.ts",
                      size: 6,
                      codeowner: "@-org/team-design-system",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "vendor.js",
      path: "dist/vendor.js",
      size: 0,
      codeowner: "@-org/team-build",
      children: [
        {
          name: "react",
          path: "node_modules/react",
          size: 75,
          codeowner: "@-org/team-platform",
          children: [
            {
              name: "object-assign",
              path: "node_modules/object-assign/index.js",
              size: 2,
              codeowner: "@-org/team-platform",
              children: [],
            },
          ],
        },
        {
          name: "lodash",
          path: "node_modules/lodash",
          size: 510,
          codeowner: "@-org/team-platform",
          children: [],
        },
        {
          name: "@mui/material",
          path: "node_modules/@mui/material",
          size: 350,
          codeowner: "@-org/team-design-system",
          children: [
            {
              name: "@mui/system",
              path: "node_modules/@mui/system/index.js",
              size: 150,
              codeowner: "@-org/team-design-system",
              children: [
                {
                  name: "@babel/runtime",
                  path: "node_modules/@babel/runtime/helpers/esm/extends.js",
                  size: 1,
                  codeowner: "@-org/team-platform",
                  children: [],
                },
              ],
            },
            {
              name: "prop-types",
              path: "node_modules/prop-types/index.js",
              size: 10,
              codeowner: "@-org/team-platform",
              children: [],
            },
          ],
        },
        {
          name: "date-fns",
          path: "node_modules/date-fns/esm/index.js",
          size: 200,
          codeowner: "@-org/team-shared-utils",
          children: [],
        },
        {
          name: "react-router-dom",
          path: "node_modules/react-router-dom/index.js",
          size: 60,
          codeowner: "@-org/team-platform",
          children: [
            {
              name: "react-router",
              path: "node_modules/react-router/index.js",
              size: 40,
              codeowner: "@-org/team-platform",
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "formatters.ts",
      path: "src/utils/formatters.ts",
      size: 3,
      codeowner: "@-org/team-shared-utils",
      children: [
        {
          name: "date-fns",
          path: "node_modules/date-fns/esm/index.js",
          size: 200,
          codeowner: "@-org/team-shared-utils",
          children: [],
        },
      ],
    },
    {
      name: "Button.module.css",
      path: "src/components/Button.module.css",
      size: 2,
      codeowner: "@-org/team-design-system",
      children: [],
    },
    {
      name: "setupTests.ts",
      path: "src/setupTests.ts",
      size: 4,
      codeowner: "@-org/team-testing",
      children: [
        {
          name: "@testing-library/jest-dom",
          path: "node_modules/@testing-library/jest-dom/index.js",
          size: 30,
          codeowner: "@-org/team-testing",
          children: [],
        },
      ],
    },
    {
      name: "webpack.config.js",
      path: "webpack.config.js",
      size: 10,
      codeowner: "@-org/team-build",
      children: [
        {
          name: "webpack-cli",
          path: "node_modules/webpack-cli/index.js",
          size: 150,
          codeowner: "@-org/team-build",
          children: [],
        },
        {
          name: "ts-loader",
          path: "node_modules/ts-loader/index.js",
          size: 40,
          codeowner: "@-org/team-build",
          children: [],
        },
        {
          name: "html-webpack-plugin",
          path: "node_modules/html-webpack-plugin/index.js",
          size: 60,
          codeowner: "@-org/team-build",
          children: [
            {
              name: "pretty-error",
              path: "node_modules/pretty-error/index.js",
              size: 25,
              codeowner: "@-org/team-build",
              children: [],
            },
          ],
        },
      ],
    },
  ];

  function calculateTotalSize(node) {
    let totalSize = node.size;
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        totalSize += calculateTotalSize(child);
      }
    }
    node.totalSize = totalSize;
    return totalSize;
  }

  dependencyData.forEach((node) => calculateTotalSize(node));

  const treeTable = new TreeTable(dependencyData, {
    filter: true,
    sortKey: "totalSize",
    sortDirection: "desc",
    columns: [
      {
        key: "size",
        header: "Size (kb)",
        basis: "15%",
        type: "numeric",
      },
      {
        key: "totalSize",
        header: "Total Size (kb)",
        basis: "15%",
        type: "numeric",
      },
      {
        key: "name",
        header: "File",
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
  treeTable.render(".treetable-container");
});
