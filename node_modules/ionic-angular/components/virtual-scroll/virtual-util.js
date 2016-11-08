import { CSS } from '../../util/dom';
export function processRecords(stopAtHeight, records, cells, headerFn, footerFn, data) {
    var record;
    var startRecordIndex;
    var previousCell;
    var tmpData;
    var lastRecordIndex = (records.length - 1);
    if (cells.length) {
        previousCell = cells[cells.length - 1];
        if (previousCell.top + previousCell.height > stopAtHeight) {
            return;
        }
        startRecordIndex = (previousCell.record + 1);
    }
    else {
        previousCell = {
            row: 0,
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            tmpl: -1
        };
        startRecordIndex = 0;
    }
    var processedTotal = 0;
    for (var recordIndex = startRecordIndex; recordIndex <= lastRecordIndex; recordIndex++) {
        record = records[recordIndex];
        if (headerFn) {
            tmpData = headerFn(record, recordIndex, records);
            if (tmpData !== null) {
                previousCell = addCell(previousCell, recordIndex, TEMPLATE_HEADER, tmpData, data.hdrWidth, data.hdrHeight, data.viewWidth);
                cells.push(previousCell);
            }
        }
        previousCell = addCell(previousCell, recordIndex, TEMPLATE_ITEM, null, data.itmWidth, data.itmHeight, data.viewWidth);
        cells.push(previousCell);
        if (footerFn) {
            tmpData = footerFn(record, recordIndex, records);
            if (tmpData !== null) {
                previousCell = addCell(previousCell, recordIndex, TEMPLATE_FOOTER, tmpData, data.ftrWidth, data.ftrHeight, data.viewWidth);
                cells.push(previousCell);
            }
        }
        if (previousCell.record === lastRecordIndex) {
            previousCell.isLast = true;
        }
        processedTotal++;
        if (previousCell.top + previousCell.height + data.itmHeight > stopAtHeight && processedTotal > 3) {
            return;
        }
    }
}
function addCell(previousCell, recordIndex, tmpl, tmplData, cellWidth, cellHeight, viewportWidth) {
    var newCell;
    if (previousCell.left + previousCell.width + cellWidth > viewportWidth) {
        newCell = {
            record: recordIndex,
            tmpl: tmpl,
            row: (previousCell.row + 1),
            width: cellWidth,
            height: cellHeight,
            top: (previousCell.top + previousCell.height),
            left: 0,
            reads: 0,
        };
    }
    else {
        newCell = {
            record: recordIndex,
            tmpl: tmpl,
            row: previousCell.row,
            width: cellWidth,
            height: cellHeight,
            top: previousCell.top,
            left: (previousCell.left + previousCell.width),
            reads: 0,
        };
    }
    if (tmplData) {
        newCell.data = tmplData;
    }
    return newCell;
}
export function populateNodeData(startCellIndex, endCellIndex, viewportWidth, scrollingDown, cells, records, nodes, viewContainer, itmTmp, hdrTmp, ftrTmp, initialLoad) {
    var madeChanges = false;
    var node;
    var availableNode;
    var cell;
    var isAlreadyRendered;
    var lastRecordIndex = (records.length - 1);
    var viewInsertIndex = null;
    var totalNodes = nodes.length;
    var templateRef;
    startCellIndex = Math.max(startCellIndex, 0);
    endCellIndex = Math.min(endCellIndex, cells.length - 1);
    for (var cellIndex = startCellIndex; cellIndex <= endCellIndex; cellIndex++) {
        cell = cells[cellIndex];
        availableNode = null;
        isAlreadyRendered = false;
        if (!initialLoad) {
            for (var i = 0; i < totalNodes; i++) {
                node = nodes[i];
                if (cell.tmpl !== node.tmpl || i === 0 && cellIndex !== 0) {
                    continue;
                }
                else if (node.isLastRecord) {
                    if (cell.record === lastRecordIndex) {
                        availableNode = nodes[i];
                        availableNode.hidden = false;
                        break;
                    }
                    continue;
                }
                if (node.cell === cellIndex) {
                    isAlreadyRendered = true;
                    break;
                }
                if (node.cell < startCellIndex || node.cell > endCellIndex) {
                    if (!availableNode) {
                        availableNode = nodes[i];
                    }
                    else if (scrollingDown) {
                        if (node.cell < availableNode.cell) {
                            availableNode = nodes[i];
                        }
                    }
                    else {
                        if (node.cell > availableNode.cell) {
                            availableNode = nodes[i];
                        }
                    }
                }
            }
            if (isAlreadyRendered) {
                continue;
            }
        }
        if (!availableNode) {
            if (viewInsertIndex === null) {
                viewInsertIndex = -1;
                for (var j = totalNodes - 1; j >= 0; j--) {
                    node = nodes[j];
                    if (node && !node.isLastRecord) {
                        viewInsertIndex = viewContainer.indexOf(node.view);
                        break;
                    }
                }
            }
            templateRef = cell.tmpl === TEMPLATE_HEADER ? hdrTmp : cell.tmpl === TEMPLATE_FOOTER ? ftrTmp : itmTmp;
            if (!templateRef) {
                console.error("virtual" + (cell.tmpl === TEMPLATE_HEADER ? 'Header' : cell.tmpl === TEMPLATE_FOOTER ? 'Footer' : 'Item') + " template required");
                continue;
            }
            availableNode = {
                tmpl: cell.tmpl,
                view: viewContainer.createEmbeddedView(templateRef, new VirtualContext(null, null, null), viewInsertIndex)
            };
            totalNodes = nodes.push(availableNode);
        }
        availableNode.cell = cellIndex;
        availableNode.view.context.$implicit = cell.data || records[cell.record];
        availableNode.view.context.index = cellIndex;
        availableNode.hasChanges = true;
        availableNode.lastTransform = null;
        madeChanges = true;
    }
    if (initialLoad) {
        var lastNodeTempData = (records[lastRecordIndex] || {});
        addLastNodes(nodes, viewContainer, TEMPLATE_HEADER, hdrTmp, lastNodeTempData);
        addLastNodes(nodes, viewContainer, TEMPLATE_ITEM, itmTmp, lastNodeTempData);
        addLastNodes(nodes, viewContainer, TEMPLATE_FOOTER, ftrTmp, lastNodeTempData);
    }
    return madeChanges;
}
function addLastNodes(nodes, viewContainer, templateType, templateRef, temporaryData) {
    if (templateRef) {
        var node = {
            tmpl: templateType,
            view: viewContainer.createEmbeddedView(templateRef),
            isLastRecord: true,
            hidden: true,
        };
        node.view.context.$implicit = temporaryData;
        nodes.push(node);
    }
}
export function initReadNodes(nodes, cells, data) {
    if (nodes.length && cells.length) {
        var firstEle = getElement(nodes[0]);
        cells[0].top = firstEle.clientTop;
        cells[0].left = firstEle.clientLeft;
        cells[0].row = 0;
        updateDimensions(nodes, cells, data, true);
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].hidden) {
                getElement(nodes[i]).classList.add('virtual-hidden');
            }
        }
    }
}
export function updateDimensions(nodes, cells, data, initialUpdate) {
    var node;
    var element;
    var totalCells = cells.length;
    var cell;
    var previousCell;
    for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];
        cell = cells[node.cell];
        if (cell && cell.reads < REQUIRED_DOM_READS && !node.hidden) {
            element = getElement(node);
            readElements(cell, element);
            if (initialUpdate) {
                if (cell.tmpl === TEMPLATE_HEADER) {
                    data.hdrHeight = cell.height;
                    if (cell.left === 0) {
                        data.hdrWidth = cell.width;
                    }
                }
                else if (cell.tmpl === TEMPLATE_FOOTER) {
                    data.ftrHeight = cell.height;
                    if (cell.left === 0) {
                        data.ftrWidth = cell.width;
                    }
                }
                else {
                    data.itmHeight = cell.height;
                    if (cell.left === 0) {
                        data.itmWidth = cell.width;
                    }
                }
            }
            cell.reads++;
        }
    }
    var viewableBottom = (data.scrollTop + data.viewHeight);
    data.topViewCell = totalCells;
    data.bottomViewCell = 0;
    for (var i = 1; i < totalCells; i++) {
        cell = cells[i];
        previousCell = cells[i - 1];
        if (previousCell.left + previousCell.width + cell.width > data.viewWidth) {
            cell.row++;
            cell.top = (previousCell.top + previousCell.height);
            cell.left = 0;
        }
        else {
            cell.row = previousCell.row;
            cell.top = previousCell.top;
            cell.left = (previousCell.left + previousCell.width);
        }
        if (cell.top + cell.height > data.scrollTop && i < data.topViewCell) {
            data.topViewCell = i;
        }
        else if (cell.top < viewableBottom && i > data.bottomViewCell) {
            data.bottomViewCell = i;
        }
    }
}
function readElements(cell, element) {
    var styles = window.getComputedStyle(element);
    cell.left = (element.offsetLeft - parseFloat(styles.marginLeft));
    cell.width = (element.offsetWidth + parseFloat(styles.marginLeft) + parseFloat(styles.marginRight));
    cell.height = (element.offsetHeight + parseFloat(styles.marginTop) + parseFloat(styles.marginBottom));
}
export function writeToNodes(nodes, cells, totalRecords) {
    var node;
    var element;
    var cell;
    var totalCells = Math.max(totalRecords, cells.length).toString();
    var transform;
    for (var i = 0, ilen = nodes.length; i < ilen; i++) {
        node = nodes[i];
        if (!node.hidden) {
            cell = cells[node.cell];
            transform = "translate3d(" + cell.left + "px," + cell.top + "px,0px)";
            if (node.lastTransform !== transform) {
                element = getElement(node);
                if (element) {
                    element.style[CSS.transform] = node.lastTransform = transform;
                    element.classList.add('virtual-position');
                    if (node.isLastRecord) {
                        element.classList.remove('virtual-hidden');
                    }
                    element.setAttribute('aria-posinset', (node.cell + 1).toString());
                    element.setAttribute('aria-setsize', totalCells);
                }
            }
        }
    }
}
export function adjustRendered(cells, data) {
    var cell;
    var lastRow = -1;
    var cellsRenderHeight = 0;
    var maxRenderHeight = (data.renderHeight - data.itmHeight);
    var totalCells = cells.length;
    var viewableRenderedPadding = (data.itmHeight < 90 ? VIEWABLE_RENDERED_PADDING : 0);
    if (data.scrollDiff > 0) {
        data.topCell = Math.max(data.topViewCell - viewableRenderedPadding, 0);
        data.bottomCell = Math.min(data.topCell + 2, totalCells - 1);
        for (var i = data.topCell; i < totalCells; i++) {
            cell = cells[i];
            if (cell.row !== lastRow) {
                cellsRenderHeight += cell.height;
                lastRow = cell.row;
            }
            if (i > data.bottomCell) {
                data.bottomCell = i;
            }
            if (cellsRenderHeight >= maxRenderHeight) {
                break;
            }
        }
    }
    else {
        data.bottomCell = Math.min(data.bottomViewCell + viewableRenderedPadding, totalCells - 1);
        data.topCell = Math.max(data.bottomCell - 2, 0);
        for (var i = data.bottomCell; i >= 0; i--) {
            cell = cells[i];
            if (cell.row !== lastRow) {
                cellsRenderHeight += cell.height;
                lastRow = cell.row;
            }
            if (i < data.topCell) {
                data.topCell = i;
            }
            if (cellsRenderHeight >= maxRenderHeight) {
                break;
            }
        }
    }
}
export function getVirtualHeight(totalRecords, lastCell) {
    if (lastCell.record >= totalRecords - 1) {
        return (lastCell.top + lastCell.height);
    }
    var unknownRecords = (totalRecords - lastCell.record - 1);
    var knownHeight = (lastCell.top + lastCell.height);
    return Math.ceil(knownHeight + ((knownHeight / (totalRecords - unknownRecords)) * unknownRecords));
}
export function estimateHeight(totalRecords, lastCell, existingHeight, difference) {
    var newHeight = getVirtualHeight(totalRecords, lastCell);
    var percentToBottom = (lastCell.record / (totalRecords - 1));
    var diff = Math.abs(existingHeight - newHeight);
    if ((diff > (newHeight * difference)) ||
        (percentToBottom > .995)) {
        return newHeight;
    }
    return existingHeight;
}
export function calcDimensions(data, viewportElement, approxItemWidth, approxItemHeight, appoxHeaderWidth, approxHeaderHeight, approxFooterWidth, approxFooterHeight, bufferRatio) {
    data.viewWidth = viewportElement.offsetWidth;
    data.viewHeight = viewportElement.offsetHeight;
    data.renderHeight = (data.viewHeight * bufferRatio);
    if (data.viewWidth > 0 && data.viewHeight > 0) {
        data.itmWidth = calcWidth(data.viewWidth, approxItemWidth);
        data.itmHeight = calcHeight(data.viewHeight, approxItemHeight);
        data.hdrWidth = calcWidth(data.viewWidth, appoxHeaderWidth);
        data.hdrHeight = calcHeight(data.viewHeight, approxHeaderHeight);
        data.ftrWidth = calcWidth(data.viewWidth, approxFooterWidth);
        data.ftrHeight = calcHeight(data.viewHeight, approxFooterHeight);
        data.valid = true;
    }
}
function calcWidth(viewportWidth, approxWidth) {
    if (approxWidth.indexOf('%') > 0) {
        return (viewportWidth * (parseFloat(approxWidth) / 100));
    }
    else if (approxWidth.indexOf('px') > 0) {
        return parseFloat(approxWidth);
    }
    throw 'virtual scroll width can only use "%" or "px" units';
}
function calcHeight(viewportHeight, approxHeight) {
    if (approxHeight.indexOf('px') > 0) {
        return parseFloat(approxHeight);
    }
    throw 'virtual scroll height must use "px" units';
}
function getElement(node) {
    var rootNodes = node.view.rootNodes;
    for (var i = 0; i < rootNodes.length; i++) {
        if (rootNodes[i].nodeType === 1) {
            return rootNodes[i];
        }
    }
    return null;
}
export var VirtualContext = (function () {
    function VirtualContext($implicit, index, count) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
    }
    Object.defineProperty(VirtualContext.prototype, "first", {
        get: function () { return this.index === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualContext.prototype, "last", {
        get: function () { return this.index === this.count - 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualContext.prototype, "even", {
        get: function () { return this.index % 2 === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualContext.prototype, "odd", {
        get: function () { return !this.even; },
        enumerable: true,
        configurable: true
    });
    return VirtualContext;
}());
var TEMPLATE_ITEM = 0;
var TEMPLATE_HEADER = 1;
var TEMPLATE_FOOTER = 2;
var VIEWABLE_RENDERED_PADDING = 3;
var REQUIRED_DOM_READS = 2;
//# sourceMappingURL=virtual-util.js.map