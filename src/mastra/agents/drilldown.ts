import { Agent } from "@mastra/core/agent";
import { openai } from '@ai-sdk/openai';
import { z } from "zod";

const DrilldownResultSchema = z.object({
    input_data: z.string(),
    drilldowned_problems: z.array(z.string()),
    questions: z.array(z.string()),
    solved: z.boolean()
});

type DrilldownResult = z.infer<typeof DrilldownResultSchema>;

const drilldownAgent = new Agent({
    name: "Drilldown Agent",
    instructions: `あなたは要件定義の専門家です。以下のタスクを実行してください：
    1. 抽象度の高い要件を具体的な実装要件に分解する
    2. 不明瞭な箇所を特定し、質問票を作成する
    3. 実装開始の可否を判定する
    4. 結果を構造化された形式で出力する`,
    model: openai("gpt-4o-mini"),
});

const resultAgent = new Agent({
    name: "Result Agent",
    instructions: `以下のフォーマットに基づいて、与えられた文章を整形して json 形式で出力してください。
    json のみ出力し、無駄な応答はしないでください。
    フォーマット: {input_data: string, drilldowned_problems: string[], questions: string[], solved: boolean}`,
    model: openai("gpt-4o-mini"),
});

export const drilldown = async (input: string): Promise<DrilldownResult> => {
    const drilldownResult = await drilldownAgent.generate(input);
    const result = await resultAgent.generate(drilldownResult.text);
    return DrilldownResultSchema.parse(JSON.parse(result.text));
};


