import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { drilldownAgent, resultAgent } from "./agents/drilldown";

// Create an MCP server
const server = new McpServer({
  name: "Drilldown MCP Server",
  version: "1.0.0"
});

const drilldownSchema = {
  input_data: z.string()
};

// Add an addition tool
server.tool("drilldown",
  drilldownSchema,
  async ({ input_data }) => {
    const result = await drilldownAgent.generate(input_data)
    const result2 = await resultAgent.generate(result.text)
    return {
      content: [{ type: "text", text: result2.text }]
    }
  }
);
export default server