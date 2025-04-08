import { Mastra } from '@mastra/core';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import server from "./mcp-server.js";

export const mastra = new Mastra()

const transport = new StdioServerTransport();
await server.connect(transport);
