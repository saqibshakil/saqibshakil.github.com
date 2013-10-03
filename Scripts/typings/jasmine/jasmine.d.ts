// Type definitions for Jasmine 1.2
// Project: http://pivotal.github.com/jasmine/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// DefinitelyTyped: https://github.com/borisyankov/DefinitelyTyped


declare function describe(description: string, specDefinitions: () => void);
declare function xdescribe(description: string, specDefinitions: () => void);

declare function it(expectation: string, assertion: () => void);
declare function it(expectation: string, assertion: (done: (err?: any) => void) => void);
declare function xit(expectation: string, assertion: () => void);

declare function beforeEach(action: () => void);
declare function afterEach(action: () => void);

declare function expect(spy: Function): jasmine.Matchers;
//declare function expect(spy: jasmine.Spy): jasmine.Matchers;
declare function expect(actual: any): jasmine.Matchers;

declare function spyOn(object: any, method: string): jasmine.Spy;

declare function runs(asyncMethod: Function);
declare function waitsFor(latchMethod: () => bool, failureMessage: string, timeout?: number);
declare function waits(timeout?: number);

declare module jasmine {

    var Clock: Clock;

    function any(aclass: any): Any;
    function objectContaining(sample: any): ObjectContaining;
    function createSpy(name: string, originalFn?: Function): Spy;
    function createSpyObj(baseName: string, methodNames: any[]): any;
    function pp(value: any): string;
    function getEnv(): Env;

    interface Any {

        new (expectedClass: any): any;

        jasmineMatches(other: any): bool;
        jasmineToString(): string;
    }

    interface ObjectContaining {
        new (sample: any): any;

        jasmineMatches(other: any, mismatchKeys: any[], mismatchValues: any[]): bool;
        jasmineToString(): string;
    }

    interface Block {

        new (env: Env, func: SpecFunction, spec: Spec): any;

        execute(onComplete: () => void);
    }

    interface WaitsBlock extends Block {
        new (env: Env, timeout: number, spec: Spec): any;
    }

    interface WaitsForBlock extends Block {
        new (env: Env, timeout: number, latchFunction: SpecFunction, message: string, spec: Spec): any;
    }

    interface Clock {
        reset();
        tick(millis: number);
        runFunctionsWithinRange(oldMillis: number, nowMillis: number);
        scheduleFunction(timeoutKey: any, funcToCall: () => void, millis: number, recurring: bool);
        useMock();
        installMock();
        uninstallMock();
        real;
        assertInstalled();
        isInstalled(): bool;
        installed: any;
    }

    interface Env {
        setTimeout: any;
        clearTimeout;
        setInterval: any;
        clearInterval;
        updateInterval: number;

        currentSpec: Spec;

        matchersClass: Matchers;

        version(): any;
        versionString(): string;
        nextSpecId(): number;
        addReporter(reporter: Reporter);
        execute();
        describe(description: string, specDefinitions: () => void): Suite;
        beforeEach(beforeEachFunction: () => void);
        currentRunner(): Runner;
        afterEach(afterEachFunction: () => void);
        xdescribe(desc: string, specDefinitions: () => void): XSuite;
        it(description: string, func: () => void): Spec;
        xit(desc: string, func: () => void): XSpec;
        compareRegExps_(a: RegExp, b: RegExp, mismatchKeys: string[], mismatchValues: string[]): bool;
        compareObjects_(a: any, b: any, mismatchKeys: string[], mismatchValues: string[]): bool;
        equals_(a: any, b: any, mismatchKeys: string[], mismatchValues: string[]): bool;
        contains_(haystack: any, needle: any): bool;
        addEqualityTester(equalityTester: (a: any, b: any, env: Env, mismatchKeys: string[], mismatchValues: string[]) => bool);
        specFilter(spec: Spec): bool;
    }

    interface FakeTimer {

        new (): any;

        reset();
        tick(millis: number);
        runFunctionsWithinRange(oldMillis: number, nowMillis: number);
        scheduleFunction(timeoutKey: any, funcToCall: () => void, millis: number, recurring: bool);
    }

    interface HtmlReporter {
        new (): any;
    }

    interface Result {
        type: string;
    }

    interface NestedResults extends Result {
        description: string;

        totalCount: number;
        passedCount: number;
        failedCount: number;

        skipped: bool;

        rollupCounts(result: NestedResults);
        log(values: any);
        getItems(): Result[];
        addResult(result: Result);
        passed(): bool;
    }

    interface MessageResult extends Result  {
        values: any;
        trace: Trace;
    }

    interface ExpectationResult extends Result  {
        matcherName: string;
        passed(): bool;
        expected: any;
        actual: any;
        message: string;
        trace: Trace;
    }

    interface Trace {
        name: string;
        message: string;
        stack: any;
    }

    interface PrettyPrinter {

        new (): any;

        format(value: any);
        iterateObject(obj: any, fn: (property: string, isGetter: bool) => void);
        emitScalar(value: any);
        emitString(value: string);
        emitArray(array: any[]);
        emitObject(obj: any);
        append(value: any);
    }

    interface StringPrettyPrinter extends PrettyPrinter {
    }

    interface Queue {

        new (env: any): any;

        env: Env;
        ensured: bool[];
        blocks: Block[];
        running: bool;
        index: number;
        offset: number;
        abort: bool;

        addBefore(block: Block, ensure?: bool);
        add(block: any, ensure?: bool);
        insertNext(block: any, ensure?: bool);
        start(onComplete?: () => void);
        isRunning(): bool;
        next_();
        results(): NestedResults;
    }

    interface Matchers {

        new (env: Env, actual: any, spec: Env, isNot?: bool): any;

        env: Env;
        actual: any;
        spec: Env;
        isNot?: bool;
        message(): any;

        toBe(expected: any): bool;
        toNotBe(expected: any): bool;
        toEqual(expected: any): bool;
        toNotEqual(expected: any): bool;
        toMatch(expected: any): bool;
        toNotMatch(expected: any): bool;
        toBeDefined(): bool;
        toBeUndefined(): bool;
        toBeNull(): bool;
        toBeNaN(): bool;
        toBeTruthy(): bool;
        toBeFalsy(): bool;
        toHaveBeenCalled(): bool;
        wasNotCalled(): bool;
        toHaveBeenCalledWith(...params: any[]): bool;
        toContain(expected: any): bool;
        toNotContain(expected: any): bool;
        toBeLessThan(expected: any): bool;
        toBeGreaterThan(expected: any): bool;
        toBeCloseTo(expected: any, precision: any): bool;
        toContainHtml(expected: string): bool;
        toContainText(expected: string): bool;
        toThrow(expected?: any): bool;
        not: Matchers;

        Any: Any;
    }

    interface Reporter {
        reportRunnerStarting(runner: Runner);
        reportRunnerResults(runner: Runner);
        reportSuiteResults(suite: Suite);
        reportSpecStarting(spec: Spec);
        reportSpecResults(spec: Spec);
        log(str: string);
    }

    interface MultiReporter extends Reporter {
        addReporter(reporter: Reporter);
    }

    interface Runner {

        new (env: Env): any;

        execute();
        beforeEach(beforeEachFunction: SpecFunction);
        afterEach(afterEachFunction: SpecFunction);
        finishCallback();
        addSuite(suite: Suite);
        add(block: Block);
        specs(): Spec[];
        suites(): Suite[];
        topLevelSuites(): Suite[];
        results(): NestedResults;
    }

    interface SpecFunction {
        (spec?: Spec);
    }

    interface SuiteOrSpec {
        id: number;
        env: Env;
        description: string;
        queue: Queue;
    }

    interface Spec extends SuiteOrSpec {

        new (env: Env, suite: Suite, description: string): any;

        suite: Suite;

        afterCallbacks: SpecFunction[];
        spies_: Spy[];

        results_: NestedResults;
        matchersClass: Matchers;

        getFullName(): string;
        results(): NestedResults;
        log(arguments: any): any;
        runs(func: SpecFunction): Spec;
        addToQueue(block: Block);
        addMatcherResult(result: Result);
        expect(actual: any): any;
        waits(timeout: number): Spec;
        waitsFor(latchFunction: SpecFunction, timeoutMessage?: string, timeout?: number): Spec;
        fail(e?: any);
        getMatchersClass_(): Matchers;
        addMatchers(matchersPrototype: any);
        finishCallback();
        finish(onComplete?: () => void);
        after(doAfter: SpecFunction);
        execute(onComplete?: () => void): any;
        addBeforesAndAftersToQueue();
        explodes();
        spyOn(obj: any, methodName: string, ignoreMethodDoesntExist: bool): Spy;
        removeAllSpies();
    }

    interface XSpec {
        id: number;
        runs();
    }

    interface Suite extends SuiteOrSpec {

        new (env: Env, description: string, specDefinitions: () => void, parentSuite: Suite): any;

        parentSuite: Suite;

        getFullName(): string;
        finish(onComplete?: () => void);
        beforeEach(beforeEachFunction: SpecFunction);
        afterEach(afterEachFunction: SpecFunction);
        results(): NestedResults;
        add(suiteOrSpec: SuiteOrSpec);
        specs(): Spec[];
        suites(): Suite[];
        children(): any[];
        execute(onComplete?: () => void);
    }

    interface XSuite {
        execute();
    }

    interface Spy {
        (...params: any[]): any;

        identity: string;
        calls: any[];
        mostRecentCall: { args: any[]; };
        argsForCall: any[];
        wasCalled: bool;
        callCount: number;

        andReturn(value: any): Spy;
        andCallThrough(): Spy;
        andCallFake(fakeFunc: Function): Spy;
    }

    interface Util {
        inherit(childClass: Function, parentClass: Function): any;
        formatException(e: any): any;
        htmlEscape(str: string): string;
        argsToArray(args: any): any;
        extend(destination: any, source: any): any;
    }

    interface JsApiReporter extends Reporter {

        started: bool;
        finished: bool;
        result: any;
        messages: any;

        new (): any;

        suites(): Suite[];
        summarize_(suiteOrSpec: SuiteOrSpec): any;
        results(): any;
        resultsForSpec(specId: any): any;
        log(str: any): any;
        resultsForSpecs(specIds: any): any;
        summarizeResult_(result: any): any;
    }

    interface Jasmine {
        Spec: Spec;
        Clock: Clock;
        util: Util;
    }

    export var HtmlReporter: any;
}
