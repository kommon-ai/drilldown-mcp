import { Agent } from "@mastra/core/agent";
import { openai } from '@ai-sdk/openai';

const drilldownAgent = new Agent({
    name: "Drilldown Agent",
    instructions: "You are a drilldown agent that drills down into a topic",
    model: openai("gpt-4o-mini"),
});

const resultAgent = new Agent({
    name: "Result Agent",
    instructions: `以下のフォーマットに基づいて、与えられた文章を整形して json 形式で出力してください。
    json のみ出力し、無駄な応答はしないでください。
    フォーマット: {input_data: string, drilldowned_problems: string[], questions: string[], solved: boolean}`,
    model: openai("gpt-4o-mini"),
});


