import  { CategoryCode, Learning,type LearningRepository, LevelCode } from "@domain/index";

export class LearningRepositoryImpl implements LearningRepository{
    async listBy(category: CategoryCode, codeLevel: LevelCode): Promise<Learning[]> {
        const learnigs = await this.getLearnings(category)
        const mapValue: Record<LevelCode, LearningItem[]> = {
            [LevelCode.basic]: learnigs.basic,
            [LevelCode.medium]: learnigs.medium
        };
        const result = (mapValue[codeLevel] ?? []).map(item => new Learning(item.title, item.description, item.index))
        return result
    }

    private getLearnings(category: string): Promise<LearningDto> {
        let request = <RequestInit>{
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        };
        return new Promise<LearningDto>((resolve, reject) => {
            fetch(`/assets/files/${category}_learning.json`, request)
              .then((response: Response) => response.json())
              .then((data) => resolve(data))
              .catch((error) => reject(error));
        })
    }
}

export interface LearningDto{
    basic: Array<LearningItem>,
    medium: Array<LearningItem>
}

export interface LearningItem{
    title: string;
    description: string;
    index: number;
}