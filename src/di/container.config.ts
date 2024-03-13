import type { AppModules } from ".";

export class Container {
    private dependencies: Record<string, any> = {};
    register(key: AppModules, value: any) {
        this.dependencies[key] = value;
    }

    resolve<T>(key: AppModules): T {
        return this.dependencies[key];
    }
}