import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { drilldown } from "./agents/drilldown.js";

const DrilldownParamsSchema = z.object({
    input_data: z.string().describe("抽象度の高い要件")
});

type DrilldownParams = z.infer<typeof DrilldownParamsSchema>;

const server = new McpServer({
    name: "Drilldown MCP Server",
    version: "1.0.0",
    tools: [
        {
            name: "drilldown",
            description: "抽象度の高い要件を具体的な実装要件に分解し、不明瞭な箇所を特定します",
            parameters: DrilldownParamsSchema,
            handler: async (params: DrilldownParams) => {
                const result = await drilldown(params.input_data);
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(result)
                    }]
                };
            }
        }
    ]
});

export default server; 