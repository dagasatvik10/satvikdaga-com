const ML_AI_TAGS = new Set([
  'python', 'pytorch', 'tensorflow', 'llm', 'ml', 'ai', 'rag', 'nlp', 'transformers', 'huggingface',
]);

export function getTagColor(tag: string): string {
  return ML_AI_TAGS.has(tag.toLowerCase()) ? 'text-accent-purple' : 'text-accent-blue';
}
