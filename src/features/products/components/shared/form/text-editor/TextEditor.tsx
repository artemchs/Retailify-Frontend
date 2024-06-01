import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Toolbar from './Toolbar'

type Props = {
  content?: string
  setContent: (newValue: string) => void
}

export default function TextEditor({ content, setContent }: Props) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'min-h-[100px] break-all flex-auto rounded-t-none w-full border border-input bg-transparent p-4 rounded-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto',
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }).extend({
        levels: [1, 2, 3],
        renderHTML({ node, HTMLAttributes }) {
          const level: 1 | 2 | 3 = this.options.levels.includes(
            node.attrs.level
          )
            ? node.attrs.level
            : this.options.levels[0]
          const classes = {
            1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
            2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
            3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
          }
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ]
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'table-auto border-collapse p-2 border rounded-lg',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })

  return (
    <div className='flex flex-col gap-0'>
      {editor ? <Toolbar editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  )
}
