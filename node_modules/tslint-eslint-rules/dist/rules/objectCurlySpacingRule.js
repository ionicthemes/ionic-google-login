"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var Lint = require('tslint/lib/lint');
var OPTION_ALWAYS = 'always';
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new ObjectCurlySpacingWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = {
        always: {
            start: "A space is required after '{'",
            end: "A space is required before '}'"
        },
        never: {
            start: "There should be no space after '{'",
            end: "There should be no space before '}'"
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ObjectCurlySpacingWalker = (function (_super) {
    __extends(ObjectCurlySpacingWalker, _super);
    function ObjectCurlySpacingWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.always = this.hasOption(OPTION_ALWAYS) || (this.getOptions() && this.getOptions().length === 0);
    }
    ObjectCurlySpacingWalker.prototype.visitNode = function (node) {
        var bracedKind = [
            ts.SyntaxKind.ObjectLiteralExpression,
            ts.SyntaxKind.ObjectBindingPattern,
            ts.SyntaxKind.NamedImports,
            ts.SyntaxKind.NamedExports
        ];
        if (bracedKind.indexOf(node.kind) > -1) {
            this.checkSpacingInsideBraces(node);
        }
        _super.prototype.visitNode.call(this, node);
    };
    ObjectCurlySpacingWalker.prototype.checkSpacingInsideBraces = function (node) {
        var text = node.getText();
        if (text.indexOf('\n') !== -1 || text === '{}') {
            return;
        }
        var leadingSpace = text.match(/^\{(\s{0,2})/)[1].length;
        var trailingSpace = text.match(/(\s{0,2})}$/)[1].length;
        if (this.always) {
            if (leadingSpace === 0) {
                this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.always.start));
            }
            if (trailingSpace === 0) {
                this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.always.end));
            }
        }
        else {
            if (leadingSpace > 0) {
                this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING.never.start));
            }
            if (trailingSpace > 0) {
                this.addFailure(this.createFailure(node.getEnd() - 1, 1, Rule.FAILURE_STRING.never.end));
            }
        }
    };
    return ObjectCurlySpacingWalker;
}(Lint.RuleWalker));
