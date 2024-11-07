import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Text,
  TextQuote,
} from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";

export const suggestionItems = createSuggestionItems([
  {
    title: "Texto",
    description: "Comece a digitar com texto simples.",
    searchTerms: ["p", "parágrafo"],
    icon: <Text size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "Lista de Tarefas",
    description: "Acompanhe as tarefas com uma lista de afazeres.",
    searchTerms: ["todo", "tarefa", "lista", "check", "caixa de seleção"],
    icon: <CheckSquare size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Cabeçalho 1",
    description: "Cabeçalho de seção grande.",
    searchTerms: ["título", "grande", "grandeza"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Cabeçalho 2",
    description: "Cabeçalho de seção médio.",
    searchTerms: ["subtítulo", "médio"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Cabeçalho 3",
    description: "Cabeçalho de seção pequeno.",
    searchTerms: ["subtítulo", "pequeno"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Lista com Marcadores",
    description: "Crie uma lista simples com marcadores.",
    searchTerms: ["não ordenada", "ponto"],
    icon: <List size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Lista Numerada",
    description: "Crie uma lista com numeração.",
    searchTerms: ["ordenada"],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Citação",
    description: "Capture uma citação.",
    searchTerms: ["blockquote"],
    icon: <TextQuote size={18} />,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
  },
  {
    title: "Código",
    description: "Capture um trecho de código.",
    searchTerms: ["bloco de código"],
    icon: <Code size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
]);


export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
