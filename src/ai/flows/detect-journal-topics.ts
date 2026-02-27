'use server';
/**
 * @fileOverview This flow automatically detects key topics and themes from journal entries.
 *
 * - detectJournalTopics - A function that extracts topics from a given journal entry.
 * - DetectJournalTopicsInput - The input type for the detectJournalTopics function.
 * - DetectJournalTopicsOutput - The return type for the detectJournalTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectJournalTopicsInputSchema = z
  .object({
    journalEntryContent: z
      .string()
      .describe('The full content of the journal entry.'),
  })
  .describe('Input for detecting topics from a journal entry.');

export type DetectJournalTopicsInput = z.infer<
  typeof DetectJournalTopicsInputSchema
>;

const DetectJournalTopicsOutputSchema = z
  .object({
    topics: z
      .array(z.string())
      .describe(
        'A list of key topics and themes extracted from the journal entry.'
      ),
  })
  .describe('Output containing detected topics from a journal entry.');

export type DetectJournalTopicsOutput = z.infer<
  typeof DetectJournalTopicsOutputSchema
>;

const detectJournalTopicsPrompt = ai.definePrompt({
  name: 'detectJournalTopicsPrompt',
  input: {schema: DetectJournalTopicsInputSchema},
  output: {schema: DetectJournalTopicsOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing journal entries to extract key topics and themes.

Your task is to read the provided journal entry content and identify the most important and recurring topics and themes discussed within it.

Return these topics as a JSON array of strings.

Journal Entry Content:
{{{journalEntryContent}}}`,
});

const detectJournalTopicsFlow = ai.defineFlow(
  {
    name: 'detectJournalTopicsFlow',
    inputSchema: DetectJournalTopicsInputSchema,
    outputSchema: DetectJournalTopicsOutputSchema,
  },
  async (input) => {
    const {output} = await detectJournalTopicsPrompt(input);
    return output!;
  }
);

export async function detectJournalTopics(
  input: DetectJournalTopicsInput
): Promise<DetectJournalTopicsOutput> {
  return detectJournalTopicsFlow(input);
}
