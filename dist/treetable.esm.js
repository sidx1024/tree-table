// src/index.js
var styles = `
.treetable-wrapper {
  background-color: #fdfcfb;
}

.treetable-container {
  background-color: #fdfcfb;
  border: 1px solid #e3e3e3;
  border-bottom: none;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Lucida Grande", sans-serif;
  color: #1f1f1f;
}

[role="row"] {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
}

.treetable-container > [role="rowgroup"]:last-child > [role="row"]:last-child {
  border-bottom: none;
}

[role="columnheader"],
[role="cell"] {
  position: relative;
  padding: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-right: 1px solid #e3e3e3;
  box-sizing: border-box;
}

[role="columnheader"]:last-child,
[role="cell"]:last-child {
  border-right: none;
}

[role="columnheader"][data-type="numeric"],
[role="cell"][data-type="numeric"] {
  text-align: right;
}

[role="columnheader"] {
  background-color: #f0f3fa;
  cursor: pointer;
  user-select: none;
}

[role="row"]:nth-child(odd) {
  background-color: #f0f3fa;
}

[role="row"]:nth-child(even) {
  background-color: #fdfcfb;
}

[role="row"]:not(.focused):hover {
  background-color: rgba(31, 31, 31, 0.06);
}

[role="row"].focused {
  background-color: #d3e3fd;
}

.treetable-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.treetable-controls input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Lucida Grande", sans-serif;
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  background-color: #fdfcfb;
  color: #1f1f1f;
}

.treetable-controls input::placeholder {
  color: #474747;
}

.treetable-controls input:focus {
  outline: 2px solid #0b57d0;
  outline-offset: 1px;
}

.treetable-controls button {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Lucida Grande", sans-serif;
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  background-color: #fdfcfb;
  color: #1f1f1f;
  cursor: pointer;
}

.treetable-controls button:hover {
    background-color: #f0f3fa;
}

.percentage {
  color: #8f8f8f;
}

.treetable-cell--value-bar {
  position: relative;
  padding: 0 !important;
}

.treetable-cell--value-bar .text-content {
  position: relative;
  z-index: 2;
  padding: 4px;
  display: block;
  color: #1f1f1f;
}

.treetable-cell--value-bar .value-bar {
  position: absolute;
  right: 0;
  top: 0;
  height: calc(100% - 1px);
  background-color: rgb(254, 246, 213);
  border-bottom: 1px solid #facd15;
  z-index: 1;
}

.activity-name {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: calc(var(--depth, 0) * 20px);
}

.source-link {
  color: #474747;
  margin-left: 16px;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: rtl;
  text-align: left;
}

.activity-cell-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.color-box {
  width: 12px;
  height: 12px;
  margin-right: 4px;
  flex-shrink: 0;
  background-color: #8f8f8f; /* Default/fallback color */
  border: 1px solid #e3e3e3;
}

.color-box[data-depth="0"] {
  background-color: #a743ee;
}
.color-box[data-depth="1"] {
  background-color: #eab308;
}
.color-box[data-depth="2"] {
  background-color: #1ea446;
}

.toggle-btn {
  cursor: pointer;
    user-select: none;
    display: inline-block;
    text-align: center;
    height: 14px;
    width: 24px;
}

.icon-container {
display: inline-block;
  position: relative;
      width: 24px;
    height: 11px;
}

.icon-container:empty {
  display: none;
}

.icon-container .treetable-icon {
  top: -6px;
}

.treetable-icon {
    margin-left: 0;
    position: absolute;
    left: 0px;
    width: 24px;
    height: 24px;
}

.toggle-btn .treetable-icon {
  margin-left: 0;
}

.sort-icon--asc .treetable-icon {
  transform: rotate(180deg);
}

.toggle-placeholder {
  visibility: hidden;
}
`;
var icons = {
  arrowDropDown: `<svg class="treetable-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12L6 8H14L10 12Z" fill="black"/></svg>`,
  arrowCollapse: `<svg class="treetable-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14V6L12 10L8 14Z" fill="black"/></svg>`
};
var TreeTable = class {
  constructor(data, options = {}) {
    this.data = data;
    this.originalData = data;
    this.toggleAll(this.data, options.collapsed !== false);
    if (!options.columns) {
      throw new Error("Columns option must be provided.");
    }
    this.columns = options.columns;
    this.columnMaxValues = {};
    this.columns.forEach((column) => {
      if (column.type === "numeric") {
        this.columnMaxValues[column.key] = this._findMaxValue(
          this.data,
          column.key
        );
      }
    });
    this.injectStyles();
    this.focusedNodeIndex = 0;
    this.visibleNodes = [];
    const { sortKey, sortDirection, ...restOptions } = options;
    this.options = {
      sortDirection: {},
      filter: false,
      ...restOptions
    };
    this.sortKey = null;
    if (sortKey) {
      this.sortKey = sortKey;
      const column = this.columns.find((c) => c.key === this.sortKey);
      this.options.sortDirection[this.sortKey] = sortDirection || (column?.type === "text" ? "asc" : "desc");
      this._sortData();
    }
    this.totalValue = this._findMaxValue(this.data, "value");
  }
  _findMaxValue(nodes, key) {
    let max = 0;
    const traverse = (currentNodes) => {
      for (const node of currentNodes) {
        if (node[key] > max) {
          max = node[key];
        }
        if (node.children) {
          traverse(node.children);
        }
      }
    };
    traverse(nodes);
    return max;
  }
  injectStyles() {
    if (document.getElementById("treetable-styles-v1")) {
      return;
    }
    const styleTag = document.createElement("style");
    styleTag.id = "treetable-styles-v1";
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
  }
  render(containerSelector) {
    if (containerSelector && !this.container) {
      this.hostElement = document.querySelector(containerSelector);
      if (!this.hostElement) {
        console.error("TreeTable container not found");
        return;
      }
      this.wrapper = document.createElement("div");
      this.wrapper.className = "treetable-wrapper";
      this.hostElement.appendChild(this.wrapper);
      this.container = document.createElement("div");
      this.container.className = "treetable-container";
      this.container.setAttribute("role", "table");
      this.container.setAttribute("tabindex", 0);
      this.thead = document.createElement("div");
      this.thead.setAttribute("role", "rowgroup");
      this.tbody = document.createElement("div");
      this.tbody.setAttribute("role", "rowgroup");
      this.container.appendChild(this.thead);
      this.container.appendChild(this.tbody);
      this.wrapper.appendChild(this.container);
      this.container.addEventListener("keydown", (e) => this.handleKeyPress(e));
      if (this.options.filter) {
        this.createFilterControl();
      }
    }
    if (!this.container) {
      console.error(
        "TreeTable container not set. Call render() with a selector on the first render."
      );
      return;
    }
    this.thead.innerHTML = "";
    this.tbody.innerHTML = "";
    this.visibleNodes = [];
    this.createHeader();
    this.data.forEach((node) => this.renderNode(node, 0));
    this.updateFocus();
  }
  createHeader() {
    const headerRow = document.createElement("div");
    headerRow.setAttribute("role", "row");
    this.columns.forEach((column) => {
      const header = document.createElement("div");
      header.setAttribute("role", "columnheader");
      header.textContent = column.header;
      header.style.flexBasis = column.basis;
      header.dataset.key = column.key;
      header.dataset.type = column.type;
      header.classList.add("treetable-header");
      header.addEventListener("click", () => this.sort(column.key));
      headerRow.appendChild(header);
    });
    this.thead.appendChild(headerRow);
    this.updateSortIndicators();
  }
  renderNode(node, depth) {
    const row = document.createElement("div");
    row.setAttribute("role", "row");
    row.style.setProperty("--depth", depth);
    const currentNodeIndex = this.visibleNodes.length;
    this.visibleNodes.push(node);
    if (currentNodeIndex === this.focusedNodeIndex) {
      row.classList.add("focused");
    }
    row.addEventListener("click", () => {
      this.focusedNodeIndex = currentNodeIndex;
      this.updateFocus();
    });
    row.title = this.columns.map((col) => `${col.header}: ${node[col.key]}`).join("\n");
    this.columns.forEach((column) => {
      const cell = document.createElement("div");
      cell.setAttribute("role", "cell");
      cell.style.flexBasis = column.basis;
      cell.dataset.type = column.type;
      cell.classList.add("treetable-cell");
      if (column.isTreeColumn) {
        const activityCellContent = document.createElement("div");
        activityCellContent.className = "activity-cell-content";
        const activityWrapper = document.createElement("div");
        activityWrapper.className = "activity-name";
        if (node.children && node.children.length > 0) {
          const toggle = document.createElement("span");
          toggle.className = "toggle-btn";
          const icon = node.collapsed ? icons.arrowCollapse : icons.arrowDropDown;
          toggle.innerHTML = `<div class="icon-container">${icon}</div>`;
          toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleNode(node);
          });
          activityWrapper.appendChild(toggle);
        } else {
          const placeholder = document.createElement("span");
          placeholder.className = "toggle-btn toggle-placeholder";
          activityWrapper.appendChild(placeholder);
        }
        const colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.dataset.depth = depth;
        activityWrapper.appendChild(colorBox);
        const nameSpan = document.createElement("span");
        nameSpan.textContent = node[column.key];
        activityWrapper.appendChild(nameSpan);
        activityCellContent.appendChild(activityWrapper);
        if (column.secondaryKey && node[column.secondaryKey]) {
          const secondarySpan = document.createElement("span");
          secondarySpan.className = "source-link";
          secondarySpan.textContent = node[column.secondaryKey];
          activityCellContent.appendChild(secondarySpan);
        }
        cell.appendChild(activityCellContent);
      } else if (column.type === "numeric") {
        cell.classList.add("treetable-cell--value-bar");
        const value = node[column.key];
        const totalForColumn = this.columnMaxValues[column.key];
        const percent = totalForColumn > 0 ? value / totalForColumn * 100 : 0;
        let textContentHTML = `<span>${typeof value === "number" ? value.toFixed(1) : value}</span>`;
        if (column.hidePercentage !== true) {
          textContentHTML += ` <span class="percentage">(${percent.toFixed(
            1
          )}%)</span>`;
        }
        const textContent = document.createElement("div");
        textContent.className = "text-content";
        textContent.innerHTML = textContentHTML;
        const valueBar = document.createElement("div");
        valueBar.className = "value-bar";
        valueBar.style.width = `${percent.toFixed(1)}%`;
        cell.appendChild(textContent);
        cell.appendChild(valueBar);
      } else {
        cell.textContent = node[column.key] || "";
      }
      row.appendChild(cell);
    });
    this.tbody.appendChild(row);
    if (node.children && !node.collapsed) {
      node.children.forEach((child) => this.renderNode(child, depth + 1));
    }
  }
  updateFocus() {
    const rows = this.container.querySelectorAll('[role="row"]');
    rows.forEach((row, index) => {
      if (row.parentElement.getAttribute("role") !== "rowgroup" || index === 0)
        return;
      if (index - 1 === this.focusedNodeIndex) {
        row.classList.add("focused");
        row.scrollIntoView({ block: "nearest" });
      } else {
        row.classList.remove("focused");
      }
    });
  }
  updateSortIndicators() {
    const headers = this.thead.querySelectorAll('[role="columnheader"]');
    headers.forEach((header) => {
      let iconContainer = header.querySelector(".icon-container");
      if (!iconContainer) {
        iconContainer = document.createElement("span");
        iconContainer.className = "icon-container";
        header.appendChild(iconContainer);
      }
      iconContainer.innerHTML = "";
      header.classList.remove("sort-asc", "sort-desc");
      const key = header.dataset.key;
      if (this.sortKey === key) {
        iconContainer.innerHTML = icons.arrowDropDown;
        const directionClass = `sort-${this.options.sortDirection[key]}`;
        header.classList.add(directionClass);
        if (this.options.sortDirection[key] === "asc") {
          iconContainer.classList.add("sort-icon--asc");
        } else {
          iconContainer.classList.remove("sort-icon--asc");
        }
      } else {
        iconContainer.classList.remove("sort-icon--asc");
      }
    });
  }
  handleKeyPress(e) {
    if (e.metaKey && e.key === "f") {
      return;
    }
    if (e.target === this.filterInput) {
      return;
    }
    e.preventDefault();
    if (this.visibleNodes.length === 0) return;
    const currentNode = this.visibleNodes[this.focusedNodeIndex];
    switch (e.key) {
      case "ArrowUp":
        if (this.focusedNodeIndex > 0) {
          this.focusedNodeIndex--;
          this.updateFocus();
        }
        break;
      case "ArrowDown":
        if (this.focusedNodeIndex < this.visibleNodes.length - 1) {
          this.focusedNodeIndex++;
          this.updateFocus();
        }
        break;
      case "ArrowRight":
        if (currentNode.children && currentNode.children.length > 0) {
          if (currentNode.collapsed) {
            this.toggleNode(currentNode);
          } else if (this.focusedNodeIndex < this.visibleNodes.length - 1) {
            this.focusedNodeIndex++;
            this.updateFocus();
          }
        }
        break;
      case "ArrowLeft":
        if (currentNode.children && !currentNode.collapsed) {
          this.toggleNode(currentNode);
        } else {
          const parent = this.findParent(currentNode, this.originalData);
          if (parent) {
            const parentIndex = this.visibleNodes.indexOf(parent);
            if (parentIndex > -1) {
              this.focusedNodeIndex = parentIndex;
              this.updateFocus();
            }
          }
        }
        break;
    }
  }
  findParent(childNode, nodes) {
    for (const node of nodes) {
      if (node.children) {
        if (node.children.includes(childNode)) {
          return node;
        }
        const parent = this.findParent(childNode, node.children);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }
  filter(query) {
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = this.filterData(this.originalData, lowerCaseQuery);
    this.data = filteredData;
    this.render();
  }
  filterData(data, query) {
    return data.map((node) => {
      const children = node.children ? this.filterData(node.children, query) : null;
      if (node.name.toLowerCase().includes(query) || children && children.length > 0) {
        const newNode = { ...node };
        if (children) {
          newNode.children = children;
        }
        return newNode;
      }
      return null;
    }).filter(Boolean);
  }
  toggleNode(node) {
    node.collapsed = !node.collapsed;
    this.render();
  }
  expandAll() {
    this.toggleAll(this.data, false);
    this.render();
  }
  collapseAll() {
    this.toggleAll(this.data, true);
    this.render();
  }
  toggleAll(nodes, collapsed) {
    for (const node of nodes) {
      node.collapsed = collapsed;
      if (node.children) {
        this.toggleAll(node.children, collapsed);
      }
    }
  }
  _sortData() {
    if (!this.sortKey) return;
    const direction = this.options.sortDirection[this.sortKey] === "asc" ? 1 : -1;
    const column = this.columns.find((c) => c.key === this.sortKey);
    if (!column) return;
    const sortNodes = (nodes) => {
      if (!nodes) return;
      nodes.sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        if (column.type === "text") {
          return (valA || "").localeCompare(valB || "") * direction;
        }
        return (parseFloat(valA || 0) - parseFloat(valB || 0)) * direction;
      });
      nodes.forEach((node) => {
        if (node.children) {
          sortNodes(node.children);
        }
      });
    };
    sortNodes(this.data);
  }
  sort(key) {
    if (this.sortKey === key) {
      this.options.sortDirection[key] = this.options.sortDirection[key] === "asc" ? "desc" : "asc";
    } else {
      this.sortKey = key;
      const column = this.columns.find((c) => c.key === key);
      if (column.type === "text") {
        this.options.sortDirection[key] = "asc";
      } else {
        this.options.sortDirection[key] = "desc";
      }
    }
    this._sortData();
    this.render();
  }
  createFilterControl() {
    const controlsContainer = document.createElement("div");
    controlsContainer.className = "treetable-controls";
    const filterInput = document.createElement("input");
    filterInput.type = "text";
    filterInput.placeholder = "Filter...";
    filterInput.addEventListener("input", (e) => this.filter(e.target.value));
    filterInput.addEventListener("blur", () => this.container.focus());
    controlsContainer.appendChild(filterInput);
    const collapseAllBtn = document.createElement("button");
    collapseAllBtn.textContent = "Collapse All";
    collapseAllBtn.addEventListener("click", () => this.collapseAll());
    controlsContainer.appendChild(collapseAllBtn);
    const expandAllBtn = document.createElement("button");
    expandAllBtn.textContent = "Expand All";
    expandAllBtn.addEventListener("click", () => this.expandAll());
    controlsContainer.appendChild(expandAllBtn);
    this.wrapper.insertBefore(controlsContainer, this.container);
    this.filterInput = filterInput;
    return controlsContainer;
  }
};
var src_default = TreeTable;
export {
  src_default as default
};
