import type { ResultStorage } from "..";

export class QuizLocalManager {
   
    constructor() { }

    static restart() {
        localStorage.clear()
    }

    static findResults(categoryCode: string): ResultStorage[] {
        const storedResults = localStorage.getItem(categoryCode);
        let results: ResultStorage[] = storedResults ? JSON.parse(storedResults) : [];
        return results;
    }

    static findIndex(categoryCode: string, categoryLevelCode: string): number {
        let results: ResultStorage[] = this.findResults(categoryCode);
        const existingResultIndex = results.findIndex(
            a => a.categoryCode === categoryCode && a.categoryLevelCode === categoryLevelCode
        );
        return existingResultIndex
    }
    

    static save(request: ResultStorage): void {
        let results: ResultStorage[] = this.findResults(request.categoryCode);
        const existingResultIndex = this.findIndex(request.categoryCode, request.categoryLevelCode)
        if (existingResultIndex !== -1) {
            // Reemplazar el resultado existente si se encuentra
            results[existingResultIndex] = request;
        } else {
            // Agregar un nuevo resultado si no se encuentra
            results.push(request);
        }
        // Actualizar el almacenamiento local
        localStorage.setItem(request.categoryCode, JSON.stringify(results));
    }
}