// app/blogData.ts

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  hfLink?: string;
  youtubeId?: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'llama-3-8b-instrukcja',
    title: 'Llama 3 8B - Mały gigant. Instrukcja instalacji',
    date: '2025-05-20',
    excerpt: 'Model, który zmienił zasady gry na domowych GPU. Jak go odpalić na 8GB VRAM?',
    tags: ['LLM', 'Meta', 'Chat'],
    hfLink: 'https://huggingface.co/meta-llama/Meta-Llama-3-8B',
    youtubeId: '', // Tu możesz wpisać ID filmu, jeśli masz
    content: `
      <p>Llama 3 to najnowszy model od Meta. W wersji 8B jest niesamowicie szybki i zaskakująco bystry.</p>
      <h3 class="text-xl font-bold mt-4 mb-2 text-white">Wymagania:</h3>
      <ul class="list-disc pl-5 mb-4 text-gray-400">
        <li>Karta graficzna: min. 6GB VRAM (dla kwantyzacji 4-bit)</li>
        <li>RAM: 16GB</li>
        <li>Ollama lub LM Studio</li>
      </ul>
      <h3 class="text-xl font-bold mt-4 mb-2 text-white">Jak uruchomić w Ollama?</h3>
      <div class="bg-black/30 p-4 rounded-lg font-mono text-sm text-blue-400 my-4">ollama run llama3</div>
      <p>Model świetnie radzi sobie z językiem polskim, choć warto dopisać w system prompt: "Odpowiadaj zawsze po polsku".</p>
    `
  },
  {
    slug: 'stable-diffusion-3-medium',
    title: 'Stable Diffusion 3 - Generowanie grafik',
    date: '2025-06-01',
    excerpt: 'Nowy król open-source grafiki? Testujemy możliwości SD3 Medium.',
    tags: ['Vision', 'Image Gen'],
    hfLink: 'https://huggingface.co/stabilityai/stable-diffusion-3-medium',
    content: `
      <p>Stability AI wypuściło model, który w końcu rozumie tekst na obrazkach!</p>
      <p>Więcej szczegółów wkrótce...</p>
    `
  }
];