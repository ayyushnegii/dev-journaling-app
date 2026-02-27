'use server';
/**
 * @fileOverview This file defines a Genkit flow to generate a mindmap structure from detected topics and their connections.
 * It takes a list of topics with frequency scores and connections with weights, and outputs a structured mindmap
 * with nodes (topics categorized and sized by frequency) and edges (connections with strength).
 *
 * - generateIdeaMindmap - A function that handles the generation of the mindmap structure.
 * - GenerateIdeaMindmapInput - The input type for the generateIdeaMindmap function.
 * - GenerateIdeaMindmapOutput - The return type for the generateIdeaMindmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema for generating the idea mindmap
const GenerateIdeaMindmapInputSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string().describe('Unique identifier for the topic.'),
      name: z.string().describe('The name of the topic.'),
      frequency_score: z.number().describe('A score indicating how frequently this topic appears in journal entries.'),
    })
  ).describe('A list of detected topics from journal entries, with their unique IDs, names, and frequency scores.'),
  connections: z.array(
    z.object({
      sourceTopicId: z.string().describe('The ID of the source topic in the connection.'),
      targetTopicId: z.string().describe('The ID of the target topic in the connection.'),
      weight: z.number().describe('A numeric value representing the strength or relevance of the connection between the two topics.'),
    })
  ).describe('A list of detected connections between topics, including the IDs of the connected topics and the connection weight.'),
});

export type GenerateIdeaMindmapInput = z.infer<typeof GenerateIdeaMindmapInputSchema>;

// Output Schema for the generated idea mindmap
const GenerateIdeaMindmapOutputSchema = z.object({
  nodes: z.array(
    z.object({
      id: z.string().describe('Unique identifier for the node (topic).'),
      name: z.string().describe('The display name of the node.'),
      category: z.string().describe('Categorization of the topic, e.g., "Dev Log", "Core", "Personal", "Health", "Work", "Ideas", "Misc", based on its name and context. Pick the most relevant category.'),
      size: z.number().int().min(1).max(100).describe('A numeric value (1-100) representing the relative importance or frequency of the topic. Scale frequency_score to this range.'),
    })
  ).describe('A list of nodes for the mindmap, each representing a topic with its assigned category and relative size.'),
  edges: z.array(
    z.object({
      source: z.string().describe('The ID of the source node.'),
      target: z.string().describe('The ID of the target node.'),
      strength: z.number().int().min(1).max(100).describe('A numeric value (1-100) representing the relative strength of the connection between the two topics. Scale connection weight to this range.'),
    })
  ).describe('A list of edges for the mindmap, each representing a connection between two nodes with its relative strength.'),
});

export type GenerateIdeaMindmapOutput = z.infer<typeof GenerateIdeaMindmapOutputSchema>;

// Wrapper function to call the Genkit flow
export async function generateIdeaMindmap(
  input: GenerateIdeaMindmapInput
): Promise<GenerateIdeaMindmapOutput> {
  return generateIdeaMindmapFlow(input);
}

// Prompt definition for the LLM
const generateIdeaMindmapPrompt = ai.definePrompt({
  name: 'generateIdeaMindmapPrompt',
  input: { schema: GenerateIdeaMindmapInputSchema },
  output: { schema: GenerateIdeaMindmapOutputSchema },
  prompt: `You are an AI assistant specialized in organizing and visualizing ideas for mind maps.
Your task is to transform raw topic and connection data into a structured mindmap format suitable for visualization.

Here are the topics and their frequency scores:
{{#if topics}}
  {{#each topics}}
    - ID: {{this.id}}, Name: {{this.name}}, Frequency: {{this.frequency_score}}
  {{/each}}
{{else}}
  No topics provided.
{{/if}}

Here are the connections between topics and their weights:
{{#if connections}}
  {{#each connections}}
    - Source ID: {{this.sourceTopicId}}, Target ID: {{this.targetTopicId}}, Weight: {{this.weight}}
  {{/each}}
{{else}}
  No connections provided.
{{/if}}

Based on this data, generate a mindmap structure with nodes and edges.

For each node (topic):
1. Use the 'id' as the node's unique identifier.
2. Use the 'name' as the node's display name.
3. Assign a 'category' from the following options based on the topic's name and its likely context: "Dev Log", "Core", "Personal", "Health", "Work", "Ideas", "Misc". If no clear category fits, use "Misc".
4. Calculate a 'size' for the node. This should be an integer between 1 and 100. Scale the 'frequency_score' such that higher scores result in larger sizes, with 100 being the highest possible importance.

For each edge (connection):
1. Use 'sourceTopicId' as the 'source' ID and 'targetTopicId' as the 'target' ID.
2. Calculate a 'strength' for the edge. This should be an integer between 1 and 100. Scale the 'weight' such that higher weights result in stronger connections, with 100 being the strongest.

Ensure the output is a JSON object matching the GenerateIdeaMindmapOutputSchema. Provide a comprehensive set of nodes and edges that represent the given topics and connections. If there are no topics or connections, return empty arrays for nodes and edges.
`,
});

// Genkit flow definition
const generateIdeaMindmapFlow = ai.defineFlow(
  {
    name: 'generateIdeaMindmapFlow',
    inputSchema: GenerateIdeaMindmapInputSchema,
    outputSchema: GenerateIdeaMindmapOutputSchema,
  },
  async (input) => {
    const {output} = await generateIdeaMindmapPrompt(input);
    return output!;
  }
);
