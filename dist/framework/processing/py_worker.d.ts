declare function runCycle(payload: any): void;
declare function unwrap(response: any): Promise<any>;
declare function copyFileToPyFS(file: any, resolve: any): void;
declare function initialise(): any;
declare function startPyodide(): any;
declare function loadPackages(): any;
declare function installPortPackage(): any;
declare function generateErrorMessage(stacktrace: any): {
    __type__: string;
    page: {
        __type__: string;
        stacktrace: any;
    };
};
declare let pyScript: any;
