import { useEffect, useRef, useState } from 'react'
import Checklist from '@editorjs/checklist'
import Code from '@editorjs/code'
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import SimpleImage from '@editorjs/simple-image'
import Table from '@editorjs/table'
import { Eraser, Github } from 'lucide-react'
import TextareaAutosize from 'react-textarea-autosize'

function App() {
  const [title, setTitle] = useState<string>('')
  const ref = useRef<EditorJS>()

  useEffect(() => {
    const content = window.localStorage.getItem('content')
    const editor = new EditorJS({
      holder: 'editorjs',
      placeholder: '아무 내용이나 입력하세요...',
      autofocus: true,
      onChange: async () => {
        const content = await editor.save()
        window.localStorage.setItem('content', JSON.stringify(content))
      },
      data: content ? (JSON.parse(content) as OutputData) : undefined,
      tools: {
        header: Header,
        image: SimpleImage,
        list: List,
        checklist: Checklist,
        table: Table,
        code: Code,
        Marker: Marker,
        inlineCode: InlineCode
      },
      onReady: () => {
        console.log('Editor.js is ready to work!')
        ref.current = editor
      }
    })
    setTitle(window.localStorage.getItem('title') || '')
    return () => {
      ref.current?.destroy()
      ref.current = undefined
    }
  }, [])
  return (
    <>
      <div className="mx-auto mt-10 max-w-2xl pb-40">
        <TextareaAutosize
          value={title}
          placeholder="타이틀"
          className="w-full resize-none overflow-hidden text-5xl font-bold placeholder:text-neutral-200 focus:outline-none"
          onChange={(e) => {
            window.localStorage.setItem('title', e.target.value)
            setTitle(e.target.value)
          }}
        />
        <div id="editorjs" className="prose min-h-[500px]" />
        <p className="text-sm text-neutral-400">
          <kbd className="rounded-md border bg-neutral-200 px-1 py-0.5 text-xs uppercase text-neutral-400">
            tab
          </kbd>{' '}
          키를 눌러서 메뉴를 여세요.
        </p>
      </div>
      <div className="hidden md:block">
        <div className="fixed right-2 top-2 z-10">
          <div className="flex gap-2">
            <button
              onClick={() => {
                ref.current?.clear()
                ref.current?.focus()
                setTitle('')
                window.localStorage.setItem('title', '')
              }}
              className="buttons"
            >
              <Eraser size={16} />
            </button>
            <button
              onClick={() =>
                window.open(
                  'https://github.com/kidow/memo'
                )
              }
              className="buttons"
            >
              <Github size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
