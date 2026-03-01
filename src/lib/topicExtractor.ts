import { supabase } from './supabase'

const COMMON_WORDS = new Set(['the', 'and', 'was', 'for', 'that', 'with', 'this', 'from', 'have', 'were', 'which', 'their', 'there', 'they', 'been', 'what', 'will', 'when', 'more', 'about', 'some', 'your', 'made', 'each', 'than', 'into', 'just', 'only', 'very', 'even', 'most', 'make', 'also', 'some', 'than', 'them', 'then', 'into', 'does', 'don\'t', 'want', 'look', 'come', 'than'])

export async function processTopics(_userId: string, journalEntryId: string, content: any[]) {
  // 1. Extract plain text from BlockNote content
  const extractText = (blocks: any[]): string => {
    return blocks.map(block => {
      let text = ''
      if (block.content && Array.isArray(block.content)) {
        text = block.content.map((c: any) => c.text || '').join(' ')
      }
      if (block.children && Array.isArray(block.children)) {
        text += ' ' + extractText(block.children)
      }
      return text
    }).join(' ')
  }

  const text = extractText(content).toLowerCase()
  
  // 2. Simple keyword extraction (words > 3 chars, not in common words, alphabetic)
  const words = text.match(/\b[a-z]{4,}\b/g) || []
  const wordFreq: Record<string, number> = {}
  
  words.forEach(word => {
    if (!COMMON_WORDS.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    }
  })

  // Take top 5 topics from this entry
  const sortedWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0])

  if (sortedWords.length === 0) return

  // 3. Update topics table
  const topicIdMap: Record<string, string> = {}
  
  for (const topicName of sortedWords) {
    const { data: existingTopic, error: topicError } = await supabase
      .from('topics')
      .select('id, frequency_score')
      .eq('name', topicName)
      .maybeSingle()

    if (existingTopic) {
      await supabase
        .from('topics')
        .update({ frequency_score: (existingTopic.frequency_score || 0) + 1 })
        .eq('id', existingTopic.id)
      topicIdMap[topicName] = existingTopic.id
    } else {
      const { data: newTopic, error: insertError } = await supabase
        .from('topics')
        .insert({ name: topicName, frequency_score: 1 })
        .select('id')
        .maybeSingle()
      if (newTopic) topicIdMap[topicName] = newTopic.id
    }
  }

  // 4. Update connections (co-occurrence)
  for (let i = 0; i < sortedWords.length; i++) {
    for (let j = i + 1; j < sortedWords.length; j++) {
      const topic1 = sortedWords[i]
      const topic2 = sortedWords[j]

      const id1 = topicIdMap[topic1]
      const id2 = topicIdMap[topic2]

      if (id1 && id2 && id1 !== id2) {
        // Sort IDs to avoid duplicates (a-b and b-a)
        const [firstId, secondId] = [id1, id2].sort()
        
        const { data: existingConn, error: connError } = await supabase
          .from('connections')
          .select('weight')
          .eq('topic_1', firstId)
          .eq('topic_2', secondId)
          .maybeSingle()

        if (existingConn) {
          await supabase
            .from('connections')
            .update({ weight: (existingConn.weight || 0) + 1 })
            .eq('topic_1', firstId)
            .eq('topic_2', secondId)
        } else {
          await supabase
            .from('connections')
            .insert({ topic_1: firstId, topic_2: secondId, weight: 1 })
        }
      }
    }
  }

  // 5. Update journal entry with detected topics
  await supabase
    .from('journal_entries')
    .update({ topics: sortedWords })
    .eq('id', journalEntryId)
}
