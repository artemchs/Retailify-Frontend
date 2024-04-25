import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import { Editor } from '@tiptap/react'
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Redo2,
  Strikethrough,
  Undo2,
} from 'lucide-react'
import {
  TbTablePlus,
  TbTableMinus,
  TbColumnInsertRight,
  TbColumnRemove,
  TbRowInsertBottom,
  TbRowRemove,
} from 'react-icons/tb'

export default function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className='border max-w-full gap-1 border-b-0 rounded-b-none border-input bg-transparent rounded-md p-1 flex flex-row items-center justify-between flex-wrap'>
      <div className='flex flex-row items-center gap-1 flex-wrap'>
        <Toggle
          size='sm'
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('heading', { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className='h-4 w-4' />
        </Toggle>
        <Toggle
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('bulletList')}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          pressed={editor.isActive('orderedList')}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered className='h-4 w-4' />
        </Toggle>
        <Separator orientation='vertical' className='w-[1px] h-8' />
        <Button
          type='button'
          size='sm'
          variant='ghost'
          className='inline-flex h-9 px-2.5 bg-transparent items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <TbTablePlus className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          size='sm'
          variant='ghost'
          className='inline-flex h-9 px-2.5 bg-transparent items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          <TbTableMinus className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          size='sm'
          variant='ghost'
          className='inline-flex h-9 px-2.5 bg-transparent items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          <TbColumnInsertRight className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          size='sm'
          variant='ghost'
          className='inline-flex h-9 px-2.5 bg-transparent items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
          onClick={() => editor.chain().focus().deleteColumn().run()}
        >
          <TbColumnRemove className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          size='sm'
          variant='ghost'
          className='inline-flex h-9 px-2.5 bg-transparent items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          <TbRowInsertBottom className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          size='sm'
          variant='ghost'
          className='inline-flex h-9 px-2.5 bg-transparent items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
          onClick={() => editor.chain().focus().deleteRow().run()}
        >
          <TbRowRemove className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex flex-row gap-1 items-center'>
        <Button
          type='button'
          size='sm'
          variant='ghost'
          className='inline-flex h-9 px-2.5 bg-transparent items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
          onClick={() => editor.commands.undo()}
        >
          <Undo2 className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          size='sm'
          variant='ghost'
          className='inline-flex h-9 px-2.5 bg-transparent items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
          onClick={() => editor.commands.redo()}
        >
          <Redo2 className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
